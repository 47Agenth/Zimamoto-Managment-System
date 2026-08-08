const loginView = document.getElementById('loginView');
const appShell = document.getElementById('appShell');
const loginForm = document.getElementById('loginForm');
const checknumberInput = document.getElementById('checknumberInput');
const passwordInput = document.getElementById('passwordInput');
const keepLoggedInCheckbox = document.getElementById('keepLoggedIn');
const loginError = document.getElementById('loginError');
const languageSelect = document.getElementById('languageSelect');
const currentUserLabel = document.getElementById('currentUserLabel');
const signOutBtn = document.getElementById('signOutBtn');
const menuTitle = document.getElementById('menuTitle');
const dashboardTitle = document.getElementById('dashboardTitle');
const stationsTitle = document.getElementById('stationsTitle');
const tasksTitle = document.getElementById('tasksTitle');
const incidentsTitle = document.getElementById('incidentsTitle');
const vehiclesTitle = document.getElementById('vehiclesTitle');
const equipmentTitle = document.getElementById('equipmentTitle');
const shiftsTitle = document.getElementById('shiftsTitle');
const feedbackTitle = document.getElementById('feedbackTitle');
const reportsTitle = document.getElementById('reportsTitle');
const dashboardSummary = document.getElementById('dashboardSummary');
const dashboardCards = document.getElementById('dashboardCards');
const stationsList = document.getElementById('stationsList');
const tasksList = document.getElementById('tasksList');
const incidentsList = document.getElementById('incidentsList');
const vehiclesList = document.getElementById('vehiclesList');
const equipmentList = document.getElementById('equipmentList');
const shiftsList = document.getElementById('shiftsList');
const reportCards = document.getElementById('reportCards');
const feedbackSource = document.getElementById('feedbackSource');
const feedbackMessage = document.getElementById('feedbackMessage');
const feedbackConfirmation = document.getElementById('feedbackConfirmation');
const submitFeedbackBtn = document.getElementById('submitFeedbackBtn');
const views = Array.from(document.querySelectorAll('.view'));
const navBtns = Array.from(document.querySelectorAll('.nav-btn'));

const translations = {
  en: {
    menu: 'Menu',
    dashboard: 'Dashboard',
    stationManagement: 'Station Management',
    taskManagement: 'Task Management',
    incidentManagement: 'Incident Management',
    vehicleManagement: 'Vehicle Management',
    equipment: 'Equipment & Inventory',
    shiftManagement: 'Shift Management',
    feedback: 'Feedback',
    reports: 'Reports & Analytics',
    addStation: 'Add Station',
    createTask: 'Create Task',
    recordIncident: 'Record Incident',
    registerVehicle: 'Register Vehicle',
    stationName: 'Station Name',
    location: 'Location',
    commander: 'Commander',
    officers: 'Officers',
    status: 'Status',
    actions: 'Actions',
    pending: 'Pending',
    assigned: 'Assigned',
    inProgress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
    delayed: 'Delayed',
    taskTitle: 'Task Title',
    assignedTo: 'Assigned To',
    assignedStation: 'Assigned Station',
    deadline: 'Deadline',
    priority: 'Priority',
    conditions: 'Conditions',
    feedbackSourcePlaceholder: 'Name or station',
    submitFeedback: 'Submit Feedback'
  },
  sw: {
    menu: 'Menyu',
    dashboard: 'Dashboard',
    stationManagement: 'Usimamizi wa Vituo',
    taskManagement: 'Usimamizi wa Task',
    incidentManagement: 'Usimamizi wa Matukio',
    vehicleManagement: 'Usimamizi wa Magari',
    equipment: 'Vifaa & Mali',
    shiftManagement: 'Usimamizi wa Zamu',
    feedback: 'Maoni',
    reports: 'Ripoti & Analytics',
    addStation: 'Ongeza Kituo',
    createTask: 'Unda Task',
    recordIncident: 'Rekodi Tukio',
    registerVehicle: 'Sajili Gari',
    stationName: 'Jina la Kituo',
    location: 'Mahali',
    commander: 'Kamanda',
    officers: 'Askari',
    status: 'Hali',
    actions: 'Vitendo',
    pending: 'Inasubiri',
    assigned: 'Imetengwa',
    inProgress: 'Inatekelezwa',
    completed: 'Imekamilika',
    cancelled: 'Imesitishwa',
    delayed: 'Imesubiriwa',
    taskTitle: 'Kichwa cha Task',
    assignedTo: 'Imetengwa Kwa',
    assignedStation: 'Imepewa Kituo',
    deadline: 'Muda',
    priority: 'Kipaumbele',
    conditions: 'Masharti',
    feedbackSourcePlaceholder: 'Jina au kituo',
    submitFeedback: 'Tuma Maoni'
  }
};

