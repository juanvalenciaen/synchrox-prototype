import { useState } from 'react';
import { ModernSidebar } from './ModernSidebar';
import { ModernHeader } from './ModernHeader';
import { AppSection } from './AppSection';
import { ReportSection } from './ReportSection';
import { ReportsView } from './ReportsView';
import { ProcessDetailView } from './ProcessDetailView';
import { ProcessConfigurationView } from './ProcessConfigurationView';
import { SearchResults } from './SearchResults';
import { AdvancedSearchModal } from './AdvancedSearchModal';

interface Process {
  id: string;
  name: string;
  description: string;
  count: number;
  color: string;
}

interface Report {
  id: string;
  name: string;
  description: string;
  lastUpdated: string;
  color: string;
}

export function ModernDashboard() {
  const [activeView, setActiveView] = useState('procesos');
  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null);
  const [showProcessConfiguration, setShowProcessConfiguration] = useState(false);
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'gestion-pagos': true,
    'contratacion': true,
    'recursos-humanos': false // Third app collapsed by default (no badge)
  });

  // Sample processes data
  const processesData: Record<string, Process[]> = {
    'gestion-pagos': [
      {
        id: 'procesos-pago',
        name: 'Procesos de Pago',
        description: 'Gestión de pagos a contratistas y proveedores',
        count: 12,
        color: '#3b82f6'
      },
      {
        id: 'validacion-presupuestal',
        name: 'Validación Presupuestal',
        description: 'Validación de disponibilidad presupuestal',
        count: 8,
        color: '#10b981'
      }
    ],
    'contratacion': [
      {
        id: 'seleccion-contratistas',
        name: 'Selección de Contratistas',
        description: 'Proceso de evaluación y selección',
        count: 5,
        color: '#f59e0b'
      },
      {
        id: 'evaluacion-propuestas',
        name: 'Evaluación de Propuestas',
        description: 'Análisis técnico y económico',
        count: 3,
        color: '#8b5cf6'
      }
    ],
    'recursos-humanos': [
      {
        id: 'evaluacion-desempeno',
        name: 'Evaluación de Desempeño',
        description: 'Proceso anual de evaluación',
        count: 15,
        color: '#ef4444'
      },
      {
        id: 'gestion-nomina',
        name: 'Gestión de Nómina',
        description: 'Procesamiento mensual de nómina',
        count: 7,
        color: '#06b6d4'
      }
    ]
  };

  // Sample reports data
  const reportsData: Record<string, Report[]> = {
    'gestion-pagos': [
      {
        id: 'reporte-pagos-mensuales',
        name: 'Resumen Mensual de Pagos',
        description: 'Análisis detallado de pagos procesados en el mes',
        lastUpdated: '2 horas',
        color: '#8b5cf6'
      },
      {
        id: 'reporte-pagos-pendientes',
        name: 'Pagos Pendientes',
        description: 'Lista de pagos en espera de aprobación',
        lastUpdated: '30 minutos',
        color: '#8b5cf6'
      }
    ],
    'contratacion': [
      {
        id: 'reporte-contratistas-activos',
        name: 'Contratistas Activos',
        description: 'Estado actual de todos los contratos',
        lastUpdated: '1 hora',
        color: '#8b5cf6'
      },
      {
        id: 'reporte-evaluacion-proveedores',
        name: 'Evaluación de Proveedores',
        description: 'Análisis de desempeño de proveedores',
        lastUpdated: '4 horas',
        color: '#8b5cf6'
      }
    ],
    'recursos-humanos': [
      {
        id: 'reporte-ausentismo',
        name: 'Análisis de Ausentismo',
        description: 'Patrones de ausencias del personal',
        lastUpdated: '6 horas',
        color: '#8b5cf6'
      },
      {
        id: 'reporte-nomina-detallada',
        name: 'Nómina Detallada',
        description: 'Desglose completo de la nómina mensual',
        lastUpdated: '1 día',
        color: '#8b5cf6'
      }
    ]
  };

  const appSections = [
    {
      id: 'gestion-pagos',
      title: 'Gestión de Pagos',
      description: 'Sistema integral para el manejo de pagos',
      totalCount: processesData['gestion-pagos']?.reduce((sum, p) => sum + p.count, 0) || 0
    },
    {
      id: 'contratacion',
      title: 'Contratación',
      description: 'Procesos de contratación y selección',
      totalCount: processesData['contratacion']?.reduce((sum, p) => sum + p.count, 0) || 0
    },
    {
      id: 'recursos-humanos',
      title: 'Recursos Humanos',
      description: 'Gestión integral del talento humano',
      totalCount: 0 // No badge for third app
    }
  ];

  const reportSections = [
    {
      id: 'gestion-pagos',
      title: 'Gestión de Pagos',
      description: 'Reportes de pagos y transacciones',
      totalCount: 0 // No count for reports
    },
    {
      id: 'contratacion',
      title: 'Contratación',
      description: 'Reportes de procesos de contratación',
      totalCount: 0 // No count for reports
    },
    {
      id: 'recursos-humanos',
      title: 'Recursos Humanos',
      description: 'Reportes de gestión de personal',
      totalCount: 0 // No count for reports
    }
  ];

  const handleSectionToggle = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleProcessClick = (process: Process) => {
    setSelectedProcess(process);
  };

  const handleAddNewProcess = () => {
    // Open configuration view with default values
    setShowProcessConfiguration(true);
  };

  const handleBackFromProcess = () => {
    setSelectedProcess(null);
    setSearchResults(null);
  };

  const handleBackFromConfiguration = () => {
    setShowProcessConfiguration(false);
  };

  const handleReportClick = (report: Report) => {
    console.log('Opening report:', report.name);
  };

  const handleNavigate = (view: string) => {
    setActiveView(view);
    setSelectedProcess(null);
    setShowProcessConfiguration(false);
    setSearchResults(null);
  };

  const handleGlobalSearch = (query: string) => {
    if (query.trim()) {
      console.log('Global search:', query);
    }
  };

  const handleAdvancedSearchOpen = () => {
    setIsAdvancedSearchOpen(true);
  };

  const handleAdvancedSearch = (searchData: any, isAdvanced: boolean) => {
    console.log('Advanced search:', searchData, isAdvanced);
    
    if (isAdvanced) {
      // Redirect to process detail view with filters
      const mockProcess = processesData['gestion-pagos'][0]; // Use first process as example
      setSelectedProcess(mockProcess);
      setSearchResults({ searchData, isAdvanced });
      setActiveView('procesos');
    } else {
      // Show search results
      setSearchResults({ searchData, isAdvanced });
      setActiveView('search-results');
    }
  };

  // Show process configuration view
  if (showProcessConfiguration) {
    return (
      <div className="min-h-screen bg-background flex">
        <ModernSidebar activeView={activeView} onNavigate={handleNavigate} />
        <div className="flex-1 flex flex-col min-w-0">
          <ProcessConfigurationView
            processName="Nuevo Proceso"
            applicationName="Gestión de Pagos"
            processColor="#3b82f6"
            onBack={handleBackFromConfiguration}
          />
        </div>
      </div>
    );
  }

  // Show process detail view
  if (selectedProcess) {
    return (
      <div className="min-h-screen bg-background flex">
        <ModernSidebar activeView={activeView} onNavigate={handleNavigate} />
        <div className="flex-1 flex flex-col min-w-0">
          <ProcessDetailView
            processName={selectedProcess.name}
            applicationName="Gestión de Pagos"
            processColor={selectedProcess.color}
            onBack={handleBackFromProcess}
            hasActiveFilters={searchResults?.isAdvanced || false}
            searchData={searchResults?.searchData}
          />
        </div>
      </div>
    );
  }

  // Show search results
  if (searchResults && activeView === 'search-results') {
    return (
      <div className="min-h-screen bg-background flex">
        <ModernSidebar activeView={activeView} onNavigate={handleNavigate} />
        <div className="flex-1 flex flex-col min-w-0">
          <ModernHeader 
            onSearch={handleGlobalSearch}
            onAdvancedSearch={handleAdvancedSearchOpen}
          />
          <SearchResults 
            searchData={searchResults.searchData}
            onBack={() => setSearchResults(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <ModernSidebar activeView={activeView} onNavigate={handleNavigate} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <ModernHeader 
          onSearch={handleGlobalSearch}
          onAdvancedSearch={handleAdvancedSearchOpen}
        />
        
        <main className="flex-1 overflow-auto">
          <div className="p-6 max-w-7xl mx-auto">
            {activeView === 'procesos' && (
              <>
                <div className="mb-8">
                  <h1 className="text-2xl font-semibold text-foreground mb-2">Procesos</h1>
                  <p className="text-muted-foreground">Gestiona y supervisa todos los procesos empresariales</p>
                </div>
                
                <div className="space-y-1">
                  {appSections.map((section) => (
                    <AppSection
                      key={section.id}
                      {...section}
                      isExpanded={expandedSections[section.id] || false}
                      onToggle={() => handleSectionToggle(section.id)}
                      processes={processesData[section.id] || []}
                      onProcessClick={handleProcessClick}
                      onAddNewProcess={handleAddNewProcess}
                    />
                  ))}
                </div>
              </>
            )}

            {activeView === 'reportes' && (
              <ReportsView 
                reportSections={reportSections}
                reportsData={reportsData}
                expandedSections={expandedSections}
                onSectionToggle={handleSectionToggle}
                onReportClick={handleReportClick}
              />
            )}

            {(activeView === 'inicio' || 
              activeView === 'bandeja' || 
              activeView === 'directorio' || 
              activeView === 'documentos' || 
              activeView === 'apps') && (
              <div className="text-center py-12">
                <h2 className="text-xl font-medium text-foreground mb-2">
                  {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
                </h2>
                <p className="text-muted-foreground">
                  Esta sección está en desarrollo
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Advanced Search Modal */}
      <AdvancedSearchModal
        isOpen={isAdvancedSearchOpen}
        onClose={() => setIsAdvancedSearchOpen(false)}
        processGroupName=""
        processColor="#3b82f6"
        onSearch={handleAdvancedSearch}
        startWithAdvanced={false}
      />
    </div>
  );
}