import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DeviceCard } from './components/DeviceCard';
import { StatusChart } from './components/StatusChart';
import { Settings } from './components/Settings';
import { Devices } from './components/Devices';
import { AddWidgetModal } from './components/AddWidgetModal';
import { Plus } from 'lucide-react';

const mockTemperatureData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  value: 20 + Math.random() * 8
}));

const mockHumidityData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  value: 40 + Math.random() * 20
}));

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isAddWidgetModalOpen, setIsAddWidgetModalOpen] = useState(false);

  const handleAddWidget = (widgetData: { type: string; title: string; device?: string }) => {
    // Handle widget addition logic here
    console.log('Adding widget:', widgetData);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold">IoT Dashboard</h1>
                <p className="text-gray-400">Monitor and control your IoT devices</p>
              </div>
              <button
                onClick={() => setIsAddWidgetModalOpen(true)}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2"
              >
                <Plus className="w-5 h-5" />
                Add Widget
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StatusChart
                data={mockTemperatureData}
                title="Temperature History"
                unit="°C"
                color="#3b82f6"
              />
              <StatusChart
                data={mockHumidityData}
                title="Humidity History"
                unit="%"
                color="#10b981"
              />
            </div>
          </>
        );
      case 'devices':
        return <Devices />;
      case 'settings':
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="ml-20 p-8">
        {renderContent()}
      </main>

      <AddWidgetModal
        isOpen={isAddWidgetModalOpen}
        onClose={() => setIsAddWidgetModalOpen(false)}
        onAdd={handleAddWidget}
      />
    </div>
  );
}

export default App;