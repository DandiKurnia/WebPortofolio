import NavbarDashboard from "@/Components/NavbarDashboard";
import Sidebar from "@/Components/Sidebar";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function AdminLayout({ user, header, children }) {
    const [showSidebar, setShowSidebar] = useState(
        localStorage.getItem("showSidebar") === "false" ? false : true
    );

    useEffect(() => {
        localStorage.setItem("showSidebar", showSidebar);
    }, [showSidebar]);

    return (
        <div className="flex bg-gray-1000 overflow-y-hidden">
            {/* SIDEBAR */}
            <div
                className={`fixed inset-y-0 left-0 z-50 ${
                    showSidebar ? "w-64" : "w-20"
                } transition-all duration-300 ease-in-out`}
            >
                <Sidebar showSidebar={showSidebar} />
            </div>

            {/* CONTENT */}
            <div className="flex-1">
                <NavbarDashboard
                    setShowSidebar={setShowSidebar}
                    showSidebar={showSidebar}
                    userName={user.name}
                />
                {/* End Navbar */}
                <div
                    className={`transition-all duration-300 ease-in-out ${
                        showSidebar ? "md:ml-52 lg:ml-64" : "ml-0 md:ml-20"
                    } mt-16 md:mt-20 px-6 pt-6 bg-gray-1000 min-h-screen text-white`}
                >
                    <main>{children}</main>
                </div>
            </div>
        </div>
    );
}
