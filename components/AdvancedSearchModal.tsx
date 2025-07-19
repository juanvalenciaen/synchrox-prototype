import { 
  Search, 
  X, 
  Plus,
  ChevronDown,
  ChevronRight,
  GitBranch,
  List,
  FileText,
  Trash2
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface AdvancedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  processGroupName: string;
  processColor: string;
  onSearch?: (searchData: any, isAdvanced: boolean) => void;
  startWithAdvanced?: boolean;
  initialSearchData?: any;
}

export function AdvancedSearchModal({ 
  isOpen, 
  onClose, 
  processGroupName, 
  processColor,
  onSearch,
  startWithAdvanced = false,
  initialSearchData = {}
}: AdvancedSearchModalProps) {
  const [activeTab, setActiveTab] = useState('procesos');
  const [processGroupField, setProcessGroupField] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(startWithAdvanced);
  const [isBasicFiltersExpanded, setIsBasicFiltersExpanded] = useState(startWithAdvanced ? true : true);
  const [isProcessGroupExpanded, setIsProcessGroupExpanded] = useState(startWithAdvanced);
  const [isGroupHeaderHovered, setIsGroupHeaderHovered] = useState(false);

  const [searchData, setSearchData] = useState({
    processId: initialSearchData.processId || '',
    processType: initialSearchData.processType || '',
    actor: initialSearchData.actor || '',
    app: initialSearchData.app || '',
    state: initialSearchData.state || ''
  });

  const [customFilters, setCustomFilters] = useState({
    amount: '',
    contractorType: '',
    costCenter: ''
  });

  // Update search data when initial data changes
  useEffect(() => {
    if (initialSearchData) {
      setSearchData({
        processId: initialSearchData.processId || '',
        processType: initialSearchData.processType || '',
        actor: initialSearchData.actor || '',
        app: initialSearchData.app || '',
        state: initialSearchData.state || ''
      });
    }
  }, [initialSearchData]);

  // Set up advanced filters if started with advanced mode
  useEffect(() => {
    if (startWithAdvanced) {
      setProcessGroupField('procesos-pago');
      setShowAdvancedFilters(true);
      setIsBasicFiltersExpanded(true); // Keep basic filters expanded in process detail view
      setIsProcessGroupExpanded(true);
    } else {
      // Reset when not starting with advanced
      setProcessGroupField('');
      setShowAdvancedFilters(false);
      setIsBasicFiltersExpanded(true);
      setIsProcessGroupExpanded(false);
    }
  }, [startWithAdvanced, isOpen]);

  const handleInputChange = (field: string, value: string) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
  };

  const handleCustomFilterChange = (field: string, value: string) => {
    setCustomFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleProcessGroupChange = (value: string) => {
    setProcessGroupField(value);
  };

  const handleAdvancedFilters = () => {
    setShowAdvancedFilters(true);
    setIsBasicFiltersExpanded(false);
    setIsProcessGroupExpanded(true);
  };

  const handleRemoveProcessGroup = () => {
    setProcessGroupField('');
    setShowAdvancedFilters(false);
    setIsBasicFiltersExpanded(true);
    setCustomFilters({
      amount: '',
      contractorType: '',
      costCenter: ''
    });
  };

  const handleSearch = () => {
    const allSearchData = {
      ...searchData,
      processGroup: processGroupField,
      customFilters: showAdvancedFilters ? customFilters : null
    };
    
    onSearch?.(allSearchData, showAdvancedFilters && processGroupField !== '');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-strong w-full max-w-md border border-border">
        {/* Header */}
        <div className="flex items-center gap-3 p-6 border-b border-border">
          <Search className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Búsqueda Avanzada</h2>
          <button
            onClick={onClose}
            className="ml-auto p-1 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-smooth"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab('procesos')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-smooth relative ${
              activeTab === 'procesos'
                ? 'text-primary bg-primary/5'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <List className="w-4 h-4" />
            Procesos
            {activeTab === 'procesos' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('documentos')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-smooth relative ${
              activeTab === 'documentos'
                ? 'text-primary bg-primary/5'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <FileText className="w-4 h-4" />
            Documentos
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          {activeTab === 'procesos' && (
            <>
              {/* Basic Filters Accordion - Groups basic fields (removed App and Grupo de procesos) */}
              {showAdvancedFilters && (
                <div className="border border-border rounded-lg">
                  <button
                    onClick={() => setIsBasicFiltersExpanded(!isBasicFiltersExpanded)}
                    className="w-full flex items-center justify-between p-3 text-left hover:bg-accent transition-smooth"
                  >
                    <span className="text-sm font-medium text-foreground">Filtros Básicos</span>
                    {isBasicFiltersExpanded ? (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                  {isBasicFiltersExpanded && (
                    <div className="px-3 pb-3 space-y-4 border-t border-border">
                      <div className="pt-3 space-y-4">
                        {/* ID Proceso */}
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1">
                            ID proceso
                          </label>
                          <input
                            type="text"
                            placeholder="Ingrese ID del proceso"
                            value={searchData.processId}
                            onChange={(e) => handleInputChange('processId', e.target.value)}
                            className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm bg-input-background"
                          />
                        </div>

                        {/* Estado */}
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1">
                            Estado
                          </label>
                          <select
                            value={searchData.state}
                            onChange={(e) => handleInputChange('state', e.target.value)}
                            className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm bg-input-background"
                          >
                            <option value="">Seleccione estado</option>
                            <option value="pending">Pendiente</option>
                            <option value="started">Iniciado</option>
                            <option value="completed">Completado</option>
                          </select>
                        </div>

                        {/* Actores */}
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1">
                            Actores
                          </label>
                          <input
                            type="text"
                            placeholder="Ingrese actores"
                            value={searchData.actor}
                            onChange={(e) => handleInputChange('actor', e.target.value)}
                            className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm bg-input-background"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Standard Fields (when not in advanced mode) - Basic filters */}
              {!showAdvancedFilters && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      ID proceso
                    </label>
                    <input
                      type="text"
                      placeholder="Ingrese ID del proceso"
                      value={searchData.processId}
                      onChange={(e) => handleInputChange('processId', e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm bg-input-background"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Estado
                    </label>
                    <select
                      value={searchData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm bg-input-background"
                    >
                      <option value="">Seleccione estado</option>
                      <option value="pending">Pendiente</option>
                      <option value="started">Iniciado</option>
                      <option value="completed">Completado</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Actores
                    </label>
                    <input
                      type="text"
                      placeholder="Ingrese actores"
                      value={searchData.actor}
                      onChange={(e) => handleInputChange('actor', e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm bg-input-background"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      App
                    </label>
                    <select
                      value={searchData.app}
                      onChange={(e) => handleInputChange('app', e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm bg-input-background"
                    >
                      <option value="">Seleccione aplicación</option>
                      <option value="gestion-pagos">Gestión de Pagos</option>
                      <option value="contratacion">Contratación</option>
                      <option value="recursos-humanos">Recursos Humanos</option>
                    </select>
                  </div>

                  {/* Process Group Field - Only show when not in advanced mode with correct options */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Grupo de procesos
                    </label>
                    <select
                      value={processGroupField}
                      onChange={(e) => handleProcessGroupChange(e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm bg-input-background"
                    >
                      <option value="">Seleccione grupo de procesos</option>
                      <option value="Procesos de Pago">Procesos de Pago</option>
                      <option value="Validación Presupuestal">Validación Presupuestal</option>
                    </select>
                    
                    {/* Add More Filters Button */}
                    {processGroupField && (
                      <button
                        onClick={handleAdvancedFilters}
                        className="mt-2 flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium transition-smooth"
                      >
                        <Plus className="w-4 h-4" />
                        Añadir más filtros
                      </button>
                    )}
                  </div>
                </>
              )}

              {/* Process Group Specific Filters - Always show when advanced mode is active */}
              {showAdvancedFilters && (
                <div className="border border-border rounded-lg">
                  <button
                    onClick={() => setIsProcessGroupExpanded(!isProcessGroupExpanded)}
                    onMouseEnter={() => setIsGroupHeaderHovered(true)}
                    onMouseLeave={() => setIsGroupHeaderHovered(false)}
                    className="w-full flex items-center gap-3 p-3 text-left hover:bg-accent transition-smooth group"
                  >
                    <div 
                      className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${processColor}15` }}
                    >
                      <GitBranch 
                        className="w-3 h-3" 
                        style={{ color: processColor }}
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground flex-1">
                      {processGroupName}
                    </span>
                    
                    {/* Delete/Trash Icon on Hover */}
                    {isGroupHeaderHovered ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveProcessGroup();
                        }}
                        className="p-1 text-muted-foreground hover:text-destructive transition-smooth"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    ) : (
                      <div className="flex items-center">
                        {isProcessGroupExpanded ? (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    )}
                  </button>
                  {isProcessGroupExpanded && (
                    <div className="px-3 pb-3 space-y-4 border-t border-border">
                      <div className="pt-3 space-y-4">
                        {/* Process-specific custom fields */}
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1">
                            Monto del Pago
                          </label>
                          <input
                            type="number"
                            placeholder="Ingrese monto"
                            value={customFilters.amount}
                            onChange={(e) => handleCustomFilterChange('amount', e.target.value)}
                            className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm bg-input-background"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1">
                            Tipo de Contratista
                          </label>
                          <select 
                            value={customFilters.contractorType}
                            onChange={(e) => handleCustomFilterChange('contractorType', e.target.value)}
                            className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm bg-input-background"
                          >
                            <option value="">Seleccione tipo</option>
                            <option value="persona-natural">Persona Natural</option>
                            <option value="persona-juridica">Persona Jurídica</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1">
                            Centro de Costos
                          </label>
                          <input
                            type="text"
                            placeholder="Ingrese centro de costos"
                            value={customFilters.costCenter}
                            onChange={(e) => handleCustomFilterChange('costCenter', e.target.value)}
                            className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm bg-input-background"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-muted-foreground hover:text-foreground transition-smooth text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={handleSearch}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-smooth text-sm font-medium"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
}