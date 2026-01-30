import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { router } from "@inertiajs/react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaTrash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import imageCompression from "browser-image-compression";

export default function ModalSkill({ onClose, skill = null }) {
    const [formData, setFormData] = useState({
        title: skill?.title || "",
        description: skill?.description || "",
        image: skill?.image || "",

        newImage: null,
    });

    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [previewImages, setPreviewImage] = useState([]);
    const [compressing, setCompressing] = useState(false);

    useEffect(() => {
        if (skill) {
            setFormData({
                title: skill.title || "",
                image: skill.image || "",
                description: skill.description || "",
                newImage: null,
            });

            if (skill.image) {
                setPreviewImage([skill.image]);
            }
        }
    }, [skill]);

    const onDrop = useCallback(async (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setCompressing(true);
            try {
                const compressedFile = await imageCompression(file, {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true,
                });
                setFormData((prev) => ({
                    ...prev,
                    newImage: compressedFile,
                }));
                setPreviewImage([URL.createObjectURL(compressedFile)]);
            } catch (error) {
                console.log(error);
                setErrors((prev) => ({
                    ...prev,
                    image: "Failed to compress image",
                    newImage: file,
                }));
                setPreviewImage([URL.createObjectURL(file)]);
            } finally {
                setCompressing(false);
            }
        }
    }, []);

    const handleRemoveImage = () => {
        setPreviewImage([]);
        setFormData((prev) => ({
            ...prev,
            image: null,
            newImage: null,
        }));
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpg", ".jpeg"],
        },
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        try {
            const submitFormData = new FormData();
            submitFormData.append("title", formData.title.trim());
            submitFormData.append("description", formData.description.trim());

            if (formData.newImage instanceof Blob) {
                submitFormData.append("image", formData.newImage);
            }

            if (skill) {
                submitFormData.append("_method", "PUT");

                await router.post(
                    route("skill.update", skill.id),
                    submitFormData,
                    {
                        forceFormData: true,
                        onSuccess: () => {
                            setProcessing(false);
                            onClose();
                        },
                        onError: (errors) => {
                            setProcessing(false);
                            setErrors(errors);
                        },
                        preserveState: true,
                    },
                );
            } else {
                await router.post(route("skill.store"), submitFormData, {
                    forceFormData: true,
                    onSuccess: () => {
                        setProcessing(false);
                        onClose();
                    },
                    onError: (errors) => {
                        setProcessing(false);
                        setErrors(errors);
                    },
                    preserveState: true,
                });
                console.log();
            }
        } catch (error) {
            console.log(error);
            setProcessing(false);
        }
    };
    return (
        <div className="fixed top-0 left-0 w-full h-screen bg-gray-100/10 backdrop-blur-sm z-50 md:overflow-y-hidden xl:overflow-y-auto transition-all animate-[fadeIn_0.3s_ease-out_forwards]">
            <div className="md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto md:my-10 lg:my-6 xl:my-8 xxl:my-10 bg-gray-1000 p-4 rounded-none md:rounded-lg shadow-lg text-white-100 animate-[cardPop_0.5s_0.2s_ease-out_forwards] opacity-0">
                <div className="flex justify-end -mt-1 mb-5">
                    <button
                        onClick={onClose}
                        className="text-3xl hover:text-green-1000"
                    >
                        <IoMdClose />
                    </button>
                </div>

                <div className="h-screen md:h-[80vh] p-2 xl:p-0 overflow-auto animate-[fadeUp_0.5s_0.4s_ease-out_forwards] opacity-0">
                    <form onSubmit={onSubmit}>
                        <div className="mb-4">
                            <InputLabel value="Title" />
                            <TextInput
                                value={formData.title}
                                type="text"
                                name="title"
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        title: e.target.value,
                                    }))
                                }
                                className="w-full mt-2"
                            />
                            {errors.title && (
                                <InputError
                                    message={errors.title}
                                    className="mt-2"
                                />
                            )}
                        </div>
                        <div className="mb-4">
                            <InputLabel value="Description" />
                            <TextInput
                                value={formData.description}
                                type="text"
                                name="description"
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))
                                }
                                className="w-full mt-2"
                            />
                            {errors.description && (
                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            )}
                        </div>
                        <div className="mb-4">
                            <InputLabel value="Upload Certificate" />
                            <div className="mt-4">
                                <div className="w-full mt-4">
                                    <div {...getRootProps()}>
                                        <label
                                            htmlFor="dropzone-file"
                                            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-1000 ${
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
                                                            Drop image in here
                                                            .....
                                                        </span>
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
                                                            SVG, PNG, JPG or GIF
                                                            (MAX. 800x400px)
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                            <input {...getInputProps()} />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-3 gap-4 mb-4">
                                {previewImages.length > 0 && (
                                    <div className="relative">
                                        <button
                                            type="button"
                                            className="bg-transparent"
                                            onClick={handleRemoveImage}
                                        >
                                            <div className="relative inline-flex items-center justify-center">
                                                <img
                                                    src={previewImages[0]}
                                                    alt="Preview"
                                                    className="w-24 transition-opacity"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                                                    <FaTrash className="text-2xl text-white-100" />
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                type="submit"
                                className="font-bold py-2 px-2 rounded-md md:rounded-lg bg-green-1000 text-gray-2000 flex items-center gap-2"
                                disabled={processing || compressing}
                            >
                                {(processing || compressing) && (
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
                                {compressing
                                    ? "Compressing..."
                                    : processing
                                      ? "Processing..."
                                      : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
