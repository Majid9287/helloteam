'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import TreeView from '@/components/TreeView'
import NodeDetails from '@/components/NodeDetails'

export default function TicketDetail() {
  const { id } = useParams()
  const [ticketData, setTicketData] = useState(null)
  const [selectedNode, setSelectedNode] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTicketData(id)
  }, [id])

  const fetchTicketData = async (ticketId) => {
    try {
      const response = await fetch(`https://helloteam-backend.vercel.app/api/tickets/${ticketId}`)
      const data = await response.json()
      
    //   if (!response.ok) throw new Error(data.message)
      
      setTicketData(data.docs)
      if (data.docs.tree) {
        setSelectedNode(data.docs.tree)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="flex justify-center p-8">Loading...</div>
  if (error) return <div className="text-red-500 p-8">{error}</div>
  if (!ticketData) return <div className="p-8">No ticket data found</div>

  return (
    <div className="flex h-screen">
      <div className="w-3/4 h-full overflow-auto">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-semibold">Nodes</h1>
        </div>
        <div className="p-8">
          <TreeView 
            tree={ticketData.tree} 
            onNodeSelect={setSelectedNode}
            selectedNode={selectedNode}
          />
        </div>
      </div>
      <div className="w-1/4 border-l">
        {selectedNode && <NodeDetails node={selectedNode} />}
      </div>
    </div>
  )
}

