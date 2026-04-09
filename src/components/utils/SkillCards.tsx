import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/Card";
import { useStore } from "@nanostores/react";
import lodash from "lodash";
import { useEffect, useState } from "react";
import { userTheme } from "~/store";
import type { Skill } from "~/types";
import ProficiencyRating from "./ProficiencyRating";
import SkillSort from "./SkillSort";

const { sortBy } = lodash;

const iconPath = "https://unpkg.com/simple-icons@v16/icons/{icon}.svg";
const iconSize = 128;

function parseYears(experience: string): number {
  const extractedYears = /([0-9]+)/.exec(experience)?.pop();
  return extractedYears ? parseInt(extractedYears, 0) : NaN;
}

export default function SkillCards({ skills }: { skills: Skill[] }) {
  const $userTheme = useStore(userTheme);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [sortedSkills, setSortedSkills] = useState<Skill[]>(skills);
  const [sortValue, setSortValue] = useState<string>("level");

  useEffect(() => setIsDarkMode($userTheme === "dark"), [$userTheme]);

  useEffect(() => {
    let nextSortedSkills;

    if ("abc" === sortValue) {
      nextSortedSkills = sortBy(sortedSkills, ["name"]);
    } else if ("years" === sortValue) {
      nextSortedSkills = sortBy(sortedSkills, [
        (skill: Skill) => parseYears(skill.years),
        "name",
      ]).reverse();
    } else if ("level" === sortValue) {
      nextSortedSkills = sortBy(sortedSkills, [
        "level",
        (skill: Skill) => parseYears(skill.years),
        "name",
      ]).reverse();
    }

    nextSortedSkills && setSortedSkills(nextSortedSkills);
  }, [sortValue]);

  return (
    <div className="flex flex-col gap-4 justify-center">
      <div className="flex flex-row gap-2 leading-8 pt-6 pb-1">
        <div>Sort by:</div>
        <SkillSort sortValue={sortValue} onValueChange={setSortValue} />
      </div>
      <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 gap-4 mx-auto">
        {sortedSkills.map((skill: Skill) => (
          <Card
            key={skill.id}
            className={`bg-cyan-50 dark:bg-slate-700 max-w-[${iconSize + 32}px]`}
          >
            <img
              className={`${isDarkMode ? "filter-pink" : "filter-pink-dark"} object-center m-4`}
              height={iconSize}
              width={iconSize}
              alt={`${skill.name} icon`}
              src={iconPath.replace("{icon}", skill.icon.toLowerCase())}
            />
            <CardHeader>
              <CardTitle>{skill.name}</CardTitle>
              <CardDescription>
                <div className="grid grid-flow-col">
                  <div className="justify-items-center">
                    <ProficiencyRating proficiencyLevel={skill.level} />
                    <br />
                    <div className="text-center">
                      {(skill.level === 0 && "Familiar") ||
                        (skill.level === 1 && "Growing") ||
                        (skill.level === 2 && "Proficient") ||
                        (skill.level === 3 && "Expert")}
                    </div>
                  </div>
                  <div>
                    <div className="skill-years text-center">{skill.years}</div>
                    <br />
                    <div className="text-center">Years</div>
                  </div>
                </div>
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
