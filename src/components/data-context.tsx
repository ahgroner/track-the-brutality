import React, { useState, createContext, useMemo } from "react";
import { fetchEvents } from "../actions";
import { Incident, Categories } from "../types";
import { cleanData, getCategoryCounts, compareByDate } from "../utils/data";
import _ from "lodash";

interface DataContextProps {
  incidents: Incident[];
  totalCount: number;
  categoryCounts: Record<Categories, number>;
  category?: Categories;
  setCategory: (cat?: Categories) => void;
  cityState?: string;
  setCityState: (cityState?: string) => void;
  cityStateCounts: Record<string, number>;
}

const DataContext = createContext<DataContextProps>({
  totalCount: 0,
  incidents: [],
  categoryCounts: {} as Record<Categories, number>,
  setCategory: () => {},
  cityState: undefined,
  setCityState: () => {},
  cityStateCounts: {},
});

export const useData = () => React.useContext(DataContext);

export const DataContextProvider = ({ children }: any) => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [category, setCategory] = useState<Categories | undefined>();
  const [cityState, setCityState] = useState<string>();

  React.useEffect(() => {
    fetchEvents().then((res) => {
      const {
        data: { data },
      } = res;
      const cleaned = cleanData(data);
      const cleanedSorted = cleaned.sort(compareByDate);
      setIncidents(cleanedSorted);
    });
  }, []);

  const categoryCounts = useMemo(() => getCategoryCounts(incidents), [
    incidents,
  ]);

  const categoryFilteredIncidents = useMemo(
    () =>
      category
        ? incidents.filter((i) => i.categories.includes(category))
        : incidents,
    [incidents, category]
  );

  const groupedByCityState = useMemo(
    () => _.groupBy(categoryFilteredIncidents, (i) => `${i.city}, ${i.state}`),
    [categoryFilteredIncidents]
  );

  const cityStateCounts = _.mapValues(groupedByCityState, (arr) => arr.length);

  const categoryCityStateFilteredIncidents = useMemo(
    () =>
      cityState ? groupedByCityState[cityState] : categoryFilteredIncidents,
    [cityState, groupedByCityState, categoryFilteredIncidents]
  );

  const loading = !incidents.length;
  return (
    <DataContext.Provider
      value={{
        incidents: categoryCityStateFilteredIncidents,
        categoryCounts,
        category,
        setCategory,
        cityStateCounts,
        cityState,
        setCityState,
        totalCount: incidents.length,
      }}
    >
      {loading ? loading : children}
    </DataContext.Provider>
  );
};
