import React from 'react'

export interface ISnackbar {
  text: string
  color: string
}

const Snackbar: React.FC<ISnackbar> = ({ text }) => {
  return (
    <div
      className={`text-white px-6 py-4 border-0 rounded fixed bottom-0 mb-3 bg-yellow-500`}
    >
      <span className="text-xl inline-block mr-5 align-middle">
        <i className="fa fa-bell" />
      </span>
      <span className="inline-block align-middle mr-8">
        <b className="capitalize">{text}</b>
      </span>
      <button className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"></button>
    </div>
  )
}

export default Snackbar
