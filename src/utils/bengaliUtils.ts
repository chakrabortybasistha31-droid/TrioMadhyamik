export const toBengaliNumber = (num: number | string): string => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
};

export const formatTimerSeconds = (totalSeconds: number): { minutes: string; seconds: string; fullBn: string } => {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  const minsStr = mins < 10 ? `0${mins}` : `${mins}`;
  const secsStr = secs < 10 ? `0${secs}` : `${secs}`;
  return {
    minutes: toBengaliNumber(minsStr),
    seconds: toBengaliNumber(secsStr),
    fullBn: `${toBengaliNumber(minsStr)}:${toBengaliNumber(secsStr)}`
  };
};
