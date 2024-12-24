'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function SessionDetails() {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('notes')
  const [notesData, setNotesData] = useState(null)
  const [formsData, setFormsData] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetchData(id)
  }, [id, activeTab, currentPage])

  const fetchData = async (ticketId) => {
    setLoading(true)
    try {
      const endpoint = activeTab === 'notes' 
        ? `https://helloteam-backend.vercel.app/api/session-notes/${ticketId}/notes?page=${currentPage}`
        : `https://helloteam-backend.vercel.app/api/session-forms/${ticketId}/forms?page=${currentPage}`
      
      const response = await fetch(endpoint)
      const data = await response.json()

      if (!response.ok) throw new Error(data.message)

      if (activeTab === 'notes') {
        setNotesData(data.docs)
      } else {
        setFormsData(data.docs)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleItemClick = (item) => {
    setSelectedItem(item)
  }

  const renderPagination = (data) => {
    if (!data) return null
    return (
      <div className="flex justify-center mt-4">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 mr-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {currentPage} of {data.totalPages}</span>
        <button 
          onClick={() => setCurrentPage(prev => prev + 1)}
          disabled={currentPage === data.totalPages}
          className="px-4 py-2 ml-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    )
  }

  const renderNotes = () => {
    if (loading) return renderSkeletonList()
    if (!notesData || notesData.notes.length === 0) return <p>No notes available.</p>
    return (
      <div>
        {notesData.notes.map((note, index) => (
          <div key={index} onClick={() => handleItemClick(note)} className="p-4 border-b cursor-pointer hover:bg-gray-100">
            <h3 className="font-bold">{note.title || 'Untitled Note'}</h3>
            <p>{note.content.substring(0, 100)}...</p>
          </div>
        ))}
        {renderPagination(notesData)}
      </div>
    )
  }

  const renderForms = () => {
    if (loading) return renderSkeletonList()
    if (!formsData || formsData.formData.length === 0) return <p>No forms available.</p>
    return (
      <div>
        {formsData.formData.map((form, index) => (
          <div key={index} onClick={() => handleItemClick(form)} className="p-4 border-b cursor-pointer hover:bg-gray-100">
            <h3 className="font-bold">{form.agent}</h3>
            <p>Session ID: {form.session_id}</p>
            <p>Created At: {new Date(form.createdAt).toLocaleString()}</p>
          </div>
        ))}
        {renderPagination(formsData)}
      </div>
    )
  }


  const renderDetails = () => {
    if (loading) return renderSkeletonDetails()
    if (!selectedItem) return <div className='flex justify-center text-center pt-2 pl-4'><p>Select an item to view details</p></div>
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Details</h2>
        {activeTab === 'notes' ? (
          <>
            <h3 className="font-bold">{selectedItem.title || 'Untitled Note'}</h3>
            <p>{selectedItem.content}</p>
          </>
        ) : (
          <>
            <h3 className="font-bold">{selectedItem.agent}</h3>
            <p>Session ID: {selectedItem.session_id}</p>
            <p>Created At: {new Date(selectedItem.createdAt).toLocaleString()}</p>
            <h4 className="font-bold mt-4">Form Data:</h4>
            <pre>{JSON.stringify(selectedItem.form_data, null, 2)}</pre>
          </>
        )}
      </div>
    )
  }

  const renderSkeletonList = () => {
    return (
      <div>
        {[...Array(5)].map((_, index) => (
          <div key={index} className="p-4 border-b">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  const renderSkeletonDetails = () => {
    return (
      <div className="p-4">
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div className="h-20 bg-gray-200 rounded w-full mt-4"></div>
      </div>
    )
  }

  if (error) return <div className="text-red-500 p-8">{error}</div>

  return (
    <div className="flex h-screen">
      <div className="w-3/4 h-full overflow-auto">
        <div className="flex pb-10">
          <button
            type="button"
            className={`flex-1 py-4 px-6 text-center font-bold ${
              activeTab === "notes"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setActiveTab("notes")}
          >
            Session Notes
          </button>
          <button
            type="button"
            className={`flex-1 py-4 px-6 text-center font-bold ${
              activeTab === "forms"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setActiveTab("forms")}
          >
            Session Forms
          </button>
        </div>
        <div className="p-8">
          {activeTab === 'notes' ? renderNotes() : renderForms()}
        </div>
      </div>
      <div className="w-1/4 border-l">
        {renderDetails()}
      </div>
    </div>
  )
}

