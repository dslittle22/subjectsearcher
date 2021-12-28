import { Course } from '@/interfaces/courses';
import { MouseEvent } from 'react';
import Collapse from './Collapse';

interface Props {
  course: Course
}

const CourseInfo = ({ course }: Props) => {
  const copy = (
    e: MouseEvent<HTMLParagraphElement, globalThis.MouseEvent>,
    content: string
  ) => {
    if (content) {
      navigator.clipboard.writeText(content).then(
        () => null,
        () => {
          console.error('Failed to copy to clipboard.');
        }
      );
    }
  };

  const formatRequirements = () => {
    const stuff = []
    for (const arr of [course.distrib, course.designation, course.curricular]) {
      if (arr) {
        for (const obj of arr) {
          stuff.push(obj.id)
        }
      }
    }
    return <span>{stuff.join(', ')}</span>
  }

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
    <div className='course_info'>
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
        <div>
          <p onClick={e => copy(e, course.crn)}>
            {' '}
            CRN: <span className='copyable'>{course.crn}</span> (click to copy)
          </p>
        </div>

        <div className='info_priority'>
          {pref && (
            <div>
              Registration rules:
              {pref}
            </div>
          )}
          {/* <p>
            Priority for shut-out?{' '}
            {course.rules.priority === 'true' ? 'Yes' : 'No'}
          </p> */}
        </div>
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
        <div className='info_desc'>
          <Collapse heading='Description' content={course.description} />
        </div>
      </div>
    </div>
  );
};

export default CourseInfo