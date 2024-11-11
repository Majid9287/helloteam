"use client"

import { Bell, ChevronDown, LayoutDashboard, Menu, Ticket, Users } from "lucide-react"
import Link from "next/link"
import * as React from "react"

export default function Component() {
  const [userType, setUserType] = React.useState("Supervisor")
  const [showUserTypeDropdown, setShowUserTypeDropdown] = React.useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">Create User</h1>
          </div>
          <div className="rounded-lg border bg-white shadow-sm p-6 pb-20">
            <div className="p-6 rounded-sm bg-gray-50 ">
              <h2 className="text-lg font-semibold mb-6">Create New User</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Name
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Johnson"
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Email
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="xcvbn@gmail.com"
                      type="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Password
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="123456789"
                      type="password"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Official Email
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="cvbnm@gmail.com"
                      type="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">User Type</label>
                    <div className="relative">
                      <button
                        type="button"
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        onClick={() => setShowUserTypeDropdown(!showUserTypeDropdown)}
                      >
                        {userType}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </button>
                      {showUserTypeDropdown && (
                        <div className="absolute mt-2 w-full rounded-md border bg-white shadow-lg">
                          <div className="py-1">
                            {["Supervisor", "Agent", "Client"].map((type) => (
                              <button
                                key={type}
                                type="button"
                                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                onClick={() => {
                                  setUserType(type)
                                  setShowUserTypeDropdown(false)
                                }}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      User ID
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="10"
                      type="text"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                    type="submit"
                  >
                    Create User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      
  )
}


