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

function setAuthenticated(authenticated) {
  loginView.classList.toggle('hidden', authenticated);
  appShell.classList.toggle('hidden', !authenticated);
}

function renderDashboard(data) {
  dashboardSummary.innerHTML = '';
  dashboardSummary.appendChild(createSummaryCard('Stations', data.stations));
  dashboardSummary.appendChild(createSummaryCard('Tasks', data.tasks));
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

function renderStations(data) {
  const rows = data.map(station => [
    station.name,
    station.location,
    station.commander,
    station.officers.join(', '),
    station.status,
    `<button class="primary">View</button>`
  ]);
  stationsList.innerHTML = '';
  stationsList.appendChild(createTable(['Station Name', 'Location', 'Commander', 'Officers', 'Status', 'Actions'], rows));
}

function renderTasks(data) {
  const rows = data.map(task => [
    task.title,
    task.assignedStation,
    task.assignedTo.join(', '),
    task.status,
    task.deadline,
    task.priority
  ]);
  tasksList.innerHTML = '';
  tasksList.appendChild(createTable(['Task Title', 'Assigned Station', 'Assigned To', 'Status', 'Deadline', 'Priority'], rows));
}

function renderIncidents(data) {
  const rows = data.map(item => [
    item.type,
    item.location,
    item.date,
    item.officers.join(', '),
    item.vehicles.join(', '),
    item.report
  ]);
  incidentsList.innerHTML = '';
  incidentsList.appendChild(createTable(['Type', 'Location', 'Date', 'Officers', 'Vehicles', 'Report'], rows));
}

function renderVehicles(data) {
  const rows = data.map(vehicle => [
    vehicle.plate,
    vehicle.model,
    vehicle.capacity,
    vehicle.fuel,
    vehicle.insurance,
    vehicle.status
  ]);
  vehiclesList.innerHTML = '';
  vehiclesList.appendChild(createTable(['Plate', 'Model', 'Capacity', 'Fuel', 'Insurance', 'Status'], rows));
}

function renderEquipment(data) {
  const rows = data.map(item => [item.name, item.station, item.status]);
  equipmentList.innerHTML = '';
  equipmentList.appendChild(createTable(['Equipment', 'Station', 'Status'], rows));
}

function renderShifts(data) {
  const rows = data.map(shift => [shift.officer, shift.shift, shift.station, shift.date]);
  shiftsList.innerHTML = '';
  shiftsList.appendChild(createTable(['Officer', 'Shift', 'Station', 'Date'], rows));
}

function renderReports(data) {
  reportCards.innerHTML = `
    <div class="card"><h3>Total Stations</h3><p>${data.stations}</p></div>
    <div class="card"><h3>Total Tasks</h3><p>${data.tasks}</p></div>
    <div class="card"><h3>Active Notifications</h3><p>${data.notifications.length}</p></div>
  `;
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
    setAuthenticated(true);
    await loadAllData();
  } catch (error) {
    loginError.textContent = error.message;
  }
});

signOutBtn.addEventListener('click', () => {
  localStorage.removeItem('zimamotoUser');
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
    setAuthenticated(true);
    loadAllData();
  }
  setTranslations();
}

initialize();
