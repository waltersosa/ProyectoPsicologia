import React from 'react';
import { Home, Settings, Cpu } from 'lucide-react';
import { cn } from '../utils/cn';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const menuItems = [
  { id: 'dashboard', icon: Home, label: 'Dashboard' },
  { id: 'devices', icon: Cpu, label: 'Devices' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <div className="fixed left-0 top-0 h-full w-20 bg-gray-900 flex flex-col items-center py-8">
      <div className="w-12 h-12 bg-blue-500 rounded-xl mb-8 flex items-center justify-center">
        <Cpu className="w-8 h-8 text-white" />
      </div>
      <nav className="flex-1">
        <ul className="space-y-4">
          {menuItems.map(({ id, icon: Icon, label }) => (
            <li key={id}>
              <button
                onClick={() => onNavigate(id)}
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                  "hover:bg-gray-800 group relative",
                  currentPage === id ? "bg-gray-800 text-blue-500" : "text-gray-400"
                )}
              >
                <Icon className="w-6 h-6" />
                <span className="absolute left-full ml-4 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap">
                  {label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}