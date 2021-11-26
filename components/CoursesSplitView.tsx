import { useState } from 'react';
import { Course } from '@/interfaces/courses';
import CourseFocus from './CourseFocus';
import CoursesList from './CoursesList';
import styles from '@/styles/coursesSplitView.module.css';

interface Props {
  courses: Course[] | null;
}

const CoursesSplitView = ({ courses }: Props) => {
  const [starredCourses, setStarredCourses] = useState<Course[]>([]);
  const [focusedCourse, setFocusedCourse] = useState<Course | null>(null);

  return (
    <div className={styles.container}>
      <CourseFocus focusedCourse={focusedCourse} />
      {courses === null ? (
        <p className={styles.list_container}>Loading courses...</p>
      ) : (
        <CoursesList
        courses={courses}
        starredCourses={starredCourses}
        handleListClick={(e, course) => setFocusedCourse(course)}
        />
        )}
    </div>
  );
};

export default CoursesSplitView;
