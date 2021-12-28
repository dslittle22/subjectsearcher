import {MouseEvent, useState} from 'react';
import { Course } from '@/interfaces/courses';
import { formatTime } from '@/lib/processCourseData';

interface Props {
  course: Course;
  handleListClick: (course: Course) => void;
  handleStarredChange: (crn: string, term: string, adding: boolean) => void;
  filterStarred: boolean;
}


const CourseListItem = ({ course, handleListClick, handleStarredChange, filterStarred }: Props) => {
  const initialStarred = JSON.parse(
    localStorage.getItem('subject-searcher-starred') || '[]'
  ).includes(`${course.crn}-${course.term}`);
  const [isStarred, setIsStarred] = useState(initialStarred)

  const handleStarClick = (e: MouseEvent<HTMLElement>) => {
    handleStarredChange(course.crn, course.term, !isStarred)
    setIsStarred(!isStarred)
  }

  return filterStarred && !isStarred ? (
    <></>
  ) : (
    <li className='course-listitem'>
      <p>
        <span
          className={`star ${isStarred ? 'starred' : ''}`}
          onClick={handleStarClick}
        >{`★ `}</span>
        <span onClick={() => handleListClick(course)} className='underlineable'>
          <span className='course-title'>{course.title}
          {course.sect !== '0' ? ` (${course.sect})` : ''}
          </span>
          {/* <br /> */}
          {' - ' + course.subj_desc + ' ' + course.num + ', '}
          {`${course.allprofs ? course.allprofs : 'Professor unknown'}. `}
          {formatTime(course)}
        </span>
      </p>
    </li>
  );
};

export default CourseListItem