export type Task_Status = 'TODO' | 'IN_PROGRESS' | 'COMPLETED'

export type CommentType = {
  Text: string
  adviserName: string
  id: string
  createdAt: string
}

export interface IEditTask {
  title?: string
  adviserId: string
  adviserName: string
  link?: string
  status?: Task_Status
  description?: string
  id?: number | string
  comments?: CommentType[]
}

export type EditTaskRequest = Omit<IEditTask, 'adviserName'>

export type ITask = Omit<IEditTask, 'id'>
export interface IComment {
  adviserId: string
  taskId?: number | string
  text: string
  id?: string
}

export type DeleteCommentRequest = Omit<IComment, 'text' | 'adviserId'>
