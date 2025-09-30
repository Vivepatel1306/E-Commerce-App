import React, { useEffect, useRef, useState } from 'react'

function Check() {

    const [name, setName] = useState("Anurag");
    const [num, setNum] = useState(0);
    const lastName = useRef("pandey");
    let middleName = "kumar"
        console.log({ name }, { middleName },  lastName.current.value )

    const print = () => {
        console.log({ name }, { middleName },  lastName.current.value )
    }

    useEffect(()=>{

        // setNum(num + 1);
        setNum((num) => num+1)
        setNum((num) => num+1)
    },[])

    console.log(num);
    return (
        <div>
            <input type='text' placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
            <br />
            {/* <input type='text' placeholder='middleName' value={middleName} onChange={(e) => middleName = e.target.value} /> */}
            <br />
            <input type='text' placeholder='lastName'  ref={lastName} />
            <br />        <br />
            <button onClick={print}>print</button>
        </div>
    )
}

export default Check