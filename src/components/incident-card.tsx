import React from "react";
import styled from "styled-components";
import { Incident } from "../types";
import { findTweetId } from "../utils/data";

// @ts-ignore
import { TwitterTweetEmbed } from "react-twitter-embed";
import { mobileRules } from "../constants/style";

interface Props {
  incident: Incident;
}

export const IncidentCard = ({ incident }: Props) => {
  const tweet = findTweetId(incident);

  return (
    <IncidentWrapper>
      <Left>
        <Date>
          {incident.moment_date.format("MMM DD")}, {incident.city}
        </Date>
        <DescriptionText>{incident.name}</DescriptionText>
      </Left>
      <MediaWrapper>
        {tweet && (
          <TwitterTweetEmbed tweetId={tweet} options={{ theme: "dark" }} />
        )}
      </MediaWrapper>
    </IncidentWrapper>
  );
};

const MediaWrapper = styled.div`
  max-height: 800px;
  min-height: 400px;
  padding-right: 48px;
  overflow: auto;
  min-width: 40vw;
  ${mobileRules} {
    min-width: 100vw;
    padding-right: 0;
  }
`;

const IncidentWrapper = styled.div`
  width: 100%;
  display: flex;
  padding-bottom: 24px;
  margin-bottom: 24px;
  ${mobileRules} {
    flex-flow: column;
    min-height: unset;
    border-bottom: 2px solid white;
  }
`;

const Left = styled.div`
`;

const DescriptionText = styled.div`
  font-size: 72px;
  ${mobileRules} {
    font-size: 32px;
  }
  font-weight: 500;
  padding-left: 48px;
  text-transform: uppercase;
`;

const Date = styled.div`
  padding-left: 48px;
  text-transform: uppercase;
`;
