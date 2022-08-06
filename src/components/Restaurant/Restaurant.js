import React from 'react';
import { useState, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';

function Restaurant() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [restaurants, setRestaurants] = useState([]);
    const [title, setTitle] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [workTime, setWorkTime] = useState("");
    const [updateForm, setUpdateForm] = useState(false);
    const [restId, setRestId] = useState("");
    const [token, _] = useState(localStorage.getItem("token"));

    function createRest() {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('city', city);
        formData.append('address', address);
        formData.append('work_time', workTime);
        // fetch from heroku
         fetch("https://lara-restaurant-prepare.herokuapp.com/api/v1/restaurants", {
        // fetch while creating app
        // fetch("http://localhost/api/v1/restaurants", {
            method: 'POST',
            headers: { 'Accept': 'application/json', "Authorization": `Bearer ${token}` },
            body: formData
        });
    }

    function selectRest(id, e) {
        restaurants.map((r) => {
            if (r.id === id) {
                setRestId(r.id);
                setTitle(r.title);
                setCity(r.city);
                setAddress(r.address);
                setWorkTime(r.work_time);
            }
        })
        setUpdateForm(true);
    }
    function updateRest() {
        const formData = new FormData;
        formData.set("_method", "PUT");
        formData.set('title', title);
        formData.set('city', city);
        formData.set('address', address);
        formData.set('work_time', workTime);
        // fetch from heroku
          fetch("https://lara-restaurant-prepare.herokuapp.com/api/v1/restaurants/" + restId, {
        // fetch while creating app
        // fetch("http://localhost/api/v1/restaurants/" + restId, {
            method: 'POST',
            headers: { 'Accept': 'application/json', "Authorization": `Bearer ${token}` },
            body: formData
        })
    }
    function deleteRest(id, e) {
        // fetch from heroku
        fetch("https://lara-restaurant-prepare.herokuapp.com/api/v1/restaurants/" + id, 
        // fetch("http://localhost/api/v1/restaurants/" + id, 
        { method: 'DELETE', headers: { 'Accept': 'application/json', "Authorization": `Bearer ${token}` } })
            .then((response) => {
                if (response.status === 200) {
                    const remaining = restaurants.filter(r => id !== r.id)
                    setRestaurants(remaining)
                }
            });
    }

    useEffect(() => {
        // fetch from heroku
        fetch("https://lara-restaurant-prepare.herokuapp.com/api/v1/restaurants",
        // fetch while creating app
        // fetch("http://localhost/api/v1/restaurants",
         { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', "Authorization": `Bearer ${token}` } })
            .then(res => res.json())
            .then(
                (result) => {
                    // if(!result.ok) {
                    //     setError(result);
                    //     setIsLoaded(true);
                    // }
                    setRestaurants(result);
                    setIsLoaded(true);
                },
                (error) => { setError(error); setIsLoaded(true); })
    }, [])

    if (!isLoaded) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (
            <>
                <Link className="btn btn-success btn-lg d-block m-5" to="#create" role="button">Sukurti restoraną</Link>
                <div className="container card mt-3">
                    <table className="table m-3 table-responsive">
                        <thead>
                            <tr>
                                <th>Pavadinimas</th>
                                <th>Miestas</th>
                                <th>Adresas</th>
                                <th>Darbo laikas</th>
                                <th>Veiksmai</th>
                            </tr>
                        </thead>
                        <tbody>
                            {restaurants.map(restaurant => (
                                <tr key={restaurant.id}>
                                    <td>{restaurant.title}</td>
                                    <td>{restaurant.city}</td>
                                    <td>{restaurant.address}</td>
                                    <td>{restaurant.work_time}</td>
                                    <td className='d-grid gap-2 d-md-block'><button className="btn btn-success mx-1" onClick={(e) => selectRest(restaurant.id, e)}>Atnaujinti</button><button onClick={(e) => deleteRest(restaurant.id, e)} className="btn btn-dark">Ištrinti</button></td>
                                </tr>
                            )
                            )}
                        </tbody>
                    </table>
                    {!updateForm
                        ? <div id='create' className='card  mt-3 border-success'>
                            <h3 className='m-3 text-success text-center mt-5'> Sukurti restoraną</h3>
                            <form className='container'>
                                <div className="form-group">
                                    <input name='title' type="text" className="form-control m-1" placeholder='Pavadinimas' value={title} onChange={(e) => setTitle(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <input name='city' type="text" className="form-control m-1" placeholder='Miestas' value={city} onChange={(e) => setCity(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <input name='address' type="text" className="form-control m-1" placeholder='Adresas' value={address} onChange={(e) => setAddress(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <input name='workTime' type="text" className="form-control m-1" placeholder='Darbo laikas' value={workTime} onChange={(e) => setWorkTime(e.target.value)} required />
                                </div>
                                <button onClick={createRest} className='bg-success btn float-end text-light m-3'>Pridėti</button>
                            </form>
                        </div>
                        : <div className='card  mt-3 border-success'>
                            <h3 className='m-3 text-success text-center mt-5'> Pakeisti restoraną</h3>
                            <form className='container'>
                                <div className="form-group">
                                    <input name='title' type="text" className="form-control m-1" placeholder='Pavadinimas' value={title} onChange={(e) => setTitle(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <input name='city' type="text" className="form-control m-1" placeholder='Miestas' value={city} onChange={(e) => setCity(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <input name='address' type="text" className="form-control m-1" placeholder='Adresas' value={address} onChange={(e) => setAddress(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <input name='workTime' type="text" className="form-control m-1" placeholder='Darbo laikas' value={workTime} onChange={(e) => setWorkTime(e.target.value)} required />
                                </div>
                                <button onClick={(e) => setUpdateForm(false)} className='bg-dark btn float-end text-light m-3'>Atšaukti</button>
                                <button onClick={updateRest} className='bg-success btn float-end text-light m-3'>Pakeisti</button>
                            </form>
                        </div>}
                </div>
            </>
        );
    }
}

export default Restaurant;
