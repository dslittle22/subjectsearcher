import { useState, ChangeEvent, Dispatch, SetStateAction } from 'react';
import styles from '@/styles/coursesSplitView.module.css';
import { Course } from '@/interfaces/courses';
import { Filters } from '@/interfaces/filters';
import CourseFocus from './CourseFocus';

interface Props {
    // filteredCourses: Course[],
    // setFilteredCourses: Dispatch<SetStateAction<Course[]>>
}
// const ListFilter = ({filteredCourses, setFilteredCourses}: Props) => {
const ListFilter = (props: Props) => {
  const [filters, setFilters] = useState<Filters>({});
  const [searchStr, setSearchStr] = useState('');
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchStr(e.target.value);
      setFilters({...filters, queryFilter: (course) => course.title.includes(searchStr) })
      // setFilteredCourses(filteredCourses.filter( course => {
      //     let flag = true;
      //     for (const [k, fn] of Object.entries(filters)) {
      //       flag = fn(course) ? flag : false
      //     }
      //     return flag
      // }))
  };

  return (
    <div className={styles.filter}>
      Filter
      <input value={searchStr} onChange={handleChange} />
    </div>
  );
};

export default ListFilter;
