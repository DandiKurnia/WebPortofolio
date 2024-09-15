import { Link } from "@inertiajs/react";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

export default function Navbar({}) {
    const [isSideMenuOpen, setMenu] = useState(false);

    const navLink = [
        {
            label: "Home",
            link: "#",
        },
        {
            label: "About Me",
            link: "#",
        },
        {
            label: "Service",
            link: "#",
        },
        {
            label: "Skill",
            link: "#",
        },
    ];

    return (
        <nav className="py-8 dark:text-white-100">
            <section className="flex items-center gap-4 justify-between">
                <Link className="text-4xl font-mono" href={route("welcome")}>
                    Logo
                </Link>
                <FiMenu
                    className="text-3xl cursor-pointer md:hidden hover:opacity-60"
                    onClick={() => setMenu(true)}
                />
                <div className="hidden md:flex gap-4 md:gap-10 items-center">
                    {navLink.map((d, i) => (
                        <Link
                            key={i}
                            className={`relative font-bold border-b-2 border-transparent hover:border-transparent transition duration-700 group
                            }`}
                            href={d.link}
                        >
                            {d.label}
                            {/* Garis bawah yang muncul dari kiri ke kanan */}
                            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-green-1000 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700 rounded-full"></span>
                        </Link>
                    ))}
                </div>
                <Link className="bg-green-1000 font-bold dark:text-gray-1000 px-4 py-1 rounded-full transition hover:scale-110 duration-500 hidden md:flex">
                    Contact Me
                </Link>
            </section>
            {/* Sidebar mobile Menu */}
            <div
                className={`fixed h-full w-screen md:hidden bg-black/50 dark:bg-white-100/10 backdrop-blur-sm top-0 left-0 transition-opacity duration-300 z-50 ${
                    isSideMenuOpen
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                }`}
            >
                <section
                    className={`bg-white-100 dark:bg-gray-1000 flex-col absolute left-0 top-0 h-screen p-8 gap-8 z-50 flex w-80 transition-transform duration-300 ${
                        isSideMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                >
                    <div className="flex justify-between items-center mt-0 mb-8">
                        <Link
                            className="text-4xl font-mono"
                            href={route("welcome")}
                        >
                            Logo
                        </Link>
                        <IoCloseOutline
                            onClick={() => setMenu(false)}
                            className="text-3xl cursor-pointer hover:opacity-60"
                        />
                    </div>
                    {navLink.map((d, i) => (
                        <Link
                            key={i}
                            className="relative font-bold hover:text-green-1000 group"
                            href={d.link}
                        >
                            {d.label}
                            {/* Garis di kiri */}
                            <span className="absolute left-[-0.7rem] top-0 h-full w-[2px] bg-green-1000 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500"></span>
                        </Link>
                    ))}
                </section>
            </div>
        </nav>
    );
}
