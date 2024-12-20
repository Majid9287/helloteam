"use client";

import { useState, useEffect } from "react";
import { Bell, ChevronDown, Menu, Search, UserCircle, } from "lucide-react";
import SupervisorTable from "@/components/tables/SupervisorTable";
import { TokenService } from '@/lib/tokenService';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

export default function Component() {
  const token = TokenService.getAccessToken();
  const user = useSelector((state) => state.auth.user);
  const organizationId = user?.organizationId;

  const [supervisors, setSupervisors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    limit: 10
  });

  const fetchSupervisors = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://helloteam-backend.vercel.app/api/users/${organizationId}?role=agent&page=${page}&limit=${pagination.limit}&search=${searchQuery}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(response.data)
      setSupervisors(response.data.docs.users);
      setPagination({
        currentPage: response.data.docs.pagination.currentPage,
        totalPages: response.data.docs.pagination.totalPages,
        limit: pagination.limit
      });
    } catch (error) {
     // toast.error('Error fetching agents');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupervisors();
  }, [searchQuery]);

  const handlePageChange = (page) => {
    fetchSupervisors(page);
  };

  return (
    <main className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Agents</h2>
      </div>
      <div className="rounded-lg border bg-white shadow-sm p-6">
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search supervisors"
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <SupervisorTable 
            supervisors={supervisors.map(supervisor => ({
              ...supervisor,
              profilePicture: supervisor.profilePicture
            }))} 
          />
        )}
      </div>

      {!loading && (
        <div className="flex justify-center gap-2 mt-6">
          <button 
            className={`px-4 py-2 border rounded ${pagination.currentPage === 1 ? 'text-gray-300' : 'text-gray-500'}`}
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
          >
            Previous
          </button>
          
          {[...Array(pagination.totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`px-4 py-2 rounded ${
                pagination.currentPage === index + 1 
                  ? 'bg-orange-500 text-white' 
                  : 'border text-gray-500'
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          
          <button 
            className={`px-4 py-2 border rounded ${
              pagination.currentPage === pagination.totalPages 
                ? 'text-gray-300' 
                : 'text-gray-500'
            }`}
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}