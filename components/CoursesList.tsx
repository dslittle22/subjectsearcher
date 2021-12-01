import { Dispatch, SetStateAction, useEffect} from 'react';
import { CourseListItem } from '@/components/CourseListItem';
import { Course } from '@/interfaces/courses';
import styles from '@/styles/coursesSplitView.module.css';

interface Props {
  filteredCourses: Course[];
  setFocusedCourse:  Dispatch<SetStateAction<Course | null>>
}

const CoursesList = ({ filteredCourses, setFocusedCourse }: Props) => {
  useEffect(() => {
    if (filteredCourses.length < 1) return
    setFocusedCourse(filteredCourses[0])
  }, [filteredCourses])

  return filteredCourses.length ? (
      <ul className='courses-list'>
          {filteredCourses.map((course, idx) => (
        <CourseListItem
          course={course}
          handleListClick={(course: Course) => setFocusedCourse(course)}
          key={course.crn + course.subj}
        />
      ))}
        </ul>
  ) : <div>No courses found. :(</div>
};

export default CoursesList;
