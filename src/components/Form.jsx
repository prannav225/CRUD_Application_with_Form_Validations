import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const ProfileForm = ({
  profileData,
  isEdit,
  selectedIndex,
  onClose,
  setProfileData,
}) => {
  const initialValues = {
    fullName: isEdit ? profileData.fullName : "",
    email: isEdit ? profileData.email : "",
    phoneNumber: isEdit ? profileData.phoneNumber : "",
    dob: isEdit ? profileData.dob : "",
    state: isEdit ? profileData.state : "",
    gender: isEdit ? profileData.gender : "",
    city: isEdit ? profileData.city : "",
  };

  const ValidationSchema = Yup.object({
    fullName: Yup.string()
    .max(20,'Name should not exceed 20 characters ')
    .required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .required("Phone Number is required")
      //phoneNumber must be 10 digits
      .min(10, "Phone Number must be 10 digits")
      .max(10, "Phone Number must not exceed 10 characters"),
    dob: Yup.string()
      .required("Date of Birth is required")
      .test("age", "You must be at least 18 years old", function (value) {
        // calculating the age
        const birthDate = new Date(value);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - birthDate.getFullYear();

        // Check if the user is at least 18 years old
        return age >= 18;
      }),
    state: Yup.string().required("State/Province is required"),
    gender: Yup.string().required("Gender is required"),
    city: Yup.string().required("City is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: ValidationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      console.log("Submitting form with values:", values);

      // Retrieve existing data from local storage
      const existingDataJSON = localStorage.getItem("profileData");
      console.log("Existing data from local storage:", existingDataJSON);

      const existingData = existingDataJSON ? JSON.parse(existingDataJSON) : [];
      if (isEdit) {
        // Update the existing task
        existingData[selectedIndex] = { ...values };
      } else {
        // Add a new task
        existingData.push({ ...values });
      }

      // Store the merged data in local storage
      localStorage.setItem("profileData", JSON.stringify(existingData));
      // setProfileData(existingData);
      console.log("New data saved to local storage:", existingData);

      alert("Profile data saved successfully!");

      // Reset the form to its initial values
      resetForm();

      setSubmitting(false);
      onClose();
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); // Prevent default form submission behavior
        formik.handleSubmit(e);
      }}
      id="profile-form"
    >
      <div className="space-y-12 px-44 my-7">
        <div className="border rounded-lg pb-12 bg-indigo-50 shadow-2xl shadow-indigo-200">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="font-bold leading-7 text-gray-900 border-b border-inherit text-left text-xl underline underline-offset-4 px-2 my-2 ps-12">
              {isEdit ? "Update Profile" : "Add Profile"}
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 px-12">
              <div className="sm:col-span-3 text-left">
                <label className="block text-sm font-medium leading-6 text-gray-600">
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="fullName"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...formik.getFieldProps("fullName")}
                  />
                  {formik.touched.fullName && formik.errors.fullName ? (
                    <div className="text-red-600 text-left">
                      {formik.errors.fullName}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-600 text-left">
                  Email ID
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    name="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-600 text-left">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-600 text-left">
                  Phone No.
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="phoneNumber"
                    className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...formik.getFieldProps("phoneNumber")}
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                    <div className="text-red-600 text-left">
                      {formik.errors.phoneNumber}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-600 text-left">
                  Date of Birth
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="dob"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...formik.getFieldProps("dob")}
                  />
                  {formik.touched.dob && formik.errors.dob ? (
                    <div className="text-red-600 text-left">
                      {formik.errors.dob}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-600 text-left">
                  State/Province
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="state"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...formik.getFieldProps("state")}
                  />
                  {formik.touched.state && formik.errors.state ? (
                    <div className="text-red-600 text-left">
                      {formik.errors.state}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-600 text-left">
                  Gender
                </label>
                <div className="mt-2">
                  <select
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    {...formik.getFieldProps("gender")}
                    name="gender"
                  >
                    <option value="">Select</option>
                    <option value={"Male"}>Male</option>
                    <option value={"Female"}>Female</option>
                  </select>
                  {formik.touched.gender && formik.errors.gender ? (
                    <div className="text-red-600 text-left">
                      {formik.errors.gender}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="sm:col-span-3 sm:col-start-1">
                <label className="block text-sm font-medium leading-6 text-gray-600 text-left">
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...formik.getFieldProps("city")}
                  />
                  {formik.touched.city && formik.errors.city ? (
                    <div className="text-red-600 text-left">
                      {formik.errors.city}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="text-left ms-10 mt-4">
              <button
                type="submit"
                className="mt-2 p-2 px-5 ms-2 text-white border border-sky-500 bg-sky-500 shadow-lg shadow-sky-700/80 rounded-full hover:text-sky-500 hover:bg-transparent"
                disabled={formik.isSubmitting}
              >
                {isEdit ? "Update Profile" : "Add Profile"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
