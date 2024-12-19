"use client"

import { Bell, ChevronDown, LayoutDashboard, Menu, Ticket, Users } from "lucide-react"
import { useState } from "react"
import { TokenService } from '@/lib/tokenService'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'

export default function Component() {
  const token = TokenService.getAccessToken();
  const user = useSelector((state) => state.auth.user);
  const organizationId = user?.organizationId;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'supervisor'
  });
  const [loading, setLoading] = useState(false);
  const [showUserTypeDropdown, setShowUserTypeDropdown] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `https://helloteam-backend.vercel.app/api/users/${organizationId}/create`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      toast.success('User created successfully!');
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'agent'
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating user');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold">Create User</h1>
      </div>
      <div className="rounded-lg border bg-white shadow-sm p-6 pb-20">
        <div className="p-6 rounded-sm bg-gray-50">
          <h2 className="text-lg font-semibold mb-6">Create New User</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Password</label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter password"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">User Type</label>
                <div className="relative">
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="supervisor">Supervisor</option>
                    <option value="agent">Agent</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create User'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}