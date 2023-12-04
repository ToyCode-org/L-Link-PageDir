// event
export type FormEvent = FormEvent<HTMLFormElement>;

/////////////////////////
// thrid party API type
/////////////////////////

// ArmoryAvatar
export type ArmoryAvatar = {
  Grade: string;
  Icon: string;
  IsInner: boolean;
  IsSet: false;
  Name: string;
  Tooltip: string;
  Type: string;
};

// ArmoryCard
export type Card = {
  AwakeCount: number;
  AwakeTotal: number;
  Grade: string;
  Icon: string;
  Name: string;
  Slot: number;
  Tooltip: string;
};
export type EffectsCardItems = {
  Description: string;
  Name: string;
};
export type Effects = {
  CardSlots: number[];
  Index: number;
  Items: EffectsCardItems[];
};
export type ArmoryCard = {
  Cards: Card[];
  Effects: Effects[];
};

// ArmoryEngraving
export type EngravingEffects = {
  Name: string;
  Description: string;
  Icon: string;
};
export type Engraving = {
  Icon: string;
  Name: string;
  Slot: number;
  Tooltip: string;
};
export type ArmoryEngraving = {
  Effects: EngravingEffects[];
  Engravings: Engraving[];
};

// ArmoryEquipment
export type Equipment = {
  Grade: string;
  Icon: string;
  Name: string;
  Tooltip: string;
  Type: string;
};
export type ArmoryEquipment = Equipment[];

// ArmoryGem
export type GemEffects = {
  Description: string;
  GemSlot: number;
  Icon: string;
  Name: string;
  Tooltip: string;
};
export type Gem = {
  Grade: string;
  Icon: string;
  Level: number;
  Name: string;
  Slot: number;
  Tooltip: string;
};
export type ArmoryGem = {
  Effects: GemEffects[];
  Gems: Gem[];
};

// ArmoryProfile
export type Stats = {
  Tooltip: string[];
  Type: string;
  Value: string;
};
export type Tendencies = {
  MaxPoint: number;
  Point: number;
  Type: string;
};
export type ArmoryProfile = {
  CharacterClassName: string;
  CharacterImage: string;
  CharacterLevel: number;
  CharacterName: string;
  ExpeditionLevel: number;
  GuildMemberGrade: string | null;
  GuildName: string | null;
  ItemAvgLevel: string;
  ItemMaxLevel: string;
  PvpGradeName: string;
  ServerName: string;
  Stats: Stats[];
  Tendencies: Tendencies[];
  Title: string | null;
  TotalSkillPoint: number;
  TownLevel: number;
  TownName: string;
  UsingSkillPoint: number;
};

// ArmorySkills
export type Tripod = {
  Icon: string;
  IsSelected: boolean;
  Level: number;
  Name: string;
  Slot: number;
  Tier: number;
  Tooltip: string;
};
export type Skill = {
  Icon: string;
  IsAwakening: boolean;
  Level: number;
  Name: string;
  Rune: string | null;
  Tooltip: string;
  Tripods: Tripod[];
  type: string;
};
export type ArmorySkills = Skill[];

// Collectibles
export type CollectiblePoint = {
  MaxPoint: number;
  Point: number;
  PointName: string;
};
export type CollectibleItem = {
  CollectiblePoints: CollectiblePoint[];
  Icon: string;
  MaxPoint: number;
  Point: number;
  Type: string;
};
export type Collectibles = CollectibleItem[];

// ColosseumInfo
export type Colosseum = {
  CoOpBattle: null | string | number;
  Competitive: null | string | number;
  Deathmatch: null | string | number;
  SeasonName: string;
  TeamDeathmathch: null | string | number;
  TeamElimination: null | string | number;
};
export type ColosseumInfo = {
  Colosseums: Colosseum[];
  Exp: number;
  PreRank: number;
  Rank: number;
};

export type CharacterArmories = {
  ArmoryAvatars: ArmoryAvatar[]; // ****
  ArmoryCard: ArmoryCard; // ****
  ArmoryEngraving: ArmoryEngraving; // ****
  ArmoryEquipment: ArmoryEquipment; // ****
  ArmoryGem: ArmoryGem; // ****
  ArmoryProfile: ArmoryProfile; // ****
  ArmorySkills: ArmorySkills; // ****
  Collectibles: Collectibles; // ****
  ColosseumInfo: ColosseumInfo;
};

// Characters
export type Character = {
  CharacterClassName: string;
  CharacterLevel: number;
  CharacterName: string;
  ItemAvgLevel: string;
  ItemMaxLevel: string;
  ServerName: string;
};
export type Characters = Character[];

/////////////////////////
// Game Contents
/////////////////////////

export type RewardItem = {
  Grade: string;
  Icon: string;
  Name: string;
  StartTimes: string | null;
};

// Challenge Abyss Dungeons
export type AbyssDungeon = {
  AreaName: string;
  Description: string;
  EndTime: string;
  Image: string;
  MinCharacterLevel: number;
  MinItemLevel: number;
  Name: string;
  StartTime: string;
  RewardItems: RewardItem[];
};

// Challenge Guardian Raid
export type GuardianRaid = {
  Description: string;
  StartTime: string;
  EndTime: string;
  Image: string;
  MinCharacterLevel: number;
  MinItemLevel: number;
  Name: string;
  RequiredClearRaid: string | null;
};

// Calender Contents
export type CalenderContents = {
  CategoryName: string;
  ContentsIcon: string;
  ContentsName: string;
  Location: string;
  MinItemLevel: number;
  RewardItems: RewardItem[];
  StartTimes: string[];
};

// Events
export type GameEvents = {
  EndDate: string;
  Link: string;
  RewardDate: string;
  StartDate: string;
  Thumbnail: string;
  Title: string;
};

// Notices
export type Notices = {
  Date: string;
  Link: string;
  Title: string;
  Type: string;
};

// Merged
export type MainCalenderContents = {
  challengeAbyss: AbyssDungeon[];
  challengeGuardian: GuardianRaid[];
  content: CalenderContents[];
  events: GameEvents[];
  notices: Notices[];
};
