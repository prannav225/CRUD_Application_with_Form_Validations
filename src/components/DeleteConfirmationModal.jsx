import React from "react";

const DeleteConfirmationModal = ({ onClose, onConfirmDelete }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black opacity-60"></div>

      {/* Modal content */}
      <div className="bg-white p-4 rounded shadow-md z-10">
        <h2 className="text-lg mb-4">Confirm Deletion</h2>

        {/* Deletion confirmation message */}
        <p>Are you sure you want to delete this profile?</p>

        {/* Buttons for confirmation and cancellation */}
        <div className="flex justify-end mt-4">
          {/* Confirm deletion button */}
          <button
            className="bg-red-500 border-red-500 text-white px-4 py-1 mr-48 rounded hover:bg-transparent border hover:text-red-500"
            onClick={onConfirmDelete}
          >
            Yes
          </button>

          {/* Cancel button */}
          <button
            className="bg-sky-500 border-sky-500 text-white px-4 py-1 rounded hover:bg-transparent border hover:text-sky-500"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
