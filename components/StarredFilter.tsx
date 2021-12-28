import React, { ReactElement } from 'react'

interface Props {
    onStarredFilterChange: () => void;
    filterStarred: boolean 
}

const StarredFilter = ({onStarredFilterChange, filterStarred}: Props): ReactElement => {

    const resetStarred = () => {
        localStorage.removeItem('subject-searcher-starred')
        window.location.reload();
      }
    
    return (
      <div className='center-button'>
        <button
          className={`${filterStarred ? 'starred' : ''}`}
          onClick={onStarredFilterChange}
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