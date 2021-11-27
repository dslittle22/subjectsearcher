import {
  useState,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from 'react';
import styles from '@/styles/coursesSplitView.module.css';
import { Course } from '@/interfaces/courses';
import { Filters } from '@/interfaces/filters';
import {
  getQueryParam,
  addQueryParam,
  applyFilters,
  udpateQueryFilter,
} from '@/lib/filters';
interface Props {
  courses: Course[];
  setFilteredCourses: Dispatch<SetStateAction<Course[]>>;
}

const ListFilter = ({ courses, setFilteredCourses }: Props) => {
  const [searchStr, setSearchStr] = useState(getQueryParam('query'));
  const [filters, setFilters] = useState<Filters>(!searchStr ? {} : 
    {query: (course: Course) =>
      course.title
        .toLocaleLowerCase()
        .includes(getQueryParam('query').toLocaleLowerCase())});
  const [queryDropdown, setQueryDropdown] = useState("title")

  useEffect(() => {
    setFilteredCourses(courses.filter(course => applyFilters(course, filters)));
  }, [searchStr, courses, filters, setFilteredCourses]);

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchStr(e.target.value);
    addQueryParam('query', e.target.value.toLocaleLowerCase());
    udpateQueryFilter(filters, setFilters, e.target.value, queryDropdown);
  };

  const handleDropdownChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.children[e.target.selectedIndex] as HTMLOptionElement
    setQueryDropdown(option.value)
    udpateQueryFilter(filters, setFilters, searchStr, option.value);
  }

  return (
    <div className="filter">
      <label htmlFor="search"> Search by: </label>
      <select onChange={handleDropdownChange} className="filter-dropdown" name="search" id="search">
      <option className="dropdown-item" value="title">Title</option>
      <option className="dropdown-item" value="subject">Subject</option>
      <option className="dropdown-item" value="professor">Professor</option>
      </select>
      <br />
      <input value={searchStr} onChange={handleQueryChange} />
    </div>
  );
};

export default ListFilter;
