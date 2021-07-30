import React from 'react'; 

const HeaderTitle = (props) => {
    const headerElement = "UseReducer"
    return (
        <div id={props.nametitle}>
            <h3 id={props.nametitle}>{headerElement}</h3>
        </div>
    )
}

export default HeaderTitle; 