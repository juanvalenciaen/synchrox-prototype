import { 
  GitBranch, 
  DollarSign, 
  Calculator, 
  UserCheck, 
  CreditCard, 
  ClipboardList, 
  Users, 
  FileText,
  Plus,
  Trash2,
  Save,
  X
} from 'lucide-react';
import { useState } from 'react';
import { ProcessDetailHeader } from './ProcessDetailHeader';

interface CustomField {
  id: string;
  name: string;
  source: string;
  showByDefault: boolean;
}

interface ProcessConfigurationViewProps {
  processName: string;
  applicationName: string;
  processColor: string;
  onBack: () => void;
  processIcon?: any;
}

// Available process icons
const processIcons = [
  { id: 'dollarSign', name: 'Pagos', icon: DollarSign },
  { id: 'calculator', name: 'Validación', icon: Calculator },
  { id: 'userCheck', name: 'Selección', icon: UserCheck },
  { id: 'creditCard', name: 'Contratación', icon: CreditCard },
  { id: 'clipboardList', name: 'Evaluación', icon: ClipboardList },
  { id: 'users', name: 'Nómina', icon: Users },
  { id: 'fileText', name: 'Documentos', icon: FileText },
  { id: 'gitBranch', name: 'Proceso', icon: GitBranch }
];

// Available applications
const availableApps = [
  { id: 'gestion-pagos', name: 'Gestión de Pagos' },
  { id: 'contratacion', name: 'Contratación' },
  { id: 'recursos-humanos', name: 'Recursos Humanos' }
];

export function ProcessConfigurationView({
  processName,
  applicationName,
  processColor,
  onBack,
  processIcon
}: ProcessConfigurationViewProps) {
  // Form state
  const [formData, setFormData] = useState({
    name: processName,
    description: 'Proceso para gestionar pagos a contratistas y proveedores',
    app: 'gestion-pagos',
    icon: 'dollarSign'
  });

  // Custom fields state
  const [customFields, setCustomFields] = useState<CustomField[]>([
    {
      id: '1',
      name: 'Monto del Pago',
      source: 'ProcessData.paymentAmount',
      showByDefault: true
    },
    {
      id: '2',
      name: 'Tipo de Contratista',
      source: 'ProcessData.contractorType',
      showByDefault: true
    },
    {
      id: '3',
      name: 'Centro de Costos',
      source: 'ProcessData.costCenter',
      showByDefault: false
    },
    {
      id: '4',
      name: 'Fecha de Vencimiento',
      source: 'ProcessData.dueDate',
      showByDefault: false
    }
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddCustomField = () => {
    const newField: CustomField = {
      id: Date.now().toString(),
      name: '',
      source: 'ProcessData.',
      showByDefault: false
    };
    setCustomFields([...customFields, newField]);
  };

  const handleCustomFieldChange = (id: string, field: string, value: string | boolean) => {
    setCustomFields(fields =>
      fields.map(f => f.id === id ? { ...f, [field]: value } : f)
    );
  };

  const handleDeleteCustomField = (id: string) => {
    setCustomFields(fields => fields.filter(f => f.id !== id));
  };

  const handleSave = () => {
    console.log('Saving configuration:', { formData, customFields });
    onBack();
  };

  const handleCancel = () => {
    onBack();
  };

  const selectedIcon = processIcons.find(icon => icon.id === formData.icon)?.icon || GitBranch;

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Header */}
      <ProcessDetailHeader
        processName={processName}
        applicationName={applicationName}
        processColor={processColor}
        onBack={onBack}
        processIcon={processIcon}
        showConfiguration={true}
        onBackFromConfiguration={onBack}
      />

      {/* Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-foreground mb-2">Configuración del Proceso</h1>
            <p className="text-muted-foreground">Configura los detalles y campos personalizados del proceso</p>
          </div>

          <div className="space-y-8">
            {/* Basic Configuration */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-medium text-foreground mb-6">Información Básica</h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                {/* Icon Selection */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Icono
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {processIcons.map((iconOption) => {
                      const IconComponent = iconOption.icon;
                      return (
                        <button
                          key={iconOption.id}
                          onClick={() => handleInputChange('icon', iconOption.id)}
                          className={`p-3 rounded-lg border transition-smooth flex flex-col items-center gap-1 ${
                            formData.icon === iconOption.id
                              ? 'border-primary bg-primary/5 text-primary'
                              : 'border-border hover:border-border/80 hover:bg-accent text-muted-foreground'
                          }`}
                        >
                          <IconComponent className="w-5 h-5" />
                          <span className="text-xs">{iconOption.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Application Selection */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Aplicación
                  </label>
                  <select
                    value={formData.app}
                    onChange={(e) => handleInputChange('app', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm bg-input-background"
                  >
                    {availableApps.map((app) => (
                      <option key={app.id} value={app.id}>
                        {app.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nombre del Proceso
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm bg-input-background"
                    placeholder="Ingrese el nombre del proceso"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm bg-input-background resize-none"
                    placeholder="Ingrese la descripción del proceso"
                  />
                </div>
              </div>
            </div>

            {/* Custom Fields */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-medium text-foreground">Campos Personalizados</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Define campos adicionales que se mostrarán en las vistas del proceso
                  </p>
                </div>
                <button
                  onClick={handleAddCustomField}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition-smooth text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Agregar Campo
                </button>
              </div>

              {/* Custom Fields Table */}
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/30 border-b border-border">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground w-1/3">
                        Nombre
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground w-1/3">
                        Fuente
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground w-24">
                        Mostrar
                      </th>
                      <th className="w-12"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {customFields.map((field, index) => (
                      <tr key={field.id} className={`border-b border-border last:border-b-0 ${
                        index % 2 === 0 ? 'bg-transparent' : 'bg-muted/5'
                      }`}>
                        <td className="py-3 px-4">
                          <input
                            type="text"
                            value={field.name}
                            onChange={(e) => handleCustomFieldChange(field.id, 'name', e.target.value)}
                            className="w-full px-2 py-1 border border-input rounded text-sm bg-input-background focus:outline-none focus:ring-1 focus:ring-ring"
                            placeholder="Nombre del campo"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="text"
                            value={field.source}
                            onChange={(e) => handleCustomFieldChange(field.id, 'source', e.target.value)}
                            className="w-full px-2 py-1 border border-input rounded text-sm bg-input-background focus:outline-none focus:ring-1 focus:ring-ring font-mono"
                            placeholder="ProcessData.variableName"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={field.showByDefault}
                              onChange={(e) => handleCustomFieldChange(field.id, 'showByDefault', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="relative w-9 h-5 bg-switch-background peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ring/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleDeleteCustomField(field.id)}
                            className="p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-smooth"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {customFields.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No hay campos personalizados configurados</p>
                  <p className="text-sm">Haz clic en "Agregar Campo" para crear uno nuevo</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex items-center justify-end gap-3 pb-6">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-smooth text-sm font-medium"
            >
              <X className="w-4 h-4" />
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-smooth text-sm font-medium"
            >
              <Save className="w-4 h-4" />
              Guardar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}