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

interface ProcessReport {
  id: string;
  name: string;
  description: string;
  color: string;
}

interface ProcessReportsViewProps {
  processName: string;
  onBack: () => void;
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

export function ProcessReportsView({ processName, onBack }: ProcessReportsViewProps) {
  // Sample reports for each process group (same reports for all groups for simplicity)
  const processReports: ProcessReport[] = [
    {
      id: 'reporte-pagos-mensuales',
      name: 'Resumen Mensual de Pagos',
      description: 'Análisis detallado de pagos procesados en el mes',
      color: '#8b5cf6'
    },
    {
      id: 'reporte-tiempos-proceso',
      name: 'Análisis de Tiempos de Proceso',
      description: 'Evaluación de duración y cuellos de botella en el proceso',
      color: '#8b5cf6'
    }
  ];

  const handleReportClick = (report: ProcessReport) => {
    console.log('Opening process report:', report.name);
    // Here you would implement the report opening logic
  };

  return (
    <main className="flex-1 overflow-auto">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-2">Reportes</h1>
          <p className="text-muted-foreground">Reportes específicos para {processName}</p>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {processReports.map((report) => {
            const ReportIcon = getReportIcon(report.name);
            const purpleColor = '#8b5cf6';
            
            return (
              <div 
                key={report.id}
                onClick={() => handleReportClick(report)}
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
                        {report.name}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {report.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}