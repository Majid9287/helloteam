"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { TokenService } from '@/lib/tokenService';

const scrollbarStyles = `
  /* Webkit browsers like Chrome, Safari */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }

  /* Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: #c1c1c1 #f1f1f1;
  }
`;

export default function SessionDetails() {
  const { id } = useParams();
  const token = TokenService.getAccessToken();
  const [activeTab, setActiveTab] = useState("notes");
  const [notesData, setNotesData] = useState(null);
  const [formsData, setFormsData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData(id);
  }, [id, activeTab, currentPage]);

  const fetchData = async (ticketId) => {
    setLoading(true);
    try {
      const endpoint =
        activeTab === "notes"
          ? `https://helloteam-backend.onrender.com/api/session-notes/${ticketId}/notes?page=${currentPage}`
          : `https://helloteam-backend.onrender.com/api/session-forms/${ticketId}/forms?page=${currentPage}`;

      const response = await fetch(endpoint);
      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      if (activeTab === "notes") {
        setNotesData(data.docs);
      } else {
        setFormsData(data.docs);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const renderPagination = (data) => {
    if (!data) return null;
    return (
      <div className="flex justify-center items-center mt-6 mb-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 mr-2 bg-orange-600 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 hover:bg-blue-700"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {data.totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, data.totalPages))
          }
          disabled={currentPage === data.totalPages}
          className="px-4 py-2 ml-2 bg-orange-600 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    );
  };

  const renderNotes = () => {
    if (loading) return renderSkeletonList();
    if (!notesData || notesData.notes.length === 0)
      return (
        <p className="text-center text-gray-500 mt-4">No notes available.</p>
      );
    return (
      <div>
        {notesData.notes.map((note, index) => (
          <div
            key={index}
            onClick={() => handleItemClick(note)}
            className={`p-2 border-b border-gray-200 cursor-pointer transition-colors duration-200 ${
              selectedItem && selectedItem._id === note._id
                ? "bg-blue-50"
                : "hover:bg-gray-50"
            }`}
          >
            <h3 className="font-semibold text-lg text-gray-800">
              {note?.notes || "Untitled Note"}
            </h3>
            <p className="text-gray-600 mt-1">
             By: {note?.created_by?.name||note?.agent||"Unknown"}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Created: {new Date(note?.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
        {renderPagination(notesData)}
      </div>
    );
  };

  const renderForms = () => {
    if (loading) return renderSkeletonList();
    if (!formsData || formsData.formData.length === 0)
      return (
        <p className="text-center text-gray-500 mt-4">No forms available.</p>
      );
    return (
      <div>
        {formsData.formData.map((form, index) => (
          <div
            key={index}
            onClick={() => handleItemClick(form)}
            className={`p-2 border-b border-gray-200 cursor-pointer transition-colors duration-200 ${
              selectedItem && selectedItem._id === form._id
                ? "bg-blue-50"
                : "hover:bg-gray-50"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {form.agent}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Session ID: {form.session_id}
                </p>
                {form.form_data.Client_name && (
                  <p className="text-sm text-gray-600 mt-1">
                    Client: {form.form_data.Client_name}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {new Date(form.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Duration: {form.duration_seconds}s
                </p>
              </div>
            </div>
          </div>
        ))}
        {renderPagination(formsData)}
      </div>
    );
  };

  const renderFormDataField = (key, value) => {
    if (key === "op") return null;

    const formattedKey = key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return (
      <div key={key} className="mb-2">
        <label className="block text-sm font-medium text-gray-700 ">
          {formattedKey}
        </label>
        <div className="p-1 bg-gray-50 rounded-md border border-gray-200 text-gray-800">
          {typeof value === "string" ? value : JSON.stringify(value, null, 2)}
        </div>
      </div>
    );
  };

  const renderDetails = () => {
    if (loading) return renderSkeletonDetails();
    if (!selectedItem)
      return (
        <div className="flex justify-center items-center h-full text-gray-500">
          Select an item to view details
        </div>
      );

    return (
      <div className="p-4 bg-white  shadow-sm h-screen overflow-auto">
        {activeTab === "notes" ? (
          <>
            <div className="mb-2 pb-2 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {selectedItem.agent || selectedItem?.created_by?.name || "Details"}
              </h2>
              <div className="text-sm text-gray-600">
                {selectedItem.session_id && (
                  <p>Session ID: {selectedItem.session_id}</p>
                )}
                <p>
                  Created: {new Date(selectedItem.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
              {selectedItem.notes}
              </h3>
              {/* <p className="text-gray-700 whitespace-pre-wrap">
                {selectedItem.notes}
              </p> */}
            </div>
          </>
        ) : (
          <>
            <div className="mb-2 pb-2 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {selectedItem.agent || selectedItem.title || "Details"}
              </h2>
              <div className="text-sm text-gray-600">
                {selectedItem.session_id && (
                  <p>Session ID: {selectedItem.session_id}</p>
                )}
                <p>
                  Created: {new Date(selectedItem.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  Session Information
                </h3>
                <div className="grid grid-cols-2 gap-1 text-sm">
                  <div>
                    <span className="text-gray-600">Duration:</span>
                    <span className="ml-2 text-gray-800">
                      {selectedItem.duration_seconds}s
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Resolution:</span>
                    <span className="ml-2 text-gray-800">
                      {selectedItem.resolution_state}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Score:</span>
                    <span className="ml-2 text-gray-800">
                      {selectedItem.total_score}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Source:</span>
                    <span className="ml-2 text-gray-800">
                      {selectedItem.source}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 ">
                  Form Data
                </h3>
                <div className="space-y-4">
                  {Object.entries(selectedItem.form_data || {}).map(
                    ([key, value]) => renderFormDataField(key, value)
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const renderSkeletonList = () => {
    return (
      <div className="animate-pulse">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="p-4 border-b border-gray-200">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  };

  const renderSkeletonDetails = () => {
    return (
      <div className="p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
    );
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNoteTitle("");
    setNoteContent("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `https://helloteam-backend.onrender.com/api/session-notes`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",

          },
          body: JSON.stringify({ ticket_id:id, notes:noteContent }),
        }
      );
      if (!response.ok) throw new Error("Failed to add note");
      closeModal();
      fetchData(id);
    } catch (error) {
      console.error("Error adding note:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) return <div className="text-red-500 p-8 text-center">{error}</div>;

  return (
    <>
      <style jsx global>
        {scrollbarStyles}
      </style>
      <div className="flex h-screen bg-gray-100">
        <div className="w-3/4 h-full overflow-auto bg-white shadow-md">
          <div className="flex border-b border-gray-200">
            <button
              type="button"
              className={`flex-1 py-4 px-6 text-center font-semibold text-sm transition-colors duration-200 ${
                activeTab === "notes"
                  ? "bg-orange-400 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("notes")}
            >
              Session Notes
            </button>
            <button
              type="button"
              className={`flex-1 py-4 px-6 text-center font-semibold text-sm transition-colors duration-200 ${
                activeTab === "forms"
                  ? "bg-orange-400 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("forms")}
            >
              Session Forms
            </button>
          </div>
          {activeTab === "notes" && (
            <div className="p-4 bg-gray-100 border-b border-gray-200">
              <button
                onClick={openModal}
                className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors duration-200 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add Note
              </button>
            </div>
          )}
          <div className="py-4">
            {activeTab === "notes" ? renderNotes() : renderForms()}
          </div>
        </div>
        <div className="w-1/4 h-full overflow-auto bg-gray-50 border-l border-gray-200">
          {renderDetails()}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Add New Note</h2>
            <form onSubmit={handleSubmit}>
              {/*  */}
              <div className="mb-4">
                <label
                  htmlFor="noteContent"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Note Content
                </label>
                <textarea
                  id="noteContent"
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Enter note content"
                  className="w-full p-2 border border-gray-300 rounded-md h-32 focus:ring-orange-500 focus:border-orange-500"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 mr-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
