// type
import { CalenderContents } from "@/types";

export const contentFilter = (content: CalenderContents[]) => {
  const thisDate = new Date();
  const today = thisDate.getDate();
  const hour = thisDate.getHours();

  let adventure: CalenderContents[] = [];
  let island: CalenderContents[] = [];
  let fieldBoss: CalenderContents[] = [];
  let chaosGate: CalenderContents[] = [];

  content.forEach(value => {
    const { StartTimes, CategoryName } = value;
    const todayStart = StartTimes?.filter(time => {
      const contentTime = new Date(time);
      const contentDate = contentTime.getDate();
      const contentHour = contentTime.getHours();
      if (contentDate === today && contentHour > hour) {
        return time;
      }
    });

    const newValue = { ...value, StartTimes: todayStart };
    if (todayStart?.length) {
      switch (CategoryName) {
        case "모험 섬":
          adventure.push(newValue);
          break;
        case "섬":
          island.push(newValue);
          break;
        case "필드보스":
          fieldBoss.push(newValue);
          break;
        case "카오스게이트":
          chaosGate.push(newValue);
          break;
      }
    }
  });

  adventure.sort(
    (a, b) =>
      new Date(a.StartTimes[0]).getTime() - new Date(b.StartTimes[0]).getTime(),
  );
  island.sort(
    (a, b) =>
      new Date(a.StartTimes[0]).getTime() - new Date(b.StartTimes[0]).getTime(),
  );

  const contentList = {
    adventure,
    island,
    fieldBoss,
    chaosGate,
  };

  return contentList;
};
