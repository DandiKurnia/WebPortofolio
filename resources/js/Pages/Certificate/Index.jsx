import { useEffect, useState, useRef } from "react";
import SuccessMessage from "@/Components/SuccessMessage";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { Button } from "@headlessui/react";
import ModalCertif from "./ModalCertif";

export default function Index({
    auth,
    certificates,
    successCreated,
    successEdit,
    successDelete,
}) {
    const [showModal, setShowModal] = useState(false);
    const [showModalCertif, setShowModalCertif] = useState(false);
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const modalRef = useRef(null);
    const leftPanelRef = useRef(null);
    const rightPanelRef = useRef(null);

    // Show modal overflow
    useEffect(() => {
        if (showModalCertif || showModal) {
            document.body.classList.add("overflow-hidden");
            document.body.classList.remove("md:overflow-auto");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => document.body.classList.remove("overflow-hidden");
    }, [showModalCertif, showModal]);

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
                    handleRightScroll
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

    // Modal show certificate
    const showCertificate = (certificate) => {
        setSelectedCertificate(certificate);
        setShowModal(true);
    };

    const openshowModalCertif = () => {
        setSelectedCertificate(null); // Reset jika Create
        setShowModalCertif(true);
    };

    const openEditModal = (certificate) => {
        // console.log("Certificate yang dikirim ke modal:", certificate);
        setSelectedCertificate(certificate); // Isi dengan data sertifikat
        setShowModalCertif(true);
    };

    // deleteCertificate
    const deleteCertificate = (certificate) => {
        if (
            !window.confirm("Are you sure you want to delete the certificate?")
        ) {
            return;
        }
        router.delete(route("certificate.destroy", certificate.id));
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Certificate" />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-white-100">
                    Certificate
                </h1>
                <Button
                    onClick={() => openshowModalCertif(true)}
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
                                <th className="p-3 hidden md:block">Image</th>
                                <th className="p-3">Title</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {certificates?.data?.length > 0 ? (
                                certificates.data.map((certificate) => (
                                    <tr
                                        key={certificate.id}
                                        className="border-gray-400 border-b"
                                    >
                                        <td className="px-3 py-3 hidden md:block">
                                            <img
                                                src={
                                                    certificate.certificate_image
                                                }
                                                alt="Certificate Image"
                                                className="w-20 h-20 md:w-24 md:h-24 object-cover rounded"
                                            />
                                        </td>
                                        <td className="px-3 py-3">
                                            {certificate.title}
                                        </td>
                                        <td className="text-nowrap px-3 py-3">
                                            <button
                                                onClick={() =>
                                                    openEditModal(certificate)
                                                }
                                                className="font-medium text-yellow-500 hover:underline mx-1"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    deleteCertificate(
                                                        certificate
                                                    )
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
                                        Tidak ada certificate
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {certificates?.data?.length > 0 ? (
                    <Pagination links={certificates.meta.links} />
                ) : (
                    ""
                )}
            </div>
            {/* End Content */}

            {showModalCertif && (
                <ModalCertif
                    onClose={() => setShowModalCertif(false)}
                    certificate={selectedCertificate}
                />
            )}
        </AdminLayout>
    );
}
