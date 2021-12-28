import { Course } from '@/interfaces/courses';
import CourseInfo from './CourseInfo';

interface Props {
  focusedCourse: Course | null;
  semesterDropdown: JSX.Element
}

const CourseFocus = ({ focusedCourse, semesterDropdown }: Props) => {
  return (
    <div className='focus'>
      <div className='focus-header'>
        <div className='header-left'> {semesterDropdown} </div>
        <h1>Subject Searcher</h1>
        <div className='header-right'> {' '}</div>
      </div>
      {focusedCourse === null ? (
        <></>
      ) : (
          <CourseInfo course={focusedCourse} />
      )}
    </div>
  );
}
export default CourseFocus