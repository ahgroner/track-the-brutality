import { Categories, Incident } from "../types";
import { categoryTokens } from "../constants/tokens";
import moment, { Moment } from "moment";

const getCategories = (incident: Incident): Categories[] => {
  let categories = Object.values(Categories).filter((cat) => {
    const keywords = categoryTokens[cat as Categories];
    return keywords.some((k: string) =>
      incident.name.toLowerCase().includes(k)
    );
  });

  // most likely something like "shot with rubber bullets" or "fired gas into the crowd"
  // so should be have shooting_gun removed
  if (
    categories.includes(Categories.shooting_gun) &&
    (categories.includes(Categories.shooting_rubber) ||
      categories.includes(Categories.gas))
  ) {
    categories = categories.filter((c) => c !== Categories.shooting_gun);
  }
  return categories.length ? categories : [Categories.other];
};

const getMomentDate = (incident: Incident): Moment => moment(incident.date);

export const compareByDate = (a: Incident, b: Incident): number =>
  a.moment_date.valueOf() - b.moment_date.valueOf();

export const findTweetId = (incident: Incident): string | undefined => {
  const links = incident.links;
  const tweet = links.find((link) => link.includes("twitter.com"));
  return tweet && tweet.substring(tweet.lastIndexOf("/") + 1);
};

export const cleanData = (incidents: Incident[]): Incident[] =>
  incidents.map((incident) => {
    return {
      ...incident,
      categories: getCategories(incident),
      moment_date: getMomentDate(incident),
    };
  });

export const getCategoryCounts = (
  incidents: Incident[]
): Record<Categories, number> => {
  let counts = {
    [Categories.gas]: 0,
    [Categories.shooting_rubber]: 0,
    [Categories.shooting_gun]: 0,
    [Categories.assault]: 0,
    [Categories.arrest]: 0,
    [Categories.other]: 0,
  };

  incidents.forEach((incident) => {
    incident.categories.forEach((cat: Categories) => {
      counts[cat] = counts[cat] + 1;
    });
  });
  return counts;
};
