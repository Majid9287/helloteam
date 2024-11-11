
//create tickent
'use client'

import { useState } from 'react'
import { Bell, ChevronDown, Menu, Search } from 'lucide-react'

export default function Component() {
  const [activeTab, setActiveTab] = useState('all')
  
  return (
    <>

        {/* Main Area */}
        <main className="p-8 flex gap-8">
          {/* Tickets List */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Tickets</h2>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <span>New Ticket</span>
              </button>
            </div>

            {/* Filters */}
            <div className="flex gap-4 mb-6">
              <div className="relative">
                <select className="appearance-none bg-white border rounded-lg px-4 py-2 pr-10 text-gray-700">
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>This Year</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
              </div>
              <div className="relative">
                <select className="appearance-none bg-white border rounded-lg px-4 py-2 pr-10 text-gray-700">
                  <option>Select Priority</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
              </div>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for ticket"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b mb-6">
              <button
                onClick={() => setActiveTab('all')}
                className={`pb-4 px-2 ${activeTab === 'all' ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-500'}`}
              >
                All Tickets
              </button>
              <button
                onClick={() => setActiveTab('ongoing')}
                className={`pb-4 px-2 ${activeTab === 'ongoing' ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-500'}`}
              >
                On-Going Tickets
              </button>
              <button
                onClick={() => setActiveTab('resolved')}
                className={`pb-4 px-2 ${activeTab === 'resolved' ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-500'}`}
              >
                Resolved Tickets (7)
              </button>
            </div>

            {/* Tickets */}
            <div className="space-y-4">
              {[1, 2, 3].map((ticket) => (
                <div key={ticket} className="bg-white p-6 rounded-lg border">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      <span className="text-gray-500">Ticket# 2023-CS123</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src="/placeholder.svg?height=32&width=32" alt="User" className="h-8 w-8 rounded-full" />
                      <span className="text-gray-700">John Snow</span>
                    </div>
                  </div>
                  <h3 className="font-medium mb-2">How to deposit money to my portal?</h3>
                  <p className="text-gray-500 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Posted at 12:45 AM</span>
                    <button className="text-orange-500 hover:text-orange-600">Open Ticket</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-6">
              <button className="px-4 py-2 border rounded text-gray-500">Previous</button>
              <button className="px-4 py-2 bg-orange-500 text-white rounded">1</button>
              <button className="px-4 py-2 border rounded text-gray-500">2</button>
              <button className="px-4 py-2 border rounded text-gray-500">Next</button>
            </div>
          </div>

          {/* Create Ticket Form */}
          <div className="w-96 bg-white p-6 rounded-lg border h-fit">
            <h3 className="text-lg font-semibold mb-2">Create Quick Ticket</h3>
            <p className="text-gray-500 text-sm mb-6">Write and address new queries and issues</p>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Email</label>
                <input
                  type="email"
                  placeholder="Type Email"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Request Ticket Type</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-white border rounded-lg px-4 py-2 pr-10">
                    <option>Choose Type</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority Status</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-white border rounded-lg px-4 py-2 pr-10">
                    <option>Select Status</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Body</label>
                <textarea
                  placeholder="Type ticket issue here.."
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg resize-none"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
              >
                Submit
              </button>
            </form>
          </div>
        </main>
    </>
  )
}