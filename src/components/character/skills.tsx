import Image from "next/image";
import styled from "styled-components";
import { ComponentLabel } from "../common/components";
import { ArmorySkills } from "@/types";
import { tripodCheck } from "./itemInfo";

interface Props {
  characterSkills: ArmorySkills;
}

export const Skills = ({ characterSkills }: Props) => {
  const sortedSkills = characterSkills.sort((a, b) => b.Level - a.Level);

  return (
    <Container>
      <ComponentLabel>스킬</ComponentLabel>
      {sortedSkills.map((value, index) => {
        const { IsAwakening, Icon, Level, Name, Rune, Tripods } = value;
        if (IsAwakening || Level === 1) return;
        return (
          <SkillTab key={index}>
            <Image width={70} height={70} src={Icon} alt="skill-icon" />
            <MiddleTab>
              <p>{`${Name} (Lv.${Level})`}</p>
              {!Rune ? (
                <div>룬 없음</div>
              ) : (
                <RuneTab>
                  <Image
                    width={40}
                    height={40}
                    src={Rune.Icon}
                    alt="rune-icon"
                  />
                  <span>{Rune.Name}</span>
                </RuneTab>
              )}
            </MiddleTab>
            <div>
              {Tripods.map((tripod, idx) => {
                const { IsSelected, Name, Level } = tripod;
                if (IsSelected)
                  return (
                    <TripodTab key={idx * 100} $levelDeco={tripodCheck(Level)}>
                      {`${Name} ${Level}`}
                    </TripodTab>
                  );
              })}
            </div>
          </SkillTab>
        );
      })}
    </Container>
  );
};

const Container = styled.div``;

const SkillTab = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: bold;

  & img {
    border-radius: 5px;
  }
`;

const MiddleTab = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  width: 220px;

  & p {
    margin: 0;
  }
`;
const RuneTab = styled.div`
  display: flex;
  align-items: center;
`;

const TripodTab = styled.div<{ $levelDeco: string }>`
  margin-bottom: 2px;
  color: ${props => props.$levelDeco};
`;
