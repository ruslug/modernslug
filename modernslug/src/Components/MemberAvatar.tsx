interface AvatarProps {
  name: string;
  photo?: string;
  small?: boolean;
}

/** Round profile picture. Shows the photo if there is one, otherwise a default person. */
export default function Avatar({ photo, name, small = false }: AvatarProps) {
  return (
    <span className={`avatar${small ? " avatar--sm" : ""}`}>
      {photo ? (
        <img src={photo} alt={`Photo of ${name}`} loading="lazy" />
      ) : (
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <rect width="100" height="100" fill="var(--surface-alt)" />
          <circle cx="50" cy="40" r="18" fill="var(--text-muted)" />
          <path
            d="M14 100c0-26 16-38 36-38s36 12 36 38z"
            fill="var(--text-muted)"
          />
        </svg>
      )}
    </span>
  );
}
