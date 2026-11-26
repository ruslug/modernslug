import Avatar from "./MemberAvatar";
import RoleIcon from "./MemberRoleIcon";
import { getRole, getLabel } from "../Config/MemberRols";
import type { Member } from "../Config/MemberTypes";

interface CardFrontProps {
  member: Member;
  showHint?: boolean;
}

/** Front of a card: role icon on the head, photo, name, role pill. */
export default function CardFront({ member, showHint = true }: CardFrontProps) {
  const role = getRole(member);
  const isCrown = role.icon?.startsWith("crown") ?? false;

  return (
    <span className="face face--front">
      <span className="avatar-wrap">
        {role.icon && (
          <span className={`role-icon${isCrown ? "" : " role-icon--small"}`}>
            <RoleIcon name={role.icon} />
          </span>
        )}
        <Avatar photo={member.photo} name={member.name} />
      </span>

      <span
        className={`name${member.name.length > 22 ? " name--long" : ""}`}
        title={member.name}
      >
        {member.name}
      </span>
      <span className={`tag tag-${role.tag}`} title={getLabel(member)}>
        {getLabel(member)}
      </span>
      <span className="hint">{showHint ? "Click to view ↗" : ""}</span>
    </span>
  );
}
