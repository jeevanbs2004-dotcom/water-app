import { createBrowserRouter } from "react-router-dom";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import AddWater from "./water/AddWater";
import WaterList from "./water/WaterList";
import DateDifference from "./water/DateDifference";

import Navbar from "./components/Navbar";


function Layout({ children }) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
}

const router = createBrowserRouter([
    {path: "/",element: <Layout><WaterList /></Layout>},
    {path: "/login",element: <Layout><Login /></Layout>},
    {path: "/register",element: <Layout><Register /></Layout>},
    {path: "/add",element: <Layout><AddWater /></Layout>},
    {path: "/difference",element: <Layout><DateDifference /></Layout>}
]);

export default router;