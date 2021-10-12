import {
  SET_PROFESSIONS,
  SET_PROFESSION,
  SET_COURSES,
  SET_COURSE,
  LOADING_DATA,
  LIKE_COURSE,
  UNLIKE_COURSE,
  SET_COMMENTS,
  SET_USER,
} from "../types";

const initialState = {
  professions: [],
  profession: {},
  courses: [],
  course: "",
  loading: false,
  comments: [],
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_PROFESSIONS:
      return {
        ...state,
        professions: action.payload,
        loading: false,
      };
    case SET_PROFESSION:
      return {
        ...state,
        professionName: action.payload,
        loading: false,
      };

    case SET_COURSES:
      return {
        ...state,
        courses: action.payload,
        loading: false,
      };
    case SET_COURSE:
      return {
        ...state,
        course: action.payload,
        loading: false,
      };
    case SET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };
    case LIKE_COURSE:
    case UNLIKE_COURSE:
      let index = state.courses.findIndex(
        (course) =>
          course.courseToProfessionId === action.payload.courseToProfessionId
      );
      state.courses[index] = action.payload;

      return {
        ...state,
        courses: [...state.courses],
      };
    case SET_USER:
      return {
        ...state,
        credentials: action.payload,
      };

    default:
      return state;
  }
};
