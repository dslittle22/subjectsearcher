import { Dispatch, SetStateAction } from 'react';
import { Course } from '@/interfaces/courses';
import { Filters } from '@/interfaces/filters';
export const addQueryParam = (key: string, value: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.pushState({}, '', url.toString());
};

export const getQueryParam = (key: string) => {
  const url = new URL(window.location.href);
  return url.searchParams.get(key) || '';
};

export const applyFilters = (course: Course, filters: Filters): boolean => {
  let flag = true;
  for (const [k, fn] of Object.entries(filters)) {
    if (fn) {
      flag = fn(course) ? flag : false;
    }
  }
  return flag;
};

export const udpateQueryFilter = (
  filters: Filters,
  setFilters: Dispatch<SetStateAction<Filters>>,
  query: string
): void => {
  setFilters({
    ...filters,
    query:
      query === ''
        ? undefined
        : (course: Course) =>
            course.title
              .toLocaleLowerCase()
              .includes(query.toLocaleLowerCase()),
  });
};
