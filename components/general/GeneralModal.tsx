"use client";

import { useModal } from "@/context/ModalContext";

function GeneralModal() {
  const { isOpen, content, closeModal } = useModal();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/40 flex items-center justify-center"
      onClick={closeModal} // click outside closes
    >
      <div
        className="bg-white rounded-lg p-6 min-w-[300px]"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {content || <p>Default Modal</p>}
      </div>
    </div>
  );
}

export default GeneralModal;