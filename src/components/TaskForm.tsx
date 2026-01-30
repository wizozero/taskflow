import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useTaskContext } from '../context/TaskContext'
import type { Priority, Category } from '../types/task'

export default function TaskForm() {
	const [title, setTitle] = useState('')
	const [priority, setPriority] = useState<Priority>('medium')
	const [category, setCategory] = useState<Category>('personal')

	const { dispatch } = useTaskContext()

	const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setPriority(e.target.value as Priority)
	}

	const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setCategory(e.target.value as Category)
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

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

		setTitle('')
		setPriority('medium')
		setCategory('personal')
	}

	return (
		<form onSubmit={handleSubmit} className='task-form'>
			<div className='task-form-fields'>
				<input
					type='text'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder='What needs to be done?'
					className='task-form-input'
					required
				/>

				<select
					value={priority}
					onChange={handlePriorityChange}
					className='task-form-select'
				>
					<option value='high'>High Priority</option>
					<option value='medium'>Medium Priority</option>
					<option value='low'>Low Priority</option>
				</select>

				<select
					value={category}
					onChange={handleCategoryChange}
					className='task-form-select'
				>
					<option value='work'>Work</option>
					<option value='personal'>Personal</option>
					<option value='shopping'>Shopping</option>
				</select>

				<button type='submit' className='task-form-submit'>
					Add Task
				</button>
			</div>
		</form>
	)
}
