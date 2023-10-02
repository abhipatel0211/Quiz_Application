import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

/** redux actions */
import * as Action from "../redux/question_reducer";
import Cookies from "js-cookie";

/** fetch question hook to fetch api data and set value to store */
export const useFetchQuestion = ({ lang }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [getData, setGetData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  });

  useEffect(() => {
    setGetData((prev) => ({ ...prev, isLoading: true }));

    /** async function fetch backend data */
    (async () => {
      try {
        // Create an object with the data you want to send in the POST request
        const postData = {
          lang: lang,
        };

        const Token = Cookies.get("token");
        if (!Token) {
          navigate("/");
        }
        const response = await fetch(`http://localhost:3001/api/${lang}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Token}`, // Replace 'yourToken' with your actual JWT token
            "Content-Type": "application/json", // Set the content type to JSON
          },
          body: JSON.stringify(postData),
        });
        const rawData = await response.text();
        // console.log("Raw Response Data:", rawData);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = JSON.parse(rawData);

        if (Array.isArray(responseData) && responseData.length > 0) {
          const { questions, answers } = responseData[0]; // Access the first element of the array
          // console.log("Questions:", questions);
          // console.log("Answers:", answers);

          if (questions.length > 0) {
            setGetData((prev) => ({ ...prev, isLoading: false }));
            setGetData((prev) => ({ ...prev, apiData: questions }));

            /** dispatch an action */
            dispatch(Action.startExamAction({ question: questions, answers }));
          } else {
            throw new Error("No Question Available");
          }
        } else {
          throw new Error(
            "Response data is empty or not in the expected format."
          );
        }
      } catch (error) {
        setGetData((prev) => ({ ...prev, isLoading: false }));
        setGetData((prev) => ({ ...prev, serverError: error }));
      }
    })();
  }, [dispatch, lang]);

  return [getData, setGetData];
};

/** MoveAction Dispatch function */
export const MoveNextQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.moveNextAction()); /** increase trace by 1 */
  } catch (error) {
    console.log(error);
  }
};

/** PrevAction Dispatch function */
export const MovePrevQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.movePrevAction()); /** decrease trace by 1 */
  } catch (error) {
    console.log(error);
  }
};
