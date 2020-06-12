import React, { useState } from "react";
import styled from "styled-components";
import { useData } from "./data-context";
import { Categories } from "../types";
// import CrowdBannerVid from "../assets/drone_720_trimmed.mp4";

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
    <FilterText>
      SEE <Dropdown label={categoryLabel} options={categoryOptions} /> IN
      <Dropdown label={cityStateLabel} options={allCityStateOptions} /> BELOW
    </FilterText>
  );
};

const FilterText = styled.div`
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
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownOptions = styled.div`
  position: absolute;
  top: 100%;
  left: 16px;
  background: black;
  color: white;
  font-weight: 500;
  border: 8px solid white;
  width: 500px;
  text-transform: uppercase;
  max-height: 80vh;
  overflow: auto;
  z-index: 1;
`;

const Option = styled.div`
  padding: 16px;
  border-bottom: 4px solid white;
  cursor: pointer;
  &:hover {
    background: rgba(255, 0, 0, 0.3);
  }
`;

const DropdownToggle = styled.div`
  border: 8px solid black;
  padding: 24px;
  margin: 0 24px;
  cursor: pointer;
`;

interface DropdownProps {
  label: string;
  options: { text: string; onClick?: any }[];
}

const Dropdown = ({ label, options }: DropdownProps) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <DropdownWrapper>
      <DropdownToggle
        onClick={() => {
          setOpen(!open);
        }}
      >
        {label}
      </DropdownToggle>
      {open && (
        <DropdownOptions>
          {options.map((option: any) => (
            <Option
              onClick={() => {
                setOpen(false);
                option.onClick && option.onClick();
              }}
            >
              {option.text}
            </Option>
          ))}
        </DropdownOptions>
      )}
    </DropdownWrapper>
  );
};
