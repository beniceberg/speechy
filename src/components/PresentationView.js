import React from 'react';
import { Link } from "react-router-dom";

import trash from '../assets/trash.svg';
import moment from 'moment';

export const PresentationView = (props) => (
  <div className="PresentationView">
    <Link to={`/presentation/${props.presentation._id}`} presentation={props.presentation}>
      <small>{moment(props.presentation.date).format('D MMMM')}</small>
      <p className="presTitle">{props.presentation.title}</p>
<<<<<<< HEAD
      <p className="author">Ben Eisenberg</p>
=======
      <p className="author">Ben Iceberg</p>
>>>>>>> 35151d0074a9a2ade8bdd38780e559a99c9ac694
    </Link>
    <img
      src={trash}
      className="trashLogo"
      alt="logo"
      onClick={() => props.deletePresentation(props.presentation)}
    />
  </div>
)
