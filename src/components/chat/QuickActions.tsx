'use client';

import { QUICK_ACTIONS } from '@/config/aiProviders';

interface QuickActionsProps {
  onActionClick: (prompt: string) => void;
  disabled?: boolean;
}

export default function QuickActions({ onActionClick, disabled }: QuickActionsProps) {
  return (
    <div className="px-5 py-3 bg-white/50 backdrop-blur-sm border-b border-black/5">
      <div className="flex flex-wrap gap-2">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action.id}
            onClick={() => onActionClick(action.prompt)}
            disabled={disabled}
            className="px-3 py-1.5 bg-black/5 hover:bg-black/10 rounded-full text-[10px] uppercase tracking-[0.12em] font-normal text-black/60 hover:text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
