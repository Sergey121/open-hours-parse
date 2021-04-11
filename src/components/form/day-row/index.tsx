import React, { useMemo } from 'react';
import { DayIntervalTransformed, TimeInterval } from '../../../models';
import styles from './date-row.module.scss';
import Time from '../time';
import { getDayNumberByName } from '../../../utils';

type Props = {
  day: DayIntervalTransformed;
};

function DayRow(props: Props) {
  const { day } = props;

  const content = useMemo(() => {
    if (day.intervals.length === 0) {
      return (
        <div className={styles.closed}>Closed</div>
      );
    }

    const intervals = [...day.intervals];

    const time: Array<[TimeInterval, TimeInterval]> = [];
    for (let ii = 0; ii < intervals.length; ii += 2) {
      const open = intervals[ii];
      const close = intervals[ii + 1];
      time.push([open, close]);
    }
    return (
      <div className={styles.timeWrapper}>
        {time.map((time, index) => (<Time key={index} time={time}/>))}
      </div>
    );
  }, [day.intervals]);

  const isToday = useMemo(() => {
    const date = new Date();
    return date.getDay() === getDayNumberByName(day.day);
  }, [day]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.day}>
        {day.day}
        {isToday && <div className={styles.today}>Today</div>}
      </div>
      <div className={styles.time}>{content}</div>
    </div>
  );
}

export default DayRow;
