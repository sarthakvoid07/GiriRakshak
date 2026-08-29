import { useState, useEffect } from 'react';
import { getZones } from './firebase/reads';

const COLORS = {
  low: '#2E8B57',
  moderate: '#E8B33D',
  high: '#C4741A',
  severe: '#C0392B',
};

function riskFrom(score, rain) {
  const c = (score || 0) * ((rain || 0) / 100);
  if (c >= 0.5) return 'severe';
  if (c >= 0.3) return 'high';
  if (c >= 0.15) return 'moderate';
  return 'low';
}

function App() {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getZones().then(data => {
      setZones(data);
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ fontFamily: 'system-ui', padding: 24, maxWidth: 700, margin: '0 auto' }}>
      <h1 style={{ color: '#10314B' }}>GiriRakshak</h1>
      <p style={{ color: '#5A6875' }}>Landslide risk zones — North East India</p>

      {loading && <p>Loading zones…</p>}

      {zones.map(zone => (
        <div key={zone.id} style={{
          border: '1px solid #D5DCE4',
          borderRadius: 8,
          padding: 16,
          marginBottom: 12,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong>{zone.district || 'Unnamed district'}, {zone.state}</strong>
            <span style={{
              background: COLORS[riskFrom(zone.riskScore, zone.rainfall3day)] || '#999',
              color: 'white',
              padding: '2px 10px',
              borderRadius: 12,
              fontSize: 13,
            }}>
            {riskFrom(zone.riskScore, zone.rainfall3day)}
            </span>
          </div>
          <div style={{ color: '#5A6875', fontSize: 14, marginTop: 6 }}>
            Risk score {zone.riskScore} · Slope {zone.slopeAvg}° · Rain 3-day {zone.rainfall3day}mm · Road {zone.roadStatus}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;