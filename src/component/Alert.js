import React,{useContext}from 'react'
import AlertContext from '../Context/Alert/AlertContext';

export default function Alert() {
      const context = useContext(AlertContext);
      const { alert } = context;
      return (
            <div>
                  {alert.state===true && <div className={`alert alert-${alert.type}`} role="alert">
                        <strong>{alert.message}</strong>
                  </div>}
            </div>
      )
}
