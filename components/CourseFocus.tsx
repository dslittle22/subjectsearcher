import { useEffect, useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { listPastSemesters, semesterToApiRoute, semesterToRoute } from '@/lib/dates';
import { Course } from '@/interfaces/courses';
import { Semester } from '@/interfaces/semester';
import styles from '@/styles/coursesSplitView.module.css';
import { CourseInfo } from './CourseInfo';

interface Props {
  focusedCourse: Course | null;
}

export default function CourseFocus({ focusedCourse }: Props) {
  const router = useRouter()
  const [semesterSelect, setSemesterSelect] = useState((<></>))

  const handleSemesterSelectorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.children[
      e.target.selectedIndex
    ] as HTMLOptionElement;
    const [year_s, season] = option.value.split(' ')
      router.push(semesterToRoute({year: parseInt(year_s), season: season === 'spring' ? 'spring' : 'fall'}));
  }

  const stringifySemester = (semester: {year: any, season: any}) => String(semester.year) + ' ' + semester.season

  useEffect(() => {
    if (!router.isReady) return
    const semester = router.query as {year: any, season: any};
      setSemesterSelect(
        <>
        <label htmlFor='semester'>Semester: </label>
        <select name='semester' id='semester' value={stringifySemester(semester)} onChange={handleSemesterSelectorChange}> 
          {listPastSemesters().map((semester, i) => (
            <option key={i} value={stringifySemester(semester)}>{stringifySemester(semester)}</option>
            ))}
        </select>
        </>)
  }, [router, router.isReady, handleSemesterSelectorChange]);

  return (
    <div className={styles.focus}>
      <div className={styles.focusheader}>
        <h1>Subject Searcher</h1>
        
       {semesterSelect }
      </div>
      {focusedCourse === null ? (
        <p>
          {
            "Welcome to SubjectSearcher, a replacement for Bowdoin's ClassFinder.\
            Click on a class to view its info!"
          }
        </p>
      ) : (
        <div>
          <CourseInfo course={focusedCourse} />
        </div>
      )}
    </div>
  );
}
