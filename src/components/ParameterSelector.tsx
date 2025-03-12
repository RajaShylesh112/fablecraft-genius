
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface Parameter {
  id: string;
  name: string;
  options: { id: string; label: string }[];
  description?: string;
}

interface ParameterSelectorProps {
  parameters: Parameter[];
  onChange: (id: string, value: string) => void;
  className?: string;
}

const ParameterSelector: React.FC<ParameterSelectorProps> = ({
  parameters,
  onChange,
  className,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    () => {
      const initial: Record<string, string> = {};
      parameters.forEach(param => {
        if (param.options.length > 0) {
          initial[param.id] = param.options[0].id;
        }
      });
      return initial;
    }
  );

  const handleChange = (parameterId: string, optionId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [parameterId]: optionId
    }));
    onChange(parameterId, optionId);
  };

  return (
    <div className={cn('space-y-6', className)}>
      {parameters.map((param) => (
        <div key={param.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor={param.id} className="text-sm font-medium text-foreground">
              {param.name}
            </label>
            {param.description && (
              <span className="text-xs text-muted-foreground">{param.description}</span>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {param.options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleChange(param.id, option.id)}
                className={cn(
                  'px-3 py-1.5 text-sm rounded-full transition-all duration-200 ease-in-out',
                  selectedOptions[param.id] === option.id
                    ? 'bg-primary text-white shadow-sm' 
                    : 'bg-secondary/80 text-muted-foreground hover:bg-secondary'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ParameterSelector;
