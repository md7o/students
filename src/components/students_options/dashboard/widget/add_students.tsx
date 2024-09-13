import React, { useState, useEffect, useRef } from "react";
import AddModal from "../../../modal/add_modal";
import axios from "axios";
// import { getCookie } from "../../../../utils/cookieUtils";

interface Student {
  firstName: string;
  lastName: string;
  birthDate: string;
  grade: string;
  gender: string;
  country: string;
  city: string;
  phone: string;
  remarks: string;
  id?: string;
  [key: string]: any;
}

interface AddStudentsProps {
  showModal: boolean;
  handleCloseModal: () => void;
  onAddStudent: (studentData: Student) => void;
  isEditMode?: boolean;
  onEditStudent?: (studentData: Student) => void;
  studentDataToEdit?: Student | null;
}

interface StudentFormData {
  firstName: string;
  lastName: string;
  birthDate: string;
  grade: string;
  gender: string;
  country: string;
  city: string;
  phone: string;
  remarks: string;
  [key: string]: string;
}

const AddStudents: React.FC<AddStudentsProps> = ({
  showModal,
  handleCloseModal,
  onAddStudent,
  isEditMode,
  onEditStudent,
  studentDataToEdit,
}) => {
  const [genders, setGenders] = useState<
    { id: string; translations: { cultureCode: number; name: string }[] }[]
  >([]);
  const [grades, setGrades] = useState<
    { id: string; translations: { cultureCode: number; name: string }[] }[]
  >([]);
  const dateInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState<StudentFormData>({
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
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchGendersAndGrades = async () => {
      // const token = getCookie("authToken");

      try {
        const genderResponse = await axios.get(
          "https://taxiapp.easybooks.me:8283/Settings/GetAllGenders",
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer `,
            },
          }
        );
        const gradeResponse = await axios.get(
          "https://taxiapp.easybooks.me:8283/Settings/GetAllGrades",
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer `,
            },
          }
        );

        setGenders(genderResponse.data);
        setGrades(gradeResponse.data);
      } catch (error) {
        console.error("Error fetching genders or grades:", error);
        // Handle error properly, maybe show an alert or message to the user
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    let valid = true;
    const requiredFields: (keyof StudentFormData)[] = [
      "firstName",
      "lastName",
      "birthDate",
      "grade",
      "country",
      "city",
      "phone",
      "gender",
    ];

    const newErrors: Record<string, string> = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
        valid = false;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if (isEditMode && studentDataToEdit) {
        onAddStudent(formData); // Ensure `onAddStudent` can handle editing
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

        <div>
          <label className="block text-gray-700 font-medium text-md">
            Date of Birth<span className="text-2xl">*</span>
          </label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            // onClick={handleInputClick}
            ref={dateInputRef}
            className={`w-full px-3 py-3 my-2 border rounded-xl text-black font-medium ring-1 cursor-pointer${
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

        <div>
          <label className="block text-gray-700 font-medium text-md">
            Phone<span className="text-2xl">*</span>
          </label>
          <input
            type="text"
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
            Remarks
          </label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-3 my-2 border rounded-xl ring-1 ring-gray-300 bg-[#00000010]"
          />
        </div>

        <div className="col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            {isEditMode ? "Update Student" : "Add Student"}
          </button>
        </div>
      </form>
    </AddModal>
  );
};

export default AddStudents;
