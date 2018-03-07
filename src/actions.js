
export const STORE_PRESENTATIONS = 'STORE_PRESENTATIONS';
export const storePresentations = (presentations) => ({
  type: STORE_PRESENTATIONS,
  presentations
});

export const STORE_PRESENTATION = 'STORE_PRESENTATION';
export const storePres = (presentation) => ({
    type: STORE_PRESENTATION,
    presentation
});

export const NEW_PRES_TEXT = 'NEW_PRES_TEXT';
export const addTextToPres = (newPresText) => ({
  type: NEW_PRES_TEXT,
  newPresText
});

export const TIMER_TICK = 'TIMER_TICK';
export const tick = () => ({
  type: TIMER_TICK
});

export const ADD_VIDEO = 'ADD_VIDEO';
export const saveVideo = (videoURL) => ({
  type: ADD_VIDEO,
  videoURL
});

export const DELETE_VIDEO = 'DELETE_VIDEO';
export const deleteVideo = (videoURL) => ({
  type: DELETE_VIDEO,
  videoURL
});

export const ADD_VOLUME_DATA = 'ADD_VOLUME_DATA';
export const addVolume = (average) => ({
  type: ADD_VOLUME_DATA,
  average
});

export const STORE_ATTEMPT = 'STORE_ATTEMPT';
export const storeAttempt = (attempt) => ({
    type: STORE_ATTEMPT,
    attempt
});
