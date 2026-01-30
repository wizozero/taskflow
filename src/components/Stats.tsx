import { useTaskContext } from '../context/TaskContext'

export default function Stats() {
	const { state } = useTaskContext()

	const total = state.tasks.length
	const active = state.tasks.filter((task) => task.completed === false).length
	const completed = state.tasks.filter((task) => task.completed === true).length

	return (
		<div>
			<h3>Statistics</h3>
			<p>Total: {total}</p>
			<p>Active: {active}</p>
			<p>Completed: {completed}</p>
		</div>
	)
}
