import React, { useEffect, useState } from 'react';
import AuthService from '../AuthService';

const DashboardComponent = () => {
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
    const [showForm, setShowForm] = useState(false);
    const [newTask, setNewTask] = useState({ status: 'TODO', content: '' });

    useEffect(() => {
        const userData = AuthService.getUser();
        setUser(userData);
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const response = await AuthService.getTasks();
            const tasksByStatus = { todo: [], inProgress: [], done: [] };
            response.data.forEach(task => {
                if (task.status === 'TODO') tasksByStatus.todo.push(task);
                else if (task.status === 'IN_PROGRESS') tasksByStatus.inProgress.push(task);
                else if (task.status === 'DONE') tasksByStatus.done.push(task);
            });
            setTasks(tasksByStatus);
        } catch (error) {
            console.error('Ошибка загрузки задач:', error);
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!newTask.content.trim()) return;
        
        try {
            const response = await AuthService.createTask(newTask);
            setNewTask({ status: 'TODO', content: '' });
            setShowForm(false);
            
            const updatedTasks = { ...tasks };
            if (newTask.status === 'TODO') updatedTasks.todo = [...updatedTasks.todo, response.data];
            else if (newTask.status === 'IN_PROGRESS') updatedTasks.inProgress = [...updatedTasks.inProgress, response.data];
            else if (newTask.status === 'DONE') updatedTasks.done = [...updatedTasks.done, response.data];
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Ошибка создания задачи:', error);
        }
    };

    const getFullName = () => {
        if (user?.firstName && user?.lastName) {
            return `${user.firstName} ${user.lastName}`;
        }
        return user?.firstName || user?.email?.split('@')[0];
    };

    return (
        <div className="dashboard">
            {user && (
                <div className="user-header">
                    <div className="user-info">
                        <h2><span style={{ marginRight: '10px' }}>🐧</span>{getFullName()}</h2>
                        <p>{user.email}</p>
                    </div>
                </div>
            )}
            
            {!showForm && (
                <button className="add-task-btn-floating" onClick={() => setShowForm(true)}>
                    +
                </button>
            )}

            {showForm && (
                <div className="task-form-overlay" onClick={() => setShowForm(false)}>
                    <div className="task-form" onClick={(e) => e.stopPropagation()}>
                        <div className="task-form-header">
                            <h3>✨ Создание задачи</h3>
                            <button className="close-form-btn" onClick={() => setShowForm(false)}>×</button>
                        </div>
                        <form onSubmit={handleAddTask}>
                            <div className="form-row">
                                <div className="form-group" style={{ flex: '0 0 180px', margin: '10px 40px 10px 0' }}>
                                    <label>Статус</label>
                                    <select 
                                        value={newTask.status} 
                                        onChange={(e) => setNewTask({...newTask, status: e.target.value})}
                                    >
                                        <option value="TODO">📋 Todo</option>
                                        <option value="IN_PROGRESS">🔄 In Progress</option>
                                        <option value="DONE">✅ Done</option>
                                    </select>
                                </div>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label>Описание</label>
                                    <textarea 
                                        placeholder="Что нужно сделать?"
                                        value={newTask.content}
                                        onChange={(e) => setNewTask({...newTask, content: e.target.value})}
                                        rows={3}
                                    />
                                </div>
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="submit-btn">Создать задачу</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            <div className="tasks-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', width: '100%' }}>
                <div className="task-column todo-column">
                    <h3>📋 Todo</h3>
                    <div className="task-list">
                        {tasks.todo.length === 0 ? (
                            <p className="empty-tasks">Нет задач</p>
                        ) : (
                            tasks.todo.map(task => (
                                <div key={task.id} className="task-card todo">
                                    <p>{task.content}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className="task-column in-progress-column">
                    <h3>🔄 In Progress</h3>
                    <div className="task-list">
                        {tasks.inProgress.length === 0 ? (
                            <p className="empty-tasks">Нет задач</p>
                        ) : (
                            tasks.inProgress.map(task => (
                                <div key={task.id} className="task-card in-progress">
                                    <p>{task.content}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className="task-column done-column">
                    <h3>✅ Done</h3>
                    <div className="task-list">
                        {tasks.done.length === 0 ? (
                            <p className="empty-tasks">Нет задач</p>
                        ) : (
                            tasks.done.map(task => (
                                <div key={task.id} className="task-card done">
                                    <p>{task.content}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardComponent;
