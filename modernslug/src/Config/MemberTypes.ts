/* =====================================================================
   TYPES — shapes used across the member components.
   ===================================================================== */

/** Every role a member can have. Add a new one here, then in MemberRols.ts. */
export type RoleKey =
  | "president"
  | "vice-president"
  | "treasurer"
  | "secretary"
  | "webdev"
  | "member";

/** Icons drawn by RoleIcon.tsx. */
export type IconName =
  | "crown-gold"
  | "crown-silver"
  | "bag"
  | "notes"
  | "globe";

/** Pill color styles (.tag-* in MemberInfoCard.css). */
export type TagStyle = "gold" | "silver" | "accent" | "blue" | "plain";

export interface MemberLink {
  label: string;
  /** http, https or mailto only — anything else is hidden */
  url: string;
}

export interface Member {
  /** optional stable id; falls back to name */
  id?: string;
  name: string;
  role: RoleKey;
  /** an imported image (import p from "../assets/name.png") or a full URL. Empty = default person. */
  photo?: string;
  /** replaces the role label on the card; icon still follows `role` */
  title?: string;
  /** extra lines on the back, e.g. { Major: "Biology", Year: "Junior" } */
  info?: Record<string, number | string>;
  bio?: string;
  links?: MemberLink[];
}

export interface RoleConfig {
  label: string;
  /** lower = shown first */
  rank: number;
  /** null = no icon above the head */
  icon: IconName | null;
  tag: TagStyle;
  /** CSS color or gradient for the stripe across the top of the card */
  band: string;
}
