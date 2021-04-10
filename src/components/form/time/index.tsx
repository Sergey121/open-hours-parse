import React from 'react';
import { TimeInterval } from '../../../models';
import { convertTimeToString } from '../../../utils';

type Props = {
  time: [TimeInterval, TimeInterval];
};

function Time(props: Props) {
  const { time } = props;

  const [open, close] = time;

  return (
    <div>{convertTimeToString(open.value)} - {convertTimeToString(close.value)}</div>
  );
}

export default Time;
