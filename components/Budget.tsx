import React, { useState, useMemo } from 'react';
import { Wallet, CheckCircle2 } from 'lucide-react';
import { ItineraryItem } from '../types';
import SharedFooter from './SharedFooter';

interface BudgetProps {
    itinerary: ItineraryItem[];
}

const Budget: React.FC<BudgetProps> = ({ itinerary }) => {
    const [currency, setCurrency] = useState<'DKK' | 'EUR'>('DKK');
    const [calcAmount, setCalcAmount] = useState('');
    const [calcDirection, setCalcDirection] = useState<'DKK_TO_EUR' | 'EUR_TO_DKK'>('DKK_TO_EUR');
    const RATE = 7.46;

    const paidActivities = useMemo(() => itinerary.filter(a => a.priceDKK > 0), [itinerary]);
    const total = useMemo(() => paidActivities.reduce((acc, curr) => acc + (currency === 'EUR' ? curr.priceEUR : curr.priceDKK), 0), [paidActivities, currency]);
    
    const [manualExpenses, setManualExpenses] = useState<{name: string; cost: number}[]>([]);
    const [newExpenseName, setNewExpenseName] = useState('');
    const [newExpenseCost, setNewExpenseCost] = useState('');

    const addExpense = () => {
        if(newExpenseName && newExpenseCost) {
            setManualExpenses([...manualExpenses, { name: newExpenseName, cost: parseFloat(newExpenseCost) }]);
            setNewExpenseName('');
            setNewExpenseCost('');
        }
    };
    const manualTotal = manualExpenses.reduce((acc, curr) => acc + curr.cost, 0);
    
    const completedActivities = paidActivities.filter(a => a.completed);
    const spent = completedActivities.reduce((acc, curr) => acc + (currency === 'EUR' ? curr.priceEUR : curr.priceDKK), 0) + manualTotal;
    const progressPct = Math.min(100, (spent / (total + manualTotal || 1)) * 100);

    const calcResult = useMemo(() => {
        const val = parseFloat(calcAmount);
        if(isNaN(val)) return '---';
        if(calcDirection === 'DKK_TO_EUR') return (val / RATE).toFixed(2) + ' €';
        return (val * RATE).toFixed(0) + ' DKK';
    }, [calcAmount, calcDirection]);

    return (
        <div className="pb-32 px-4 pt-6 max-w-lg mx-auto h-full overflow-y-auto">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-slate-700 flex items-center"><Wallet size={16} className="mr-2"/> Calculadora Rápida</h3>
                    <button 
                        onClick={() => setCalcDirection(prev => prev === 'DKK_TO_EUR' ? 'EUR_TO_DKK' : 'DKK_TO_EUR')}
                        className="text-xs bg-fjord-50 text-fjord-600 px-2 py-1 rounded border border-fjord-100 font-bold"
                    >
                        ⇄ {calcDirection === 'DKK_TO_EUR' ? 'DKK → EUR' : 'EUR → DKK'}
                    </button>
                </div>
                <div className="flex gap-4 items-center">
                    <input 
                        type="number" 
                        value={calcAmount}
                        onChange={e => setCalcAmount(e.target.value)}
                        placeholder="0"
                        className="w-1/2 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xl font-bold text-slate-800 focus:outline-none focus:border-fjord-500 select-text"
                    />
                    <div className="text-2xl font-bold text-fjord-600">
                        = {calcResult}
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-fjord-500">Presupuesto</h2>
                <div className="flex bg-slate-200 rounded-lg p-1">
                    <button onClick={() => setCurrency('EUR')} className={`px-3 py-1 text-sm rounded-md font-bold transition-colors ${currency === 'EUR' ? 'bg-white shadow text-fjord-600' : 'text-slate-500'}`}>EUR</button>
                    <button onClick={() => setCurrency('DKK')} className={`px-3 py-1 text-sm rounded-md font-bold transition-colors ${currency === 'DKK' ? 'bg-white shadow text-fjord-600' : 'text-slate-500'}`}>DKK</button>
                </div>
            </div>

            <div className="bg-gradient-to-r from-fjord-500 to-fjord-600 rounded-xl p-6 text-white shadow-lg mb-8">
                <div className="flex justify-between items-end mb-2">
                    <div>
                        <p className="text-fjord-100 text-sm uppercase tracking-wide">Gastado</p>
                        <div className="text-4xl font-bold">{currency === 'EUR' ? `€${spent.toFixed(0)}` : `${spent.toFixed(0)} kr`}</div>
                    </div>
                    <div className="text-right opacity-80">
                        <p className="text-xs">Presupuesto</p>
                        <p className="font-bold">{currency === 'EUR' ? `€${total.toFixed(0)}` : `${total.toFixed(0)} kr`}</p>
                    </div>
                </div>
                <div className="w-full bg-black/20 rounded-full h-2 mt-2">
                    <div className="bg-sunset-500 h-2 rounded-full transition-all duration-500" style={{width: `${progressPct}%`}}></div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 mb-8 overflow-hidden">
                {paidActivities.map((act) => (
                    <div key={act.id} className="flex justify-between items-center p-4 border-b border-slate-50 last:border-0">
                        <div className="flex items-center">
                            <div 
                                className={`w-4 h-4 rounded-full mr-3 border cursor-pointer flex items-center justify-center ${act.completed ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-slate-300'}`}
                            >
                                {act.completed && <CheckCircle2 size={12} className="text-white"/>}
                            </div>
                            <p className="text-sm font-medium text-gray-800">{act.title}</p>
                        </div>
                        <div className="font-bold text-gray-700">
                            {currency === 'EUR' ? `€${act.priceEUR}` : `${act.priceDKK} kr`}
                        </div>
                    </div>
                ))}
                {manualExpenses.map((exp, i) => (
                        <div key={`man-${i}`} className="flex justify-between items-center p-4 border-b border-slate-50 bg-yellow-50/50">
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full mr-3 bg-sunset-500"></div>
                            <p className="text-sm font-medium text-gray-800">{exp.name} (Manual)</p>
                        </div>
                        <div className="font-bold text-gray-700">
                            {currency === 'EUR' ? `€${exp.cost}` : `${exp.cost} kr`}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <h4 className="text-sm font-bold text-slate-700 mb-3">+ Añadir Gasto Extra</h4>
                <div className="flex gap-2 mb-2">
                    <input type="text" placeholder="Concepto" className="flex-1 p-2 border rounded text-sm select-text" value={newExpenseName} onChange={e => setNewExpenseName(e.target.value)} />
                    <input type="number" placeholder="Precio" className="w-20 p-2 border rounded text-sm select-text" value={newExpenseCost} onChange={e => setNewExpenseCost(e.target.value)} />
                </div>
                <button onClick={addExpense} className="w-full bg-slate-200 text-slate-700 font-bold py-2 rounded text-sm hover:bg-slate-300">Añadir</button>
            </div>

            <SharedFooter />
        </div>
    );
};

export default Budget;