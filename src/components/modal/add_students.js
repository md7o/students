import React, { useState } from "react";
import AddModal from "../../components/modal/add_modal";

const AddStudents = ({
  showModal,
  handleCloseModal,
  onAddStudent,
  yourToken,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    grade: "",
    gender: "",
    country: "",
    city: "",
    phone: "",
    remarks: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = "First Name is required.";
      valid = false;
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last Name is required.";
      valid = false;
    }
    if (!formData.birthDate) {
      newErrors.birthDate = "Date of Birth is required.";
      valid = false;
    }
    if (!formData.grade) {
      newErrors.grade = "Educational Level is required.";
      valid = false;
    }
    if (!formData.country) {
      newErrors.country = "Country is required.";
      valid = false;
    }
    if (!formData.city) {
      newErrors.city = "City is required.";
      valid = false;
    }
    if (!formData.phone) {
      newErrors.phone = "Mobile number is required.";
      valid = false;
    }
    if (!formData.gender) {
      newErrors.gender = "Gender is required.";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleAddStudent = () => {
    const studentData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      birthDate: formData.birthDate,
      grade: formData.grade,
      gender: formData.gender,
      country: formData.country,
      city: formData.city,
      phone: formData.phone,
      remarks: formData.remarks,
    };

    fetch("https://taxiapp.easybooks.me:8283/Student/Add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${yourToken}`,
      },
      body: JSON.stringify(studentData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Handle success scenario here
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error scenario here
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAddStudent(formData);
      handleCloseModal();
    }
  };

  return (
    <AddModal show={showModal} onClose={handleCloseModal}>
      <h2 className="text-4xl py-3 font-bold mb-4 text-black">Add Student</h2>
      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        {/* First Name and Last Name */}
        <div>
          <label className="block text-gray-700 font-medium text-md">
            First Name<span className="text-2xl">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full px-3 py-3 my-2 border rounded-xl text-black font-medium ring-1 ${
              errors.firstName ? "ring-[#F34235]" : "ring-gray-300"
            } bg-[#00000010]`}
          />
          {errors.firstName && (
            <p className="text-[#F34235]">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700 font-medium text-md">
            Last Name<span className="text-2xl">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full px-3 py-3 my-2 border rounded-xl text-black font-medium ring-1 ${
              errors.lastName ? "ring-[#F34235]" : "ring-gray-300"
            } bg-[#00000010]`}
          />
          {errors.lastName && (
            <p className="text-[#F34235]">{errors.lastName}</p>
          )}
        </div>

        {/* Date of Birth and Educational Level */}
        <div>
          <label className="block text-gray-700 font-medium text-md">
            Date of Birth<span className="text-2xl">*</span>
          </label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className={`w-full px-3 py-3 my-2 border rounded-xl text-black font-medium ring-1 ${
              errors.birthDate ? "ring-[#F34235]" : "ring-gray-300"
            } bg-[#00000010]`}
          />
          {errors.birthDate && (
            <p className="text-[#F34235]">{errors.birthDate}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700 font-medium text-md">
            Educational Level<span className="text-2xl">*</span>
          </label>
          <select
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className={`w-full px-3 py-3 my-2 border rounded-xl text-black font-medium ring-1 ${
              errors.grade ? "ring-[#F34235]" : "ring-gray-300"
            } bg-[#00000010]`}
          >
            <option value="">Select educational level</option>
            <option value="high-school">High School</option>
            <option value="bachelors">Bachelor's</option>
            <option value="masters">Master's</option>
            <option value="phd">Ph.D.</option>
          </select>
          {errors.grade && <p className="text-[#F34235]">{errors.grade}</p>}
        </div>

        {/* Country and City */}
        <div>
          <label className="block text-gray-700 font-medium text-md">
            Country<span className="text-2xl">*</span>
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={`w-full px-3 py-3 my-2 border rounded-xl text-black font-medium ring-1 ${
              errors.country ? "ring-[#F34235]" : "ring-gray-300"
            } bg-[#00000010]`}
          />
          {errors.country && <p className="text-[#F34235]">{errors.country}</p>}
        </div>
        <div>
          <label className="block text-gray-700 font-medium text-md">
            City<span className="text-2xl">*</span>
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`w-full px-3 py-3 my-2 border rounded-xl text-black font-medium ring-1 ${
              errors.city ? "ring-[#F34235]" : "ring-gray-300"
            } bg-[#00000010]`}
          />
          {errors.city && <p className="text-[#F34235]">{errors.city}</p>}
        </div>

        {/* Mobile and Gender */}
        <div>
          <label className="block text-gray-700 font-medium text-md">
            Mobile<span className="text-2xl">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-3 py-3 my-2 border rounded-xl text-black font-medium ring-1 ${
              errors.phone ? "ring-[#F34235]" : "ring-gray-300"
            } bg-[#00000010]`}
          />
          {errors.phone && <p className="text-[#F34235]">{errors.phone}</p>}
        </div>
        <div>
          <label className="block text-gray-700 font-medium text-md">
            Gender<span className="text-2xl">*</span>
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`w-full px-3 py-3 my-2 border rounded-xl text-black font-medium ring-1 ${
              errors.gender ? "ring-[#F34235]" : "ring-gray-300"
            } bg-[#00000010]`}
          >
            <option value="">Select gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
          {errors.gender && <p className="text-[#F34235]">{errors.gender}</p>}
        </div>

        <div className="col-span-2">
          <label className="block text-gray-700 font-medium text-md">
            Note
          </label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            className="w-full px-3 py-3 my-2 border rounded-xl min-h-44 text-black font-medium ring-1 ring-gray-300 bg-[#00000010]"
            rows="4"
          ></textarea>
        </div>

        <div className="col-span-2 flex gap-4">
          <button
            type="submit"
            className="w-full bg-primary text-white px-6 py-2 rounded-lg"
          >
            Add
          </button>
          <button
            type="button"
            onClick={handleCloseModal}
            className="w-full bg-transparent ring-1 ring-primary text-primary px-6 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </AddModal>
  );
};

export default AddStudents;
