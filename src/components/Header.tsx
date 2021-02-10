import React, { useContext, useEffect } from 'react'
import { useQuery } from 'react-query'
import logo from 'src/assets/logo.svg'
import { AppContext } from 'src/context'
import { baxios } from 'src/utils/api_axios'

interface IHeader {}

const fetchUser = async () => {
  const response = await baxios.get('/current_user')
  return response.data
}

const Header: React.FC<IHeader> = ({}) => {
  const { data } = useQuery('FETCH_USER', fetchUser)
  const { dispatch, user } = useContext(AppContext)

  useEffect(() => {
    dispatch({ type: 'SET_USER', payload: data })
  }, [dispatch, data])

  const loginButton = () => {
    return (
      <button className="bg-purple-300 rounded hover:bg-purple-400 h-1/2 p-4 flex text-white">
        <a
          href={`${process.env.REACT_APP_API}/auth/github`}
          className="self-center"
        >
          Log In
        </a>
      </button>
    )
  }

  const logoutButton = () => {
    return (
      <button className="bg-purple-300 rounded hover:bg-purple-400 h-1/2 p-4 flex text-white">
        <a href={`${process.env.REACT_APP_API}/logout`} className="self-center">
          Log Out
        </a>
      </button>
    )
  }

  return (
    <header className="bg-black mb-4 flex justify-between">
      <div className="w-1/3 md:w-1/4">
        <img src={logo} alt="logo" className="" />
      </div>
      <div className="flex-grow flex justify-end items-center mr-2">
        {user?.authenticated ? logoutButton() : loginButton()}
      </div>
    </header>
  )
}

export default Header
