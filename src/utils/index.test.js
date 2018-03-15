import {filterEventsByDay, filterEventsByHour, getDisplayDate, getDisplayHour, getEventFromEvents} from './index';
import data from './data';

var testEvents = [
  { id: 1,
    title: 'Managed intangible strategy',
    description: 'Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    hours: 1,
    color: 'canary',
    start: 1521068400000 },
  { id: 2,
    title: 'Multi-channelled grid-enabled paradigm',
    description: 'In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
    hours: 1,
    color: 'rose',
    start: 1520863200000 },
  { id: 3,
    title: 'Optional clear-thinking approach',
    description: 'Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    hours: 1,
    color: 'sky',
    start: 1521219600000 },
  { id: 4,
    title: 'Decentralized system-worthy hardware',
    description: 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla.',
    hours: 1,
    color: 'canary',
    start: 1521342000000 },
  { id: 5,
    title: 'Grass-roots intangible standardization',
    description: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum.',
    hours: 1,
    color: 'sky',
    start: 1521162000000 }
];

test('filterEventsByDay should return array of events on given day', () => {
  expect(filterEventsByDay(testEvents, 1521144494235)).toEqual([testEvents[4]]);
});

test('filterEventsByHour should return array of events in given hour', () => {
  expect(filterEventsByHour(testEvents, 18)).toEqual([testEvents[4]]);
});

test('getDisplayDate should format and stringify date', () => {
  expect(getDisplayDate(1521144494235)).toBe('Thursday, March 15, 2018');
});

test('getDisplayHour should format and stringify hour', () => {
  expect(getDisplayHour(0)).toBe('12AM');
  expect(getDisplayHour(6)).toBe('6AM');  
  expect(getDisplayHour(12)).toBe('12PM');
  expect(getDisplayHour(18)).toBe('6PM');
});

test('getEventFromEvents should find event with matching id', () => {
  expect(getEventFromEvents(testEvents, 5)).toEqual(testEvents[4]);
});

