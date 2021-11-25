import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CoursesSplitView from '@/components/CoursesSplitView';
import { Course } from '@/interfaces/courses';
import { fetchData } from '@/lib/fetchData';

function SemesterView({}) {
  const [courses, setCourses] = useState<Course[] | null>(null)
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
        setCourses(courses);
      }
    };

    tryToFetch();
  }, [router.isReady]);

  return (<CoursesSplitView courses={courses} />)

}
export default SemesterView;
