import React from "react";
import styled from "styled-components";
import { mobileRules } from "../constants/style";
import { useData } from "./data-context";
import { Categories } from "../types";
// import CrowdBannerVid from "../assets/drone_720_trimmed.mp4";

export const Header = () => {
  const { totalCount, categoryCounts } = useData();

  let countItems = [
    {
      count: categoryCounts[Categories.gas],
      text: "chemical attacks",
    },
    {
      count: categoryCounts[Categories.shooting_gun],
      text: "shootings by firearms",
    },
    {
      count: categoryCounts[Categories.shooting_rubber],
      text: "shootings by rubber bullets/projectiles",
    },
    {
      count: categoryCounts[Categories.assault],
      text: "assaults",
    },
    {
      count: categoryCounts[Categories.arrest],
      text: "unjustified arrests",
    },
    {
      count: categoryCounts[Categories.other],
      text: "instances of other bullsh*t",
    },
  ];

  return (
    <>
      {/* <CenteredText>
        Following the murder of George Floyd, millions of Americans have taken
        to the street to protest police violence and support the Black
        community.
      </CenteredText>
      <VideoWrapper>
        <Video src={CrowdBannerVid} loop ref={(el) => el && el.play()} />
      </VideoWrapper> */}
      <CenterWrapper>
        <CenteredContent>
          <IntroText>Since May 29, 2020 we the people have recorded... </IntroText>
          <FlexRowCenter>
            <Count>{totalCount}</Count>
            <CountText>
              instances of police brutality against protesters
            </CountText>
          </FlexRowCenter>

          <IntroText>including... </IntroText>

        </CenteredContent>
      </CenterWrapper>
      <SubCountsWrapper>
        {countItems.map(({ count, text }, i) => (
          <SubCountWrapper key={i}>
            <SubCount>{count}</SubCount>
            <SubCountText>{text}</SubCountText>
          </SubCountWrapper>
        ))}
      </SubCountsWrapper>
    </>
  );
};

const Video = styled.video`
  width: 100%;
`;

const VideoWrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

const IntroText = styled.div`
  text-transform: uppercase;
  text-align: center;
  padding: 64px;
`;

const CenteredText = styled.div`
  display: flex;
  justify-content: center;
  font-size: 36px;
  padding: calc(20vh) 64px;
  text-align: center;
  margin: 0 auto;
  max-width: 700px;
`;

const CenterWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CenteredContent = styled.div`
  width: 1000px;
`;

const FlexRowCenter = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  margin-bottom: 32px;
`;

const Count = styled.div`
  min-width: 360px;
  text-align: right;
  font-size: 200px;
  font-weight: 500;
  padding-right: 24px;
  text-shadow: 2px 8px red;
  ${mobileRules} {
    min-width: 200px;
    font-size: 100px;
  }
`;

const CountText = styled.div`
  font-size: 60px;
  font-weight: 500;
  max-width: 750px;
  ${mobileRules} {
    font-size: 32px;
  }
`;

const SubCountsWrapper = styled.div`
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  margin-bottom: 160px;
  justify-content: space-around;
`;

const SubCountWrapper = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  padding: 16px 0;
`;

const SubCount = styled.div`
  font-weight: 500;
  padding-right: 16px;
  font-size: 72px;
  width: 120px;
  min-width: 120px;
  text-align: right;
  text-shadow: 1px 4px red;
  ${mobileRules} {
    font-size: 48px;
  }
`;

const SubCountText = styled(CountText)`
  font-size: 32px;
  font-weight: 500;
  width: 340px;
  max-width: 340px;
  ${mobileRules} {
    font-size: 32px;
  }
`;
