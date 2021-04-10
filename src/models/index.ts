export type IntervalType = 'open' | 'close';

export type TimeInterval = {
  type: IntervalType;
  value: number;
}

export enum DaysOfWeek {
  monday = 'monday',
  tuesday = 'tuesday',
  wednesday = 'wednesday',
  thursday = 'thursday',
  friday = 'friday',
  saturday = 'saturday',
  sunday = 'sunday',
}

export type DayIntervalTransformed = {
  day: DaysOfWeek;
  intervals: TimeInterval[];
};

export type Week = Record<DaysOfWeek, TimeInterval[]>;

export type WeekTransformed = DayIntervalTransformed[];


