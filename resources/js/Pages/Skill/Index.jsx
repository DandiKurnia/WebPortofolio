import Pagination from "@/Components/Pagination";
import SuccessMessage from "@/Components/SuccessMessage";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@headlessui/react";
import { Head, router } from "@inertiajs/react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import ModalSkill from "./ModalSkill";

export default function Index({
    auth,
    skills,
    successCreated,
    successEdit,
    successDelete,
}) {
    const [showModalSkill, setShowModalSkill] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState(null);
    const modalRef = useRef(null);
    const leftPanelRef = useRef(null);
    const rightPanelRef = useRef(null);

    useEffect(() => {
        if (showModalSkill) {
            document.body.classList.remove("overflow-auto");
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [showModalSkill]);

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
    }, [showModalSkill]);

    useEffect(() => {
        if (showModalSkill && modalRef.current) {
            modalRef.current.scrollTop = 0;
        }
    }, [showModalSkill]);

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
    }, [showModalSkill]);

    const openshowModalSkill = () => {
        setShowModalSkill(true);
        setSelectedSkill(null);
    };

    const openEditModal = (skill) => {
        // console.log("Certificate yang dikirim ke modal:", certificate);
        setSelectedSkill(skill); // Isi dengan data sertifikat
        setShowModalSkill(true);
    };

    // deleteCertificate
    const deleteCertificate = (skill) => {
        if (
            !window.confirm("Are you sure you want to delete the certificate?")
        ) {
            return;
        }
        router.delete(route("skill.destroy", skill.id));
    };
    return (
        <AdminLayout user={auth.user}>
            <Head title="Skill" />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-white-100">
                    Skill
                </h1>
                <Button
                    onClick={() => openshowModalSkill()}
                    className="group inline-flex px-3 py-2 xl:px-4 xl:py-3 content-center bg-green-1000 dark:text-gray-1000 rounded-md md:rounded-xl hover:opacity-90"
                >
                    <p className="font-bold text-sm md:text-base">Create</p>
                </Button>
            </div>

            {/* Alert */}
            {successCreated && (
                <SuccessMessage message={successCreated} type="success" />
            )}
            {successEdit && (
                <SuccessMessage message={successEdit} type="edit" />
            )}
            {successDelete && (
                <SuccessMessage message={successDelete} type="delete" />
            )}
            {/* End alert */}

            {/* Content */}
            <div className="bg-gray-2000 p-4 md:p-6 rounded-sm">
                <div className="overflow-x-auto">
                    <table className="text-left text-white-100 w-full">
                        <thead className="border-b-2 border-gray-400 text-x rtl:text-right uppercase bg-gray-1000 rounded-sm">
                            <tr className="text-nowrap">
                                <th className="p-3">Title</th>
                                <th className="p-3">Description</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {skills?.data?.length > 0 ? (
                                skills.data.map((skill) => (
                                    <tr
                                        key={skill.id}
                                        className="border-gray-400 border-b"
                                    >
                                        <td className="px-3 py-3">
                                            {skill.title}
                                        </td>
                                        <td className="px-3 py-3">
                                            {skill.description}
                                        </td>
                                        <td className="text-nowrap px-3 py-3">
                                            <button
                                                onClick={() =>
                                                    openEditModal(skill)
                                                }
                                                className="font-medium text-yellow-500 hover:underline mx-1"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    deleteCertificate(skill)
                                                }
                                                className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="text-center py-3"
                                    >
                                        Tidak ada Skill
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {skills?.data?.length > 0 ? (
                    <Pagination links={skills.meta.links} />
                ) : (
                    ""
                )}
            </div>
            {/* End Content */}

            {/* Modal */}
            {showModalSkill && (
                <ModalSkill
                    onClose={() => setShowModalSkill(false)}
                    skill={selectedSkill}
                />
            )}
            {/* Modal */}
        </AdminLayout>
    );
}
