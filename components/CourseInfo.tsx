import { Course } from '@/interfaces/courses';
import {MouseEvent} from 'react'
import styles from '@/styles/coursesSplitView.module.css';
import { apiRouteToSemester } from '@/lib/dates';

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
      <>
        <div className='info-main'>
          <p className='course-title'>
            {course.title} {course.sect !== '0' ? ` (${course.sect})` : ''}
          </p>
          <p>
            {course.subj_desc}
            {', ' + course.subj + ' ' + course.num}
          </p>
          <p onClick={e => copy(e, course.crn)}>
            {' '}
            CRN: <span className={styles.copyable}>{course.crn}</span> (click to
            copy)
          </p>
          <div className='info-slots'>
            <div>
              Capacity: {course.seats.capacity}
            </div>
            <div>
              Open spots: {course.seats.remaining}
            </div>
            <div>
              Pending requests: {course.seats.pending}
            </div>
          </div>
        </div>
        <div className='info-desc'>
          <p>{course.description}</p>
        </div>
        <div className='info-reg'>
          <p>Term: {apiRouteToSemester(course.term)}</p>
          <p>Credits: {course.credit.substr(0, 4)}</p>
          <p>Prerequisites: {course.rules.prereq}</p>
        </div>
        <div className='info-priority'>
          {course.rules.springpref !== undefined ? (
           <p>{course.rules.springpref}</p>
          ) : <p>{course.rules.fallpref}</p>}
          <p>Priority for shut-out? {course.rules.priority === 'true' ? 'Yes' : "No"}</p>

        </div>
      </>
    );
}
