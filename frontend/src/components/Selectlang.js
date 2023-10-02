import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { resetResultAction, setUserId } from "../redux/result_reducer";
import { useDispatch } from "react-redux";
import { resetAllAction } from "../redux/question_reducer";

const Selectlang = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetAllAction());
    dispatch(resetResultAction());
  }, []);
  return (
    <div className="flex flex-col gap-5 justify-center items-center bg-gray-200 h-screen ">
      <h1 className="bg-gray-300 w-full flex justify-center p-3">
        Click The language you want to learn
      </h1>
      <h2 className="lang flex flex-col gap-3">
        <Link
          className="border p-2 border-black hover:cursor-pointer bg-black text-white"
          to="/english"
        >
          English
        </Link>
        <Link
          className="border p-2 border-black hover:cursor-pointer bg-black text-white"
          to="/hindi"
        >
          Hindi
        </Link>
      </h2>
      <h1 className="bg-gray-300 w-full flex justify-center p-3">
        Programming questions
      </h1>
      <h2 className="lang flex flex-col gap-3">
        <Link
          className="border p-2 border-black hover:cursor-pointer bg-black text-white"
          to="/javascript"
        >
          javascript
        </Link>
        <Link
          className="border p-2 border-black hover:cursor-pointer bg-black text-white"
          to="/cpp"
        >
          C++
        </Link>
      </h2>
    </div>
  );
};

export default Selectlang;
