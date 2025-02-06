import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextArea from "@/Components/textArea";
import TextInput from "@/Components/TextInput";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaTrash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export default function Create({ auth, project }) {
    const { data, post, setData, processing, errors } = useForm({
        title: project.title || "",
        description: project.description || "",
        link: project.link || "",
        technologies: project.technologies ?? [],
        images: project.images ?? [], // Menambahkan gambar yang sudah ada
        newImages: [], // Menambahkan gambar baru
        imagesToDelete: [],
        _method: "PUT",
    });

    const technologies = data.technologies;

    const [previewImages, setPreviewImages] = useState(
        project.images.map((img) => img.image_path) || []
    );

    const [newTech, setNewTech] = useState("");

    // Handle file drop
    const onDrop = useCallback(
        (acceptedFiles) => {
            console.log("Dropped files:", acceptedFiles); // Debugging
            setData((prevData) => ({
                ...prevData,
                newImages: [...prevData.newImages, ...acceptedFiles],
            }));

            previewFiles(acceptedFiles);
        },
        [data.newImages]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    // Preview gambar
    const previewFiles = (files) => {
        const newPreviews = files.map((file) => {
            console.log("Generating preview for:", file.name); // Debugging
            return URL.createObjectURL(file);
        });

        setPreviewImages((prevImages) => [...prevImages, ...newPreviews]);
    };

    // Remove image
    const handleRemoveExistingImage = (index, imageId) => {
        const newPreviews = [...previewImages];
        newPreviews.splice(index, 1);
        setPreviewImages(newPreviews);

        setData("imagesToDelete", [...data.imagesToDelete, imageId]);
    };

    // Remove image preview
    const handleRemoveImage = (index) => {
        const newPreviews = [...previewImages];
        newPreviews.splice(index, 1);
        setPreviewImages(newPreviews);

        setData(
            "newImages",
            data.newImages.filter((_, i) => i !== index)
        );
    };

    // Add Tecnology
    const handleAddTech = () => {
        if (newTech.trim() !== "") {
            setData("technologies", [...data.technologies, newTech.trim()]);
            setNewTech("");
        }
    };

    // Remove Tecnology
    const handleRemoveTech = (index) => {
        setData((prevData) => ({
            ...prevData,
            technologies: prevData.technologies.filter((_, i) => i !== index),
        }));
    };

    // submit
    const onSubmit = (e) => {
        e.preventDefault();
        post(route("project.update", { project: project.id }), {
            ...data,
            imagesToDelete: data.imagesToDelete,
            newImages: data.newImages, // Add newImages to submission
        });
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
            <Head title="Edit Project" />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-extrabold text-white-100">
                    Edit Project
                </h1>
                {/* <pre className="text-white">
                    {JSON.stringify(project, null, 2)}
                </pre> */}
            </div>
            <div className="bg-gray-2000 p-6 rounded-sm">
                <form onSubmit={onSubmit} encType="multipart/form-data">
                    {/* Input name and link */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        <div>
                            <InputLabel
                                value="Name Project"
                                className="md:text-lg"
                            />
                            <TextInput
                                type="text"
                                name="title"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="mt-1 block w-full"
                                placeholder="Name Project"
                            />
                            <InputError
                                message={errors.title}
                                className="mt-2"
                            ></InputError>
                        </div>
                        <div>
                            <InputLabel value="Link" className="md:text-lg" />
                            <TextInput
                                type="url"
                                name="link"
                                value={data.link}
                                onChange={(e) =>
                                    setData("link", e.target.value)
                                }
                                className="mt-1 block w-full"
                                placeholder="https://github.com/dandikurnia"
                            />
                            <InputError
                                message={errors.link}
                                className="mt-2"
                            ></InputError>
                        </div>
                    </div>
                    {/* End input name and link */}

                    {/* Input description */}
                    <div className="mt-4">
                        <InputLabel
                            value="Description Project"
                            className="md:text-lg"
                        />
                        <TextArea
                            type="text"
                            name="description"
                            className="mt-1 block w-full"
                            placeholder="Message"
                            value={data.description}
                            rows="6"
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.description}
                            className="mt-2"
                        ></InputError>
                    </div>
                    {/* End Input description */}

                    {/* Input tecnology */}
                    <div className="mt-4">
                        <InputLabel value="Tecnology" className="md:text-lg" />
                        <div className="flex justify-center gap-2 mt-1">
                            <TextInput
                                type="text"
                                name="technologies"
                                value={newTech}
                                onChange={(e) => setNewTech(e.target.value)}
                                className="block w-full"
                                placeholder="https://github.com/dandikurnia"
                            />
                            <button
                                type="button"
                                className="bg-gray-1000 py-2 px-4 text-xs text-white-100 rounded-lg "
                                onClick={handleAddTech}
                            >
                                Tambah
                            </button>
                        </div>

                        <InputError
                            message={errors.link}
                            className="mt-2"
                        ></InputError>

                        {/* Menampilkan tecnology */}
                        <div
                            className={`flex flex-wrap gap-2 mt-3 border-2 border-gray-700 border-dashed p-2 rounded-lg ${
                                project.technologies.length === 0
                                    ? "hidden"
                                    : ""
                            }`}
                        >
                            {technologies.map((tech, index) => (
                                <span
                                    key={index}
                                    className="flex items-center bg-gray-1000 text-white-100 px-3 py-1 rounded-full"
                                >
                                    {tech}
                                    <button
                                        className="ml-2 text-white-100"
                                        onClick={() => handleRemoveTech(index)}
                                    >
                                        <IoMdClose className="hover:text-gray-400" />
                                    </button>
                                </span>
                            ))}
                        </div>
                        {/* End menampilkan tecnology */}
                    </div>
                    {/* End input tecnology */}

                    {/* Drag and Drop untuk gambar */}
                    <div className="mt-4">
                        <InputLabel
                            value="Project Image"
                            className="md:text-lg"
                        />

                        <div className="w-full mt-4">
                            <div {...getRootProps()}>
                                <label
                                    htmlFor="dropzone-file"
                                    className={`flex flex-col items-center justify-center w-full h-64 border-2  border-dashed rounded-lg cursor-pointer hover:bg-gray-1000 ${
                                        isDragActive
                                            ? "bg-gray-1000 border-green-1000"
                                            : "bg-gray-2000 border-gray-700"
                                    }`}
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg
                                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        {isDragActive ? (
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">
                                                    Drop image in here .....
                                                </span>{" "}
                                            </p>
                                        ) : (
                                            <>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="font-semibold">
                                                        Click to upload
                                                    </span>{" "}
                                                    or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    SVG, PNG, JPG or GIF (MAX.
                                                    800x400px)
                                                </p>
                                            </>
                                        )}
                                    </div>
                                    <input {...getInputProps()} />
                                </label>
                            </div>
                        </div>

                        <InputError
                            message={errors.images}
                            className="mt-2"
                        ></InputError>
                    </div>
                    {/* End Drag and Drop untuk gambar*/}

                    {/* Tampilkan preview gambar */}
                    <div className="mt-4 grid grid-cols-3 gap-4 mb-4">
                        {previewImages.map((src, index) => {
                            const isExistingImage = project.images.some(
                                (img) => img.image_path === src
                            );
                            const imageId = isExistingImage
                                ? project.images.find(
                                      (img) => img.image_path === src
                                  ).id
                                : null;

                            return (
                                <div
                                    key={index}
                                    className="group relative inline-block"
                                >
                                    <button
                                        type="button"
                                        className="bg-transparent group relative"
                                        onClick={() =>
                                            isExistingImage
                                                ? handleRemoveExistingImage(
                                                      index,
                                                      imageId
                                                  )
                                                : handleRemoveImage(index)
                                        }
                                    >
                                        <img
                                            src={src}
                                            alt={`Preview ${index}`}
                                            className="w-full h-auto rounded transition-opacity"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <FaTrash className="text-2xl text-white-100" />
                                        </div>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                    {/* End tampilkan preview gambar */}

                    {/* Button */}
                    <div className="flex justify-end gap-2">
                        <Link
                            href={route("project.index")}
                            className="bg-gray-100 py-1 px-3 text-gray-800 rounded-lg shadow transition-all hover:bg-gray-200 flex items-center"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="p-3 font-bold bg-green-1000 text-white rounded-lg flex items-center gap-2"
                            disabled={processing}
                        >
                            {processing && (
                                <svg
                                    className="h-5 w-5 animate-spin text-white-100"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            )}

                            {processing ? "Processing..." : "Submit"}
                        </button>
                    </div>
                    {/* End Button */}
                </form>
            </div>
        </AdminLayout>
    );
}
