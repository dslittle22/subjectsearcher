import { Course } from '@/interfaces/courses';
import { Filters } from '@/interfaces/filters';

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

export const getQueryFilterFunction = (searchStr: string, attr: keyof Course) => {
  return (course: Course) => {
        return (course[attr] as string) 
          .toLocaleLowerCase()
          .includes(searchStr.toLocaleLowerCase());
      };
}

export const getMultiSelectFilterFunction = (selected: string[], attr: keyof Course, filterKey: string) => {
  if (selected.length === 0) return undefined

  if (filterKey === 'professor') {
    return (course: Course ) => {
      for (let i = 0; i < selected.length; i++) {
        const name = selected[i];
        if ((course[attr] as string).includes(name)) return true;
      }
      return false;
    }
  } else {
return (course: Course) => {
      return selected.includes(course[attr] as string);
    };
  } 
}
