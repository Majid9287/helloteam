"use client"

import { Bell, ChevronDown, LayoutDashboard, Menu, Search, Ticket, Users } from 'lucide-react'
import * as React from "react"

export default function TicketPageSkeleton() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold">Tickets</h1>
      </div>
      
      <div className="rounded-lg border bg-white shadow-sm p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex w-full items-center gap-4 md:w-[300px]">
            <Search className="h-4 w-4 text-gray-400" />
            <div className="h-9 w-full bg-gray-200 rounded-md animate-pulse"></div>
          </div>
          <div className="flex gap-4">
            <div className="h-9 w-32 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-9 w-32 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-9 w-28 bg-orange-200 rounded-md animate-pulse"></div>
          </div>
        </div>
        <div className="border-b mt-6">
          <div className="flex">
            {["All Tickets", "New", "On-Going", "Resolved"].map((tab, index) => (
              <div key={tab} className="flex items-center gap-2 px-4 py-2">
                <div className={`h-5 w-20 ${index === 0 ? 'bg-orange-200' : 'bg-gray-200'} rounded-md animate-pulse`}></div>
                <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="divide-y">
          {[...Array(5)].map((_, index) => (
            <TicketCardSkeleton key={index} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-end gap-2">
        <div className="h-8 w-20 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-8 w-8 bg-orange-200 rounded-md animate-pulse"></div>
        <div className="h-8 w-8 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-8 w-20 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
    </main>
  )
}

function TicketCardSkeleton() {
  return (
    <div className="border rounded-lg p-6 space-y-4 my-2">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gray-200"></div>
          <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
        <div className="h-4 w-32 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
      
      <div className="space-y-2">
        <div className="h-5 w-3/4 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-4 w-2/3 bg-gray-200 rounded-md animate-pulse"></div>
      </div>

      <hr className="border-gray-200" />

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="h-4 w-20 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
        <div className="h-4 w-24 bg-orange-200 rounded-md animate-pulse"></div>
      </div>
    </div>
  )
}