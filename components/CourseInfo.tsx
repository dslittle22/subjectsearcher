import { Course } from '@/interfaces/courses';
import {MouseEvent} from 'react'
import styles from '@/styles/coursesSplitView.module.css';

export const CourseInfo = ({course}: {course: Course }) => {
    const copy = (e: MouseEvent<HTMLParagraphElement, globalThis.MouseEvent>, content: string)=> {
        if (content) {
            navigator.clipboard.writeText(content)
            .then(() =>  null, () => {
                console.log('Failed to copy to clipboard.')
            });
        }
    }
    
    return (
      <div>
        <p className={'course-title'}>
          {course.title} {course.sect !== '0' ? ` (${course.sect})` : ''}
        </p>

        <p>{course.subj_desc}{', ' + course.subj + ' ' + course.num}</p>
        <p className={styles.copyable} onClick={e => copy(e, course.crn)}>
          {' '}
          CRN: {course.crn} (click to copy)
        </p>
      </div>
    );
}
