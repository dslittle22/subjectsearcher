import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import {Semester} from '@/interfaces/semester'
import {semesterToRoute, listPastSemesters} from '@/lib/dates'

interface Props {
    onSemesterDropdownChange: (semesterRoute: string) => void 
}

const SemesterDropdown = ({onSemesterDropdownChange}: Props) => {
    const [pastSemesters, setPastSemesters] = useState<Semester[]>([]);
    const [currentSemester, setCurrentSemester] = useState<Semester | null>(null)
  const router = useRouter();

  const stringifySemester = (semester: Semester) =>
    String(semester.year) + ' ' + semester.season;

    const getOptionValue = (e: ChangeEvent<HTMLSelectElement>) => {
      const option = e.target.children[
        e.target.selectedIndex
      ] as HTMLOptionElement;
      return option.value;
    };

 const handleSemesterSelectorChange = (
      e: ChangeEvent<HTMLSelectElement>
    ) => {
      const [year_s, season] = getOptionValue(e).split(' ');
        const semesterRoute = semesterToRoute({
          year: parseInt(year_s),
          season: season === 'spring' ? 'spring' : 'fall',
        });
        onSemesterDropdownChange(semesterRoute)
    };

  useEffect(() => {
    if (!router.isReady) return;
    setCurrentSemester({
      year: parseInt(router.query.year as string),
      season: router.query.season === 'spring' ? 'spring' : 'fall',
    });
    setPastSemesters(listPastSemesters())
  }, [router, router.isReady]);

  return currentSemester === null ? 
  (<div>Semester: loading...</div>) : 
  (
    <>
    <label htmlFor='semester'>Semester: </label>
    <select
      name='semester'
      id='semester'
      value={stringifySemester(currentSemester)}
      onChange={handleSemesterSelectorChange}
    >
      {pastSemesters.map((semester, i) => (
        <option key={i} value={stringifySemester(semester)}>
          {stringifySemester(semester)}
        </option>
      ))}
    </select>
  </>
  );
};

export default SemesterDropdown;
