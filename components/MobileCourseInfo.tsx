import { Course } from '@/interfaces/courses';
import { MouseEvent } from 'react';
import Collapse from './Collapse';

interface Props {
  course: Course
  formatRequirements: () => void;
  formatPreference: () => void;
  copy: (
    e: MouseEvent<HTMLParagraphElement, globalThis.MouseEvent>,
    content: string
  ) => void;

}

const MobileCourseInfo = ({ course, formatPreference, formatRequirements, copy }: Props) => {
    const pref: string = course.rules.springpref
    ? course.rules.springpref
    : course.rules.fallpref
    ? course.rules.fallpref
    : '';

  return (
    <div className='mobile_course_info'>
      <div className='info_top'>
        <p className='course-title'>
          {course.title} 
          {course.sect !== '0' ? ` (${course.sect})` : ''}
        </p>
        <p>
          {course.subj_desc}
          {', ' + course.subj + ' ' + course.num}
        </p>
      </div>
      
      <div className='left'>
        <div onClick={e => copy(e, course.crn)}>
          CRN: <span className='copyable'>{course.crn}</span> (click to copy)
        </div>
        {pref && (
          <div className='info_priority'>Registration rules: {pref}</div>
        )}
      </div>
      
      <div className='right'>
        <div className='info_reg'>
          <p>Credits: {course.credit.substring(0, 4)}</p>
          {course.rules.prereq && <p>Prerequisites: {course.rules.prereq}</p>}
          Distribution: {formatRequirements()}
        </div>
        <div className='info_slots'>
          <div>Capacity: {course.seats.capacity}</div>
          <div>Open spots: {course.seats.remaining}</div>
          <div>Pending requests: {course.seats.pending}</div>
        </div>
      </div>
      <div className='info_desc'>
          <Collapse heading='Description' content={course.description} />
        </div>
    </div>
  );
};

export default MobileCourseInfo