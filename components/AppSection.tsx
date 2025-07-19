import { ChevronDown, Plus, MoreHorizontal } from 'lucide-react';
import { ProcessCard } from './ProcessCard';

interface Process {
  id: string;
  name: string;
  description: string;
  count: number;
  color: string;
}

interface AppSectionProps {
  id: string;
  title: string;
  description: string;
  totalCount: number;
  isExpanded: boolean;
  onToggle: () => void;
  processes: Process[];
  onProcessClick: (process: Process) => void;
  onAddNewProcess?: () => void; // Add callback for + button
}

export function AppSection({
  id,
  title,
  description,
  totalCount,
  isExpanded,
  onToggle,
  processes,
  onProcessClick,
  onAddNewProcess
}: AppSectionProps) {
  return (
    <div className={`border border-border transition-all duration-300 ${
      isExpanded 
        ? 'rounded-lg shadow-soft border-border/80 mb-6' 
        : 'rounded-lg hover:shadow-soft hover:border-border/80 mb-1'
    }`}>
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-accent/30 transition-colors rounded-lg"
      >
        <div className="flex items-center gap-4">
          <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`} />
          <div className="text-left">
            <div className="flex items-center gap-3">
              <h2 className="font-medium text-foreground">{title}</h2>
              {!isExpanded && totalCount > 0 && (
                <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                  {totalCount}
                </span>
              )}
            </div>
            {/* No description */}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddNewProcess?.();
            }}
            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-smooth"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log('More options');
            }}
            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-smooth"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </button>

      {isExpanded && (
        <div className="px-6 pb-6">
          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {processes.map((process) => (
              <ProcessCard
                key={process.id}
                {...process}
                onClick={() => onProcessClick(process)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}