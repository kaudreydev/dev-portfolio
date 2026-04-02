export enum ProficiencyLevel {
  Familiar,
  Growing,
  Proficient,
  Expert,
}

export default function ProficiencyIcon({
  alt,
  level,
}: {
  alt?: string;
  level: ProficiencyLevel;
}) {
  if (ProficiencyLevel.Familiar === level) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-signal-low-icon lucide-signal-low"
      >
        <title>{alt}</title>
        <path d="M2 20h.01" />
        <path d="M7 20v-4" />
      </svg>
    );
  }

  if (ProficiencyLevel.Growing === level) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-signal-medium-icon lucide-signal-medium"
      >
        <title>{alt}</title>
        <path d="M2 20h.01" />
        <path d="M7 20v-4" />
        <path d="M12 20v-8" />
      </svg>
    );
  }

  if (ProficiencyLevel.Proficient === level) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-signal-high-icon lucide-signal-high"
      >
        <title>{alt}</title>
        <path d="M2 20h.01" />
        <path d="M7 20v-4" />
        <path d="M12 20v-8" />
        <path d="M17 20V8" />
      </svg>
    );
  }

  if (ProficiencyLevel.Expert === level) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-signal-icon lucide-signal"
      >
        <title>{alt}</title>
        <path d="M2 20h.01" />
        <path d="M7 20v-4" />
        <path d="M12 20v-8" />
        <path d="M17 20V8" />
        <path d="M22 4v16" />
      </svg>
    );
  }
}
