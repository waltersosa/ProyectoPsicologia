import React, { useState } from 'react';
import { X, Gauge, Thermometer, Map, Table, Activity, Sliders } from 'lucide-react';

interface AddWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (widget: {
    type: string;
    title: string;
    device?: string;
  }) => void;
}

const widgetTypes = [
  { id: 'gauge', name: 'Gauge', icon: Gauge },
  { id: 'thermometer', name: 'Thermometer', icon: Thermometer },
  { id: 'map', name: 'Map', icon: Map },
  { id: 'frequency', name: 'Frequency Table', icon: Table },
  { id: 'indicator', name: 'Status Indicator', icon: Activity },
  { id: 'slider', name: 'Control Slider', icon: Sliders },
];

export function AddWidgetModal({ isOpen, onClose, onAdd }: AddWidgetModalProps) {
  const [widgetData, setWidgetData] = useState({
    type: 'gauge',
    title: '',
    device: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(widgetData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Widget</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Widget Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {widgetTypes.map(({ id, name, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setWidgetData({ ...widgetData, type: id })}
                  className={`p-3 rounded-lg flex flex-col items-center gap-2 transition-colors ${
                    widgetData.type === id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-sm">{name}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Widget Title
            </label>
            <input
              type="text"
              value={widgetData.title}
              onChange={(e) => setWidgetData({ ...widgetData, title: e.target.value })}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Connected Device
            </label>
            <select
              value={widgetData.device}
              onChange={(e) => setWidgetData({ ...widgetData, device: e.target.value })}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
            >
              <option value="">Select a device</option>
              <option value="device1">Living Room ESP32</option>
              <option value="device2">Kitchen ESP8266</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 mt-4"
          >
            Add Widget
          </button>
        </form>
      </div>
    </div>
  );
}