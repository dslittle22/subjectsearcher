import { ChangeEvent } from 'react';
import {Semester} from '@/interfaces/semester'
import {semesterToRoute, pastSemestersList} from '@/lib/dates'

interface Props {
    onSemesterDropdownChange: (semesterRoute: string) => void;
    semester: Semester | null;
}

const SemesterDropdown = ({onSemesterDropdownChange, semester}: Props) => {

  const stringifySemester = (semester: Semester) =>
    String(semester.year) + ' ' + semester.season;

    const getOptionValue = (e: ChangeEvent<HTMLSelectElement>) => {
      const option = e.target.children[
        e.target.selectedIndex
      ] as HTMLOptionElement;
      return option.value;
    };

 const handleSemesterSelectorChange = (
      e: ChangeEvent<HTMLSelectElement>
    ) => {
      const [year_s, season] = getOptionValue(e).split(' ');
        const semesterRoute = semesterToRoute({
          year: Number(year_s),
          season: season === 'spring' ? 'spring' : 'fall',
        });
        onSemesterDropdownChange(semesterRoute)
    };


  return semester === null ? 
  (<div className='sem-dropdown'>Semester: loading...</div>) : 
  (
    <div className='sem-dropdown'>
    <label htmlFor='semester'>Semester: </label> <br />
    <select
      name='semester'
      id='semester'
      value={stringifySemester(semester)}
      onChange={handleSemesterSelectorChange}
    >
      {pastSemestersList.map((semester, i) => (
        <option key={i} value={stringifySemester(semester)}>
          {stringifySemester(semester)}
        </option>
      ))}
    </select>
  </div>
  );
};

export default SemesterDropdown;
