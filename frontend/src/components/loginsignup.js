import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signInUser, signUpUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { setUserId } from "../redux/result_reducer";

function Loginsignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlesubmit = (ev) => {
    ev.preventDefault();
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email || !password) return alert("Please fill all the fields");
    if (!re.test(email)) {
      return alert("Invalid email");
    }

    if (register) {
      if (!name) {
        return alert("Please fill all the fields");
      }
      dispatch(signUpUser({ name, email, password }))
        .then((data) => {
          console.log("Registration successful:", data);
          // Handle registration success, e.g., redirect to login page
          navigate("/");
        })
        .catch((error) => {
          console.error("Registration error:", error);
          navigate("/");
          // Handle registration error
        });
    } else {
      dispatch(signInUser({ email, password }))
        .then((data) => {
          console.log("Sign-in successful:", data);
          // Handle sign-in success, e.g., set user ID and redirect
          dispatch(setUserId(data.payload.name)); // Adjust this as needed
          const d = new Date();
          const expiresInMinutes = 5; // Set the expiration time in minutes
          d.setTime(d.getTime() + expiresInMinutes * 60 * 1000); // Convert minutes to milliseconds
          let expires = "expires=" + d.toUTCString();
          document.cookie = `token=${data.payload.tokens[0]}; ${expires}; path=/;`;
          navigate("/selectlang");
        })
        .catch((error) => {
          console.error("Sign-in error:", error);
          // Handle sign-in error
        });
    }
  };

  const handleRegister = () => {
    setRegister(true);
  };

  const handleLogin = () => {
    setRegister(false);
  };

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center bg-slate-300">
        <div className="text-5xl m-4">{register ? "Register" : "Login"}</div>
        <div className=" flex flex-col w-80 h-fit rounded-xl gap-5 p-3 border border-black">
          {register ? (
            <input
              className="block w-full p-2 border rounded-md border-blue-700"
              type="name"
              value={name}
              placeholder="name"
              onChange={(ev) => setName(ev.target.value)}
              required
            />
          ) : null}

          <input
            className="block w-full p-2 border rounded-md border-blue-700"
            type="email"
            value={email}
            placeholder="email"
            onChange={(ev) => setEmail(ev.target.value)}
            required
          />
          <input
            className="block w-full p-2 border rounded-md border-blue-700"
            type="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            placeholder="password"
            required
          />
          <input
            className="bg-blue-500 block w-full p-2 border rounded-md border-blue-700 hover:bg-blue-700 hover:text-white"
            type="submit"
            onClick={handlesubmit}
            value={`${register ? "Register" : "Login"}`}
          />
          {register ? (
            <>
              <p className="flex justify-center">Already have an account?</p>
              <button className="font-bold" onClick={handleLogin}>
                Login here
              </button>
            </>
          ) : (
            <>
              <p className="flex justify-center">Don't have an account?</p>
              <button className="font-bold" onClick={handleRegister}>
                Register here
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Loginsignup;
