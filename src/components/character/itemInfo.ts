export type GradeLevel = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7";
export type GradeName =
  | "일반"
  | "고급"
  | "희귀"
  | "영웅"
  | "전설"
  | "유물"
  | "고대"
  | "에스더";

export const gradeName = {
  "0": "일반",
  "1": "고급",
  "2": "희귀",
  "3": "영웅",
  "4": "전설",
  "5": "유물",
  "6": "고대",
  "7": "에스더",
};

export const gradeNumber = {
  일반: "0",
  고급: "1",
  희귀: "2",
  영웅: "3",
  전설: "4",
  유물: "5",
  고대: "6",
  에스더: "7",
};

export const gradeColor = {
  "0": "white",
  "1": "#78d300",
  "2": "#2fa4f9",
  "3": "#c429fb",
  "4": "#eb9313",
  "5": "#ff670c",
  "6": "#dcc999",
  "7": "#3af3ef",
};

export const gradeBackground = {
  "0": "white",
  "1": "linear-gradient(135deg,#8fd82f,#498001)",
  "2": "linear-gradient(135deg,#111f2c,#113d5d)",
  "3": "linear-gradient(135deg,#261331,#480d5d)",
  "4": "linear-gradient(135deg,#362003,#9e5f04)",
  "5": "linear-gradient(135deg,#341a09,#a24006)",
  "6": "linear-gradient(135deg,#3d3325,#dcc999)",
  "7": "linear-gradient(135deg,#0c2e2c,#2faba8)",
};

// 품질
// ~10 빨강
// ~30 황색
// ~70 초록
// ~90 파랑
// 90~99 보라
// 100 밝은 주황
export const qualityCheck = (qualityValue: number): string => {
  let color = "";
  if (qualityValue < 10) color = "red";
  if (10 <= qualityValue && qualityValue < 30) color = "yellow";
  if (30 <= qualityValue && qualityValue < 70) color = "#32af32";
  if (70 <= qualityValue && qualityValue < 90) color = "blue";
  if (90 <= qualityValue && qualityValue < 100) color = "#c100e8";
  if (qualityValue === 100) color = "orange";
  return color;
};

// bracelet effects
