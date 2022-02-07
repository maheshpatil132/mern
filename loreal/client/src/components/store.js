
import {  createContext, useReducer } from "react";
export const Store = createContext()

export const StateProvider = ({reducer,children,initialValue}) =>(
   <Store.Provider value={useReducer(reducer, initialValue)}> 
     {children}
   </Store.Provider>
 );