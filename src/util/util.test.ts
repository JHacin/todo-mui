import { isDueDateExpired } from './index';
import dayjs from 'dayjs';

describe('isDueDateExpired', () => {
  it('validates correctly', () => {
    expect(isDueDateExpired(dayjs())).toEqual(true);
    expect(isDueDateExpired(dayjs().add(1, 'minute'))).toEqual(false);
    expect(isDueDateExpired(dayjs().subtract(1, 'minute'))).toEqual(true);
    expect(isDueDateExpired('1970-01-01')).toEqual(true);
    expect(isDueDateExpired('2970-01-01')).toEqual(false);
  });
});
