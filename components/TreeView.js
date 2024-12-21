export default function TreeView({ tree, onNodeSelect, selectedNode }) {
  if (!tree) return null

  const renderNode = (node) => {
    const hasChildren = node.children && node.children.length > 0
    const isSelected = selectedNode?.node_id === node.node_id

    return (
      <div key={node.node_id} className="node-container">
        <div 
          className={`node-box ${isSelected ? 'selected' : ''}`}
          onClick={() => onNodeSelect(node)}
        >
          <div className="flex items-center gap-2">
            <div className="node-id">{node.node_id.toString().padStart(2, '0')}</div>
            <span className="node-title">{node.page_title || 'Untitled'}</span>
          </div>
        </div>
        {hasChildren && (
          <div className="children-container">
            {node.children.map((child) => renderNode(child))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="tree-view">
      {renderNode(tree)}
    </div>
  )
}

