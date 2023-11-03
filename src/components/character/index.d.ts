export type ToolTip = {
  Element_000: {
    type: "NameTagBox";
    value: string;
  };
  Element_001: {
    type: "ItemTitle";
    value: {
      bEquip: number;
      leftStr0: string;
      leftStr2: string;
      qualityValue: number;
      rightStr0: string;
      slotData: {
        advBookIcon: number;
        battleItemTypeIcon: number;
        cardIcon: boolean;
        friendship: number;
        iconGrade: number;
        iconPath: string;
        imagePath: string;
        islandIcon: number;
        rtString: string;
        seal: false;
        temporary: number;
        town: number;
        trash: number;
      };
    };
  };
  Element_002: {
    type: "SingleTextBox";
    value: string;
  };
  Element_003: {
    type: "MultiTextBox";
    value: string;
  };
  Element_004: {
    type: "ItemPartBox";
    value: {
      Element_000: string;
      Element_001: string;
    };
  };
  Element_005: {
    type: "IndentStringGroup";
    value: {
      Element_000: {
        contentStr: {
          Element_000: {
            bPoint: number;
            contentStr: string;
            pointType: number;
          };
          Element_001: {
            bPoint: number;
            contentStr: string;
            pointType: number;
          };
          Element_002: {
            bPoint: number;
            contentStr: string;
            pointType: number;
          };
        };
        topStr: string;
      };
    };
  };
  Element_006: {
    type: "SingleTextBox";
    value: string;
  };
  Element_007: {
    type: "SingleTextBox";
    value: string;
  };
  Element_008: {
    type: "SingleTextBox";
    value: string;
  };
};
export type ElementType =
  | "NameTagBox"
  | "ItemTitle"
  | "MultiTextBox"
  | "ItemPartBox"
  | "IndentStringGroup"
  | "SingleTextBox";

export type EngravingData = {
  engravingName: string;
  level: string;
};

export type ContentStrElement = {
  bPoint: number;
  contentStr: string;
};
export type IndentStringGroup = {
  Element_000: ContentStrElement;
  Element_001: ContentStrElement;
  Element_002: ContentStrElement;
};
