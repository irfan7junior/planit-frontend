import React, { useContext, useEffect } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import logo from 'src/assets/logo.svg'
import { AppContext } from 'src/context'
import { baxios } from 'src/utils/api_axios'

interface IHeader {}

const fetchUser = async () => {
  const response = await baxios.get('/current_user')
  return response.data
}

const Header: React.FC<IHeader> = () => {
  const { data } = useQuery('FETCH_USER', fetchUser)
  const { dispatch, user } = useContext(AppContext)

  useEffect(() => {
    dispatch({ type: 'SET_USER', payload: data })
  }, [dispatch, data])

  const blogsButton = () => {
    return (
      <div className="flex">
        <a
          href={`https://blog.irfan7junior.in`}
          className="btn-green"
          target="_blank"
          rel="noopener noreferrer"
        >
          Blogs
        </a>
        <a
          href={`https://irfan7junior.in/resume`}
          className="btn-green"
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume
        </a>
      </div>
    )
  }

  const logoutButton = () => {
    return (
      <a href={`${process.env.REACT_APP_API}/logout`} className="btn-yellow">
        Log Out
      </a>
    )
  }

  return (
    <header className="mb-4 max-w-xl self-center m-1 rounded-xl p-1 flex justify-between border-gray-400 border-2">
      <div className="w-1/3 md:w-1/4 flex items-center">
        <Link to="/">
          <button className="focus:outline-none hover:bg-green-700 p-1 active:bg-red-400 rounded">
            <img src={logo} alt="logo" className="rounded-xl" />
          </button>
        </Link>
      </div>
      <div className="flex-grow flex justify-end items-center mr-2">
        {user?.authenticated ? logoutButton() : blogsButton()}
      </div>
    </header>
  )
}

export default Header
