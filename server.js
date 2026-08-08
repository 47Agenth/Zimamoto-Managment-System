const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let nextId = { station: 4, task: 8, incident: 4, vehicle: 4, notification: 4, feedback: 3 };

const users = [
  { id: 1, checknumber: 'KAMANDA001', password: 'admin123', name: 'Kamanda wa Mkoa', role: 'Kamanda wa Mkoa' },
  { id: 2, checknumber: 'KAMANDA002', password: 'station123', name: 'Kamanda wa Kituo', role: 'Kamanda wa Kituo' },
  { id: 3, checknumber: 'ZAMU001', password: 'shift123', name: 'Mkuu wa Zamu', role: 'Mkuu wa Zamu' },
  { id: 4, checknumber: 'ASKARI001', password: 'askari123', name: 'Askari Zimamoto', role: 'Askari Zimamoto' },
  { id: 5, checknumber: 'FUNDIA001', password: 'mechanic123', name: 'Fundi Magari', role: 'Fundi Magari' },
  { id: 6, checknumber: 'VIFAA001', password: 'equipment123', name: 'Afisa wa Vifaa', role: 'Afisa wa Vifaa' },
  { id: 7, checknumber: 'TESTUSER001', password: 'test123', name: 'Test User', role: 'Simulation User' }
];

const roles = [
  { id: 1, code: 'admin', label: 'Kamanda wa Mkoa' },
  { id: 2, code: 'station', label: 'Kamanda wa Kituo' },
  { id: 3, code: 'shift', label: 'Mkuu wa Zamu' },
  { id: 4, code: 'officer', label: 'Askari Zimamoto' },
  { id: 5, code: 'mechanic', label: 'Fundi Magari' },
  { id: 6, code: 'equipment', label: 'Afisa wa Vifaa' },
  { id: 7, code: 'viewer', label: 'Viewer / Read-only' }
];

const stations = [
  { id: 1, name: 'Kituo cha Jiji', location: 'Dar es Salaam', commander: 'Kamanda A', officers: ['Askari A', 'Askari B'], status: 'active' },
  { id: 2, name: 'Kituo cha Mjini', location: 'Arusha', commander: 'Kamanda B', officers: ['Askari C', 'Askari D'], status: 'active' },
  { id: 3, name: 'Kituo cha Kanda', location: 'Dodoma', commander: 'Kamanda C', officers: ['Askari E'], status: 'maintenance' }
];

const tasks = [
  { id: 1, title: 'Kagua Tanki la Maji', assignedTo: ['Askari A', 'Askari C'], assignedStation: 'Kituo cha Jiji', status: 'in-progress', deadline: '2026-08-15', priority: 'High', conditions: 'Chapa moto kabla ya 18:00', history: ['Created by Kamanda wa Mkoa'], feedback: [] },
  { id: 2, title: 'Lesson on Hose Repair', assignedTo: ['Askari B'], assignedStation: 'Kituo cha Mjini', status: 'pending', deadline: '2026-08-20', priority: 'Medium', conditions: 'Prepare report after training', history: ['Created by Kamanda wa Kituo'], feedback: [] },
  { id: 3, title: 'Inspect Breathing Apparatus', assignedTo: ['Afisa wa Vifaa'], assignedStation: 'Kituo cha Kanda', status: 'assigned', deadline: '2026-08-14', priority: 'High', conditions: 'Record faults', history: ['Created by Kamanda wa Mkoa'], feedback: [] },
  { id: 4, title: 'Refuel Chimney Truck', assignedTo: ['Fundi Magari'], assignedStation: 'Kituo cha Jiji', status: 'completed', deadline: '2026-08-12', priority: 'Low', conditions: 'Upload receipt', history: ['Created by Kamanda wa Kituo'], feedback: ['Great execution'] },
  { id: 5, title: 'Prepare Incident Report', assignedTo: ['Askari D'], assignedStation: 'Kituo cha Mjini', status: 'delayed', deadline: '2026-08-10', priority: 'High', conditions: 'Submit before shift ends', history: ['Created by Mkuu wa Zamu'], feedback: [] },
  { id: 6, title: 'Routine Vehicle Check', assignedTo: ['Fundi Magari'], assignedStation: 'Kituo cha Kanda', status: 'in-progress', deadline: '2026-08-18', priority: 'Medium', conditions: 'Check tyres and battery', history: ['Created by Kamanda wa Mkoa'], feedback: [] }
];

const incidents = [
  { id: 1, type: 'Moto wa Nyumbani', location: 'Mtaa wa Kimara', date: '2026-08-01', officers: ['Askari A', 'Askari B'], vehicles: ['Truck 001'], equipment: ['Breathing Apparatus'], media: ['photo1.jpg'], report: 'Mafanikio, hakuna majeruhi.' },
  { id: 2, type: 'Kutokea kwa Mafusho', location: 'Kizaazaa cha Gongo la Mboto', date: '2026-07-28', officers: ['Askari D'], vehicles: ['Truck 002'], equipment: ['Hose reel'], media: [], report: 'Inavyoendelea, utoaji wa maji kwa wakati.' }
];

