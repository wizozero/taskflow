import { useTaskContext } from '../context/TaskContext'

export default function Stats() {
	const { state } = useTaskContext()

	const total = state.tasks.length
	const active = state.tasks.filter((task) => !task.completed).length
	const completed = state.tasks.filter((task) => task.completed).length

	return (
		<div className='stats-container'>
			<h3 className='stats-title'>Statistics</h3>
			<div className='stats-grid'>
				<div className='stats-item'>
					<div className='stats-label'>Total</div>
					<div className='stats-value'>{total}</div>
				</div>
				<div className='stats-item'>
					<div className='stats-label'>Active</div>
					<div className='stats-value'>{active}</div>
				</div>
				<div className='stats-item'>
					<div className='stats-label'>Completed</div>
					<div className='stats-value'>{completed}</div>
				</div>
			</div>
		</div>
	)
}
