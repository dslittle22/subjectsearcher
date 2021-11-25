import {MouseEvent} from 'react';
import { Course } from '@/interfaces/courses';
import styles from '@/styles/coursesSplitView.module.css';

interface Props {
  course: Course;
  handleListClick: (e: MouseEvent<HTMLElement>, course: Course) => void;
}

export const CourseListItem = ({ course, handleListClick }: Props) => {
  return (
    <li className={styles.listitem} onClick={e => handleListClick(e, course)}>
      {course.title}
    </li>
  );
};
