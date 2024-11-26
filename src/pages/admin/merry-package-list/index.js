// src/pages/admin/merrypackagelist/index.js

import { CustomButton } from "@/components/CustomUi";
import { IoCubeSharp } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

function MerryPackageList() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white">
        <div className="flex flex-col items-center justify-center p-6">
          <h1 className="text-2xl font-bold text-utility-second">
            Merry<span className="text-primary-500">Match</span>
          </h1>
          <h2 className="text-xs leading-9 text-fourth-700">
            Admin panel Control
          </h2>
        </div>
        <nav>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center rounded-lg bg-gray-200 px-6 py-3 text-gray-700"
              >
                <IoCubeSharp className="text-2xl text-primary-200" />
                <span className="ml-3 font-extrabold">Merry Package</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center rounded-lg px-6 py-3 text-gray-600 hover:bg-gray-100"
              >
                <IoIosWarning className="text-2xl text-primary-200" />
                <span className="ml-3 font-extrabold">Complaint</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="mt-80 flex items-center rounded-lg border-t border-gray-300 px-5 py-6 text-gray-600 hover:bg-gray-100"
              >
                <MdLogout className="text-2xl text-primary-200" />

                <span className="ml-3 font-extrabold">Log out</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="mb-6 flex items-center justify-between border-b border-gray-300 bg-white px-6 py-4">
          <div>
            <h2 className="text-2xl font-bold text-fourth-900">
              Merry Package
            </h2>
          </div>

          {/* Search Bar */}
          <div className="flex items-center space-x-4">
            <div className="flex w-full max-w-sm items-center rounded-lg border border-gray-300 bg-white px-4 py-2">
              <FaSearch className="text-lg text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="ml-3 w-full bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none"
              />
            </div>

            <CustomButton type="submit" buttonType="primary">
              + Add Package
            </CustomButton>
          </div>
        </header>

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
