window.onbeforeunload = function() {
    return "Are you sure you want to leave?";
  };
let days = [];  
        let tasks = {};  
        let currentDay = null;

        function addDay() {
            const dayInput = document.getElementById('day-input');
            const dayName = dayInput.value.trim();

            if (dayName && !days.includes(dayName)) {  
                days.push(dayName);
                tasks[dayName] = []; 
                renderDays();
                dayInput.value = ''; 
            }
        }

        function renderDays() {
            const daysList = document.getElementById('days-list');
            daysList.innerHTML = ''; 

            days.forEach(day => {
              
                const dayButton = document.createElement('div');
                dayButton.classList.add('day-button');
                dayButton.innerHTML = `
                    <span onclick="showDayTasks('${day}')">${day}</span>
                    <button class="close-btn" onclick="removeDay('${day}')">X</button>
                `;

                daysList.appendChild(dayButton);
            });
        }

        function removeDay(day) {
            
            days = days.filter(d => d !== day);
            delete tasks[day];  
            renderDays();
        }

        function showDayTasks(day) {
            currentDay = day;

            const daysList = document.getElementById('days-list');
            const taskInterface = document.getElementById('task-interface');

            daysList.style.display = 'none'; 
            taskInterface.style.display = 'block';

            taskInterface.innerHTML = `
                <a class="back-button" onclick="goBack()"> Back </a>
                <h2>${day}</h2>
                <input type="text" id="task-input" placeholder="Add a task">
                <button onclick="addTask('${day}')">Add Task</button>
                <div class="tasks-list">
                    <ul id="tasks-${day}">
                        <!-- Tasks will be added here -->
                    </ul>
                </div>
            `;

            renderTasks(day);
        }

        function goBack() {
            currentDay = null;
            const daysList = document.getElementById('days-list');
            const taskInterface = document.getElementById('task-interface');

            taskInterface.style.display = 'none'; 
            daysList.style.display = 'block'; 
        }

        function addTask(day) {
            const taskInput = document.getElementById('task-input');
            const taskName = taskInput.value.trim();

            if (taskName) {
                // Add the task to the tasks object for the specific day
                tasks[day].push(taskName);
                renderTasks(day);
                taskInput.value = ''; // Clear task input field
            }
        }

        function renderTasks(day) {
            const taskList = document.getElementById(`tasks-${day}`);
            taskList.innerHTML = ''; // Clear the task list

            // Render tasks for the specific day
            tasks[day].forEach((task, index) => {
                const taskItem = document.createElement('li');
                taskItem.textContent = task;

                // Strike through task on click
                taskItem.onclick = function() {
                    this.classList.toggle('checked');
                };

                // Add close button for each task
                const closeBtn = document.createElement('button');
                closeBtn.textContent = 'X';
                closeBtn.classList.add('close-btn');
                closeBtn.onclick = () => removeTask(day, index);

                taskItem.appendChild(closeBtn);
                taskList.appendChild(taskItem);
            });
        }

        function removeTask(day, taskIndex) {
            // Remove task from the task list for the specific day
            tasks[day].splice(taskIndex, 1);
            renderTasks(day);
        }