import React from 'react'

export function HomePage(){
    const test = async () =>{
        fetch('https://localhost:7069/weatherforecast')
            .then(res => console.log(res.json)
        )
    }
    return(
        <>
        <button onClick={test}>Press me</button>
        </>
    );
}