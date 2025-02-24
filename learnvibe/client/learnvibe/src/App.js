import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

import "@fontsource/comfortaa"; // Defaults to 400 weight
import Signup from "./Components/Signup";
import Protected from "./routes/Protected";
import Home from "./Components/Home";
import SignIn from "./Components/SignIn";
import Courses from "./Components/Courses/Courses";
import CourseDetails from "./Components/Courses/CourseDetails";
import ScrollToTop from "./Components/ScrollToTop";
import Playground from "./Components/PlayGround/Playground";
import AddData from "./Components/AddData/AddData";
import Verification from "./Components/EmailVerify/Verification";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route
            exact
            path="/courses"
            element={<Courses/>}
          />
          <Route
            exact
            path="/course/:id"
            element={<Protected component={CourseDetails} />}
          />
          <Route
            exact
            path="/playground"
            element={<Protected component={Playground} />}
          />
           <Route
            exact
            path="/adddata"
            element={<Protected component={AddData} />}
          />
           <Route
            exact
            path="/verifyemail"
            element={<Verification/>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
