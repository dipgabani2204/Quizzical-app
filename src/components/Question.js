import React from "react";
import Option from "./Option"
import { nanoid } from 'nanoid'

export default function Question(props) {

        const [data, setData] = React.useState([
            {
                id: nanoid(),
                isSelected: false,
                opt: props.opt1
            },
            {
                id: nanoid(),
                isSelected: false,
                opt: props.opt2
            },
            {
                id: nanoid(),
                isSelected: false,
                opt: props.opt3
            },
            {
                id: nanoid(),
                isSelected: false,
                opt: props.opt4
            }
        ]);
    
    
    //whenever you want to change some data into array of object, don't use setData() directly...
    //make a shallow copy of data
    //then fetch that index for which object we want to make changes
    //after that fetch that object and store it to another variable
    //update the data into above created variable...
    //now, update this object into copyData
    //at last simply call the setData() and pass copyData...

    function changeSelect(ID) {
        
        let copyData = [...data]
        let index = 0;
        for (let i = 0; i < 4; i++) {
            if (data[i].id === ID) {
                index = i;
            }
        }
        
        let required_obj = { ...data[index] };
        required_obj.isSelected = !required_obj.isSelected;
        copyData[index] = required_obj;
        
        for (let i = 0; i < 4; i++) {
            if (i !== index) {
                copyData[i].isSelected = false;
            }
        }
        setData(copyData)
        sendUserAns(copyData)
    }
    
    function sendUserAns(data) {
        for(let i = 0; i<4; i++)
        {
            if(data[i].isSelected === true)
            {
                props.getUserAns(data[i].opt);
            }
        }
    }
    
    
    return (
        <div className="div-que" >
            <div className="que">
                <h5>{props.que}</h5>
            </div>

            <div className="div-opt" onClick={() => {}}>

                {data.map(option => {

                    return <Option
                        value={option.opt}
                        isSelected={option.isSelected}
                        changeSelect={changeSelect}
                        id={option.id}
                        key={option.id}
                        
                    />
                })}

            </div>
        </div>
    )
}
