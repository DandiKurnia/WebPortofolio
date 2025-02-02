import { RiDashboard2Fill } from "react-icons/ri";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { PiCertificateBold } from "react-icons/pi";
import { Link } from "@inertiajs/react";

export default function Sidebar({ showSidebar }) {
    const navLink = [
        {
            label: "Dashboard",
            route: "dashboard",
            icon: <RiDashboard2Fill className="text-2xl" />,
        },
        {
            label: "Project",
            route: "project.index",
            icon: <AiOutlineFolderOpen className="text-2xl" />,
        },
        {
            label: "Certificate",
            route: "welcome",
            icon: <PiCertificateBold className="text-2xl" />,
        },
    ];

    return (
        <aside
            className={`h-screen w-full md:w-0 fixed z-20 md:z-0 ${
                showSidebar
                    ? "dark:bg-white-100/10 backdrop-blur-sm h-screen w-full md:bg-transparent"
                    : "bg-transparent"
            } `}
        >
            <nav
                className={`p-4 h-screen fixed top-20 bg-gray-2000 text-white border-r border-gray-500 transition-all duration-300 ease-in-out z-50 
        ${showSidebar ? "w-64 block" : "w-20 hidden"} md:block`}
            >
                <ul>
                    {navLink.map((d, i) => (
                        <Link
                            key={i}
                            href={route(d.route)}
                            className={`flex items-center gap-4 py-2 mb-4 rounded-md transition-all duration-200 ease-in-out 
                        ${
                            route().current(d.route)
                                ? !showSidebar
                                    ? "text-green-1000 bg-gray-1000"
                                    : "text-green-1000 bg-gray-1000"
                                : "text-gray-500 hover:bg-gray-1000 hover:text-green-1000"
                        } 
                        ${
                            showSidebar
                                ? "justify-start px-5"
                                : "justify-center px-2"
                        }`}
                        >
                            {d.icon}
                            {showSidebar && (
                                <span className="md:text-md lg:text-xl font-semibold">
                                    {d.label}
                                </span>
                            )}
                        </Link>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
