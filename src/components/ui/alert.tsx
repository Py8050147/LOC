// components/ui/alert.tsx
import { cn } from "@/lib/utils";

export const Alert = ({ children, variant = "info" }: { children: React.ReactNode; variant?: "info" | "destructive" }) => {
    const variantStyles = cn(
        "p-4 rounded-md text-sm font-medium",
        variant === "info" && "bg-blue-100 text-blue-800",
        variant === "destructive" && "bg-red-100 text-red-800"
    );

    return <div className={variantStyles}>{children}</div>;
};
