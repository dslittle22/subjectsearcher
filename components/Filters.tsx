import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { Course } from '@/interfaces/courses';
import { Filters } from '@/interfaces/filters';
import QueryFilter from './QueryFilter';
import {applyFilters} from '@/lib/filterLogic'
import MultiSelectFilter from '@/components/MultiSelectFilter';
import { isDev } from '@/lib/misc';

interface Props {
  courses: Course[];
  setFilteredCourses: Dispatch<SetStateAction<Course[]>>;
}

const Filters = ({ courses, setFilteredCourses }: Props) => {
  const [filters, setFilters] = useState<Filters>({})
  const [subjects, setSubjects] = useState(new Set())
  const [profs, setProfs] = useState(new Set())

  useEffect(() => {
    setSubjects(new Set(courses.map(course => course.subj_desc)))
    setProfs(new Set(courses.map(course => course.allprofs)))
    setFilteredCourses(courses.filter(course => applyFilters(course, filters)));
  }, [courses, filters, setFilteredCourses])

  const onFilterChange = (
    filterKey: string,
    filterFunction?: (course: Course) => boolean
  ) => {
    if (isDev()) console.log('resetting filtered courses');
    setFilteredCourses(
      courses.filter(course =>
        applyFilters(course, { ...filters, [filterKey]: filterFunction })
      )
    );
    setFilters({ ...filters, [filterKey]: filterFunction });
  };

  return (
    !courses.length ? <div className='filter'></div> : (
        <div className="filter">
         <QueryFilter filterKey='title' attr='title' onFilterChange={onFilterChange} />
         <MultiSelectFilter onFilterChange={onFilterChange} data={Array.from(subjects)} filterKey='subject' attr='subj_desc'/>
         <MultiSelectFilter onFilterChange={onFilterChange} data={Array.from(profs)} filterKey='professor' attr='allprofs'/>
         </div>
         ) 
      
  );
};

export default Filters;
