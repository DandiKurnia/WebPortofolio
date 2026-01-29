import { IoMdClose } from "react-icons/io";
import { useRef, useEffect } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function ModalCardProject({ onClose, dataPorject, showModal }) {
    const modalRef = useRef(null);
    const leftPanelRef = useRef(null);
    const rightPanelRef = useRef(null);

    // Tambahkan pengecekan untuk dataPorject
    if (!dataPorject) return null;

    // Show modal overflow
    useEffect(() => {
        if (showModal) {
            document.body.classList.add("overflow-hidden");
            document.body.classList.remove("md:overflow-auto");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => document.body.classList.remove("overflow-hidden");
    }, [showModal]);

    // Handle right scroll
    useEffect(() => {
        const handleRightScroll = () => {
            if (modalRef.current && leftPanelRef.current) {
                const rightScrollPercentage =
                    modalRef.current.scrollTop /
                    (modalRef.current.scrollHeight -
                        modalRef.current.clientHeight);

                leftPanelRef.current.scrollTop =
                    rightScrollPercentage *
                    (leftPanelRef.current.scrollHeight -
                        leftPanelRef.current.clientHeight);
            }
        };

        if (window.innerWidth >= 1280 && modalRef.current) {
            modalRef.current.addEventListener("scroll", handleRightScroll);
        }

        return () => {
            if (modalRef.current) {
                modalRef.current.removeEventListener(
                    "scroll",
                    handleRightScroll,
                );
            }
        };
    }, [showModal]);

    useEffect(() => {
        if (showModal && modalRef.current) {
            modalRef.current.scrollTop = 0;
        }
    }, [showModal]);

    useEffect(() => {
        const syncScroll = () => {
            if (rightPanelRef.current && leftPanelRef.current) {
                const scrollPercentage =
                    rightPanelRef.current.scrollTop /
                    (rightPanelRef.current.scrollHeight -
                        rightPanelRef.current.clientHeight);
                leftPanelRef.current.scrollTop =
                    scrollPercentage *
                    (leftPanelRef.current.scrollHeight -
                        leftPanelRef.current.clientHeight);
            }
        };

        if (rightPanelRef.current) {
            rightPanelRef.current.addEventListener("scroll", syncScroll);
        }

        return () => {
            if (rightPanelRef.current) {
                rightPanelRef.current.removeEventListener("scroll", syncScroll);
            }
        };
    }, [showModal]);

    return (
        <div
            className={`fixed top-0 left-0 w-full h-screen bg-gray-100/10 backdrop-blur-sm z-50 md:overflow-y-hidden xl:overflow-y-auto transition-all animate-[fadeIn_0.3s_ease-out_forwards]`}
        >
            <div className="md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto md:my-10 lg:my-6 xl:my-8 xxl:my-10 bg-gray-1000 p-4 rounded-none md:rounded-lg shadow-lg text-white-100 animate-[cardPop_0.5s_0.2s_ease-out_forwards] opacity-0">
                <div className="flex justify-end -mt-1 mb-5">
                    <button
                        onClick={onClose}
                        className="text-3xl hover:text-green-1000"
                    >
                        <IoMdClose />
                    </button>
                </div>

                <div
                    ref={modalRef}
                    className="xl:flex xl:gap-4 h-screen md:h-[80vh] p-2 xl:p-0 overflow-auto xl:overflow-hidden"
                >
                    {/* Bagian kiri (Deskripsi) */}
                    <div
                        ref={leftPanelRef}
                        className="xl:w-1/3 xl:sticky xl:top-0 xl:self-start xl:max-h-[80vh] overflow-hidden animate-[fadeUp_0.5s_0.4s_ease-out_forwards] opacity-0"
                    >
                        <h2 className="font-bold text-2xl">
                            {dataPorject?.title}
                        </h2>
                        <p className="text-sm md:text-base my-4 text-gray-400">
                            Project Descriptions
                        </p>
                        <p className="my-4 whitespace-pre-line">
                            {dataPorject?.description}
                        </p>
                        <div className="my-4">
                            <p className="text-sm md:text-base text-gray-400">
                                Skills & Technologies
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {dataPorject?.technologies?.map(
                                    (tech, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-gray-2000 text-white-100 rounded-full"
                                        >
                                            {tech}
                                        </span>
                                    ),
                                )}
                            </div>
                        </div>
                        <hr className="my-4 border border-green-1000" />
                        <a
                            href={dataPorject.link}
                            target="_blank"
                            className="flex items-center gap-2 my-8 text-gray-400 hover:text-white-100 cursor-pointer"
                        >
                            <FaExternalLinkAlt className="text-sm md:text-xl" />
                            <p className="text-sm inline">Link Website</p>
                        </a>
                        <p className="my-2 text-sm text-gray-400">
                            Published on {dataPorject?.created_at}
                        </p>
                    </div>

                    {/* Bagian kanan (Gambar) */}
                    <div
                        ref={rightPanelRef}
                        className="xl:w-2/3 xl:overflow-y-auto xl:px-4 animate-[fadeUp_0.5s_0.6s_ease-out_forwards] opacity-0"
                    >
                        {dataPorject?.images?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-20 md:mb-0">
                                {dataPorject.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.image_path}
                                        alt={`Project Image ${index + 1}`}
                                        className="w-full object-cover rounded"
                                    />
                                ))}
                            </div>
                        )}
                        <hr className="block md:hidden" />
                    </div>
                </div>
            </div>
        </div>
    );
}