const vehicles = [
  { id: 1, plate: 'T 123 ABC', chassis: 'CHS-001', engine: 'ENG-001', model: 'Rosenbauer', capacity: '5000L', fuel: 'Diesel', insurance: '2027-05-10', status: 'active' },
  { id: 2, plate: 'T 234 DEF', chassis: 'CHS-002', engine: 'ENG-002', model: 'Magirus', capacity: '4000L', fuel: 'Diesel', insurance: '2026-11-01', status: 'maintenance' },
  { id: 3, plate: 'T 345 GHI', chassis: 'CHS-003', engine: 'ENG-003', model: 'Scania', capacity: '7500L', fuel: 'Diesel', insurance: '2027-01-12', status: 'active' }
];

const equipment = [
  { id: 1, name: 'Hose reel', status: 'good', station: 'Kituo cha Mjini' },
  { id: 2, name: 'Breathing Apparatus', status: 'damaged', station: 'Kituo cha Kanda' },
  { id: 3, name: 'Fire Suit', status: 'good', station: 'Kituo cha Jiji' }
];

const notifications = [
  { id: 1, title: 'Mkutano wa Kamanda', message: 'Mkutano wa wilaya saa 10:00 asubuhi.', date: '2026-08-10', type: 'alert' },
  { id: 2, title: 'Mabadiliko ya Ratiba', message: 'Ratiba mpya ya zamu sasa imetumika.', date: '2026-08-09', type: 'info' }
];

const shifts = [
  { id: 1, officer: 'Askari A', shift: 'Asubuhi', station: 'Kituo cha Jiji', date: '2026-08-11' },
  { id: 2, officer: 'Askari B', shift: 'Mchana', station: 'Kituo cha Jiji', date: '2026-08-11' },
  { id: 3, officer: 'Askari D', shift: 'Usiku', station: 'Kituo cha Mjini', date: '2026-08-11' }
];

app.post('/api/auth/login', (req, res) => {
  const { checknumber, password } = req.body;
  const user = users.find(u => u.checknumber === checknumber && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid checknumber or password' });
  }
  res.json({ id: user.id, name: user.name, role: user.role });
});

app.get('/api/dashboard', (req, res) => {
  const completed = tasks.filter(t => t.status === 'completed').length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const pending = tasks.filter(t => t.status === 'pending' || t.status === 'assigned').length;
  const delayed = tasks.filter(t => t.status === 'delayed').length;
  const maintenance = vehicles.filter(v => v.status === 'maintenance').length;
  const brokenEquipment = equipment.filter(e => e.status !== 'good').length;
  res.json({
    users: roles.length,
    stations: stations.length,
    tasks: tasks.length,
    completed,
    inProgress,
    pending,
    delayed,
    vehiclesActive: vehicles.filter(v => v.status === 'active').length,
    maintenance,
    brokenEquipment,
    incidentReports: incidents.length,
    notifications: notifications.length,
    stations,
    tasks,
    incidents,
    vehicles,
    equipment,
    notifications,
    shifts
  });
});

app.get('/api/stations', (req, res) => res.json(stations));
app.post('/api/stations', (req, res) => {
  const station = { id: nextId.station++, status: 'active', ...req.body };
  stations.push(station);
  res.status(201).json(station);
});
app.put('/api/stations/:id', (req, res) => {
  const id = Number(req.params.id);
  const station = stations.find(s => s.id === id);
  if (!station) return res.status(404).json({ error: 'Station not found' });
  Object.assign(station, req.body);
  res.json(station);
});
app.delete('/api/stations/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = stations.findIndex(s => s.id === id);
  if (index === -1) return res.status(404).json({ error: 'Station not found' });
  const removed = stations.splice(index, 1)[0];
  res.json(removed);
});

app.get('/api/tasks', (req, res) => res.json(tasks));
app.post('/api/tasks', (req, res) => {
  const task = { id: nextId.task++, history: ['Created'], feedback: [], ...req.body };
  tasks.push(task);
  res.status(201).json(task);
});
app.put('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  if (req.body.history) task.history.push(req.body.history);
  Object.assign(task, req.body);
  res.json(task);
});

app.get('/api/incidents', (req, res) => res.json(incidents));
app.post('/api/incidents', (req, res) => {
  const incident = { id: nextId.incident++, ...req.body };
  incidents.push(incident);
  res.status(201).json(incident);
});

app.get('/api/vehicles', (req, res) => res.json(vehicles));
app.post('/api/vehicles', (req, res) => {
  const vehicle = { id: nextId.vehicle++, status: 'active', ...req.body };
  vehicles.push(vehicle);
  res.status(201).json(vehicle);
});

app.get('/api/equipment', (req, res) => res.json(equipment));
app.get('/api/notifications', (req, res) => res.json(notifications));
app.get('/api/shifts', (req, res) => res.json(shifts));
app.post('/api/feedback', (req, res) => {
  const id = nextId.feedback++;
  const newFeedback = { id, ...req.body };
  res.status(201).json(newFeedback);
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(port, () => {
  console.log(`Zimamoto Management System running at http://localhost:${port}`);
});
