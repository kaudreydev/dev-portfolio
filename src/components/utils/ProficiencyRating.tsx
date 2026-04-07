import ProficiencyIcon, { ProficiencyLevel } from "./ProficiencyIcon";

export default function ProficiencyRating({
  proficiencyLevel,
}: {
  proficiencyLevel: number;
}) {
  return (
    <div className="flex bg-gray-700 rounded-2xl w-16 p-2 items-center">
      {proficiencyLevel === 0 && (
        <ProficiencyIcon
          className="filter-pink"
          level={ProficiencyLevel.Familiar}
          alt="Skill Level Familiar"
        />
      )}
      {proficiencyLevel === 1 && (
        <ProficiencyIcon
          className="filter-pink"
          alt="Skill Level Growing"
          level={ProficiencyLevel.Growing}
        />
      )}
      {proficiencyLevel === 2 && (
        <ProficiencyIcon
          className="filter-pink"
          alt="Skill Level Proficient"
          level={ProficiencyLevel.Proficient}
        />
      )}
      {proficiencyLevel === 3 && (
        <ProficiencyIcon
          className="filter-pink"
          alt="Skill Level Expert"
          level={ProficiencyLevel.Expert}
        />
      )}
    </div>
  );
}
