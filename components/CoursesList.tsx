import { Dispatch, SetStateAction, useEffect, useState} from 'react';
import { CourseListItem } from '@/components/CourseListItem';
import { Course } from '@/interfaces/courses';
import StarredFilter from './StarredFilter';

interface Props {
  filteredCourses: Course[];
  setFocusedCourse:  Dispatch<SetStateAction<Course | null>>
}

const CoursesList = ({ filteredCourses, setFocusedCourse }: Props) => {
  const [starredCourses, setStarredCourses] = useState(new Set<string>([]))
  const [filterStarred, setFilterStarred] = useState(false)


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


  const onStarredFilterChange = () => {
    setFilterStarred(!filterStarred)
  }

  return (
    <>
      <StarredFilter onStarredFilterChange={onStarredFilterChange} filterStarred={filterStarred}/>
      {filteredCourses.length ? (
        <ul className='courses-list'>
          {filteredCourses.map((course, idx) => (
            <CourseListItem
              filterStarred={filterStarred}
              course={course}
              handleListClick={(course: Course) => setFocusedCourse(course)}
              key={course.crn + course.subj}
              handleStarredChange={handleStarredChange}
            />
          ))}
        </ul>
      ) : (
        <div>No courses found. :(</div>
      )}
    </>
  );
};

export default CoursesList;
