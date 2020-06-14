import React, { useState } from "react";
import styled from "styled-components";
import { mobileRules } from "../constants/style";

const DropdownWrapper = styled.div`
  position: relative;
  ${mobileRules} {
    position: static;
  }
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
  ${mobileRules} {
    position: absolute;
    top: 0;
    left: 0;
    border-width: 2px;
    /* display at bottom of filter */
    top: 100%;
    width: auto;
  }
`;

const Option = styled.div`
  padding: 16px;
  &:not(:last-child) {
    border-bottom: 4px solid white;
    ${mobileRules} {
      border-bottom: 2px solid white;
    }
  }
  cursor: pointer;
  &:hover {
    background: rgba(255, 0, 0, 0.3);
  }
  ${mobileRules} {
    padding: 8px;
  }
`;

const DropdownToggle = styled.div`
  border: 8px solid black;
  padding: 24px;
  margin: 0 24px;
  cursor: pointer;
  &:hover {
    background: black;
    color: yellow;
  }
  ${mobileRules} {
    font-size: 18px;
    padding: 4px;
    margin: 0 4px;
    border-width: 2px;
  }
`;

interface DropdownProps {
  label: string;
  options: { text: string; onClick?: any }[];
}

export const Dropdown = ({ label, options }: DropdownProps) => {
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
