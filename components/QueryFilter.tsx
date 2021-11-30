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
import { useRouter } from 'next/router';
import { Course } from '@/interfaces/courses';
import { QueryDropdown } from '@/interfaces/filters';

interface Props {
  onFilterChange: (
    filterKey: string,
    filterFunction?: ((course: Course) => boolean) | undefined
  ) => void;
}

const QueryFilter = ({ onFilterChange }: Props) => {
  const [searchStr, setSearchStr] = useState('');
  const [queryDropdown, setQueryDropdown] = useState<QueryDropdown>('title');

  const router = useRouter()
  useEffect(() => {
    setSearchStr(getQueryParam('query'));  
    const urlDropdownOption = getQueryParam('qDropdown') 
    if (urlDropdownOption !== 'title' && urlDropdownOption !== 'professor') {
      setQueryDropdown('title');
      addQueryParam('qDropdown', 'title')
    } else {
      setQueryDropdown(urlDropdownOption);
    }
  }, [router.isReady])
  
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
    addQueryParam('qDropdown', option.value);
    setQueryDropdown(option.value as QueryDropdown);
  };

  return (
    <div>
      <label htmlFor='search'> Search by: </label>
      <select
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
