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
        initial={{ y: t.position?.includes("bottom") ? 100 : -100 }}
        animate={{ y: 0 }}
        className={`${
          type == "success" ? "bg-success text-white" : "bg-error text-white"
        } px-8 py-3 rounded-lg font-vazir font-bold flex flex-row gap-1 items-center justify-center`}
      >
        {message}
        {type == "success" ? <FaCheck /> : <HiX />}
      </motion.div>
    ),
    {
      position,
    }
  );
}
