import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar"

const MainLayout = () => {
    return (
        <>
            <Navbar/>
            <div className="flex min-h-screen">
                <Sidebar/>
                <main className="flex-1 p-6 bg-white">
                    <Outlet/>
                </main>
            </div>
        </>
    );
};

export default MainLayout;