# dayjs-china-business-time

A [Day.js](https://github.com/iamkun/dayjs) plugin that allows you to work with Business Time.

* China Business Days
* China Business Hours
* China Business Minutes
* Customize China business days and hours
* Customize China Holidays to prevent them to be counted as Business Days


# Getting Started

## Table of Contents

* [Setup](#setup)
  * [Setting Holidays](#setting-holidays)
  * [Getting Holidays](#getting-holidays)
  * [Setting Business Times](#setting-business-times)
  * [Getting Business Times](#getting-business-times)
* [Checking](#checking)
  * [Check if a date is a Holiday](#check-if-a-date-is-a-holiday)
  * [Check if a date is a Business Day](#check-if-a-date-is-a-business-day)
  * [Check if a Time is Business Time](#check-if-a-time-is-business-time)
* [Next and Last](#next-and-last)
  * [Get Next Business Day](#get-next-business-day)
  * [Get Last Business Day](#get-last-business-day)
  * [Get Next Business Time](#get-next-business-time)
  * [Get Last Business Time](#get-last-business-time)
* [Adding Business Time](#adding-business-time)
  * [Add Business Time](#add-business-time)
  * [Add Business Days](#add-business-days)
  * [Add Business Hours](#add-business-hours)
  * [Add Business Minutes](#add-business-minutes)
* [Subtracting Business Time](#subtracting-business-time)
  * [Subtract Business Time](#subtract-business-time)
  * [Subtract Business Days](#subtract-business-days)
  * [Subtract Business Hours](#subtract-business-hours)
  * [Subtract Business Minutes](#subtract-business-minutes)
* [Diff](#diff)
  * [Business Time Diff](#business-time-diff)
  * [Business Days Diff](#business-days-diff)
  * [Business Hours Diff](#business-hours-diff)
  * [Business Minutes Diff](#business-minutes-diff)
 
## Instalation

### With NPM
```console
npm i dayjs-business-time
```

### With Yarn
```console
yarn add dayjs-business-time
```

## Usage

### NodeJS
````javascript
// First of all, include dayjs
const dayjs = require('dayjs');

// Then, include dayjs-business-time
const dayjsBusinessTime = require('dayjs-business-time');

// Attach dayjs plugin
dayjs.extend(dayjsBusinessTime);

// Now you have all Business Time methods in dayjs
````

### Typescript
````typescript
// First of all, include dayjs
import dayjs from 'dayjs';

// Then, include dayjs-business-time
import dayjsBusinessTime from 'dayjs-business-time';

// Attach dayjs plugin
dayjs.extend(dayjsBusinessTime);

// Now you have all Business Time methods in dayjs
````
## Setup

### Setting Holidays

> By default, holidays are empty!

````typescript
// 5月假期
const holidays: string[] = ['2022-05-01', '2022-05-02', '2022-05-03', '2022-05-04'];
dayjs.setHolidays(holidays);
````

### Getting Holidays
````typescript
const holidays: string[] = dayjs.setHolidays(holidays);

console.log(holidays);
// Output: ['2021-01-01', '2021-01-25', '2021-06-03']
````

### Setting Workdays
````typescript
    // 5月补班
    const workdays = ['2022-05-07'];
    dayjs.setWorkdays(workdays);
````

### Setting Work Times

````typescript
    // 工作时段
    const workHours = [
      { start: '09:00:00', end: '12:00:00' },
      { start: '13:30:00', end: '18:00:00' },
    ]
    dayjs.setWorktime(workHours);
````

### Setting Business Times

> By default, Business Times are Monday-Friday, 9am - 5pm, but you can setup as many Business Segments you want in a day

````typescript
// Create your Business Week definition
// warn: 默认5天工作制，设置为null的为周末，时段设置不再从这里取，欲设置工作时段请调用“setWorktime(workHours)”
const businessTimes: BusinessHoursMap = {
  sunday:    null,
  monday:    [ { start: '09:00:00', end: '17:00:00' } ],
  tuesday:   [ { start: '09:00:00', end: '17:00:00' } ],
  wednesday: [ { start: '09:00:00', end: '17:00:00' } ],
  thursday:  [ { start: '09:00:00', end: '17:00:00' } ],
  friday:    [ { start: '09:00:00', end: '17:00:00' } ],
  saturday:  null,
}

// Set Business Times in dayjs
dayjs.setBusinessTime(businessTimes);
````

## Checking

### Check if a date is a Holiday

According to [holidays setup](#setting-holidays)
````typescript
const isHoliday = dayjs('2021-02-01').isHoliday();

console.log(isHoliday); // false
````

### Check if a date is a Business Day

Bussiness Days are [days with Business Hours settled](#setting-business-times), excluding Holidays.
````typescript
const isBusinessDay = dayjs('2021-02-01').isBusinessDay();

console.log(isBusinessDay); // true
````

### Check if a Time is Business Time
Bussiness Times are all minutes between Start and End of a Business Time Segment.
````typescript
const isBusinessTime = dayjs('2021-02-01 10:00:00').isBusinessTime();

console.log(isBusinessTime); // true
````

## Next and Last
### Get Next Business Day

````typescript
const nextBusinessDay = dayjs('2021-02-01').nextBusinessDay();

console.log(nextBusinessDay); // 2021-02-02
````

### Get Last Business Day

````typescript
const lastBusinessDay = dayjs('2021-02-01').lastBusinessDay();

console.log(nextBusinessDay); // 2021-01-29
````

### Get Next Business Time
````typescript
const nextBusinessTime = dayjs('2021-02-01 18:00:00').nextBusinessTime();

console.log(nextBusinessTime); // 2021-02-02 09:00:00
````

### Get Last Business Time
````typescript
const lastBusinessTime = dayjs('2021-02-01 08:00:00').lastBusinessTime();

console.log(lastBusinessTime); // 2021-01-29 17:00:00
````

## Adding Business Time

### Add Business Time
````typescript
const day = dayjs('2021-02-01 10:00:00');
const timeToAdd: number = 2;

// Possible BusinessTimeUnit is 'day', 'days', 'hour', 'hours', 'minute', 'minutes'
const unit: BusinessTimeUnit = 'days';

const newBusinessTime: Dayjs = day.addBusinessTime(timeToAdd, unit);

console.log(newBusinessTime); // 2021-02-02 10:00:00
````

### Add Business Days

This method is just an alias for `.addBusinessTime(timeToAdd, 'days')`

````typescript
const day = dayjs('2021-02-01 10:00:00');
const timeToAdd: number = 2;

const newBusinessTime: Dayjs = day.addBusinessDays(timeToAdd);

console.log(newBusinessTime); // 2021-02-02 10:00:00
````

### Add Business Hours

This method is just an alias for `.addBusinessTime(timeToAdd, 'hours')`

````typescript
const day = dayjs('2021-02-01 10:00:00');
const timeToAdd: number = 2;

const newBusinessTime: Dayjs = day.addBusinessHours(timeToAdd);

console.log(newBusinessTime); // 2021-02-01 12:00:00
````

### Add Business Minutes

This method is just an alias for `.addBusinessTime(timeToAdd, 'minutes')`

````typescript
const day = dayjs('2021-02-01 10:00:00');
const timeToAdd: number = 30;

const newBusinessTime: Dayjs = day.addBusinessMinutes(timeToAdd);

console.log(newBusinessTime); // 2021-02-01 10:30:00
````

## Subtracting Business Time

### Subtract Business Time
````typescript
const day = dayjs('2021-02-01 10:00:00');
const timeToSubtract: number = 2;

// Possible BusinessTimeUnit is 'day', 'days', 'hour', 'hours', 'minute', 'minutes'
const unit: BusinessTimeUnit = 'days';

const newBusinessTime: Dayjs = day.subtractBusinessTime(timeToSubtract, unit);

console.log(newBusinessTime); // 2021-01-28 10:00:00
````

### Subtract Business Days

This method is just an alias for `.subtractBusinessTime(timeToSubtract, 'days')`

````typescript
const day = dayjs('2021-02-01 10:00:00');
const timeToSubtract: number = 2;

const newBusinessTime: Dayjs = day.subtractBusinessDays(timeToSubtract);

console.log(newBusinessTime); // 2021-01-28 10:00:00
````

### Subtract Business Hours

This method is just an alias for `.subtractBusinessTime(timeToSubtract, 'hours')`

````typescript
const day = dayjs('2021-02-01 12:00:00');
const timeToSubtract: number = 2;

const newBusinessTime: Dayjs = day.subtractBusinessHours(timeToSubtract);

console.log(newBusinessTime); // 2021-02-01 10:00:00
````

### Subtract Business Minutes

This method is just an alias for `.subtractBusinessTime(timeToSubtract, 'minutes')`

````typescript
const day = dayjs('2021-02-01 10:00:00');
const timeToSubtract: number = 30;

const newBusinessTime: Dayjs = day.subtractBusinessMinutes(timeToSubtract);

console.log(newBusinessTime); // 2021-02-01 09:30:00
````

## Diff

### Business Time Diff
````typescript
const start: Dayjs = dayjs('2021-02-01 10:00:00');
const end: Dayjs = dayjs('2021-02-04 10:00:00');

// Possible BusinessTimeUnit is 'day', 'days', 'hour', 'hours', 'minute', 'minutes'
const unit: BusinessTimeUnit = 'days';

const difference: number = start.businessTimeDiff(end, unit);

console.log(difference); // 3
````

### Business Days Diff

This method is just an alias for `.businessTimeDiff(dateToCompare, 'days')`

````typescript
const start: Dayjs = dayjs('2021-02-01 10:00:00');
const end: Dayjs = dayjs('2021-02-04 10:00:00');

const difference: number = start.businessDaysDiff(end);

console.log(difference); // 3
````

### Business Hours Diff

This method is just an alias for `.businessTimeDiff(dateToCompare, 'hours')`

````typescript
const start: Dayjs = dayjs('2021-02-01 10:00:00');
const end: Dayjs = dayjs('2021-02-01 15:00:00');

const difference: number = start.businessHoursDiff(end);

console.log(difference); // 5
````

### Business Minutes Diff

This method is just an alias for `.businessTimeDiff(dateToCompare, 'minutes')`

````typescript
const start: Dayjs = dayjs('2021-02-01 10:00:00');
const end: Dayjs = dayjs('2021-02-01 10:45:00');

const difference: number = start.businessMinutesDiff(end);

console.log(difference); // 25
````
