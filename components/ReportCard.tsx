import { 
  BarChart3, 
  TrendingUp, 
  Calculator, 
  Users, 
  FileText, 
  Clock,
  PieChart,
  Activity
} from 'lucide-react';

interface ReportCardProps {
  id: string;
  name: string;
  description: string;
  lastUpdated: string;
  color: string;
  onClick: () => void;
}

// Function to get report icon based on report name
const getReportIcon = (reportName: string) => {
  const name = reportName.toLowerCase();
  if (name.includes('mensual') || name.includes('análisis') || name.includes('analisis')) return BarChart3;
  if (name.includes('pendientes') || name.includes('activos')) return FileText;
  if (name.includes('presupuestal') || name.includes('presupuesto')) return Calculator;
  if (name.includes('evaluación') || name.includes('evaluacion') || name.includes('desempeño')) return TrendingUp;
  if (name.includes('contratistas') || name.includes('personal')) return Users;
  if (name.includes('tiempo') || name.includes('ausentismo')) return Clock;
  if (name.includes('nómina') || name.includes('nomina')) return PieChart;
  return Activity; // Default icon
};

export function ReportCard({ id, name, description, lastUpdated, color, onClick }: ReportCardProps) {
  const ReportIcon = getReportIcon(name);
  const purpleColor = '#8b5cf6'; // Use consistent purple color

  return (
    <div 
      onClick={onClick}
      className="group bg-card border border-border rounded-lg p-6 hover:shadow-medium hover:border-border/80 transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${purpleColor}15` }}
        >
          <ReportIcon 
            className="w-6 h-6" 
            style={{ color: purpleColor }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="mb-2">
            <h3 className="font-medium text-foreground group-hover:text-purple-600 transition-colors truncate">
              {name}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
          {/* Removed the "actualizado hace..." part */}
        </div>
      </div>
    </div>
  );
}