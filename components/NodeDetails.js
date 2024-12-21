export default function NodeDetails({ node }) {
  if (!node) return null

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">{node.page_title}</h2>
      
      {node.question && (
        <div className="mb-6">
          <h3 className="font-medium mb-2">Question</h3>
          <p className="text-gray-600">{node.question}</p>
        </div>
      )}

      {node.content && (
        <div className="mb-6">
          <h3 className="font-medium mb-2">Content</h3>
          <div 
            className="text-gray-600"
            dangerouslySetInnerHTML={{ __html: node.content }}
          />
        </div>
      )}

      {node.buttons && node.buttons.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium mb-2">Connected Nodes</h3>
          <div className="space-y-2">
            {node.buttons.map((button, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded border"
              >
                <span>{button.button_text.replace(/\.btn-[^\s]+\s*/g, '')}</span>
                {button.button_link && (
                  <span className="text-sm text-gray-500">
                    → Node {button.button_link}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

