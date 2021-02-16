import React, { Dispatch, SetStateAction } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  QueryFunction,
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from 'react-query'
import { baxios } from 'src/utils/api_axios'
import { ProjectCreateResponse } from 'src/@types/response'
import Loading from './Loading'

export interface ICreate {
  hiddenCreate: boolean
  setHiddenCreate: Dispatch<SetStateAction<boolean>>
  refetchProjects: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ProjectCreateResponse, unknown>>
}

const formSchema = Yup.object({
  title: Yup.string().required().min(3).max(25),
})

const postProject: QueryFunction = async (data) => {
  const title = data.queryKey[1]
  const response = await baxios.post('/projects', {
    title,
  })
  return response.data
}

const Create: React.FC<ICreate> = ({
  hiddenCreate,
  setHiddenCreate,
  refetchProjects,
}) => {
  const formik = useFormik({
    initialValues: {
      title: '',
    },
    onSubmit: async (values) => {
      await refetch()
      formik.resetForm()
      await refetchProjects()
      setHiddenCreate(true)
    },
    validationSchema: formSchema,
  })
  const { isLoading, refetch } = useQuery(
    ['POST_PROJECT', formik.values.title],
    postProject,
    {
      enabled: false,
    }
  )

  if (hiddenCreate) return null

  if (isLoading) return <Loading />

  return (
    <div className="fixed top-0 left-0 h-full w-full bg-purple-500 z-50 flex justify-center items-center">
      <div className="w-full md:w-1/3 m-2 rounded-lg p-2 border-gray-500 bg-blue-100 flex flex-col justify-start">
        <form action="#" autoComplete="off" onSubmit={formik.handleSubmit}>
          <label
            htmlFor="title"
            className="text-gray-500 font-pacifico tracking-widest"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="title"
            name="title"
            className="p-1 font-langar tracking-widest w-full text-yellow-800 outline-none"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          <div
            aria-hidden="true"
            className="text-white font-semibold uppercase bg-gray-700 rounded-md mt-1 p-1"
          >
            {formik.errors.title}
          </div>
          <div className="flex justify-center my-6">
            <button
              onClick={() => setHiddenCreate(true)}
              type="button"
              className="btn-yellow"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                opacity: isLoading ? '50%' : 'inherit',
              }}
              className="btn-green"
            >
              {isLoading ? (
                <i className="fa fa-circle-o-notch fa-spin"></i>
              ) : (
                'Create'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Create
