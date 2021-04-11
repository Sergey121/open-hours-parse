import { DaysOfWeek, TimeInterval, Week, WeekTransformed } from '../models';

export const convertTimeToString = (seconds: number) => {
  const midnight = getTimeFromMidnight(seconds);
  const hour = getHours(midnight);
  const minutes = getMinutes(midnight);

  return `${convertHourTo12HourClock(hour)}:${addZero(minutes)} ${isAm(hour) ? 'Am' : 'Pm'}`;
};

const getTimeFromMidnight = (seconds: number) => {
  const date = new Date();
  date.setHours(0,0,0,0);
  date.setSeconds(seconds);
  return date;
}

const getHours = (date: Date) => date.getHours();
const getMinutes = (date: Date) => date.getMinutes();
const isAm = (hour: number) => hour < 12;
const addZero = (value: number) => value < 10 ? `0${value}` : `${value}`;
const convertHourTo12HourClock = (hour: number) => hour > 12 ? hour % 12 : hour;

const daysMapper = {
  [DaysOfWeek.sunday]: 0,
  [DaysOfWeek.monday]: 1,
  [DaysOfWeek.tuesday]: 2,
  [DaysOfWeek.wednesday]: 3,
  [DaysOfWeek.thursday]: 4,
  [DaysOfWeek.friday]: 5,
  [DaysOfWeek.saturday]: 6,
}

export const getDayNumberByName = (day: DaysOfWeek): number => {
  return daysMapper[day];
}

export const sortByTime = (a: TimeInterval, b: TimeInterval) => a.value - b.value;

const daysOfWeek = [DaysOfWeek.monday, DaysOfWeek.tuesday, DaysOfWeek.wednesday, DaysOfWeek.thursday, DaysOfWeek.friday, DaysOfWeek.saturday, DaysOfWeek.sunday];

const getNextDay = (day: DaysOfWeek) => {
  switch (day) {
    case DaysOfWeek.monday:
      return DaysOfWeek.tuesday;
    case DaysOfWeek.tuesday:
      return DaysOfWeek.wednesday;
    case DaysOfWeek.wednesday:
      return DaysOfWeek.thursday;
    case DaysOfWeek.thursday:
      return DaysOfWeek.friday;
    case DaysOfWeek.friday:
      return DaysOfWeek.saturday;
    case DaysOfWeek.saturday:
      return DaysOfWeek.sunday;
    case DaysOfWeek.sunday:
      return DaysOfWeek.monday;
  }
}

export const prepareWeek = (_week: Week): WeekTransformed => {
  const week: Week = JSON.parse(JSON.stringify(_week));
  const response: WeekTransformed = [];

  daysOfWeek.forEach(day => {
    const dayData = [...week[day]];
    dayData.sort(sortByTime);

    if (dayData?.[0]?.type === 'close') {
      dayData.shift();
    }

    if (dayData.length % 2 === 0) {
      response.push({
        day,
        intervals: [...dayData],
      });
    } else {
      const nextDayData = week[getNextDay(day)];
      nextDayData.sort(sortByTime);

      const interval = nextDayData.shift();
      if (interval && interval.type === 'close') {
        response.push({
          day,
          intervals: [...dayData, interval],
        });
      } else {
        throw new Error('Can`t prepare data. Intervals are not correct.');
      }
    }
  });

  return response;
};
