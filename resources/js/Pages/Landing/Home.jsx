import { Link, Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { BsBrowserChrome } from "react-icons/bs";
import Card from "../../Components/Card";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextArea from "@/Components/textArea";
import ModalCardProject from "../../Components/ModalCardProject";
import LandingLayout from "@/Layouts/LandingLayout";
import { BsMouse } from "react-icons/bs";
import Squares from "@/Components/Squares";

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
        <span className="text-sm md:text-xl">
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
                <div className="animate-marquee flex-shrink-0 justify-around flex whitespace-nowrap w-[550%] md:w-[320%] lg:w-[230%] xl:w-[210%]">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="p-2 xl:p-3 border border-gray-2000 rounded-xl hover:border-none hover:bg-gray-2000 group flex content-center h-full"
                        >
                            <div className="flex items-center md:items-stretch gap-3">
                                <div className="bg-gray-2000 group-hover:bg-gray-1000 p-2 rounded-xl flex items-center h-full">
                                    <img
                                        className="max-w-[1.4rem] md:max-w-[1.5rem] xl:max-w-[1.95rem] max-h-[1.4rem] md:max-h-[1.5rem] xl:max-h-[1.95rem]"
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
                {/* End Bagian pertama marquee */}
                {/* Bagian kedua marquee */}
                <div className="animate-marquee flex-shrink-0 justify-around flex whitespace-nowrap w-[550%] md:w-[320%] lg:w-[230%] xl:w-[210%]">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="p-2 xl:p-3 border border-gray-2000 rounded-xl hover:border-none hover:bg-gray-2000 group flex content-center h-full"
                        >
                            <div className="flex items-center md:items-stretch gap-3">
                                <div className="bg-gray-2000 group-hover:bg-gray-1000 p-2 rounded-xl flex items-center h-full">
                                    <img
                                        className="max-w-[1.4rem] md:max-w-[1.5rem] xl:max-w-[1.95rem] max-h-[1.4rem] md:max-h-[1.5rem] xl:max-h-[1.95rem]"
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
                {/* Bagian Kedua marquee  */}
            </div>
        </div>
    );
};
//  end infinite horizontal scroll

