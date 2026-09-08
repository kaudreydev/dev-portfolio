import { useEffect, useState } from "react";
import { useViewport } from "~/hooks/useViewport";

export enum ProficiencyLevel {
  Familiar,
  Growing,
  Proficient,
  Expert,
}

export default function ProficiencyIcon({
  level,
  alt,
  className,
}: {
  level: ProficiencyLevel;
  alt?: string;
  className?: string;
}) {
  const [iconSize, setIconSize] = useState<number>(24);

  const { isSmall } = useViewport();

  useEffect(() => {
    if (isSmall) setIconSize(24);
    else setIconSize(48);
  }, [isSmall]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${iconSize}`}
      height={`${iconSize}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-signal-icon lucide-signal ${className}`}
    >
      <title>{alt}</title>
      <path d="M2 20h.01" strokeOpacity="0.2" />
      {ProficiencyLevel.Familiar <= level && (
        <path d="M7 20v-4" strokeOpacity="0.4" />
      )}
      {ProficiencyLevel.Growing <= level && (
        <path d="M12 20v-8" strokeOpacity="0.6" />
      )}
      {ProficiencyLevel.Proficient <= level && (
        <path d="M17 20V8" strokeOpacity="0.8" />
      )}
      {ProficiencyLevel.Expert <= level && (
        <path d="M22 4v16" strokeOpacity="1" />
      )}
    </svg>
  );
}
