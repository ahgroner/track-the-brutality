import React from "react";
import { useData } from "./data-context";
import { IncidentCard } from "./incident-card";

export const List = () => {
  const { incidents } = useData();

  return (
    <>
      {incidents.map((incident) => (
        <IncidentCard key={incident.id} incident={incident} />
      ))}
    </>
  );
};
