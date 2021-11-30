import { Course } from '@/interfaces/courses';
import { Filters, QueryDropdown} from '@/interfaces/filters';
import { formatProfName } from './processCourseData';

export const addQueryParam = (key: string, value: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.pushState({}, '', url.toString());
};

export const getQueryParam = (key: string) => {
  if (typeof window === "undefined") return '' 
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

export const getQueryFilterFunction = (searchStr: string, queryDropdown: QueryDropdown) => {
  return queryDropdown !== 'title' && queryDropdown !== 'professor'
    ? undefined
    : (course: Course) => {
        const courseAttr =
          queryDropdown === 'title' ? course.title : formatProfName(course);

        return courseAttr
          .toLocaleLowerCase()
          .includes(searchStr.toLocaleLowerCase());
      };
}
