import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { CSSProperties } from "react";
import { createPortal } from "react-dom";
import CardFront from "./MemberCardFront";
import CardBack from "./MemberCardBack";
import { getRole, getLabel } from "../Config/MemberRols";
import type { Member } from "../Config/MemberTypes";

/* =====================================================================
   FlyingCard — the opened card.
   Starts exactly on top of the clicked card, flies to the centre,
   flips to the back. Closing plays it in reverse, then calls onClosed.
   ===================================================================== */

const CARD_W = 220;
const CARD_H = 300;
const MAX_SCALE = 1.65;
/** widths the opened back can use (landscape); the widest that fits wins */
const BACK_WIDTHS = [220, 300, 420, 520, 620, 720];
/** from this width the back switches to two columns (details | description) */
const WIDE_FROM = 420;
const EASE_FLY = "cubic-bezier(.2,.8,.2,1)";
const EASE_FLIP = "cubic-bezier(.45,0,.2,1)";

interface FlyingCardProps {
  member: Member;
  /** position of the clicked card (from getBoundingClientRect) */
  originRect: DOMRect;
  /** called after the close animation finishes */
  onClosed: () => void;
}

interface Geometry {
  dx: number;
  dy: number;
  scale: number;
}

const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function FlyingCard({
  member,
  originRect,
  onClosed,
}: FlyingCardProps) {
  const flyRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const geo = useRef<Geometry | null>(null);
  const closing = useRef(false);
  const [backdropOn, setBackdropOn] = useState(false);

  // ---- open: fly up, then flip ----
  useLayoutEffect(() => {
    const flyEl = flyRef.current;
    const flipEl = flipRef.current;
    if (!flyEl || !flipEl) return;

    const reduce = prefersReducedMotion();

    // The back grows to fit the whole description (no scrolling).
    // Try a few widths and keep the one that can be shown largest.
    const fitScale = (w: number, h: number) =>
      Math.min(MAX_SCALE, (innerHeight * 0.9) / h, (innerWidth * 0.92) / w);
    const backEl = flipEl.querySelector<HTMLElement>(".face--back");
    let best = { w: CARD_W, h: CARD_H, scale: fitScale(CARD_W, CARD_H) };
    if (backEl) {
      const measure = (w: number) => {
        backEl.style.setProperty("--back-w", `${w}px`);
        backEl.classList.toggle("face--wide", w >= WIDE_FROM);
        const h = Math.max(CARD_H, backEl.offsetHeight);
        return { w, h, scale: fitScale(w, h) };
      };
      const options = BACK_WIDTHS.map(measure);
      const top = Math.max(...options.map((o) => o.scale));
      // widest option that is (almost) as large as the best one
      best = options.filter((o) => o.scale >= top * 0.97).at(-1) ?? best;
      measure(best.w);
    }
    const { scale } = best;

    const dx = innerWidth / 2 - (originRect.left + originRect.width / 2);
    // the back hangs below the front when it is taller; centre the back
    const dy =
      innerHeight / 2 -
      (originRect.top + originRect.height / 2) -
      ((best.h - CARD_H) / 2) * scale;
    geo.current = { dx, dy, scale };

    const fly = flyEl.animate(
      [
        { transform: "translate(0,0) scale(1)" },
        {
          transform: `translate(${dx}px, ${dy - 40}px) scale(${scale * 1.08})`,
          offset: 0.65,
        },
        { transform: `translate(${dx}px, ${dy}px) scale(${scale})` },
      ],
      { duration: reduce ? 1 : 650, easing: EASE_FLY, fill: "forwards" },
    );
    const flip = flipEl.animate(
      [{ transform: "rotateY(0deg)" }, { transform: "rotateY(180deg)" }],
      {
        duration: reduce ? 1 : 700,
        delay: reduce ? 0 : 420,
        easing: EASE_FLIP,
        fill: "forwards",
      },
    );
    flip.finished
      .then(() => closeRef.current?.focus({ preventScroll: true }))
      .catch(() => {});

    const raf = requestAnimationFrame(() => setBackdropOn(true));
    document.body.style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(raf);
      fly.cancel();
      flip.cancel();
      document.body.style.overflow = "";
    };
  }, [originRect]);

  // ---- close: flip back, then fly home ----
  const close = useCallback(() => {
    const flyEl = flyRef.current;
    const flipEl = flipRef.current;
    if (closing.current || !geo.current || !flyEl || !flipEl) return;
    closing.current = true;
    setBackdropOn(false);

    const reduce = prefersReducedMotion();
    const { dx, dy, scale } = geo.current;

    flipEl
      .animate(
        [{ transform: "rotateY(180deg)" }, { transform: "rotateY(0deg)" }],
        {
          duration: reduce ? 1 : 480,
          easing: EASE_FLIP,
          fill: "forwards",
        },
      )
      .finished.then(
        () =>
          flyEl.animate(
            [
              { transform: `translate(${dx}px, ${dy}px) scale(${scale})` },
              { transform: "translate(0,0) scale(1)" },
            ],
            { duration: reduce ? 1 : 420, easing: EASE_FLY, fill: "forwards" },
          ).finished,
      )
      .then(() => onClosed())
      .catch(() => onClosed());
  }, [onClosed]);

  // ---- Esc closes; resizing closes (card position would be stale) ----
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", close);
    };
  }, [close]);

  const flyerStyle = {
    left: originRect.left,
    top: originRect.top,
    "--band": getRole(member).band,
  } as CSSProperties;

  return createPortal(
    <>
      <div
        className={`backdrop${backdropOn ? " backdrop--show" : ""}`}
        onClick={close}
      />
      <div
        ref={flyRef}
        className="flyer"
        role="dialog"
        aria-modal="true"
        aria-label={`About ${member.name}, ${getLabel(member)}`}
        style={flyerStyle}
      >
        <div ref={flipRef} className="flip">
          <CardFront member={member} showHint={false} />
          <CardBack member={member} onClose={close} closeRef={closeRef} />
        </div>
      </div>
    </>,
    document.body,
  );
}
