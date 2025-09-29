export const convertTietToTime = (tiet: number) => {
  const mapping: Record<number, string> = {
    1: "07:00:00",
    2: "08:00:00",
    3: "09:00:00",
    4: "10:00:00",
    5: "11:00:00",
    6: "13:00:00",
    7: "14:00:00",
    8: "15:00:00",
    9: "16:00:00",
  };

  return mapping[tiet] || "00:00:00"
};
