import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SplitView from '@/components/SplitView';
import { Course } from '@/interfaces/courses';
import { fetchData } from '@/lib/fetchData';
import CourseFocus from '@/components/CourseFocus';
import CoursesList from '@/components/CoursesList';
import Filters from '@/components/Filters';
import SemesterDropdown from './SemesterDropdown';
import { trimCourse } from '@/lib/processCourseData';
import { getQueryParam } from '@/lib/filterLogic';
import { incrementSemester } from '@/lib/dates';
import { Semester } from '@/interfaces/semester';
import { isDev } from '@/lib/misc';
import MobileHeader from './MobileHeader';

const App = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [focusedCourse, setFocusedCourse] = useState<Course | null>(null)
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const tryToFetch = async () => {
      const { year, season } = router.query;
      if (getQueryParam('latest') === 'true') {
        // if fetching latest, try to fetch current + next semester
        const currentCourses = fetchData(year, season);
        const nextSemester = incrementSemester({
          year: Number(year),
          season
        } as Semester)
        const nextCourses = fetchData(nextSemester.year.toString(), nextSemester.season)
        const [current, next] = await Promise.all([currentCourses, nextCourses])
        const courses = next.length === 0 ? current : next

        setCourses(courses.map((course: Course) => trimCourse(course)));
        setFilteredCourses(courses)
      } else {
        const courses = await fetchData(year, season);
        if (courses === false || courses.length === 0) {
          router.push('/');
        } else if (courses === -1) {
          alert("uh oh, couldn't complete request");
        } else {
          setCourses(courses.map((course: Course) => trimCourse(course)));
          setFilteredCourses(courses)
        }
      }
    };

    tryToFetch();
  }, [router, router.isReady]);

  const onSemesterDropdownChange = (semesterRoute: string) => {
    setCourses([])
    setFilteredCourses([])
    setFocusedCourse(null)
    router.push(semesterRoute)
  }  

  let semester: Semester | null = null;
  if (courses[0]?.term) {
    const term = courses[0].term  
      semester = {
        season: term.substring(4) === '10' ? 'fall' : 'spring',
        year:
          term.substring(4) === '10'
            ? Number(term.substring(0, 4)) - 1
            : Number(term.substring(0, 4)),
      };
  }
  
  const semesterDropdown = <SemesterDropdown onSemesterDropdownChange={onSemesterDropdownChange} semester={semester}/>
  const focus = <CourseFocus focusedCourse={focusedCourse} semesterDropdown={semesterDropdown}/>
  const filters = <Filters courses={courses} setFilteredCourses={setFilteredCourses}/>
  const list = courses.length < 1? (<p className='filter_list'>Loading courses...</p>) : (
    <CoursesList filteredCourses={filteredCourses} setFocusedCourse={setFocusedCourse}/>
  )

  return (
  <>
  <MobileHeader semesterDropdown={semesterDropdown} />
  <SplitView left={focus} right={(<div className='filter_list'>{filters}{list}</div>)} />
  </>
  )

}
export default App;
