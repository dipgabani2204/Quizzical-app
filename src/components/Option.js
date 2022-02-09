import React from "react";

export default function Option(props) {
    
    const styles = {
        backgroundColor: props.showBgColor ? (props.isSelected ? (props.isTrue ? "#94D7A2" : "#F8BCBC"): "transperant") : (props.isSelected? "#D6DBF5" : "transparent"),
    }

    return (
        <div className="options" onClick={() => props.changeSelect(props.id)} style={styles}>
            <h5>{props.value}</h5>
        </div>
    )
}
