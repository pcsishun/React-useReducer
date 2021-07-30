import React from 'react'; 


const login = ({username, password}) => {
    if (username === "Admin" && password === "abc"){
        return;
    }
    throw Error ('Invalid username or password.')
}

export default login;