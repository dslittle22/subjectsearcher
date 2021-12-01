import { Course } from '@/interfaces/courses';
import styles from '@/styles/coursesSplitView.module.css';
import { CourseInfo } from './CourseInfo';

interface Props {
  focusedCourse: Course | null;
  semesterDropdown: JSX.Element
}

export default function CourseFocus({ focusedCourse, semesterDropdown }: Props) {
  return (
    <div className='focus'>
      <div className='focus-header'>
        <div className='header-left'> {semesterDropdown} </div>
        <h1>Subject Searcher</h1>
        <div className='header-right'> {' '}</div>
      </div>
      {focusedCourse === null ? (
        <p>Loading info...</p>
      ) : (
          <CourseInfo course={focusedCourse} />
      )}
    </div>
  );
}
