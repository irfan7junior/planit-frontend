import React from 'react'

interface IAuthentication {}

const Authentication: React.FC<IAuthentication> = () => {
  return (
    <div className=" justify-center items-center">
      <div className="border-gray-400 flex flex-col m-8 border-2 p-12 justify-center items-center">
        <div className="font-semibold text-xl">Authenticate with Github</div>
        <div className="my-10"></div>
        <div>
          <a href="/auth/github">Login With Github</a>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default Authentication
