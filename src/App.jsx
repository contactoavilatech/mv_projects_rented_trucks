import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, FolderKanban, Truck, History, 
  Sun, Moon, UserCheck, Plus, Trash2, RotateCcw, 
  Activity, Layers, Globe, MapPin, Users,
  CalendarDays, CheckSquare, ChevronRight, ChevronLeft,
  Pencil, DollarSign, Download, Upload, RefreshCw, ArrowLeftRight, HardHat
} from 'lucide-react';

// Bilingual Dictionary
const t = {
  en: {
    title: "Command Center OS",
    subtitle: "Avila Tech Field Operations",
    profile: "Profile:",
    admin: "Administrator",
    manager: "Project Manager",
    viewer: "Viewer (Read-Only)",
    tabs: {
      dashboard: "Dashboard",
      gantt: "Weekly Gantt Timeline",
      projects: "Projects & Tasks",
      crews: "Field Crews",
      fleet: "Fleet Telemetry",
      archive: "Audit & Trash"
    },
    kpi: {
      activeProjects: "ACTIVE PROJECTS",
      operationalSync: "100% Operational Sync",
      fleetDeployed: "FLEET DEPLOYED",
      telemetryConnected: "Telemetry Connected",
      currentProfile: "CURRENT PROFILE",
      permissionsActive: "Permissions Active",
      activeCrews: "ACTIVE FIELD CREWS",
      deployedRegions: "Regions: Oriente, Cojedes, Caracas"
    },
    exchangeRateLabel: "Rate (Bs./USD):",
    rateHint: "BCV Ref / Editable",
    activityLog: "Recent Operational Activity Log",
    ganttHeader: "Operational Gantt Schedule",
    ganttSub: "Navigate past, current, and upcoming weeks. Project bars map automatically to real calendar dates.",
    prevWeek: "Prev Week",
    today: "Today",
    nextWeek: "Next Week",
    fullView: "Full View",
    noActiveWindow: "Scheduled outside this week",
    projectsHeader: "Projects & Task Execution",
    projectsSub: "Track budgets in USD ($), dual-currency execution (USD & Bs.), team leaders, and tasks.",
    newProjectBtn: "New Project Input",
    editBtn: "Edit",
    editProjectTitle: "Edit Project, Team Leader & Financials",
    editCrewTitle: "Edit Field Crew",
    editFleetTitle: "Edit Fleet Asset",
    crewsHeader: "Active Field Crews (Cuadrillas)",
    crewsSub: "Manage operational field teams, supervisors, regional assignments, and crew status.",
    registerCrewBtn: "Register New Crew",
    crewLeader: "Crew Leader / Supervisor",
    assignedProject: "Assigned Project",
    operationalZone: "Operational Zone",
    status: "Status",
    viewerRestricted: "Viewer mode: Create/Edit restricted",
    lead: "Project Lead",
    teamLeader: "Team Leader",
    site: "Site",
    budgetUsd: "Budget (USD $)",
    spentUsd: "Executed / Spent (USD $)",
    spentBs: "Executed / Spent (Bs.)",
    convertToBs: "USD → Bs.",
    convertToUsd: "Bs. → USD",
    progress: "Overall Progress",
    tasks: "Milestone Sub-Tasks",
    addTaskPlaceholder: "Add new task item...",
    softDelete: "Soft Delete",
    fleetHeader: "Fleet & Asset Telemetry",
    fleetSub: "Track field vehicles, fuel levels, maintenance hours, and active assignments.",
    registerFleetBtn: "Register Fleet Asset",
    unitAsset: "Unit Asset",
    assignedProjectField: "Assigned Project",
    locationSite: "Location / Site",
    fuelLevel: "Fuel Level",
    opHours: "Operation Hours",
    trashHeader: "Compliance Trash Bin, Audit Trail & JSON Data",
    trashSub: "Track every edit/delete, export or import JSON snapshots before database migration, or restore records.",
    deletedRecords: "Soft-Deleted Records",
    noDeleted: "No soft-deleted records in the trash bin.",
    restoreRecord: "Restore Record",
    exportJson: "Export JSON",
    importJson: "Import JSON",
    resetJson: "Reset Sample Data",
    fullAuditTitle: "Full Change & Audit History",
    cancel: "Cancel",
    saveProject: "Save Project",
    saveChanges: "Save Changes",
    registerUnit: "Register Unit",
    registerCrewTitle: "Register Field Crew",
    projectName: "Project Name",
    projectLead: "Project Lead",
    teamLeaderField: "Team Leader (Field)",
    siteLocation: "Site Location",
    startDate: "Start Date",
    endDate: "End Date",
    unitName: "Unit Asset Name",
    crewNamePlaceholder: "e.g., Alnardo Velasquez Squad",
    zonePlaceholder: "e.g., Caracas / Chacao"
  },
  es: {
    title: "Centro de Mando OS",
    subtitle: "Operaciones de Campo Avila Tech",
    profile: "Perfil:",
    admin: "Administrador",
    manager: "Gerente de Proyecto",
    viewer: "Visualizador (Solo Lectura)",
    tabs: {
      dashboard: "Tablero",
      gantt: "Diagrama de Gantt",
      projects: "Proyectos y Tareas",
      crews: "Cuadrillas de Campo",
      fleet: "Telemetría de Flota",
      archive: "Auditoría y Papelera"
    },
    kpi: {
      activeProjects: "PROYECTOS ACTIVOS",
      operationalSync: "Sincronización Operativa 100%",
      fleetDeployed: "FLOTA DESPLEGADA",
      telemetryConnected: "Telemetría Conectada",
      currentProfile: "PERFIL ACTUAL",
      permissionsActive: "Permisos Activos",
      activeCrews: "CUADRILLAS ACTIVAS",
      deployedRegions: "Regiones: Oriente, Cojedes, Caracas"
    },
    exchangeRateLabel: "Tasa (Bs./USD):",
    rateHint: "Ref. BCV / Editable",
    activityLog: "Registro de Actividad Operativa Reciente",
    ganttHeader: "Cronograma Operativo Gantt",
    ganttSub: "Navegue entre semanas pasadas, actual y futuras. Las barras se ubican según fechas reales.",
    prevWeek: "Semana Ant.",
    today: "Hoy",
    nextWeek: "Semana Sig.",
    fullView: "Vista Completa",
    noActiveWindow: "Programado fuera de esta semana",
    projectsHeader: "Gestión de Proyectos y Tareas",
    projectsSub: "Controle presupuestos en USD ($), ejecución en USD y Bs., líder de equipo y tareas.",
    newProjectBtn: "Nueva Entrada de Proyecto",
    editBtn: "Editar",
    editProjectTitle: "Editar Proyecto, Líder de Equipo y Finanzas",
    editCrewTitle: "Editar Cuadrilla de Campo",
    editFleetTitle: "Editar Activo de Flota",
    crewsHeader: "Cuadrillas de Campo Activas",
    crewsSub: "Administre equipos de terreno, líderes de cuadrilla, asignaciones regionales y estado operativo.",
    registerCrewBtn: "Registrar Nueva Cuadrilla",
    crewLeader: "Líder de Cuadrilla / Supervisor",
    assignedProject: "Proyecto Asignado",
    operationalZone: "Zona Operativa",
    status: "Estado",
    viewerRestricted: "Modo visualizador: Crear/Editar restringido",
    lead: "Líder Proyecto",
    teamLeader: "Líder de Equipo",
    site: "Sitio",
    budgetUsd: "Presupuesto (USD $)",
    spentUsd: "Ejecutado / Gastado (USD $)",
    spentBs: "Ejecutado / Gastado (Bs.)",
    convertToBs: "USD → Bs.",
    convertToUsd: "Bs. → USD",
    progress: "Avance General",
    tasks: "Sub-tareas / Hitos",
    addTaskPlaceholder: "Agregar nueva tarea...",
    softDelete: "Eliminación Suave",
    fleetHeader: "Telemetría de Flota y Activos",
    fleetSub: "Monitoree vehículos de campo, niveles de combustible, horas de mantenimiento y asignaciones.",
    registerFleetBtn: "Registrar Activo de Flota",
    unitAsset: "Activo / Unidad",
    assignedProjectField: "Proyecto Asignado",
    locationSite: "Ubicación / Sitio",
    fuelLevel: "Nivel de Combustible",
    opHours: "Horas de Operación",
    trashHeader: "Papelera de Cumplimiento, Auditoría y JSON",
    trashSub: "Registre cada edición/eliminación, exporte o importe JSON antes de migrar a BD, o restaure ítems.",
    deletedRecords: "Registros Eliminados (Papelera)",
    noDeleted: "No hay registros eliminados en la papelera.",
    restoreRecord: "Restaurar Registro",
    exportJson: "Exportar JSON",
    importJson: "Importar JSON",
    resetJson: "Restablecer Datos Base",
    fullAuditTitle: "Historial Completo de Cambios y Auditoría",
    cancel: "Cancelar",
    saveProject: "Guardar Proyecto",
    saveChanges: "Guardar Cambios",
    registerUnit: "Registrar Unidad",
    registerCrewTitle: "Registrar Cuadrilla de Campo",
    projectName: "Nombre del Proyecto",
    projectLead: "Líder de Proyecto",
    teamLeaderField: "Líder de Equipo (Campo)",
    siteLocation: "Ubicación / Sitio",
    startDate: "Fecha de Inicio",
    endDate: "Fecha de Fin",
    unitName: "Nombre del Activo",
    crewNamePlaceholder: "ej., Escuadrón Alnardo Velasquez",
    zonePlaceholder: "ej., Caracas / Chacao"
  }
};

