export const questions = [{}];

// question branch

// 0. 나는 내 캐릭터가 (남캐였으면 좋겠다. 여캐였으면 좋겠다. 상관 없다.)
// 1. 나는 곧 죽어도 딜러를 해야한다. ( o x 상관없음)
// 1-1. 내 사전에 짤딜은 없다. 무조건 한 방 딜이 크게 크게 나와야한다. ( o x 상관없음)
// 1-1-1.

type Born = "슈샤이어" | "아르데타인" | "애니츠" | "실린" | "요즈" | "데런";
type ClassName =
  | "디스트로이어"
  | "워로드"
  | "버서커"
  | "홀리나이트"
  | "슬레이어"
  | "데빌헌터"
  | "블래스터"
  | "호크아이"
  | "스카우터"
  | "건슬링어"
  | "배틀마스터"
  | "인파이터"
  | "기공사"
  | "창술사"
  | "스트라이커"
  | "바드"
  | "서머너"
  | "아르카나"
  | "소서리스"
  | "도화가"
  | "기상술사"
  | "블레이드"
  | "데모닉"
  | "리퍼"
  | "소울이터";

type Style =
  | "누커"
  | "포커"
  | "시너지 딜러"
  | "광역 서포터"
  | "집중 서포터"
  | "밸런스 서포터";
type MainStat = "특화" | "신속" | "치명";

type Option =
  | "듬직함"
  | "유쾌함"
  | "남성미"
  | "귀여움"
  | "여리여리함"
  | "동양풍"
  | "섹시함";
type Grade = "상" | "중" | "하";

const makeClassInfo = (
  born: Born,
  className: ClassName,
  engraving: string,
  gender: "남" | "여",
  position: "딜러" | "서포터",
  style: Style,
  mainStat: MainStat,
  parmingLevel: Grade,
  difficulty: Grade,
  HpSp: Grade,
  partyJoin: Grade,
  option: Option,
) => {
  return {
    born,
    className,
    engraving,
    gender,
    position,
    style,
    mainStat,
    parmingLevel,
    difficulty,
    HpSp,
    partyJoin,
    option,
  };
};

export const classList = [
  makeClassInfo(
    "슈샤이어",
    "디스트로이어",
    "중력수련",
    "남",
    "딜러",
    "포커",
    "특화",
    "하",
    "중",
    "상",
    "상",
    "유쾌함",
  ),
];
