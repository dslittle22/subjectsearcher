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

function App({}) {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [focusedCourse, setFocusedCourse] = useState<Course | null>(null)
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const tryToFetch = async () => {
      const { year, season } = router.query;
      const courses = await fetchData(year, season);
      if (courses === false) {
        router.push('/');
      } else if (courses === -1) {
        alert("uh oh, couldn't complete request");
      } else {
        setCourses(courses.map((course: Course) => trimCourse(course)));
        setFilteredCourses(courses)
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

  const semesterDropdown = <SemesterDropdown onSemesterDropdownChange={onSemesterDropdownChange} />
  const focus = <CourseFocus focusedCourse={focusedCourse} semesterDropdown={semesterDropdown}/>
  const filters = <Filters courses={courses} setFilteredCourses={setFilteredCourses}/>
  const list = courses.length < 1? (<p className='filter_list'>Loading courses...</p>) : (
    <CoursesList filteredCourses={filteredCourses} setFocusedCourse={setFocusedCourse}/>
  )

  return (<SplitView left={focus} right={(<div className='filter_list'>{filters}{list}</div>)} />)

}
export default App;
