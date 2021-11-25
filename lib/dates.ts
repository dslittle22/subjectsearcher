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

export const incrementSemester = (query: Semester): Semester => {
  return query.season === 'fall'
    ? { year: query.year + 1, season: 'spring' }
    : { year: query.year, season: 'fall' };
};

export const semesterToApiRoute = (query: Semester): string => {
  if (query.season === 'fall') {
    return (query.year + 1).toString() + '10';
  } else {
    return query.year.toString() + '20';
  }
};

const semesterToRoute = (query: Semester): string => {
  return `/${query.year}/${query.season}`;
};