const getRelativeDateStr = (daysFromToday) => {
  const d = new Date();
  d.setDate(d.getDate() + daysFromToday);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const parseLocalDate = (dateStr) => {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d, 0, 0, 0, 0);
};

const formatUsd = (val) => {
  const num = Number(val) || 0;
  return `$${num.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
};

const formatBs = (val) => {
  const num = Number(val) || 0;
  return `Bs. ${num.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const DEFAULT_RATE = 919.82;

const getInitialProjects = () => [
  {
    id: 1,
    name: 'Avila Tech Backbone Fiber Expansion',
    site: 'Caracas (Chacao / Baruta)',
    budgetUsd: 45000,
    spentUsd: 28500,
    spentBs: Number((28500 * DEFAULT_RATE).toFixed(2)),
    status: 'Active',
    lead: 'Cipriano Villalba',
    teamLeader: 'Alnardo Velasquez',
    startDate: getRelativeDateStr(-4),
    endDate: getRelativeDateStr(2),
    tasks: [
      { id: 101, title: 'COSSNA Safety Certification & Field Permits', completed: true },
      { id: 102, title: 'Trenching & Fiber Duct Installation', completed: true },
      { id: 103, title: 'Fusion Splicing & OTDR Testing', completed: false },
      { id: 104, title: 'Final Client Protocol Sign-off', completed: false }
    ]
  },
  {
    id: 2,
    name: 'Regional Microwave Link Upgrade',
    site: 'Oriente (Puerto La Cruz)',
    budgetUsd: 120000,
    spentUsd: 46000,
    spentBs: Number((46000 * DEFAULT_RATE).toFixed(2)),
    status: 'In Progress',
    lead: 'Yenson Bause',
    teamLeader: 'Elio Franco',
    startDate: getRelativeDateStr(-2),
    endDate: getRelativeDateStr(5),
    tasks: [
      { id: 201, title: 'Tower Rigging & Structural Inspection', completed: true },
      { id: 202, title: 'Dish Antenna Mounting & Cabling', completed: false },
      { id: 203, title: 'Frequency Alignment & Power Calibration', completed: false }
    ]
  },
  {
    id: 3,
    name: 'Cojedes Infrastructure Node Integration',
    site: 'Cojedes / Yaritagua',
    budgetUsd: 28000,
    spentUsd: 4200,
    spentBs: Number((4200 * DEFAULT_RATE).toFixed(2)),
    status: 'Planning',
    lead: 'Oscar Morales',
    teamLeader: 'Francisco Cardona',
    startDate: getRelativeDateStr(1),
    endDate: getRelativeDateStr(8),
    tasks: [
      { id: 301, title: 'Site Survey & Logistics Procurement', completed: true },
      { id: 302, title: 'Backup Generator & UPS Rack Installation', completed: false }
    ]
  }
];

const getInitialCrews = () => [
  { id: 1, leader: 'Alnardo Velasquez', project: 'Avila Tech Backbone', zone: 'Caracas Norte', status: 'Deployed' },
  { id: 2, leader: 'Wilmer Diaz', project: 'Avila Tech Backbone', zone: 'Caracas Este (Chacao)', status: 'Deployed' },
  { id: 3, leader: 'Elio Franco', project: 'Regional Microwave Link', zone: 'Oriente (Puerto La Cruz)', status: 'Deployed' },
  { id: 4, leader: 'José Mata', project: 'Regional Microwave Link', zone: 'El Tigre', status: 'Active' },
  { id: 5, leader: 'Francisco Cardona', project: 'Cojedes Node Integration', zone: 'Cojedes / Yaritagua', status: 'Deployed' },
  { id: 6, leader: 'Deivis Bompart', project: 'WL Infrastructure Framework', zone: 'Centro / Calabozo', status: 'Deployed' },
  { id: 7, leader: 'Jaime Quevedo', project: 'WL Infrastructure Framework', zone: 'Carabobo / Cojedes', status: 'Active' }
];

const getInitialFleet = () => [
  { id: 101, unit: 'Truck 04 - Ford F-350', project: 'Avila Tech Backbone', site: 'Caracas Norte', fuel: '75%', hours: '1,420 hrs', status: 'Deployed' },
  { id: 102, unit: 'Crane Rig 02 - Isuzu', project: 'Microwave Link Upgrade', site: 'Puerto La Cruz', fuel: '40%', hours: '3,100 hrs', status: 'Active' },
  { id: 103, unit: 'Service Van 08 - HiAce', project: 'Cojedes Node', site: 'Cojedes', fuel: '90%', hours: '850 hrs', status: 'Standby' }
];

export default function App() {
  const fileInputRef = useRef(null);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('avila_dark') ? JSON.parse(localStorage.getItem('avila_dark')) : true;
  });
  const [lang, setLang] = useState(() => localStorage.getItem('avila_lang') || 'es');
  const [activeRole, setActiveRole] = useState('Administrator');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [weekOffset, setWeekOffset] = useState(0);

  // Exchange rate (Bs. per 1 USD)
  const [exchangeRate, setExchangeRate] = useState(() => {
    const saved = localStorage.getItem('avila_rate');
    return saved ? Number(saved) : DEFAULT_RATE;
  });

  const dict = t[lang];
  const canEdit = activeRole === 'Administrator' || activeRole === 'Project Manager';

  const nowStamp = () => new Date().toISOString().replace('T', ' ').substring(0, 16);

  const appendAudit = (action, category, actor = activeRole) => {
    setAuditLogs((prev) => [
      { id: Date.now() + Math.random(), timestamp: nowStamp(), user: actor, action, category },
      ...prev
    ]);
  };

  useEffect(() => {
    localStorage.setItem('avila_dark', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('avila_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('avila_rate', String(exchangeRate || DEFAULT_RATE));
  }, [exchangeRate]);

  // Persistent JSON states via localStorage
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('avila_projects');
    if (saved) return JSON.parse(saved);
    return getInitialProjects();
  });

  const [crews, setCrews] = useState(() => {
    const saved = localStorage.getItem('avila_crews');
    if (saved) return JSON.parse(saved);
    return getInitialCrews();
  });

  const [fleet, setFleet] = useState(() => {
    const saved = localStorage.getItem('avila_fleet');
    if (saved) return JSON.parse(saved);
    return getInitialFleet();
  });

  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('avila_logs');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, timestamp: nowStamp(), user: 'Cipriano Villalba', action: 'Initialized dual-currency (USD/Bs.), Team Leader field, edit audit & JSON store', category: 'Operations' }
    ];
  });

  const [trashBin, setTrashBin] = useState(() => {
    const saved = localStorage.getItem('avila_trash');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => { localStorage.setItem('avila_projects', JSON.stringify(projects)); }, [projects]);
  useEffect(() => { localStorage.setItem('avila_crews', JSON.stringify(crews)); }, [crews]);
  useEffect(() => { localStorage.setItem('avila_fleet', JSON.stringify(fleet)); }, [fleet]);
  useEffect(() => { localStorage.setItem('avila_logs', JSON.stringify(auditLogs)); }, [auditLogs]);
  useEffect(() => { localStorage.setItem('avila_trash', JSON.stringify(trashBin)); }, [trashBin]);

  // Create Modals
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showFleetModal, setShowFleetModal] = useState(false);
  const [showCrewModal, setShowCrewModal] = useState(false);

  // Edit Modals
  const [editingProject, setEditingProject] = useState(null);
  const [editingCrew, setEditingCrew] = useState(null);
  const [editingFleet, setEditingFleet] = useState(null);

  const [newProject, setNewProject] = useState({ 
    name: '', 
    site: '', 
    budgetUsd: 25000,
    spentUsd: 0,
    spentBs: 0,
    lead: '',
    teamLeader: '',
    startDate: getRelativeDateStr(0),
    endDate: getRelativeDateStr(4)
  });
  const [newFleet, setNewFleet] = useState({ unit: '', project: '', site: '', fuel: '100%', hours: '0 hrs', status: 'Active' });
  const [newCrew, setNewCrew] = useState({ leader: '', project: 'Avila Tech Backbone', zone: '', status: 'Deployed' });
  const [newTaskInput, setNewTaskInput] = useState({});

  const getWeekDays = (offset) => {
    const now = new Date();
    const baseDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (offset * 7));
    const currentDayOfWeek = baseDate.getDay();
    const distanceToMonday = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
    const monday = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + distanceToMonday);

    const dayNamesEs = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const dayNamesEn = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const monthNamesEs = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const monthNamesEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const todayZero = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const days = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i);
      const dayName = lang === 'es' ? dayNamesEs[i] : dayNamesEn[i];
      const monthName = lang === 'es' ? monthNamesEs[d.getMonth()] : monthNamesEn[d.getMonth()];
      const dayNum = String(d.getDate()).padStart(2, '0');
      const isToday = d.getTime() === todayZero.getTime();

      days.push({
        date: d,
        shortLabel: `${dayName} ${dayNum}`,
        fullLabel: `${dayName} ${dayNum} ${monthName}`,
        isToday
      });
    }
    return days;
  };

  const currentWeekDays = getWeekDays(weekOffset);

  const getGanttBarPlacement = (startDateStr, endDateStr, weekDays) => {
    if (!startDateStr || !endDateStr) return null;
    const projStart = parseLocalDate(startDateStr);
    const projEnd = parseLocalDate(endDateStr);
    const weekStart = weekDays[0].date;
    const weekEnd = weekDays[6].date;

    if (projEnd < weekStart || projStart > weekEnd) return null;

    const effectiveStart = projStart < weekStart ? weekStart : projStart;
    const effectiveEnd = projEnd > weekEnd ? weekEnd : projEnd;

    const msPerDay = 1000 * 60 * 60 * 24;
    const startCol = Math.round((effectiveStart - weekStart) / msPerDay) + 1;
    const endCol = Math.round((effectiveEnd - weekStart) / msPerDay) + 1;
    const spanCol = Math.max(1, endCol - startCol + 1);

    return { startCol, spanCol };
  };

  const getProjectProgress = (tasks) => {
    if (!tasks || tasks.length === 0) return 0;
    const completed = tasks.filter(item => item.completed).length;
    return Math.round((completed / tasks.length) * 100);
  };

  const toggleTask = (projectId, taskId) => {
    const proj = projects.find(p => p.id === projectId);
    const task = proj?.tasks.find(tItem => tItem.id === taskId);
    setProjects(projects.map(p => {
      if (p.id === projectId) {
        const updatedTasks = p.tasks.map(item => item.id === taskId ? { ...item, completed: !item.completed } : item);
        return { ...p, tasks: updatedTasks };
      }
      return p;
    }));
    if (proj && task) {
      appendAudit(`Toggled task "${task.title}" (${!task.completed ? 'Done' : 'Open'}) in "${proj.name}"`, 'Task');
    }
  };

  const handleAddTask = (projectId) => {
    const title = newTaskInput[projectId];
    if (!title) return;
    const proj = projects.find(p => p.id === projectId);
    setProjects(projects.map(p => {
      if (p.id === projectId) {
        return { ...p, tasks: [...p.tasks, { id: Date.now(), title, completed: false }] };
      }
      return p;
    }));
    setNewTaskInput({ ...newTaskInput, [projectId]: '' });
    if (proj) appendAudit(`Added task "${title}" to "${proj.name}"`, 'Task');
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.name || !canEdit) return;
    const bUsd = Number(newProject.budgetUsd) || 0;
    const sUsd = Number(newProject.spentUsd) || 0;
    const sBs = Number(newProject.spentBs) || 0;
    const item = { 
      id: Date.now(), 
      ...newProject,
      budgetUsd: bUsd,
      spentUsd: sUsd,
      spentBs: sBs,
      status: 'Active', 
      tasks: [{ id: Date.now() + 1, title: 'Initial Mobilization & Equipment Dispatch', completed: false }]
    };
    setProjects([item, ...projects]);
    appendAudit(
      `Created project "${item.name}" | Team Leader: ${item.teamLeader || 'N/A'} | Budget: ${formatUsd(bUsd)} | Spent: ${formatUsd(sUsd)} / ${formatBs(sBs)}`,
      'Project'
    );
    setNewProject({ 
      name: '', site: '', budgetUsd: 25000, spentUsd: 0, spentBs: 0, lead: '', teamLeader: '',
      startDate: getRelativeDateStr(0), endDate: getRelativeDateStr(4) 
    });
    setShowProjectModal(false);
  };

  const handleSaveEditedProject = (e) => {
    e.preventDefault();
    if (!editingProject || !canEdit) return;
    const prev = projects.find(p => p.id === editingProject.id);
    const updated = {
      ...editingProject,
      budgetUsd: Number(editingProject.budgetUsd) || 0,
      spentUsd: Number(editingProject.spentUsd) || 0,
      spentBs: Number(editingProject.spentBs) || 0
    };
    setProjects(projects.map(p => p.id === updated.id ? updated : p));
    appendAudit(
      `Edited project "${updated.name}" (Team Leader: ${updated.teamLeader || 'N/A'}, Budget: ${formatUsd(updated.budgetUsd)}, Spent USD: ${formatUsd(updated.spentUsd)}, Spent Bs.: ${formatBs(updated.spentBs)}, Status: ${updated.status}${prev && prev.site !== updated.site ? `, Site: ${prev.site} -> ${updated.site}` : ''})`,
      'Edit'
    );
    setEditingProject(null);
  };

  const handleSaveEditedCrew = (e) => {
    e.preventDefault();
    if (!editingCrew || !canEdit) return;
    setCrews(crews.map(c => c.id === editingCrew.id ? editingCrew : c));
    appendAudit(`Edited crew "${editingCrew.leader}" (Zone: ${editingCrew.zone}, Project: ${editingCrew.project}, Status: ${editingCrew.status})`, 'Edit');
    setEditingCrew(null);
  };

  const handleSaveEditedFleet = (e) => {
    e.preventDefault();
    if (!editingFleet || !canEdit) return;
    setFleet(fleet.map(f => f.id === editingFleet.id ? editingFleet : f));
    appendAudit(`Edited fleet unit "${editingFleet.unit}" (Site: ${editingFleet.site}, Fuel: ${editingFleet.fuel}, Hours: ${editingFleet.hours}, Status: ${editingFleet.status})`, 'Edit');
    setEditingFleet(null);
  };

  const handleAddFleet = (e) => {
    e.preventDefault();
    if (!newFleet.unit || !canEdit) return;
    const item = { id: Date.now(), ...newFleet, status: newFleet.status || 'Active' };
    setFleet([item, ...fleet]);
    appendAudit(`Registered fleet unit "${item.unit}"`, 'Fleet');
    setNewFleet({ unit: '', project: '', site: '', fuel: '100%', hours: '0 hrs', status: 'Active' });
    setShowFleetModal(false);
  };

  const handleAddCrew = (e) => {
    e.preventDefault();
    if (!newCrew.leader || !canEdit) return;
    const item = { id: Date.now(), ...newCrew };
    setCrews([item, ...crews]);
    appendAudit(`Registered field crew under "${item.leader}"`, 'Crews');
    setNewCrew({ leader: '', project: 'Avila Tech Backbone', zone: '', status: 'Deployed' });
    setShowCrewModal(false);
  };

  const softDeleteProject = (id) => {
    const target = projects.find(p => p.id === id);
    if (!target) return;
    setProjects(projects.filter(p => p.id !== id));
    setTrashBin([{ ...target, type: 'Project', deletedAt: new Date().toLocaleString() }, ...trashBin]);
    appendAudit(`Soft-deleted project "${target.name}"`, 'Archive');
  };

  const restoreProject = (item) => {
    setTrashBin(trashBin.filter(tr => tr.id !== item.id));
    setProjects([{ 
      id: item.id, 
      name: item.name, 
      site: item.site, 
      budgetUsd: item.budgetUsd ?? 0,
      spentUsd: item.spentUsd ?? 0,
      spentBs: item.spentBs ?? 0,
      status: item.status, 
      startDate: item.startDate || getRelativeDateStr(0),
      endDate: item.endDate || getRelativeDateStr(4),
      tasks: item.tasks || [], 
      lead: item.lead,
      teamLeader: item.teamLeader || ''
    }, ...projects]);
    appendAudit(`Restored project "${item.name}" from trash bin`, 'Archive');
  };

  // JSON Export / Import / Reset for easy database transition later
  const handleExportJson = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      brand: 'Avila Tech - Command Center OS',
      exchangeRateBsPerUsd: exchangeRate,
      projects,
      crews,
      fleet,
      trashBin,
      auditLogs
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `avila-tech-command-center-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    appendAudit('Exported JSON operational snapshot', 'JSON');
  };

  const handleImportJson = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(String(event.target?.result || '{}'));
        if (Array.isArray(data.projects)) setProjects(data.projects);
        if (Array.isArray(data.crews)) setCrews(data.crews);
        if (Array.isArray(data.fleet)) setFleet(data.fleet);
        if (Array.isArray(data.trashBin)) setTrashBin(data.trashBin);
        if (typeof data.exchangeRateBsPerUsd === 'number') setExchangeRate(data.exchangeRateBsPerUsd);
        const importedLogs = Array.isArray(data.auditLogs) ? data.auditLogs : auditLogs;
        setAuditLogs([
          { id: Date.now(), timestamp: nowStamp(), user: activeRole, action: `Imported JSON snapshot "${file.name}"`, category: 'JSON' },
          ...importedLogs
        ]);
      } catch {
        alert(lang === 'es' ? 'Archivo JSON inválido.' : 'Invalid JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleResetSampleData = () => {
    setProjects(getInitialProjects());
    setCrews(getInitialCrews());
    setFleet(getInitialFleet());
    setTrashBin([]);
    setExchangeRate(DEFAULT_RATE);
    setAuditLogs([{ id: Date.now(), timestamp: nowStamp(), user: activeRole, action: 'Reset dataset to Avila Tech sample defaults', category: 'JSON' }]);
  };

  const renderWeekControls = () => (
    <div className="flex flex-wrap items-center justify-between gap-2 mb-4 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
      <div className="flex items-center space-x-2">
        <button 
          onClick={() => setWeekOffset(weekOffset - 1)}
          className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>{dict.prevWeek}</span>
        </button>
        <button 
          onClick={() => setWeekOffset(0)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition shadow ${weekOffset === 0 ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
        >
          {dict.today}
        </button>
        <button 
          onClick={() => setWeekOffset(weekOffset + 1)}
          className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <span>{dict.nextWeek}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
      
      <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400">
        {currentWeekDays[0].fullLabel} — {currentWeekDays[6].fullLabel}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      
      {/* Sticky Header & Navigation Bar */}
      <div className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-300 dark:border-slate-800 shadow-sm">
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 text-white p-2 rounded-lg font-bold flex items-center justify-center shadow-md shadow-indigo-600/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold leading-tight">{dict.title}</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">{dict.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Exchange Rate Control (Bs. / USD) */}
            <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs">
              <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-slate-500 dark:text-slate-400 font-medium hidden lg:inline">{dict.exchangeRateLabel}</span>
              <input
                type="number"
                step="0.01"
                min="1"
                disabled={!canEdit}
                value={exchangeRate}
                onChange={(e) => setExchangeRate(parseFloat(e.target.value) || DEFAULT_RATE)}
                className="w-16 sm:w-20 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-1.5 py-0.5 font-mono font-bold text-emerald-600 dark:text-emerald-400 focus:outline-none focus:border-indigo-500 disabled:opacity-60"
                title={dict.rateHint}
              />
            </div>

            {/* Language Switcher */}
            <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs">
              <Globe className="w-3.5 h-3.5 text-indigo-500" />
              <button 
                onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
                className="font-bold hover:text-indigo-500 transition uppercase px-1"
              >
                {lang}
              </button>
            </div>

            {/* Role Switcher */}
            <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700">
              <UserCheck className="w-4 h-4 text-indigo-500" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400 hidden md:inline">{dict.profile}</span>
              <select 
                value={activeRole} 
                onChange={(e) => setActiveRole(e.target.value)}
                className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer"
              >
                <option value="Administrator" className="dark:bg-slate-900">{dict.admin}</option>
                <option value="Project Manager" className="dark:bg-slate-900">{dict.manager}</option>
                <option value="Viewer" className="dark:bg-slate-900">{dict.viewer}</option>
              </select>
            </div>

            {/* Theme Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>
          </div>
        </header>

        {/* Navigation Tabs Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex space-x-2 overflow-x-auto border-t border-slate-200 dark:border-slate-800/80">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700'}`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>{dict.tabs.dashboard}</span>
          </button>
          <button 
            onClick={() => setActiveTab('gantt')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${activeTab === 'gantt' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700'}`}
          >
            <CalendarDays className="w-4 h-4" />
            <span>{dict.tabs.gantt}</span>
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${activeTab === 'projects' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700'}`}
          >
            <FolderKanban className="w-4 h-4" />
            <span>{dict.tabs.projects}</span>
          </button>
          <button 
            onClick={() => setActiveTab('crews')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${activeTab === 'crews' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700'}`}
          >
            <Users className="w-4 h-4" />
            <span>{dict.tabs.crews}</span>
          </button>
          <button 
            onClick={() => setActiveTab('fleet')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${activeTab === 'fleet' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700'}`}
          >
            <Truck className="w-4 h-4" />
            <span>{dict.tabs.fleet}</span>
          </button>
          <button 
            onClick={() => setActiveTab('archive')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${activeTab === 'archive' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700'}`}
          >
            <History className="w-4 h-4" />
            <span>{dict.tabs.archive}</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-300 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{dict.kpi.activeProjects}</span>
                  <FolderKanban className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="text-2xl font-bold mt-2">{projects.length}</div>
                <p className="text-xs text-emerald-500 mt-1 font-medium">{dict.kpi.operationalSync}</p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-300 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{dict.kpi.activeCrews}</span>
                  <Users className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="text-2xl font-bold mt-2">{crews.length} Teams</div>
                <p className="text-xs text-indigo-400 mt-1 font-medium">{dict.kpi.deployedRegions}</p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-300 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{dict.kpi.fleetDeployed}</span>
                  <Truck className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="text-2xl font-bold mt-2">{fleet.length} Units</div>
                <p className="text-xs text-emerald-500 mt-1 font-medium">{dict.kpi.telemetryConnected}</p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-300 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{dict.kpi.currentProfile}</span>
                  <UserCheck className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="text-lg font-bold mt-2 truncate">{activeRole}</div>
                <p className="text-xs text-indigo-400 mt-1 font-medium">{dict.kpi.permissionsActive}</p>
              </div>
            </div>

            {/* Interactive Weekly Gantt Preview */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold flex items-center space-x-2">
                  <CalendarDays className="w-4 h-4 text-indigo-500" />
                  <span>{dict.ganttHeader}</span>
                </h3>
                <button 
                  onClick={() => setActiveTab('gantt')}
                  className="text-xs font-semibold text-indigo-500 hover:text-indigo-400 flex items-center space-x-1"
                >
                  <span>{dict.fullView}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {renderWeekControls()}

              <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold border-b border-slate-200 dark:border-slate-800 pb-2">
                {currentWeekDays.map((day, idx) => (
                  <div 
                    key={idx} 
                    className={`py-1.5 rounded-t-md ${
                      day.isToday 
                        ? 'bg-indigo-600/20 text-indigo-500 dark:text-indigo-400 border-b-2 border-indigo-500 font-black' 
                        : 'text-slate-400'
                    }`}
                  >
                    {day.shortLabel}
                  </div>
                ))}
              </div>

              <div className="space-y-3 mt-4">
                {projects.map(proj => {
                  const progress = getProjectProgress(proj.tasks);
                  const placement = getGanttBarPlacement(proj.startDate, proj.endDate, currentWeekDays);
                  return (
                    <div key={proj.id} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold truncate max-w-[300px]">
                          {proj.name} {proj.teamLeader ? `(${proj.teamLeader})` : ''}
                        </span>
                        <span className="text-slate-400 font-mono">{progress}%</span>
                      </div>
                      <div className="grid grid-cols-7 gap-2 h-7 bg-slate-50 dark:bg-slate-800/40 rounded-lg p-1 border border-slate-200 dark:border-slate-800/60 items-center">
                        {placement ? (
                          <div 
                            className="bg-indigo-600 h-full rounded flex items-center px-2 text-[10px] font-bold text-white shadow-sm transition-all"
                            style={{
                              gridColumnStart: placement.startCol,
                              gridColumnEnd: `span ${placement.spanCol}`
                            }}
                          >
                            <span className="truncate">{proj.site}</span>
                          </div>
                        ) : (
                          <div className="col-span-7 text-center text-[10px] text-slate-400 italic">
                            {dict.noActiveWindow} ({proj.startDate} → {proj.endDate})
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Activity Log */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="text-base font-bold mb-4 flex items-center space-x-2">
                <Activity className="w-4 h-4 text-indigo-500" />
                <span>{dict.activityLog}</span>
              </h3>
              <div className="space-y-3">
                {auditLogs.slice(0, 5).map(log => (
                  <div key={log.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs gap-2">
                    <div className="flex items-center space-x-3">
                      <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-semibold shrink-0">{log.category}</span>
                      <span>{log.action}</span>
                    </div>
                    <div className="text-slate-400 space-x-4 shrink-0">
                      <span>By {log.user}</span>
                      <span>{log.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FULL GANTT TIMELINE */}
        {activeTab === 'gantt' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold">{dict.ganttHeader}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{dict.ganttSub}</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 p-6 shadow-sm overflow-x-auto">
              {renderWeekControls()}

              <div className="min-w-[720px]">
                <div className="grid grid-cols-12 gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 text-xs font-bold text-slate-400">
                  <div className="col-span-4 flex items-center">Project, Site & Team Leader</div>
                  <div className="col-span-8 grid grid-cols-7 text-center">
                    {currentWeekDays.map((day, idx) => (
                      <div 
                        key={idx} 
                        className={`py-1.5 rounded-t-md ${
                          day.isToday 
                            ? 'bg-indigo-600/20 text-indigo-500 dark:text-indigo-400 border-b-2 border-indigo-500 font-black' 
                            : ''
                        }`}
                      >
                        {day.shortLabel}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="divide-y divide-slate-200 dark:divide-slate-800/60">
                  {projects.map(proj => {
                    const progress = getProjectProgress(proj.tasks);
                    const placement = getGanttBarPlacement(proj.startDate, proj.endDate, currentWeekDays);
                    return (
                      <div key={proj.id} className="grid grid-cols-12 gap-2 py-4 items-center">
                        <div className="col-span-4 pr-2">
                          <h4 className="font-bold text-xs truncate">{proj.name}</h4>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="text-[10px] text-indigo-400 flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{proj.site}</span>
                            </span>
                            {proj.teamLeader && (
                              <span className="text-[10px] text-amber-500 dark:text-amber-400 flex items-center space-x-1">
                                <HardHat className="w-3 h-3" />
                                <span>{proj.teamLeader}</span>
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                            {proj.startDate} → {proj.endDate} | {proj.lead}
                          </div>
                        </div>

                        <div className="col-span-8 grid grid-cols-7 gap-2 h-9 bg-slate-50 dark:bg-slate-800/30 rounded-lg p-1 relative items-center">
                          {placement ? (
                            <div 
                              className="bg-indigo-600 hover:bg-indigo-500 h-full transition-colors rounded-md flex items-center justify-between px-3 text-xs font-semibold text-white shadow-md"
                              style={{
                                gridColumnStart: placement.startCol,
                                gridColumnEnd: `span ${placement.spanCol}`
                              }}
                            >
                              <span className="truncate">{proj.name}</span>
                              <span className="bg-black/30 px-1.5 py-0.5 rounded text-[10px] font-mono ml-2">{progress}%</span>
                            </div>
                          ) : (
                            <div className="col-span-7 text-center text-[11px] text-slate-400 italic">
                              {dict.noActiveWindow}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PROJECTS & ASANA-STYLE TASKS */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold">{dict.projectsHeader}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{dict.projectsSub}</p>
              </div>
              {canEdit ? (
                <button 
                  onClick={() => setShowProjectModal(true)}
                  className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-semibold transition shadow-md shadow-indigo-600/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>{dict.newProjectBtn}</span>
                </button>
              ) : (
                <span className="text-xs text-amber-500 font-medium bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">{dict.viewerRestricted}</span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map(proj => {
                const progress = getProjectProgress(proj.tasks);
                const spentUsdVal = Number(proj.spentUsd) || 0;
                const spentBsVal = Number(proj.spentBs) || 0;
                const combinedUsd = spentUsdVal + (exchangeRate > 0 ? spentBsVal / exchangeRate : 0);

                return (
                  <div key={proj.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{proj.status}</span>
                        <span className="text-sm font-extrabold text-emerald-500 dark:text-emerald-400 font-mono">{formatUsd(proj.budgetUsd)}</span>
                      </div>

                      <h4 className="font-bold text-base mt-2">{proj.name}</h4>
                      <p className="text-xs text-indigo-400 mt-1 flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{proj.site}</span>
                      </p>
                      <div className="mt-1.5 space-y-0.5 text-xs text-slate-500 dark:text-slate-400">
                        <p>{dict.lead}: <span className="font-semibold text-slate-700 dark:text-slate-300">{proj.lead}</span></p>
                        <p className="flex items-center space-x-1 text-amber-600 dark:text-amber-400 font-medium">
                          <HardHat className="w-3.5 h-3.5 shrink-0" />
                          <span>{dict.teamLeader}: <strong>{proj.teamLeader || '—'}</strong></span>
                        </p>
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono mt-1">{proj.startDate} → {proj.endDate}</p>

                      {/* Dual-Currency Execution Box (USD & Bs.) */}
                      <div className="mt-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400">{dict.spentUsd}:</span>
                          <span className="font-mono font-bold text-slate-800 dark:text-slate-100">{formatUsd(spentUsdVal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400">{dict.spentBs}:</span>
                          <span className="font-mono font-bold text-indigo-500 dark:text-indigo-400">{formatBs(spentBsVal)}</span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-slate-200 dark:border-slate-700 text-[11px]">
                          <span className="text-slate-400">Est. Total USD (@ {exchangeRate}):</span>
                          <span className="font-mono font-semibold text-emerald-500">{formatUsd(combinedUsd)}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between text-xs mb-1 font-medium">
                          <span className="text-slate-400">{dict.progress}</span>
                          <span className="font-bold">{progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-indigo-600 h-full rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                        <h5 className="text-xs font-bold mb-3 flex items-center justify-between">
                          <span className="flex items-center space-x-1.5">
                            <CheckSquare className="w-3.5 h-3.5 text-indigo-500" />
                            <span>{dict.tasks}</span>
                          </span>
                          <span className="text-[10px] text-slate-400">{proj.tasks.filter(item => item.completed).length}/{proj.tasks.length}</span>
                        </h5>

                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                          {proj.tasks.map(task => (
                            <div 
                              key={task.id} 
                              onClick={() => canEdit && toggleTask(proj.id, task.id)}
                              className={`flex items-start space-x-2.5 p-2 rounded-lg border text-xs cursor-pointer transition ${task.completed ? 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 line-through text-slate-400' : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 font-medium'}`}
                            >
                              <input 
                                type="checkbox" 
                                checked={task.completed} 
                                onChange={() => {}} 
                                className="mt-0.5 rounded accent-indigo-600 cursor-pointer" 
                              />
                              <span className="leading-tight">{task.title}</span>
                            </div>
                          ))}
                        </div>

                        {canEdit && (
                          <div className="mt-3 flex space-x-2">
                            <input 
                              type="text" 
                              value={newTaskInput[proj.id] || ''} 
                              onChange={e => setNewTaskInput({ ...newTaskInput, [proj.id]: e.target.value })}
                              placeholder={dict.addTaskPlaceholder}
                              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                              onKeyDown={e => e.key === 'Enter' && handleAddTask(proj.id)}
                            />
                            <button 
                              onClick={() => handleAddTask(proj.id)}
                              className="bg-indigo-600 hover:bg-indigo-500 text-white px-2.5 py-1.5 rounded-lg text-xs font-bold transition"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2">
                      {canEdit && (
                        <button
                          onClick={() => setEditingProject({ ...proj })}
                          className="flex items-center space-x-1.5 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 px-3 py-1.5 rounded-lg font-semibold transition"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          <span>{dict.editBtn}</span>
                        </button>
                      )}
                      {activeRole === 'Administrator' && (
                        <button 
                          onClick={() => softDeleteProject(proj.id)}
                          className="flex items-center space-x-1.5 text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 px-3 py-1.5 rounded-lg transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{dict.softDelete}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: ACTIVE FIELD CREWS */}
        {activeTab === 'crews' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold">{dict.crewsHeader}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{dict.crewsSub}</p>
              </div>
              {canEdit ? (
                <button 
                  onClick={() => setShowCrewModal(true)}
                  className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-semibold transition shadow-md shadow-indigo-600/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>{dict.registerCrewBtn}</span>
                </button>
              ) : (
                <span className="text-xs text-amber-500 font-medium bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">{dict.viewerRestricted}</span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {crews.map(crew => (
                <div key={crew.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{crew.status}</span>
                      <Users className="w-4 h-4 text-indigo-500" />
                    </div>
                    <h4 className="font-bold text-base mt-2">{crew.leader}</h4>
                    <p className="text-xs text-indigo-400 mt-1 flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{crew.zone}</span>
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Project: <span className="font-medium text-slate-700 dark:text-slate-300">{crew.project}</span></p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Field Supervisor ID: #{crew.id * 104}</span>
                    {canEdit ? (
                      <button
                        onClick={() => setEditingCrew({ ...crew })}
                        className="flex items-center space-x-1 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 px-2.5 py-1 rounded-lg font-semibold transition"
                      >
                        <Pencil className="w-3 h-3" />
                        <span>{dict.editBtn}</span>
                      </button>
                    ) : (
                      <span className="text-indigo-400 font-semibold">Active Operational Squad</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: FLEET TELEMETRY */}
        {activeTab === 'fleet' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold">{dict.fleetHeader}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{dict.fleetSub}</p>
              </div>
              {canEdit ? (
                <button 
                  onClick={() => setShowFleetModal(true)}
                  className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-semibold transition shadow-md shadow-indigo-600/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>{dict.registerFleetBtn}</span>
                </button>
              ) : (
                <span className="text-xs text-amber-500 font-medium bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">{dict.viewerRestricted}</span>
              )}
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 overflow-x-auto shadow-sm">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-400">
                    <th className="p-4 font-semibold">{dict.unitAsset}</th>
                    <th className="p-4 font-semibold">{dict.assignedProjectField}</th>
                    <th className="p-4 font-semibold">{dict.locationSite}</th>
                    <th className="p-4 font-semibold">{dict.fuelLevel}</th>
                    <th className="p-4 font-semibold">{dict.opHours}</th>
                    <th className="p-4 font-semibold">{dict.status}</th>
                    {canEdit && <th className="p-4 font-semibold text-right">{dict.editBtn}</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {fleet.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                      <td className="p-4 font-bold flex items-center space-x-2">
                        <Truck className="w-4 h-4 text-indigo-500" />
                        <span>{item.unit}</span>
                      </td>
                      <td className="p-4 text-slate-400">{item.project}</td>
                      <td className="p-4 text-indigo-400">{item.site}</td>
                      <td className="p-4 font-semibold text-emerald-400">{item.fuel}</td>
                      <td className="p-4 text-slate-300">{item.hours}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          {item.status}
                        </span>
                      </td>
                      {canEdit && (
                        <td className="p-4 text-right">
                          <button
                            onClick={() => setEditingFleet({ ...item })}
                            className="inline-flex items-center space-x-1 text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 px-2.5 py-1 rounded-lg font-semibold transition"
                          >
                            <Pencil className="w-3 h-3" />
                            <span>{dict.editBtn}</span>
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: AUDIT, JSON SNAPSHOTS & TRASH */}
        {activeTab === 'archive' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold">{dict.trashHeader}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{dict.trashSub}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleExportJson}
                  className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-2 rounded-lg text-xs font-semibold transition shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{dict.exportJson}</span>
                </button>
                {canEdit && (
                  <>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center space-x-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 px-3.5 py-2 rounded-lg text-xs font-semibold transition border border-slate-300 dark:border-slate-700"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{dict.importJson}</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="application/json"
                      onChange={handleImportJson}
                      className="hidden"
                    />
                  </>
                )}
                {activeRole === 'Administrator' && (
                  <button
                    onClick={handleResetSampleData}
                    className="flex items-center space-x-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/30 px-3.5 py-2 rounded-lg text-xs font-semibold transition"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{dict.resetJson}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Soft-Deleted Records */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 p-6 shadow-sm">
              <h4 className="text-sm font-bold mb-4 flex items-center space-x-2">
                <Trash2 className="w-4 h-4 text-rose-500" />
                <span>{dict.deletedRecords} ({trashBin.length})</span>
              </h4>
              {trashBin.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-4">{dict.noDeleted}</p>
              ) : (
                <div className="space-y-3">
                  {trashBin.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 rounded-lg bg-rose-500/5 border border-rose-500/20 text-xs">
                      <div>
                        <span className="font-bold text-sm">{item.name}</span>
                        <p className="text-slate-400 mt-0.5">Deleted at: {item.deletedAt} | Budget: {formatUsd(item.budgetUsd)}</p>
                      </div>
                      {activeRole === 'Administrator' && (
                        <button 
                          onClick={() => restoreProject(item)}
                          className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg font-semibold transition shadow"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>{dict.restoreRecord}</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Full Audit Trail */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 p-6 shadow-sm">
              <h4 className="text-sm font-bold mb-4 flex items-center space-x-2">
                <Activity className="w-4 h-4 text-indigo-500" />
                <span>{dict.fullAuditTitle} ({auditLogs.length})</span>
              </h4>
              <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                {auditLogs.map(log => (
                  <div key={log.id} className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs">
                    <div className="flex items-center space-x-3">
                      <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-semibold">{log.category}</span>
                      <span>{log.action}</span>
                    </div>
                    <div className="text-slate-400 space-x-4 font-mono text-[11px]">
                      <span>{log.user}</span>
                      <span>{log.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* MODAL: NEW PROJECT */}
      {showProjectModal && canEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold mb-4">{dict.newProjectBtn}</h3>
            <form onSubmit={handleAddProject} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">{dict.projectName}</label>
                <input 
                  type="text" 
                  required
                  value={newProject.name} 
                  onChange={e => setNewProject({...newProject, name: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500" 
                  placeholder="e.g., Regional Microwave Link" 
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">{dict.siteLocation}</label>
                <input 
                  type="text" 
                  required
                  value={newProject.site} 
                  onChange={e => setNewProject({...newProject, site: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500" 
                  placeholder="e.g., Oriente (Puerto La Cruz)" 
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">{dict.projectLead}</label>
                  <input 
                    type="text" 
                    required
                    value={newProject.lead} 
                    onChange={e => setNewProject({...newProject, lead: e.target.value})}
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500" 
                    placeholder="e.g., Cipriano Villalba" 
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">{dict.teamLeaderField}</label>
                  <input 
                    type="text" 
                    required
                    list="crew-leaders-list"
                    value={newProject.teamLeader} 
                    onChange={e => setNewProject({...newProject, teamLeader: e.target.value})}
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500" 
                    placeholder="e.g., Alnardo Velasquez" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">{dict.startDate}</label>
                  <input 
                    type="date" 
                    required
                    value={newProject.startDate} 
                    onChange={e => setNewProject({...newProject, startDate: e.target.value})}
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500" 
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">{dict.endDate}</label>
                  <input 
                    type="date" 
                    required
                    value={newProject.endDate} 
                    onChange={e => setNewProject({...newProject, endDate: e.target.value})}
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">{dict.budgetUsd}</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-emerald-500 font-bold">$</span>
                  <input 
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={newProject.budgetUsd} 
                    onChange={e => setNewProject({...newProject, budgetUsd: e.target.value})}
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg pl-7 pr-2.5 py-2.5 text-slate-800 dark:text-slate-100 font-mono focus:outline-none focus:border-indigo-500" 
                  />
                </div>
              </div>

              {/* Dual-Currency Spend Inputs (USD & Bs.) */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-600 dark:text-slate-300">Rate: {exchangeRate} Bs./USD</span>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => setNewProject({ ...newProject, spentBs: Number(((Number(newProject.spentUsd) || 0) * exchangeRate).toFixed(2)) })}
                      className="px-2 py-1 rounded bg-indigo-500/15 text-indigo-400 hover:bg-indigo-500/25 font-semibold flex items-center gap-1"
                    >
                      <ArrowLeftRight className="w-3 h-3" />
                      <span>{dict.convertToBs}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewProject({ ...newProject, spentUsd: Number(((Number(newProject.spentBs) || 0) / (exchangeRate || 1)).toFixed(2)) })}
                      className="px-2 py-1 rounded bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 font-semibold flex items-center gap-1"
                    >
                      <ArrowLeftRight className="w-3 h-3" />
                      <span>{dict.convertToUsd}</span>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">{dict.spentUsd}</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={newProject.spentUsd}
                      onChange={e => setNewProject({ ...newProject, spentUsd: e.target.value })}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 font-mono focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">{dict.spentBs}</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={newProject.spentBs}
                      onChange={e => setNewProject({ ...newProject, spentBs: e.target.value })}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 font-mono focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowProjectModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 font-semibold"
                >
                  {dict.cancel}
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow"
                >
                  {dict.saveProject}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT PROJECT */}
      {editingProject && canEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold mb-4">{dict.editProjectTitle}</h3>
            <form onSubmit={handleSaveEditedProject} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">{dict.projectName}</label>
                <input 
                  type="text" 
                  required
                  value={editingProject.name} 
                  onChange={e => setEditingProject({...editingProject, name: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500" 
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">{dict.siteLocation}</label>
                  <input 
                    type="text" 
                    required
                    value={editingProject.site} 
                    onChange={e => setEditingProject({...editingProject, site: e.target.value})}
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500" 
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">{dict.status}</label>
                  <select
                    value={editingProject.status}
                    onChange={e => setEditingProject({...editingProject, status: e.target.value})}
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Active">Active</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Planning">Planning</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">{dict.projectLead}</label>
                  <input 
                    type="text" 
                    required
                    value={editingProject.lead} 
                    onChange={e => setEditingProject({...editingProject, lead: e.target.value})}
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500" 
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">{dict.teamLeaderField}</label>
                  <input 
                    type="text" 
                    required
                    list="crew-leaders-list"
                    value={editingProject.teamLeader || ''} 
                    onChange={e => setEditingProject({...editingProject, teamLeader: e.target.value})}
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">{dict.startDate}</label>
                  <input 
                    type="date" 
                    required
                    value={editingProject.startDate} 
                    onChange={e => setEditingProject({...editingProject, startDate: e.target.value})}
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500" 
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">{dict.endDate}</label>
                  <input 
                    type="date" 
                    required
                    value={editingProject.endDate} 
                    onChange={e => setEditingProject({...editingProject, endDate: e.target.value})}
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">{dict.budgetUsd}</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-emerald-500 font-bold">$</span>
                  <input 
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={editingProject.budgetUsd ?? 0} 
                    onChange={e => setEditingProject({...editingProject, budgetUsd: e.target.value})}
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg pl-7 pr-2.5 py-2.5 font-mono focus:outline-none focus:border-indigo-500" 
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-600 dark:text-slate-300">Rate: {exchangeRate} Bs./USD</span>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => setEditingProject({ ...editingProject, spentBs: Number(((Number(editingProject.spentUsd) || 0) * exchangeRate).toFixed(2)) })}
                      className="px-2 py-1 rounded bg-indigo-500/15 text-indigo-400 hover:bg-indigo-500/25 font-semibold flex items-center gap-1"
                    >
                      <ArrowLeftRight className="w-3 h-3" />
                      <span>{dict.convertToBs}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingProject({ ...editingProject, spentUsd: Number(((Number(editingProject.spentBs) || 0) / (exchangeRate || 1)).toFixed(2)) })}
                      className="px-2 py-1 rounded bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 font-semibold flex items-center gap-1"
                    >
                      <ArrowLeftRight className="w-3 h-3" />
                      <span>{dict.convertToUsd}</span>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">{dict.spentUsd}</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={editingProject.spentUsd ?? 0}
                      onChange={e => setEditingProject({ ...editingProject, spentUsd: e.target.value })}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 font-mono focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">{dict.spentBs}</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={editingProject.spentBs ?? 0}
                      onChange={e => setEditingProject({ ...editingProject, spentBs: e.target.value })}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 font-mono focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 font-semibold"
                >
                  {dict.cancel}
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow"
                >
                  {dict.saveChanges}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Autocomplete suggestions from Field Crews */}
      <datalist id="crew-leaders-list">
        {crews.map(c => (
          <option key={c.id} value={c.leader} />
        ))}
      </datalist>

      {/* MODAL: NEW CREW TEAM */}
      {showCrewModal && canEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-base font-bold mb-4">{dict.registerCrewTitle}</h3>
            <form onSubmit={handleAddCrew} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">{dict.crewLeader}</label>
                <input 
                  type="text" 
                  required
                  value={newCrew.leader} 
                  onChange={e => setNewCrew({...newCrew, leader: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500" 
                  placeholder={dict.crewNamePlaceholder} 
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">{dict.assignedProject}</label>
                <input 
                  type="text" 
                  required
                  value={newCrew.project} 
                  onChange={e => setNewCrew({...newCrew, project: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500" 
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">{dict.operationalZone}</label>
                <input 
                  type="text" 
                  required
                  value={newCrew.zone} 
                  onChange={e => setNewCrew({...newCrew, zone: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500" 
                  placeholder={dict.zonePlaceholder} 
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowCrewModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 font-semibold"
                >
                  {dict.cancel}
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow"
                >
                  {dict.registerCrewBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT CREW */}
      {editingCrew && canEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-base font-bold mb-4">{dict.editCrewTitle}</h3>
            <form onSubmit={handleSaveEditedCrew} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">{dict.crewLeader}</label>
                <input 
                  type="text" 
                  required
                  value={editingCrew.leader} 
                  onChange={e => setEditingCrew({...editingCrew, leader: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500" 
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">{dict.assignedProject}</label>
                <input 
                  type="text" 
                  required
                  value={editingCrew.project} 
                  onChange={e => setEditingCrew({...editingCrew, project: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500" 
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">{dict.operationalZone}</label>
                <input 
                  type="text" 
                  required
                  value={editingCrew.zone} 
                  onChange={e => setEditingCrew({...editingCrew, zone: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500" 
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">{dict.status}</label>
                <select
                  value={editingCrew.status}
                  onChange={e => setEditingCrew({...editingCrew, status: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Deployed">Deployed</option>
                  <option value="Active">Active</option>
                  <option value="Standby">Standby</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setEditingCrew(null)}
                  className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 font-semibold"
                >
                  {dict.cancel}
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow"
                >
                  {dict.saveChanges}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: NEW FLEET UNIT */}
      {showFleetModal && canEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-base font-bold mb-4">{dict.registerFleetBtn}</h3>
            <form onSubmit={handleAddFleet} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">{dict.unitName}</label>
                <input 
                  type="text" 
                  required
                  value={newFleet.unit} 
                  onChange={e => setNewFleet({...newFleet, unit: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500" 
                  placeholder="e.g., Truck 09 - Ford Ranger" 
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">{dict.assignedProjectField}</label>
                <input 
                  type="text" 
                  required
                  value={newFleet.project} 
                  onChange={e => setNewFleet({...newFleet, project: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500" 
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">{dict.locationSite}</label>
                <input 
                  type="text" 
                  required
                  value={newFleet.site} 
                  onChange={e => setNewFleet({...newFleet, site: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500" 
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowFleetModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 font-semibold"
                >
                  {dict.cancel}
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow"
                >
                  {dict.registerUnit}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT FLEET UNIT */}
      {editingFleet && canEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-base font-bold mb-4">{dict.editFleetTitle}</h3>
            <form onSubmit={handleSaveEditedFleet} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">{dict.unitName}</label>
                <input 
                  type="text" 
                  required
                  value={editingFleet.unit} 
                  onChange={e => setEditingFleet({...editingFleet, unit: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500" 
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">{dict.assignedProjectField}</label>
                <input 
                  type="text" 
                  required
                  value={editingFleet.project} 
                  onChange={e => setEditingFleet({...editingFleet, project: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500" 
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">{dict.locationSite}</label>
                  <input 
                    type="text" 
                    required
                    value={editingFleet.site} 
                    onChange={e => setEditingFleet({...editingFleet, site: e.target.value})}
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500" 
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">{dict.fuelLevel}</label>
                  <input 
                    type="text" 
                    required
                    value={editingFleet.fuel} 
                    onChange={e => setEditingFleet({...editingFleet, fuel: e.target.value})}
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">{dict.opHours}</label>
                  <input 
                    type="text" 
                    required
                    value={editingFleet.hours} 
                    onChange={e => setEditingFleet({...editingFleet, hours: e.target.value})}
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500" 
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">{dict.status}</label>
                  <select
                    value={editingFleet.status}
                    onChange={e => setEditingFleet({...editingFleet, status: e.target.value})}
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Deployed">Deployed</option>
                    <option value="Active">Active</option>
                    <option value="Standby">Standby</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setEditingFleet(null)}
                  className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 font-semibold"
                >
                  {dict.cancel}
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow"
                >
                  {dict.saveChanges}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}