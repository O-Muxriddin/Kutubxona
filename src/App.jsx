import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./components/home";
import Info from "./components/info";
import Kitoblar from "./components/kitoblar";
import LoginCard from "./components/LoginCard";
import Add from "./components/DialogDemoAdd";     // agar pages papkada bo‘lsa
import Edit from "./components/DialogNestedDemo";

export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
        <Route path="/kitoblar" element={<Kitoblar />} />

        <Route path="/login" element={<LoginCard />} />

        {/* himoyalangan sahifalar */}
        <Route path="/add" element={<LoginCard />} />
        <Route path="/edit/:id" element={<LoginCard />} />
      </Routes>
    </>
  );
}