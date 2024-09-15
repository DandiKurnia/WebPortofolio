import Navbar from "@/Components/Navbar";
import { Link, Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

const TypingAnimation = ({ text = "", typingSpeed = 100 }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        if (!text || text.length === 0) {
            console.error("Text prop is empty or undefined");
            return;
        }

        let index = 0;
        const interval = setInterval(() => {
            // Pastikan index tidak melebihi panjang text
            if (index < text.length) {
                setDisplayedText(text.slice(0, index + 1)); // Potong dari awal sampai karakter ke-index
                index++;
            } else {
                clearInterval(interval);
            }
        }, typingSpeed);

        return () => clearInterval(interval);
    }, [text, typingSpeed]);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);

        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <span>
            {displayedText}
            <span
                className={`ml-[1px] cursor ${
                    showCursor ? "visible" : "invisible"
                }`}
            >
                |
            </span>
        </span>
    );
};
export default function Welcome({}) {
    return (
        <>
            <Head title="Welcome" />
            <div className="w-full bg-white-100 dark:bg-gray-1000">
                <div className="max-w-7xl mx-auto px-8 sm:px-6 min-h-screen">
                    <Navbar />

                    <div className="py-12 grid grid-rows-2 md:grid-cols-2 xl:grid-cols-3 items-start md:items-center">
                        <div className="xl:col-span-2">
                            <div className="flex items-center space-x-4 dark:text-white-100">
                                <span className="w-[3rem] *:md:w-[5rem] h-[2px] bg-green-1000"></span>
                                <h1 className="font-bold md:text-2xl">
                                    Hello, I'm
                                </h1>
                            </div>
                            <h1 className="font-bold text-4xl md:text-6xl xl:text-8xl mb-4 md:mb-5 text-gradient">
                                Dandi Kurnia <br /> Putra
                            </h1>
                            <div className="flex items-center space-x-4 mb-5 md:mb-10">
                                <div className="w-10 h-10 bg-green-1000 rounded-md"></div>
                                <span className="w-[5px] h-[5px] bg-green-1000 rounded-full"></span>
                                <h1 className="text-gray-300 font-semibold">
                                    <TypingAnimation text="Available for freelancing" />
                                </h1>
                            </div>
                            <div className="flex gap-5">
                                <Link className="group px-2 py-2 md:px-4 bg-green-1000 dark:text-gray-1000 rounded-md hover:opacity-90">
                                    <div className="flex items-center gap-3">
                                        <p className="font-bold">Say Hello</p>
                                        <IoIosArrowForward className="transition-transform transform group-hover:translate-x-1" />
                                    </div>
                                </Link>

                                <Link className="group py-2 px-4 dark:text-gray-300 dark:bg-gray-2000 rounded-md hover:opacity-90">
                                    <div className="flex items-center gap-3">
                                        <p className="font-bold">Scroll Down</p>
                                        <IoIosArrowDown className="transition-transform transform group-hover:translate-y-1" />
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="w-full md:w-[80%] lg:w-full md:ml-auto lg:mx-0 px-10 py-5 md:px-0 md:py-0">
                            <div className="grid grid-cols-2 lg-gap-x-10 md:gap-x-0 gap-y-3 md:gap-y-6 justify-items-center">
                                {/* Top */}
                                <div className="hidden md:block w-32 h-20 lg:w-44 lg:h-32 bg-green-1000 rounded-b-xl"></div>
                                <div className="hidden md:block w-32 h-20 lg:w-44 lg:h-32 bg-green-1000 rounded-b-xl"></div>

                                {/* Mid */}
                                <div className="w-32 lg:w-44 h-32 lg:h-44 bg-green-1000 rounded-xl"></div>
                                <div className="w-32 lg:w-44 h-32 lg:h-44 bg-green-1000 rounded-xl"></div>

                                {/* Bottom */}
                                <div className="hidden md:block w-32 lg:w-44 h-20 lg:h-32 bg-green-1000 rounded-t-xl"></div>
                                <div className="hidden md:block w-32 lg:w-44 h-20 lg:h-32 bg-green-1000 rounded-t-xl"></div>

                                <div className="md:hidden lg:hidden w-32 lg:w-44 h-32 lg:h-44 bg-green-1000 rounded-xl"></div>
                                <div className="sm:hidden lg:hidden w-32 lg:w-44 h-32 lg:h-44 bg-green-1000 rounded-xl"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
