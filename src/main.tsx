import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/authContext.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <AuthProvider>
      <App />
    </AuthProvider>
    <ToastContainer position="top-right" theme="colored" />
  </>
);
