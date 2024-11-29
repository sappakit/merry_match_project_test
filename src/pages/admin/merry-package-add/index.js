import { AdminSideBar } from "@/components/admin/AdminSideBar";
import AdminHeader from "@/components/admin/AdminHeader";
import { useState } from "react";
import DeleteConfirmationModal from "@/components/admin/DeleteConfirmationModal";

function MerryPackageAdd() {
  const [details, setDetails] = useState([{ id: 1, text: "" }]); // state สำหรับเก็บรายการ Detail โดยเริ่มต้นที่ 1 และ text = ""
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailToDelete, setDetailToDelete] = useState(null); // state สำหรับ delete โดยเก็บค่า id ของแถวนั้นๆ
  console.log(details);

  // addDetail Step2:
  // ใช้ setDetails เพื่อเพิ่ม object ใหม่ใน array ของ state : details
  const addDetail = () => {
    setDetails([...details, { id: details.length + 1, text: "" }]);
  };

  // deleteDetail Step2:
  // เรียกใช้ state: setDetailToDelete  เพื่อเก็บค่า id ของแถวนั้นๆที่จะทำการลบ detail
  // เรียก setIsModalOpen จากเดิมเป็น false > true เพื่อเปิดการใช้งาน DeleteConfirmationModal จากการเรียกใช้ props ใน DeleteConfirmationModal.JS
  const confirmDelete = (id) => {
    setDetailToDelete(id);
    setIsModalOpen(true);
  };

  //deleteDetail Step6: ใช้ filter เพื่อลบ detail ที่มี id ตรงกับ detailToDelete
  // ตั้งค่า isModalOpen เป็น false เพื่อปิด Modal.
  // รีเซ็ต detailToDelete เป็น null
  const handleDelete = () => {
    setDetails(details.filter((detail) => detail.id !== detailToDelete));
    setIsModalOpen(false);
    setDetailToDelete(null);
  };

  // deleteDetail Step3.3: เรียกใช้ setIsModalOpen เพื่อ false ปิดหน้า Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setDetailToDelete(null);
  };

  // updateDetail Step2: ใช้ map เพื่อวนลูปข้อมูล details
  // เช็คว่า id ตรงกับรายการที่ต้องการแก้ไขหรือไม่
  // ถ้าใช่: สร้าง object ใหม่ โดยเปลี่ยนค่าของ text เป็น value.
  // ถ้าไม่ใช่: คืนค่ารายการเดิม.
  const updateDetail = (id, value) => {
    setDetails(
      details.map((detail) =>
        detail.id === id ? { ...detail, text: value } : detail,
      ),
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSideBar />
      {/* Main Content */}
      <main className="flex-1">
        <AdminHeader
          title="Add Package"
          buttons={[
            {
              label: "Cancel",
              type: "secondary",
            },
            {
              label: "Create",
              type: "primary",
            },
          ]}
        />
        <div className="mx-auto p-8">
          <div className="mx-auto max-w-5xl rounded-lg bg-white p-8 shadow">
            <div className="mb-8 grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="packageName"
                  className="block font-medium text-gray-700"
                >
                  Package name <span className="text-red-500">*</span>
                </label>
                <input
                  id="packageName"
                  type="text"
                  className="mt-1 h-12 w-full rounded-md border-2 border-gray-300 px-4 shadow-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="merryLimit"
                  className="block font-medium text-gray-700"
                >
                  Merry limit <span className="text-red-500">*</span>
                </label>
                <select
                  id="merryLimit"
                  className="mt-1 h-12 w-full rounded-md border-2 border-gray-300 px-4 shadow-sm"
                >
                  <option value=""></option>
                  <option value="25">25</option>
                  <option value="45">45</option>
                  <option value="70">70</option>
                </select>
              </div>
            </div>

            {/* Upload Icon */}
            <div className="mb-8">
              <label htmlFor="icon" className="block font-medium text-gray-700">
                Icon <span className="text-red-500">*</span>
              </label>
              <div className="mt-4 flex h-32 w-32 items-center justify-center rounded-3xl border-gray-300 bg-gray-100">
                <button className="text-primary-500">
                  <span className="text-3xl">+</span>
                  <p className="text-sm">Upload icon</p>
                </button>
              </div>
            </div>

            <hr className="my-8 border-gray-300" />

            {/* Package Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Package Detail
              </h3>

              {/* addDetail Step3:
               1. ใช้ .map เพื่อวนลูป State: details
               2. key={detail.id}  ใช้ id เป็น key เพื่อช่วย React แยกแยะ element แต่ละตัว 
               3. แสดงค่าจาก detail.text ใน <input>
              */}
              {details.map((detail) => (
                <div
                  key={detail.id}
                  className="mt-4 flex items-center space-x-4"
                >
                  <span className="cursor-move text-gray-400">⋮⋮</span>

                  <input
                    type="text"
                    placeholder="Enter detail"
                    value={detail.text}
                    //updateDetail Step1: เก็บค่า key={detail.id} และ e.target.value
                    onChange={(e) => updateDetail(detail.id, e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                  {/* deleteDetail Step1: เรียกใช้ function confirmDelete และส่งค่า detail.id ของแถวนั้นๆ */}
                  <button
                    onClick={() => confirmDelete(detail.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    Delete
                  </button>
                </div>
              ))}
              {/* Add Detail Button */}
              <div className="mt-6">
                <button
                  // addDetail Step1:  onClick to Function > addDetail
                  onClick={addDetail}
                  className="rounded-lg bg-pink-100 px-4 py-2 text-pink-500 hover:bg-pink-200"
                >
                  + Add detail
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Confirm Modal */}
      <DeleteConfirmationModal
        isOpen={isModalOpen} // isModalOpen = true เปิดใช้งาน
        onClose={closeModal} // deleteDetail Step3.2: เรียกใช้ function closeModal เพื่อยกเลิก
        onConfirm={handleDelete} // ลบรายการโดยกดยืนยัน deleteDetail Step5: เรียกใข้ function: handleDelete
        message="Are you sure you want to delete this detail?"
        confirmLabel="Yes, I want to delete"
        cancelLabel="No, I don't want"
      />
    </div>
  );
}

export default MerryPackageAdd;