let currentLanguage = 'sw';
let currentUser = null;
let currentData = null;

function setTranslations() {
  const t = translations[currentLanguage];
  menuTitle.textContent = t.menu;
  dashboardTitle.textContent = t.dashboard;
  stationsTitle.textContent = t.stationManagement;
  tasksTitle.textContent = t.taskManagement;
  incidentsTitle.textContent = t.incidentManagement;
  vehiclesTitle.textContent = t.vehicleManagement;
  equipmentTitle.textContent = t.equipment;
  shiftsTitle.textContent = t.shiftManagement;
  feedbackTitle.textContent = t.feedback;
  reportsTitle.textContent = t.reports;
  document.getElementById('newStationBtn').textContent = t.addStation;
  document.getElementById('newTaskBtn').textContent = t.createTask;
  document.getElementById('newIncidentBtn').textContent = t.recordIncident;
  document.getElementById('newVehicleBtn').textContent = t.registerVehicle;
  feedbackSource.placeholder = t.feedbackSourcePlaceholder;
  document.getElementById('submitFeedbackBtn').textContent = t.submitFeedback;
}

function createSummaryCard(label, value) {
  const card = document.createElement('div');
  card.className = 'summary-card';
  card.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
  return card;
}

function createTable(columns, rows) {
  const template = document.getElementById('tableTemplate');
  const table = template.content.firstElementChild.cloneNode(true);
  const headerRow = document.createElement('tr');
  columns.forEach(col => {
    const th = document.createElement('th');
    th.textContent = col;
    headerRow.appendChild(th);
  });
  table.tHead.appendChild(headerRow);
  rows.forEach(row => {
    const tr = document.createElement('tr');
    row.forEach(cell => {
      const td = document.createElement('td');
      td.innerHTML = cell;
      tr.appendChild(td);
    });
    table.tBodies[0].appendChild(tr);
  });
  return table;
}

async function loginUser(credentials) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }
  return response.json();
}

async function fetchDashboardData() {
  const response = await fetch('/api/dashboard');
  return response.json();
}

async function sendFeedback(feedback) {
  const response = await fetch('/api/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedback)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to submit feedback');
  }

  return response.json();
}

function setAuthenticated(authenticated) {
  loginView.classList.toggle('hidden', authenticated);
  appShell.classList.toggle('hidden', !authenticated);
}

const viewPermissions = {
  admin: ['dashboard', 'stations', 'tasks', 'incidents', 'vehicles', 'equipment', 'shifts', 'feedback', 'reports'],
  station: ['dashboard', 'stations', 'tasks', 'incidents', 'vehicles', 'equipment', 'shifts', 'feedback', 'reports'],
  shift: ['dashboard', 'tasks', 'incidents', 'shifts', 'feedback', 'reports'],
  officer: ['dashboard', 'tasks', 'incidents', 'feedback', 'reports'],
  mechanic: ['dashboard', 'vehicles', 'equipment', 'feedback', 'reports'],
  equipment: ['dashboard', 'equipment', 'feedback', 'reports'],
  viewer: ['dashboard', 'reports']
};

function updateNavForRole(role) {
  const allowed = viewPermissions[role] || viewPermissions.viewer;
  navBtns.forEach(btn => btn.classList.toggle('hidden', !allowed.includes(btn.dataset.view)));
  const activeButton = navBtns.find(btn => btn.classList.contains('active') && !btn.classList.contains('hidden'));
  if (!activeButton) {
    const firstVisible = navBtns.find(btn => !btn.classList.contains('hidden'));
    if (firstVisible) switchView(firstVisible.dataset.view);
  }
}

