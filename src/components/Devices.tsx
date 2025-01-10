import React, { useState } from 'react';
import { DeviceCard } from './DeviceCard';
import { AddDeviceModal } from './AddDeviceModal';
import { Plus } from 'lucide-react';

interface Device {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline';
  temperature?: number;
  humidity?: number;
  lastSeen?: string;
  ipAddress: string;
}

export function Devices() {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'Living Room ESP32',
      type: 'ESP32',
      status: 'online',
      temperature: 23.5,
      humidity: 45,
      lastSeen: '2 minutes ago',
      ipAddress: '192.168.1.100'
    },
    {
      id: '2',
      name: 'Kitchen ESP8266',
      type: 'ESP8266',
      status: 'online',
      temperature: 25.8,
      humidity: 52,
      lastSeen: '1 minute ago',
      ipAddress: '192.168.1.101'
    }
  ]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddDevice = (deviceData: { name: string; type: string; ipAddress: string }) => {
    const newDevice: Device = {
      id: Date.now().toString(),
      ...deviceData,
      status: 'online',
      lastSeen: 'Just now'
    };
    setDevices([...devices, newDevice]);
  };

  const handleDeviceToggle = (id: string) => {
    setDevices(devices.map(device =>
      device.id === id
        ? { ...device, status: device.status === 'online' ? 'offline' : 'online' }
        : device
    ));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Devices</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2"
        >
          <Plus className="w-5 h-5" />
          Add Device
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map(device => (
          <DeviceCard
            key={device.id}
            device={device}
            onToggle={handleDeviceToggle}
          />
        ))}
      </div>

      <AddDeviceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddDevice}
      />
    </div>
  );
}