import React from 'react';
import { Link } from "react-router-dom";

import trash from '../assets/trash.svg';
import moment from 'moment';

export const PresentationView = (props) => (
  <div className="PresentationsView">
    <Link to={`/presentation/${props.presentation._id}`} presentation={props.presentation}>
      <h3>{props.presentation.title}</h3>
      <div className="date">
        <small>{moment(props.presentation.date).format('MMM Do, h:mm')}</small>
      </div>
    </Link>
    <img
      src={trash}
      className="trashLogo"
      alt="logo"
      onClick={() => props.deletePresentation(props.presentation)} />
  </div>
)
