'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = {
  admin: [
    { icon: '⊞', label: 'Dashboard', href: '/dashboard/admin/' },
    { icon: '👥', label: 'Users', href: '/dashboard/admin' },
    { icon: '⚙️', label: 'Create User', href: '/dashboard/admin/create' },
    
    { icon: '🎫', label: 'Tickets', href: '/dashboard/admin/ticket' },
  ],
  supervisor: [
    { icon: '⊞', label: 'Dashboard', href: '/dashboard/supervisor/' },
    { icon: '👥', label: 'Agents', href: '/dashboard/supervisor/agent' },
    { icon: '🎫', label: 'Tickets ', href: '/dashboard/supervisor/ticket' },
    { icon: '🎫', label: 'Tickets Details ', href: '/dashboard/supervisor/assign' },
  ],
  client: [
    { icon: '⊞', label: 'Dashboard', href: '/dashboard/client/ticket' },
    { icon: '👥', label: 'Agents', href: '/dashboard/client/agent' },
    { icon: '👥', label: 'Supervisors', href: '/dashboard/client/supervisor' },
    { icon: '🎫', label: 'Tickets', href: '/dashboard/client/ticket' },
  ],
  agent: [
    { icon: '⊞', label: 'Dashboard', href: '/dashboard/agent' },
    { icon: '🎫', label: 'Create Tickets', href: '/dashboard/agent/create' },
    { icon: '👥', label: 'Supervisor', href: '/dashboard/agent/supervisor' },
    { icon: '🎫', label: 'Tickets Reply', href: '/dashboard/agent/reply' },
  ],
}

export default function Sidebar({ role = 'admin' }) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside className={`bg-white border-r transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex flex-col h-screen">
        <div className="h-16 flex items-center justify-between px-4 border-b my-4">
          {!isCollapsed && (
            <Image src="/image 3.png" alt="The Hello Team" width={120} height={40} />
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-md hover:bg-gray-100"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? '➡️' : '⬅️'}
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul className="py-4">
            {menuItems[role].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-2 text-sm ${
                    pathname === item.href
                      ? 'text-orange-500 bg-orange-50'
                      : 'text-gray-600 hover:bg-orange-50 hover:text-orange-500'
                  } rounded-lg transition-colors duration-150 ease-in-out`}
                >
                  <span className="grid place-items-center w-5 h-5 mr-3">{item.icon}</span>
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t">
          <Link
            href="/logout"
            className="flex items-center px-4 py-2 text-sm text-gray-600 rounded-md hover:bg-orange-50 hover:text-orange-500 transition-colors duration-150 ease-in-out"
          >
            <span className="grid place-items-center w-5 h-5 mr-3">🚪</span>
            {!isCollapsed && <span>Logout</span>}
          </Link>
        </div>
      </div>
    </aside>
  )
}