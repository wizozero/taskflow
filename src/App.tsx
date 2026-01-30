import { TaskProvider } from './context/TaskContext'
import TaskForm from './components/TaskForm'
import FilterBar from './components/FilterBar'
import TaskList from './components/TaskList'
import Stats from './components/Stats'
import './App.css'

function App() {
	return (
		<TaskProvider>
			<div className='app-container'>
				<header className='app-header'>
					<h1 className='app-title'>TaskFlow</h1>
					<p className='app-subtitle'>Manage your tasks efficiently</p>
				</header>

				<Stats />
				<FilterBar />
				<TaskForm />
				<TaskList />
			</div>
		</TaskProvider>
	)
}

export default App
