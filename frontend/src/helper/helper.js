import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { setUserId } from "../redux/result_reducer";

export function attempts_Number(result) {
  return result.filter((r) => r !== undefined).length;
}

export function earnPoints_Number(result, answers, point) {
  return result
    .map((element, i) => answers[i] === element)
    .filter((i) => i)
    .map((i) => point)
    .reduce((prev, curr) => prev + curr, 0);
}

export function flagResult(totalPoints, earnPoints) {
  return (totalPoints * 50) / 100 < earnPoints; /** earn 50% marks */
}

/** check user auth  */
export function CheckUserExist({ children }) {
  var getCookies = function () {
    var pairs = document.cookie.split(";");
    var cookies = {};
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split("=");
      cookies[(pair[0] + "").trim()] = unescape(pair.slice(1).join("="));
    }
    return cookies;
  };
  // console.log(children);

  const token = getCookies("token");
  // console.log(token);
  const dispatch = useDispatch();
  if (token) {
    // console.log(token);
    axios
      .get("http://localhost:3001/api/user", {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((response) => {
        const userData = response;
        if (userData) {
          dispatch(setUserId(userData.data.name));
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }

  const auth = useSelector((state) => {
    const cookie = getCookies("token");
    // console.log(cookie);
    // console.log(state);
    return state.result.userId;
  });
  return auth ? children : <Navigate to={"/"} replace={true}></Navigate>;
}

/** get server data */
export async function getServerData(url, callback) {
  const data = await (await axios.get(url))?.data;
  return callback ? callback(data) : data;
}

/** post server data */
// export async function postServerData(url, result, callback) {
//   const data = await (await axios.post(url, result))?.data;
//   return callback ? callback(data) : data;
// }

export async function postServerData(url, result, callback) {
  try {
    const response = await axios.post(url, result);

    if (response.status === 200) {
      const data = response.data;
      return callback && typeof callback === "function" ? callback(data) : data;
    } else {
      throw new Error(`Request failed with status code ${response.status}`);
    }
  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
    throw error; // Re-throw the error for further handling in the calling code
  }
}
