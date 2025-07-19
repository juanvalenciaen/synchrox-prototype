import { 
  Search, 
  SlidersHorizontal,
  Columns,
  Download,
  Clock,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  ArrowLeft,
  Hash,
  FileText,
  User,
  Calendar,
  Building
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { AdvancedSearchModal } from './AdvancedSearchModal';
import { ColumnsModal, defaultColumns, serializeColumns, deserializeColumns } from './ColumnsModal';
import type { Column } from './ColumnsModal';

interface SearchResult {
  id: string;
  number: string;
  type: string;
  activity: string;
  notificationDate: string;
  status: 'pending' | 'started' | 'completed';
  app: string;
}

interface SearchResultsProps {
  searchData: any;
  onBack: () => void;
  onSearch?: (searchData: any, isAdvanced: boolean) => void;
}

export function SearchResults({ searchData, onBack, onSearch }: SearchResultsProps) {
  const [searchValue, setSearchValue] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [hasActiveFilters, setHasActiveFilters] = useState(true); // Since we came from a search
  
  // Columns state management with proper serialization
  const [isColumnsModalOpen, setIsColumnsModalOpen] = useState(false);
  const [columns, setColumns] = useState<Column[]>(() => {
    const saved = sessionStorage.getItem('searchResults-columns');
    return saved ? deserializeColumns(saved) : defaultColumns;
  });
  const [hasCustomColumns, setHasCustomColumns] = useState(false);

  // Check for custom columns on component mount
  useEffect(() => {
    const saved = sessionStorage.getItem('searchResults-columns');
    if (saved) {
      const savedColumns = deserializeColumns(saved);
      const isCustom = serializeColumns(savedColumns) !== serializeColumns(defaultColumns);
      setHasCustomColumns(isCustom);
    }
  }, []);

  // Mock search results data
  const searchResults: SearchResult[] = [
    {
      id: '1',
      number: '2025-PPGCO-000001',
      type: 'PROCESO DE PAGOS CONTRATISTA',
      activity: 'Cargue Documento Soporte De Pago',
      notificationDate: '3/2/2025, 3:48:11 p. m.',
      status: 'pending',
      app: 'Gestión de Pagos'
    },
    {
      id: '2',
      number: '2025-CONT-000045',
      type: 'PROCESO DE CONTRATACIÓN',
      activity: 'Evaluación de Propuestas',
      notificationDate: '3/2/2025, 2:15:30 p. m.',
      status: 'started',
      app: 'Contratación'
    },
    {
      id: '3',
      number: '2025-RRHH-000123',
      type: 'PROCESO DE RECURSOS HUMANOS',
      activity: 'Evaluación de Desempeño',
      notificationDate: '3/2/2025, 1:20:45 p. m.',
      status: 'completed',
      app: 'Recursos Humanos'
    },
    {
      id: '4',
      number: '2025-PPGCO-000002',
      type: 'PROCESO DE PAGOS CONTRATISTA',
      activity: 'Validación Presupuestal',
      notificationDate: '3/2/2025, 12:30:22 p. m.',
      status: 'pending',
      app: 'Gestión de Pagos'
    },
    {
      id: '5',
      number: '2025-CONT-000046',
      type: 'PROCESO DE CONTRATACIÓN',
      activity: 'Revisión de Documentos',
      notificationDate: '3/2/2025, 11:45:10 a. m.',
      status: 'started',
      app: 'Contratación'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-500';
      case 'started': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'started': return 'Iniciado';
      case 'completed': return 'Completado';
      default: return 'Desconocido';
    }
  };

  const handleFilterClick = () => {
    setIsAdvancedSearchOpen(true);
  };

  const handleColumnsClick = () => {
    setIsColumnsModalOpen(true);
  };

  const handleAdvancedSearch = (newSearchData: any, isAdvanced: boolean) => {
    setHasActiveFilters(true);
    onSearch?.(newSearchData, isAdvanced);
  };

  const handleColumnsSave = (newColumns: Column[]) => {
    setColumns(newColumns);
    sessionStorage.setItem('searchResults-columns', serializeColumns(newColumns));
    
    // Check if columns configuration differs from default
    const isCustom = serializeColumns(newColumns) !== serializeColumns(defaultColumns);
    setHasCustomColumns(isCustom);
  };

  const visibleColumns = columns.filter(col => col.visible).sort((a, b) => a.order - b.order);

  const renderCellContent = (column: Column, result: SearchResult) => {
    switch (column.id) {
      case 'status':
        return (
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(result.status)}`}></div>
            <span className="text-sm text-muted-foreground">{getStatusLabel(result.status)}</span>
          </div>
        );
      case 'number':
        return <span className="text-sm font-medium text-foreground">{result.number}</span>;
      case 'type':
        return <span className="text-sm text-muted-foreground">{result.type}</span>;
      case 'activity':
        return <span className="text-sm text-muted-foreground">{result.activity}</span>;
      case 'notificationDate':
        return <span className="text-sm text-muted-foreground">{result.notificationDate}</span>;
      default:
        return <span className="text-sm text-muted-foreground">-</span>;
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Header */}
      <div className="h-16 bg-card border-b border-border">
        <div className="h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-smooth"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="text-lg font-semibold text-foreground">Resultados de la búsqueda</h1>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          
          {/* Search Summary */}
          <div className="mb-6">
            <div className="bg-muted/30 p-4 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">
                Se encontraron <span className="font-medium text-foreground">{searchResults.length}</span> resultados
                {searchData.processId && (
                  <span> para el ID: <span className="font-medium text-foreground">{searchData.processId}</span></span>
                )}
                {searchData.state && (
                  <span> con estado: <span className="font-medium text-foreground">{searchData.state}</span></span>
                )}
              </p>
            </div>
          </div>

          {/* Action Bar */}
          <div className="mb-6 flex items-center gap-4 flex-wrap">
            {/* Search */}
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Refinar búsqueda..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth text-sm bg-input-background"
              />
            </div>

            {/* Action Buttons - Note: No Save View button in search results */}
            <div className="flex items-center gap-2">
              <button 
                onClick={handleFilterClick}
                className={`relative flex items-center gap-2 px-3 py-2 rounded-lg transition-smooth text-sm border bg-card ${
                  hasActiveFilters 
                    ? 'text-primary border-primary bg-primary/5' 
                    : 'text-muted-foreground border-border hover:text-foreground hover:bg-accent'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filtrar
                {hasActiveFilters && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
                )}
              </button>
              <button 
                onClick={handleColumnsClick}
                className={`relative flex items-center gap-2 px-3 py-2 rounded-lg transition-smooth text-sm border bg-card ${
                  hasCustomColumns 
                    ? 'text-primary border-primary bg-primary/5' 
                    : 'text-muted-foreground border-border hover:text-foreground hover:bg-accent'
                }`}
              >
                <Columns className="w-4 h-4" />
                Columnas
                {hasCustomColumns && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
                )}
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-smooth text-sm border border-border bg-card">
                <Download className="w-4 h-4" />
                Descargar
              </button>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/30 border-b border-border">
                <tr>
                  {visibleColumns.map((column) => {
                    const IconComponent = column.icon;
                    return (
                      <th key={column.id} className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                        <div className="flex items-center gap-2">
                          {IconComponent && <IconComponent className="w-4 h-4" />}
                          {column.label}
                        </div>
                      </th>
                    );
                  })}
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((result, index) => (
                  <tr 
                    key={result.id} 
                    className={`border-b border-border last:border-b-0 transition-smooth cursor-pointer ${
                      hoveredRow === result.id 
                        ? 'bg-accent/50 shadow-sm' 
                        : index % 2 === 0 
                          ? 'bg-transparent hover:bg-muted/10' 
                          : 'bg-muted/5 hover:bg-muted/15'
                    }`}
                    onMouseEnter={() => setHoveredRow(result.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    {visibleColumns.map((column) => (
                      <td key={column.id} className="py-4 px-4">
                        {renderCellContent(column, result)}
                      </td>
                    ))}
                    <td className="py-4 px-4">
                      <button className="p-1 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-smooth">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Filas Por Página:</span>
              <select 
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                className="border border-input rounded px-2 py-1 bg-input-background text-foreground"
              >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                1 - {searchResults.length} de {searchResults.length}
              </span>
              <div className="flex items-center gap-1">
                <button className="p-1 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-smooth">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-1 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-smooth">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Advanced Search Modal */}
      <AdvancedSearchModal
        isOpen={isAdvancedSearchOpen}
        onClose={() => setIsAdvancedSearchOpen(false)}
        processGroupName="Procesos de Pago"
        processColor="#3b82f6"
        onSearch={handleAdvancedSearch}
        startWithAdvanced={false}
        initialSearchData={searchData}
      />

      {/* Columns Modal */}
      <ColumnsModal
        isOpen={isColumnsModalOpen}
        onClose={() => setIsColumnsModalOpen(false)}
        columns={columns}
        onSave={handleColumnsSave}
        isProcessDetail={false}
      />
    </div>
  );
}