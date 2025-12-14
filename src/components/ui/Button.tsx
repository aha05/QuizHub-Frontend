
export default function Button({ children, onClick, disabled, variant = "primary" }: {
children: React.ReactNode;
onClick?: () => void;
disabled?: boolean;
variant?: "primary" | "secondary" | "success" | "danger";
}) {
const base = "px-4 py-2 rounded-lg font-medium transition";
const variants = {
primary: "bg-blue-600 text-white hover:bg-blue-700",
success: "bg-green-600 text-white",
danger: "bg-red-600 text-white",
secondary: "bg-gray-200 text-gray-800",
};


return (
<button
onClick={onClick}
disabled={disabled}
className={`${base} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
>
{children}
</button>
);
}