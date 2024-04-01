import React, { Dispatch, SetStateAction, useState } from "react"
import { QueryObserverResult, RefetchOptions, useQuery } from "react-query"
import { Link } from "react-router-dom"
import {
    Project,
    ProjectCreateResponse,
    ProjectDeleteResponse,
} from "src/@types/response"
import { baxios } from "src/utils/api_axios"
import Create from "./Create"
import Dialog from "./Dialog"
import Loading from "./Loading"

export interface IProjects {}

const fetchProjects = async () => {
    const response = await baxios.get("/projects")
    return response.data
}

const Projects: React.FC<IProjects> = () => {
    const { data, refetch, isFetching } = useQuery<ProjectCreateResponse>(
        "FETCH_PROJECTS",
        fetchProjects,
    )

    const [hidden, setHidden] = useState(true)
    const [hiddenCreate, setHiddenCreate] = useState(true)

    if (isFetching) return <Loading />

    if (data?.error) return <div>Something went wrong...</div>

    return (
        <div className="flex flex-col">
            <Create
                refetchProjects={refetch}
                hiddenCreate={hiddenCreate}
                setHiddenCreate={setHiddenCreate}
            />
            <button
                onClick={() => setHiddenCreate(false)}
                className="px-6 py-2 sm:w-1/2 md:w-48 mx-auto my-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none font-langar"
            >
                New Project{" "}
                <i className="fa text-green-700 fa-lg ml-2 fa-plus-square"></i>
            </button>

            <div className="max-w-4xl flex flex-row flex-wrap justify-center items-start p-1">
                {data?.projects?.map((project) => (
                    <Card
                        refetchProjects={refetch}
                        hidden={hidden}
                        setHidden={setHidden}
                        key={project._id}
                        {...project}
                    />
                ))}
            </div>
        </div>
    )
}

interface ICard extends Project {
    hidden: boolean
    setHidden: Dispatch<SetStateAction<boolean>>
    refetchProjects: (
        options?: RefetchOptions | undefined,
    ) => Promise<QueryObserverResult<ProjectCreateResponse, unknown>>
}

const Card: React.FC<ICard> = ({
    title,
    todos,
    hidden,
    _id,
    refetchProjects,
    setHidden,
}) => {
    const handleDelete = async () => {
        const response = await baxios.delete<ProjectDeleteResponse>(
            "/projects/" + _id,
        )
        if (response.data.error) {
            console.log("Could not DELETE PROJECT")
        } else {
            console.log("Successful! DELETE PROJECT")
            await refetchProjects()
            setHidden(true)
        }
    }

    return (
        <div className=" border-black border-2 m-1 py-4 p-1 md:w-1/3 w-full min-w-min rounded flex flex-col items-center">
            <div className="font-langar text-xl text-yellow-600">{title}</div>
            <div className="font-pacifico my-2 text-base text-gray-400">
                {todos.length} tasks
            </div>
            <div className="flex mt-2">
                <button onClick={() => setHidden(false)} className="btn-red">
                    Delete
                </button>
                <Link to={"/projects/" + _id}>
                    <button className="btn-green">Open</button>
                </Link>
            </div>
            <Dialog
                hidden={hidden}
                handleOnClick={handleDelete}
                setHidden={setHidden}
            />
        </div>
    )
}

export default Projects
