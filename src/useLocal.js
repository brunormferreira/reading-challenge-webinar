import { useEffect } from "react";
import { useAppState } from "./AppContext";
import { BOOKS } from "./constants";

export default function useLocal() {
  let [state, dispatch] = useAppState();

  useEffect(() => {
    dispatch({
      type: "GET_FROM_LOCAL_STATE",
      toRead: localStorage.getItem("to_read_list") || BOOKS,
      complete: localStorage.getItem("completed_list") || [],
    });
  }, [dispatch])
}
