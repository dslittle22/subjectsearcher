import { findNextSemesterRoute } from '@/lib/dates';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/coursesSplitView.module.css';
import CourseFocus from '@/components/CourseFocus';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      router.push(findNextSemesterRoute());
    }
  }, [router]);

  return (
    <div className='container'>
      <CourseFocus focusedCourse={null} />
      <p className='list_container'>Loading courses...</p>
    </div>
  );
};

export default Home;