//  infinite horizontal scroll certif
const InfiniteScrollCertif = ({
    imageCertifs,
    reverse = false,
    dataCertif = { data: [] },
}) => {
    return (
        <div className="w-full overflow-hidden whitespace-nowrap mb-2.5">
            <div className="marquee-wrapper flex hover:pause-marquee">
                {/* Bagian pertama marquee */}
                <div
                    className={`${
                        reverse ? "animate-marquee-reverse" : "animate-marquee"
                    } flex-shrink-0 justify-evenly flex whitespace-nowrap `}
                >
                    {" "}
                    {dataCertif.data.map((certificate) => (
                        <div
                            key={certificate.id}
                            className=" p-2 md:p-3 group flex content-center"
                        >
                            <div className="flex items-center md:items-stretch xl:gap-3">
                                <img
                                    className="w-[12.5rem] h-[10rem] md:h-[9rem] md:w-[13rem] lg:w-[13rem] lg:h-[9rem] xl:w-[15rem] xl:h-[12rem] xxl:w-[17.625rem] xxl:h-[12.5rem] rounded-md"
                                    src={certificate.certificate_image}
                                    alt={`Image ${certificate.id}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                {/* END Bagian pertama marquee*/}

                {/* Bagian kedua marquee */}
                <div
                    className={`${
                        reverse ? "animate-marquee-reverse" : "animate-marquee"
                    } flex-shrink-0 justify-evenly flex whitespace-nowrap `}
                >
                    {dataCertif.data.map((certificate) => (
                        <div
                            key={certificate.id}
                            className=" p-2 md:p-3 group flex content-center"
                        >
                            <div className="flex items-center md:items-stretch xl:gap-3">
                                <img
                                    className="w-[12.5rem] h-[10rem] md:h-[9rem] md:w-[13rem] lg:w-[13rem] lg:h-[9rem] xl:w-[15rem] xl:h-[12rem] xxl:w-[17.625rem] xxl:h-[12.5rem] rounded-md"
                                    src={certificate.certificate_image}
                                    alt={`Image ${certificate.id + 1}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                {/* END Bagian kedua marquee */}
            </div>
        </div>
    );
};
//  end infinite horizontal scroll certif

// Tambahkan kelas CSS baru untuk animasi scroll
const scrollAnimationClasses = {
    fadeUp: "opacity-0 translate-y-10 transition-all duration-700 ease-out",
    fadeUpVisible: "opacity-100 translate-y-0",
    fadeIn: "opacity-0 transition-opacity duration-700 ease-out",
    fadeInVisible: "opacity-100",
    scaleUp: "scale-95 opacity-0 transition-all duration-700 ease-out",
    scaleUpVisible: "scale-100 opacity-100",
};

export default function Home({ projects, certificates, resume }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("send.email"), {
            onSuccess: () => {
                reset("name", "email", "message");
            },
        });
    };

    // Image Skill
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
    // END Image Skill

    // Footer Link
    const footLink = [
        {
            label: "Home",
            link: route("home"),
            isHash: false,
        },
        {
            label: "Project",
            link: "#project",
            isHash: true,
        },
        {
            label: "Service",
            link: "#contact",
            isHash: true,
        },
        {
            label: "Instagram",
            link: "https://www.instagram.com/dputrxx/",
            isHash: false,
        },
        {
            label: "Linkein",
            link: "https://www.linkedin.com/in/dandi-kurnia-putra-927935221/",
            isHash: false,
        },
        {
            label: "GitHub",
            link: "https://github.com/dandikurnia",
            isHash: false,
        },
        {
            label: "Website",
            link: "https://danbildad.my.id/",
            isHash: false,
        },
    ];

    const handleScroll = (e, link, isHash) => {
        if (isHash) {
            e.preventDefault();
            const element = document.querySelector(link);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
                setMenu(false); // Tutup menu mobile jika terbuka
            }
        }
    };

    const firstPart = footLink.slice(0, 3);
    const secondPart = footLink.slice(3);
    // End Footer Link

    const [selectedProject, setSelectedProject] = useState(null);
    const [showModalProject, setShowModalProject] = useState(false);

    const handleShowModal = (project) => {
        setSelectedProject(project);
        setShowModalProject(true);
    };

    // Tambahkan useEffect untuk observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-visible");
                    }
                });
            },
            {
                threshold: 0.1,
            }
        );

        document.querySelectorAll(".animate-on-scroll").forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <LandingLayout resume={resume}>
            <Head title="MyPortofolio" />
            {/* PAGE 1 */}
            <div className="relative flex items-center justify-center min-h-[45vh] md:min-h-[40vh] lg:min-h-[60vh]">
                <div className="absolute inset-0 z-0">
                    <Squares
                        speed={0.25}
                        squareSize={30}
                        direction="down"
                        borderColor="rgba(37, 36, 36, 0.3)"
                        hoverFillColor="rgba(34, 34, 34, 0.5)"
                    />
                </div>
                <div className="animate-on-scroll w-full relative z-10">
                    {/* Hello I'm section */}
                    <div className="flex items-center space-x-2 md:space-x-4 dark:text-white-100 animate-on-scroll slide-from-left mb-4">
                        <span className="w-[2rem] *:md:w-[5rem] h-[2px] bg-green-1000"></span>
                        <h1 className="font-semibold md:text-2xl">
                            Hello, I'm
                        </h1>
                    </div>

                    {/* Name section */}
                    <h1 className="font-semibold text-5xl md:text-6xl lg:text-7xl xl:text-9xl mb-4 md:mb-5 text-gradient text-center">
                        Dandi Kurnia <br /> Putra
                    </h1>

                    {/* Available section */}
                    <div className="flex items-center justify-start mx-auto max-w-fit space-x-4 mb-5 md:mb-10">
                        <span className="relative flex size-2 flex-shrink-0">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-1000 opacity-75"></span>
                            <span className="relative inline-flex size-2 rounded-full bg-green-1000"></span>
                        </span>
                        <h1 className="text-gray-300 font-semibold">
                            <TypingAnimation text="Available for freelancing" />
                        </h1>
                    </div>

                    {/* Buttons section */}
                    <div className="flex justify-center">
                        <BsMouse className="text-2xl text-white-100 animate-bounce cursor-pointer" />
                    </div>
                </div>
            </div>
            {/* End PAGE 1 */}

            {/* PAGE 2 */}
            <div className="xs:my-6 md:my-12 lg:my-16 xl:my-20 animate-on-scroll">
                {/* Left */}
                <h1 className="font-black text-2xl md:text-3xl xl:text-4xl mb-3 md:mb-4 text-gradient">
                    Essential skills I use
                </h1>
                <p className="font-medium text-white-100 text-md mb-5 md:mb-7 xl:mb-10">
                    Discover the powerful skills and technologies I use to
                    create
                    <br className="hidden md:block " /> exceptional,
                    high-performing website and applications.
                </p>
                {/* End Left*/}

                {/* Right */}
                <div className="flex justify-center">
                    <InfiniteScrollMarquee images={images} />
                </div>
                {/* End Right */}
            </div>
            {/* End PAGE 2 */}

            <div className="xs:my-6 md:my-12 lg:my-16 xl:my-20 scroll-reveal">
                <div className="m-auto border-2 bg-gray-2000 border-gray-2000 rounded-lg py-10 px-16">
                    <div className="w-[100%] md:w-[80%]">
                        <p className="text-center md:text-left">
                            <span className="text-xl">
                                Hi, I'm Dandi, a full-stack developer
                                specializing in Laravel, React, Flutter,
                                Inertia.js, and Tailwind CSS. I build scalable
                                web and mobile applications with a focus on
                                performance, usability, and modern design.
                                Passionate about problem-solving and seamless
                                user experiences, I’m committed to delivering
                                high-quality, efficient solutions. Let’s create
                                something great together!
                            </span>
                        </p>
                    </div>
                    <div className="flex justify-center md:justify-start gap-10 mt-6">
                        <div>
                            <h2 className="text-5xl font-bold">
                                <span>{projects.data.length}+ </span>
                            </h2>
                            <h6 className="text-sm">
                                <span>Projects</span>
                            </h6>
                        </div>
                        <div>
                            <h2 className="text-5xl font-bold">
                                <span>{certificates.data.length}+</span>
                            </h2>
                            <h6 className="text-sm">
                                <span>Sertifikat</span>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>

            {/* PAGE 3 */}
            <div
                className="xs:my-6 my-6 md:my-12 lg:my-20 animate-on-scroll"
                id="project"
            >
                <div className="block md:flex md:justify-between md:items-center md:mb-0">
                    <h1 className="font-black mb-2 md:mb-0 text-2xl md:text-3xl xl:text-4xl text-gradient">
                        My portofolio highlights
                    </h1>
                    <Link
                        href={route("project")}
                        className="group inline-flex px-1 py-1 md:px-3 md:py-2 xl:px-4 xl:py-3 content-center bg-green-1000 dark:text-gray-1000 rounded-md md:rounded-xl hover:opacity-90"
                    >
                        <div className="flex items-center gap-3">
                            <p className="font-semibold text-sm md:text-base">
                                View all work
                            </p>
                            <IoIosArrowForward className="transition-transform transform group-hover:translate-x-1" />
                        </div>
                    </Link>
                </div>

                {/* Card */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 md:py-8 [&>*:nth-child(1)]:animate-[fadeIn_0.5s_0.1s_ease-out_forwards] [&>*:nth-child(2)]:animate-[fadeIn_0.5s_0.3s_ease-out_forwards] [&>*:nth-child(3)]:animate-[fadeIn_0.5s_0.5s_ease-out_forwards] [&>*:nth-child(4)]:animate-[fadeIn_0.5s_0.7s_ease-out_forwards]">
                    {projects.data.map((project) => (
                        <Card
                            key={project.id}
                            dataPorject={project}
                            showModal={handleShowModal}
                        />
                    ))}
                </div>
                {/* End Card */}
            </div>
            {/* End PAGE 3 */}

            {/* PAGE 4 */}
            <div className="md:my-12 md:mt-8 md:mb-14 animate-on-scroll">
                <h1 className="font-black text-2xl md:text-3xl xl:text-4xl mb-3 md:mb-4 text-gradient ">
                    My Certifications
                </h1>
                {/* Card */}
                <InfiniteScrollCertif dataCertif={certificates} />
                {/* {certificates.data.map((certificate) => (
                        ))} */}
                <InfiniteScrollCertif dataCertif={certificates} reverse />
                {/* End Card */}
            </div>
            {/* END PAGE 4 */}

            {/* PAGE 5 */}
            <div
                className="xs:my-6 md:my-16 animate-on-scroll overflow-hidden"
                id="contact"
            >
                <div className="grid gap-4 md:gap-0 md:grid-rows-none md:grid-cols-2 xl:grid-cols-2">
                    {/* Left */}
                    <div className="flex flex-col gap-4 md:gap-0 justify-between animate-on-scroll slide-from-left">
                        <div>
                            <h1 className="font-black text-2xl md:text-3xl xl:text-6xl mb-3 md:mb-4 text-gradient text-center md:text-left">
                                Contact me for collaboration
                            </h1>
                            <p className="text-gray-400 text-lg text-center md:text-left">
                                Reach out today to discuss your project
                                <br />
                                needs and start collaboration on <br />
                                something amazing!
                            </p>
                        </div>

                        {/* Sosial Media */}
                        <div className="flex gap-4 justify-center md:justify-start mt-auto">
                            <a
                                href="https://www.instagram.com/dputrxx/"
                                target="_blank"
                                className="group w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-gray-2000 text-white-100 rounded-lg transition hover:bg-white-100 hover:text-gray-2000"
                            >
                                <FaInstagram className="text-2xl transition-transform transform group-hover:-translate-y-0.5" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/dandi-kurnia-putra-927935221/"
                                target="_blank"
                                className="group w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-gray-2000 text-white-100 rounded-lg transition hover:bg-white-100 hover:text-gray-2000"
                            >
                                <FaLinkedin className="text-2xl transition-transform transform group-hover:-translate-y-0.5" />
                            </a>
                            <a
                                href="https://github.com/dandikurnia"
                                target="_blank"
                                className="group w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-gray-2000 text-white-100 rounded-lg transition hover:bg-white-100 hover:text-gray-2000"
                            >
                                <FaGithub className="text-2xl transition-transform transform group-hover:-translate-y-0.5" />
                            </a>
                            <a
                                href="https://dandihub.my.id/"
                                target="_blank"
                                className="group w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-gray-2000 text-white-100 rounded-lg transition hover:bg-white-100 hover:text-gray-2000"
                            >
                                <BsBrowserChrome className="text-2xl transition-transform transform group-hover:-translate-y-0.5" />
                            </a>
                        </div>
                    </div>
                    {/* End Left */}

                    {/* Right */}
                    <div className="animate-on-scroll slide-from-right">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-2 mb-4">
                                <div>
                                    <InputLabel
                                        value="Name"
                                        className="md:text-lg"
                                    />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        className="mt-1 block w-full"
                                        placeholder="dandi kurnia"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    {errors.name && (
                                        <div className="text-red-500">
                                            {errors.name}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <InputLabel
                                        value="Email"
                                        className="md:text-lg"
                                    />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        placeholder="dandikurnia@gmail.com"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    {errors.email && (
                                        <div className="text-red-500">
                                            {errors.email}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <InputLabel
                                value="Message"
                                className="md:text-lg"
                            />
                            <div className="mb-4">
                                <TextArea
                                    id="message"
                                    className="mt-1 block w-full"
                                    placeholder="Message"
                                    rows="6"
                                    value={data.message}
                                    onChange={(e) =>
                                        setData("message", e.target.value)
                                    }
                                />
                                {errors.message && (
                                    <div className="text-red-500">
                                        {errors.message}
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="px-2 py-2 bg-green-1000 text-gray-1000 rounded-lg hover:opacity-90 font-semibold block w-full disabled:opacity-75"
                            >
                                {processing ? "Mengirim..." : "Submit"}
                            </button>
                        </form>
                    </div>
                    {/* End Right */}
                </div>
            </div>
            {/* END PAGE 5 */}

            {/* Footer */}
            <footer className="animate-on-scroll">
                <hr className="mb-20 border-t-1 border-white-100" />
                <div className="flex flex-col sm:flex-row justify-between gap-4 md:gap-0">
                    <div className=" w-full sm:w-1/2">
                        <p className="text-4xl xl:text-6xl mb-4 md:mb-5 xl:mb-8 text-white-100">
                            Let's work <br />
                            together today
                        </p>
                        <Link className="group inline-flex px-1 py-1 md:px-3 md:py-2 xl:px-4 xl:py-3 content-center bg-green-1000 dark:text-gray-1000 rounded-md md:rounded-xl hover:opacity-90">
                            <div className="flex items-center gap-3">
                                <p className="font-semibold text-sm md:text-base">
                                    Start project
                                </p>
                                <IoIosArrowForward className="transition-transform transform group-hover:translate-x-1" />
                            </div>
                        </Link>
                    </div>
                    <div className="grid mb-8 grid-rows-2 md:grid-rows-none md:grid-cols-2 text-white-100 md:gap-40">
                        {/* Bagian Pertama */}
                        <div>
                            <h2 className="font-bold text-lg mb-3">Product</h2>
                            <ul className="space-y-2">
                                {firstPart.map((d, i) => (
                                    <li key={i}>
                                        <Link
                                            key={i}
                                            className={`relative font-bold border-b-2 border-transparent hover:border-transparent transition duration-700 group
                            }`}
                                            href={d.link}
                                            onClick={(e) =>
                                                handleScroll(
                                                    e,
                                                    d.link,
                                                    d.isHash
                                                )
                                            }
                                        >
                                            {d.label}
                                            {/* Garis bawah yang muncul dari kiri ke kanan */}
                                            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-green-1000 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700 rounded-full"></span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Bagian Kedua */}
                        <div>
                            <h2 className="font-bold text-lg mb-3">Socials</h2>
                            <ul className="space-y-2">
                                {secondPart.map((d, i) => (
                                    <li key={i}>
                                        <a
                                            key={i}
                                            className={`relative font-bold border-b-2 border-transparent hover:border-transparent transition duration-700 group
                        }`}
                                            href={d.link}
                                            target="_blank"
                                        >
                                            {d.label}
                                            {/* Garis bawah yang muncul dari kiri ke kanan */}
                                            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-green-1000 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700 rounded-full"></span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <p className="text-gray-400 text-center md:text-end py-5">
                    &copy; 2025 Dandi Kurnia. All rights reserved.
                </p>
            </footer>
            {/* End Footer */}

            {showModalProject && (
                <ModalCardProject
                    onClose={() => setShowModalProject(false)}
                    dataPorject={selectedProject}
                    showModal={showModalProject}
                />
            )}
        </LandingLayout>
    );
}
