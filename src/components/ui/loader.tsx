// components/ui/loader.tsx
export const Loader = ({ message = "Loading..." }: { message?: string }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-gray-500"></div>
            <p className="mt-4 text-gray-600">{message}</p>
        </div>
    );
};
