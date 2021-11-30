import { useState, MouseEvent, Dispatch, SetStateAction} from 'react';
import { CourseListItem } from '@/components/CourseListItem';
import Filters from '@/components/Filters';
import { Course } from '@/interfaces/courses';
import styles from '@/styles/coursesSplitView.module.css';

interface Props {
  filteredCourses: Course[];
  setFocusedCourse:  Dispatch<SetStateAction<Course | null>>
}

const CoursesList = ({ filteredCourses, setFocusedCourse }: Props) => {

  return (
      <ul className={styles.list}>
          {filteredCourses.map((course, idx) => (
        <CourseListItem
          course={course}
          handleListClick={(course: Course) => setFocusedCourse(course)}
          key={course.crn + course.subj}
        />
      ))}
        </ul>
  );
};

export default CoursesList;
