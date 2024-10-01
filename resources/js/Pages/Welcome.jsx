import Navbar from "@/Components/Navbar";
import { Link, Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

// Typing
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
// end Typing

//  infinite horizontal scroll
const InfiniteScrollMarquee = ({ images }) => {
    return (
        <div className="w-full overflow-hidden whitespace-nowrap animate">
            {/* Wrapper untuk kedua marquee */}
            <div className="marquee-wrapper flex hover:pause-marquee">
                {/* Bagian pertama marquee */}
                <div className="animate-marquee flex-shrink-0 justify-around flex whitespace-nowrap w-[600%] md:w-[300%] xl:w-[200%]">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="p-2 xl:p-3 border border-gray-2000 rounded-xl hover:border-none hover:bg-gray-2000 group"
                        >
                            <div className="flex justify-center gap-3 content-center">
                                <div className="bg-gray-2000 group-hover:bg-gray-1000 p-2 rounded-xl flex items-center">
                                    <img
                                        className="w-[1.3rem] h-[1.2rem] md:h-auto md:w-[1.5rem] xl:w-[1.95rem]"
                                        src={image.src}
                                        alt={`Image ${index + 1}`}
                                    />
                                </div>
                                <div>
                                    <p className="text-white-100 text-xs md:text-sm xl:text-lg font-semibold">
                                        {image.title}
                                    </p>
                                    <p className="text-white-100 text-xs md:text-sm xl:text-base">
                                        {image.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bagian kedua marquee */}
                <div className="animate-marquee flex-shrink-0 justify-around flex whitespace-nowrap w-[600%] md:w-[300%] xl:w-[200%]">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="p-2 xl:p-3 border border-gray-2000 rounded-xl hover:border-none hover:bg-gray-2000 group"
                        >
                            <div className="flex justify-center gap-3 content-center">
                                <div className="bg-gray-2000 group-hover:bg-gray-1000 p-2 rounded-xl flex items-center">
                                    <img
                                        className="w-[1.3rem] h-[1.2rem] md:h-auto md:w-[1.5rem] xl:w-[1.95rem]"
                                        src={image.src}
                                        alt={`Image ${index + 1}`}
                                    />
                                </div>
                                <div>
                                    <p className="text-white-100 text-xs md:text-sm xl:text-lg font-semibold">
                                        {image.title}
                                    </p>
                                    <p className="text-white-100 text-xs md:text-sm xl:text-base">
                                        {image.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
//  end infinite horizontal scroll

export default function Welcome({}) {
    const images = [
        {
            src: "/assets/img/html.png",
            title: "HTML",
            description: "Markup Language",
        },
        {
            src: "/assets/img/php.png",
            title: "PHP",
            description: "Back-End",
        },
        {
            src: "/assets/img/js.png",
            title: "JavaScript",
            description: "Front-End",
        },
        {
            src: "/assets/img/tailwind.png",
            title: "Tailwind",
            description: "CSS Framework",
        },
        {
            src: "/assets/img/bootstrap.png",
            title: "Bootstrap",
            description: "CSS Framework",
        },
        {
            src: "/assets/img/laravel.png",
            title: "Laravel",
            description: "Back-End",
        },
        {
            src: "/assets/img/inertia.png",
            title: "Inertia",
            description: "Front-End Bridge",
        },
        {
            src: "/assets/img/react.png",
            title: "React",
            description: "Front-End",
        },
        {
            src: "/assets/img/vite.png",
            title: "Vite",
            description: "Build Tool",
        },
        {
            src: "/assets/img/flutter.png",
            title: "Flutter",
            description: "Mobile Framework",
        },
        {
            src: "/assets/img/postman.png",
            title: "Postman",
            description: "API Testing",
        },
        {
            src: "/assets/img/github.png",
            title: "GitHub",
            description: "Version Control",
        },
    ];

    return (
        <>
            <Head title="Welcome" />
            <div className="w-full bg-white-100 dark:bg-gray-1000">
                <div className="max-w-7xl mx-auto px-8 sm:px-6 min-h-screen">
                    <Navbar />

                    {/* PAGE 1 */}
                    <div className="py-12 grid grid-rows-2 md:grid-rows-none md:grid-cols-2 xl:grid-cols-3 items-start md:items-center">
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

                        <div className="w-full px-4 py-5 min-[390px]:px-10 md:w-[80%] lg:w-full lg:mx-0 md:ml-auto md:px-0 md:py-0">
                            <div className="grid grid-cols-2 gap-y-3 md:gap-x-0 md:gap-y-6 sm:gap-x-3 justify-items-center">
                                {/* Top */}
                                <div className="hidden md:block w-32 h-20 lg:w-44 lg:h-32 bg-green-1000 rounded-b-xl"></div>
                                <div className="hidden md:block w-32 h-20 lg:w-44 lg:h-32 bg-green-1000 rounded-b-xl"></div>

                                {/* Mid */}
                                <div className="w-32 lg:w-44 h-32 lg:h-44 bg-green-1000 rounded-xl"></div>
                                <div className="w-32 lg:w-44 h-32 lg:h-44 bg-green-1000 rounded-xl"></div>

                                {/* Bottom */}
                                <div className="hidden md:block w-32 lg:w-44 h-20 lg:h-32 bg-green-1000 rounded-t-xl"></div>
                                <div className="hidden md:block w-32 lg:w-44 h-20 lg:h-32 bg-green-1000 rounded-t-xl"></div>

                                {/* Responsive */}
                                <div className="md:hidden lg:hidden w-32 lg:w-44 h-32 lg:h-44 bg-green-1000 rounded-xl"></div>
                                <div className="sm:hidden lg:hidden w-32 lg:w-44 h-32 lg:h-44 bg-green-1000 rounded-xl"></div>
                            </div>
                        </div>
                    </div>
                    {/* END PAGE 1 */}

                    {/* PAGE 2 */}
                    <div className="">
                        <h1 className="font-bold text-xl md:text-3xl xl:text-4xl mb-3 md:mb-4 text-gradient">
                            Essential skills I use
                        </h1>
                        <p className="font-medium text-white-100 text-md mb-5 md:mb-7 xl:mb-10">
                            Discover the powerful skills and technologies I use
                            to create
                            <br className="hidden md:block " /> exceptional,
                            high-performing website and applications.
                        </p>
                        <div className="flex justify-center">
                            <InfiniteScrollMarquee images={images} />
                        </div>
                    </div>
                    {/* END PAGE2 */}
                </div>
            </div>
        </>
    );
}
