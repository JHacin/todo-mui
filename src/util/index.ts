import dayjs from 'dayjs';

export const isDueDateExpired = (dueDate: dayjs.ConfigType): boolean => {
  return dayjs(dueDate).isBefore(dayjs().add(1, 'minute'), 'minute');
};
