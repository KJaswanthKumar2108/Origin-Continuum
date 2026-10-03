import React from 'react';
import { Layers, Clock, Settings2 } from 'lucide-react';
import { NavigationTab } from '../types';

interface BottomNavBarProps {
  currentTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  momentsCount?: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentTab,
  onTabChange,
  momentsCount = 2,
}) => {
  return (
    <div
      id="origin-bottom-nav"
      className="w-full px-5 py-2 shrink-0 bg-[#0c0d12]/90 backdrop-blur-xl border-t border-white/10 flex items-center justify-around z-30"
    >
      <button
        id="nav-tab-continuum"
        onClick={() => onTabChange('continuum')}
        className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition-all ${
          currentTab === 'continuum'
            ? 'text-[#FFE600] font-semibold'
            : 'text-neutral-400 hover:text-white'
        }`}
      >
        <div
          className={`relative p-1 rounded-lg transition-colors ${
            currentTab === 'continuum' ? 'bg-[#FFE600]/15' : ''
          }`}
        >
          <Layers className="w-4 h-4" strokeWidth={currentTab === 'continuum' ? 2.5 : 1.8} />
          {currentTab === 'continuum' && (
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#FFE600] animate-ping" />
          )}
        </div>
        <span className="text-[11px] tracking-tight">Continuum</span>
      </button>

      <button
        id="nav-tab-moments"
        onClick={() => onTabChange('moments')}
        className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition-all relative ${
          currentTab === 'moments'
            ? 'text-[#FFE600] font-semibold'
            : 'text-neutral-400 hover:text-white'
        }`}
      >
        <div
          className={`relative p-1 rounded-lg transition-colors ${
            currentTab === 'moments' ? 'bg-[#FFE600]/15' : ''
          }`}
        >
          <Clock className="w-4 h-4" strokeWidth={currentTab === 'moments' ? 2.5 : 1.8} />
          {momentsCount > 0 && (
            <span className="absolute -top-1 -right-1 text-[9px] font-mono px-1 rounded-full bg-[#FFE600] text-black font-bold">
              {momentsCount}
            </span>
          )}
        </div>
        <span className="text-[11px] tracking-tight">Moments</span>
      </button>

      <button
        id="nav-tab-settings"
        onClick={() => onTabChange('settings')}
        className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition-all ${
          currentTab === 'settings'
            ? 'text-[#FFE600] font-semibold'
            : 'text-neutral-400 hover:text-white'
        }`}
      >
        <div
          className={`p-1 rounded-lg transition-colors ${
            currentTab === 'settings' ? 'bg-[#FFE600]/15' : ''
          }`}
        >
          <Settings2 className="w-4 h-4" strokeWidth={currentTab === 'settings' ? 2.5 : 1.8} />
        </div>
        <span className="text-[11px] tracking-tight">Settings</span>
      </button>
    </div>
  );
};
