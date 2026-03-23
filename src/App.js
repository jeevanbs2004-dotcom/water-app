import Register from "./components/auth/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import AddWater from "./water/AddWater";
import WaterList from "./water/WaterList";
import DateDifference from "./water/DateDifference";
import Navbar from "./components/Navbar";

function App() {
    return (
        <BrowserRouter>

            {/* ✅ ADD THIS */}
            <Navbar />

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<WaterList />} />
                <Route path="/add" element={<AddWater />} />
                <Route path="/difference" element={<DateDifference />} />
            </Routes>

        </BrowserRouter>
    );
}

export default App;