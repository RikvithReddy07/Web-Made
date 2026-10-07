import express from 'express';

const router = express.Router();

// In-memory store for civic data
let complaints = [
  {
    id: 'GRV-882194',
    title: 'Plastic & Organic Waste on MG Road',
    wasteType: 'Plastic & Polythene',
    severity: 'High',
    confidence: 96.4,
    status: 'In Progress',
    ward: 'Ward 12 - Central Plaza',
    address: 'Near Metro Pillar 44, MG Road, Bengaluru',
    lat: 12.9716,
    lng: 77.5946,
    officer: 'Inspector R. Sharma (Ward 12)',
    timestamp: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'GRV-773412',
    title: 'Overflowing Municipal Dumpster',
    wasteType: 'Municipal Mixed Waste',
    severity: 'Medium',
    confidence: 91.2,
    status: 'Pending',
    ward: 'Ward 08 - Indiranagar',
    address: '100ft Road Junction, Indiranagar',
    lat: 12.9784,
    lng: 77.6408,
    officer: 'Unassigned (Triage in progress)',
    timestamp: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: 'GRV-659021',
    title: 'Construction Debris & Rubble',
    wasteType: 'Construction Debris',
    severity: 'Low',
    confidence: 88.7,
    status: 'Resolved',
    ward: 'Ward 05 - Koramangala',
    address: '5th Block, Near Sony World Signal',
    lat: 12.9352,
    lng: 77.6245,
    officer: 'Officer S. Verma (Ward 05)',
    timestamp: new Date(Date.now() - 86400000).toISOString()
  }
];

/**
 * @route   GET /api/hello
 * @desc    Test connection sample endpoint
 * @access  Public
 */
router.get('/hello', (req, res) => {
  res.status(200).json({
    message: "Backend connected successfully"
  });
});

/**
 * @route   GET /api/status
 * @desc    Health check & system info
 * @access  Public
 */
router.get('/status', (req, res) => {
  res.status(200).json({
    status: "online",
    service: "Smart Clean India API",
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

/**
 * @route   GET /api/stats
 * @desc    Fetch civic statistics
 * @access  Public
 */
router.get('/stats', (req, res) => {
  const total = complaints.length + 12840;
  const resolved = complaints.filter(c => c.status === 'Resolved').length + 11620;
  
  res.status(200).json({
    totalReports: total,
    resolvedComplaints: resolved,
    activeCitizens: 48900,
    cleanlinessScore: "94.2%"
  });
});

/**
 * @route   GET /api/complaints
 * @desc    Get all civic complaints
 * @access  Public
 */
router.get('/complaints', (req, res) => {
  const { status, ward } = req.query;
  let filtered = [...complaints];

  if (status && status !== 'all') {
    filtered = filtered.filter(c => c.status.toLowerCase() === status.toLowerCase());
  }

  if (ward && ward !== 'all') {
    filtered = filtered.filter(c => c.ward.toLowerCase().includes(ward.toLowerCase()));
  }

  res.status(200).json({
    count: filtered.length,
    complaints: filtered
  });
});

/**
 * @route   POST /api/complaints
 * @desc    Submit a new civic complaint
 * @access  Public
 */
router.post('/complaints', (req, res) => {
  const { title, wasteType, severity, confidence, address, ward, lat, lng, notes } = req.body;

  const newId = `GRV-${Math.floor(100000 + Math.random() * 900000)}`;
  const newComplaint = {
    id: newId,
    title: title || `${wasteType || 'General Waste'} reported on ${address || 'Public Road'}`,
    wasteType: wasteType || 'Mixed Solid Waste',
    severity: severity || 'Medium',
    confidence: confidence || 92.5,
    status: 'Pending',
    ward: ward || 'Ward 01 - General Ward',
    address: address || 'Auto-Detected GPS Location',
    lat: lat || 12.9716,
    lng: lng || 77.5946,
    officer: 'Automated AI Routing (Pending Assignment)',
    notes: notes || '',
    timestamp: new Date().toISOString()
  };

  complaints.unshift(newComplaint);

  res.status(201).json({
    success: true,
    message: "Complaint registered successfully",
    complaint: newComplaint
  });
});

/**
 * @route   GET /api/complaints/:id
 * @desc    Track status of a specific complaint by ID
 * @access  Public
 */
router.get('/complaints/:id', (req, res) => {
  const { id } = req.params;
  const complaint = complaints.find(c => c.id.toUpperCase() === id.toUpperCase());

  if (!complaint) {
    return res.status(404).json({
      error: "Complaint ID not found"
    });
  }

  res.status(200).json({
    complaint
  });
});

export default router;
