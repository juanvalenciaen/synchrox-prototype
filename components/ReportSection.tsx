import { ChevronDown, Plus, MoreHorizontal } from 'lucide-react';
import { ReportCard } from './ReportCard';

interface Report {
  id: string;
  name: string;
  description: string;
  lastUpdated: string;
  color: string;
}

interface ReportSectionProps {
  id: string;
  title: string;
  description: string;
  totalCount: number;
  isExpanded: boolean;
  onToggle: () => void;
  reports: Report[];
  onReportClick: (report: Report) => void;
}

export function ReportSection({
  id,
  title,
  description,
  totalCount,
  isExpanded,
  onToggle,
  reports,
  onReportClick
}: ReportSectionProps) {
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
              {/* No badge for reports apps */}
            </div>
            {/* No description */}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log('Add new report');
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
            {reports.map((report) => (
              <ReportCard
                key={report.id}
                {...report}
                onClick={() => onReportClick(report)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}