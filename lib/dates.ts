import { Semester } from '@/interfaces/semester';
export const baseurl = 'https://apphub.bowdoin.edu/classfinder/rs/courses/';

export const findCurrentSemester = (): Semester => {
  let now = new Date();
  let [year, month] = [now.getFullYear(), now.getMonth()];
  return {
    year,
    season: month > 4 ? 'fall' : 'spring',
  };
};
export const findNextSemesterRoute = () => {
  return semesterToRoute(incrementSemester(findCurrentSemester()));
};

export const listPastSemesters = () => {
  const sems: Semester[] = []
  const lastYear = 2013
  const lastSeason = 'fall'
  // const {year: currentYear, season: currentSeason} = findCurrentSemester()
  let sem: Semester = incrementSemester(findCurrentSemester());
  while (!(sem.year === lastYear && sem.season === lastSeason)) {
    sems.push(sem)
    sem = decrementSemester(sem)
  }
  return sems
}

export const incrementSemester = (query: Semester): Semester => {
  return query.season === 'fall'
    ? { year: query.year + 1, season: 'spring' }
    : { year: query.year, season: 'fall' };
};

export const decrementSemester = (query: Semester): Semester => {
  return query.season === 'fall'
  ? { year: query.year, season: 'spring' }
  : { year: query.year - 1, season: 'fall' }
};

export const semesterToApiRoute = (query: Semester): string => {
  if (query.season === 'fall') {
    return (query.year + 1).toString() + '10';
  } else {
    return query.year.toString() + '20';
  }
};

export const apiRouteToSemester = (apiRoute: string): string => {
  let year, season: string 
  if (apiRoute.substr(4) === '10') {
    season = 'Fall'
    year = String(parseInt(apiRoute.substr(0, 4)) - 1)
  } else {
    season = 'Spring'
    year = String(parseInt(apiRoute.substr(0, 4)))
  }
  return season + ' ' + year
}

export const semesterToRoute = (query: Semester): string => {
  return `/${query.year}/${query.season}`;
};
