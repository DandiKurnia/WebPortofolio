import { RiDashboard2Fill } from "react-icons/ri";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { PiCertificateBold } from "react-icons/pi";
import { Link, usePage } from "@inertiajs/react";

export default function Sidebar({ showSidebar }) {
    const { url } = usePage();
    const navLink = [
        {
            label: "Dashboard",
            route: "dashboard",
            icon: <RiDashboard2Fill className="text-2xl" />,
        },
        {
            label: "Project",
            route: "project.index",
            match: (path) => path.startsWith("/project"),
            icon: <AiOutlineFolderOpen className="text-2xl" />,
        },
        {
            label: "Certificate",
            route: "certificate.index",
            match: (path) => path.startsWith("/certificate"),
            icon: <PiCertificateBold className="text-2xl" />,
        },
    ];

    return (
        <aside
            className={`h-screen md:w-0 fixed z-20 md:z-0 ${
                showSidebar
                    ? "dark:bg-white-100/10 backdrop-blur-sm h-screen md:bg-transparent w-full"
                    : "bg-transparent w-0"
            } `}
        >
            <nav
                className={`p-4 h-screen fixed top-16 md:top-20 bg-gray-2000 text-white border-r border-gray-500 transition-all duration-300 ease-in-out z-50 
        ${showSidebar ? "w-60 md:w-52 lg:w-64 block" : "w-20 hidden"} md:block`}
            >
                <ul>
                    {navLink.map((d, i) => (
                        <Link
                            key={i}
                            href={route(d.route)}
                            className={`flex items-center gap-4 py-2 mb-4 rounded-md transition-all duration-200 ease-in-out 
                        ${
                            (d.match && d.match(url)) ||
                            route().current(d.route)
                                ? "text-green-1000 bg-gray-1000"
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
