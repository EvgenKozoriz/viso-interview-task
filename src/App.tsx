import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/main/Main";
import Authorization from "./pages/authorization/Authorization";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Main />} />
            <Route path="/auth" element={<Authorization />} />
            <Route path="*" element={<Navigate to="/error" />} />
            <Route path="/error" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
