import { closest } from "fastest-levenshtein";

export const getActivePath = (
  path: string,
  paths: string[],
  ignorePath?: string[],
) => {
  const closestPath = closest(path, paths.concat(ignorePath || []));
  const index = paths.indexOf(closestPath);

  return { active: closestPath, activeIndex: index };
};
