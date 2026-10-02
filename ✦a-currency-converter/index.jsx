const { useState, useMemo } = React;

const exchangeRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  JPY: 156.7,
};

export function CurrencyConverter() {
  const [amount, setAmount] = useState(10);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  
  const baseAmountInUSD = useMemo(() => {

    const rate = exchangeRates[fromCurrency] || 1;
    return amount / rate;
  }, [amount, fromCurrency]);

  const convertedAmount = (baseAmountInUSD * exchangeRates[toCurrency]).toFixed(2);

  return (
    <div className="currency-converter">
      <h2>Currency Converter</h2>
      
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
      </select>

      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
      </select>

      <p>{`${convertedAmount} ${toCurrency}`}</p>
    </div>
  );
}