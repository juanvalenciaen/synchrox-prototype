import { 
  Home, 
  Inbox, 
  Users, 
  FileText, 
  BarChart3, 
  GitBranch, 
  Grid3X3,
  Folder
} from 'lucide-react';

interface ModernSidebarProps {
  activeView?: string;
  onNavigate?: (view: string) => void;
}

export function ModernSidebar({ activeView = 'procesos', onNavigate }: ModernSidebarProps) {
  const menuItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'bandeja', label: 'Bandeja', icon: Inbox },
    { id: 'directorio', label: 'Directorio', icon: Users },
    { id: 'documentos', label: 'Documentos', icon: FileText },
    { id: 'reportes', label: 'Reportes', icon: BarChart3 },
    { id: 'procesos', label: 'Procesos', icon: GitBranch },
    { id: 'apps', label: 'Apps', icon: Grid3X3 }
  ];

  const handleNavigation = (itemId: string) => {
    onNavigate?.(itemId);
  };

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="h-16 px-6 flex items-center border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <Folder className="w-4 h-4 text-sidebar-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-sidebar-foreground">Synchrox</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-sidebar-accent transition-colors cursor-pointer">
          <div className="w-8 h-8 bg-sidebar-primary rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-sidebar-primary-foreground">U</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">Usuario Admin</p>
            <p className="text-xs text-sidebar-foreground/70 truncate">admin@synchrox.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}