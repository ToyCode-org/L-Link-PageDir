type Props = {
  engravingSlots: number[][];
  successPercentage: number;
  engravingGoal: string;
};

export const recommandAlgorithm = ({
  engravingSlots,
  successPercentage,
  engravingGoal,
}: Props) => {
  const [first, second] = engravingGoal.split("").map(Number);

  let recommandIndex = -1;
  const priority = first > second ? 0 : 1;
  const secondPriority = priority === 0 ? 1 : 0;
  const debuff = 2;

  let priorityTryCount = 0;
  let prioritySuccessCount = 0;
  let secondPriorityTryCount = 0;
  let secondPrioritySuccessCount = 0;
  let debuffTryCount = 0;

  engravingSlots[priority].forEach(value => {
    if (value === 0) return;
    if (value > 0) {
      priorityTryCount++;
    }
    if (value === 1) prioritySuccessCount++;
  });
  engravingSlots[secondPriority].forEach(value => {
    if (value === 0) return;
    if (value > 0) {
      secondPriorityTryCount++;
    }
    if (value === 1) secondPrioritySuccessCount++;
  });
  engravingSlots[debuff].forEach(value => {
    if (value > 0) debuffTryCount++;
  });

  const priorityGoal = first > second ? first : second;
  const secondPriorityGoal = first < second ? first : second;

  const priorityAcceptableFailur =
    10 - priorityTryCount - (priorityGoal - prioritySuccessCount);
  const secondPriorityAcceptableFailur =
    10 -
    secondPriorityTryCount -
    (secondPriorityGoal - secondPrioritySuccessCount);

  // quit recommand ##
  if (priorityAcceptableFailur < 0 || secondPriorityAcceptableFailur < 0) {
    return -1;
  }
  // quit recommand ##

  if (successPercentage >= 65) {
    if (priorityTryCount !== 10) {
      if (prioritySuccessCount < priorityGoal) {
        recommandIndex = priority;
      } else if (prioritySuccessCount >= priorityGoal) {
        recommandIndex = secondPriority;
      }
    }
  }
  if (successPercentage === 55) {
    if (secondPriorityTryCount !== 10) {
      recommandIndex =
        priorityAcceptableFailur > secondPriorityAcceptableFailur
          ? priority
          : secondPriority;
    }
  }
  if (successPercentage <= 45) {
    if (debuffTryCount !== 10) {
      recommandIndex = debuff;
    } else {
      recommandIndex =
        priorityAcceptableFailur > secondPriorityAcceptableFailur
          ? priority
          : secondPriority;
    }
  }

  return recommandIndex;
};
