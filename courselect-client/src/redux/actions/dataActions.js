import {
  SET_PROFESSIONS,
  SET_PROFESSION,
  SET_COURSES,
  SET_COMMENTS,
  LOADING_DATA,
  LIKE_COURSE,
  UNLIKE_COURSE,
  SET_COURSE,
} from "../types";
import axios from "axios";

// Get all screams
export const getProfessions = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/professions")
    .then((res) => {
      dispatch({
        type: SET_PROFESSIONS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_PROFESSIONS,
        payload: [],
      });
    });
};
export const setProfession = (professionName) => {
  return {
    type: SET_PROFESSION,
    payload: professionName,
  };
};
export const setCourses = (professionName) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/courses", { params: { professionName } })
    .then((res) => {
      dispatch({
        type: SET_COURSES,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_COURSES,
        payload: [],
      });
    });
};

export const addProfession = (professionName) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .post("/profession", { name: professionName })
    .then((res) => {
      dispatch(getProfessions());
    })
    .catch((err) => {
      dispatch({
        type: SET_COURSES,
        payload: [],
      });
    });
};

export const likeCourse = (courseId) => (dispatch) => {
  axios
    .get(`/course/${courseId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_COURSE,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
// Unlike a scream
export const unlikeCourse = (courseId) => (dispatch) => {
  axios
    .get(`/course/${courseId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_COURSE,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
export const addCourse = (courseName, professionName) => (dispatch) => {
  axios
    .post(`/profession/course`, { name: courseName, professionName })
    .then((res) => {
      dispatch(setCourses(professionName));
    })
    .catch((err) => console.log(err));
};

export const searchComments = (courseName) => (dispatch) => {
  dispatch({
    type: SET_COURSE,
    payload: courseName,
  });

  axios
    .get("/courseToProfession", { params: { courseName } })
    .then((res) => {
      dispatch({
        type: SET_COMMENTS,
        payload: res.data.allComments,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_COMMENTS,
        payload: [],
      });
    });
};

export const addComment = (body, courseName) => (dispatch) => {
  axios
    .post("/course/comment", { courseName, body })
    .then(() => {
      dispatch(searchComments(courseName));
    })
    .catch((err) => console.log(err));
};

export const deleteComment = (commentId, courseName) => (dispatch) => {
  axios
    .delete(`/comment/${commentId}`)
    .then(() => {
      dispatch(searchComments(courseName));
    })
    .catch((err) => console.log(err));
};