function renderDashboard(data) {
  dashboardSummary.innerHTML = '';
  dashboardSummary.appendChild(createSummaryCard('Stations', data.stationCount));
  dashboardSummary.appendChild(createSummaryCard('Tasks', data.taskCount));
  dashboardSummary.appendChild(createSummaryCard('Completed', data.completed));
  dashboardSummary.appendChild(createSummaryCard('In Progress', data.inProgress));
  dashboardSummary.appendChild(createSummaryCard('Delayed', data.delayed));
  dashboardSummary.appendChild(createSummaryCard('Vehicles Active', data.vehiclesActive));
  dashboardSummary.appendChild(createSummaryCard('Needs Repair', data.maintenance));
  dashboardSummary.appendChild(createSummaryCard('Broken Equipment', data.brokenEquipment));

  dashboardCards.innerHTML = `
    <div class="card"><h3>Incident Reports</h3><p>${data.incidents.length} recorded events</p></div>
    <div class="card"><h3>Alerts</h3><p>${data.notifications.length} active notices</p></div>
    <div class="card"><h3>Shifts</h3><p>${data.shifts.length} scheduled shifts</p></div>
  `;
}

function attachActionButtons(container, selector, handler) {
  const buttons = container.querySelectorAll(selector);
  buttons.forEach(button => {
    button.addEventListener('click', () => handler(button.dataset.id));
  });
}

async function postJson(url, payload) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Request failed');
  }
  return response.json();
}

async function createStation() {
  const name = prompt('Station name:');
  if (!name) return;
  const location = prompt('Location:') || '';
  const commander = prompt('Station commander:') || '';
  const officers = prompt('Officers (comma separated):') || '';
  const status = prompt('Status (active/maintenance):', 'active') || 'active';

  await postJson('/api/stations', {
    name,
    location,
    commander,
    officers: officers.split(',').map(o => o.trim()).filter(Boolean),
    status
  });
  await loadAllData();
  alert('Station created successfully.');
}

async function createTask() {
  const title = prompt('Task title:');
  if (!title) return;
  const assignedStationId = prompt('Assigned station ID:');
  const assignedOfficers = prompt('Assigned officers (comma separated):') || '';
  const status = prompt('Status (pending/in-progress/assigned/completed/delayed):', 'pending') || 'pending';
  const deadline = prompt('Deadline (YYYY-MM-DD):', '') || null;
  const priority = prompt('Priority (Low/Medium/High):', 'Medium') || 'Medium';
  const conditions = prompt('Conditions or notes:') || '';

  await postJson('/api/tasks', {
    title,
    assigned_station_id: assignedStationId ? Number(assignedStationId) : null,
    assigned_officers: assignedOfficers.split(',').map(o => o.trim()).filter(Boolean),
    status,
    deadline,
    priority,
    conditions
  });
  await loadAllData();
  alert('Task created successfully.');
}

async function createIncident() {
  const type = prompt('Incident type:');
  if (!type) return;
  const location = prompt('Location:') || '';
  const date = prompt('Date (YYYY-MM-DD):', new Date().toISOString().slice(0, 10));
  const officers = prompt('Officers involved (comma separated):') || '';
  const vehicles = prompt('Vehicles involved (comma separated):') || '';
  const equipment = prompt('Equipment used (comma separated):') || '';
  const report = prompt('Report summary:') || '';

  await postJson('/api/incidents', {
    type,
    location,
    date,
    officers: officers.split(',').map(o => o.trim()).filter(Boolean),
    vehicles: vehicles.split(',').map(v => v.trim()).filter(Boolean),
    equipment: equipment.split(',').map(e => e.trim()).filter(Boolean),
    media: [],
    report
  });
  await loadAllData();
  alert('Incident recorded successfully.');
}

async function createVehicle() {
  const plate = prompt('Vehicle plate number:');
  if (!plate) return;
  const chassis = prompt('Chassis number:') || '';
  const engine = prompt('Engine number:') || '';
  const model = prompt('Model:') || '';
  const capacity = prompt('Capacity:') || '';
  const fuel = prompt('Fuel type:') || '';
  const insurance = prompt('Insurance expiry:') || '';
  const status = prompt('Status (active/maintenance):', 'active') || 'active';
  const stationId = prompt('Station ID:');

  await postJson('/api/vehicles', {
    plate,
    chassis,
    engine,
    model,
    capacity,
    fuel,
    insurance,
    status,
    station_id: stationId ? Number(stationId) : null
  });
  await loadAllData();
  alert('Vehicle registered successfully.');
}

function showDetails(title, details) {
  alert(`${title}\n\n${details}`);
}

