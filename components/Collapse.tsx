import React, { useEffect, useState } from 'react'

interface Props {
    heading: string;
    content?: string;
    children?: JSX.Element | JSX.Element[];
    propsActive?: boolean; //optional prop to set the active value
    onHeaderClick?: () => void; //optional function to run when clicking label
}

const Collapse = ({heading, content, propsActive, children, onHeaderClick}: Props) => {
  const [active, setActive] = useState(propsActive || false)
    
  useEffect(() => {
    if (propsActive !== undefined) setActive(propsActive)
  }, [propsActive])
  
    const handleClick = () => {
      if (propsActive === undefined) {
        setActive(!active)
      }
      if (onHeaderClick !== undefined) onHeaderClick()
    }

    return (
      <div className={`collapse-container ${active ? 'active' : 'inactive'}`}>
        <div className={`collapse-header ${active ? 'active' : 'inactive'}`} onClick={handleClick}>
          <span>{heading}</span>
          <span>{active ? 'hide ▲' : 'show ▼'}</span>
        </div>
        <div className={`collapse-content ${active ? 'active' : 'inactive'}`}>{content}{children}</div>
      </div>
    );
}

export default Collapse
