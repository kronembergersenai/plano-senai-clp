// Application State
const appState = {
    completedSteps: [],
    courseProgress: 0,
    totalSteps: 10,
    totalHours: 60,
    currentTab: 'dashboard'
};

// DOM Elements - will be populated after DOM loads
let elements = {};

// Materials Data
const materialsData = [
    { item: 1, descricao: "CLP Siemens S7-1215", quantidade: 1, especificacao: "14DI/10DO, CPU 24VDC", codigo: "6ES7215-1AG40-0XB0" },
    { item: 2, descricao: "IHM Basic Panel KTP400", quantidade: 1, especificacao: "4.3'' Touch Screen", codigo: "6AV2123-2DB03-0AX0" },
    { item: 3, descricao: "Disjuntor Motor", quantidade: 2, especificacao: "Icc=10kA, In=16A", codigo: "3RV2011-1KA10" },
    { item: 4, descricao: "Contator Principal", quantidade: 2, especificacao: "AC-3 17A, 24VDC", codigo: "3RT2025-1BB40" },
    { item: 5, descricao: "Relé Térmico", quantidade: 2, especificacao: "Ajuste 9-12.5A", codigo: "3RU2126-4CB0" },
    { item: 6, descricao: "Botoeira de Emergência", quantidade: 2, especificacao: "22mm, NC, Vermelho", codigo: "3SB3000-1PA20" },
    { item: 7, descricao: "Sinalizador Luminoso", quantidade: 4, especificacao: "22mm LED, 24VDC", codigo: "3SB3001-6AA30" },
    { item: 8, descricao: "Sensor Indutivo", quantidade: 3, especificacao: "M18, PNP, NO, 10-30VDC", codigo: "BI15U-EM30-VP6X2" },
    { item: 9, descricao: "Cabo Ethernet", quantidade: 2, especificacao: "Cat5e, 5m, Azul", codigo: "6XV1870-3QE50" },
    { item: 10, descricao: "Fonte de Alimentação", quantidade: 1, especificacao: "24VDC, 5A, 120W", codigo: "6EP1334-3BA10" }
];

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    initializeApp();
});

function initializeElements() {
    elements = {
        navTabs: document.querySelectorAll('.nav-tab'),
        tabContents: document.querySelectorAll('.tab-content'),
        progressFill: document.getElementById('courseProgress'),
        progressPercentage: document.querySelector('.progress-percentage'),
        completedStepsCounter: document.getElementById('completedSteps'),
        totalHoursDisplay: document.getElementById('totalHours'),
        materialSearch: document.getElementById('materialSearch'),
        materialsTableBody: document.getElementById('materialsTableBody'),
        exportButton: document.getElementById('exportList'),
        totalItemsDisplay: document.getElementById('totalItems')
    };
}

function initializeApp() {
    setupNavigation();
    setupTimelineInteractions();
    setupMaterialsSearch();
    setupRequirementsChecklist();
    setupCompetencesChecklist();
    setupExportButton();
    setupStationInteractions();
    updateProgress();
    
    // Initialize chart after a short delay to ensure DOM is ready
    setTimeout(() => {
        initializeChart();
    }, 500);
    
    console.log('SENAI - Situação de Aprendizagem App initialized');
}

// Navigation System
function setupNavigation() {
    if (!elements.navTabs || elements.navTabs.length === 0) {
        console.error('Navigation tabs not found');
        return;
    }

    elements.navTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute('data-tab');
            console.log('Switching to tab:', targetTab);
            switchTab(targetTab);
        });
    });
}

function switchTab(targetTab) {
    console.log('switchTab called with:', targetTab);
    
    // Update nav tabs
    elements.navTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-tab') === targetTab) {
            tab.classList.add('active');
        }
    });

    // Update tab contents
    elements.tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === targetTab) {
            content.classList.add('active');
            console.log('Activated tab content:', content.id);
        }
    });

    appState.currentTab = targetTab;
    
    // Initialize chart when evaluation tab is opened
    if (targetTab === 'avaliacao') {
        setTimeout(() => {
            initializeChart();
        }, 100);
    }
}

// Timeline Interactions
function setupTimelineInteractions() {
    const timelineSteps = document.querySelectorAll('.timeline-step');
    
    timelineSteps.forEach(step => {
        const toggleButton = step.querySelector('.step-toggle');
        const completeButton = step.querySelector('.step-complete');
        const stepDetails = step.querySelector('.step-details');
        const stepNumber = parseInt(step.getAttribute('data-step'));

        // Toggle step details
        if (toggleButton && stepDetails) {
            toggleButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const isHidden = stepDetails.classList.contains('hidden');
                
                if (isHidden) {
                    stepDetails.classList.remove('hidden');
                    this.innerHTML = '<i class="fas fa-chevron-up"></i>';
                } else {
                    stepDetails.classList.add('hidden');
                    this.innerHTML = '<i class="fas fa-chevron-down"></i>';
                }
            });
        }

        // Complete step
        if (completeButton) {
            completeButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleStepCompletion(stepNumber, step, this);
            });
        }
    });
}

