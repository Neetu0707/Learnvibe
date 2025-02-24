import React from 'react'

const TextField = ({courseName,name,type,placeholder}) => {
    return (
      <div class="mb-9.5 w-full">
      <label for="name" class="text-white mb-2.5 block font-medium">
        {courseName}
      </label>
      <textarea
        id="name"
        type={type}
        name={name}
        placeholder={placeholder}
        class="rounded-lg border border-white/[0.12] bg-white/[0.05] focus:border-purple w-full py-3 px-6 outline-none min-h-[40vh]"
      />
    </div>
  )
}

export default TextField
