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

export default function Create({ auth }) {
    const { data, post, setData, processing, errors } = useForm({
        title: "",
        description: "",
        link: "",
        technologies: [], // Default empty array
        images: [],
    });

    const [previewImages, setPreviewImages] = useState([]);
    const [newTech, setNewTech] = useState("");

    // Handle file drop
    const onDrop = useCallback(
        (acceptedFiles) => {
            setData((prevData) => ({
                ...prevData,
                images: [...prevData.images, ...acceptedFiles],
            }));
            previewFiles(acceptedFiles);
        },
        [data.images]
    );

    const handleRemoveImage = (index) => {
        // console.log("Before removing image:", data.images);

        setPreviewImages((prevImages) =>
            prevImages.filter((_, i) => i !== index)
        );

        setData((prevData) => {
            const updatedImages = prevData.images.filter((_, i) => i !== index);
            // console.log("After removing image:", updatedImages); // Debugging state update
            return { ...prevData, images: updatedImages };
        });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    // Preview gambar
    const previewFiles = (files) => {
        setPreviewImages((prevImages) => [
            ...prevImages,
            ...files.map((file) => URL.createObjectURL(file)),
        ]);
    };

    const handleAddTech = () => {
        if (newTech.trim() !== "") {
            setData((prevData) => ({
                ...prevData,
                technologies: [...prevData.technologies, newTech.trim()],
            }));
            setNewTech("");
        }
    };

    const handleRemoveTech = (index) => {
        setData((prevData) => ({
            ...prevData,
            technologies: prevData.technologies.filter((_, i) => i !== index),
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        // console.log("Images before submit:", data.images);
        // console.log("Submitting data:", data);
        post(route("project.store"), {
            forceFormData: true,
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
            <Head title="Dashboard" />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-white-100">
                    Create Project
                </h1>
            </div>
            <div className="bg-gray-2000 p-6 rounded-sm">
                <form onSubmit={onSubmit}>
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
                    {/* End input description */}

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
                                placeholder="Laravel"
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
                            message={errors.technologies}
                            className="mt-2"
                        ></InputError>
                        {/* Menampilkan Tecnology */}
                        <div
                            className={`flex flex-wrap gap-2 mt-3 border-2 border-gray-700 border-dashed p-2 rounded-lg ${
                                data.technologies.length === 0 ? "hidden" : ""
                            }`}
                        >
                            {data.technologies.map((tech, index) => (
                                <span
                                    key={index}
                                    className="flex items-center bg-gray-1000 text-white-100 px-3 py-1 rounded-full"
                                >
                                    {tech}
                                    <button
                                        className="ml-2 text-white-100 "
                                        onClick={() => handleRemoveTech(index)}
                                    >
                                        <IoMdClose className="hover:text-gray-400" />
                                    </button>
                                </span>
                            ))}
                        </div>
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

                        {Object.keys(errors)
                            .filter((key) => key.startsWith("images"))
                            .map((key, index) => {
                                // Mendapatkan indeks gambar dari key (contoh: "images.0" -> 1)
                                const imageIndex = key.split(".")[1];
                                return (
                                    <InputError
                                        key={index}
                                        message={`The image ${
                                            parseInt(imageIndex) + 1
                                        } size must not exceed ${errors[key]}`}
                                        className="mt-2"
                                    ></InputError>
                                );
                            })}
                    </div>
                    {/* End Drag and Drop untuk gambar*/}

                    {/* Tampilkan preview gambar */}
                    <div className="mt-4 grid grid-cols-3 gap-4 mb-4">
                        {previewImages.map((src, index) => (
                            <div
                                key={index}
                                className="group relative inline-block"
                            >
                                <button
                                    type="button"
                                    className="bg-transparent group relative"
                                    onClick={() => handleRemoveImage(index)}
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
                        ))}
                    </div>
                    {/* End Tampilkan preview gambar */}

                    {/* Button */}
                    <div className="flex justify-end gap-2">
                        <Link
                            href={route("project.index")}
                            className="bg-gray-100 py-2 px-2 rounded-md md:rounded-lg text-gray-800  shadow transition-all hover:bg-gray-200 flex items-center"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="font-bold py-2 px-2 rounded-md md:rounded-lg bg-green-1000 text-gray-2000 flex items-center gap-2"
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
                    {/* End button */}
                </form>
            </div>
        </AdminLayout>
    );
}
