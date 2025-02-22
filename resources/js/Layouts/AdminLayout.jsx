import NavbarDashboard from "@/Components/NavbarDashboard";
import Sidebar from "@/Components/Sidebar";
import { useEffect, useState } from "react";

export default function AdminLayout({ user, header, children }) {
    const [showSidebar, setShowSidebar] = useState(
        localStorage.getItem("showSidebar") === "false" ? false : true
    );

    useEffect(() => {
        localStorage.setItem("showSidebar", showSidebar);
        if (showSidebar) {
            document.body.classList.add(
                ...["overflow-hidden", "md:overflow-auto"]
            );
        } else {
            document.body.classList.remove(
                ...["overflow-hidden", "md:overflow-auto"]
            );
        }
        return () => document.body.classList.remove("overflow-hidden");
    }, [showSidebar]);

    return (
        <div className="flex bg-gray-1000 min-h-screen">
            {/* SIDEBAR */}
            <div
                className={`fixed inset-y-0 left-0 z-50 ${
                    showSidebar ? "w-64" : ""
                } transition-all duration-300 ease-in-out h-full`}
            >
                <Sidebar showSidebar={showSidebar} />
            </div>

            {/* CONTENT */}
            <div className="flex-1 flex flex-col">
                <NavbarDashboard
                    setShowSidebar={setShowSidebar}
                    showSidebar={showSidebar}
                    userName={user.name}
                />
                {/* End Navbar */}
                <div
                    className={`transition-all duration-300 ease-in-out ${
                        showSidebar ? "md:ml-52 lg:ml-64" : "ml-0 md:ml-20"
                    } mt-16 md:mt-20 px-6 pt-6 bg-gray-1000 flex-grow text-white`}
                >
                    <main>{children}</main>
                </div>
            </div>
        </div>
    );
}
