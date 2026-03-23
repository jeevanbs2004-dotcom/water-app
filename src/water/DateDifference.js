import { useState } from "react";

function DateDifference() {
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [result, setResult] = useState(0);

    function calculate() {
        let data = JSON.parse(localStorage.getItem("water")) || [];

        let filtered = data.filter(d =>
            d.date >= start && d.date <= end
        );

        let total = filtered.reduce((sum, d) => sum + Number(d.quantity), 0);

        setResult(total);
    }

    return (
        <div className="container">
            <h2>Difference</h2>

            <input type="date" onChange={(e)=>setStart(e.target.value)} />
            <input type="date" onChange={(e)=>setEnd(e.target.value)} />

            <button onClick={calculate}>Check</button>

            <p>Total Intake: {result}L</p>
        </div>
    );
}

export default DateDifference;