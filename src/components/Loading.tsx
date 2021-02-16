import React from 'react'

export interface ILoading {}

const Loading: React.FC<ILoading> = ({}) => {
  return (
    <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
      <span
        className="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0"
        style={{ top: '50%' }}
      >
        <i className="fa fa-circle-o-notch fa-spin fa-5x"></i>
      </span>
    </div>
  )
}

export default Loading
