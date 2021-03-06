import React, { createContext, useContext, useReducer } from "react";
// import useLocal from "./useLocal";
import { BOOKS } from "./constants";

export const AppContext = createContext();

export function useAppState() {
  return useContext(AppContext);
}

const appStateReducer = (state, action) => {
  switch (action.type) {
    case "READ_BOOK": {
      let newToRead = state.toRead.filter((item) => {
        return item !== action.item;
      });
      let newCompleted = state.completed.concat(action.item);

      localStorage.setItem("to_read_list", newToRead);
      localStorage.setItem("completed_list", newCompleted);

      return {
        ...state,
        toRead: newToRead,
        completed: newCompleted,
      };
    }
    case "UNREAD_BOOK": {
      return {
        ...state,
        toRead: state.toRead.concat(action.item),
        completed: state.completed.filter((item) => {
          return item !== action.item;
        }),
      };
    }
    case "GET_FROM_LOCAL_STATE": {
      return {
        ...state,
        toRead: action.toRead,
        completed: action.completed,
      };
    }
    default:
      return state;
  }
};

export function AppStateProvider({ children }) {
  const initialState = { toRead: BOOKS, completed: [] };
  let cake = useReducer(appStateReducer, initialState);

  // useLocal();

  return <AppContext.Provider value={cake}>{children}</AppContext.Provider>;
}
