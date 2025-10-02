import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FaceAttendance from "./pages/Attendance";
import { privateRoutes } from "./routes/privateRoutes";
import { publicRoutes } from "./routes/publicRoutes";


function App() {
  
  return (
    <div className="App">
      <Router>
      <div className='App h-screen w-screen'>
        <Routes>
            {privateRoutes.map((r,i) => (
              <Route key={i} path={r.path} element={r.element}/>
            ))}
            {publicRoutes.map((r,i) => (
              <Route key={i} path={r.path} element={r.element}/>
            ))}
        </Routes>
      </div>
    </Router>
    </div>
  )
}

export default App
