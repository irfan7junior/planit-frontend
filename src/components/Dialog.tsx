import React, { Dispatch, SetStateAction } from 'react'

export interface IDialog {
  hidden: boolean
  setHidden: Dispatch<SetStateAction<boolean>>
  handleOnClick: () => void
}

const Dialog: React.FC<IDialog> = ({ hidden, setHidden, handleOnClick }) => {
  if (hidden) return null
  return (
    <div className="min-h-full  min-w-full absolute left-0 top-0 bg-gradient-to-b from-green-100 to-red-400 flex justify-center items-center">
      <div className="bg-white rounded-lg">
        <div className="w-96 border-t-8 border-pink-600 rounded-lg flex">
          <div className="w-1/3 pt-6 flex justify-center"></div>
          <div className="w-full pt-9 pr-4">
            <h3 className="font-bold text-pink-700">Delete Project?</h3>
            <p className="py-4 text-sm text-gray-400">
              Are you sure you want to delete the Project? If you delete your
              Project, you will permantly loose everything.
            </p>
          </div>
        </div>

        <div className="p-4 flex space-x-4">
          <button
            className="btn-green"
            style={{ width: '50%', padding: '20px' }}
            onClick={() => setHidden(true)}
          >
            Cancel
          </button>
          <button
            onClick={() => handleOnClick()}
            className="btn-red"
            style={{ width: '50%', padding: '20px' }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dialog
