import React, { useState,useContext } from 'react'
import AlertContext from "./AlertContext";

export default function AlertState(props) {

      const[alert,setAlert]=useState({message:"",type:"",state:false})

      const showalert = (message,type)=>{
            setAlert({message:message,type:type,state:true})
            setInterval(() => {
                  setAlert({message:"",type:"",state:false})
            }, 3000);
      }

      return (
            <AlertContext.Provider value={{alert,showalert}}>
                  {props.children}
            </AlertContext.Provider>
      )
}

