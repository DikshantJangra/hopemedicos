'use client';

import { QUICK_ACTIONS } from '@/config/aiProviders';
import { AiOutlineClockCircle, AiOutlineMedicineBox } from 'react-icons/ai';
import { MdOutlineLocationOn, MdOutlinePhone } from 'react-icons/md';

interface QuickActionsProps {
  onActionClick: (prompt: string) => void;
  disabled?: boolean;
}

const getIcon = (id: string) => {
  switch (id) {
    case 'store-hours': return <AiOutlineClockCircle />;
    case 'location': return <MdOutlineLocationOn />;
    case 'contact': return <MdOutlinePhone />;
    case 'services': return <AiOutlineMedicineBox />;
    default: return null;
  }
};

export default function QuickActions({ onActionClick, disabled }: QuickActionsProps) {
  return (
    <div className="px-5 py-4 bg-white border-b border-gray-50">
      <div className="flex flex-wrap gap-2">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action.id}
            onClick={() => onActionClick(action.prompt)}
            disabled={disabled}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-lg text-xs font-medium text-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-brand opacity-80">{getIcon(action.id)}</span>
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
