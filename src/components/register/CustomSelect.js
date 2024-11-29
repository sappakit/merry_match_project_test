import React from "react";
import Select, { components } from "react-select";

// ตัวเลือกของ Dropdown Indicator
const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <span>▼</span>
    </components.DropdownIndicator>
  );
};

const customStyles = {
  control: (base) => ({
    ...base,
    borderRadius: "0.650rem", // กำหนดขอบมน
    padding: "0.2rem", // เพิ่มพื้นที่ภายใน

    // กำหนดให้กว้างเต็มที่
    // กำหนดความสูงให้มากขึ้น
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "blue", // กำหนดสีให้ Dropdown Indicator
    padding: "0.1rem", // เพิ่มพื้นที่ภายในของไอคอน
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#E0E7FF", // กำหนดสีพื้นหลังของตัวเลือกที่เลือก
    borderRadius: "1.000rem", // กำหนดขอบมน
    color: "#3B82F6", // กำหนดสีข้อความ
  }),
};

export default function CustomSelect({ formData, updateHobbies }) {
  const handleChange = (selectedOptions) => {
    updateHobbies(selectedOptions); // เรียกใช้ฟังก์ชัน updateHobbies ที่ส่งจาก RegisterPage
  };

  return (
    <>
      <label
        htmlFor="preferences"
        className="block text-sm font-semibold text-gray-700"
      >
        Hobbies / Interests (Maximum 10)
      </label>
      <Select
        closeMenuOnSelect={false}
        components={{ DropdownIndicator }}
        isMulti
        styles={customStyles}
        name="hobbies"
        onChange={handleChange} // เมื่อเลือกตัวเลือกจะเรียก handleChange
        value={formData.hobbies} // ใช้ค่าปัจจุบันจาก formData
        options={[
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" },
          { value: "option3", label: "Option 3" },
          { value: "option4", label: "Option 4" },
          { value: "option5", label: "Option 5" },
          { value: "option6", label: "Option 6" },
          { value: "option7", label: "Option 7" },
          { value: "option8", label: "Option 8" },
          { value: "option9", label: "Option 9" },
          { value: "option10", label: "Option 10" },
          { value: "option10", label: "Option 11" },
          { value: "option10", label: "Option 12" },
          { value: "option10", label: "Option 13" },
          { value: "option10", label: "Option 14" },
          { value: "option10", label: "Option 15" },
        ]}
      />
    </>
  );
}
