import { useState, MouseEvent} from 'react';
import { CourseListItem } from '@/components/CourseListItem';
import ListFilter from '@/components/ListFilter';
import { Course } from '@/interfaces/courses';
import { Filters } from '@/interfaces/filters';
import styles from '@/styles/coursesSplitView.module.css';

interface Props {
  courses: Course[];
  starredCourses: Course[];
  handleListClick: (e: MouseEvent<HTMLElement>, course: Course) => void;
}

const CoursesList = ({ courses, starredCourses, handleListClick }: Props) => {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses)

  return (
    <div className={styles.listcontainer} >
      <ListFilter courses={courses} setFilteredCourses={setFilteredCourses}/>
      {<ul className={styles.list}>
          {filteredCourses.map((course) => (
        <CourseListItem
          course={course}
          handleListClick={handleListClick}
          key={course.crn + course.subj}
        />
      ))}
        </ul>
      }
    </div>
  );
};

export default CoursesList;
