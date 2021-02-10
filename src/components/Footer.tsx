import React from 'react'

interface IFooter {}

const Footer: React.FC<IFooter> = () => {
  return (
    <footer className="flex mt-10 bg-black py-5 justify-center">
      <div>
        <p className="text-lg font-bold text-white">&copy;I7M</p>
      </div>
    </footer>
  )
}

export default Footer
