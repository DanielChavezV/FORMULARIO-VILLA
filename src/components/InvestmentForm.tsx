import React, { useState } from 'react';
import { FiHome, FiBell, FiUser, FiChevronDown } from 'react-icons/fi';
import { toast, Toaster } from 'react-hot-toast';
import { saveInvestment, Investment } from '../db/database';

const initialFormData: Investment = {
  investmentType: '',
  investmentName: '',
  amount: '',
  bankType: '',
  interestRate: '',
  returnDate: '',
  description: '',
  portfolio: ''
};

const investmentTypes = [
  'Acciones',
  'Bonos',
  'Fondos mutuos',
  'Bienes raíces',
  'Certificados de depósito',
  'ETFs',
  'Criptomonedas',
  'Materias primas',
  'Divisas',
  'Fondos indexados',
  'Startups',
  'Fondos de pensiones',
  'Derivados',
  'Arte y coleccionables'
];

const bankTypes = [
  'Bancolombia',
  'Davivienda',
  'Banco de Bogotá',
  'BBVA Colombia',
  'Banco Itaú',
  'Scotiabank Colpatria',
  'Banco de Occidente',
  'Banco AV Villas',
  'Banco Popular',
  'GNB Sudameris'
];

export default function InvestmentForm() {
  const [formData, setFormData] = useState<Investment>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.investmentType || !formData.investmentName || !formData.amount) {
      toast.error('Por favor complete todos los campos requeridos');
      return;
    }

    setIsSubmitting(true);
    try {
      await saveInvestment(formData);
      toast.success('¡Inversión creada exitosamente!');
      setFormData(initialFormData);
    } catch (error) {
      toast.error('Error al guardar la inversión');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen py-6 sm:py-10 px-4 sm:px-6 flex items-center justify-center">
      <Toaster position="top-right" />
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12 gap-4">
          <div className="header-title w-full sm:w-auto text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-white m-0">SIMULADOR DE INVERSIONES</h1>
          </div>
          <div className="flex gap-6 sm:gap-8">
            <FiHome className="text-white text-xl sm:text-2xl cursor-pointer hover:text-purple-300 transition-colors" />
            <FiBell className="text-white text-xl sm:text-2xl cursor-pointer hover:text-purple-300 transition-colors" />
            <FiUser className="text-white text-xl sm:text-2xl cursor-pointer hover:text-purple-300 transition-colors" />
          </div>
        </div>

        <div className="form-container p-6 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-8 sm:mb-10 text-center">CREAR NUEVO REGISTRO</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="relative">
                <label className="block text-white mb-2 sm:mb-3 font-medium text-base sm:text-lg">Tipo de Inversión</label>
                <div className="relative">
                  <select
                    name="investmentType"
                    value={formData.investmentType}
                    onChange={handleChange}
                    className="w-full rounded-lg px-4 sm:px-5 py-3 sm:py-4 appearance-none"
                    required
                  >
                    <option value="">Seleccionar tipo</option>
                    {investmentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-white mb-2 sm:mb-3 font-medium text-base sm:text-lg">Nombre Inversión</label>
                <input
                  type="text"
                  name="investmentName"
                  value={formData.investmentName}
                  onChange={handleChange}
                  className="w-full rounded-lg px-4 sm:px-5 py-3 sm:py-4"
                  placeholder="Nombre de la inversión"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2 sm:mb-3 font-medium text-base sm:text-lg">Monto a Invertir</label>
                <input
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full rounded-lg px-4 sm:px-5 py-3 sm:py-4"
                  placeholder="$ XXX,XXX.XX"
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-white mb-2 sm:mb-3 font-medium text-base sm:text-lg">Banco</label>
                <div className="relative">
                  <select
                    name="bankType"
                    value={formData.bankType}
                    onChange={handleChange}
                    className="w-full rounded-lg px-4 sm:px-5 py-3 sm:py-4 appearance-none"
                    required
                  >
                    <option value="">Seleccionar banco</option>
                    {bankTypes.map(bank => (
                      <option key={bank} value={bank}>{bank}</option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-white mb-2 sm:mb-3 font-medium text-base sm:text-lg">Tasa de Interés</label>
                <input
                  type="text"
                  name="interestRate"
                  value={formData.interestRate}
                  onChange={handleChange}
                  className="w-full rounded-lg px-4 sm:px-5 py-3 sm:py-4"
                  placeholder="% Interés"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2 sm:mb-3 font-medium text-base sm:text-lg">Fecha de Retorno</label>
                <input
                  type="date"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  className="w-full rounded-lg px-4 sm:px-5 py-3 sm:py-4"
                  required
                />
              </div>
            </div>

            <div className="my-6 sm:my-8">
              <label className="block text-white mb-2 sm:mb-3 font-medium text-base sm:text-lg">Descripción Inversión</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-lg px-4 sm:px-5 py-3 sm:py-4 h-32 sm:h-40 resize-none"
                placeholder="Descripción de la inversión"
              />
            </div>

            <div className="relative mb-8 sm:mb-10">
              <label className="block text-white mb-2 sm:mb-3 font-medium text-base sm:text-lg">Anexar al Portafolio</label>
              <div className="relative">
                <select
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  className="w-full rounded-lg px-4 sm:px-5 py-3 sm:py-4 appearance-none"
                  required
                >
                  <option value="">Seleccionar portafolio</option>
                  <option value="personal">Personal</option>
                  <option value="empresa">Empresa</option>
                </select>
                <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white pointer-events-none" />
              </div>
            </div>

            <div className="flex justify-center pt-4 sm:pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button text-white font-bold py-3 sm:py-4 px-12 sm:px-16 rounded-full text-lg sm:text-xl transform transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Guardando...' : '¡CREAR INVERSIÓN!'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}