import React, { useEffect, useRef, useState } from 'react'
import { QueryFunction, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { ProjectGetResponse, ProjectSingle, Todo } from 'src/@types/response'
import { baxios } from 'src/utils/api_axios'
import Loading from './Loading'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import Snackbar from './Snackbar'

export interface IProject {}

const validationSchema = Yup.object({
  title: Yup.string().min(3).max(25).required().label('Title'),
  iscompleted: Yup.string().required().label('Completed?'),
  taskdescription: Yup.string().min(3).max(100).required().label('Description'),
  edittaskdescription: Yup.string()
    .min(3)
    .max(100)
    .required()
    .label('Description'),
})

const getProject: QueryFunction<ProjectGetResponse> = async ({ queryKey }) => {
  const response = await baxios.get('/projects/' + queryKey[1])
  return response.data
}

const Project: React.FC<IProject> = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      iscompleted: 'false',
      taskdescription: '',
      edittaskdescription: '',
      editiscompleted: 'false',
    },
    onSubmit: (values) => {
      console.log(values)
    },
    validationSchema,
  })

  const { id } = useParams() as { id: string }

  const [editMode, setEditMode] = useState(false)
  const [project, setProject] = useState<ProjectSingle>()
  const [editModes, setEditModes] = useState<{ [key: string]: boolean }>({})
  const [snackbar, setSnackbar] = useState({
    open: false,
    color: '',
    text: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const getProjectQuery = useQuery<ProjectGetResponse>(
    ['GET_PROJECT', id],
    getProject,
    {
      enabled: false,
    }
  )

  useEffect(() => {
    getProjectQuery.refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const newEditModesState: { [key: string]: boolean } = {}

    const todoId = project?.todos.map((todo) => {
      return todo._id
    })

    todoId?.forEach((id) => {
      newEditModesState[id] = false
    })

    setEditModes(newEditModesState)
  }, [project])

  useEffect(() => {
    if (getProjectQuery.data && !getProjectQuery.isLoading) {
      setProject(getProjectQuery.data.project)
    }
  }, [getProjectQuery.data, getProjectQuery.isLoading])

  useEffect(() => {
    if (editMode) {
      inputRef.current?.focus()
    }
  }, [editMode])

  if (isLoading) return <Loading />
  if (getProjectQuery.isFetching) return <Loading />

  const handleChangeTitle = async () => {
    if (formik.errors.title) return
    if (!formik.touched.title) return
    await baxios.put('/projects/' + id, {
      title: formik.values.title,
    })
    await getProjectQuery.refetch()
    formik.setValues({ ...formik.values, title: '' })
    formik.setTouched({
      title: false,
    })
    setEditMode(false)
  }

  const handleCreateTask = async () => {
    formik.setTouched({
      ...formik.touched,
      iscompleted: true,
      taskdescription: true,
    })
    if (!formik.touched.taskdescription) return
    if (formik.errors.taskdescription) return
    await baxios.post('/todos', {
      projectId: id,
      description: formik.values.taskdescription,
      completed: formik.values.iscompleted === 'true' ? true : false,
    })
    await getProjectQuery.refetch()
    formik.setValues({
      ...formik.values,
      taskdescription: '',
      iscompleted: 'false',
    })
    formik.setTouched({
      iscompleted: false,
      taskdescription: false,
    })
  }

  const handleOnEdit = (id: string) => {
    formik.resetForm()
    formik.setTouched({
      ...formik.touched,
      editiscompleted: true,
      edittaskdescription: true,
    })
    const editModesObject = {}
    Object.keys(editModes).forEach((_id) => {
      editModesObject[_id] = false
    })
    editModesObject[id] = true
    const foundTask = project?.todos.find((todo) => todo._id === id)
    formik.setValues({
      ...formik.values,
      editiscompleted: foundTask?.completed ? 'true' : 'false',
      edittaskdescription: foundTask?.description as string,
    })
    setEditModes(editModesObject)
  }

  const handleEditTask = async (id: string) => {
    if (formik.errors.edittaskdescription) return
    await baxios.put('/todos/' + id, {
      completed: formik.values.editiscompleted === 'true' ? true : false,
      description: formik.values.edittaskdescription,
    })

    await getProjectQuery.refetch()

    formik.resetForm()

    const editModesObject = {}
    Object.keys(editModes).forEach((_id) => {
      editModesObject[_id] = false
    })

    setEditModes(editModesObject)
  }

  const handleDeleteTask = async (id: string) => {
    await baxios.delete('/todos/' + id)
    await getProjectQuery.refetch()
  }

  const handleExportGists = async () => {
    setIsLoading(true)
    const response = await baxios.post<{ error: boolean; message: string }>(
      '/secret/gists/' + id
    )
    setIsLoading(false)

    if (!response.data.error) {
      setSnackbar({
        open: true,
        text: response.data.message,
        color: 'green',
      })
    } else {
      setSnackbar({
        open: true,
        text: response.data.message,
        color: 'red',
      })
    }

    setTimeout(() => {
      setSnackbar({
        open: false,
        text: '',
        color: '',
      })
    }, 4000)
  }

  if (getProjectQuery.isLoading || !project) return <Loading />

  const titleOrInput = () => {
    if (!editMode)
      return (
        <>
          <p className="text-2xl mx-auto font-langar my-auto">
            {project.title}
          </p>
          <i
            onClick={() => {
              setEditMode(true)
            }}
            className="fa mr-0 ml-0 fa-edit fa-2x p-1 pl-2 text-yellow-400 rounded hover:bg-yellow-400 hover:text-white"
          ></i>
        </>
      )
    else
      return (
        <>
          <input
            ref={inputRef}
            type="text"
            placeholder={project.title}
            className="p-1 outline-none w-full border-2 font-langar text-center tracking-wider focus:border-green-600"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            autoComplete="off"
            name="title"
          />
          <button onClick={handleChangeTitle} className="btn-green my-1">
            <i className="fa fa-arrow-right fa-1x my-auto mx-1"></i>
          </button>
        </>
      )
  }

  const taskComponent = (todo: Todo) => {
    const iconClassString = todo.completed
      ? 'fa fa-2x pl-1 pt-1 rounded m-1 active:border-2 transition-colors delay-50 active:bg-green-400 cursor-pointer text-green-900 hover:bg-green-900 hover:text-white'
      : 'fa fa-2x pl-1 pt-1 rounded m-1 active:border-2 transition-colors delay-50 active:bg-red-400 cursor-pointer text-red-900 hover:bg-red-900 hover:text-white'

    const paragraphClassString = todo.completed
      ? 'text-3xl p-0 text-green-500 font-langar'
      : 'text-3xl p-0 text-red-500'

    const liClassString = todo.completed
      ? 'flex my-1 bg-green-100 rounded'
      : 'flex my-1 bg-red-100 rounded'

    if (editModes[todo._id] === false)
      return (
        <li key={todo._id} className={liClassString}>
          <div className="w-8 h-10 text-center py-1">
            <p className={paragraphClassString}>&bull;</p>
          </div>
          <div className="w-4/5 h-10 py-3 px-1">
            <p className="hover:text-blue-dark my-auto font-langar">
              {todo.description}
            </p>
          </div>
          <div className="h-full text-right my-auto">
            <i
              className={iconClassString + ' fa-edit fa-trash pr-1 pb-1'}
              onClick={() => handleDeleteTask(todo._id)}
            ></i>
          </div>
          <div className="h-full text-right my-auto">
            <i
              className={iconClassString + ' fa fa-edit'}
              onClick={() => handleOnEdit(todo._id)}
            ></i>
          </div>
        </li>
      )
    return (
      <div key={todo._id}>
        <li key={todo._id} className="flex my-1">
          <div className="w-2/5 min-h-full">
            <input
              type="text"
              className="min-h-full font-langar tracking-wider w-full outline-none rounded p-1 border-gray-300 border-2 focus:ring-2 focus:ring-red-600"
              name="edittaskdescription"
              value={formik.values.edittaskdescription}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={todo.description}
            />
          </div>
          <div className="w-1/5 text-right mx-1 my-full border bg-green-200 rounded border-gray-400 flex justify-around">
            <input
              type="radio"
              className="my-auto form-radio h-5 w-5 text-gray-600"
              name="editiscompleted"
              value="true"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.editiscompleted === 'true'}
            />
          </div>
          <div className="w-1/5 text-right my-full bg-yellow-200 border rounded border-gray-400 flex justify-around">
            <input
              type="radio"
              className="my-auto form-radio h-5 w-5 text-gray-600"
              name="editiscompleted"
              value="false"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.editiscompleted === 'false'}
            />
          </div>
          <div className="w-1/5 text-right my-auto flex justify-center">
            <button
              onClick={() => handleEditTask(todo._id)}
              className="btn-green"
            >
              Done
            </button>
          </div>
        </li>
        <div
          aria-hidden="true"
          className="text-white w-full text-center font-semibold uppercase bg-gray-700 rounded-md mt-1 p-1"
        >
          {formik.touched.edittaskdescription &&
            formik.errors.edittaskdescription}
        </div>
      </div>
    )
  }

  console.log(snackbar.color)

  return (
    <div className="flex flex-col place-items-center m-2 sm:m-0 w-full sm:w-2/3 max-w-3xl ">
      <div className="flex flex-col items-center w-full relative">
        <p className="text-3xl font-pacifico tracking-widest text-gray-400">
          Title
        </p>
        <div className="absolute right-0 -mt-3">
          <button
            onClick={() => handleExportGists()}
            className="bg-red-400 font-roboto font-semibold focus:outline-none active:bg-red-600 text-white border rounded-md flex items-center justify-center p-1"
          >
            Export <i className="fa fa-github fa-2x ml-1"></i>
          </button>
        </div>
        <div className="border-2 w-full p-1 flex flex-wrap justify-center mb-2">
          {titleOrInput()}
          <div
            aria-hidden="true"
            className="text-white w-full text-center font-semibold uppercase bg-gray-700 rounded-md mt-1 p-1"
          >
            {formik.touched.title && formik.errors.title}
          </div>
        </div>

        <p className="mt-2 text-3xl font-pacifico tracking-widest text-gray-400">
          Tasks
        </p>
        <div className="border-2 w-full p-1 flex flex-wrap mb-2">
          <div className="w-full">
            <input
              placeholder="task description"
              autoComplete="off"
              name="taskdescription"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.taskdescription}
              type="text"
              className="p-1 my-1 outline-none w-full border-2 font-langar text-center tracking-wider focus:border-green-600"
            />
          </div>
          <div className="w-full flex flex-wrap p-1">
            <div className="w-2/3 flex justify-center items-center">
              <label className="inline-flex items-center mt-3 m-1">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-gray-600"
                  name="iscompleted"
                  value="true"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.iscompleted === 'true'}
                />
                <span className="ml-2 text-gray-700 font-roboto">
                  Completed
                </span>
              </label>
              <label className="inline-flex items-center mt-3 m-1">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-gray-600"
                  name="iscompleted"
                  value="false"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.iscompleted === 'false'}
                />
                <span className="ml-2 text-gray-700 font-roboto">
                  Incomplete
                </span>
              </label>
            </div>
            <div className="w-1/3 flex justify-center items-center">
              <button onClick={handleCreateTask} className="btn-green my-auto">
                <i className="fa fa-arrow-right fa-1x my-auto mx-1"></i>
              </button>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="text-white w-full text-center font-semibold uppercase bg-gray-700 rounded-md mt-1 p-1"
          >
            {formik.touched.taskdescription && formik.errors.taskdescription}
          </div>
        </div>
        <div className="border-2 w-full p-1 flex flex-col items-center justify-center mb-2">
          <p className="mt-2 text-xl font-pacifico mb-1 tracking-widest text-gray-400">
            Incomplete
          </p>
          <div className="w-full  my-1">
            <ul className="list-none">
              {project.todos
                .filter((todo) => todo.completed === false)
                .map((todo) => taskComponent(todo))}
            </ul>
          </div>
        </div>
        <div className="border-2 w-full p-1 flex flex-col items-center justify-center mb-2">
          <p className="mt-2 text-xl font-pacifico mb-1 tracking-widest text-gray-400">
            Completed
          </p>
          <div className="w-full  my-1">
            <ul className="list-none">
              {project.todos
                .filter((todo) => todo.completed)
                .map((todo) => taskComponent(todo))}
            </ul>
          </div>
        </div>
      </div>
      {snackbar.open && (
        <Snackbar color={snackbar.color} text={snackbar.text} />
      )}
    </div>
  )
}

export default Project
