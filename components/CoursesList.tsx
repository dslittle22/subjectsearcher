import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import CourseListItem from '@/components/CourseListItem';
import { Course } from '@/interfaces/courses';

interface Props {
  filteredCourses: Course[];
  setFocusedCourse: Dispatch<SetStateAction<Course | null>>;
  focusedCourse: Course | null;
  filterStarred: boolean;
}

const CoursesList = ({ filteredCourses, setFocusedCourse, focusedCourse, filterStarred }: Props) => {
  const [starredCourses, setStarredCourses] = useState(new Set<string>([]))

  useEffect(() => {
    if (filteredCourses.length < 1) return
    setFocusedCourse(filteredCourses[0])
    const starredLocalStorage = localStorage.getItem('subject-searcher-starred')
    if (starredLocalStorage) setStarredCourses(new Set(JSON.parse(starredLocalStorage)))
  }, [filteredCourses])

  const handleStarredChange = (crn: string, term: string, adding: boolean) => {
    let updated = new Set<string>(starredCourses);
    if (adding) {
      updated.add(`${crn}-${term}`)
    } else {
      updated.delete(`${crn}-${term}`)
    }
    localStorage.setItem('subject-searcher-starred', JSON.stringify(Array.from(updated)))
    setStarredCourses(updated)
  }

  const renderFilteredCourses = () => {
    let starFilteredCourses = filteredCourses
    if (filterStarred) {
      starFilteredCourses = filteredCourses
        .filter(course => starredCourses.has(`${course.crn}-${course.term}`))
    }
    return (starFilteredCourses.map((course) => (
      <CourseListItem
        course={course}
        handleListClick={() => setFocusedCourse(course)}
        key={course.crn + course.subj}
        handleStarredChange={handleStarredChange}
        isSelected={JSON.stringify(focusedCourse) === JSON.stringify(course)}
      />
    )))
  }

  return (
    <>
      {filteredCourses.length ? (
        <ul className='courses-list'>
          {renderFilteredCourses()}
        </ul>
      ) : (
        <div>No courses found. :(</div>
      )}
    </>
  );
};

export default CoursesList;
