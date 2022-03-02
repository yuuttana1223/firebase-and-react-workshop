import { Route, Routes } from "react-router-dom";
import { SignUp } from "pages/SignUp";

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div>Hello</div>} />
        <Route path="/sign_up" element={<SignUp />} />
      </Routes>
    </div>
  );
};
