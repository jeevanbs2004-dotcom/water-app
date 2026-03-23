import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddWater() {
    const [quantity, setQuantity] = useState('');
    const [message, setMessage] = useState('');

    const user = useSelector(store => store.auth.user);
    const navigate = useNavigate();

    // ✅ PROTECT PAGE (only logged in users)
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    function addWater() {
        // ❌ prevent empty input
        if (!quantity || quantity <= 0) {
            setMessage("Enter valid quantity");
            return;
        }

        let data = JSON.parse(localStorage.getItem("water")) || [];

        let today = new Date().toISOString().split("T")[0];

        let exists = data.find(d => d.date === today);

        if (exists) {
            setMessage("Only one entry allowed per day");
            return;
        }

        data.push({
            quantity: Number(quantity),
            date: today,
            time: new Date().toLocaleTimeString()
        });

        localStorage.setItem("water", JSON.stringify(data));

        setMessage("Added successfully ✅");
        setQuantity(''); // ✅ clear input
    }

    return (
        <div className="container mt-3">
            <h2>Add Water</h2>

            {message && (
                <div className="alert alert-info">
                    {message}
                </div>
            )}

            <input
                type="number"
                className="form-control mb-2"
                value={quantity}
                placeholder="Enter quantity (L)"
                onChange={(e)=>setQuantity(e.target.value)}
            />

            <button className="btn btn-success" onClick={addWater}>
                Add
            </button>
        </div>
    );
}

export default AddWater;