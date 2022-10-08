import { toast } from "react-hot-toast";
import type { ToastPosition, ToastType } from "react-hot-toast";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { HiX } from "react-icons/hi";

export default function useCustomToast(
  position: ToastPosition,
  type: ToastType,
  message: string
): void {
  toast.custom(
    (t) => (
      <motion.div
        initial="initial"
        variants={{
          initial: { scale: 0, y: t.position?.includes("bottom") ? 100 : -100 },
          show: {
            y: 0,
            scale: 1,
          },
          hide: {
            y: t.position?.includes("bottom") ? "50vh" : "-50vh",
            scale: 0,
          },
        }}
        transition={{ duration: 1, type: "spring" }}
        animate={t.visible ? "show" : "hide"}
        whileTap={{ scale: 0.7 }}
        className={`${
          type == "success"
            ? "bg-success text-neutral-50 dark:text-neutral-900"
            : "bg-error text-neutral-50 dark:text-neutral-900"
        } px-8 py-3 cursor-pointer rounded-lg font-vazir font-bold flex flex-row gap-1 items-center justify-center`}
        onClick={() => toast.dismiss(t.id)}
      >
        {message}
        {type == "success" ? <FaCheck /> : <HiX />}
      </motion.div>
    ),
    {
      position,
      duration: 3000,
    }
  );
}
