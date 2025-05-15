import React, { useState } from 'react';

interface InstantlyApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
}

export const InstantlyApiKeyInput: React.FC<InstantlyApiKeyInputProps> = ({ onApiKeySubmit }) => {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      setError('API key is required');
      return;
    }
    if (apiKey.length < 10) {
      setError('API key seems too short');
      return;
    }
    setError('');
    onApiKeySubmit(apiKey);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label 
            htmlFor="apiKey" 
            style={{ 
              display: 'block', 
              marginBottom: '5px',
              fontWeight: 'bold'
            }}
          >
            Instantly API Key
          </label>
          <input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: error ? '1px solid red' : '1px solid #ccc'
            }}
            placeholder="Enter your Instantly API key"
          />
          {error && (
            <div style={{ color: 'red', marginTop: '5px', fontSize: '14px' }}>
              {error}
            </div>
          )}
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}; 