import './App.css';
import HeaderTitle from './components/HeaderTitle';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useReducer} from 'react';
import login from './components/Login'

// interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
//   label: string
//   type: string 
// }

const Input  = ({label, type, ...props}) =>{
  return(
    <div>
      <label className="mb-3">{label}</label>
      <input
      {...props}
      type = {type}
      className="form-control"
      />
    </div>
  )
}


const reducer = (prev, action) => {
  switch(action.type){
    case 'field':
      return {
          ...prev,
          [action.field]: action.value
      }
    case 'error':
      return{
        ...prev,
        error: action.value
      }
    case 'login':
      return{
        ...prev,
        isLoggin: true
      }
    case 'logout':
      return{
        ...prev, 
        username: "",
        passsword: "",
        isLoggin: false
      }
  }
}

const initialState = {
  username: "",
  password: "",
  error: "", 
  isLoggin: false,
}

function App() {

  const [state, dispatch]= useReducer(reducer, initialState)

  const onLoggIn = (e) => {
    e.preventDefault();
    // console.log("OnLogin: ",state);
    try{
      dispatch({ type: 'error', value:''})
      login({ username: state.username , password: state.password});
      dispatch({type: 'login'})
    }
    catch(err){
      // console.log('Now it error', err)
      dispatch({ type: "error", value: "Invalid username or password."});
    }
  }

  if (state.isLoggin){
    return(
      <>
        <h1>Hello {state.username}</h1>
        <br/>
        <button 
          className="btn btn-danger" 
          style={{padding: "5px"}}
          onClick={() => dispatch({type:"logout"})}
          >Logout</button>
      </>
    )
  }

 
  return (
    <div className="App">
      <p style={{ margin:"auto", color: "red"}}>{state.error !== '' && state.error}</p>
      <form onSubmit={onLoggIn} style={{maxWidth: 345, margin:'auto'}}>
        <HeaderTitle nametitle="use-header"/>
        <Input 
          label= "Username"
          type="text"
          onChange = {e => dispatch({ type:'field', field: "username", value: e.target.value})}
          value={state.username}
        />
        <Input 
          label= "Password"
          type="password"
          onChange = {e => dispatch({ type:'field', field: "password", value: e.target.value})}
          value={state.password}
        />
        <div style={{padding: '20px'}}>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
