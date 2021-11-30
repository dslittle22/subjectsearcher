import {
  useState,
  useEffect,
  ChangeEvent,
} from 'react';
import {
  addQueryParam,
  getQueryParam,
  getQueryFilterFunction,
} from '@/lib/filterLogic';
import { Course } from '@/interfaces/courses';
import { QueryDropdown } from '@/interfaces/filters';

interface Props {
  onFilterChange: (
    filterKey: string,
    filterFunction?: ((course: Course) => boolean) | undefined
  ) => void;
}

const QueryFilter = ({ onFilterChange }: Props) => {
  const [searchStr, setSearchStr] = useState(getQueryParam('query'));
  const [queryDropdown, setQueryDropdown] = useState<QueryDropdown>(() => {
    const urlDropdown = getQueryParam('queryDropdown')
    if (urlDropdown !== 'title' && urlDropdown !== 'professor') return 'title'
    return urlDropdown
  });

  useEffect(() => {
    onFilterChange('query', getQueryFilterFunction(searchStr, queryDropdown));
  }, [searchStr, queryDropdown]);

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    addQueryParam('query', e.target.value.toLocaleLowerCase());
    setSearchStr(e.target.value);
  };

  const handleDropdownChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.children[
      e.target.selectedIndex
    ] as HTMLOptionElement;
    addQueryParam('queryDropdown', option.value);
    setQueryDropdown(option.value as QueryDropdown);
  };

  return (
    <div>
      <label htmlFor='search'> Search by: </label>
      <select
        value={queryDropdown}
        onChange={handleDropdownChange}
        className='filter-dropdown'
        name='search'
        id='search'
      >
        <option className='dropdown-item' value='title'>
          Title
        </option>
        <option className='dropdown-item' value='professor'>
          Professor
        </option>
      </select>
      <br />
      <input value={searchStr} onChange={handleQueryChange} />
    </div>
  );
};

export default QueryFilter;
