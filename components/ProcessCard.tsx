import { 
  DollarSign, 
  Calculator, 
  UserCheck, 
  CreditCard, 
  ClipboardList, 
  Users, 
  FileText 
} from 'lucide-react';

interface ProcessCardProps {
  id: string;
  name: string;
  description: string;
  count: number;
  color: string; // Keep for future use but use blue for all
  onClick: () => void;
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

export function ProcessCard({ id, name, description, count, color, onClick }: ProcessCardProps) {
  const ProcessIcon = getProcessIcon(name);
  const blueColor = '#3b82f6'; // Use consistent blue color

  return (
    <div 
      onClick={onClick}
      className="group bg-card border border-border rounded-lg p-6 hover:shadow-medium hover:border-border/80 transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${blueColor}15` }}
        >
          <ProcessIcon 
            className="w-6 h-6" 
            style={{ color: blueColor }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
              {name}
            </h3>
            <span 
              className="px-2 py-1 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: blueColor }}
            >
              {count}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}