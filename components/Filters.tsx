import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { Course } from '@/interfaces/courses';
import { Filters } from '@/interfaces/filters';
import QueryFilter from './QueryFilter';
import { applyFilters } from '@/lib/filterLogic'
import { getQueryParam, addQueryParam } from '@/lib/filterLogic'
import MultiSelectFilter from '@/components/MultiSelectFilter';
import Collapse from './Collapse';
import TimeFilter from './TimeFilter';
import StarredFilter from './StarredFilter';

interface Props {
  courses: Course[];
  setFilteredCourses: Dispatch<SetStateAction<Course[]>>;
  filterStarred: boolean;
  setFilterStarred: Dispatch<SetStateAction<boolean>>;
}

const Filters = ({ courses, setFilteredCourses, filterStarred, setFilterStarred }: Props) => {
  const [filters, setFilters] = useState<Filters>({});
  const [subjects, setSubjects] = useState(new Set());
  const [profs, setProfs] = useState(new Set());
  const [filterExpanded, setFilterExpanded] = useState(false);

  useEffect(() => {
    const expandedLocalStorage = getQueryParam("filterexpanded")
    if (expandedLocalStorage === "true") setFilterExpanded(true)

    setSubjects(new Set(courses.map(course => course.subj_desc)));
    const nextProfs = new Set();
    courses.forEach(course => {
      if (!course.allprofs) return;
      course.allprofs.split(', ').forEach(name => {
        nextProfs.add(name);
      });
    });
    setProfs(nextProfs);
  }, [courses]);

  useEffect(() => {
    setFilteredCourses(courses.filter(course => applyFilters(course, filters)));
  }, [courses, filters, setFilteredCourses]);

  const onFilterChange = (
    filterKey: string,
    filterFunction?: (course: Course) => boolean
  ) => {
    setFilteredCourses(
      courses.filter(course =>
        applyFilters(course, { ...filters, [filterKey]: filterFunction })
      )
    );
    setFilters({ ...filters, [filterKey]: filterFunction });
  };

  const handleFilterCollapseClick = () => {
    addQueryParam('filterexpanded', filterExpanded === true ? '' : 'true')
    setFilterExpanded(!filterExpanded)
  }

  
  return !courses.length ? (
    <div className='filter'></div>
  ) : (
    <div className='filter'>
      <QueryFilter
        filterKey='title'
        attr='title'
        onFilterChange={onFilterChange}
      />
      <div className='filter-collapse-container' >
      <Collapse heading='More filters' propsActive={filterExpanded} onHeaderClick={handleFilterCollapseClick}>

        <MultiSelectFilter
          onFilterChange={onFilterChange}
          data={Array.from(subjects)}
          filterKey='subject'
          attr='subj_desc'
          />
        <MultiSelectFilter
          onFilterChange={onFilterChange}
          data={Array.from(profs)}
          filterKey='professor'
          attr='allprofs'
          />

        <TimeFilter onFilterChange={onFilterChange} filterKey='time'/>

        <StarredFilter filterStarred={filterStarred} setFilterStarred={setFilterStarred} />
      </Collapse>
      </div>
    </div>
  );
};

export default Filters;
