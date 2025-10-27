import React, { useState, useEffect } from 'react';
import './SwapRate.css';

function SwapRate() {
  // Main state variables
  const [realRate, setRealRate] = useState(1.1);
  const [inputAmount, setInputAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [isEurToUsd, setIsEurToUsd] = useState(true);
  const [fixedRate, setFixedRate] = useState('');
  const [isFixedRateActive, setIsFixedRateActive] = useState(false);
  const [history, setHistory] = useState([]);

  // Generate random variation between -0.05 and +0.05
  const generateRandomVariation = () => {
    return (Math.random() - 0.5) * 0.1;
  };

  // Update real rate every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRealRate(prevRate => {
        const variation = generateRandomVariation();
        // Make sure the rate is at least 0.1 
        // This value is set randomly to avoid 0 or negative rates
        return Math.max(0.1, prevRate + variation);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Check if fixed rate variation exceeds 2%
  const checkFixedRateVariation = (showAlert = false) => {
    if (isFixedRateActive && fixedRate) {
      const fixedRateNum = parseFloat(fixedRate);
      const variation = Math.abs(realRate - fixedRateNum) / realRate;
      if (variation > 0.02) {
        setIsFixedRateActive(false);
        setFixedRate('');
        if (showAlert) {
          alert('Fixed rate variation exceeds 2%. Fixed rate has been deactivated.');
        }
        return true; // Variation too high
      }
    }
    return false; // Variation acceptable
  };

  // Check for 2% variation to disable fixed rate
  useEffect(() => {
    checkFixedRateVariation(false);
  }, [realRate, fixedRate, isFixedRateActive]);

  // Conversion function
  const convertAmount = (amount, fromEurToUsd, rate) => {
    if (!amount || isNaN(amount)) return '';
    const numAmount = parseFloat(amount);
    return fromEurToUsd 
      ? (numAmount * rate).toFixed(2) 
      : (numAmount / rate).toFixed(2);
  };

  // Calculate and update conversion
  const calculateConversion = () => {
    if (inputAmount) {
      const rate = isFixedRateActive ? parseFloat(fixedRate) : realRate;
      const converted = convertAmount(inputAmount, isEurToUsd, rate);
      setConvertedAmount(converted);
      return { rate, converted };
    }
    return null;
  };

  // Update conversion when parameters change
  useEffect(() => {
    calculateConversion();
  }, [inputAmount, isEurToUsd, realRate, fixedRate, isFixedRateActive]);

  // Handle currency switch with value continuity
  const handleCurrencySwitch = () => {
    if (convertedAmount) {
      setInputAmount(convertedAmount);
    }
    setIsEurToUsd(!isEurToUsd);
  };

  // Add to history
  const addToHistory = (inputVal, outputVal, usedRateValue, fixedRateValue) => {
    if (inputVal && outputVal) {
      const newEntry = {
        id: Date.now(),
        realRate: realRate.toFixed(4),
        usedRate: usedRateValue.toFixed(4),
        fixedRate: fixedRateValue || '-',
        inputValue: parseFloat(inputVal).toFixed(2),
        inputCurrency: isEurToUsd ? 'EUR' : 'USD',
        outputValue: parseFloat(outputVal).toFixed(2),
        outputCurrency: isEurToUsd ? 'USD' : 'EUR',
        timestamp: new Date().toLocaleTimeString()
      };

      setHistory(prev => [newEntry, ...prev].slice(0, 5));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if fixed rate variation is acceptable before calculations
    if (checkFixedRateVariation(true)) {
      return; // Variation too high, stop processing
    }
    
    // Recalculate the conversion with current values
    const conversionResult = calculateConversion();
    if (conversionResult) {
      // Add to history with the recalculated values
      const fixedRateValue = isFixedRateActive ? parseFloat(fixedRate) : null;
      addToHistory(inputAmount, conversionResult.converted, conversionResult.rate, fixedRateValue);
    }
  };

  return (
    <div className="swap-rate">
      <div className="container">
        <header className="header">
          <h1> Euros (€) {'<'} - {'>'} Dollars ($) Converter</h1>
          <div className="rate-display">
            <span className="rate-label">Current Rate:</span>
            <span className="rate-value">{realRate.toFixed(4)}</span>
            {isFixedRateActive && (
              <span className="fixed-rate-indicator">
                (Fixed Rate: {fixedRate})
              </span>
            )}
          </div>
        </header>

        <main className="main-content">
          <form onSubmit={handleSubmit} className="converter-form">
            <div className="input-section">
              <div className="currency-switch">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isEurToUsd}
                    onChange={handleCurrencySwitch}
                  />
                  <span className="slider">
                    <span className="slider-text">
                      {isEurToUsd ? 'EUR → USD' : 'USD → EUR'}
                    </span>
                  </span>
                </label>
              </div>

              <div className="input-group">
                <label htmlFor="amount">Amount to convert:</label>
                <div className="input-container">
                  <input
                    type="number"
                    id="amount"
                    value={inputAmount}
                    onChange={(e) => setInputAmount(e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="amount-input"
                  />
                  <span className="currency-symbol">
                    {isEurToUsd ? '€' : '$'}
                  </span>
                </div>
              </div>

              <button 
                type="submit" 
                className="convert-btn" 
                disabled={!inputAmount}
              >
                Convert
              </button>

              <div className="result-section">
                <label>Result:</label>
                <div className="result-container">
                  <span className="result-amount">
                    {convertedAmount || '0.00'}
                  </span>
                  <span className="result-currency">
                    {isEurToUsd ? '$' : '€'}
                  </span>
                </div>
              </div>
            </div>

            <div className="fixed-rate-section">
              <label htmlFor="fixedRate">Fixed Rate (optional):</label>
              <div className="fixed-rate-controls">
                <input
                  type="number"
                  id="fixedRate"
                  value={fixedRate}
                  onChange={(e) => setFixedRate(e.target.value)}
                  placeholder="1.1000"
                  step="0.0001"
                  min="0.1"
                  className="fixed-rate-input"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (fixedRate && !isNaN(parseFloat(fixedRate))) {
                      setIsFixedRateActive(true);
                    }
                  }}
                  className="activate-fixed-btn"
                  disabled={!fixedRate || isNaN(parseFloat(fixedRate))}
                >
                  Activate
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsFixedRateActive(false);
                    setFixedRate('');
                  }}
                  className="deactivate-fixed-btn"
                  disabled={!isFixedRateActive}
                >
                  Deactivate
                </button>
              </div>
            </div>
          </form>

          {history.length > 0 && (
            <div className="history-section">
              <h3>📊 Conversion History</h3>
              <div className="history-table">
                <table>
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Real Rate</th>
                      <th>Fixed Rate</th>
                      <th>Used Rate</th>
                      <th>Input</th>
                      <th>Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((entry) => (
                      <tr key={entry.id}>
                        <td>{entry.timestamp}</td>
                        <td>{entry.realRate}</td>
                        <td>{entry.fixedRate}</td>
                        <td>{entry.usedRate}</td>
                        <td>{entry.inputValue} {entry.inputCurrency}</td>
                        <td>{entry.outputValue} {entry.outputCurrency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default SwapRate;
