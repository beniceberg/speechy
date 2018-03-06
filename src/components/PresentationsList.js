import React from 'react';

import { PresentationView } from './PresentationView';

const renderPresentations = (props) => {
  return props.presentations.map((presentation) => {
    return <PresentationView
      key={presentation._id}
      presentation={presentation}
      deletePresentation={props.deletePresentation} />
  });
}

export const PresentationsList = (props) => (
  <div className="PresentationsList">
    <h3>Recent presentations:</h3>
    <div className="presentationsList">
      {renderPresentations(props)}
    </div>
  </div>
)