function toggleStepCompletion(stepNumber, stepElement, button) {
    const isCompleted = appState.completedSteps.includes(stepNumber);
    
    if (isCompleted) {
        // Mark as incomplete
        const index = appState.completedSteps.indexOf(stepNumber);
        appState.completedSteps.splice(index, 1);
        stepElement.classList.remove('completed');
        button.innerHTML = '<i class="fas fa-check"></i> Marcar como Concluída';
        button.classList.remove('step-complete');
        button.classList.add('btn--outline');
    } else {
        // Mark as completed
        appState.completedSteps.push(stepNumber);
        stepElement.classList.add('completed');
        button.innerHTML = '<i class="fas fa-check-double"></i> Concluída';
        button.classList.add('step-complete');
        button.classList.remove('btn--outline');
        
        // Add celebration effect
        showCelebrationEffect(stepElement);
    }
    
    updateProgress();
    updateCompletedStepsCounter();
}

function showCelebrationEffect(element) {
    element.style.animation = 'pulse 0.6s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 600);
}

// Progress Tracking
function updateProgress() {
    const progressPercentage = Math.round((appState.completedSteps.length / appState.totalSteps) * 100);
    appState.courseProgress = progressPercentage;
    
    if (elements.progressFill) {
        elements.progressFill.style.width = `${progressPercentage}%`;
    }
    
    if (elements.progressPercentage) {
        elements.progressPercentage.textContent = `${progressPercentage}%`;
    }
}

function updateCompletedStepsCounter() {
    if (elements.completedStepsCounter) {
        elements.completedStepsCounter.textContent = appState.completedSteps.length;
    }
}

// Materials Search and Filter
function setupMaterialsSearch() {
    if (elements.materialSearch) {
        elements.materialSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterMaterials(searchTerm);
        });
    }
    
    // Populate initial materials table
    populateMaterialsTable(materialsData);
}

function filterMaterials(searchTerm) {
    const filteredMaterials = materialsData.filter(material => 
        material.descricao.toLowerCase().includes(searchTerm) ||
        material.especificacao.toLowerCase().includes(searchTerm) ||
        material.codigo.toLowerCase().includes(searchTerm)
    );
    
    populateMaterialsTable(filteredMaterials);
}

function populateMaterialsTable(materials) {
    if (!elements.materialsTableBody) return;
    
    elements.materialsTableBody.innerHTML = '';
    
    materials.forEach(material => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${material.item}</td>
            <td>${material.descricao}</td>
            <td>${material.quantidade}</td>
            <td>${material.especificacao}</td>
            <td>${material.codigo}</td>
        `;
        elements.materialsTableBody.appendChild(row);
    });
    
    updateMaterialsStats(materials);
}

function updateMaterialsStats(materials) {
    if (elements.totalItemsDisplay) {
        elements.totalItemsDisplay.textContent = materials.length;
    }
}

// Requirements Checklist
function setupRequirementsChecklist() {
    const requirementCheckboxes = document.querySelectorAll('#desafio .requirement-item input[type="checkbox"]');
    
    requirementCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.nextElementSibling;
            const item = this.closest('.requirement-item');
            
            if (this.checked) {
                item.style.background = 'var(--color-bg-3)';
                label.style.textDecoration = 'line-through';
                label.style.color = 'var(--color-text-secondary)';
            } else {
                item.style.background = 'var(--color-bg-1)';
                label.style.textDecoration = 'none';
                label.style.color = 'var(--color-text)';
            }
        });
    });
}

// Competences Checklist
function setupCompetencesChecklist() {
    const competenceCheckboxes = document.querySelectorAll('#avaliacao .competence-check input[type="checkbox"]');
    
    competenceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkItem = this.closest('.competence-check');
            
            if (this.checked) {
                checkItem.style.background = 'var(--color-bg-3)';
                checkItem.style.border = '2px solid var(--color-success)';
            } else {
                checkItem.style.background = 'var(--color-bg-1)';
                checkItem.style.border = 'none';
            }
        });
    });
}

// Export Functionality
function setupExportButton() {
    if (elements.exportButton) {
        elements.exportButton.addEventListener('click', function() {
            exportMaterialsList();
        });
    }
}

function exportMaterialsList() {
    const csvContent = generateCSV(materialsData);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'lista_materiais_CLP_IHM.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    showNotification('Lista de materiais exportada com sucesso!', 'success');
}

function generateCSV(data) {
    const headers = ['Item', 'Descrição', 'Quantidade', 'Especificação', 'Código'];
    const csvRows = [headers.join(',')];
    
    data.forEach(row => {
        const values = [
            row.item,
            `"${row.descricao}"`,
            row.quantidade,
            `"${row.especificacao}"`,
            `"${row.codigo}"`
        ];
        csvRows.push(values.join(','));
    });
    
    return csvRows.join('\n');
}

// Chart Initialization
function initializeChart() {
    const canvas = document.getElementById('evaluationChart');
    if (!canvas) {
        console.log('Evaluation chart canvas not found');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    
    // Destroy existing chart if it exists
    if (window.evaluationChart && typeof window.evaluationChart.destroy === 'function') {
        window.evaluationChart.destroy();
    }
    
    try {
        window.evaluationChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Projeto Prático', 'Avaliação Teórica', 'Trabalho em Equipe', 'Apresentação'],
                datasets: [{
                    data: [40, 25, 20, 15],
                    backgroundColor: [
                        '#1FB8CD',
                        '#FFC185', 
                        '#B4413C',
                        '#5D878F'
                    ],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.parsed}%`;
                            }
                        }
                    }
                },
                elements: {
                    arc: {
                        borderRadius: 8
                    }
                }
            }
        });
        console.log('Chart initialized successfully');
    } catch (error) {
        console.error('Error initializing chart:', error);
    }
}

