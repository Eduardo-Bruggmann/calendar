const daysContainer = document.getElementById('daysContainer');
const monthDisplay = document.getElementById('monthDisplay');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const taskModal = document.getElementById('taskModal');
const tasksList = document.getElementById('tasksList');
const modalTitle = document.getElementById('modalTitle');
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const closeBtn = document.getElementById('closeBtn');

let selectedDate = null;
let tasks = {};
const date = new Date();

const updateCalendar = () => {
    daysContainer.innerHTML = '';
    monthDisplay.innerText = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    for (let day = 1; day <= monthEnd.getDate(); day++) {
        const dayElem = document.createElement('div');
        dayElem.className = 'calendar-day';
        dayElem.innerText = `${day}\n${new Date(date.getFullYear(), date.getMonth(), day).toLocaleDateString('en-US', { weekday: 'short' })}`;

        const currentDate = new Date(date.getFullYear(), date.getMonth(), day).toDateString();

        if (new Date().toDateString() === currentDate) {
            dayElem.classList.add('today');
        }

        if (tasks[currentDate]) {
            dayElem.classList.add('has-task');
        }

        dayElem.addEventListener('click', () => openTaskModal(day));
        daysContainer.appendChild(dayElem);
    }
};

const openTaskModal = (day) => {
    selectedDate = new Date(date.getFullYear(), date.getMonth(), day).toDateString();
    taskModal.style.display = 'flex';
    modalTitle.innerText = `Tasks for ${selectedDate}`;
    tasksList.innerHTML = '';

    if (tasks[selectedDate]) {
        tasks[selectedDate].forEach((task, index) => {
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';
            taskItem.textContent = task;

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-task-btn';
            deleteBtn.innerText = 'Delete';
            deleteBtn.addEventListener('click', () => deleteTask(index));
            taskItem.appendChild(deleteBtn);

            tasksList.appendChild(taskItem);
        });
    } else {
        tasks[selectedDate] = [];
    }

    taskInput.value = '';
};

const addTask = () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks[selectedDate].push(taskText);
        updateCalendar();
        openTaskModal(new Date(selectedDate).getDate());
    }
    taskInput.value = '';
};

const deleteTask = (taskIndex) => {
    tasks[selectedDate].splice(taskIndex, 1);
    if (tasks[selectedDate].length === 0) {
        delete tasks[selectedDate];
    }
    updateCalendar();
    openTaskModal(new Date(selectedDate).getDate());
};

prevBtn.addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1);
    updateCalendar();
});

nextBtn.addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1);
    updateCalendar();
});

addTaskBtn.addEventListener('click', addTask);
closeBtn.addEventListener('click', () => (taskModal.style.display = 'none'));

updateCalendar();