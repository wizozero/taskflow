import { useState } from 'react'
import { useTaskContext } from '../context/TaskContext'
import type { Task } from '../types/task'

export default function TaskList() {
	const [editingId, setEditingId] = useState<string | null>(null)
	const [editText, setEditText] = useState('')

	const { filteredTasks, dispatch } = useTaskContext()

	const startEdit = (task: Task) => {
		setEditingId(task.id)
		setEditText(task.title)
	}

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

	const cancelEdit = () => {
		setEditingId(null)
		setEditText('')
	}

	if (!filteredTasks.length) {
		return (
			<div className='task-list-container'>
				<h2 className='task-list-title'>Tasks</h2>
				<p className='task-empty'>No tasks yet. Add one above!</p>
			</div>
		)
	}

	return (
		<div className='task-list-container'>
			<h2 className='task-list-title'>Tasks ({filteredTasks.length})</h2>
			<ul className='task-list'>
				{filteredTasks.map((task) => (
					<li key={task.id} className='task-item'>
						<input
							type='checkbox'
							checked={task.completed}
							onChange={() =>
								dispatch({
									type: 'TOGGLE_TASK',
									payload: task.id,
								})
							}
							className='task-checkbox'
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
									className='task-edit-input'
								/>
								<button onClick={cancelEdit} className='task-button'>
									Cancel
								</button>
								<button onClick={saveEdit} className='task-button'>
									Save
								</button>
							</>
						) : (
							<>
								<div className='task-content'>
									<span
										onClick={() => startEdit(task)}
										className={`task-title ${task.completed ? 'completed' : ''}`}
										style={{ cursor: 'pointer' }}
									>
										{task.title}
									</span>

									<span className={`task-badge priority-${task.priority}`}>
										{task.priority.toUpperCase()}
									</span>

									<span className='task-badge'>{task.category}</span>
								</div>

								<button
									onClick={() =>
										dispatch({
											type: 'DELETE_TASK',
											payload: task.id,
										})
									}
									className='task-button delete'
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
