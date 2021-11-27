import { findNextSemesterRoute } from '@/lib/dates';
import { useEffect } from 'react';
import router, { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      router.push(findNextSemesterRoute());
    }
  }, [router]);

  return <div></div>
};

export default Home;
