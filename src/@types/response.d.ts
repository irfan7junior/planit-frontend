export interface ProjectCreateResponse {
  error: boolean
  projects?: Project[]
  message?: string
}

export interface Project {
  createdAt: string
  todos: string[]
  _id: string
  title: string
  userId: string
  __v: number
}

export interface ProjectDeleteResponse {
  error: boolean
  message: string
}

export interface ProjectGetResponse {
  error: boolean
  project?: ProjectSingle
  message?: string
}

export interface ProjectSingle {
  createdAt: string
  todos: Todo[]
  _id: string
  title: string
  userId: string
  __v: number
}

export interface Todo {
  createdAt: string
  updatedAt: string
  _id: string
  completed: boolean
  description: string
  projectId: string
  __v: number
}
