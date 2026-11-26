import type { CSSProperties } from "react";
import CardFront from "./MemberCardFront";
import { getRole, getLabel } from "../Config/MemberRols";
import type { Member } from "../Config/MemberTypes";

interface MemberCardProps {
  member: Member;
  /** true while this card is the one flying (the original is hidden) */
  hidden: boolean;
  onOpen: (el: HTMLButtonElement) => void;
}

/** One card in the grid. Clicking it tells the Members page to open it. */
export default function MemberCard({
  member,
  hidden,
  onOpen,
}: MemberCardProps) {
  const style = {
    "--band": getRole(member).band,
    visibility: hidden ? "hidden" : undefined,
  } as CSSProperties;

  return (
    <button
      type="button"
      className="card"
      style={style}
      aria-label={`${member.name}, ${getLabel(member)}. Open details.`}
      onClick={(e) => onOpen(e.currentTarget)}
    >
      <CardFront member={member} />
    </button>
  );
}
