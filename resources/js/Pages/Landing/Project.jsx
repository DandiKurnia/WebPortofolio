import LandingLayout from "@/Layouts/LandingLayout";
import { useState, useEffect } from "react";
import ModalCardProject from "@/Components/ModalCardProject";
import { FiArrowUpRight } from "react-icons/fi";

export default function Project({ projects }) {
    const [selectedProject, setSelectedProject] = useState(null);
    const [showModalProject, setShowModalProject] = useState(false);
    const [visibleCards, setVisibleCards] = useState([]);

    const showModal = (project) => {
        setSelectedProject(project);
        setShowModalProject(true);
    };

    useEffect(() => {
        // Menampilkan card secara berurutan
        projects.data.forEach((_, index) => {
            setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
            }, index * 200); // 200ms delay untuk setiap card
        });
    }, []);

    return (
        <LandingLayout>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 md:py-8">
                {projects.data.map((project, index) => (
                    <div
                        className="bg-gray-2000 rounded-2xl p-4 shadow-lg opacity-0"
                        key={project.id}
                        style={{
                            animation: `fadeIn 0.5s ${index * 0.2}s forwards`,
                        }}
                    >
                        <div className="rounded-lg overflow-hidden aspect-[3/2] bg-cover">
                            <img
                                src={
                                    project.images[0].image_path ||
                                    "https://via.placeholder.com/400x250"
                                }
                                alt="Finance Landing Page"
                                className="w-full h-full bg-cover"
                            />
                        </div>
                        {/* Content */}
                        <div className="mt-4 flex gap-2 justify-between items-start text-white">
                            <div className="text">
                                <h3 className="text-base md:text-2xl text-white-100 font-bold mb-3 w-50 line-clamp-1 capitalize">
                                    {project.title}
                                </h3>

                                {/* Tags */}
                                <div className="flex gap-2 mb-4 flex-wrap">
                                    {project.technologies
                                        ?.slice(0, 4)
                                        .map((tech, index) => (
                                            <span
                                                key={index}
                                                className="bg-gray-1000 text-gray-300 text-sm font-medium px-3 py-1 rounded-md"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    {project.technologies?.length > 4 && (
                                        <span className="bg-gray-1000 text-gray-300 text-sm font-medium px-3 py-1 rounded-md">
                                            +{project.technologies.length - 4}
                                        </span>
                                    )}
                                </div>
                            </div>
                            {/* Button */}
                            <div className="block">
                                <button
                                    onClick={() => showModal(project)}
                                    className="group w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-green-1000 text-black rounded-lg  transition"
                                >
                                    <FiArrowUpRight className="text-2xl transition-transform transform group-hover:-translate-y-0.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModalProject && (
                <>
                    {console.log("Modal should render", {
                        showModal: showModalProject,
                        project: selectedProject,
                    })}
                    <ModalCardProject
                        onClose={() => {
                            console.log("Closing modal");
                            setShowModalProject(false);
                            setSelectedProject(null);
                        }}
                        dataPorject={selectedProject}
                        showModal={showModalProject}
                    />
                </>
            )}
        </LandingLayout>
    );
}
