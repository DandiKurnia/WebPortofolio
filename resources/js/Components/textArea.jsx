import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextArea(
    { type = "text", className = "", isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <textarea
            {...props}
            type={type}
            className={
                "dark:border-gray-700 dark:bg-gray-2000 dark:text-gray-300 dark:focus:border-green-1000 dark:focus:ring-green-1000 rounded-md shadow-sm " +
                className
            }
            ref={input}
        />
    );
});
