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

interface Props {
  courses: Course[];
  setFilteredCourses: Dispatch<SetStateAction<Course[]>>;
}



const Filters = ({ courses, setFilteredCourses }: Props) => {
  const [filters, setFilters] = useState<Filters>({})

  useEffect(() => {
    setFilteredCourses(courses.filter(course => applyFilters(course, filters)));
  }, [courses])

  const onFilterChange = (filterKey: string, filterFunction?: (course: Course) => boolean) => {
    console.log('running onFilterChange');
    
    setFilteredCourses(courses.filter(course => applyFilters(course, {...filters, [filterKey]: filterFunction})));
    setFilters({...filters, [filterKey]: filterFunction})
  }
  
  return (
    <div className="filter">
      <QueryFilter onFilterChange={onFilterChange} />
    </div>
  );
};

export default Filters;
