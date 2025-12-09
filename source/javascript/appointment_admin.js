// ===================== API URL =====================
const API_URL = "http://localhost:3000";

// ===================== Общие функции =====================
async function apiGet(path) {
  const res = await fetch(`${API_URL}${path}`);
  return res.json();
}

async function apiPost(path, data) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

// ===================== ПАЦИЕНТЫ =====================
const patientsTableBody = document.querySelector('#patients-table tbody');
const addPatientBtn = document.getElementById('add-patient-btn');
const patientForm = document.getElementById('patient-form');
const savePatient = document.getElementById('save-patient');
const cancelPatient = document.getElementById('cancel-patient');

addPatientBtn.addEventListener('click', () => patientForm.style.display = 'block');
cancelPatient.addEventListener('click', () => { patientForm.style.display = 'none'; clearPatientForm(); });

function clearPatientForm() {
  document.getElementById('p-name').value = '';
  document.getElementById('p-nationality').value = '';
  document.getElementById('p-sex').value = '';
  document.getElementById('p-dob').value = '';
}

savePatient.addEventListener('click', async () => {
  const name = document.getElementById('p-name').value.trim();
  const nationality = document.getElementById('p-nationality').value.trim();
  const sex = document.getElementById('p-sex').value;
  const dob = document.getElementById('p-dob').value;

  if (!name) { alert('Введите имя пациента'); return; }

  await apiPost('/patients', { name, nationality, sex, dob });
  alert('Пациент добавлен!');
  patientForm.style.display = 'none';
  clearPatientForm();
  await loadPatients();
});

async function loadPatients() {
  const patients = await apiGet('/patients');
  patientsTableBody.innerHTML = '';
  patients.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${p.name}</td><td>${p.nationality || ''}</td><td>${p.sex || ''}</td><td>${p.dob || ''}</td><td></td>`;
    patientsTableBody.appendChild(tr);
  });

  // Заполнение select для приема анализа
  const patientSelect = document.getElementById('analysis-patient');
  if (patientSelect) {
    patientSelect.innerHTML = '<option value="">Выберите пациента</option>';
    patients.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = p.name;
      patientSelect.appendChild(opt);
    });
  }
}

// ===================== ВРАЧИ =====================
const doctorsTableBody = document.querySelector('#doctors-table tbody');
const addDoctorBtn = document.getElementById('add-doctor-btn');
const doctorForm = document.getElementById('doctor-form');
const saveDoctor = document.getElementById('save-doctor');
const cancelDoctor = document.getElementById('cancel-doctor');

addDoctorBtn.addEventListener('click', () => doctorForm.style.display = 'block');
cancelDoctor.addEventListener('click', () => { doctorForm.style.display = 'none'; clearDoctorForm(); });

function clearDoctorForm() {
  document.getElementById('d-name').value = '';
  document.getElementById('d-specialty').value = '';
  document.getElementById('d-sex').value = '';
}

saveDoctor.addEventListener('click', async () => {
  const name = document.getElementById('d-name').value.trim();
  const specialty = document.getElementById('d-specialty').value.trim();
  const sex = document.getElementById('d-sex').value;

  if (!name) { alert('Введите имя врача'); return; }

  await apiPost('/doctors', { name, specialty, category: specialty, sex }); // category можно добавить как специальность
  alert('Врач добавлен!');
  doctorForm.style.display = 'none';
  clearDoctorForm();
  await loadDoctors();
});

async function loadDoctors() {
  const doctors = await apiGet('/doctors');
  doctorsTableBody.innerHTML = '';
  doctors.forEach(d => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${d.name}</td><td>${d.specialty || ''}</td><td>${d.sex || ''}</td><td></td>`;
    doctorsTableBody.appendChild(tr);
  });

  // Заполнение select для приема анализа
  const doctorSelect = document.getElementById('analysis-doctor');
  if (doctorSelect) {
    doctorSelect.innerHTML = '<option value="">Выберите врача</option>';
    doctors.forEach(d => {
      const opt = document.createElement('option');
      opt.value = d.id;
      opt.textContent = d.name;
      doctorSelect.appendChild(opt);
    });
  }
}

// ===================== ПРИЕМ АНАЛИЗА =====================
const acceptTableBody = document.querySelector('#accept-table tbody');

async function loadAnalysisAccept() {
  const accepts = await apiGet('/analysis/accept');
  acceptTableBody.innerHTML = '';
  accepts.forEach(a => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${a.patient}</td><td>${a.doctor}</td><td>${a.date}</td><td></td>`;
    acceptTableBody.appendChild(tr);
  });
}

async function acceptAnalysis() {
  const patientId = document.getElementById('analysis-patient').value;
  const doctorId = document.getElementById('analysis-doctor').value;
  const date = document.getElementById('analysis-date').value;

  if (!patientId || !doctorId || !date) { alert('Заполните все поля'); return; }

  await apiPost('/analysis/accept', { patient_id: patientId, doctor_id: doctorId, date });
  alert('Пациент записан на анализ!');
  await loadAnalysisAccept();
}

// ===================== ИНИЦИАЛИЗАЦИЯ =====================
async function init() {
  await loadPatients();
  await loadDoctors();
  await loadAnalysisAccept();
}

init();
