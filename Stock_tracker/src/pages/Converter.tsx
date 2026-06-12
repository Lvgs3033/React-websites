
import { useState } from 'react';
import { PageContainer } from "@/components/PageContainer";
import { Card } from "@/components/Card";
import { ArrowRightLeft } from "lucide-react";
import { motion } from "framer-motion";

const Converter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(0.93);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  }));

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    const newConvertedAmount = convertCurrency(amount, toCurrency, fromCurrency);
    setConvertedAmount(newConvertedAmount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newConvertedAmount = convertCurrency(amount, fromCurrency, toCurrency);
    setConvertedAmount(newConvertedAmount);
    setLastUpdated(new Date().toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    }));
  };

  return (
    <PageContainer title="Currency Converter">
      <div className="max-w-2xl mx-auto">
        <Card>
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Amount and Currency</label>
              <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-end">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                    min="0"
                    step="0.01"
                    className="w-full bg-secondary/30 border border-border rounded-lg px-8 py-3 focus:ring-2 focus:ring-stock-purple focus:border-transparent outline-none"
                  />
                </div>
                
                <motion.button
                  type="button"
                  onClick={handleSwap}
                  className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRightLeft className="h-5 w-5" />
                </motion.button>
                
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full bg-secondary/30 border border-border rounded-lg px-4 py-3 appearance-none focus:ring-2 focus:ring-stock-purple focus:border-transparent outline-none"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Convert To</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full bg-secondary/30 border border-border rounded-lg px-4 py-3 appearance-none focus:ring-2 focus:ring-stock-purple focus:border-transparent outline-none"
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
            
            <motion.button
              type="submit"
              className="w-full bg-stock-purple text-white font-medium rounded-lg py-3 hover:bg-stock-purple/90 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Convert
            </motion.button>
            
            <div className="mt-6 p-4 bg-secondary/30 rounded-lg border border-border/50 text-center">
              <div className="text-2xl font-semibold text-primary mb-1">
                {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
              </div>
              <div className="text-sm text-muted-foreground">
                Last updated: {lastUpdated}
              </div>
            </div>
          </form>
        </Card>
      </div>
    </PageContainer>
  );
};

const currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CHF", name: "Swiss Franc" }
];

// Mock exchange rates
const exchangeRates: Record<string, Record<string, number>> = {
  USD: { EUR: 0.93, GBP: 0.79, JPY: 149.58, CAD: 1.37, AUD: 1.52, CHF: 0.91, USD: 1 },
  EUR: { USD: 1.08, GBP: 0.85, JPY: 161.52, CAD: 1.48, AUD: 1.64, CHF: 0.98, EUR: 1 },
  GBP: { USD: 1.27, EUR: 1.17, JPY: 189.57, CAD: 1.74, AUD: 1.93, CHF: 1.15, GBP: 1 },
  JPY: { USD: 0.0067, EUR: 0.0062, GBP: 0.0053, CAD: 0.0091, AUD: 0.0102, CHF: 0.0061, JPY: 1 },
  CAD: { USD: 0.73, EUR: 0.68, GBP: 0.57, JPY: 109.41, AUD: 1.11, CHF: 0.66, CAD: 1 },
  AUD: { USD: 0.66, EUR: 0.61, GBP: 0.52, JPY: 98.64, CAD: 0.90, CHF: 0.60, AUD: 1 },
  CHF: { USD: 1.10, EUR: 1.02, GBP: 0.87, JPY: 164.82, CAD: 1.51, AUD: 1.67, CHF: 1 }
};

function convertCurrency(amount: number, fromCurrency: string, toCurrency: string): number {
  // If same currency, return amount
  if (fromCurrency === toCurrency) return amount;
  
  // Get exchange rate
  const rate = exchangeRates[fromCurrency]?.[toCurrency] || 0;
  return amount * rate;
}

export default Converter;
