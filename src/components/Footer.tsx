import React from "react"

interface IFooter {}

const Footer: React.FC<IFooter> = () => {
    return (
        <footer className="flex mt-10 bg-black py-5 justify-center rounded-lg m-2">
            <div>
                <p className="text-lg text-white font-langar tracking-widest font-thin">
                    &copy;I7M
                </p>
            </div>
        </footer>
    )
}

export default Footer
