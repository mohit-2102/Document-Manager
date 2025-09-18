import React from 'react'
import { LuPlus } from "react-icons/lu"

function Navbar({ onAddClick, onSearchChange }) {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-zinc-900/90 flex items-center justify-between sm:justify-around px-4 sm:px-6 z-50 shadow-md">
      {/* App name */}
      <h1 className="text-white text-lg sm:text-xl flex items-center gap-2 font-semibold">
        <img 
          src="/logo.png" 
          className="rounded-full w-8 h-8 sm:w-10 sm:h-10" 
          alt="logo" 
        />
        <span className="hidden sm:inline sm:text-2xl leading-tight">DocCloud</span>
      </h1>

      {/* Plus button */}
      <div className="flex items-center">

      <input
        type="text"
        placeholder="Search by desc or ext..."
        onChange={(e) => onSearchChange(e.target.value)}
        className="px-3 py-2 rounded-4xl bg-zinc-400/20 text-zinc-300 w-48  sm:w-64 mr-4 focus:outline-none focus:ring-0 focus:border-none"
        />
      <button 
        onClick={onAddClick} 
        className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-b from-blue-900/95 to-blue-950/95 rounded-full cursor-pointer flex items-center justify-center text-white hover:bg-sky-500 transition"
        >
        <LuPlus size={18} className="sm:size-20" />
      </button>
          </div>
    </nav>
  )
}
export default Navbar


// import { px } from 'framer-motion'
// import React from 'react'
// import { LuPlus } from "react-icons/lu"

// function Navbar({ onAddClick }) {
//   return (
//     <nav className='fixed top-0 left-0 w-full h-16 bg-zinc-900/90 flex items-center justify-around px-6 z-50 shadow-md'>
//       {/* App name */}
      
//       <h1 className='text-white text-xl flex items-center gap-2 font-semibold'>
//        <img src="/logo.png" className='rounded-full' width={40} height={40} alt="logo" /> DocuHub</h1>

//       {/* Plus button */}
//       <button 
//         onClick={onAddClick} 
//         className='w-10 h-10 bg-sky-600 rounded-full cursor-pointer flex items-center justify-center text-white hover:bg-sky-500 transition'
//       >
//         <LuPlus size={24} />
//       </button>
//     </nav>
//   )
// }

// export default Navbar
