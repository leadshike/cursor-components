import React, { useEffect, useState } from 'react';

interface Campaign {
  id: string;
  name: string;
  status: number;
  is_evergreen: boolean;
  timestamp_created: string;
  timestamp_updated: string;
  daily_limit: number;
  email_list: string[];
}

interface CampaignListProps {
  apiKey: string;
}

export const CampaignList: React.FC<CampaignListProps> = ({ apiKey }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCampaigns();
  }, [apiKey]);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      setError(null);

      const query = new URLSearchParams({
        limit: '10',
        search: searchTerm
      }).toString();

      const response = await fetch(
        `https://api.instantly.ai/api/v2/campaigns?${query}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${apiKey}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch campaigns');
      }

      const data = await response.json();
      setCampaigns(data.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCampaigns();
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        Loading campaigns...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: 'red', padding: '20px', textAlign: 'center' }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search campaigns..."
          style={{
            padding: '8px',
            width: '200px',
            marginRight: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Search
        </button>
      </form>

      {campaigns.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          No campaigns found
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              style={{
                padding: '15px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                backgroundColor: '#f8f9fa'
              }}
            >
              <h3 style={{ margin: '0 0 10px 0' }}>{campaign.name}</h3>
              <div style={{ display: 'grid', gap: '5px' }}>
                <div>
                  <strong>Status:</strong> {campaign.status === 1 ? 'Active' : 'Inactive'}
                </div>
                <div>
                  <strong>Created:</strong>{' '}
                  {new Date(campaign.timestamp_created).toLocaleDateString()}
                </div>
                <div>
                  <strong>Daily Limit:</strong> {campaign.daily_limit}
                </div>
                <div>
                  <strong>Emails:</strong> {campaign.email_list.length}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 