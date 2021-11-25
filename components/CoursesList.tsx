import { useState, MouseEvent} from 'react';
import { CourseListItem } from '@/components/CourseListItem';
import ListFilter from '@/components/ListFilter';
import { Course } from '@/interfaces/courses';
import styles from '@/styles/coursesSplitView.module.css';

interface Props {
  courses: Course[] | null;
  starredCourses: Course[];
  handleListClick: (e: MouseEvent<HTMLElement>, course: Course) => void;
}

const CoursesList = ({ courses, starredCourses, handleListClick }: Props) => {
  // const [filters, setFilters] = useState<((course: Course) => boolean)[] | null>(null)
  

  return (
    <div className={styles.listcontainer} >
      {/* <ListFilter filters={filters} setFilters={setFilters} /> */}
      <ListFilter />
      {courses === null ? (
        <p>loading courses from Bowdoin's database...</p>
      ) : (
        <ul className={styles.list}>
          {courses.map((course: Course) => (
        <CourseListItem
          course={course}
          handleListClick={handleListClick}
          key={course.crn + course.subj}
        />
      ))}
        </ul>
      )}
    </div>
  );
};

export default CoursesList;
