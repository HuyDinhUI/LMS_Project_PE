import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FaceAttendance from "./pages/Attendance";
import { privateRoutes } from "./routes/privateRoutes";
import { publicRoutes } from "./routes/publicRoutes";
import { Suspense } from "react";
import { ScaleLoader } from "react-spinners";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="App h-screen w-screen">
          <Suspense
            fallback={
              <ScaleLoader
                color="blue"
                cssOverride={{
                  display: "block",
                  position: "absolute",
                  top: "40%",
                  left: "50%",
                  transform: "translate(-50%;-50%)",
                }}
                aria-setsize={10}
              />
            }
          >
            <Routes>
              {privateRoutes.map((r, i) => (
                <Route key={i} path={r.path} element={r.element} />
              ))}
              {publicRoutes.map((r, i) => (
                <Route key={i} path={r.path} element={r.element} />
              ))}
            </Routes>
          </Suspense>
        </div>
      </Router>
    </div>
  );
}

export default App;
