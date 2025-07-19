import { useState } from 'react';
import { ReportSection } from './ReportSection';

interface Report {
  id: string;
  name: string;
  description: string;
  lastUpdated: string;
  color: string;
}

interface ReportsViewProps {
  onBack: () => void;
}

export function ReportsView({ onBack }: ReportsViewProps) {
  const [expandedApp, setExpandedApp] = useState<string | null>('gestion-pagos');

  const applications = [
    {
      id: 'gestion-pagos',
      title: 'Gestión de Pagos',
      description: 'Reportes de pagos y contratistas',
      reports: [
        {
          id: 'reporte-pagos-mensuales',
          name: 'Pagos Mensuales',
          description: 'Resumen de pagos realizados en el mes',
          lastUpdated: 'Hace 2 horas',
          color: '#8b5cf6'
        },
        {
          id: 'reporte-pagos-pendientes',
          name: 'Pagos Pendientes',
          description: 'Lista de pagos por procesar',
          lastUpdated: 'Hace 1 día',
          color: '#8b5cf6'
        },
        {
          id: 'reporte-presupuesto',
          name: 'Análisis Presupuestal',
          description: 'Estado de ejecución presupuestal',
          lastUpdated: 'Hace 3 horas',
          color: '#8b5cf6'
        }
      ]
    },
    {
      id: 'contratacion',
      title: 'Contratación',
      description: 'Reportes de procesos de contratación',
      reports: [
        {
          id: 'reporte-contratistas',
          name: 'Evaluación de Contratistas',
          description: 'Desempeño y calificaciones de contratistas',
          lastUpdated: 'Hace 4 horas',
          color: '#8b5cf6'
        },
        {
          id: 'reporte-contratos-activos',
          name: 'Contratos Activos',
          description: 'Estado de contratos vigentes',
          lastUpdated: 'Hace 6 horas',
          color: '#8b5cf6'
        },
        {
          id: 'reporte-tiempo-seleccion',
          name: 'Tiempos de Selección',
          description: 'Análisis de duración de procesos de selección',
          lastUpdated: 'Hace 1 día',
          color: '#8b5cf6'
        }
      ]
    },
    {
      id: 'recursos-humanos',
      title: 'Recursos Humanos',
      description: 'Reportes de personal y nómina',
      reports: [
        {
          id: 'reporte-nomina',
          name: 'Reporte de Nómina',
          description: 'Detalle de pagos de nómina mensual',
          lastUpdated: 'Hace 2 días',
          color: '#8b5cf6'
        },
        {
          id: 'reporte-desempeno',
          name: 'Evaluaciones de Desempeño',
          description: 'Resultados de evaluaciones del personal',
          lastUpdated: 'Hace 1 semana',
          color: '#8b5cf6'
        },
        {
          id: 'reporte-ausentismo',
          name: 'Análisis de Ausentismo',
          description: 'Estadísticas de asistencia del personal',
          lastUpdated: 'Hace 3 días',
          color: '#8b5cf6'
        }
      ]
    }
  ];

  const toggleApp = (appId: string) => {
    setExpandedApp(expandedApp === appId ? null : appId);
  };

  const getTotalReportCount = (appId: string) => {
    const app = applications.find(a => a.id === appId);
    return app ? app.reports.length : 0;
  };

  const handleReportClick = (report: Report) => {
    console.log('Opening report:', report.name);
    // Here you would implement the report opening logic
  };

  return (
    <main className="flex-1 overflow-auto">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-2">Reportes</h1>
          <p className="text-muted-foreground">Accede a informes y análisis de todos los procesos</p>
        </div>
        
        <div className="space-y-0">
          {applications.map((app) => {
            const totalCount = getTotalReportCount(app.id);
            return (
              <ReportSection
                key={app.id}
                id={app.id}
                title={app.title}
                description={app.description}
                totalCount={totalCount}
                isExpanded={expandedApp === app.id}
                onToggle={() => toggleApp(app.id)}
                reports={app.reports}
                onReportClick={handleReportClick}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}