// Station Cards Interaction
function setupStationInteractions() {
    const challengeStations = document.querySelectorAll('.challenge-station');
    
    challengeStations.forEach(station => {
        station.addEventListener('click', function() {
            const stationNumber = this.getAttribute('data-station');
            showStationDetails(stationNumber);
        });
    });
}

function showStationDetails(stationNumber) {
    const stationData = {
        1: {
            title: 'Sistema de Bombeamento',
            details: [
                'Sensor de nível baixo (LI-01)',
                'Sensor de nível alto (LI-02)', 
                'Sensor de nível crítico (LI-03)',
                'Bomba centrífuga 1CV (P-01)',
                'Sinalização luminosa (HL-01)',
                'Alarme sonoro (HA-01)'
            ]
        },
        2: {
            title: 'Esteira Transportadora',
            details: [
                'Motor trifásico 2CV (M-01)',
                'Inversor de frequência (VFD-01)',
                'Sensor de presença (XI-01)',
                'Encoder incremental (SI-01)',
                'Contador digital (CI-01)',
                'Parada de emergência (HS-01)'
            ]
        }
    };
    
    const station = stationData[stationNumber];
    if (station) {
        showModal(station.title, station.details);
    }
}

// Modal System
function showModal(title, content) {
    const modalHTML = `
        <div class="modal-overlay" id="stationModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close" onclick="closeModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <ul class="station-details-list">
                        ${content.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    setTimeout(() => {
        const modal = document.getElementById('stationModal');
        if (modal) modal.classList.add('show');
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('stationModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || icons.info;
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // Tab navigation with arrow keys
    if (e.altKey && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
        e.preventDefault();
        navigateTabsWithKeyboard(e.key === 'ArrowRight');
    }
});

function navigateTabsWithKeyboard(forward) {
    const tabs = Array.from(elements.navTabs);
    const currentIndex = tabs.findIndex(tab => tab.classList.contains('active'));
    
    let newIndex;
    if (forward) {
        newIndex = (currentIndex + 1) % tabs.length;
    } else {
        newIndex = currentIndex - 1 < 0 ? tabs.length - 1 : currentIndex - 1;
    }
    
    const targetTab = tabs[newIndex].getAttribute('data-tab');
    switchTab(targetTab);
}

// Add CSS for additional components
const additionalCSS = `
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.modal-overlay.show {
    opacity: 1;
    visibility: visible;
}

.modal-content {
    background: var(--color-surface);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-20);
    border-bottom: 1px solid var(--color-border);
}

.modal-header h3 {
    margin: 0;
    color: var(--senai-blue);
}

.modal-close {
    background: none;
    border: none;
    font-size: var(--font-size-lg);
    color: var(--color-text-secondary);
    cursor: pointer;
    padding: var(--space-4);
    border-radius: var(--radius-sm);
}

.modal-close:hover {
    background: var(--color-secondary);
    color: var(--color-text);
}

.modal-body {
    padding: var(--space-20);
}

.station-details-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.station-details-list li {
    display: flex;
    align-items: center;
    gap: var(--space-8);
    padding: var(--space-8) 0;
    border-bottom: 1px solid var(--color-border);
    color: var(--color-text);
}

.station-details-list li:last-child {
    border-bottom: none;
}

.station-details-list li::before {
    content: '⚙️';
    font-size: var(--font-size-sm);
}

.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--color-surface);
    border-radius: var(--radius-base);
    box-shadow: var(--shadow-lg);
    border-left: 4px solid var(--color-info);
    display: flex;
    align-items: center;
    gap: var(--space-12);
    padding: var(--space-16);
    min-width: 300px;
    z-index: 1001;
    transform: translateX(100%);
    transition: transform 0.3s ease;
}

.notification.show {
    transform: translateX(0);
}

.notification--success {
    border-left-color: var(--color-success);
}

.notification--error {
    border-left-color: var(--color-error);
}

.notification--warning {
    border-left-color: var(--color-warning);
}

.notification-content {
    display: flex;
    align-items: center;
    gap: var(--space-8);
    flex: 1;
}

.notification-content i {
    color: var(--senai-orange);
}

.notification-close {
    background: none;
    border: none;
    color: var(--color-text-secondary);
    cursor: pointer;
    padding: var(--space-4);
    border-radius: var(--radius-sm);
}

.notification-close:hover {
    background: var(--color-secondary);
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}
`;

// Inject additional CSS
const styleElement = document.createElement('style');
styleElement.textContent = additionalCSS;
document.head.appendChild(styleElement);