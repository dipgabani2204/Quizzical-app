import React from "react";

export default function Option(props) {
    
    const styles = {
        backgroundColor: props.isSelected ?  "#D6DBF5" : "transparent"
    }

    return (
        <div className="options" onClick={() => props.changeSelect(props.id)} style={styles}>
            <h5>{props.value}</h5>
        </div>
    )
}