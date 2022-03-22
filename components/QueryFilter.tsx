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
import {capitalize} from '@/lib/misc'

interface Props {
  filterKey: string,
  attr: keyof Course,
  onFilterChange: (
    filterKey: string,
    filterFunction?: ((course: Course) => boolean) | undefined
  ) => void;
}

const QueryFilter = ({ filterKey, attr, onFilterChange }: Props) => {
  const [searchStr, setSearchStr] = useState(getQueryParam(filterKey));

  useEffect(() => {
    onFilterChange(filterKey, getQueryFilterFunction(searchStr, attr));
  }, [searchStr]);

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    addQueryParam('title', e.target.value.toLocaleLowerCase());
    setSearchStr(e.target.value);
  };

  return (
      <input
        className='search-input'
        placeholder={capitalize(filterKey)}
        value={searchStr}
        onChange={handleQueryChange}
      />
  );
};

export default QueryFilter;
