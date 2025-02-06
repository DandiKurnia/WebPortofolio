import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    // Ganti 'Links' menjadi 'links'
    return (
        <nav className="text-center mt-4">
            {links.map(
                (
                    link,
                    index // Tambahkan 'index' untuk key
                ) => (
                    <Link
                        preserveScroll
                        href={link.url || ""}
                        key={link.label} // Menambahkan key
                        className={
                            "inline-block py-2 px-3 rounded-lg mr-2 text-gray-600 dark:text-gray-200 text-xs " +
                            (link.active
                                ? "bg-gray-200 dark:bg-gray-1000 "
                                : " ") +
                            (!link.url
                                ? "!text-gray-500 cursor-not-allowed "
                                : "hover:bg-gray-200 dark:hover:bg-gray-1000 ")
                        }
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    ></Link>
                )
            )}
        </nav>
    );
}
