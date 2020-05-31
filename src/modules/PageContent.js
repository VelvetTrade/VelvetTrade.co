import React from 'react';

const PageContent = ({element, content}) => {
  return (
    <div >
      <hr ref={element}/>
        {content}
    </div>
  )
}

export default PageContent;