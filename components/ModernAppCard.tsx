import { MoreVertical, Star, ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { useState } from 'react';

interface AppCardProps {
  title: string;
  description: string;
  processCount: number;
  isExpanded?: boolean;
  onToggle?: () => void;
  isCollapsible?: boolean;
  processes?: Array<{
    id: string;
    name: string;
    description: string;
    count: number;
  }>;
}

export function ModernAppCard({ 
  title, 
  description, 
  processCount, 
  isExpanded = false, 
  onToggle,
  isCollapsible = false,
  processes = []
}: AppCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Card Header */}
      <div 
        className={`p-6 ${isCollapsible ? 'cursor-pointer' : ''}`}
        onClick={isCollapsible ? onToggle : undefined}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {isCollapsible && (
              <div className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
              <p className="text-sm text-gray-600 mb-3">{description}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Grupo de procesos</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="text-xs text-gray-500">Descripción</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {processCount > 0 && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                {processCount}
              </span>
            )}
            <button className={`p-1 rounded-lg transition-colors ${
              isHovered ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-400'
            }`}>
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && processes.length > 0 && (
        <div className="border-t border-gray-100 bg-gray-50">
          <div className="p-4 space-y-3">
            {processes.map((process) => (
              <div 
                key={process.id}
                className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{process.name}</h4>
                    <p className="text-sm text-gray-600">{process.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {process.count > 0 && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        {process.count}
                      </span>
                    )}
                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}