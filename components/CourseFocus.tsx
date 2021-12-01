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
        <p>
          {
            "Welcome to SubjectSearcher, a replacement for Bowdoin's ClassFinder.\
            Click on a class to view its info!"
          }
        </p>
      ) : (
          <CourseInfo course={focusedCourse} />
      )}
    </div>
  );
}
