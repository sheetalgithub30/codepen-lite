import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {motion} from "framer-motion"
import { MdBookmark } from 'react-icons/md';

function Projects() {
   const projects = useSelector((state)=>state.user?.projects);
   const searchTerm = useSelector((state)=>state.user?.searchTerm ? state.user?.searchTerm : "");
   const[filtered,setFiltered] = useState(null);

   useEffect(()=>{
         if(searchTerm?.length >0){
          setFiltered(  projects?.filter((project)=>{
            const loweCaseItem = project?.title.toLowerCase();
            return searchTerm.split("").every((letter)=>loweCaseItem.includes(letter));
          }))
         }
         else{
          setFiltered(null);
         }
   },[searchTerm])

  return (
    <div className='w-full py-6 flex items-center justify-center gap-6 flex-wrap'>
         {filtered ? <>
          {filtered &&
             filtered.map((project,index)=>{
              return  <ProjectCard key={project.id} project={project} index={index}/>
             })
           }
         </>:
         <>
           {projects &&
             projects.map((project,index)=>{
              return  <ProjectCard key={project.id} project={project} index={index}/>
             })
           }
           </>}
    </div>
  )
}



const ProjectCard =({project,index})=>{
  return <motion.div key={index} className='w-full cursor-pointer md:w-[350px] h-[330px] bg-secondary
  rounded-md p-4 flex flex-col items-center justify-center gap-4'>

<div className="bg-primary w-full h-full rounded-md overflow-hidden"
            style={{overflow:"hidden" ,height:"100%"}}
          >
                 <iframe
                   title="Result"
                   srcDoc={project.result}
                   style={{border :"none", width:"100%", height:"100%"}}
                 >  
                 </iframe>
          </div>
          <div className='flex items-center justify-start gap-3 w-full'>
          <div
        className="w-10 h-10 flex items-center justify-center rounded-xl
        overflow-hidden cursor-pointer bg-emerald-500"
      >
        {project?.user?.photoURL ? (
          <>
            <motion.img
              whileHover={{ scale: 1.2 }}
              src={user?.photoURL}
              alt={user?.displayName}
              className="w-full h-full object-cover"
            ></motion.img>
          </>
        ) : (
          <p className="text-xl text-white font-semibold capitalize">
            {project?.user?.email[0]}
          </p>
        )}
      </div>
      <div>
        <p className='text-white text-lg capitalize'>{project?.title}</p>
      <p className="text-primaryText text-sm">
            {project?.user?.displayName ? user?.displayName : 
              `${project?.user?.email.split("@")[0]}`
            }
          </p>
      </div>
          <motion.div
            whileTap={{scale:0.9}}
            className='cursor-pointer ml-auto'
          >
            <MdBookmark className='text-primaryText text-3xl'/>
          </motion.div>

          </div>
  </motion.div>
}

export default Projects