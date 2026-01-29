import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useTaskContext } from '../context/TaskContext'
import type { Priority, Category } from '../types/task'

export default function TaskForm() {
	// Estados para el form
	const [title, setTitle] = useState('')
	const [priority, setPriority] = useState<Priority>('medium')
	const [category, setCategory] = useState<Category>('personal')

	// Context
	const { dispatch } = useTaskContext()

	// Handler para priority
	const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setPriority(e.target.value as Priority)
	}

	// Handler para category
	const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setCategory(e.target.value as Category)
	}

	// Handler para submit
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

		// Validación: no añadir si title está vacío
		if (!title.trim()) return

		dispatch({
			type: 'ADD_TASK',
			payload: {
				title,
				completed: false,
				priority,
				category,
			},
		})

		// Resetear form
		setTitle('')
		setPriority('medium')
		setCategory('personal')
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<input
					type='text'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder='Task title...'
					required
				/>

				<select
					name='Priority'
					value={priority}
					onChange={handlePriorityChange}
				>
					<option value='high'>High</option>
					<option value='medium'>Medium</option>
					<option value='low'>Low</option>
				</select>

				<select
					name='Category'
					value={category}
					onChange={handleCategoryChange}
				>
					<option value='work'>Work</option>
					<option value='personal'>Personal</option>
					<option value='shopping'>Shopping</option>
				</select>
			</div>

			<button type='submit'>Add Task</button>
		</form>
	)
}
