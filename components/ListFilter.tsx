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

interface Props {
  courses: Course[];
  setFilteredCourses: Dispatch<SetStateAction<Course[]>>;
}
const ListFilter = ({ courses, setFilteredCourses }: Props) => {
  const [filters, setFilters] = useState<Filters>({});
  const [searchStr, setSearchStr] = useState('');

  const doFilters = (course: Course): boolean => {
    let flag = true;
    for (const [k, fn] of Object.entries(filters)) {
      flag = fn(course) ? flag : false;
    }
    return flag;
  };

  useEffect(() => {
    if (searchStr === '') return;
    setFilteredCourses(courses.filter(doFilters));
  }, [searchStr]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchStr(e.target.value);
    if (e.target.value != '') {
      setFilters({
        ...filters,
        queryFilter: (course: Course) =>
          course.title
            .toLocaleLowerCase()
            .includes(e.target.value.toLocaleLowerCase()),
      });
    }
  };

  return (
    <div className={styles.filter}>
      Filter
      <input value={searchStr} onChange={handleChange} />
    </div>
  );
};

export default ListFilter;
