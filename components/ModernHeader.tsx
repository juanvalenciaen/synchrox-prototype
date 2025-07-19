import { Search, SlidersHorizontal, Settings, Bell, User } from 'lucide-react';
import { useState } from 'react';
import { AdvancedSearchModal } from './AdvancedSearchModal';

interface ModernHeaderProps {
  onSearch?: (searchData: any, isAdvanced: boolean) => void;
}

export function ModernHeader({ onSearch }: ModernHeaderProps) {
  const [searchValue, setSearchValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleSearch = (searchData: any, isAdvanced: boolean) => {
    onSearch?.(searchData, isAdvanced);
  };

  const handleOpenModal = () => {
    setIsSearchModalOpen(true);
  };

  return (
    <header className="h-16 bg-card border-b border-border">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Search Section - Made smaller */}
        <div className="flex-1 max-w-md">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onClick={handleOpenModal}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`w-full pl-10 pr-12 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 text-sm cursor-pointer ${
                isSearchFocused 
                  ? 'border-ring bg-card shadow-sm' 
                  : 'border-input bg-input-background hover:border-border'
              }`}
              readOnly
            />
            <button 
              onClick={handleOpenModal}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <button className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-destructive rounded-full"></span>
          </button>

          {/* Settings */}
          <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors">
            <Settings className="w-4 h-4" />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 ml-2 p-2 hover:bg-accent rounded-lg transition-colors cursor-pointer">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-foreground">Usuario</p>
              <p className="text-xs text-muted-foreground">Administrador</p>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Search Modal - Reset values when opened from top bar */}
      <AdvancedSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        processGroupName="Procesos de Pago"
        processColor="#3b82f6"
        onSearch={handleSearch}
        startWithAdvanced={false}
        initialSearchData={{}} // Reset values
      />
    </header>
  );
}