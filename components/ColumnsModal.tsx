import { 
  X, 
  ChevronUp, 
  ChevronDown,
  GripVertical,
  Clock,
  Hash,
  FileText,
  User,
  Calendar,
  Building
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export interface Column {
  id: string;
  label: string;
  icon?: React.ComponentType<any>;
  iconName?: string; // Add iconName for serialization
  visible: boolean;
  order: number;
}

interface ColumnsModalProps {
  isOpen: boolean;
  onClose: () => void;
  columns: Column[];
  onSave: (columns: Column[]) => void;
  isProcessDetail?: boolean;
}

interface DraggableRowProps {
  column: Column;
  index: number;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
  onToggle: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  isFirst: boolean;
  isLast: boolean;
}

const ITEM_TYPE = 'column-row';

// Icon mapping for serialization/deserialization
const iconMap: Record<string, React.ComponentType<any>> = {
  Clock,
  Hash,
  FileText,
  User,
  Calendar,
  Building
};

// Helper function to get icon from iconName
const getIcon = (iconName?: string): React.ComponentType<any> | undefined => {
  if (!iconName) return undefined;
  return iconMap[iconName];
};

// Helper function to serialize columns for storage
const serializeColumns = (columns: Column[]): string => {
  const serializable = columns.map(col => ({
    ...col,
    icon: undefined, // Remove icon function
    iconName: col.iconName || getIconName(col.icon) // Store iconName
  }));
  return JSON.stringify(serializable);
};

// Helper function to get iconName from icon component
const getIconName = (icon?: React.ComponentType<any>): string | undefined => {
  if (!icon) return undefined;
  // Find the icon name by comparing the function reference
  for (const [name, iconComponent] of Object.entries(iconMap)) {
    if (iconComponent === icon) {
      return name;
    }
  }
  return undefined;
};

// Helper function to deserialize columns from storage
const deserializeColumns = (serialized: string): Column[] => {
  try {
    const parsed = JSON.parse(serialized);
    return parsed.map((col: any) => ({
      ...col,
      icon: getIcon(col.iconName),
      iconName: col.iconName
    }));
  } catch {
    return [];
  }
};

function DraggableRow({ 
  column, 
  index, 
  moveRow, 
  onToggle, 
  onMoveUp, 
  onMoveDown,
  isFirst,
  isLast 
}: DraggableRowProps) {
  const [isHovered, setIsHovered] = useState(false);

  const [{ isDragging }, drag, preview] = useDrag({
    type: ITEM_TYPE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveRow(item.index, index);
        item.index = index;
      }
    },
  });

  const IconComponent = column.icon;

  return (
    <div
      ref={(node) => preview(drop(node))}
      className={`flex items-center gap-3 p-3 border border-border rounded-lg transition-smooth ${
        isDragging ? 'opacity-50' : ''
      } ${isHovered ? 'bg-accent/30' : 'bg-card hover:bg-accent/10'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Up/Down Buttons - Vertically Aligned */}
      <div className="flex flex-col border border-border rounded overflow-hidden">
        <button
          onClick={() => onMoveUp(index)}
          disabled={isFirst}
          className={`p-1 transition-smooth ${
            isFirst 
              ? 'text-muted-foreground/50 cursor-not-allowed bg-muted/50' 
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
          }`}
        >
          <ChevronUp className="w-3 h-3" />
        </button>
        <div className="w-full h-px bg-border"></div>
        <button
          onClick={() => onMoveDown(index)}
          disabled={isLast}
          className={`p-1 transition-smooth ${
            isLast 
              ? 'text-muted-foreground/50 cursor-not-allowed bg-muted/50' 
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
          }`}
        >
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      {/* Drag Handle - Shown on Hover */}
      <div 
        ref={drag}
        className={`cursor-move transition-smooth ${
          isHovered ? 'text-muted-foreground' : 'text-transparent'
        }`}
      >
        <GripVertical className="w-4 h-4" />
      </div>

      {/* Checkbox */}
      <label className="flex items-center gap-3 flex-1 cursor-pointer">
        <input
          type="checkbox"
          checked={column.visible}
          onChange={() => onToggle(column.id)}
          className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-ring"
        />
        
        {/* Column Info */}
        <div className="flex items-center gap-2 flex-1">
          {IconComponent && (
            <IconComponent className="w-4 h-4 text-muted-foreground" />
          )}
          <span className="text-sm font-medium text-foreground">
            {column.label}
          </span>
        </div>
      </label>
    </div>
  );
}

export function ColumnsModal({ 
  isOpen, 
  onClose, 
  columns: initialColumns, 
  onSave,
  isProcessDetail = false 
}: ColumnsModalProps) {
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  useEffect(() => {
    if (isOpen) {
      setColumns([...initialColumns]);
    }
  }, [isOpen, initialColumns]);

  const moveRow = (dragIndex: number, hoverIndex: number) => {
    const newColumns = [...columns];
    const draggedColumn = newColumns[dragIndex];
    
    newColumns.splice(dragIndex, 1);
    newColumns.splice(hoverIndex, 0, draggedColumn);
    
    // Update order values
    const updatedColumns = newColumns.map((col, index) => ({
      ...col,
      order: index
    }));
    
    setColumns(updatedColumns);
  };

  const toggleColumn = (id: string) => {
    setColumns(columns.map(col => 
      col.id === id ? { ...col, visible: !col.visible } : col
    ));
  };

  const moveUp = (index: number) => {
    if (index > 0) {
      const newColumns = [...columns];
      [newColumns[index - 1], newColumns[index]] = [newColumns[index], newColumns[index - 1]];
      
      // Update order values
      const updatedColumns = newColumns.map((col, idx) => ({
        ...col,
        order: idx
      }));
      
      setColumns(updatedColumns);
    }
  };

  const moveDown = (index: number) => {
    if (index < columns.length - 1) {
      const newColumns = [...columns];
      [newColumns[index], newColumns[index + 1]] = [newColumns[index + 1], newColumns[index]];
      
      // Update order values
      const updatedColumns = newColumns.map((col, idx) => ({
        ...col,
        order: idx
      }));
      
      setColumns(updatedColumns);
    }
  };

  const handleSave = () => {
    onSave(columns);
    onClose();
  };

  const handleCancel = () => {
    setColumns([...initialColumns]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-strong w-full max-w-md border border-border">
        {/* Header */}
        <div className="flex items-center gap-3 p-6 border-b border-border">
          <div className="w-5 h-5 bg-primary/10 rounded flex items-center justify-center">
            <div className="w-2 h-2 bg-primary rounded"></div>
          </div>
          <h2 className="text-lg font-semibold text-foreground">Configurar Columnas</h2>
          <button
            onClick={handleCancel}
            className="ml-auto p-1 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-smooth"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Selecciona qué columnas mostrar y arrastra para cambiar el orden
            </p>
          </div>

          <DndProvider backend={HTML5Backend}>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {columns.map((column, index) => (
                <DraggableRow
                  key={column.id}
                  column={column}
                  index={index}
                  moveRow={moveRow}
                  onToggle={toggleColumn}
                  onMoveUp={moveUp}
                  onMoveDown={moveDown}
                  isFirst={index === 0}
                  isLast={index === columns.length - 1}
                />
              ))}
            </div>
          </DndProvider>

          {/* Summary */}
          <div className="mt-4 p-3 bg-muted/30 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground">
              {columns.filter(col => col.visible).length} de {columns.length} columnas seleccionadas
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-muted-foreground hover:text-foreground transition-smooth text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-smooth text-sm font-medium"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

// Default column configurations with iconName
export const defaultColumns: Column[] = [
  { id: 'status', label: 'Estado', icon: Clock, iconName: 'Clock', visible: true, order: 0 },
  { id: 'number', label: 'Número', icon: Hash, iconName: 'Hash', visible: true, order: 1 },
  { id: 'type', label: 'Tipo de proceso', icon: FileText, iconName: 'FileText', visible: true, order: 2 },
  { id: 'activity', label: 'Actividad', icon: User, iconName: 'User', visible: true, order: 3 },
  { id: 'notificationDate', label: 'Fecha notificación', icon: Calendar, iconName: 'Calendar', visible: true, order: 4 }
];

export const processDetailColumns: Column[] = [
  { id: 'status', label: 'Estado', icon: Clock, iconName: 'Clock', visible: true, order: 0 },
  { id: 'number', label: 'Número', icon: Hash, iconName: 'Hash', visible: true, order: 1 },
  { id: 'type', label: 'Tipo de proceso', icon: FileText, iconName: 'FileText', visible: true, order: 2 },
  { id: 'activity', label: 'Actividad', icon: User, iconName: 'User', visible: true, order: 3 },
  { id: 'notificationDate', label: 'Fecha notificación', icon: Calendar, iconName: 'Calendar', visible: true, order: 4 },
  // Process-specific columns
  { id: 'amount', label: 'Monto del Pago', icon: Building, iconName: 'Building', visible: false, order: 5 },
  { id: 'contractorType', label: 'Tipo de Contratista', icon: User, iconName: 'User', visible: false, order: 6 },
  { id: 'costCenter', label: 'Centro de Costos', icon: Building, iconName: 'Building', visible: false, order: 7 }
];

// Export the helper functions for use in other components
export { serializeColumns, deserializeColumns };