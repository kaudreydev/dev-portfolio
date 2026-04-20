import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { userTheme } from "~/store";
import ProficiencyIcon, { ProficiencyLevel } from "./ProficiencyIcon";

export default function ProficiencyRating({
  proficiencyLevel,
}: {
  proficiencyLevel: number;
}) {
  const $userTheme = useStore(userTheme);

  const [iconClassName, setIconClassName] = useState<string>("");

  useEffect(
    () =>
      setIconClassName(
        $userTheme === "dark" ? "filter-pink" : "filter-pink-dark",
      ),
    [$userTheme],
  );

  return (
    <div className="flex rounded-2xl w-8 md:w-16 p-1 md:p-2 items-center">
      {proficiencyLevel === 0 && (
        <ProficiencyIcon
          className={iconClassName}
          level={ProficiencyLevel.Familiar}
          alt="Skill Level Familiar"
        />
      )}
      {proficiencyLevel === 1 && (
        <ProficiencyIcon
          className={iconClassName}
          alt="Skill Level Growing"
          level={ProficiencyLevel.Growing}
        />
      )}
      {proficiencyLevel === 2 && (
        <ProficiencyIcon
          className={iconClassName}
          alt="Skill Level Proficient"
          level={ProficiencyLevel.Proficient}
        />
      )}
      {proficiencyLevel === 3 && (
        <ProficiencyIcon
          className={iconClassName}
          alt="Skill Level Expert"
          level={ProficiencyLevel.Expert}
        />
      )}
    </div>
  );
}
