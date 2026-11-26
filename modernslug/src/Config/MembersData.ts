import type { Member } from "./MemberTypes";
import anandabhiPhoto from "../assets/anandabhi.png";

/* =====================================================================
   MEMBERS DATA — everyone shown on the Members page.
   Each entry follows the Member shape in MemberTypes.ts:
     role:  decides the icon, pill color and order (see MemberRols.ts)
     title: optional custom label that replaces the role name
     photo: put the image in src/assets, import it at the top of this file
            (import nameP from "../assets/name.png") and use photo: nameP.
            A full https:// URL also works. Empty = default person.
     info:  extra lines on the back of the card, e.g. { Major: "Biology" }
     bio:   description on the back of the card
     links: http, https or mailto only
   Members are sorted by role automatically, so order here only matters
   between people with the same role.
   ===================================================================== */

export const EBOARD: Member[] = [
  {
    id: "kush-patel",
    name: "Kush Patel",
    role: "president",
  },
  {
    id: "michael-fackelman",
    name: "Michael Fackelman",
    role: "vice-president",
  },
  {
    id: "oli-king",
    name: "Oli King",
    role: "vice-president",
    title: "Co-Vice President",
  },
  {
    id: "nisanth-nimashakavi",
    name: "Nisanth Nimashakavi",
    role: "treasurer",
  },
  {
    id: "harshita-sharma",
    name: "Harshita Sharma",
    role: "secretary",
  },
];

export const STAFF: Member[] = [
  {
    id: "anandabhirama-tirumalapanchangam",
    name: "Anandabhirama Charyulu Tirumalapanchangam",
    photo: anandabhiPhoto,
    info: { Major: "Biology", Year: 2027 },
    bio: "Anandabhirama is a passionate web developer and open-source enthusiast. He has been actively contributing to various projects and enjoys collaborating with like-minded individuals. In his free time, he loves exploring new technologies and sharing knowledge through workshops and tutorials.",
    links: [
      { label: "GitHub", url: "https://github.com/anandabhirama" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/anandabhirama/" },
    ],
    role: "webdev",
  },
  {
    id: "srijan-roy-choudhury",
    name: "Srijan Roy Choudhury",
    info: { Major: "Computer Science", Year: "senior" },
    role: "webdev",
  },
];

/** Sections on the Members page, in the order they appear. */
export const MEMBER_SECTIONS: { title: string; members: Member[] }[] = [
  { title: "E-Board", members: EBOARD },
  { title: "Staff", members: STAFF },
];
