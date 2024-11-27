import { AdminSideBar } from "@/components/admin/AdminSideBar";
import AdminHeader from "@/components/admin/AdminHeader";
import { useState } from "react";
import DeleteConfirmationModal from "@/components/admin/DeleteConfirmationModal";

function MerryPackageAdd() {
  const [details, setDetails] = useState([{ id: 1, text: "" }]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailToDelete, setDetailToDelete] = useState(null);
  console.log(details);

  const addDetail = () => {
    setDetails([...details, { id: details.length + 1, text: "" }]);
  };

  const confirmDelete = (id) => {
    setDetailToDelete(id);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    setDetails(details.filter((detail) => detail.id !== detailToDelete));
    setIsModalOpen(false);
    setDetailToDelete(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDetailToDelete(null);
  };

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
                    onChange={(e) => updateDetail(detail.id, e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />

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
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this detail?"
        confirmLabel="Yes, I want to delete"
        cancelLabel="No, I don't want"
      />
    </div>
  );
}

export default MerryPackageAdd;
