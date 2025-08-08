import React from 'react'

const Spinner = () => {
    return (
        <div className="flex flex-col justify-center items-center h-[700px]">
            <div className="flex justify-center items-center">
                <div className="w-20 h-20 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
            </div>
        </div>
    )
}

export default Spinner