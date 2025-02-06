import SuccessMessage from "@/Components/SuccessMessage";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import { IoInformationCircle } from "react-icons/io5";
import { useState } from "react";
import Pagination from "@/Components/Pagination";

export default function Index({
    auth,
    successCreated,
    projects,
    successEdit,
    successDelete,
}) {
    const deleteProject = (project) => {
        if (!window.confirm("Are you sure you want to delete the project?")) {
            return;
        }
        router.delete(route("project.destroy", project.id));
    };
    return (
        <AdminLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Project" />
            {/* <pre className="text-white">{projects?.data?.length ?? 0}</pre> */}

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-extrabold text-white-100">
                    Project
                </h1>
                <Link
                    className="group inline-flex px-1 py-1 md:px-3 md:py-2 xl:px-4 xl:py-3 content-center bg-green-1000 dark:text-gray-1000 rounded-md md:rounded-xl hover:opacity-90"
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

            <div className="bg-gray-2000 p-6 rounded-sm">
                <div className="overflow-x-auto">
                    <table className="text-left text-white-100 w-full">
                        <thead className="border-b-2 border-gray-400 text-x rtl:text-right uppercase bg-gray-1000 rounded-sm">
                            <tr className="text-nowrap">
                                <th className="p-3">Image</th>
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
                                        <td className="px-3 py-3">
                                            {project.images.length > 0 && (
                                                <img
                                                    src={
                                                        project.images[0]
                                                            .image_path
                                                    }
                                                    alt="Project Image"
                                                    className="w-20 h-20 object-cover rounded"
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
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline me-4"
                                            >
                                                Edit
                                            </Link>
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
                                        Tidak ada proyek
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
        </AdminLayout>
    );
}
