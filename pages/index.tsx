import { findNextSemesterRoute } from '@/lib/dates';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import CourseFocus from '@/components/CourseFocus';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return
      router.push(findNextSemesterRoute());
  }, [router, router.isReady]);

  return (
    <div className='container'>
      <CourseFocus focusedCourse={null} semesterDropdown={<></>}/>
      <p className='filter_list'>Loading courses...</p>
    </div>
  );
};

export default Home;
