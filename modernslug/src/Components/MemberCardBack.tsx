import type { Ref } from "react";
import Avatar from "./MemberAvatar";
import RoleIcon from "./MemberRoleIcon";
import { getRole, getLabel } from "../Config/MemberRols";
import type { Member } from "../Config/MemberTypes";

interface CardBackProps {
  member: Member;
  onClose: () => void;
  closeRef?: Ref<HTMLButtonElement>;
}

const isSafeUrl = (url: string) => /^(https?:|mailto:)/i.test(url.trim());

/** Back of a card: details, description, links and the Close button. */
export default function CardBack({ member, onClose, closeRef }: CardBackProps) {
  const role = getRole(member);
  const links = (member.links ?? []).filter((l) => isSafeUrl(l.url));

  return (
    <div className="face face--back">
      <div className="back-head">
        <Avatar photo={member.photo} name={member.name} small />
        <div className="back-head__text">
          <div className="name">{member.name}</div>
          <div className={`tag tag-${role.tag}`}>
            {role.icon && (
              <span className="tag-icon">
                <RoleIcon name={role.icon} />
              </span>
            )}
            {getLabel(member)}
          </div>
        </div>
      </div>

      <div className="divider" />

      {member.info && (
        <dl className="info">
          {Object.entries(member.info).map(([key, value]) => (
            <div key={key} className="info__row">
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      )}

      <p className="bio">{member.bio || "No description yet."}</p>

      {links.length > 0 && (
        <div className="links">
          {links.map((l) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}

      <button
        ref={closeRef}
        type="button"
        className="btn-inset close"
        onClick={onClose}
      >
        ✕ Close
      </button>
    </div>
  );
}
