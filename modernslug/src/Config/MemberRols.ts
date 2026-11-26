import type { Member, RoleConfig, RoleKey } from "./MemberTypes";

/* =====================================================================
   ROLES — order, label, icon and colors for each role.
   rank: lower number = shown first.
   icon: name used by RoleIcon.tsx (null = no icon above the head)
   tag:  pill color style (see .tag-* in MemberInfoCard.css)
   band: color stripe across the top of the card
   Record<RoleKey, …> means TypeScript errors if a role in MemberTypes.ts is missing here.
   ===================================================================== */

export const ROLES: Record<RoleKey, RoleConfig> = {
  president: {
    label: "President",
    rank: 1,
    icon: "crown-gold",
    tag: "gold",
    band: "linear-gradient(90deg, #B8860B, #FFE680, #B8860B)",
  },
  "vice-president": {
    label: "Vice President",
    rank: 2,
    icon: "crown-silver",
    tag: "silver",
    band: "linear-gradient(90deg, #7E868E, #FFFFFF, #7E868E)",
  },
  treasurer: {
    label: "Treasurer",
    rank: 3,
    icon: "bag",
    tag: "accent",
    band: "#C00A06",
  },
  secretary: {
    label: "Secretary",
    rank: 4,
    icon: "notes",
    tag: "accent",
    band: "#C00A06",
  },
  webdev: {
    label: "Web Development",
    rank: 5,
    icon: "globe",
    tag: "blue",
    band: "#003891",
  },
  member: {
    label: "Member",
    rank: 9,
    icon: null,
    tag: "plain",
    band: "#646E78",
  },
};

/** Role settings for a member (unknown roles fall back to "member"). */
export const getRole = (member: Member): RoleConfig =>
  ROLES[member.role] ?? ROLES.member;

/** Label shown on the card: custom title if given, otherwise the role name. */
export const getLabel = (member: Member): string =>
  member.title || getRole(member).label;

/** Highest role first; keeps the original order inside the same role. */
export const sortByRank = (members: Member[]): Member[] =>
  members
    .map((m, i) => ({ m, i }))
    .sort((a, b) => getRole(a.m).rank - getRole(b.m).rank || a.i - b.i)
    .map((x) => x.m);
