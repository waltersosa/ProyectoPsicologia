import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (device: {
    name: string;
    type: string;
    ipAddress: string;
  }) => void;
}

export function AddDeviceModal({ isOpen, onClose, onAdd }: AddDeviceModalProps) {
  const [deviceData, setDeviceData] = useState({
    name: '',
    type: 'ESP32',
    ipAddress: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(deviceData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Device</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Device Name
            </label>
            <input
              type="text"
              value={deviceData.name}
              onChange={(e) => setDeviceData({ ...deviceData, name: e.target.value })}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Device Type
            </label>
            <select
              value={deviceData.type}
              onChange={(e) => setDeviceData({ ...deviceData, type: e.target.value })}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
            >
              <option value="ESP32">ESP32</option>
              <option value="ESP8266">ESP8266</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              IP Address
            </label>
            <input
              type="text"
              value={deviceData.ipAddress}
              onChange={(e) => setDeviceData({ ...deviceData, ipAddress: e.target.value })}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
              placeholder="192.168.1.100"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 mt-4"
          >
            Add Device
          </button>
        </form>
      </div>
    </div>
  );
}