import { useId } from "react";
import type { IconName } from "../Config/MemberTypes";

/* =====================================================================
   RoleIcon — the icon above each person's head.
   To add a new icon: add it to IconName in MemberTypes.ts, add a case below,
   then point a role at it in MemberRols.ts.
   ===================================================================== */

interface CrownProps {
  gradId: string;
  light: string;
  mid: string;
  dark: string;
  jewel: string;
}

function Crown({ gradId, light, mid, dark, jewel }: CrownProps) {
  return (
    <svg viewBox="-4 -4 72 56" aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={light} />
          <stop offset=".55" stopColor={mid} />
          <stop offset="1" stopColor={dark} />
        </linearGradient>
      </defs>
      <path
        d="M7 38 3 12l15 12L32 4l14 20 15-12-4 26z"
        fill={`url(#${gradId})`}
        stroke="#111"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <rect
        x="5"
        y="37"
        width="54"
        height="10"
        rx="2"
        fill={`url(#${gradId})`}
        stroke="#111"
        strokeWidth="3"
      />
      <circle
        cx="3"
        cy="12"
        r="3.5"
        fill={jewel}
        stroke="#111"
        strokeWidth="2"
      />
      <circle cx="32" cy="4" r="4" fill={jewel} stroke="#111" strokeWidth="2" />
      <circle
        cx="61"
        cy="12"
        r="3.5"
        fill={jewel}
        stroke="#111"
        strokeWidth="2"
      />
      <circle
        cx="32"
        cy="42"
        r="3"
        fill={jewel}
        stroke="#111"
        strokeWidth="1.5"
      />
    </svg>
  );
}

interface RoleIconProps {
  name: IconName;
}

export default function RoleIcon({ name }: RoleIconProps) {
  // unique gradient id per icon so several crowns on one page don't clash
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  switch (name) {
    case "crown-gold":
      return (
        <Crown
          gradId={`gold-${uid}`}
          light="#FFE680"
          mid="#F2C230"
          dark="#B8860B"
          jewel="#C00A06"
        />
      );

    case "crown-silver":
      return (
        <Crown
          gradId={`silver-${uid}`}
          light="#FFFFFF"
          mid="#C9CED3"
          dark="#7E868E"
          jewel="#003891"
        />
      );

    case "bag": // treasurer
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <defs>
            <linearGradient id={`bag-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FFE680" />
              <stop offset="1" stopColor="#B8860B" />
            </linearGradient>
          </defs>
          <path
            d="M17 5h14l-4 8h-6z"
            fill={`url(#bag-${uid})`}
            stroke="#111"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M20 13c-11 5-14 30 4 30s15-25 4-30z"
            fill="#C00A06"
            stroke="#111"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <text
            x="24"
            y="36"
            textAnchor="middle"
            fontFamily="Arial Black, Arial, sans-serif"
            fontWeight="900"
            fontSize="15"
            fill="#fff"
          >
            $
          </text>
        </svg>
      );

    case "notes": // secretary
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <rect
            x="7"
            y="6"
            width="27"
            height="36"
            rx="2"
            fill="#fff"
            stroke="#111"
            strokeWidth="2.5"
          />
          <path
            d="M12 15h17M12 21h17M12 27h11"
            stroke="#C00A06"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M39 13l5 5-15 15-6.5 1.5L24 28z"
            fill="#DBDBDB"
            stroke="#111"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "globe": // web development
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <circle
            cx="24"
            cy="24"
            r="19"
            fill="#003891"
            stroke="#111"
            strokeWidth="2.5"
          />
          <ellipse
            cx="24"
            cy="24"
            rx="8.5"
            ry="19"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
          />
          <path
            d="M5 24h38M8.5 14.5h31M8.5 33.5h31"
            stroke="#fff"
            strokeWidth="2"
          />
        </svg>
      );
  }
}
