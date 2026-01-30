import { useState } from 'react'
import { useTaskContext } from '../context/TaskContext'
import type { Task } from '../types/task'

export default function TaskList() {
	const [editingId, setEditingId] = useState<string | null>(null)
	const [editText, setEditText] = useState('')

	// TODO: Obtén filteredTasks del context
	const { filteredTasks, dispatch } = useTaskContext()

	// Entrar en modo edición
	const startEdit = (task: Task) => {
		setEditingId(task.id)
		setEditText(task.title)
	}

	// Guardar cambios
	const saveEdit = () => {
		if (editText.trim()) {
			dispatch({
				type: 'EDIT_TASK',
				payload: {
					id: editingId!,
					updates: { title: editText },
				},
			})
		}
		setEditingId(null)
		setEditText('')
	}

	// Cancelar
	const cancelEdit = () => {
		setEditingId(null)
		setEditText('')
	}

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
						{editingId === task.id ? (
							<>
								<input
									value={editText}
									onChange={(e) => setEditText(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === 'Enter') saveEdit()
										if (e.key === 'Escape') cancelEdit()
									}}
									autoFocus
								/>
								<button onClick={cancelEdit}>Cancel</button>
								<button onClick={saveEdit}>Save</button>
							</>
						) : (
							<>
								<span
									style={
										task.completed
											? { textDecoration: 'line-through' }
											: { fontWeight: 'bold' }
									}
								>
									<span
										onClick={() => startEdit(task)}
										style={{ cursor: 'pointer' }}
									>
										{task.title}
									</span>
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
							</>
						)}
					</li>
				))}
			</ul>
		</div>
	)
}