function renderStations(data) {
  const rows = data.map(station => [
    station.name,
    station.location,
    station.commander,
    station.officers.join(', '),
    station.status,
    `<button class="primary action-btn" data-action="view-station" data-id="${station.id}">View</button>`
  ]);
  stationsList.innerHTML = '';
  const table = createTable(['Station Name', 'Location', 'Commander', 'Officers', 'Status', 'Actions'], rows);
  stationsList.appendChild(table);
  attachActionButtons(stationsList, '.action-btn[data-action="view-station"]', async (id) => {
    const station = data.find(item => item.id === Number(id));
    if (!station) return;
    showDetails('Station Details', `Name: ${station.name}\nLocation: ${station.location}\nCommander: ${station.commander}\nOfficers: ${station.officers.join(', ')}\nStatus: ${station.status}`);
  });
}

function renderTasks(data) {
  const rows = data.map(task => [
    task.title,
    task.assignedStation,
    task.assigned_officers.join(', '),
    task.status,
    task.deadline,
    task.priority,
    `<button class="primary action-btn" data-action="view-task" data-id="${task.id}">View</button>`
  ]);
  tasksList.innerHTML = '';
  const table = createTable(['Task Title', 'Assigned Station', 'Assigned To', 'Status', 'Deadline', 'Priority', 'Actions'], rows);
  tasksList.appendChild(table);
  attachActionButtons(tasksList, '.action-btn[data-action="view-task"]', async (id) => {
    const task = data.find(item => item.id === Number(id));
    if (!task) return;
    showDetails('Task Details', `Title: ${task.title}\nStation: ${task.assignedStation}\nAssigned Officers: ${task.assigned_officers.join(', ')}\nStatus: ${task.status}\nDeadline: ${task.deadline}\nPriority: ${task.priority}\nConditions: ${task.conditions}`);
  });
}

function renderIncidents(data) {
  const rows = data.map(item => [
    item.type,
    item.location,
    item.date,
    item.officers.join(', '),
    item.vehicles.join(', '),
    item.report,
    `<button class="primary action-btn" data-action="view-incident" data-id="${item.id}">View</button>`
  ]);
  incidentsList.innerHTML = '';
  const table = createTable(['Type', 'Location', 'Date', 'Officers', 'Vehicles', 'Report', 'Actions'], rows);
  incidentsList.appendChild(table);
  attachActionButtons(incidentsList, '.action-btn[data-action="view-incident"]', async (id) => {
    const incident = data.find(item => item.id === Number(id));
    if (!incident) return;
    showDetails('Incident Details', `Type: ${incident.type}\nLocation: ${incident.location}\nDate: ${incident.date}\nOfficers: ${incident.officers.join(', ')}\nVehicles: ${incident.vehicles.join(', ')}\nEquipment: ${incident.equipment.join(', ')}\nReport: ${incident.report}`);
  });
}

function renderVehicles(data) {
  const rows = data.map(vehicle => [
    vehicle.plate,
    vehicle.model,
    vehicle.capacity,
    vehicle.fuel,
    vehicle.insurance,
    vehicle.status,
    `<button class="primary action-btn" data-action="view-vehicle" data-id="${vehicle.id}">View</button>`
  ]);
  vehiclesList.innerHTML = '';
  const table = createTable(['Plate', 'Model', 'Capacity', 'Fuel', 'Insurance', 'Status', 'Actions'], rows);
  vehiclesList.appendChild(table);
  attachActionButtons(vehiclesList, '.action-btn[data-action="view-vehicle"]', async (id) => {
    const vehicle = data.find(item => item.id === Number(id));
    if (!vehicle) return;
    showDetails('Vehicle Details', `Plate: ${vehicle.plate}\nModel: ${vehicle.model}\nCapacity: ${vehicle.capacity}\nFuel: ${vehicle.fuel}\nInsurance: ${vehicle.insurance}\nStatus: ${vehicle.status}\nStation: ${vehicle.stationName || 'N/A'}`);
  });
}

