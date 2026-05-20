import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState({ stats: [], records: [] });
  const [lastScan, setLastScan] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/attendance');
      const json = await res.json();
      setData(json);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const presentCount = data.stats.filter(s => s.present).length;
  const totalCount = data.stats.length;
  const absentCount = totalCount - presentCount;

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      padding: '20px',
      color: 'white'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ 
          fontSize: '28px', 
          margin: '0',
          color: '#00d4ff'
        }}>
          🎓 Smart RFID Attendance System
        </h1>
        <p style={{ color: '#888', margin: '8px 0' }}>
          Real-time attendance tracking
        </p>
        <p style={{ color: '#555', fontSize: '13px' }}>
          Auto-refreshes every 3 seconds
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'flex',
        gap: '15px',
        justifyContent: 'center',
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        <div style={{
          background: 'rgba(0, 212, 255, 0.1)',
          border: '1px solid #00d4ff',
          borderRadius: '12px',
          padding: '20px 30px',
          textAlign: 'center',
          minWidth: '120px'
        }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#00d4ff' }}>
            {totalCount}
          </div>
          <div style={{ color: '#888', fontSize: '14px' }}>Total</div>
        </div>

        <div style={{
          background: 'rgba(0, 255, 100, 0.1)',
          border: '1px solid #00ff64',
          borderRadius: '12px',
          padding: '20px 30px',
          textAlign: 'center',
          minWidth: '120px'
        }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#00ff64' }}>
            {presentCount}
          </div>
          <div style={{ color: '#888', fontSize: '14px' }}>Present</div>
        </div>

        <div style={{
          background: 'rgba(255, 60, 60, 0.1)',
          border: '1px solid #ff3c3c',
          borderRadius: '12px',
          padding: '20px 30px',
          textAlign: 'center',
          minWidth: '120px'
        }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#ff3c3c' }}>
            {absentCount}
          </div>
          <div style={{ color: '#888', fontSize: '14px' }}>Absent</div>
        </div>
      </div>

      {/* Student Table */}
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '30px',
        maxWidth: '800px',
        margin: '0 auto 30px auto'
      }}>
        <div style={{
          padding: '15px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          fontSize: '16px',
          fontWeight: 'bold'
        }}>
          📋 Today's Attendance
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>
            Loading...
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', color: '#888', fontSize: '13px' }}>#</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', color: '#888', fontSize: '13px' }}>Name</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', color: '#888', fontSize: '13px' }}>Roll No</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', color: '#888', fontSize: '13px' }}>Time</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', color: '#888', fontSize: '13px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.stats.map((student, index) => (
                <tr key={index} style={{
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                  background: student.present ? 'rgba(0,255,100,0.03)' : 'transparent'
                }}>
                  <td style={{ padding: '12px 16px', color: '#555' }}>{index + 1}</td>
                  <td style={{ padding: '12px 16px', fontWeight: '500' }}>{student.name}</td>
                  <td style={{ padding: '12px 16px', color: '#888', fontSize: '13px' }}>{student.rollNo}</td>
                  <td style={{ padding: '12px 16px', color: '#888', fontSize: '13px' }}>{student.time}</td>
                  <td style={{ padding: '12px 16px' }}>
                    {student.present ? (
                      <span style={{
                        background: 'rgba(0,255,100,0.15)',
                        color: '#00ff64',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>✓ PRESENT</span>
                    ) : (
                      <span style={{
                        background: 'rgba(255,60,60,0.15)',
                        color: '#ff3c3c',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>✗ ABSENT</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Recent Scans */}
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '12px',
        overflow: 'hidden',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{
          padding: '15px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          fontSize: '16px',
          fontWeight: 'bold'
        }}>
          🕐 Recent Scans
        </div>
        {data.records.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#555' }}>
            No scans yet today. Scan a card to begin!
          </div>
        ) : (
          [...data.records].reverse().slice(0, 5).map((record, index) => (
            <div key={index} style={{
              padding: '12px 20px',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontWeight: '500' }}>{record.name}</div>
                <div style={{ color: '#888', fontSize: '13px' }}>{record.rollNo}</div>
              </div>
              <div style={{ color: '#00d4ff', fontSize: '13px' }}>{record.time}</div>
            </div>
          ))
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px', color: '#333', fontSize: '12px' }}>
        IoT + Web | Smart RFID Attendance System
      </div>
    </div>
  );
}
