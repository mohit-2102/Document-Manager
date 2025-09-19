import React from 'react'

function background() {
    return (
        <>
            <div className='fixed z-[2] bg-gradient-to-b from-[#001529] via-[#00254d] to-[#003366] bg-opacity-90 w-full h-screen'>

                <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_#004080,_transparent_70%)]">
                    <h1 className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-[13vw] leading-none tracking-tighter font-semibold text-zinc-900/70 ">Docs.</h1>
                </div>
            </div>
        </>
    )
}

export default background
