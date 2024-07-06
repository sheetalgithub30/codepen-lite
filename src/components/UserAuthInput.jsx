import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {motion} from "framer-motion"

function UserAuthInput({ label, placeholder, isPass, setStateFunction, Icon ,setEmailValidationStatus}) {
  const [value, setValue] = useState("");
  const[showPass,setShowPass] = useState(true);
  const[isEmailValid , setIsEmailValid] = useState(false);

  function handleTextChange(e){
     setValue(e.currentTarget.value);
     setStateFunction(e.currentTarget.value);

     if(placeholder === "Email"){
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const status = emailRegex.test(value);
          setIsEmailValid(status);
          setEmailValidationStatus(status);
        }
     else{

     }
  }

  return (
    <div className="flex flex-col items-start justify-start gap-1 ">
      <label className="text-sm text-gray-300">{label}</label>
      <div
        className={`flex items-center justify-center gap-3 w-72 md:w-72
            rounded-md px-4 py-1 bg-gray-200
              ${!isEmailValid && placeholder === "Email" && value.length>0 &&
                "border-2 border-red-600"
              }
            `}
      >
        <Icon className="text-text555 text-2xl" />
        <input
          type={isPass && showPass ? "password" : "text"}
          placeholder={placeholder}
          className="flex-1 w-full h-full py-1 outline-none border-none bg-transparent text-text555 text-lg"
          value={value}
          onChange={handleTextChange}
        ></input>

        {isPass && (
          <motion.div onClick={()=>setShowPass(!showPass)}
           whileTap={{scale:0.9}}
          className="cursor-pointer">
            {showPass ? (
              <FaEyeSlash className="text-text555 text-xl" />

            ):(
                <FaEye className="text-text555 text-xl" />
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default UserAuthInput;
