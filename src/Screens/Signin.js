/* eslint-disable jsx-a11y/alt-text */
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  onAuthStateChangedListener,
} from "../firebase";
import googlesvgrepocom from "../img/google-svgrepo-com.svg";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

export default function Signin() {
  let navigate = useNavigate();
  var signin = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (!email) {
      toast.error("Email is required");
      return;
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    try {
      signInAuthUserWithEmailAndPassword(email, password)
        .then((user) => {
          if (user) {
            navigate("/");
            toast.success("User Logged In Successfully");
            return;
          }
        })
        .catch((error) => {
          if (error.code === "auth/user-disabled") {
            toast.error("User has been disabled");
          } else if (error.code === "auth/user-not-found") {
            toast.error("User not found");
          } else if (error.code === "auth/wrong-password") {
            toast.error("Wrong Password");
          } else {
            toast.error(error.message);
          }
        });
    } catch (error) {
      alert(error);
    }
  };
  onAuthStateChangedListener((user) => {
    if (user) {
      navigate("/");
      toast.success("User Logged In Successfully");
      return;
    }
  });
  var google = async (e) => {
    e.preventDefault();
    try {
      signInWithGooglePopup();
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col justify-center items-center w-full mt-[2rem]">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl xxs:text-3xl sm:text-4xl md:text-5xl  font-medium">
            LOG IN
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center h-full w-full p-6">
          <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col gap-2 w-min">
                <div className="w-min">
                  <label className="xxs:text-sm sm:text-md flex justify-start items-start w-3/4">
                    Email
                  </label>
                </div>
                <input
                  type="text"
                  id="email"
                  placeholder="email"
                  required
                  className="border-[1px] border-black rounded-[5px] xxs:w-[16rem] xs:w-[18rem] sm:w-[22rem] md:w-[26rem] lg:w-[30rem] h-12 p-2"
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
                onClick={signin}
                className="btn flex flex-row justify-center items-center bg-mainColor w-44 h-10 xs:w-44 xs:h-10 sm:w-48 sm:h-10 md:w-52 md:h-12 rounded-[8px]  text-xs sm:text-md p-4 text-center"
              >
                LOG IN
              </button>
              <button
                onClick={google}
                className="btn flex flex-row gap-2 border-black border-[1px] justify-center items-center w-44 h-10 xs:w-44 xs:h-10 sm:w-48 sm:h-10 md:w-52 md:h-12 rounded-[8px] text-xs sm:text-md p-4"
              >
                SIGN IN BY GOOGLE
                <img src={googlesvgrepocom} className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-row gap-10 justify-center items-center">
              <div className=" text-[.5rem] xs:text-xs">
                <a href="/ForgetPassword">Forget Password!</a>
              </div>
              <div className=" text-[.5rem] xs:text-xs">
                <Link to="/Signup">Create Account?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
