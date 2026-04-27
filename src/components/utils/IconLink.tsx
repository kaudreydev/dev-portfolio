import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { userTheme } from "~/store";

const iconSize = 32;

export default function IconLink({
  fontSize,
  href,
  type,
  title,
}: {
  fontSize?: string;
  href: string;
  type: string;
  title: string;
}) {
  const $userTheme = useStore(userTheme);

  const [filterClass, setFilterClass] = useState<
    "filter-pink" | "filter-pink-dark"
  >("filter-pink-dark");

  useEffect(
    () =>
      setFilterClass(
        $userTheme === "dark" ? "filter-pink" : "filter-pink-dark",
      ),
    [$userTheme],
  );

  return (
    <a
      className={`external-link icon-link ${filterClass}`}
      style={{
        fontSize,
      }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${title} (external link)`}
      title={`${title} (external link)`}
    >
      <span className="sr-only">(external link)</span>
      <img
        src={`/src/images/${type}.svg`}
        aria-hidden="true"
        height={iconSize}
        width={iconSize}
      />
    </a>
  );
}
