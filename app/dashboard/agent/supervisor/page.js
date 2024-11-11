//agent supervise
"use client";

import { Bell, ChevronDown, Menu, Search } from "lucide-react";
import SupervisorTable from "@/components/tables/SupervisorTable";
export default function Component() {
  const supervisors = [
    {
      id: 1,
      name: "John snow",
      email: "Supervisor09@gmail.com",
      role: "Supervisor",
      date: "12 Oct 2024 03:13",
      tickets: ["2023 CS123", "2023 CS123", "2023 CS123"],
    },
    {
      id: 2,
      name: "John snow",
      email: "Supervisor09@gmail.com",
      role: "Supervisor",
      date: "12 Oct 2024 03:13",
      tickets: ["2023 CS123", "2023 CS123", "2023 CS123"],
    },
    {
      id: 3,
      name: "John snow",
      email: "Supervisor09@gmail.com",
      role: "Supervisor",
      date: "12 Oct 2024 03:13",
      tickets: ["2023 CS123", "2023 CS123", "2023 CS123"],
    },
    {
      id: 4,
      name: "John snow",
      email: "Supervisor09@gmail.com",
      role: "Supervisor",
      date: "12 Oct 2024 03:13",
      tickets: ["2023 CS123", "2023 CS123", "2023 CS123"],
    },
    {
      id: 5,
      name: "John snow",
      email: "Supervisor09@gmail.com",
      role: "Supervisor",
      date: "12 Oct 2024 03:13",
      tickets: ["2023 CS123", "2023 CS123", "2023 CS123"],
    },
    {
      id: 6,
      name: "John snow",
      email: "Supervisor09@gmail.com",
      role: "Supervisor",
      date: "12 Oct 2024 03:13",
      tickets: ["2023 CS123", "2023 CS123", "2023 CS123"],
    },
  ];

  return (
    <main className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Supervisors</h2>
      </div>
      <div className="rounded-lg border bg-white shadow-sm p-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for ticket"
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
        </div>
        <SupervisorTable supervisors={supervisors} />
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        <button className="px-4 py-2 border rounded text-gray-500">
          Previous
        </button>
        <button className="px-4 py-2 bg-orange-500 text-white rounded">
          1
        </button>
        <button className="px-4 py-2 border rounded text-gray-500">2</button>
        <button className="px-4 py-2 border rounded text-gray-500">Next</button>
      </div>
    </main>
  );
}
