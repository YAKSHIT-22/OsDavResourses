/* eslint-disable jsx-a11y/alt-text */
import person from "./img/person.png";
import vectorright from "./img/vectorright.png";
import vectorleft from "./img/vectorleft.png";
import bottomvector from "./img/bottomvector.png";
import vectorrect from "./img/vectorrect.png";
import Signup from "./Screens/Signup";
import Signin from "./Screens/Signin";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
  // useNavigate,
  // useLocation,
  // Navigate,
  // Outlet,
} from "react-router-dom";
import Home from "./Screens/Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="overflow-hidden">
        <section className="w-screen h-screen">
          <div className="flex flex-row p-6 w-full fixed">
            <img src="/LOGO.png" className="w-12 xs:w-16 h-full"></img>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Signin" element={<Signin />} />
          </Routes>
          <div className="z-[1]">
            <img
              src={person}
              className="hidden sm:block absolute bottom-[2rem] sm:right-[2rem] md:right-[4rem] lg:right-[8rem] w-24 h-56 object-scale-down"
            />
            <img src={vectorright} className="absolute top-0 right-0 w-[15%]" />
            <img
              src={vectorleft}
              className="absolute top-[10rem] left-0 h-[10%] xs:h-[22%] sm:h-[36%]"
            />
            <img
              src={bottomvector}
              className="absolute bottom-0 left-[18rem] w-[25%] hidden xs:block"
            />
            <img
              src={vectorrect}
              className="absolute top-[15rem] right-0 rotate-180 h-[4%] sm:h-[8%]"
            />
            <img
              src={vectorrect}
              className="absolute bottom-[12rem] left-0  h-[4%] sm:h-[8%]"
            />
            <img
              src={vectorrect}
              className="absolute bottom-0 left-[12rem] rotate-[270deg] h-[4%] sm:h-[8%]"
            />
          </div>
        </section>
      </div>
      <ToastContainer/>
    </Router>
  );
}

export default App;
