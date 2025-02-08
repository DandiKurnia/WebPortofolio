import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

export default function Show({ auth, projects }) {
    return (
        <AdminLayout user={auth.user}>
            <Head title="Project" />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-white-100">
                    {projects.title}
                </h1>
            </div>
        </AdminLayout>
    );
}
