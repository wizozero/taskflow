import { TaskProvider } from './context/TaskContext'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

function App() {
	return (
		<TaskProvider>
			<div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
				<h1>TaskFlow</h1>
				<TaskForm />
				<TaskList />
			</div>
		</TaskProvider>
	)
}

export default App
