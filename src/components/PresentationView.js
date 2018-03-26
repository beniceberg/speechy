import React from 'react';
import { Link } from "react-router-dom";

import trash from '../assets/trash.svg';
import moment from 'moment';

export const PresentationView = (props) => (
  <div className="PresentationView">
    <Link to={`/presentation/${props.presentation._id}`} presentation={props.presentation}>
      <small>{moment(props.presentation.date).format('D MMMM')}</small>
      <p className="presTitle">{props.presentation.title}</p>
      <p className="author">Ben Eisenberg</p>
    </Link>
    <img
      src={trash}
      className="trashLogo"
      alt="logo"
      onClick={() => props.deletePresentation(props.presentation)}
    />
  </div>
)
