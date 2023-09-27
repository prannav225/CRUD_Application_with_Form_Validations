import React from "react";

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black opacity-60"></div>

      {/* Modal content */}
      <div className="bg-gray-100 rounded-md p-4 z-10">
        {/* Close button */}
        <div className="text-right">
          <button
            className="text-4xl bg-sky-600 p-2 rounded-md text-white hover:text-sky-600 hover:bg-transparent border border-sky-600 cursor-pointer material-symbols-outlined"
            onClick={onClose}
          >
            close
          </button>
        </div>

        {/* Render the children (content) of the modal */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
