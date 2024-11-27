// src/pages/admin/merrypackagelist/index.js

import { CustomButton } from "@/components/CustomUi";
import AdminHeader from "@/components/admin/AdminHeader";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { AdminSideBar } from "@/components/admin/AdminSideBar";

function MerryPackageList() {
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
              <tr className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-500">
                  <span className="cursor-move">⋮⋮</span>
                </td>
                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4">❤️</td>
                <td className="px-6 py-4">Basic</td>
                <td className="px-6 py-4">25 Merry</td>
                <td className="px-6 py-4">12/02/2022 10:30PM</td>
                <td className="px-6 py-4">12/02/2022 10:30PM</td>
                <td className="flex gap-5 px-6 py-4 text-center">
                  <FaTrashAlt className="text-2xl text-primary-300" />
                  <FaEdit className="text-2xl text-primary-300" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default MerryPackageList;
