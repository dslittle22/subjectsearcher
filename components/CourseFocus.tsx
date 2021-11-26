import { Course } from '@/interfaces/courses';
import styles from '@/styles/coursesSplitView.module.css';
import { CourseInfo } from './CourseInfo';

interface Props {
  focusedCourse: Course | null;
}

export default function CourseFocus({ focusedCourse }: Props) {
  
  return (
    <div className={styles.focus}>
      <div className={styles.focusheader}>
        <h1>Subject Searcher</h1>
      </div>
      {focusedCourse === null ? (
        <p>
          {
            "Welcome to SubjectSearcher, a replacement for Bowdoin's ClassFinder.\
            Click on a class to view its info!"
          }
        </p>
      ) : (
        <div>
          <CourseInfo course={focusedCourse} />
        </div>
      )}
    </div>
  );
}
