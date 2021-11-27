import { baseurl, semesterToApiRoute } from '@/lib/dates';
type QueryParam = string | string[] | undefined;

function isValidQuery(year: QueryParam, season: QueryParam): boolean {
  const yearValid =
    typeof year === 'string' && typeof parseInt(year) === 'number';
  const seasonValid = season === 'spring' || season === 'fall';
  return yearValid && seasonValid;
}

export async function fetchData(year_s: QueryParam, season: QueryParam) {
  if (!process.env.NETLIFY) {
    if (process.env.NODE_ENV === 'development') {
      const data = require('../dev/data.json');
      return data.courses;
    }
  }

  const yearValid =
    typeof year_s === 'string' && typeof parseInt(year_s) === 'number';
  const seasonValid = season === 'spring' || season === 'fall';
  if (!yearValid || !seasonValid) return false;

  const query = semesterToApiRoute({ year: parseInt(year_s), season });
  const url = `${baseurl}${query}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return Array.isArray(data.courses) ? data.courses : -1;
  } catch {
    return -1;
  }
}
