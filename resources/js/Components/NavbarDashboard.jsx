import { useState, useEffect } from "react";
import { HiOutlineMenuAlt1, HiOutlineMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import TextInput from "./TextInput";
import ResponsiveNavLink from "./ResponsiveNavLink";

export default function NavbarDashboard({
    setShowSidebar,
    showSidebar,
    userName,
}) {
    const [isMdScreen, setIsMdScreen] = useState(window.innerWidth >= 768);
    const [isProfileDropdownOpen, setProfileDropdown] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMdScreen(window.innerWidth >= 768);
        };

        const handleClickOutside = (event) => {
            if (!event.target.closest("#profileMenu")) {
                setProfileDropdown(false);
            }
        };

        window.addEventListener("resize", handleResize);
        document.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-gray-2000 text-white w-full h-16 md:h-20 flex items-center justify-between px-4 lg:px-6 fixed text-white-100 border-b border-gray-500 z-50">
            <div className="flex items-center gap-2 md:gap-4 lg:gap-6">
                <button
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="text-2xl hover:bg-gray-1000 p-2 rounded-md hover:text-green-1000"
                >
                    {isMdScreen ? (
                        showSidebar ? (
                            <HiOutlineMenu className="hover:text-green-1000" />
                        ) : (
                            <HiOutlineMenuAlt1 className="hover:text-green-1000" />
                        )
                    ) : showSidebar ? (
                        <IoMdClose className="hover:text-green-1000" />
                    ) : (
                        <HiOutlineMenuAlt1 className="hover:text-green-1000" />
                    )}
                </button>
                <div className="text-xl md:text-3xl lg:text-4xl font-bold">
                    DanBilDad
                </div>
                <TextInput
                    id="name"
                    type="text"
                    placeholder="Search"
                    className="w-60 lg:w-96 hidden lg:block"
                />
            </div>
            <div className="relative space-x-4">
                {/* Ikon Profile */}
                <div
                    id="profileMenu"
                    className="relative"
                    onClick={(e) => {
                        e.stopPropagation();
                        setProfileDropdown(!isProfileDropdownOpen);
                    }}
                >
                    <div className="flex items-center gap-4 cursor-pointer hover:opacity-70">
                        <FaUserCircle className="text-3xl lg:text-4xl hidden md:block" />
                        <span className="cursor-pointer">{userName}</span>
                    </div>
                    {isProfileDropdownOpen && (
                        <div className="absolute right-0 w-48 bg-white dark:bg-gray-2000 rounded-lg shadow-lg z-50 px-2 py-2">
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                My Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Setting
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
