import { filterWeekdayState } from '@/components/TimeFilter';
import { Course, meetingTimes } from '@/interfaces/courses';
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
    return (course: Course) => {
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
export const getTimeFilterFunction = (filterStart: string, filterEnd: string, filterWeekdays: filterWeekdayState, include: boolean) => {
  return (course: Course) => {

    // if no day checkboxes are checked, don't filter the course
    if (Object.values(filterWeekdays).every((v) => v === false)) return true
    if (course.meetingTimes === undefined) return false

    if (!include) {
      // in "only" case, return false if the course doesn't have any checked days,
      // or if the course has extra days that aren't checked.
      const classDays = Object.keys(course.meetingTimes)
      const filterDays = Object.keys(filterWeekdays).filter(weekday => filterWeekdays[weekday as keyof filterWeekdayState])
      const isEqual = (classDays.length === filterDays.length) && (classDays.every(day => filterDays.includes(day)));
      if (!isEqual) return false
    }

    for (const courseWeekday of Object.keys(course.meetingTimes)) {
      let courseStart = course.meetingTimes[courseWeekday as keyof meetingTimes]?.start
      let courseEnd = course.meetingTimes[courseWeekday as keyof meetingTimes]?.end
      if (!courseEnd || !courseStart) continue
      for (let [filterWeekday, checked] of Object.entries(filterWeekdays)) {
        if ((courseWeekday === filterWeekday) && checked) {
          if (include) {

            // don't filter if filter start time or end time is in between course start & end time
            const startBtwn = filterStart <= courseStart && courseStart <= filterEnd
            const endBtwn = filterStart <= courseEnd && courseEnd <= filterEnd
            if (startBtwn || endBtwn) {
              return true
            }
          } else {
            if (courseStart < filterStart || filterEnd < courseEnd) {
              return false
            }
          }
        }
      }
    }
    return !include
  }
}
