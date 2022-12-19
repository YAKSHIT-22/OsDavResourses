import React from "react";
import { useNavigate } from "react-router-dom";
import { createAuthUserWithEmailAndPassword,auth } from "../firebase";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";

export default function Signup() {
  let navigate = useNavigate();
  var signup = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const FirstName = document.getElementById("FirstName").value;
    const LastName = document.getElementById("LastName").value;

    if (!email) {
      toast.error("Email is required");
      return;
    }
    else if (!FirstName) {
      toast.error("First Name is required");
      return;
    }
    else if (!LastName) {
      toast.error("Last Name is required");
      return;
    }
    else if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    try {
      createAuthUserWithEmailAndPassword(email, password)
        .then((response) => {
          // sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
          if (response) {
            updateProfile(auth.currentUser, {
              displayName: FirstName + " " + LastName,
            });
            navigate("/SignIn");
            toast.success("User Created Successfully");
            return;
          }
        })
        .catch((error) => {
          if (error.code === "auth/user-disabled") {
            toast.error("User has been disabled");
          } else if (error.code === "auth/email-already-in-use") {
            toast.error("Email already in use");
          } else if (error.code === "auth/invalid-email") {
            toast.error("Invalid Email");
          } else if (error.code === "auth/operation-not-allowed") {
            toast.error("Operation not allowed");
          } else if (error.code === "auth/weak-password") {
            toast.error("Password is weak");
          } else {
            toast.error(error.message);
          }
        });
    } catch (error) {
      toast.error(error);
    }
  };
  var signin = async (e) => {
    e.preventDefault();
    navigate("/SignIn");
  };
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col justify-center items-center w-full mt-[2rem]">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl xxs:text-3xl sm:text-4xl md:text-5xl  font-medium">
            SIGN UP
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center h-full w-full p-6">
          <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col gap-2 w-min">
                <div className="w-min">
                  <label className="xxs:text-sm sm:text-md flex justify-start items-start w-3/4">
                    Name
                  </label>
                </div>
                <div className="flex flex-row gap-4 justify-center items-center xxs:w-[16rem] xs:w-[18rem] sm:w-[22rem] md:w-[26rem] lg:w-[30rem]">
                  <input
                    type="text"
                    id="FirstName"
                    placeholder="FirstName"
                    required
                    className="border-[1px] border-black rounded-[5px] w-full h-12 p-2"
                  />
                  <input
                    type="text"
                    id="LastName"
                    placeholder="LastName"
                    required
                    className="border-[1px] border-black rounded-[5px] w-full h-12 p-2"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col gap-2">
                <div className="w-min">
                  <label className="xxs:text-sm text-md flex justify-start items-start ">
                    Email
                  </label>
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  className="border-[1px] border-black rounded-[5px] xxs:w-[16rem] xs:w-[18rem] sm:w-[22rem] md:w-[26rem] lg:w-[30rem] h-12 p-2"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col gap-2">
                <div className="w-min">
                  <label className="xxs:text-sm text-md flex justify-start items-start ">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="border-[1px] border-black rounded-[5px] xxs:w-[16rem] xs:w-[18rem] sm:w-[22rem] md:w-[26rem] lg:w-[30rem] h-12 p-2"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={signup}
                className="btn flex flex-row justify-center  items-center bg-mainColor w-44 h-10 xs:w-44 xs:h-10 sm:w-48 sm:h-10 md:w-52 md:h-12 rounded-[8px]  text-xs sm:text-md p-4 text-center"
              >
                SIGN UP
              </button>
              <button
                onClick={signin}
                className="btn flex flex-row gap-2 border-black border-[1px] justify-center items-center w-44 h-10 xs:w-44 xs:h-10 sm:w-48 sm:h-10 md:w-52 md:h-12 rounded-[8px] text-xs sm:text-md p-4"
              >
                BACK TO LOGIN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
