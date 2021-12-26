import { ReactElement, useRef} from 'react'
import {
  getQueryParam,
  addQueryParam,
  getMultiSelectFilterFunction,
} from '@/lib/filterLogic';
import { Course } from '@/interfaces/courses';
import Multiselect from 'multiselect-react-dropdown';
import {capitalize} from '@/lib/misc'

interface Props {
   data: any[];
   filterKey: string;
   attr: keyof Course;
   onFilterChange: (
    filterKey: string,
    filterFunction?: ((course: Course) => boolean) | undefined
  ) => void;
}

export default function MultiSelectFilter({
  data,
  filterKey,
  attr,
  onFilterChange,
}: Props): ReactElement {

  const multiselectRef = useRef<Multiselect>(null)

  const resetSelected = () => {
    if (multiselectRef.current === null) return
    multiselectRef.current.resetSelectedValues()
    handleOnChange([])
  }

  const handleOnChange = (selected: string[]) => {
    const queryStr = selected.map((val) => val.replaceAll(' ', '_')).join(',')
    addQueryParam(filterKey, queryStr)
    onFilterChange(filterKey, getMultiSelectFilterFunction(selected, attr)); 
  }

  const style = {
    searchBox: {
      backgroundColor: 'white'
      },
    inputField: {
      minHeight: '20px',
    },
    chips: {
      background: 'grey',
      marginBottom: '0px'
    },
    option: {
      color: 'white',
      background: 'grey',
      borderTop: 'white solid 1px',
      padding: '0 2px 5px 2px'
    }
  }

  const initialSelected: string[] = function() {
    const queryParam = getQueryParam(filterKey)
    return queryParam
    ? queryParam.replaceAll('_', ' ').split(',')
    : []
  }() 
    
  

  return (
    <div className='multiselect-dropdown-container'>
      <Multiselect
        options={data}
        onSelect={handleOnChange}
        onRemove={handleOnChange}
        isObject={false}
        ref={multiselectRef}
        placeholder={capitalize(filterKey)}
        hidePlaceholder
        showCheckbox
        closeIcon='close'
        style={style}
        selectedValues={initialSelected}
      ></Multiselect>
      <button className='dropdown-button' style={{ flex: '1', marginLeft: '10px' }} onClick={resetSelected}>
        <span className='dropdown-arrow'>{'▼'}</span>
        Clear
      </button>
    </div>
  );
}
