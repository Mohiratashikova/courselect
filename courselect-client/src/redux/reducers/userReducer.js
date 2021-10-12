import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_COURSE,
  UNLIKE_COURSE,
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        ...state,
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LIKE_COURSE:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            courseToProfessionId: action.payload.courseToProfessionId,
          },
        ],
      };
    case UNLIKE_COURSE:
      return {
        ...state,
        likes: state.likes.filter(
          (like) =>
            like.courseToProfessionId !== action.payload.courseToProfessionId
        ),
      };

    default:
      return state;
  }
};
