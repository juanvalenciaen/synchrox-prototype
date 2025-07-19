import { 
  Save, 
  ChevronDown, 
  X,
  RotateCcw
} from 'lucide-react';
import { useState } from 'react';

interface SaveViewButtonProps {
  onSave: () => void;
  onSaveAsNewTab: (name: string) => void;
  onDiscard: () => void;
}

export function SaveViewButton({ onSave, onSaveAsNewTab, onDiscard }: SaveViewButtonProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNewTabModalOpen, setIsNewTabModalOpen] = useState(false);
  const [newTabName, setNewTabName] = useState('');

  const handleSaveAsNewTab = () => {
    setIsDropdownOpen(false);
    setIsNewTabModalOpen(true);
  };

  const handleConfirmNewTab = () => {
    if (newTabName.trim()) {
      onSaveAsNewTab(newTabName.trim());
      setNewTabName('');
      setIsNewTabModalOpen(false);
    }
  };

  const handleCancelNewTab = () => {
    setNewTabName('');
    setIsNewTabModalOpen(false);
  };

  const handleSave = () => {
    setIsDropdownOpen(false);
    onSave();
  };

  const handleDiscard = () => {
    setIsDropdownOpen(false);
    onDiscard();
  };

  return (
    <>
      <div className="relative">
        {/* Single button that always opens dropdown */}
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-smooth text-sm font-medium"
        >
          <Save className="w-4 h-4" />
          Guardar
          <ChevronDown className="w-4 h-4" />
        </button>

        {/* Dropdown menu */}
        {isDropdownOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsDropdownOpen(false)}
            />
            
            {/* Menu */}
            <div className="absolute top-full right-0 mt-1 w-48 bg-card border border-border rounded-lg shadow-strong z-50 py-1">
              <button
                onClick={handleSave}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-accent transition-smooth text-left"
              >
                Guardar Vista
              </button>
              <button
                onClick={handleSaveAsNewTab}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-accent transition-smooth text-left"
              >
                Guardar como Nueva Pestaña
              </button>
              <div className="my-1 h-px bg-border"></div>
              <button
                onClick={handleDiscard}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-accent transition-smooth text-left"
              >
                <RotateCcw className="w-4 h-4 text-muted-foreground" />
                Descartar Cambios
              </button>
            </div>
          </>
        )}
      </div>

      {/* New Tab Modal */}
      {isNewTabModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg shadow-strong w-full max-w-md border border-border">
            {/* Header */}
            <div className="flex items-center gap-3 p-6 border-b border-border">
              <div className="w-5 h-5 bg-primary/10 rounded flex items-center justify-center">
                <Save className="w-3 h-3 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Guardar como Nueva Pestaña</h2>
              <button
                onClick={handleCancelNewTab}
                className="ml-auto p-1 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-smooth"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-4">
                <label htmlFor="tabName" className="block text-sm font-medium text-foreground mb-2">
                  Nombre de la pestaña
                </label>
                <input
                  id="tabName"
                  type="text"
                  value={newTabName}
                  onChange={(e) => setNewTabName(e.target.value)}
                  placeholder="Ingresa el nombre de la nueva pestaña"
                  className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth text-sm bg-input-background"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleConfirmNewTab();
                    } else if (e.key === 'Escape') {
                      handleCancelNewTab();
                    }
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                La nueva pestaña incluirá los filtros y columnas configurados actualmente.
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
              <button
                onClick={handleCancelNewTab}
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-smooth text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmNewTab}
                disabled={!newTabName.trim()}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-smooth text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Guardar Pestaña
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}