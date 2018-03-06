import React from 'react';
import { Link } from "react-router-dom";

import trash from '../assets/trash.svg';
import moment from 'moment';

export const PresentationView = (props) => (
  <div className="PresentationView">
    <Link to={`/presentation/${props.presentation._id}`} presentation={props.presentation}>
      <h3 className="presTitle">{props.presentation.title}</h3>
      <div className="date">
        CREATED ON <br/><br/> <small>{moment(props.presentation.date).format('MMM Do, h:mm')}</small>
      </div>
    </Link>
    <img
      src={trash}
      className="trashLogo"
      alt="logo"
      onClick={() => props.deletePresentation(props.presentation)} />
  </div>
)
