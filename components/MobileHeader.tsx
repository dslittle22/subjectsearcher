interface Props {
    semesterDropdown: JSX.Element
  }
  
  const MobileHeader = ({ semesterDropdown }: Props) => {
    return (
      <div className='mobile-header'>
        <h1>Subject Searcher</h1>
        <div className='mobile-dropdown'> {semesterDropdown} </div>
      </div>
    );
  }
  export default MobileHeader