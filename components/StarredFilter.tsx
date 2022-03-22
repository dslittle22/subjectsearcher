import React, { ReactElement, Dispatch, SetStateAction } from 'react'

interface Props {
  filterStarred: boolean;
  setFilterStarred: Dispatch<SetStateAction<boolean>>;
}

const StarredFilter = ({ filterStarred, setFilterStarred }: Props): ReactElement => {

  const resetStarred = () => {
    localStorage.removeItem('subject-searcher-starred')
    window.location.reload();
  }

  return (
    <div className='center-button'>
      <button
        className={`${filterStarred ? 'starred' : ''}`}
        onClick={() => setFilterStarred(!filterStarred)}
      >
        {filterStarred ? (
          'Show all'
        ) : (
          <>
            {'Show only '}
            <span className={`star ${filterStarred ? 'starred' : ''}`}>
              {` ★ `}
            </span>
          </>
        )}
      </button>
      <button onClick={resetStarred}>Reset starred</button>
    </div>
  );
}

export default StarredFilter 