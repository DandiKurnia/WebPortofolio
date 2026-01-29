import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import SuccessMessage from "@/Components/SuccessMessage";
import { useState, useRef, useEffect } from "react";
import ModalResume from "./ModalResume";

export default function Dashboard({
    auth,
    certificate,
    project,
    resume,
    skill,
    successCreated,
}) {
    const [showModalResume, setShowModalResume] = useState(false);
    const [selectedResume, setSelectedResume] = useState(null);
    const rightPanelRef = useRef(null);
    const leftPanelRef = useRef(null);

    useEffect(() => {
        if (showModalResume) {
            document.body.classList.add("overflow-hidden");
            document.body.classList.remove("md:overflow-auto");
        } else {
            document.body.classList.remove("overflow-hidden");
            document.body.classList.add("md:overflow-auto");
        }
    }, [showModalResume]);

    useEffect(() => {
        const handleRightScroll = () => {
            if (leftPanelRef.current && rightPanelRef.current) {
                leftPanelRef.current.scrollTop =
                    rightPanelRef.current.scrollTop;
            }
        };

        const handleLeftScroll = () => {
            if (leftPanelRef.current && rightPanelRef.current) {
                rightPanelRef.current.scrollTop =
                    leftPanelRef.current.scrollTop;
            }
        };

        const rightPanel = rightPanelRef.current;
        const leftPanel = leftPanelRef.current;

        if (showModalResume && rightPanel && leftPanel) {
            rightPanel.addEventListener("scroll", handleRightScroll);
            leftPanel.addEventListener("scroll", handleLeftScroll);
        }

        return () => {
            if (rightPanel) {
                rightPanel.removeEventListener("scroll", handleRightScroll);
            }
            if (leftPanel) {
                leftPanel.removeEventListener("scroll", handleLeftScroll);
            }
        };
    }, [showModalResume]);

    const openshowModalResume = (resume) => {
        setSelectedResume(resume);
        setShowModalResume(true);
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Dashboard" />
            {/* Alert */}
            {successCreated && (
                <SuccessMessage message={successCreated} type="success" />
            )}
            {/* End Alert */}
            <div className="grid grid-rows-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-4 lg:gap-6 z-30">
                <div className="bg-gray-2000 p-6 rounded-lg">
                    <h1 className="lg:text-xl xl:text-2xl xxl:text-3xl font-bold text-white-100">
                        MY CERTIFICATE
                    </h1>
                    <h1 className="lg:text-xl xl:text-2xl xxl:text-3xl font-bold text-gray-400 mt-4">
                        {certificate}
                    </h1>
                </div>
                <div className="bg-gray-2000 p-6 rounded-lg">
                    <h1 className="lg:text-xl xl:text-2xl xxl:text-3xl font-bold text-white-100">
                        MY PROJECT
                    </h1>
                    <h1 className="lg:text-xl xl:text-2xl xxl:text-3xl font-bold text-gray-400 mt-4">
                        {project}
                    </h1>
                </div>
                <div className="bg-gray-2000 p-6 rounded-lg">
                    <h1 className="lg:text-xl xl:text-2xl xxl:text-3xl font-bold text-white-100">
                        MY SKILL
                    </h1>
                    <h1 className="lg:text-xl xl:text-2xl xxl:text-3xl font-bold text-gray-400 mt-4">
                        {skill}
                    </h1>
                </div>
            </div>
            <div className="grid grid-rows-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-4 lg:gap-6 z-30 mt-4">
                <div className="bg-gray-2000 p-6 rounded-lg">
                    <h1 className="lg:text-xl xl:text-2xl xxl:text-3xl font-bold text-white-100">
                        MY RESUME
                    </h1>
                    <div className="flex mt-4 gap-4">
                        <a
                            href={
                                resume
                                    ? route("resume.preview", {
                                          resume: resume.id,
                                          t: resume.updated_at,
                                      })
                                    : "#"
                            }
                            className="p-2 bg-gray-1000 hover:bg-green-1000 text-white-100 hover:text-gray-1000 cursor-pointer rounded-md"
                            rel="noopener noreferrer"
                        >
                            <p>View</p>
                        </a>
                        <button
                            onClick={() => {
                                openshowModalResume(resume);
                            }}
                            className="p-2 bg-gray-1000 hover:bg-green-1000 text-white-100 hover:text-gray-1000 cursor-pointer rounded-md"
                        >
                            <p>Change</p>
                        </button>
                    </div>
                </div>
            </div>

            {showModalResume && (
                <ModalResume
                    onClose={() => setShowModalResume(false)}
                    resume={selectedResume}
                />
            )}
        </AdminLayout>
    );
}
