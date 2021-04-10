import React, { useMemo } from 'react';
import styles from './form.module.scss';
import { ReactComponent as ClockIcon } from './clock.svg';
import { Week } from '../../models';
import DayRow from './day-row';
import { prepareWeek } from '../../utils';

type Props = {
  week: Week | null;
};

function Form(props: Props) {
  const { week } = props;
  const data = useMemo(() => {
    console.log('Inside', week);
    if (week) {
      console.count('Call prepare');
      return prepareWeek(week);
    }
    return [];
  }, [week]);

  return (
    <div className={styles.form}>
      <div className={styles.header}>
        <ClockIcon/>
        <h1 className={styles.title}>Opening hours</h1>
      </div>
      <div className={styles.content}>
        {data.map(day => {
          return (
            <DayRow key={day.day} day={day}/>
          );
        })}
      </div>
    </div>
  );
}

export default Form;
