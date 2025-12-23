// src/utils/toastStyles.ts
interface TypedToastOptions {
  duration?: number;
  style?: React.CSSProperties;
  success?: { style?: React.CSSProperties; duration?: number };
  error?: { style?: React.CSSProperties; duration?: number };
  info?: { style?: React.CSSProperties; duration?: number };
  loading?: { style?: React.CSSProperties; duration?: number };
}

export const toastStyles: TypedToastOptions = {
  duration: 2000,
  style: {
    color: "#fff",
    background: "#81d5f9", // light blue
  },
  success: {
    style: { background: "green" },
  },
  error: {
    style: { background: "red" },
  },
  info: {
    style: { background: "#3b82f6" }, // blue-500
  },
  loading: {
    style: { background: "gray" },
  },
};
