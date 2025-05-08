    document.addEventListener('DOMContentLoaded', () => {
      const todoForm = document.getElementById('todo-form');
      const todoInput = document.getElementById('todo-input');
      const todoList = document.getElementById('todo-list');
      const emptyState = document.getElementById('empty-state');
      const tasksCount = document.getElementById('tasks-count');
      const clearCompletedBtn = document.getElementById('clear-completed');
      const filterAllBtn = document.getElementById('filter-all');
      const filterActiveBtn = document.getElementById('filter-active');
      const filterCompletedBtn = document.getElementById('filter-completed');
      
      let todos = JSON.parse(localStorage.getItem('todos')) || [];
      let currentFilter = 'all';

      // Initialize the app
      renderTodos();
      updateCounters();

      // Event listeners
      todoForm.addEventListener('submit', addTodo);
      clearCompletedBtn.addEventListener('click', clearCompleted);
      filterAllBtn.addEventListener('click', () => filterTodos('all'));
      filterActiveBtn.addEventListener('click', () => filterTodos('active'));
      filterCompletedBtn.addEventListener('click', () => filterTodos('completed'));

      function addTodo(e) {
        e.preventDefault();
        const todoText = todoInput.value.trim();
        
        if (!todoText) return;
        
        const todo = {
          id: uuid.v4(),
          text: todoText,
          completed: false,
          createdAt: Date.now()
        };
        
        todos.unshift(todo);
        saveTodos();
        renderTodos();
        todoInput.value = '';
        
        // Focus back on input
        todoInput.focus();
      }

      function toggleTodo(id) {
        todos = todos.map(todo => 
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        saveTodos();
        renderTodos();
      }

      function deleteTodo(id) {
        const todoElement = document.getElementById(`todo-${id}`);
        todoElement.classList.add('task-exit');
        
        // Wait for animation to complete before removing
        setTimeout(() => {
          todos = todos.filter(todo => todo.id !== id);
          saveTodos();
          renderTodos();
        }, 300);
      }

      function clearCompleted() {
        todos = todos.filter(todo => !todo.completed);
        saveTodos();
        renderTodos();
      }

      function filterTodos(filter) {
        currentFilter = filter;
        
        // Update active filter button
        [filterAllBtn, filterActiveBtn, filterCompletedBtn].forEach(btn => {
          btn.classList.remove('bg-purple-100', 'text-purple-700', 'filter-active');
          btn.classList.add('text-gray-500');
        });
        
        if (filter === 'all') {
          filterAllBtn.classList.add('bg-purple-100', 'text-purple-700', 'filter-active');
        } else if (filter === 'active') {
          filterActiveBtn.classList.add('bg-purple-100', 'text-purple-700', 'filter-active');
        } else if (filter === 'completed') {
          filterCompletedBtn.classList.add('bg-purple-100', 'text-purple-700', 'filter-active');
        }
        
        renderTodos();
      }

      function renderTodos() {
        // Filter todos based on current filter
        let filteredTodos = todos;
        if (currentFilter === 'active') {
          filteredTodos = todos.filter(todo => !todo.completed);
        } else if (currentFilter === 'completed') {
          filteredTodos = todos.filter(todo => todo.completed);
        }
        
        // Clear the list
        todoList.innerHTML = '';
        
        // Show empty state if no todos
        if (filteredTodos.length === 0) {
          emptyState.classList.remove('hidden');
        } else {
          emptyState.classList.add('hidden');
          
          // Render todos
          filteredTodos.forEach(todo => {
            const todoItem = document.createElement('div');
            todoItem.id = `todo-${todo.id}`;
            todoItem.className = 'todo-item task-enter flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:bg-gray-50';
            
            const leftSide = document.createElement('div');
            leftSide.className = 'flex items-center gap-3 flex-1';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;
            checkbox.className = 'h-5 w-5 rounded text-purple-600 cursor-pointer transition-colors duration-200';
            checkbox.addEventListener('change', () => toggleTodo(todo.id));
            
            const todoText = document.createElement('span');
            todoText.textContent = todo.text;
            todoText.className = `text-gray-800 transition-all duration-200 ${todo.completed ? 'completed-task' : ''}`;
            
            leftSide.appendChild(checkbox);
            leftSide.appendChild(todoText);
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn hidden text-gray-400 hover:text-red-500 transition-colors duration-200';
            deleteBtn.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            `;
            deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
            
            todoItem.appendChild(leftSide);
            todoItem.appendChild(deleteBtn);
            todoList.appendChild(todoItem);
          });
        }
        
        updateCounters();
      }

      function updateCounters() {
        const activeTodos = todos.filter(todo => !todo.completed);
        const completedTodos = todos.filter(todo => todo.completed);
        
        // Update task counter
        tasksCount.textContent = `${activeTodos.length} task${activeTodos.length !== 1 ? 's' : ''} remaining`;
        
        // Show/hide clear completed button
        if (completedTodos.length > 0) {
          clearCompletedBtn.classList.remove('hidden');
        } else {
          clearCompletedBtn.classList.add('hidden');
        }
      }

      function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
      }
    });
