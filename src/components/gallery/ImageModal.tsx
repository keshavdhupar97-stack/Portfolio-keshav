import { motion} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageModalProps {
  images: Array<{ src: string; thumb: string; span?: number }>;
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrevious,
  onNext,
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          className="absolute left-4 text-white hover:text-gray-300 transition-colors z-50 bg-black/20 backdrop-blur-sm rounded-full p-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronLeft size={48} />
        </motion.button>

        <motion.img
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ 
            duration: 0.4, 
            ease: "easeOut",
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          src={images[currentIndex].src}
          className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />

        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 text-white hover:text-gray-300 transition-colors z-50 bg-black/20 backdrop-blur-sm rounded-full p-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight size={48} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ImageModal;


