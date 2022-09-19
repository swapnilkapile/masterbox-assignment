import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from "@mui/icons-material/Delete";

const InputBox = () => {
    const [numberLenght, setNumberLength] = useState();
    const [numberBox, setNumberBox] = useState([]);
    const [displayProp, setDisplayProp] = useState(true);
    const [total, setTotal] = useState([]);
    const [masterBox, setMasterBox] = useState(0);
    const [display, setDisplay] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        if (isNaN(value)) {
            setDisplayProp(true);
        } else if (value > 10) {
            setDisplayProp(true);
        } else {
            setDisplayProp(false);
            setNumberLength(value);
        }
    };

    const handleClick = () => {
        if (numberLenght > 0) {
            const generateArray = Array.from(Array(Number(numberLenght)).keys());
            setNumberBox([...numberBox, { box: generateArray }]);
            setTotal([...total, parseInt(numberLenght)]);
            setNumberLength("");
        }
    };
    console.log(total);

    const removeClick = (i) => {
        const data = numberBox.box.pop();
        const generateArray = Array.from(Array(Number(data)).keys());
        setNumberBox({ box: generateArray })
    };

    const handleEvolute = () => {
        const sum = total.reduce((partialSum, a) => partialSum + a, 0);
        setMasterBox(sum);
        setDisplay(true);
    };

    return (
        <div className='App' style={{height:"20px"}}>
            <input onChange={handleChange} maxLength={2} value={numberLenght} />
            <Button
                variant='contained'
                color="warning"
                disabled={displayProp}
                onClick={handleClick}
                style={{ marginLeft: "30px" }}>
                Create
            </Button>
            <div style={{position:"relative", display:"inline-flex"}}>
                <Button 
                    variant='contained'
                    onClick={handleEvolute}
                    style={{ marginLeft: "30px", marginTop: "10px" }}>
                    evolute
                </Button>
                </div>
                <br />
                {numberBox.map((val, i) => {
                    return (
                        <>
                            <h3> {i + 1} number Box </h3>
                            {val.box.map((v) => {
                                return (
                                    <>
                                        <input style={{
                                            width: "70px",
                                            height:"25px",
                                            margin: "8px",
                                        }} />
                                    </>
                                );
                            })}
                            {
                                <Button
                                    variant='contained'
                                    color="error"
                                    style={{
                                        cursor: "pointer",
                                        backgroundColor: "red",
                                        color: "white",
                                        borderRadius: "10px",
                                        width: "10px"
                                    }}
                                    onClick={() => removeClick(i)} >
                                    <DeleteIcon></DeleteIcon>
                                </Button>
                            }
                        </>
                    );
                })};
                {display && masterBox > 0 && <h3> Master Box Length is {masterBox}
                </h3>}
        </div>
    )
}

export default InputBox;