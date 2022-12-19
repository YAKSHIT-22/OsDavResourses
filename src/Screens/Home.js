/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOutUser, auth } from "../firebase";

export default function Home() {
  let navigate = useNavigate();
  var logout = (e) => {
    e.preventDefault();
    signOutUser();
    navigate("/SignIn");
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!auth.currentUser) {
        navigate("/SignIn");
      }
    }, 1000 * 1);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <button
        onClick={logout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
}
