import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	type Dispatch,
	type ReactNode,
} from 'react'
import type { Filter, Task } from '../types/task'

// ============================================
// 1. TYPES
// ============================================

interface TaskState {
	tasks: Task[]
	filter: Filter
}

type TaskAction =
	| { type: 'ADD_TASK'; payload: Omit<Task, 'id' | 'createdAt'> }
	| { type: 'DELETE_TASK'; payload: string }
	| { type: 'TOGGLE_TASK'; payload: string }
	| { type: 'EDIT_TASK'; payload: { id: string; updates: Partial<Task> } }
	| { type: 'SET_FILTER'; payload: Filter }

interface TaskContextType {
	state: TaskState // ✅ Estado completo
	dispatch: Dispatch<TaskAction> // ✅ Función dispatch
	filteredTasks: Task[] // ✅ Helper: tasks filtradas
}

// ============================================
// 2. CONTEXT
// ============================================

export const TaskContext = createContext<TaskContextType | undefined>(undefined)

// Helper hook
export function useTaskContext() {
	const context = useContext(TaskContext)
	if (!context) {
		throw new Error('useTaskContext must be used within TaskProvider')
	}
	return context
}

// ============================================
// 3. REDUCER
// ============================================

function taskReducer(state: TaskState, action: TaskAction): TaskState {
	switch (action.type) {
		case 'ADD_TASK':
			return {
				...state,
				tasks: [
					...state.tasks,
					{ ...action.payload, id: crypto.randomUUID(), createdAt: Date.now() },
				],
			}
		case 'DELETE_TASK':
			return {
				...state,
				tasks: state.tasks.filter((task) => task.id !== action.payload),
			}
		case 'TOGGLE_TASK':
			return {
				...state,
				tasks: state.tasks.map((task) =>
					task.id === action.payload
						? { ...task, completed: !task.completed }
						: task,
				),
			}
		case 'EDIT_TASK':
			return {
				...state,
				tasks: state.tasks.map((task) =>
					task.id === action.payload.id
						? { ...task, ...action.payload.updates }
						: task,
				),
			}
		case 'SET_FILTER':
			return { ...state, filter: action.payload }
		default:
			return state
	}
}

// ============================================
// 4. PROVIDER
// ============================================

export function TaskProvider({ children }: { children: ReactNode }) {
	const loadTasksFromStorage = () => {
		try {
			const stored = localStorage.getItem('tasks')
			return stored ? JSON.parse(stored) : []
		} catch (error) {
			console.log('Error loading tasks:', error)
		}
	}

	// 1. useReducer con estado inicial
	const [state, dispatch] = useReducer(taskReducer, {
		tasks: loadTasksFromStorage(),
		filter: 'all',
	})

	// Guardar tasks en localstorage

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(state.tasks))
	}, [state.tasks])

	// 2. Calcular filteredTasks
	const filteredTasks = state.tasks.filter((task) => {
		if (state.filter === 'all') return true
		if (state.filter === 'active') return !task.completed
		if (state.filter === 'completed') return task.completed
		return true
	})

	// 3. Proveer context
	return (
		<TaskContext.Provider value={{ state, dispatch, filteredTasks }}>
			{children}
		</TaskContext.Provider>
	)
}
