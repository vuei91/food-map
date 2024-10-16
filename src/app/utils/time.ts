export const getTimestampToSeconds = (time: string): number => {
  if (!time) return 0;
  if (time.includes("-")) time = time.split("-")[0];
  const parts = time.split(":");
  const seconds = parts.reduce((acc, part, index) => {
    return acc + parseInt(part) * Math.pow(60, parts.length - index - 1);
  }, 0);
  return seconds;
};
