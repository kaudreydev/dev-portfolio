import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/Card";
import { useEffect, useState } from "react";
import type { Skill } from "~/types";
import ProficiencyRating from "./ProficiencyRating";
import SkillSort from "./SkillSort";
import * as lodash from "lodash";

const { sortBy } = lodash;

const iconPath = "https://unpkg.com/simple-icons@v16/icons/{icon}.svg";
const iconSize = 128;

export default function SkillCards({ skills }: { skills: Skill[] }) {
  const [sortedSkills, setSortedSkills] = useState<Skill[]>(skills);
  const [sortValue, setSortValue] = useState<string>("level");

  useEffect(() => {
    let nextSortedSkills;

    if ("abc" === sortValue) {
      nextSortedSkills = sortBy(sortedSkills, ["name"]);
    } else if ("experience" === sortValue) {
      nextSortedSkills = sortBy(sortedSkills, ["years"]);
    } else if ("level" === sortValue) {
      nextSortedSkills = sortBy(sortedSkills, [
        "level",
        "years",
        "name",
      ]).reverse();
    }

    nextSortedSkills && setSortedSkills(nextSortedSkills);
  }, [sortValue]);

  return (
    <div>
      <div>
        Sort:&nbsp;
        <SkillSort sortValue={sortValue} onValueChange={setSortValue} />
      </div>
      <div className="flex flex-wrap gap-4 max-w-5xl">
        {sortedSkills.map((skill: Skill) => (
          <Card
            key={skill.id}
            className={`bg-cyan-50 dark:bg-slate-700 max-w-${iconSize}`}
          >
            <img
              className={`filter-pink object-center m-4`}
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
                    <div className="text-sm/normal text-center">
                      {(skill.level === 0 && "Familiar") ||
                        (skill.level === 1 && "Growing") ||
                        (skill.level === 2 && "Proficient") ||
                        (skill.level === 3 && "Expert")}
                    </div>
                  </div>
                  <div>
                    <div className="skill-years text-center">{skill.years}</div>
                    <br />
                    <div className="text-sm/normal text-center">Years</div>
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
