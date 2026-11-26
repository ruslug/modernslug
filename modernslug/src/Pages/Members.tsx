import { useCallback, useRef, useState } from "react";
import "./Styles/Members.css";
import "../Components/Styles/MemberInfoCard.css";
import MemberCard from "../Components/MemberInfoCard";
import FlyingCard from "../Components/MemberFlyingCard";
import { MEMBER_SECTIONS } from "../Config/MembersData";
import { sortByRank } from "../Config/MemberRols";
import type { Member } from "../Config/MemberTypes";

interface OpenCard {
  key: string;
  member: Member;
  rect: DOMRect;
}

const keyOf = (section: string, m: Member) => `${section}:${m.id ?? m.name}`;

function Members() {
  const [open, setOpen] = useState<OpenCard | null>(null);
  const openedEl = useRef<HTMLButtonElement | null>(null);

  const handleClosed = useCallback(() => {
    setOpen(null);
    // give focus back to the card that was opened (after it is visible again)
    requestAnimationFrame(() =>
      openedEl.current?.focus({ preventScroll: true }),
    );
  }, []);

  return (
    <>
      <div className="members__intro">
        <h2>
          Our <span>Members</span>
        </h2>
        <p>Click a card to learn more about each person.</p>
      </div>

      {MEMBER_SECTIONS.map((section) => (
        <section key={section.title} className="members__section">
          <h2 className="members__heading">{section.title}</h2>
          <div className="members__grid">
            {sortByRank(section.members).map((m) => {
              const key = keyOf(section.title, m);
              return (
                <MemberCard
                  key={key}
                  member={m}
                  hidden={open?.key === key}
                  onOpen={(el) => {
                    if (open) return;
                    openedEl.current = el;
                    setOpen({
                      key,
                      member: m,
                      rect: el.getBoundingClientRect(),
                    });
                  }}
                />
              );
            })}
          </div>
        </section>
      ))}

      {open && (
        <FlyingCard
          member={open.member}
          originRect={open.rect}
          onClosed={handleClosed}
        />
      )}
    </>
  );
}

export default Members;
