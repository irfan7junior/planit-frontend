import React, { useContext } from 'react'
import { AppContext } from 'src/context'
import Authentication from './Authentication'
import Loading from './Loading'
import Projects from './Projects'

interface IHome {}

const Home: React.FC<IHome> = () => {
  const { user } = useContext(AppContext)

  if (!user) {
    return <Loading />
  }

  return (
    <div className="">
      {user?.authenticated ? <Projects /> : <Authentication />}
    </div>
  )
}

export default Home
