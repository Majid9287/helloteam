
export default function ActivityItem({ activity }) {
    return (
      <div className="flex items-start gap-3 py-3">
        <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
          <img 
            src={activity.avatar} 
            alt={activity.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-900">{activity.name} {activity.action}</p>
          <p className="text-xs text-gray-500">{activity.timestamp}</p>
        </div>
      </div>
    )
  }