import React, { useEffect, useState } from 'react';
import { FiSearch, FiTrash2, FiEye } from 'react-icons/fi';
import { getAllInvestments, Investment } from '../db/database';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function InvestmentList() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);

  useEffect(() => {
    loadInvestments();
  }, []);

  const loadInvestments = async () => {
    try {
      const data = await getAllInvestments();
      setInvestments(data.sort((a, b) => {
        return new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime();
      }));
    } catch (error) {
      console.error('Error loading investments:', error);
    }
  };

  const filteredInvestments = investments.filter(inv => 
    inv.investmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.investmentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.portfolio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount: string) => {
    const num = parseFloat(amount.replace(/[^\d.-]/g, ''));
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(num);
  };

  return (
    <div className="min-h-screen py-6 sm:py-10 px-4 sm:px-6">
      <div className="w-full max-w-6xl mx-auto">
        <div className="form-container p-6 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-8 text-center">
            INVERSIONES REGISTRADAS
          </h2>

          <div className="relative mb-6">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-xl" />
              <input
                type="text"
                placeholder="Buscar inversión..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-purple-600">
                  <th className="py-3 px-4 text-left">Nombre</th>
                  <th className="py-3 px-4 text-left hidden sm:table-cell">Tipo</th>
                  <th className="py-3 px-4 text-left">Monto</th>
                  <th className="py-3 px-4 text-left hidden md:table-cell">Portafolio</th>
                  <th className="py-3 px-4 text-left hidden lg:table-cell">Fecha</th>
                  <th className="py-3 px-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvestments.map((investment) => (
                  <tr key={investment.id} className="border-b border-purple-600/30 hover:bg-purple-900/20">
                    <td className="py-3 px-4">{investment.investmentName}</td>
                    <td className="py-3 px-4 hidden sm:table-cell">{investment.investmentType}</td>
                    <td className="py-3 px-4">{formatCurrency(investment.amount)}</td>
                    <td className="py-3 px-4 hidden md:table-cell">{investment.portfolio}</td>
                    <td className="py-3 px-4 hidden lg:table-cell">
                      {investment.createdAt && format(new Date(investment.createdAt), 'dd/MM/yyyy', { locale: es })}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => setSelectedInvestment(investment)}
                          className="p-2 hover:bg-purple-600 rounded-full transition-colors"
                        >
                          <FiEye className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredInvestments.length === 0 && (
            <div className="text-center text-white py-8">
              No se encontraron inversiones
            </div>
          )}
        </div>
      </div>

      {/* Modal de detalles */}
      {selectedInvestment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="form-container p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6">
              Detalles de la Inversión
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-purple-300">Nombre:</label>
                <p className="text-white">{selectedInvestment.investmentName}</p>
              </div>
              <div>
                <label className="text-purple-300">Tipo de Inversión:</label>
                <p className="text-white">{selectedInvestment.investmentType}</p>
              </div>
              <div>
                <label className="text-purple-300">Monto:</label>
                <p className="text-white">{formatCurrency(selectedInvestment.amount)}</p>
              </div>
              <div>
                <label className="text-purple-300">Banco:</label>
                <p className="text-white">{selectedInvestment.bankType}</p>
              </div>
              <div>
                <label className="text-purple-300">Tasa de Interés:</label>
                <p className="text-white">{selectedInvestment.interestRate}%</p>
              </div>
              <div>
                <label className="text-purple-300">Fecha de Retorno:</label>
                <p className="text-white">{format(new Date(selectedInvestment.returnDate), 'dd/MM/yyyy', { locale: es })}</p>
              </div>
              <div>
                <label className="text-purple-300">Portafolio:</label>
                <p className="text-white">{selectedInvestment.portfolio}</p>
              </div>
              <div>
                <label className="text-purple-300">Descripción:</label>
                <p className="text-white">{selectedInvestment.description}</p>
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setSelectedInvestment(null)}
                className="submit-button text-white font-bold py-2 px-8 rounded-full"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}