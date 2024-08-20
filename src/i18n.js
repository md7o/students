import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      Add_Student: "Add Student",
      Students_Data: "Students' Data",
      Filter_By: "Filter By:",
      search_place_holder: "Search by first name, last name",
      Equal_to: "Equal to",
      Greater_than: "Greater than",
      Less_than: "Less than",
      First_Name: "First Name",
      Last_Name: "Last Name",
      Date_of_Birth: "Date of Birth",
      Edu_Level: "Educational Level",
      Gender: "Gender",
      Country: "Country",
      City: "City",
      Phone: "Phone",
      Notes: "Notes",
      Actions: "Actions",
      Rows_Per_Page: "Rows_Per_Page:",
    },
  },
  ar: {
    translation: {
      Add_Student: "إضافة طالب",
      Students_Data: "بيانات الطلاب",
      search_place_holder: "البحث بالاسم الأول، الاسم الأخير",
      Filter_By: "تصفية حسب",
      Equal_to: "مساوي الى",
      Greater_than: "أكبر من",
      Less_than: "أقل من",
      First_Name: "الإسم الأول",
      Last_Name: "الإسم الأخير",
      Date_of_Birth: "تاريخ الميلاد",
      Edu_Level: "المستوى التعليمي",
      Gender: "الجنس",
      Country: "البلد",
      City: "المدينة",
      Phone: "الهاتف",
      Notes: "ملحوظات",
      Actions: "الإجراءات",
      Rows_Per_Page: ":النتائج لكل صفحة",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
