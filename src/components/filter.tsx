import React, { useState } from "react";
import styled from "styled-components";
import { useData } from "./data-context";
import { Categories } from "../types";
import { Dropdown } from "./dropdown";
import { mobileRules } from "../constants/style";

export const Filter = () => {
  const {
    categoryCounts,
    category,
    setCategory,
    cityStateCounts,
    cityState,
    setCityState,
  } = useData();

  const categoryOptions = [
    {
      onClick: () => setCategory(),
      text: `Show all incidents`,
    },
    {
      onClick: () => setCategory(Categories.gas),
      text: `${categoryCounts[Categories.gas]} Chemical attacks`,
    },
    {
      onClick: () => setCategory(Categories.shooting_gun),
      text: `${categoryCounts[Categories.shooting_gun]} Shootings by firearms`,
    },
    {
      onClick: () => setCategory(Categories.shooting_rubber),
      text: `${
        categoryCounts[Categories.shooting_rubber]
      } Shootings by rubber bullets/projectiles`,
    },
    {
      onClick: () => setCategory(Categories.assault),
      text: `${categoryCounts[Categories.assault]} Assaults`,
    },
    {
      onClick: () => setCategory(Categories.arrest),
      text: `${categoryCounts[Categories.arrest]} Unjustified arrests`,
    },
    {
      onClick: () => setCategory(Categories.other),
      text: `${categoryCounts[Categories.arrest]} other bullsh*t`,
    },
  ];
  const cityStateOptions = Object.keys(cityStateCounts)
    .sort(
      (cityStateA, cityStateB) =>
        cityStateCounts[cityStateB] - cityStateCounts[cityStateA]
    )
    .map((cityState) => ({
      text: `${cityState} (${cityStateCounts[cityState]})`,
      onClick: () => {
        setCityState(cityState);
      },
    }));

  const allCityStateOptions = [
    {
      text: `ENTIRE U.S.`,
      onClick: () => setCityState(),
    },
    ...cityStateOptions,
  ];

  const categoryLabel = category?.toUpperCase() || "ALL INCIDENTS";
  const cityStateLabel = cityState?.toUpperCase() || "ENTIRE U.S.";

  return (
    <FilterWrapper>
      SEE <Dropdown label={categoryLabel} options={categoryOptions} /> IN
      <Dropdown label={cityStateLabel} options={allCityStateOptions} /> BELOW
    </FilterWrapper>
  );
};

const FilterWrapper = styled.div`
  font-size: 36px;
  font-weight: 700;
  padding: 16px 48px;
  display: flex;
  background: yellow;
  color: black;
  margin-bottom: 48px;
  display: flex;
  flex-flow: row;
  align-items: center;
  ${mobileRules} {
    font-size: 18px;
    padding: 4px;
    position: relative;
  }
`;
