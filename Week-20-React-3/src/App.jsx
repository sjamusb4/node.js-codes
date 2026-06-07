import Auth from "./screens/Auth";
import Board from "./screens/Board";
import Dashboard from "./screens/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./screens/Home";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/board/:boardId" element={<Board />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
