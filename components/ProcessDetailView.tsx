import { 
  Search, 
  SlidersHorizontal,
  Columns,
  Download,
  Clock,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Hash,
  FileText,
  User,
  Calendar,
  Building,
  Play,
  CheckCircle,
  MoreHorizontal,
  Edit2,
  Trash2,
  X,
  DollarSign,
  CreditCard,
  UserCheck,
  Calculator,
  Users,
  ClipboardList
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { ProcessDetailHeader } from './ProcessDetailHeader';
import { AdvancedSearchModal } from './AdvancedSearchModal';
import { ColumnsModal, processDetailColumns, serializeColumns, deserializeColumns } from './ColumnsModal';
import { SaveViewButton } from './SaveViewButton';
import { ProcessReportsView } from './ProcessReportsView';
import { ProcessConfigurationView } from './ProcessConfigurationView';
import type { Column } from './ColumnsModal';

interface ProcessInstance {
  id: string;
  number: string;
  type: string;
  activity: string;
  notificationDate: string;
  status: 'pending' | 'started' | 'completed';
  // Process-specific fields
  amount?: string;
  contractorType?: string;
  costCenter?: string;
  // Traffic light indicator for pending items
  timeRemaining?: 'good' | 'warning' | 'critical';
}

interface CustomTab {
  id: string;
  name: string;
  columns?: string; // serialized columns
  filtersActive?: boolean;
  processName?: string;
}

interface ProcessDetailViewProps {
  processName: string;
  applicationName: string;
  processColor: string;
  onBack: () => void;
  hasActiveFilters?: boolean;
  searchData?: any; // Add search data prop
}

// Function to get process icon based on process name
const getProcessIcon = (processName: string) => {
  const name = processName.toLowerCase();
  if (name.includes('pago')) return DollarSign;
  if (name.includes('validación') || name.includes('validacion')) return Calculator;
  if (name.includes('selección') || name.includes('seleccion')) return UserCheck;
  if (name.includes('contrat')) return CreditCard;
  if (name.includes('evaluación') || name.includes('evaluacion')) return ClipboardList;
  if (name.includes('nómina') || name.includes('nomina')) return Users;
  return FileText; // Default icon
};

export function ProcessDetailView({ 
  processName, 
  applicationName, 
  processColor, 
  onBack,
  hasActiveFilters = false,
  searchData = null // Receive search data
}: ProcessDetailViewProps) {
  // Set default tab to "todos" if coming from extended search
  const [activeFilter, setActiveFilter] = useState(hasActiveFilters ? 'todos' : 'pendientes');
  const [searchValue, setSearchValue] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [showConfiguration, setShowConfiguration] = useState(false);
  
  // Custom tabs management
  const [customTabs, setCustomTabs] = useState<CustomTab[]>(() => {
    const saved = sessionStorage.getItem(`processDetail-customTabs-${processName}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });
  
  // Tab context menu state
  const [tabContextMenu, setTabContextMenu] = useState<{
    tabId: string;
    x: number;
    y: number;
  } | null>(null);
  const [editingTabId, setEditingTabId] = useState<string | null>(null);
  const [editingTabName, setEditingTabName] = useState('');
  const editInputRef = useRef<HTMLInputElement>(null);
  
  // Filters and columns modification tracking - Initialize with search data
  const [filtersActive, setFiltersActive] = useState(hasActiveFilters || (searchData !== null));
  const [originalFiltersActive, setOriginalFiltersActive] = useState(hasActiveFilters || (searchData !== null));
  
  // Get dynamic columns based on active filter
  const getDynamicColumns = (filter: string): Column[] => {
    const baseColumns = processDetailColumns.filter(col => {
      // Remove activity and notificationDate from non-pending views
      if (filter !== 'pendientes' && (col.id === 'activity' || col.id === 'notificationDate')) {
        return false;
      }
      return true;
    });

    // Add traffic light column for pending items only
    if (filter === 'pendientes') {
      return [
        {
          id: 'trafficLight',
          label: '', // No label for traffic light
          visible: true,
          order: 0,
          icon: undefined
        },
        ...baseColumns.map(col => ({ ...col, order: col.order + 1 }))
      ];
    }

    return baseColumns;
  };
  
  // Columns state management with proper serialization
  const [isColumnsModalOpen, setIsColumnsModalOpen] = useState(false);
  const [columns, setColumns] = useState<Column[]>(() => {
    // Check if current active filter is a custom tab
    const customTab = customTabs.find(tab => tab.id === activeFilter);
    if (customTab && customTab.columns) {
      return deserializeColumns(customTab.columns);
    }
    const saved = sessionStorage.getItem(`processDetail-columns-${processName}-${activeFilter}`);
    return saved ? deserializeColumns(saved) : getDynamicColumns(activeFilter);
  });
  const [originalColumns, setOriginalColumns] = useState<Column[]>(() => {
    const customTab = customTabs.find(tab => tab.id === activeFilter);
    if (customTab && customTab.columns) {
      return deserializeColumns(customTab.columns);
    }
    const saved = sessionStorage.getItem(`processDetail-columns-${processName}-${activeFilter}`);
    return saved ? deserializeColumns(saved) : getDynamicColumns(activeFilter);
  });

  // Track if filters or columns have been modified
  const [hasModifiedFilters, setHasModifiedFilters] = useState(false);
  const [hasModifiedColumns, setHasModifiedColumns] = useState(false);

  // Initialize filter state based on search data
  useEffect(() => {
    if (searchData) {
      setFiltersActive(true);
      setOriginalFiltersActive(false); // Mark as modified since we came with search data
      setHasModifiedFilters(true); // Mark as modified
    }
  }, [searchData]);

  // Update states when tab changes
  useEffect(() => {
    const customTab = customTabs.find(tab => tab.id === activeFilter);
    let tabColumns = getDynamicColumns(activeFilter);
    let tabFiltersActive = searchData !== null; // Keep search state
    
    if (customTab) {
      if (customTab.columns) {
        tabColumns = deserializeColumns(customTab.columns);
      }
      tabFiltersActive = customTab.filtersActive || (searchData !== null);
    } else {
      const saved = sessionStorage.getItem(`processDetail-columns-${processName}-${activeFilter}`);
      if (saved) {
        tabColumns = deserializeColumns(saved);
      }
    }
    
    setColumns(tabColumns);
    setOriginalColumns([...tabColumns]);
    setFiltersActive(tabFiltersActive);
    
    // Only reset original filters if we don't have search data
    if (!searchData) {
      setOriginalFiltersActive(tabFiltersActive);
      setHasModifiedFilters(false);
    }
    
    // Reset column modifications
    setHasModifiedColumns(false);
  }, [activeFilter, customTabs, processName, searchData]);

  // Track filter modifications
  useEffect(() => {
    const isModified = filtersActive !== originalFiltersActive;
    setHasModifiedFilters(isModified);
  }, [filtersActive, originalFiltersActive]);

  // Track column modifications
  useEffect(() => {
    const isModified = serializeColumns(columns) !== serializeColumns(originalColumns);
    setHasModifiedColumns(isModified);
  }, [columns, originalColumns]);

  // Focus edit input when editing starts
  useEffect(() => {
    if (editingTabId && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingTabId]);

  // Check if any modifications exist
  const hasAnyModifications = hasModifiedFilters || hasModifiedColumns;

  // Extended mock data with more instances and process-specific fields
  const processInstances: ProcessInstance[] = [
    {
      id: '1',
      number: '2025-PPGCO-000001',
      type: 'PROCESO DE PAGOS CONTRATISTA',
      activity: 'Cargue Documento Soporte De Pago',
      notificationDate: '3/2/2025, 3:48:11 p. m.',
      status: 'pending',
      amount: '$2,500,000',
      contractorType: 'Persona Natural',
      costCenter: 'CC-001-Marketing',
      timeRemaining: 'good'
    },
    {
      id: '2',
      number: '2025-PPGCO-000002',
      type: 'PROCESO DE PAGOS CONTRATISTA',
      activity: 'Revisión de Documentos',
      notificationDate: '3/2/2025, 2:15:30 p. m.',
      status: 'started',
      amount: '$1,800,000',
      contractorType: 'Persona Jurídica',
      costCenter: 'CC-002-Desarrollo',
      timeRemaining: 'warning'
    },
    {
      id: '3',
      number: '2025-PPGCO-000003',
      type: 'PROCESO DE PAGOS CONTRATISTA',
      activity: 'Aprobación Final',
      notificationDate: '3/2/2025, 1:20:45 p. m.',
      status: 'completed',
      amount: '$3,200,000',
      contractorType: 'Persona Natural',
      costCenter: 'CC-003-Operaciones',
      timeRemaining: 'good'
    },
    {
      id: '4',
      number: '2025-PPGCO-000004',
      type: 'PROCESO DE PAGOS CONTRATISTA',
      activity: 'Validación Presupuestal',
      notificationDate: '3/2/2025, 12:30:22 p. m.',
      status: 'pending',
      amount: '$950,000',
      contractorType: 'Persona Jurídica',
      costCenter: 'CC-004-Finanzas',
      timeRemaining: 'critical'
    },
    {
      id: '5',
      number: '2025-PPGCO-000005',
      type: 'PROCESO DE PAGOS CONTRATISTA',
      activity: 'Autorización de Pago',
      notificationDate: '3/2/2025, 11:45:10 a. m.',
      status: 'started',
      amount: '$4,100,000',
      contractorType: 'Persona Natural',
      costCenter: 'CC-005-Ventas',
      timeRemaining: 'warning'
    }
  ];

  // Default filter tabs
  const defaultFilterTabs = [
    { id: 'pendientes', label: 'Pendientes', icon: Clock, count: 2, isDefault: true },
    { id: 'iniciados', label: 'Iniciados', icon: Play, count: 2, isDefault: true },
    { id: 'todos', label: 'Todos', icon: CheckCircle, count: 5, isDefault: true }
  ];

  // Combine default and custom tabs
  const allFilterTabs = [
    ...defaultFilterTabs,
    ...customTabs.map(tab => ({
      id: tab.id,
      label: tab.name,
      icon: CheckCircle, // Custom tabs use a default icon
      count: 0, // Custom tabs don't show counts for now
      isDefault: false
    }))
  ];

  const filteredInstances = processInstances.filter(instance => {
    if (activeFilter === 'pendientes') return instance.status === 'pending';
    if (activeFilter === 'iniciados') return instance.status === 'started';
    return true; // 'todos' or custom tabs show all for now
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Pendiente', color: 'bg-orange-500' },
      started: { label: 'Iniciado', color: 'bg-blue-500' },
      completed: { label: 'Completado', color: 'bg-green-500' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getTrafficLightColor = (timeRemaining: string) => {
    switch (timeRemaining) {
      case 'good': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleFilterClick = () => {
    setIsAdvancedSearchOpen(true);
  };

  const handleColumnsClick = () => {
    setIsColumnsModalOpen(true);
  };

  const handleAdvancedSearch = (newSearchData: any, isAdvanced: boolean) => {
    setFiltersActive(true);
    // Here you would normally apply the filters to the data
    console.log('Applying filters:', newSearchData, isAdvanced);
  };

  const handleColumnsSave = (newColumns: Column[]) => {
    setColumns(newColumns);
    
    const customTab = customTabs.find(tab => tab.id === activeFilter);
    if (customTab) {
      // Update custom tab
      const updatedTabs = customTabs.map(tab =>
        tab.id === activeFilter
          ? { ...tab, columns: serializeColumns(newColumns) }
          : tab
      );
      setCustomTabs(updatedTabs);
      sessionStorage.setItem(`processDetail-customTabs-${processName}`, JSON.stringify(updatedTabs));
    } else {
      // Update default tab
      sessionStorage.setItem(`processDetail-columns-${processName}-${activeFilter}`, serializeColumns(newColumns));
    }
  };

  // Tab context menu handlers
  const handleTabContextMenu = (e: React.MouseEvent, tabId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only show context menu for custom tabs
    const tab = customTabs.find(t => t.id === tabId);
    if (!tab) return;
    
    setTabContextMenu({
      tabId,
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleTabRename = (tabId: string) => {
    const tab = customTabs.find(t => t.id === tabId);
    if (tab) {
      setEditingTabId(tabId);
      setEditingTabName(tab.name);
    }
    setTabContextMenu(null);
  };

  const handleTabDelete = (tabId: string) => {
    const updatedTabs = customTabs.filter(tab => tab.id !== tabId);
    setCustomTabs(updatedTabs);
    sessionStorage.setItem(`processDetail-customTabs-${processName}`, JSON.stringify(updatedTabs));
    
    // Switch to default tab if deleting active tab
    if (activeFilter === tabId) {
      setActiveFilter('pendientes');
    }
    
    setTabContextMenu(null);
  };

  const handleTabNameSave = () => {
    if (editingTabName.trim() && editingTabId) {
      const updatedTabs = customTabs.map(tab =>
        tab.id === editingTabId
          ? { ...tab, name: editingTabName.trim() }
          : tab
      );
      setCustomTabs(updatedTabs);
      sessionStorage.setItem(`processDetail-customTabs-${processName}`, JSON.stringify(updatedTabs));
    }
    setEditingTabId(null);
    setEditingTabName('');
  };

  const handleTabNameCancel = () => {
    setEditingTabId(null);
    setEditingTabName('');
  };

  // Save view handlers
  const handleSaveView = () => {
    const customTab = customTabs.find(tab => tab.id === activeFilter);
    if (customTab) {
      // Update custom tab
      const updatedTabs = customTabs.map(tab =>
        tab.id === activeFilter
          ? { ...tab, columns: serializeColumns(columns), filtersActive: filtersActive }
          : tab
      );
      setCustomTabs(updatedTabs);
      sessionStorage.setItem(`processDetail-customTabs-${processName}`, JSON.stringify(updatedTabs));
    } else {
      // Update default tab
      sessionStorage.setItem(`processDetail-columns-${processName}-${activeFilter}`, serializeColumns(columns));
    }
    
    // FIXED: Don't overwrite original states immediately - use setTimeout to ensure state updates
    setTimeout(() => {
      setOriginalColumns([...columns]);
      setOriginalFiltersActive(filtersActive);
      
      // Reset modification flags
      setHasModifiedFilters(false);
      setHasModifiedColumns(false);
    }, 0);
    
    console.log('Vista guardada exitosamente');
  };

  const handleSaveAsNewTab = (tabName: string) => {
    // Create new custom tab
    const newTabId = `custom-${Date.now()}`;
    const newTab: CustomTab = {
      id: newTabId,
      name: tabName,
      columns: serializeColumns(columns),
      filtersActive: filtersActive,
      processName: processName
    };
    
    // Add to custom tabs list
    const updatedTabs = [...customTabs, newTab];
    setCustomTabs(updatedTabs);
    sessionStorage.setItem(`processDetail-customTabs-${processName}`, JSON.stringify(updatedTabs));
    
    // Switch to new tab
    setActiveFilter(newTabId);
    
    console.log('Nueva pestaña creada:', tabName);
  };

  const handleDiscardChanges = () => {
    // Reset to original states
    setColumns([...originalColumns]);
    setFiltersActive(originalFiltersActive);
    
    // Reset modification flags immediately
    setHasModifiedFilters(false);
    setHasModifiedColumns(false);
    
    console.log('Cambios descartados');
  };

  const handleReportsClick = () => {
    setShowReports(true);
  };

  const handleBackFromReports = () => {
    setShowReports(false);
  };

  const handleConfigurationClick = () => {
    setShowConfiguration(true);
  };

  const handleBackFromConfiguration = () => {
    setShowConfiguration(false);
  };

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setTabContextMenu(null);
    };

    if (tabContextMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [tabContextMenu]);

  const visibleColumns = columns.filter(col => col.visible).sort((a, b) => a.order - b.order);

  const renderCellContent = (column: Column, instance: ProcessInstance) => {
    switch (column.id) {
      case 'trafficLight':
        return <div className={`w-3 h-3 rounded-full ${getTrafficLightColor(instance.timeRemaining || 'good')}`}></div>;
      case 'status':
        return getStatusBadge(instance.status);
      case 'number':
        return <span className="text-sm font-medium text-foreground">{instance.number}</span>;
      case 'type':
        return <span className="text-sm text-muted-foreground">{instance.type}</span>;
      case 'activity':
        return <span className="text-sm text-muted-foreground">{instance.activity}</span>;
      case 'notificationDate':
        return <span className="text-sm text-muted-foreground">{instance.notificationDate}</span>;
      case 'amount':
        return <span className="text-sm text-muted-foreground">{instance.amount || '-'}</span>;
      case 'contractorType':
        return <span className="text-sm text-muted-foreground">{instance.contractorType || '-'}</span>;
      case 'costCenter':
        return <span className="text-sm text-muted-foreground">{instance.costCenter || '-'}</span>;
      default:
        return <span className="text-sm text-muted-foreground">-</span>;
    }
  };

  // Get the process icon
  const ProcessIcon = getProcessIcon(processName);

  // Show configuration view if requested
  if (showConfiguration) {
    return (
      <ProcessConfigurationView
        processName={processName}
        applicationName={applicationName}
        processColor={processColor}
        onBack={handleBackFromConfiguration}
        processIcon={ProcessIcon}
      />
    );
  }

  // Show reports view if requested
  if (showReports) {
    return (
      <div className="flex-1 flex flex-col min-w-0">
        {/* Secondary Header */}
        <ProcessDetailHeader
          processName={processName}
          applicationName={applicationName}
          processColor={processColor}
          onBack={onBack}
          processIcon={ProcessIcon}
          showReports={true}
          onBackFromReports={handleBackFromReports}
        />
        <ProcessReportsView 
          processName={processName}
          onBack={handleBackFromReports}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Secondary Header */}
      <ProcessDetailHeader
        processName={processName}
        applicationName={applicationName}
        processColor={processColor}
        onBack={onBack}
        processIcon={ProcessIcon}
        onReportsClick={handleReportsClick}
        onConfigurationClick={handleConfigurationClick}
      />

      {/* Content Area */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          
          {/* Filter Tabs - Horizontal Connected Chips with Custom Tabs */}
          <div className="mb-6">
            <div className="inline-flex bg-muted/50 p-1 rounded-xl border border-border">
              {allFilterTabs.map((tab, index) => {
                const TabIcon = tab.icon;
                const isEditing = editingTabId === tab.id;
                
                return (
                  <div key={tab.id} className="relative group">
                    <button
                      onClick={() => {
                        if (!isEditing) {
                          setActiveFilter(tab.id);
                        }
                      }}
                      onContextMenu={(e) => handleTabContextMenu(e, tab.id)}
                      className={`relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-smooth ${
                        index === 0 ? 'rounded-l-lg' : ''
                      } ${
                        index === allFilterTabs.length - 1 ? 'rounded-r-lg' : ''
                      } ${
                        activeFilter === tab.id
                          ? 'bg-card text-foreground shadow-soft border border-border rounded-lg z-10'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent/30'
                      }`}
                    >
                      <TabIcon className="w-4 h-4 flex-shrink-0" />
                      
                      {isEditing ? (
                        <input
                          ref={editInputRef}
                          type="text"
                          value={editingTabName}
                          onChange={(e) => setEditingTabName(e.target.value)}
                          onBlur={handleTabNameSave}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleTabNameSave();
                            } else if (e.key === 'Escape') {
                              handleTabNameCancel();
                            }
                          }}
                          className="bg-transparent border-none outline-none text-sm font-medium w-20 min-w-0"
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        tab.label
                      )}
                      
                      {tab.count > 0 && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                          activeFilter === tab.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted-foreground/20 text-muted-foreground'
                        }`}>
                          {tab.count}
                        </span>
                      )}
                      
                      {/* Options button for custom tabs */}
                      {!tab.isDefault && !isEditing && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTabContextMenu(e, tab.id);
                          }}
                          className="p-0.5 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-smooth"
                        >
                          <MoreHorizontal className="w-3 h-3" />
                        </button>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Bar */}
          <div className="mb-6 flex items-center gap-4 flex-wrap">
            {/* Search */}
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar procesos, documentos..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth text-sm bg-input-background"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button 
                onClick={handleFilterClick}
                className={`relative flex items-center gap-2 px-3 py-2 rounded-lg transition-smooth text-sm border bg-card ${
                  hasModifiedFilters 
                    ? 'text-primary border-primary bg-primary/5' 
                    : 'text-muted-foreground border-border hover:text-foreground hover:bg-accent'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filtrar
                {hasModifiedFilters && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
                )}
              </button>
              <button 
                onClick={handleColumnsClick}
                className={`relative flex items-center gap-2 px-3 py-2 rounded-lg transition-smooth text-sm border bg-card ${
                  hasModifiedColumns 
                    ? 'text-primary border-primary bg-primary/5' 
                    : 'text-muted-foreground border-border hover:text-foreground hover:bg-accent'
                }`}
              >
                <Columns className="w-4 h-4" />
                Columnas
                {hasModifiedColumns && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
                )}
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-smooth text-sm border border-border bg-card">
                <Download className="w-4 h-4" />
                Descargar
              </button>

              {/* Save View Button - Only show when there are modifications */}
              {hasAnyModifications && (
                <SaveViewButton
                  onSave={handleSaveView}
                  onSaveAsNewTab={handleSaveAsNewTab}
                  onDiscard={handleDiscardChanges}
                />
              )}
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
                {filteredInstances.map((instance, index) => (
                  <tr 
                    key={instance.id} 
                    className={`border-b border-border last:border-b-0 transition-smooth cursor-pointer ${
                      hoveredRow === instance.id 
                        ? 'bg-accent/50 shadow-sm' 
                        : index % 2 === 0 
                          ? 'bg-transparent hover:bg-muted/10' 
                          : 'bg-muted/5 hover:bg-muted/15'
                    }`}
                    onMouseEnter={() => setHoveredRow(instance.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    {visibleColumns.map((column) => (
                      <td key={column.id} className="py-4 px-4">
                        {renderCellContent(column, instance)}
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
                1 - {filteredInstances.length} de {filteredInstances.length}
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

      {/* Tab Context Menu */}
      {tabContextMenu && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setTabContextMenu(null)}
          />
          <div 
            className="fixed z-50 bg-card border border-border rounded-lg shadow-strong py-1 min-w-[120px]"
            style={{
              left: tabContextMenu.x,
              top: tabContextMenu.y
            }}
          >
            <button
              onClick={() => handleTabRename(tabContextMenu.tabId)}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-accent transition-smooth text-left"
            >
              <Edit2 className="w-4 h-4 text-muted-foreground" />
              Renombrar
            </button>
            <button
              onClick={() => handleTabDelete(tabContextMenu.tabId)}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-smooth text-left"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar
            </button>
          </div>
        </>
      )}

      {/* Advanced Search Modal */}
      <AdvancedSearchModal
        isOpen={isAdvancedSearchOpen}
        onClose={() => setIsAdvancedSearchOpen(false)}
        processGroupName={processName}
        processColor={processColor}
        onSearch={handleAdvancedSearch}
        startWithAdvanced={true}
        initialSearchData={searchData || {}} // Pass search data to modal
      />

      {/* Columns Modal */}
      <ColumnsModal
        isOpen={isColumnsModalOpen}
        onClose={() => setIsColumnsModalOpen(false)}
        columns={columns}
        onSave={handleColumnsSave}
        isProcessDetail={true}
      />
    </div>
  );
}