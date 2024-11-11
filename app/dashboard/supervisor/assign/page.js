//ticket detaoil
'use client'

import { Bell, ChevronDown, Menu } from 'lucide-react'

export default function Component() {
  return (
   
     
        <main className="p-8 max-w-5xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Tickets</h2>
          </div>

          {/* Ticket Details */}
          <div className="bg-white rounded-lg border p-6 mb-6">
            <div className="flex items-center gap-2 text-gray-500 mb-4">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>Ticket# 2023-CS123</span>
              <span className="ml-auto">Posted at 12:45 AM</span>
            </div>

            <h3 className="text-xl font-medium mb-4">How to deposit money to my portal?</h3>

            <div className="space-y-4 text-gray-600">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            {/* Reply Form */}
          <div className="bg-gray-50 rounded-lg border p-6 mt-6 ">
            <h3 className="text-lg font-medium mb-6">Reply to Ticket</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Email
                  </label>
                  <input
                    type="email"
                    defaultValue="xsasyd@gmail.com"
                    className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Request Ticket Type
                  </label>
                  <div className="relative">
                    <select className="w-full appearance-none bg-white border rounded-lg px-4 py-2 pr-10">
                      <option>Deposit Issue</option>
                      <option>Withdrawal Issue</option>
                      <option>Account Issue</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <div className="relative">
                    <select className="w-full appearance-none bg-white border rounded-lg px-4 py-2 pr-10">
                      <option>On-Going</option>
                      <option>Resolved</option>
                      <option>Pending</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ticket Body
                </label>
                <textarea
                  rows={6}
                  placeholder="Type ticket issue here.."
                  className="w-full px-4 py-2 border rounded-lg resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
                >
                  Assigned Ticket
                </button>
              </div>
            </form>
          </div>
          </div>

          
        </main>
    
  )
}