import React, { useEffect, useState } from "react";
import ProfileForm from "./Form";
import Modal from "./Modal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const ITEMS_PER_PAGE = 5; // Number of profiles to display per page

const Table = () => {
  // State variables
  const [profileData, setProfileData] = useState([]); // Store profile data
  const [selectedProfileIndex, setSelectedProfileIndex] = useState(null); // Index of the selected profile for editing
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete confirmation modal
  const [profileToDelete, setProfileToDelete] = useState(null); // Index of the profile to delete
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalProfiles, setTotalProfiles] = useState(0); // Total number of profiles

  // Load profile data from local storage on component mount
  useEffect(() => {
    const existingDataJSON = localStorage.getItem("profileData");
    const existingData = existingDataJSON ? JSON.parse(existingDataJSON) : [];

    setProfileData(existingData);
    setTotalProfiles(existingData.length); // Set the total number of profiles
  }, []);

  // Scroll to the profile form section
  const scrollToProfileForm = () => {
    const profileFormElement = document.getElementById("profile-form");
    if (profileFormElement) {
      profileFormElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  const updateProfileData = (newData) => {
    setProfileData(newData);
  };
  // Close the profile editing modal
  const handleCloseEdit = () => {
    setSelectedProfileIndex(null);
  };

  // Open the profile editing modal for a specific profile
  const handleEdit = (index) => {
    setSelectedProfileIndex(index);
  };

  // Handle the delete action for a specific profile
  const handleDelete = (index) => {
    // Open the delete confirmation modal
    setIsDeleteModalOpen(true);
    setProfileToDelete(index);
  };

  // Confirm and handle the deletion of a profile
  const handleConfirmDelete = () => {
    // Delete the profile from profileData state
    const updatedProfiles = [...profileData];
    updatedProfiles.splice(profileToDelete, 1);

    // Update the profileData state
    setProfileData(updatedProfiles);

    // Update the data in local storage
    localStorage.setItem("profileData", JSON.stringify(updatedProfiles));

    // Close the delete confirmation modal
    setIsDeleteModalOpen(false);
  };

  // Close the delete confirmation modal without deleting
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  // Calculate the starting and ending indexes for the profiles to display on the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Get the profiles to display on the current page
  const profilesToDisplay = profileData.slice(startIndex, endIndex);

  // Calculate the total number of pages needed for pagination
  const totalPages = Math.ceil(profileData.length / ITEMS_PER_PAGE);

  // Handle page change when clicking the pagination buttons
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // JSX for the component
  return (
    <div id="profile-table" className="space-y-12 px-44 my-7 text-gray-600">
      <div className="border rounded-lg pb-0 bg-indigo-50 shadow-2xl shadow-indigo-200">
        <div className="border-b border-gray-900/10 pb-4">
          <div className="flex justify-between border-b border-inherit mt-2">
            <h2 className="font-bold leading-7 text-gray-900 text-left text-xl underline underline-offset-4 px-2 pt-2">
              Profile
            </h2>
            <button
              className="px-4 text-sm me-4 text-white border bg-sky-500 shadow-lg shadow-sky-700/80 rounded-full relative bottom-1 hover:text-sky-500 border-sky-500 hover:bg-transparent"
              onClick={scrollToProfileForm}
            >
              Add New Profile
            </button>
          </div>
          <table className="w-full mt-7 text-gray-600 text-left">
            <thead className="border-b text-gray-600 rounded-md w-full shadow-md shadow-indigo-200 border-indigo-200 bg-indigo-100 h-12">
              <tr>
                <th className="ps-3">FullName</th>
                <th>PhoneNo.</th>
                <th>EmailID</th>
                <th>Gender</th>
                <th>D.O.B</th>
                <th>City</th>
                <th>State</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="font-semibold">
              {profilesToDisplay.map((profile, index) => (
                <tr key={index}>
                  <td className="p-3">{profile.fullName}</td>
                  <td>{profile.phoneNumber}</td>
                  <td>{profile.email}</td>
                  <td>{profile.gender}</td>
                  <td>{profile.dob}</td>
                  <td>{profile.city}</td>
                  <td>{profile.state}</td>
                  <td>
                    <button
                      className="material-symbols-outlined cursor-pointer text-xl border rounded px-1 py-0 m-1 border-gray-300 hover:text-sky-500 hover:border-sky-500"
                      onClick={() => handleEdit(index + startIndex)}
                    >
                      edit
                    </button>
                    <button
                      className="material-symbols-outlined cursor-pointer text-xl border rounded px-1 py-0 m-1 border-gray-300 hover:text-red-500 hover:border-red-500"
                      onClick={() => handleDelete(index + startIndex)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-between p-3">
          <span className="font-bold text-gray-500">
            Showing{" "}
            <span className="text-sky-500">
              {Math.min(1 + (currentPage - 1) * ITEMS_PER_PAGE, totalProfiles)}
            </span>
            -{" "}
            <span className="text-sky-500">
              {Math.min(currentPage * ITEMS_PER_PAGE, totalProfiles)}
            </span>
            {""} of <span className="text-sky-500">{totalProfiles}</span>{" "}
            results
          </span>
          <div className="flex">
            <button
              className="material-symbols-outlined border rounded border-gray-300 mx-1 hover:text-sky-500 hover:border-sky-500"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              chevron_left
            </button>
            <span className="font-bold">{`${currentPage}/${totalPages}`}</span>
            <button
              className="material-symbols-outlined border rounded border-gray-300 mx-1 hover:text-sky-500 hover:border-sky-500"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              chevron_right
            </button>
          </div>
        </div>
      </div>
      {/* Update profile modal */}
      {selectedProfileIndex !== null && (
        <Modal onClose={handleCloseEdit}>
          <ProfileForm
            profileData={profileData[selectedProfileIndex]}
            isEdit={true}
            selectedIndex={selectedProfileIndex}
            onClose={handleCloseEdit}
            setProfileData={updateProfileData}
          />
        </Modal>
      )}
      {/* Delete confirmation modal */}
      {isDeleteModalOpen && (
        <Modal onClose={handleCloseDeleteModal}>
          <DeleteConfirmationModal
            onClose={handleCloseDeleteModal}
            onConfirmDelete={handleConfirmDelete}
          />
        </Modal>
      )}
    </div>
  );
};

export default Table;
