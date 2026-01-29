export type Priority = 'low' | 'medium' | 'high'
export type Category = 'work' | 'personal' | 'shopping'
export type Filter = 'all' | 'active' | 'completed'

export interface Task {
	id: string
	title: string
	completed: boolean
	priority: Priority
	category: Category
	createdAt: number
}
