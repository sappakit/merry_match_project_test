// src/pages/admin/merrypackagelist/index.js

import AdminHeader from "@/components/admin/AdminHeader";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { AdminSideBar } from "@/components/admin/AdminSideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import DeleteConfirmationModal from "@/components/admin/DeleteConfirmationModal";

function MerryPackageList() {
  const [packages, setPackages] = useState([]);
  const router = useRouter(); // เรียกใช้ useRouter

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailToDelete, setDetailToDelete] = useState(null); // state สำหรับ delete โดยเก็บค่า id ของแถวนั้นๆ

  // ฟังก์ชันดึงข้อมูล package
  const fetchPackages = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/admin/packages");
      setPackages(res.data); // เก็บข้อมูลใน state
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  // ฟังก์ชันสำหรับลบ package  old
  const deletePackage = async (id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      try {
        // ลบข้อมูลจาก database ผ่าน API
        await axios.delete("/api/admin/packages", { data: { id } });

        // อัปเดต state ให้ลบรายการที่ถูกลบออก
        //setPackages(packages.filter((pkg) => pkg.id_package !== id));
        fetchPackages();

        alert("Package deleted successfully!");
      } catch (error) {
        console.error("Error deleting package:", error);
        alert("Failed to delete package.");
      }
    }
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

  // แก้ไขฟังก์ชัน handleDelete ให้ลบข้อมูลจากฐานข้อมูล
  const handleDelete = async () => {
    try {
      // เรียก API เพื่อลบข้อมูลในฐานข้อมูล
      await axios.delete(
        `http://localhost:3000/api/admin/packages/${detailToDelete}`,
      );
      //, {data: { id: detailToDelete },}
      // อัปเดตรายการ package หลังลบสำเร็จ
      setPackages(packages.filter((pkg) => pkg.package_id !== detailToDelete));

      //setDetails(details.filter((detail) => detail.id !== detailToDelete));
      // ปิด Modal
      setIsModalOpen(false);
      setDetailToDelete(null);
    } catch (error) {
      console.error("Error deleting package:", error);
      alert("Failed to delete package.");
    }
  };

  // deleteDetail Step3.3: เรียกใช้ setIsModalOpen เพื่อ false ปิดหน้า Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setDetailToDelete(null);
  };

  // ดึงข้อมูล package จาก API
  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSideBar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}

        <AdminHeader
          title="Merry Package"
          searchPlaceholder="Search..."
          buttons={[
            {
              label: "+ Add Package",
              type: "third",
              onClick: () => router.push("/admin/merry-package-add"),
            },
          ]}
        />

        {/* Table */}
        <div className="overflow-x-auto px-12 py-4">
          <table className="min-w-full rounded-lg bg-white shadow-md">
            <thead className="bg-fourth-400">
              <tr>
                <th className="rounded-tl-lg px-6 py-3 font-medium text-gray-600"></th>
                <th className="px-6 py-3 text-sm font-medium leading-5 text-fourth-800"></th>
                <th className="px-6 py-3 text-sm font-medium leading-5 text-fourth-800">
                  Icon
                </th>
                <th className="px-6 py-3 text-sm font-medium leading-5 text-fourth-800">
                  Package Name
                </th>
                <th className="px-6 py-3 text-sm font-medium leading-5 text-fourth-800">
                  Merry Limit
                </th>
                <th className="px-6 py-3 text-sm font-medium leading-5 text-fourth-800">
                  Created Date
                </th>
                <th className="px-6 py-3 text-sm font-medium leading-5 text-fourth-800">
                  Updated Date
                </th>
                <th className="rounded-tr-lg px-6 py-3 text-center font-medium text-gray-600"></th>
              </tr>
            </thead>
            <tbody className="text-center">
              {packages.map((pkg, index) => (
                <tr key={pkg.package_id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-500">
                    <span className="cursor-move">⋮⋮</span>
                  </td>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">❤️</td>
                  <td className="px-6 py-4">{pkg.name_package}</td>
                  <td className="px-6 py-4">{pkg.litmit_match}</td>
                  <td className="px-6 py-4">
                    {new Date(pkg.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4"></td>
                  <td className="flex gap-5 px-6 py-4 text-center">
                    <FaTrashAlt
                      className="cursor-pointer text-2xl text-primary-300"
                      onClick={() => confirmDelete(pkg.package_id)}
                    />
                    <FaEdit
                      className="cursor-pointer text-2xl text-primary-300"
                      onClick={() =>
                        router.push(
                          `/admin/merry-package-list/${pkg.package_id}`,
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default MerryPackageList;
