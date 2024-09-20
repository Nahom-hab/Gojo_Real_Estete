import { useState } from 'react';
import { motion } from 'framer-motion';

function RentAffordabilityCalculator() {
    const [netIncome, setNetIncome] = useState('');
    const [debt, setDebt] = useState('');
    const [savings, setSavings] = useState('');
    const [expenses, setExpenses] = useState('');
    const [result, setResult] = useState(null);

    const calculateAffordability = () => {
        const grossIncome = parseFloat(netIncome) / 0.85; // Assumes 25% tax rate
        const maxRent = grossIncome * 0.4; // 40% of gross income
        const affordableRent = maxRent - parseFloat(debt) - parseFloat(savings) - parseFloat(expenses);

        const leftOver = grossIncome - (affordableRent + parseFloat(debt) + parseFloat(savings) + parseFloat(expenses));

        setResult({
            rent: affordableRent > 0 ? affordableRent : 0,
            percent: (affordableRent / grossIncome) * 100,
            leftOver: leftOver > 0 ? leftOver : 0
        });
    };

    return (
        <div className=" bg-white flex items-center justify-center px-8 pt-20 ">
            <motion.div
                className="max-w-7xl w-full bg-white shadow-lg rounded-lg p-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Left Side: Input Fields */}
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold text-center md:text-left">Rent Affordability Calculator</h1>
                    <p className="text-gray-600 text-left">
                        This calculator shows rentals that fit your budget. Savings, debt, and other expenses could impact the amount you want to spend on rent each month.
                    </p>

                    {/* Input Fields */}
                    <div className="space-y-4">
                        <div className='flex gap-16'>
                            <div>
                                <label className="block truncate text-[14px] md:text-md text-gray-700">Monthly Net Income:</label>
                                <input
                                    type="number"
                                    value={netIncome}
                                    onChange={(e) => setNetIncome(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    placeholder="monthly income"
                                />
                            </div>

                            <div>
                                <label className="block truncate text-[14px] md:text-md text-gray-700">Monthly Debts:</label>
                                <input
                                    type="number"
                                    value={debt}
                                    onChange={(e) => setDebt(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    placeholder="monthly debt"
                                />
                            </div>
                        </div>
                        <div className='flex gap-16'>
                            <div>
                                <label className="block truncate text-[14px] md:text-md text-gray-700">Monthly Savings:</label>
                                <input
                                    type="number"
                                    value={savings}
                                    onChange={(e) => setSavings(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    placeholder="monthly savings"
                                />
                            </div>

                            <div>
                                <label className="block truncate text-[14px] md:text-md text-gray-700">Monthly Expenses:</label>
                                <input
                                    type="number"
                                    value={expenses}
                                    onChange={(e) => setExpenses(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    placeholder="monthly expenses"
                                />
                            </div>

                        </div>


                        <div className="text-center md:text-left">
                            <button
                                onClick={calculateAffordability}
                                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                            >
                                Calculate Rent
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side: Results Display */}
                <div className="flex flex-col justify-center space-y-6">
                    {result ? (
                        <>
                            {result.rent > 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6 }}
                                    className="space-y-4"
                                >
                                    <p className="text-2xl font-bold text-green-600">
                                        You can afford <span className=' md:default'><span className='text-[15px]'>ETB</span><span className='text-3xl'>{result.rent.toFixed(0)}</span>  /month</span>
                                    </p>
                                    <p className="text-gray-700">
                                        Based on your income, a rental at this price should fit comfortably within your budget.
                                    </p>
                                    <p className="text-gray-700">
                                        You will have <span className="font-bold">{result.leftOver.toFixed(0)}birr /month</span> left to spend.
                                    </p>
                                    <p className="text-gray-700">
                                        Rent accounts for <span className="font-bold">{result.percent.toFixed(0)}%</span> of your gross income.
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6 }}
                                    className="space-y-4"
                                >
                                    <p className="text-2xl font-bold text-red-600">
                                        Sorry, you cannot afford any rent after your expenses.
                                    </p>

                                    {/* Calculate the shortfall */}
                                    <p className="text-gray-700">
                                        You are short by <span className="font-bold text-red-600">${Math.abs(result.rent.toFixed(0))}</span> for rent.
                                    </p>

                                    {/* Suggested income increase */}
                                    <p className="text-gray-700">
                                        To afford rent, you would need to increase your monthly income by <span className="font-bold text-blue-600">
                                            ${((Math.abs(result.rent.toFixed(0)) / 0.4) / 0.75).toFixed(0)}</span>.
                                    </p>

                                    <p className="text-gray-500 italic">
                                        Consider ways to reduce expenses or increase income to meet your housing goals.
                                    </p>
                                </motion.div>
                            )}



                            <div className="mt-4">
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-300">
                                    <div
                                        className={`h-2.5 rounded-full ${result.percent > 100 ? 'bg-red-600' : 'bg-blue-600'}`}
                                        style={{ width: `${result.percent > 100 ? 100 : result.percent}%` }}
                                    />
                                </div>
                            </div>

                            <p className="text-sm mt-4 text-gray-500">
                                DISCLAIMER: The calculated output is just a suggestion. All personal and financial factors should be considered before signing a lease.
                            </p>
                        </>
                    ) : (
                        <div className="bg-white p-6 py-10 rounded-lg shadow-lg space-y-6 text-center md:text-left">
                            <motion.h2
                                className="text-2xl font-bold text-blue-600"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                Ready to Find Your Perfect Rental?
                            </motion.h2>

                            <motion.div
                                className="flex justify-center md:justify-start items-center gap-3 text-gray-600"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <p className="text-lg font-medium">
                                    Enter your financial details to find out what rental fits within your budget.
                                </p>
                            </motion.div>

                            <motion.div
                                className="text-gray-700 flex flex-col md:flex-row justify-center md:justify-start gap-2 items-center"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <p className="text-md font-medium tracking-wide">
                                    This tool will estimate your rent affordability based on your income, debts, and expenses.
                                </p>
                            </motion.div>

                            <motion.div
                                className="text-sm text-gray-500 italic"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                <p>
                                    Note: Keep in mind, taxes and savings may impact your budget. It's important to consider all personal factors.
                                </p>
                            </motion.div>
                        </div>

                    )}
                </div>
            </motion.div>

        </div>
    );
}

export default RentAffordabilityCalculator;
