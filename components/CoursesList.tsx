import { Dispatch, SetStateAction} from 'react';
import { CourseListItem } from '@/components/CourseListItem';
import { Course } from '@/interfaces/courses';
import styles from '@/styles/coursesSplitView.module.css';

interface Props {
  filteredCourses: Course[];
  setFocusedCourse:  Dispatch<SetStateAction<Course | null>>
}

const CoursesList = ({ filteredCourses, setFocusedCourse }: Props) => {

  return filteredCourses.length ? (
      <ul className={styles.list}>
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
