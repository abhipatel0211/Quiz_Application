import { combineReducers, configureStore } from "@reduxjs/toolkit";

/** call reducers */
import questionReducer from "./question_reducer";
import resultReducer from "./result_reducer";
import authSlice from "./authSlice";

const rootReducer = combineReducers({
  questions: questionReducer,
  result: resultReducer,
  auth: authSlice,
});

/** create store with reducer */
export default configureStore({ reducer: rootReducer });
