export const initialValue = {
    user : null
}


export const Reducer = ( state = initialValue ,action)=>{
  
    switch(action.type){
        case 'Register' : return{
                    ...state,
              user : action.name
        }
        default : return state;
    }

}