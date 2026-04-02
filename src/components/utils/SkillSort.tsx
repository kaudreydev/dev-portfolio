import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@components/ui/Select";

const sortOptions = [
  { label: "Alphabetical", value: "abc" },
  { label: "Proficiency", value: "level" },
];

export default function SkillCardd({
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
    <Select
      name="skillSort"
      items={sortOptions}
      value={sortValue}
      onValueChange={valueChanged}
    >
      <SelectTrigger className="w-full max-w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort skills by</SelectLabel>
          {sortOptions.map((option: { label: string; value: string }) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
