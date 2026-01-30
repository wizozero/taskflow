import { useTaskContext } from '../context/TaskContext'
import type { Filter } from '../types/task'

export default function FilterBar() {
	const { state, dispatch } = useTaskContext()

	const isActive = (filter: Filter) => state.filter === filter

	const handleFilterChange = (filter: Filter) => {
		dispatch({
			type: 'SET_FILTER',
			payload: filter,
		})
	}

	return (
		<div>
			<button
				style={{
					backgroundColor: isActive('all') ? '#3b82f6' : '#e5e7eb',
					color: isActive('all') ? 'white' : 'black',
				}}
				onClick={() => handleFilterChange('all')}
			>
				All
			</button>
			<button
				style={{
					backgroundColor: isActive('active') ? '#3b82f6' : '#e5e7eb',
					color: isActive('active') ? 'white' : 'black',
				}}
				onClick={() => handleFilterChange('active')}
			>
				Active
			</button>
			<button
				style={{
					backgroundColor: isActive('completed') ? '#3b82f6' : '#e5e7eb',
					color: isActive('completed') ? 'white' : 'black',
				}}
				onClick={() => handleFilterChange('completed')}
			>
				Completed
			</button>
		</div>
	)
}
