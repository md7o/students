import React, { useState, useEffect } from "react";
import AddModal from "../../components/modal/add_modal";
import axios from "axios";

const AddStudents = ({
  showModal,
  handleCloseModal,
  onAddStudent,
  editStudent,
  studentDataToEdit,
}) => {
  const [genders, setGenders] = useState([]);
  const [grades, setGrades] = useState([]);
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

  useEffect(() => {
    const fetchGendersAndGrades = async () => {
      try {
        const genderResponse = await axios.get(
          "https://taxiapp.easybooks.me:8283/Settings/GetAllGenders",
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQxYTlmYjdkLTM5MzctNDRmNi0xMzVhLTA4ZGNhY2FjMjNkYyIsImp0aSI6IjU3NGEyMjRjLTVmNTYtNGE1Ni1hODA4LTExOGZjNDI4NTk5MCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJzdWIiOiJ1c2VybmFtZTAyMSIsImV4cCI6MTcyNDQ0Nzk3N30.rvBE9Vpk5v4UFOXDU7_kXzN_3WX80nWGgUtLldJKGRo`,
            },
          }
        );
        const gradeResponse = await axios.get(
          "https://taxiapp.easybooks.me:8283/Settings/GetAllGrades",
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQxYTlmYjdkLTM5MzctNDRmNi0xMzVhLTA4ZGNhY2FjMjNkYyIsImp0aSI6IjU3NGEyMjRjLTVmNTYtNGE1Ni1hODA4LTExOGZjNDI4NTk5MCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJzdWIiOiJ1c2VybmFtZTAyMSIsImV4cCI6MTcyNDQ0Nzk3N30.rvBE9Vpk5v4UFOXDU7_kXzN_3WX80nWGgUtLldJKGRo`,
            },
          }
        );

        setGenders(genderResponse.data);
        setGrades(gradeResponse.data);
      } catch (error) {
        console.error("Error fetching genders or grades:", error);
      }
    };

    fetchGendersAndGrades();

    if (studentDataToEdit) {
      setFormData(studentDataToEdit);
    } else {
      setFormData({
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
    }
  }, [studentDataToEdit]);

  if (!showModal) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let valid = true;
    const requiredFields = [
      "firstName",
      "lastName",
      "birthDate",
      "grade",
      "country",
      "city",
      "phone",
      "gender",
    ];

    let newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = true;
        valid = false;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (studentDataToEdit) {
        editStudent(formData);
      } else {
        onAddStudent(formData);
      }
      handleCloseModal();
    }
  };

  return (
    <AddModal show={showModal} onClose={handleCloseModal}>
      <h2 className="text-4xl py-3 font-bold mb-4 text-black">
        {studentDataToEdit ? "Edit Student" : "Add Student"}
      </h2>
      <form
        className="grid grid-cols-2 gap-4 cursor-auto"
        onSubmit={handleSubmit}
      >
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
            {grades.map((grade) => {
              const translation = grade.translations.find(
                (trans) => trans.cultureCode === 0 // Replace with user's culture code if necessary
              );
              return (
                <option key={grade.id} value={grade.id}>
                  {translation ? translation.name : "Unknown"}
                </option>
              );
            })}
          </select>
          {errors.grade && <p className="text-[#F34235]">{errors.grade}</p>}
        </div>

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
            className={`w-full px-3 py-3 my-2 border rounded-xl font-medium ring-1 ${
              errors.gender ? "ring-[#F34235]" : "ring-gray-300"
            } bg-[#00000010]`}
          >
            <option value="">Select gender</option>
            {genders.map((gender) => {
              const translation = gender.translations.find(
                (trans) => trans.cultureCode === 0 // Replace with user's culture code if necessary
              );
              return (
                <option key={gender.id} value={gender.id}>
                  {translation ? translation.name : "Unknown"}
                </option>
              );
            })}
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
            className="w-full bg-primary text-white px-6 py-2 rounded-lg hover:bg-hovprimary duration-200"
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
