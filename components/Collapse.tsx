import React, { useState } from 'react'

interface Props {
    heading: string;
    content: string;    
}

const Collapse = ({heading, content}: Props) => {
    const [active, setActive] = useState(false)
    return (
      <div className={`collapse-container ${active ? 'active' : 'inactive'}`}>
        <div className={`collapse-header ${active ? 'active' : 'inactive'}`} onClick={() => setActive(!active)}>
          <span>{heading}</span>
          <span>{active ? '▲' : '▼'}</span>
        </div>
        <div className={`collapse-content ${active ? 'active' : 'inactive'}`}>{content}</div>
      </div>
    );
}

export default Collapse