function renderEquipment(data) {
  const rows = data.map(item => [
    item.name,
    item.stationName || 'N/A',
    item.status,
    `<button class="primary action-btn" data-action="view-equipment" data-id="${item.id}">View</button>`
  ]);
  equipmentList.innerHTML = '';
  const table = createTable(['Equipment', 'Station', 'Status', 'Actions'], rows);
  equipmentList.appendChild(table);
  attachActionButtons(equipmentList, '.action-btn[data-action="view-equipment"]', async (id) => {
    const equipment = data.find(item => item.id === Number(id));
    if (!equipment) return;
    showDetails('Equipment Details', `Name: ${equipment.name}\nStation: ${equipment.stationName || 'N/A'}\nStatus: ${equipment.status}`);
  });
}

function renderShifts(data) {
  const rows = data.map(shift => [
    shift.officer,
    shift.shift_type,
    shift.stationName || 'N/A',
    shift.date,
    `<button class="primary action-btn" data-action="view-shift" data-id="${shift.id}">View</button>`
  ]);
  shiftsList.innerHTML = '';
  const table = createTable(['Officer', 'Shift', 'Station', 'Date', 'Actions'], rows);
  shiftsList.appendChild(table);
  attachActionButtons(shiftsList, '.action-btn[data-action="view-shift"]', async (id) => {
    const shift = data.find(item => item.id === Number(id));
    if (!shift) return;
    showDetails('Shift Details', `Officer: ${shift.officer}\nShift: ${shift.shift_type}\nStation: ${shift.stationName || 'N/A'}\nDate: ${shift.date}`);
  });
}

async function loadAllData() {
  const data = await fetchDashboardData();
  renderDashboard(data);
  renderStations(data.stations);
  renderTasks(data.tasks);
  renderIncidents(data.incidents);
  renderVehicles(data.vehicles);
  renderEquipment(data.equipment);
  renderShifts(data.shifts);
  renderReports(data);
}

function switchView(viewName) {
  views.forEach(view => view.classList.toggle('active', view.id === `${viewName}View`));
  navBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.view === viewName));
}

document.getElementById('newStationBtn').addEventListener('click', createStation);
document.getElementById('newTaskBtn').addEventListener('click', createTask);
document.getElementById('newIncidentBtn').addEventListener('click', createIncident);
document.getElementById('newVehicleBtn').addEventListener('click', createVehicle);

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  loginError.textContent = '';
  try {
    const user = await loginUser({
      checknumber: checknumberInput.value.trim(),
      password: passwordInput.value.trim()
    });
    currentUser = user;
    currentUserLabel.textContent = `${user.name} (${user.role})`;
    if (keepLoggedInCheckbox.checked) {
      localStorage.setItem('zimamotoUser', JSON.stringify(user));
    }
    updateNavForRole(user.roleCode || user.role?.toLowerCase());
    setAuthenticated(true);
    await loadAllData();
  } catch (error) {
    loginError.textContent = error.message;
  }
});

submitFeedbackBtn.addEventListener('click', async () => {
  feedbackConfirmation.textContent = '';
  const source = feedbackSource.value.trim();
  const message = feedbackMessage.value.trim();

  if (!source || !message) {
    feedbackConfirmation.textContent = 'Please provide both source and message.';
    return;
  }

  try {
    await sendFeedback({
      source,
      message,
      createdAt: new Date().toISOString(),
      user: currentUser ? currentUser.name : 'Guest'
    });
    feedbackConfirmation.textContent = 'Feedback submitted successfully.';
    feedbackSource.value = '';
    feedbackMessage.value = '';
  } catch (error) {
    feedbackConfirmation.textContent = error.message;
  }
});

signOutBtn.addEventListener('click', async () => {
  try {
    await fetch('/api/auth/logout', { method: 'POST' });
  } catch (error) {
    console.warn('Logout failed', error);
  }
  localStorage.removeItem('zimamotoUser');
  navBtns.forEach(btn => btn.classList.remove('hidden'));
  setAuthenticated(false);
});

languageSelect.addEventListener('change', (event) => {
  currentLanguage = event.target.value;
  setTranslations();
});

navBtns.forEach(btn => {
  btn.addEventListener('click', () => switchView(btn.dataset.view));
});

function initialize() {
  const storedUser = localStorage.getItem('zimamotoUser');
  if (storedUser) {
    currentUser = JSON.parse(storedUser);
    currentUserLabel.textContent = `${currentUser.name} (${currentUser.role})`;
    updateNavForRole(currentUser.roleCode || currentUser.role?.toLowerCase());
    setAuthenticated(true);
    loadAllData();
  }
  setTranslations();
}

initialize();
