import dayjs from 'dayjs';
import businessTime from '../src';

describe('Business Hours Diff', () => {
  beforeAll(() => {
    dayjs.extend(businessTime);

    // 5月假期
    const holidays = ['2022-05-01', '2022-05-02', '2022-05-03', '2022-05-04'];
    dayjs.setHolidays(holidays);

    // 5月补班
    const workdays = ['2022-05-07'];
    dayjs.setWorkdays(workdays);

    // Setting wednesday working hours for 2 segments
    //   with 3 and 5 hours respectively
    // const businessHours = dayjs.getBusinessTime();

    // 工段
    const workHours = [
      { start: '09:00:00', end: '12:00:00' },
      { start: '13:30:00', end: '18:00:00' },
    ]
    dayjs.setWorktime(workHours);
  });

  it('should get the 2 holidays hours diff between 0 times', () => {
    const start = dayjs('2022-05-02 09:00:00');
    const end = dayjs('2022-05-02 11:00:00');

    const diff = start.businessHoursDiff(end);

    expect(diff).toBeDefined();
    expect(diff).toBe(0);
  });

  it('should get the 2 business hours diff between 2 times', () => {
    const start = dayjs('2022-05-07 09:00:00');
    const end = dayjs('2022-05-07 11:00:00');

    const diff = start.businessHoursDiff(end);

    expect(diff).toBeDefined();
    expect(diff).toBe(2);
  });

  it('should get the 8 business hours diff between 2 times in different days', () => {
    const start = dayjs('2022-05-06 16:45:00');
    const end = dayjs('2022-05-07 16:45:00');

    const diff = start.businessHoursDiff(end);

    expect(diff).toBeDefined();
    expect(diff).toBe(7.5);
  });

});
