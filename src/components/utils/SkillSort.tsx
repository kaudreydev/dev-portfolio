import { NativeSelect, NativeSelectOption } from "~/components/ui/NativeSelect";

const sortOptions = [
  { label: "Alphabetical", value: "abc" },
  { label: "Experience", value: "years" },
  { label: "Proficiency", value: "level" },
];

export default function SkillSort({
  sortValue,
  onValueChange,
}: {
  sortValue: string;
  onValueChange: (nextValue: string) => void;
}) {
  const valueChanged = (nextValue: string | null) => {
    onValueChange(nextValue || "level");
  };

  return (
    <div className="w-full max-w-48">
      <NativeSelect
        id="skill-card-sort"
        value={sortValue}
        onChange={(e) => valueChanged(e.currentTarget.value)}
      >
        {sortOptions.map((option: { label: string; value: string }) => (
          <NativeSelectOption key={option.value} value={option.value}>
            {option.label}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </div>
  );
}
