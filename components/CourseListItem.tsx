import {MouseEvent} from 'react';
import { Course } from '@/interfaces/courses';
import styles from '@/styles/coursesSplitView.module.css';
import { formateProfName, formatTime } from '@/lib/processCourseData';

interface Props {
  course: Course;
  handleListClick: (e: MouseEvent<HTMLElement>, course: Course) => void;
}


export const CourseListItem = ({ course, handleListClick }: Props) => {
 


  return (
    <li className={styles.listitem} onClick={e => handleListClick(e, course)}>
      <p className={'course-title'}>{course.title} {course.sect !== "0" ? ` (${course.sect})` : ''}</p>
      <p>
        {course.dept_desc + ' ' + course.num + ', ' + formateProfName(course) + '. '}
        {formatTime(course)}
      </p>
    </li>
  );
};
