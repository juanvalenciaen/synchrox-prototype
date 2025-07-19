import { ArrowLeft, GitBranch, Plus, MoreVertical, BarChart3, LucideIcon, Settings } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface ProcessDetailHeaderProps {
  processName: string;
  applicationName: string;
  processColor: string;
  onBack: () => void;
  processIcon?: LucideIcon;
  showReports?: boolean;
  showConfiguration?: boolean;
  onBackFromReports?: () => void;
  onReportsClick?: () => void;
  onConfigurationClick?: () => void;
  onBackFromConfiguration?: () => void;
}

export function ProcessDetailHeader({ 
  processName, 
  applicationName, 
  processColor, 
  onBack,
  processIcon: ProcessIcon = GitBranch,
  showReports = false,
  showConfiguration = false,
  onBackFromReports,
  onReportsClick,
  onConfigurationClick,
  onBackFromConfiguration
}: ProcessDetailHeaderProps) {
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowOptionsMenu(false);
      }
    };

    if (showOptionsMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showOptionsMenu]);

  const handleBackClick = () => {
    if (showConfiguration) {
      onBackFromConfiguration?.();
    } else if (showReports) {
      onBackFromReports?.();
    } else {
      onBack();
    }
  };

  const renderBreadcrumb = () => {
    if (showConfiguration) {
      return (
        <nav className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{applicationName}</span>
          <span className="text-sm text-muted-foreground">/</span>
          <div className="flex items-center gap-2">
            <div 
              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${processColor}15` }}
            >
              <ProcessIcon 
                className="w-3 h-3" 
                style={{ color: processColor }}
              />
            </div>
            <span className="text-sm text-muted-foreground">{processName}</span>
          </div>
          <span className="text-sm text-muted-foreground">/</span>
          <span className="text-lg font-semibold text-foreground">Configuración</span>
        </nav>
      );
    }

    if (showReports) {
      return (
        <nav className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{applicationName}</span>
          <span className="text-sm text-muted-foreground">/</span>
          <div className="flex items-center gap-2">
            <div 
              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${processColor}15` }}
            >
              <ProcessIcon 
                className="w-3 h-3" 
                style={{ color: processColor }}
              />
            </div>
            <span className="text-sm text-muted-foreground">{processName}</span>
          </div>
          <span className="text-sm text-muted-foreground">/</span>
          <span className="text-lg font-semibold text-foreground">Reportes</span>
        </nav>
      );
    }

    return (
      <nav className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">{applicationName}</span>
        <span className="text-sm text-muted-foreground">/</span>
        <div className="flex items-center gap-3">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${processColor}15` }}
          >
            <ProcessIcon 
              className="w-4 h-4" 
              style={{ color: processColor }}
            />
          </div>
          <span className="text-lg font-semibold text-foreground">{processName}</span>
        </div>
      </nav>
    );
  };

  return (
    <div className="h-16 bg-card border-b border-border">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleBackClick}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-smooth"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          {renderBreadcrumb()}
        </div>

        {/* Action Buttons */}
        {!showReports && !showConfiguration && (
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-smooth text-sm font-medium">
              <Plus className="w-4 h-4" />
              Nuevo
            </button>
            <button 
              onClick={onReportsClick}
              className="flex items-center gap-2 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-smooth text-sm"
            >
              <BarChart3 className="w-4 h-4" />
              Reportes
            </button>
            <div className="relative" ref={menuRef}>
              <button 
                onClick={() => setShowOptionsMenu(!showOptionsMenu)}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-smooth"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
              
              {showOptionsMenu && (
                <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-strong py-1 min-w-[140px] z-50">
                  <button
                    onClick={() => {
                      setShowOptionsMenu(false);
                      onConfigurationClick?.();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-accent transition-smooth text-left"
                  >
                    <Settings className="w-4 h-4 text-muted-foreground" />
                    Configuración
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}