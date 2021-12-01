import { Course } from '@/interfaces/courses';
import { MouseEvent } from 'react';
import styles from '@/styles/courseInfo.module.css';
import { apiRouteToSemester } from '@/lib/dates';

export const CourseInfo = ({ course }: { course: Course }) => {
  const copy = (
    e: MouseEvent<HTMLParagraphElement, globalThis.MouseEvent>,
    content: string
  ) => {
    if (content) {
      navigator.clipboard.writeText(content).then(
        () => null,
        () => {
          console.log('Failed to copy to clipboard.');
        }
      );
    }
  };

  const formatPreference = (): JSX.Element => {
    const pref: string = course.rules.springpref
      ? course.rules.springpref
      : course.rules.fallpref
      ? course.rules.fallpref
      : '';

    return (
      <div>
        {pref.split(',').map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </div>
    );
  };
  const pref = formatPreference();

  return (
    <div className={styles.course_info}>
      <div className={styles.info_top}>
        <p className='course-title'>
          {course.title} {course.sect !== '0' ? ` (${course.sect})` : ''}
        </p>
        <p>
          {course.subj_desc}
          {', ' + course.subj + ' ' + course.num}
        </p>
      </div>
      <div className={styles.left}>
        <div>

        <p onClick={e => copy(e, course.crn)}>
          {' '}
          CRN: <span className='copyable'>{course.crn}</span> (click to copy)
        </p>
        </div>

        <div className={styles.info_priority}>
          {pref && (
            <div>
              Registration rules:
              {pref}
            </div>
          )}
          <p>
            Priority for shut-out?{' '}
            {course.rules.priority === 'true' ? 'Yes' : 'No'}
          </p>
        </div>
        <div className={styles.info_reg}>
          <p>Term: {apiRouteToSemester(course.term)}</p>
          <p>Credits: {course.credit.substr(0, 4)}</p>
          {course.rules.prereq && <p>Prerequisites: {course.rules.prereq}</p>}
        </div>
        <div className={styles.info_slots}>
          <div>Capacity: {course.seats.capacity}</div>
          <div>Open spots: {course.seats.remaining}</div>
          <div>Pending requests: {course.seats.pending}</div>
        </div>
      </div>
      <div className={styles.right}>
        <p className={styles.info_desc}>{course.description}</p>
      </div>
    </div>
  );
};
