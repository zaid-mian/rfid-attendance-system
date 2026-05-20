import { addAttendance, getAttendance, getStats } from '../../lib/db';

export default function handler(req, res) {
  // Allow requests from ESP32
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { uid, name, rollNo } = req.body;
    
    if (!uid || !name || !rollNo) {
      return res.status(400).json({ 
        error: 'Missing required fields' 
      });
    }
    
    const result = addAttendance({ uid, name, rollNo });
    
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: `Attendance marked for ${name}`,
        record: result.record
      });
    } else {
      return res.status(200).json({
        success: false,
        message: result.message
      });
    }
  }

  if (req.method === 'GET') {
    const stats = getStats();
    const records = getAttendance();
    return res.status(200).json({ stats, records });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
