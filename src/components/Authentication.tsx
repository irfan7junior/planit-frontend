import React from 'react'

interface IAuthentication {}

const Authentication: React.FC<IAuthentication> = () => {
  return (
    <div className=" justify-center items-center flex">
      <div className="border-gray-400 rounded-2xl max-w-lg flex flex-col m-8 border-2 p-12 justify-center items-center">
        <div className="font-semibold text-xl font-pacifico text-center text-yellow-500 tracking-wider">
          Authenticate with Github
          <br />
          to continue!
        </div>
        <div className="my-10">
          <i className="fa fa-github fa-5x" aria-hidden="true"></i>
        </div>
        <div>
          <a
            href={`${process.env.REACT_APP_API}/auth/github`}
            className="btn-gray"
          >
            Login with GITHUB
          </a>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default Authentication
