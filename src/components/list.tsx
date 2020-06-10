import React from "react";
import styled from "styled-components";
import { useData } from "./data-context";
import { Categories } from "../types";
import { IncidentCard } from "./incident-card";

export const List = () => {
  const { incidents } = useData();

  return (
    <>
      {incidents
        // .filter((i) => i.categories.includes(Categories.shooting_gun))
        .map((incident) => {
          return <IncidentCard key={incident.id} incident={incident} />;
        })}
    </>
  );
};