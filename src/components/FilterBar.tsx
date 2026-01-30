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
		<div className='filter-bar'>
			<button
				className={`filter-button ${isActive('all') ? 'active' : ''}`}
				onClick={() => handleFilterChange('all')}
			>
				All
			</button>
			<button
				className={`filter-button ${isActive('active') ? 'active' : ''}`}
				onClick={() => handleFilterChange('active')}
			>
				Active
			</button>
			<button
				className={`filter-button ${isActive('completed') ? 'active' : ''}`}
				onClick={() => handleFilterChange('completed')}
			>
				Completed
			</button>
		</div>
	)
}
