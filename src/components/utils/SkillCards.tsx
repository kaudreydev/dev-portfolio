import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/Card";
import { useStore } from "@nanostores/react";
import lodash from "lodash";
import { useEffect, useState } from "react";
import { useViewport } from "~/hooks/useViewport";
import { userTheme } from "~/store";
import type { Skill } from "~/types";
import ProficiencyRating from "./ProficiencyRating";
import SkillSort from "./SkillSort";

const { chain, sortBy } = lodash;

const iconPath = "https://unpkg.com/simple-icons@v16/icons/{icon}.svg";
const iconSizeA = 96;
const iconSizeB = 128;

function groupAndSort<T>(
  collection: T[],
  iteratee: keyof T | any, // using `any` becuase lodash types don't overlap
): T[][] {
  return chain(collection).groupBy(iteratee).sortBy(iteratee).reverse().value();
}

function parseYears(experience: string): number {
  const extractedYears = /([0-9]+)/.exec(experience)?.pop();
  return extractedYears ? parseInt(extractedYears, 0) : NaN;
}

function sortSkills(sortValue: string, skills: Skill[]): Skill[] {
  let sortedSkills = [] as Skill[];
  if ("abc" === sortValue) {
    sortedSkills = sortBy(skills, ["name"]);
  } else if ("years" === sortValue) {
    // group and sort skills by experience
    const skillsGroupedByExperience = groupAndSort(skills, (skill: Skill) =>
      parseYears(skill.years),
    );
    // for each experience group, sort it by name and then
    // add the skills to the final collection
    for (const expGroup of skillsGroupedByExperience) {
      sortedSkills.push(...sortBy(expGroup, "name"));
    }
  } else if ("level" === sortValue) {
    // group and sort skills by proficiency level
    const skillsGroupedByLevel = groupAndSort(skills, "level");
    for (const levelGroup of skillsGroupedByLevel) {
      // group and sort proficiency group skills by experience
      const skillsGroupedByExperience = groupAndSort(
        levelGroup,
        (skill: Skill) => parseYears(skill.years),
      );
      // sort each experience group by name and then
      // add the skills to the final collection
      for (const expGroup of skillsGroupedByExperience) {
        sortedSkills.push(...sortBy(expGroup, "name"));
      }
    }
  }
  return sortedSkills;
}

export default function SkillCards({ skills }: { skills: Skill[] }) {
  const $userTheme = useStore(userTheme);

  const [iconSize, setIconSize] = useState<number>(iconSizeB);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [sortedSkills, setSortedSkills] = useState<Skill[]>(skills);
  const [sortValue, setSortValue] = useState<string>("level");

  const { isXSmall } = useViewport();

  useEffect(() => setIsDarkMode($userTheme === "dark"), [$userTheme]);

  useEffect(() => {
    const nextSortedSkills = sortSkills(sortValue, sortedSkills);

    setSortedSkills(nextSortedSkills);
  }, [sortValue]);

  useEffect(() => {
    if (isXSmall) setIconSize(iconSizeA);
    else setIconSize(iconSizeB);
  }, [isXSmall]);

  return (
    <div className="flex flex-col gap-4 justify-center">
      <div className="flex flex-row gap-2 leading-8 pt-6 pb-1">
        <div>Sort by:</div>
        <SkillSort sortValue={sortValue} onValueChange={setSortValue} />
      </div>
      <div className="grid gap-4 mx-auto grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {sortedSkills.map((skill: Skill) => (
          <Card key={skill.id} className={`bg-cyan-50 dark:bg-slate-700`}>
            <img
              className={`${isDarkMode ? "filter-pink" : "filter-pink-dark"} object-center m-4`}
              height={iconSize}
              width={iconSize}
              alt={`${skill.name} icon`}
              loading="lazy"
              src={iconPath.replace("{icon}", skill.icon.toLowerCase())}
            />
            <CardHeader>
              <CardTitle>{skill.name}</CardTitle>
              <CardDescription>
                <div className="grid grid-flow-col gap-2 leading-2.5">
                  <div className="justify-items-center">
                    <ProficiencyRating proficiencyLevel={skill.level} />
                    <br />
                    <div className="text-center">
                      {(skill.level === 0 && "Familiar") ||
                        (skill.level === 1 && "Growing") ||
                        (skill.level === 2 && "Skilled") ||
                        (skill.level === 3 && "Expert")}
                    </div>
                  </div>
                  <div>
                    <div className="skill-years sm:skill-years-md text-center">
                      {skill.years}
                    </div>
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
