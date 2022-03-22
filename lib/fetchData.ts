import { baseurl, semesterToApiRoute } from '@/lib/dates';
import { isDev } from './misc';
type QueryParam = string | string[] | undefined;

export const fetchLatestSemester = async () => {

}

export async function fetchData(year_s: QueryParam, season: QueryParam) {
  if (isDev()) {
    const res = await fetch('http://localhost:5001/courses')
    return await res.json()
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

  } catch (e) {
    console.log(e);
    return -1;
  }
}
