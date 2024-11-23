import React, { useState } from 'react';
import InvestmentForm from './components/InvestmentForm';
import InvestmentList from './components/InvestmentList';
import { FiPlusCircle, FiList } from 'react-icons/fi';

function App() {
  const [currentView, setCurrentView] = useState<'form' | 'list'>('form');

  return (
    <div>
      <div className="fixed bottom-6 right-6 flex gap-4 z-50">
        <button
          onClick={() => setCurrentView('list')}
          className={`p-4 rounded-full shadow-lg transition-all duration-300 ${
            currentView === 'list'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-purple-600 hover:bg-purple-100'
          }`}
        >
          <FiList className="text-2xl" />
        </button>
        <button
          onClick={() => setCurrentView('form')}
          className={`p-4 rounded-full shadow-lg transition-all duration-300 ${
            currentView === 'form'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-purple-600 hover:bg-purple-100'
          }`}
        >
          <FiPlusCircle className="text-2xl" />
        </button>
      </div>
      
      {currentView === 'form' ? <InvestmentForm /> : <InvestmentList />}
    </div>
  );
}

export default App;