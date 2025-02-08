import { useEffect, useState, useRef } from "react";
import SuccessMessage from "@/Components/SuccessMessage";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { IoMdClose } from "react-icons/io";

export default function Index({
    auth,
    successCreated,
    projects,
    successEdit,
    successDelete,
}) {
    const [showModal, setShowModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const modalRef = useRef(null);
    const leftPanelRef = useRef(null);
    const rightPanelRef = useRef(null);

    // ShowModal overflow
    useEffect(() => {
        if (showModal) {
            document.body.classList.add("overflow-hidden");
            document.body.classList.remove("md:overflow-auto");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => document.body.classList.remove("overflow-hidden");
    }, [showModal]);

    // HandleRightScroll
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

    // Modal Project
    const showProject = (project) => {
        setSelectedProject(project);
        setShowModal(true);
    };

    // deleteProject
    const deleteProject = (project) => {
        if (!window.confirm("Are you sure you want to delete the project?")) {
            return;
        }
        router.delete(route("project.destroy", project.id));
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Project" />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-white-100">
                    Project
                </h1>
                <Link
                    className="group inline-flex px-3 py-2 xl:px-4 xl:py-3 content-center bg-green-1000 dark:text-gray-1000 rounded-md md:rounded-xl hover:opacity-90"
                    href={route("project.create")}
                >
                    <p className="font-bold text-sm md:text-base">Create</p>
                </Link>
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
                            {projects?.data?.length > 0 ? (
                                projects.data.map((project) => (
                                    <tr
                                        key={project.id}
                                        className="border-gray-400 border-b"
                                    >
                                        <td className="px-3 py-3 hidden md:block">
                                            {project.images.length > 0 && (
                                                <img
                                                    src={
                                                        project.images[0]
                                                            .image_path
                                                    }
                                                    alt="Project Image"
                                                    className="w-20 h-20 md:w-24 md:h-24 object-cover rounded"
                                                />
                                            )}
                                        </td>
                                        <td className="px-3 py-3">
                                            {project.title}
                                        </td>
                                        <td className="text-nowrap px-3 py-3">
                                            <Link
                                                href={route(
                                                    "project.edit",
                                                    project.id
                                                )}
                                                className="font-medium text-yellow-500 hover:underline mx-1"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    showProject(project)
                                                }
                                                className="font-medium text-blue-500 hover:underline mx-1"
                                            >
                                                Show
                                            </button>

                                            <button
                                                onClick={() =>
                                                    deleteProject(project)
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
                                        Tidak ada project
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {projects?.data?.length > 0 ? (
                    <Pagination links={projects.meta.links} />
                ) : (
                    ""
                )}
            </div>
            {/* End Content */}

            {/* Modal */}
            {showModal && selectedProject && (
                <div
                    className={`fixed top-0 left-0 w-full h-screen bg-gray-100/10 backdrop-blur-sm z-50 md:overflow-y-hidden xl:overflow-y-auto transition-all`}
                >
                    <div className="md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto md:my-10 lg:my-6 xl:my-8 xxl:my-10 bg-gray-1000 p-4  rounded-none md:rounded-lg shadow-lg text-white-100">
                        <div className="flex justify-end -mt-1 mb-5">
                            <button
                                onClick={() => setShowModal(false)}
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
                                className="xl:w-1/3 xl:sticky xl:top-0 xl:self-start xl:max-h-[80vh] overflow-hidden"
                            >
                                <h2 className="font-bold text-2xl">
                                    {selectedProject.title}
                                </h2>
                                <p className="text-sm md:text-base my-4 text-gray-400">
                                    Project Descriptions
                                </p>
                                <p className="my-4 whitespace-pre-line">
                                    {selectedProject.description}
                                </p>
                                <p className="my-4 whitespace-pre-line">
                                    {selectedProject.description}
                                </p>
                                <div className="my-4">
                                    <p className="text-sm md:text-base text-gray-400">
                                        Skills & Technologies
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {selectedProject.technologies.map(
                                            (tech, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-gray-2000 text-white-100 rounded-full"
                                                >
                                                    {tech}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>
                                <hr className="my-4 borde border-green-1000" />
                                <p className="my-8 text-sm text-gray-400">
                                    Published on {selectedProject.created_at}
                                </p>
                            </div>

                            {/* Bagian kanan (Gambar) */}
                            <div
                                ref={rightPanelRef}
                                className="xl:w-2/3 xl:overflow-y-auto xl:px-4"
                            >
                                {selectedProject.images.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-20 md:mb-0">
                                        {selectedProject.images.map(
                                            (image, index) => (
                                                <img
                                                    key={index}
                                                    src={image.image_path}
                                                    alt={`Project Image ${
                                                        index + 1
                                                    }`}
                                                    className="w-full object-cover rounded"
                                                />
                                            )
                                        )}
                                    </div>
                                )}
                                <hr className="block md:hidden" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* End Modal */}
        </AdminLayout>
    );
}
