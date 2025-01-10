import React from 'react';
import { Power, Thermometer, Droplets, Wifi } from 'lucide-react';

interface DeviceCardProps {
  device: {
    id: string;
    name: string;
    type: string;
    status: 'online' | 'offline';
    temperature?: number;
    humidity?: number;
    lastSeen?: string;
  };
  onToggle: (id: string) => void;
}

export function DeviceCard({ device, onToggle }: DeviceCardProps) {
  const isOnline = device.status === 'online';

  return (
    <div className="bg-gray-800 rounded-xl p-6 transition-all hover:shadow-lg hover:shadow-blue-500/10">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{device.name}</h3>
          <p className="text-sm text-gray-400">{device.type}</p>
        </div>
        <button
          onClick={() => onToggle(device.id)}
          className={`p-2 rounded-lg transition-colors ${
            isOnline ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'
          }`}
        >
          <Power className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center text-gray-300">
          <Wifi className="w-4 h-4 mr-2" />
          <span className={isOnline ? 'text-green-400' : 'text-red-400'}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
        
        {device.temperature && (
          <div className="flex items-center text-gray-300">
            <Thermometer className="w-4 h-4 mr-2" />
            <span>{device.temperature}°C</span>
          </div>
        )}
        
        {device.humidity && (
          <div className="flex items-center text-gray-300">
            <Droplets className="w-4 h-4 mr-2" />
            <span>{device.humidity}%</span>
          </div>
        )}
      </div>
      
      {device.lastSeen && (
        <p className="mt-4 text-xs text-gray-500">
          Last seen: {device.lastSeen}
        </p>
      )}
    </div>
  );
}