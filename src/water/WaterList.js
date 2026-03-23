import { useState, useEffect } from "react";

function WaterList() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);

    const [editIndex, setEditIndex] = useState(null);
    const [newQuantity, setNewQuantity] = useState('');

    const limit = 5;

    useEffect(() => {
        let stored = JSON.parse(localStorage.getItem("water")) || [];
        setData(stored);
    }, []);

    const start = (page - 1) * limit;
    const paginated = data.slice(start, start + limit);

    // ✅ DELETE FUNCTION
    function deleteItem(index) {
        let updated = [...data];
        updated.splice(index, 1);

        localStorage.setItem("water", JSON.stringify(updated));
        setData(updated);
    }

    // ✅ UPDATE FUNCTION
    function updateItem(index) {
        let updated = [...data];

        updated[index].quantity = newQuantity;

        localStorage.setItem("water", JSON.stringify(updated));
        setData(updated);

        setEditIndex(null);
        setNewQuantity('');
    }

    return (
        <div className="container">
            <h2>Water List</h2>

            {paginated.map((item, i) => {
                const index = (page - 1) * limit + i; // ✅ FIXED INDEX

                return (
                    <div key={index}>
                        {item.date} - 

                        {editIndex === index ? (
                            <>
                                <input
                                    value={newQuantity}
                                    onChange={(e)=>setNewQuantity(e.target.value)}
                                />
                                <button onClick={()=>updateItem(index)}>Save</button>
                            </>
                        ) : (
                            <>
                                {item.quantity}L - {item.time}

                                <button onClick={()=>setEditIndex(index)}>
                                    Edit
                                </button>

                                <button onClick={()=>deleteItem(index)}>
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                );
            })}

            <br />

            <button 
                disabled={page === 1}
                onClick={()=>setPage(page-1)}
            >
                Prev
            </button>

            <button 
                disabled={start + limit >= data.length}
                onClick={()=>setPage(page+1)}
            >
                Next
            </button>
        </div>
    );
}

export default WaterList;