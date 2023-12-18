type Props = {
  engravingSlots: [][];
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
      if (secondPrioritySuccessCount < secondPriorityGoal) {
        recommandIndex = secondPriority;
      } else if (
        secondPrioritySuccessCount >= secondPriorityGoal &&
        priorityTryCount < 10
      ) {
        recommandIndex = priority;
      }
    }
  }
  if (successPercentage <= 45) {
    if (debuffTryCount !== 10) {
      recommandIndex = debuff;
    } else {
      if (
        10 - secondPriorityTryCount + secondPrioritySuccessCount >=
        secondPriorityGoal
      ) {
        recommandIndex = secondPriority;
      } else if (10 - priorityTryCount + prioritySuccessCount >= priorityGoal) {
        recommandIndex = priority;
      }
    }
  }

  return recommandIndex;
};

//### 65↑ 1st / 55 2nd / 45↓ 3rd
// if 1st=goal => 55↑ 2nd
// if 3rd full => 45↓ 2nd
