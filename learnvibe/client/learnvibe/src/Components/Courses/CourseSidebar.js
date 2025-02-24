import React from 'react'
import Accordian from './Accordian'

const chapters = [
    { title: 'Chapter 1', content: 'Subtopic 1.1' },
    { title: 'Chapter 2', content: 'Subtopic 2.1' },
    { title: 'Chapter 3', content: 'Subtopic 3.1' },
];

const CourseSidebar = () => {
  return (
    <div className='w-[20%] h-screen lg:mt-6 hidden lg:block overflow-auto'>
     <Accordian data={chapters} />
    </div>
  )
}

export default CourseSidebar
