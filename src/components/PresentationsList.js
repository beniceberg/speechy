import React from 'react';

import '../styles/PresentationsList.css';

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
    {renderPresentations(props)}
  </div>
)
