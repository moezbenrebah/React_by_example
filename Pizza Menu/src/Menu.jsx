import Pizza from "./Pizza";
import { useEffect, useState } from "react";

export default function Menu () {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("src/pizza_data.json")
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.error('Error fetching data:', err));
    }, [])

    return (
        <main className="menu">
            <p>
                Authentic Italian cuisie. 6 creative dishes to choose from. All from our stone oven, all organic, all delicious.
            </p>
            <h2>our menu</h2>
            <ul className="pizzas">
                {
                    data.length > 0 ? (
                        data.map((item, index) => <Pizza key={index} pizzaObj={item}/>)
                    ) : (
                        <div>Loading...</div>
                    )
                }
            </ul>
        </main>
    )
}