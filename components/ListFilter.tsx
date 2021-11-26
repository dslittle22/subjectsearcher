import {
  useState,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from 'react';
import styles from '@/styles/coursesSplitView.module.css';
import { Course } from '@/interfaces/courses';
import { Filters } from '@/interfaces/filters';
import {
  getQueryParam,
  addQueryParam,
  applyFilters,
  udpateQueryFilter,
} from '@/lib/filters';
interface Props {
  courses: Course[];
  setFilteredCourses: Dispatch<SetStateAction<Course[]>>;
}

const ListFilter = ({ courses, setFilteredCourses }: Props) => {
  const [searchStr, setSearchStr] = useState(getQueryParam('query'));
  const [filters, setFilters] = useState<Filters>({
    query: !searchStr
      ? undefined
      : (course: Course) =>
          course.title
            .toLocaleLowerCase()
            .includes(getQueryParam('query').toLocaleLowerCase()),
  });

  useEffect(() => {
    setFilteredCourses(courses.filter(course => applyFilters(course, filters)));
  }, [searchStr, courses, filters, setFilteredCourses]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchStr(e.target.value);
    addQueryParam('query', e.target.value.toLocaleLowerCase());
    udpateQueryFilter(filters, setFilters, e.target.value);
  };

  return (
    <div className={styles.filter}>
      Search: {' '}
      <input value={searchStr} onChange={handleChange} />
    </div>
  );
};

export default ListFilter;
