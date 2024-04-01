import React from "react"

export interface ILoading {}

const Loading: React.FC<ILoading> = () => {
    return (
        <div className="fixed h-full w-full top-0 left-0 flex justify-center items-center bg-white opacity-75 z-50">
            <span className="text-green-500 opacity-75">
                <i className="fa fa-circle-o-notch fa-spin fa-5x"></i>
            </span>
        </div>
    )
}

export default Loading
