import React, { ReactElement } from 'react'

interface Props {
    onStarredFilterChange: () => void;
    filterStarred: boolean 
}

export default function StarredFilter({onStarredFilterChange, filterStarred}: Props): ReactElement {

    const resetStarred = () => {
        localStorage.removeItem('subject-searcher-starred')
        window.location.reload();
      }
    
    return (
        
      <div className='center-button'>
      <span className={`star ${filterStarred? 'starred' : ''}`} onClick={onStarredFilterChange}>{`★ `}</span>
      <button onClick={resetStarred}>Reset starred</button>
    </div>
    )
}
