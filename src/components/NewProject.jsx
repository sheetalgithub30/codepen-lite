import { javascript } from "@codemirror/lang-javascript";
import CodeMirror from "@uiw/react-codemirror";
import { update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { FaHtml5, FaJs } from "react-icons/fa";
import { FaCircleChevronDown, FaCss3 } from "react-icons/fa6";
import { FcSettings } from "react-icons/fc";
import SplitPane from "split-pane-react/esm/SplitPane";
import "split-pane-react/esm/themes/default.css";

function NewProject() {
  const [sizes, setSizes] = useState(["45%", "45%", "auto"]);
  const[size,setSize] = useState("80%");

  const[html,setHtml] = useState("");
  const[css,setCss] = useState("");
  const[js,setJs] = useState("");
  const[result,setResult] = useState("");

  useEffect(()=>{
    updateOutput();
  },[html,css,js])

  const updateOutput = ()=>{
    const combineOutput =`
      <html>
      <head>
          <style>${css}</style>
      </head>
      <body>
        ${html}
    <script>${js}</script>
      </body>
      </html>
    `;

    setResult(combineOutput);
  }

  return (
    <>
      <div
        className="w-screen h-screen flex flex-col
    items-start justify-start overflow-hidden absolute"
      >

        <div>
            <p>hello</p>
        </div>
        {/* html */}
        <div className="h-screen w-screen">

         <SplitPane split='horizontal' sizes={size}  onChange={(size) => setSize(size)}>
              <SplitPane  split='vertical' sizes={sizes} onChange={(sizes) => setSizes(sizes)}>
            <div className="w-full h-full flex flex-col items-start justify-start border-[1px] border-gray-400">
              <div className="flex w-full items-center justify-between">
                <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
                  <FaHtml5 className="text-xl text-red-500" />
                  <p className="text-primaryText font-semibold ">HTML</p>
                </div>
                <div className="cursor-pointer flex items-center justify-end gap-5 px-4">
                  <FcSettings className="text-xl" />
                  <FaCircleChevronDown className="text-xl text-primaryText" />
                </div>
              </div>
              <div className="w-full px-2">
                <CodeMirror 
                value={html}
                 height="100vh"
                 extensions={[javascript({jsx:true})]}
                 theme={"dark"}
                 onChange={(value,viewUpdate)=>{
                    setHtml(value);
                 }}
                />
              </div>
            </div>

            {/* css */}
            <div className="w-full h-full flex flex-col items-start justify-start border-[1px] border-gray-400">
              <div className="flex w-full items-center justify-between">
                <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
                  <FaCss3 className="text-xl text-blue-500" />
                  <p className="text-primaryText font-semibold ">CSS</p>
                </div>
                <div className="cursor-pointer flex items-center justify-end gap-5 px-4">
                  <FcSettings className="text-xl" />
                  <FaCircleChevronDown className="text-xl text-primaryText" />
                </div>
              </div>
              <div className="w-full px-2">
                <CodeMirror 
                value={css}
                 height="100vh"
                 extensions={[javascript({jsx:true})]}
                 theme={"dark"}
                 onChange={(value,viewUpdate)=>{
                    setCss(value);
                 }}
                />
              </div>
            </div>

            {/* javascript */}
            <div className="w-full h-full flex flex-col items-start justify-start border-[1px] border-gray-400">
              <div className="flex w-full items-center justify-between">
                <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
                  <FaJs className="text-xl text-yellow-400" />
                  <p className="text-primaryText font-semibold ">JS</p>
                </div>
                <div className="cursor-pointer flex items-center justify-end gap-5 px-4">
                  <FcSettings className="text-xl" />
                  <FaCircleChevronDown className="text-xl text-primaryText" />
                </div>
              </div>
              <div className="w-full px-2">
                <CodeMirror 
                value={js}
                 height="100vh"
                 extensions={[javascript({jsx:true})]}
                 theme={"dark"}
                 onChange={(value,viewUpdate)=>{
                    setJs(value);
                 }}
                />
              </div>  
              

              </div>
              </SplitPane>

          <div className="bg-white"
            style={{overflow:"hidden" ,height:"100%"}}
          >
                 <iframe
                   title="Result"
                   srcDoc={result}
                   style={{border :"none", width:"100%", height:"100%"}}
                 >  
                 {result}
                 </iframe>
          </div>


          </SplitPane>

          </div>
        </div>
    </>
  );
}

export default NewProject;
