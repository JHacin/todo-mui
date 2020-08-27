import React, { FC } from 'react';
import { Box } from '@material-ui/core';
import ScheduleIcon from '@material-ui/icons/Schedule';
import humanizeDuration from 'humanize-duration';
import dayjs from 'dayjs';

const getReadableDuration = (ms: number) => {
  return humanizeDuration(ms, {
    largest: 2,
    delimiter: ' and ',
    units: ['y', 'mo', 'd', 'h', 'm'],
    round: true,
  });
};

export const RemainingTimeLabel: FC<{ dueDate: dayjs.ConfigType }> = ({ dueDate }) => {
  const remainingTime = dayjs(dueDate).diff(dayjs());

  return (
    <Box display="flex">
      <Box mr={1}>
        <ScheduleIcon fontSize="small" />
      </Box>
      {remainingTime > 0 ? getReadableDuration(remainingTime) : 'This task has expired.'}
    </Box>
  );
};
