import { useTaskContext } from '../context/TaskContext'

export default function TaskList() {
	// TODO: Obtén filteredTasks del context
	const { filteredTasks, dispatch } = useTaskContext()

	// TODO: Si array vacío, return early con mensaje
	if (!filteredTasks.length) {
		return <p>No hay tareas actualmente</p>
	}

	return (
		<div>
			<h2>Tasks</h2>
			<ul>
				{filteredTasks.map((task) => (
					<li key={task.id}>
						<input
							type='checkbox'
							checked={task.completed}
							onChange={() =>
								dispatch({
									type: 'TOGGLE_TASK',
									payload: task.id,
								})
							}
						/>
						<span
							style={
								task.completed
									? { textDecoration: 'line-through' }
									: { fontWeight: 'bold' }
							}
						>
							{task.title}
							<span style={{ paddingLeft: '2px' }}>{task.priority}</span>
							<span style={{ paddingLeft: '2px' }}>{task.category}</span>
						</span>
						<button
							onClick={() =>
								dispatch({
									type: 'DELETE_TASK',
									payload: task.id,
								})
							}
						>
							Delete
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}
