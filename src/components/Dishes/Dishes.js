import React, { useEffect, useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import './Dishes.css';

function Dishes() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dishes, setDishes] = useState([]);
  const [updateForm, setUpdateForm] = useState(false);
  const [dishId, setDishId] = useState("");
  const [token, _] = useState(localStorage.getItem("token"));

  function createDish() {
    console.warn(title, price, file, restaurant);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('file', file);
    formData.append('restaurant_id', restaurant);

    // fetch from heroku
    fetch("https://lara-restaurant-prepare.herokuapp.com/api/v1/dishes", {

    // fetch while creating project
    // fetch("http://localhost/api/v1/dishes", {
      method: 'POST',
      headers:{ 'Accept': 'application/json', "Authorization": `Bearer ${token}` },
      body: formData
    });
  }

  function selectDish(id, e) {
    console.warn(title, price, file, restaurant);
    dishes.map((d) => {
      if (d.id === id) {
        setDishId(d.id);
        setTitle(d.title);
        setPrice(d.price);
        setFile(d.file);
        setRestaurant((d.restaurant === null) ? " " : d.restaurant_id);
        console.log(restaurant);
      }
    })
    setUpdateForm(true);
  }

  function changeDish() {
    const formData = new FormData;
    formData.set("_method", "PUT");
    formData.set('title', title);
    formData.set('price', price);
    formData.set('file', file);
    formData.set('restaurant_id', restaurant);
    // fetch from heroku
    fetch("https://lara-restaurant-prepare.herokuapp.com/api/v1/dishes/" + dishId, {
    // fetch while creating app
    // fetch("http://localhost/api/v1/dishes/" + dishId, {
      method: 'POST',
      headers:{ 'Accept': 'application/json', "Authorization": `Bearer ${token}` },
      body: formData
    })
  }

  function deleteDish(id, e) {
    // fetch from heroku
     fetch("https://lara-restaurant-prepare.herokuapp.com/api/v1/dishes/" + id, { method: 'DELETE',

    // fetch while creating project
    // fetch("http://localhost/api/v1/dishes/" + id, { method: 'DELETE',
     headers:{ 'Accept': 'application/json', "Authorization": `Bearer ${token}` } })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          const remaining = dishes.filter(r => id !== r.id)
          setDishes(remaining)
        }
      });
  }

  useEffect(() => {
    // fetch from heroku
     fetch("https://lara-restaurant-prepare.herokuapp.com/api/v1/restaurants",

    // fetch while creating app
    // fetch("http://localhost/api/v1/restaurants",
     {headers: {'Content-Type':'application/json', 'Accept': 'application/json', "Authorization": `Bearer ${token}`}})
      .then(res => res.json())
      .then(
        (result) => {
          setRestaurants(result); setIsLoaded(true);
        },
        (error) => { setError(error); setIsLoaded(true); })
  }, [])

  useEffect(() => {
    // fetch from heroku
    fetch("https://lara-restaurant-prepare.herokuapp.com/api/v1/dishes",
    // fetch while creating app
    // fetch("http://localhost/api/v1/dishes",
    {headers: {'Content-Type':'application/json', 'Accept': 'application/json', "Authorization": `Bearer ${token}`}})
      .then(res => res.json())
      .then(
        (result) => {
        //   if(!result.ok) {
        //     setError(result);
        //     setIsLoaded(true);
        // }
          console.log(result); // <--- check this out in the console
          setDishes(result); setIsLoaded(true);
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
        <Link className="btn btn-success btn-lg d-block m-5" to="#create" role="button">Sukurti patiekalą</Link>
        <div className="container card mt-3">
          <table className="table">
            <thead>
              <tr>
                <th>Pavadinimas</th>
                <th>Kaina</th>
                <th>Nuotrauka</th>
                <th>Restoranas</th>
                <th>Veiksmai</th>
              </tr>
            </thead>
            <tbody>
              {dishes.map(dish =>
              (
                <tr key={dish.id}>
                  <td>{dish.title}</td>
                  <td>{dish.price}</td>
                  <td><img style={{ width: "150px", height: "150px", objectFit: "cover" }} src={'../' + dish.file} /></td>
                  {dish.restaurant !== null ? (<td>{dish.restaurant.title}</td>) : (<td></td>)}
                  <td>
                    <div className='d-grid gap-2 d-md-block'><Link to='#update' ><button onClick={(e) => selectDish(dish.id, e)} className="btn btn-success mx-1">Atnaujinti</button></Link><button onClick={(e) => deleteDish(dish.id, e)} className="btn btn-dark">Ištrinti</button></div></td>

                </tr>
              )
              )}
            </tbody>
          </table>
          {!updateForm
            ? <div id='create' className='card  mt-3 border-success'>
              <h3 className='m-3 text-success text-center mt-5'> Sukurti patiekalą</h3>
              <form className='container'>
                <div className="form-group">
                  <input type="text" className="form-control m-1" placeholder='Pavadinimas' value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control m-1" placeholder='Kaina' value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>  <div className="form-group">
                  <label htmlFor="formFile" className="form-label my-3">Įkelti patiekalo nuotrauką</label>
                  <input type="file" className=" m-1" placeholder='Patiekalo nuotrauka' name='file' onChange={(e) => setFile(e.target.files[0])} />
                </div>  <div className="form-group">
                  <label className='my-3'>Priskirti patiekalą restoranui:</label>
                  <select className='form-select dish' value={restaurant} onChange={(e) => setRestaurant(e.target.value)}>
                    {restaurants.map(restaurant => (
                      <option key={restaurant.id} value={restaurant.id} >{restaurant.title}</option>
                    )
                    )}
                    <option value={""}>--Nepriklauso jokiam restoranui--</option>
                  </select>
                </div>
                <button onClick={createDish} className='bg-success btn float-end text-light m-3'>Pridėti</button>
              </form>
            </div>
            : <div id='update' className='card  mt-3 border-success'>
              <h3 className='m-3 text-success text-center mt-5'> Pakeisti patiekalą</h3>
              <form className='container'>
                <div className="form-group">
                  <input type="text" className="form-control m-1" placeholder='Pavadinimas' value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control m-1" placeholder='Kaina' value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>  <div className="form-group">
                  <label htmlFor="formFile" className="form-label my-3">Atnaujinti patiekalo nuotrauką</label>
                  <input type="file" className=" m-1" placeholder='Patiekalo nuotrauka' name='file' onChange={(e) => setFile(e.target.files[0])} required />
                </div>  <div className="form-group">
                  <label className='my-3'>Priskirti patiekalą restoranui:</label>
                  <select className='form-select dish' value={restaurant} onChange={(e) => setRestaurant(e.target.value)}>
                    <option value={""}>--Nepriklauso jokiam restoranui--</option>
                    {restaurants.map(restaurant => (
                      <option key={restaurant.id} value={restaurant.id} >{restaurant.title}</option>
                    )
                    )}
                  </select>
                </div><button onClick={(e) => setUpdateForm(false)} className='bg-dark btn float-end text-light m-3'>Atšaukti</button>
                <button onClick={changeDish} className='bg-success btn float-end text-light m-3'>Pakeisti</button>
              </form>
            </div>}
        </div>
      </>
    );
  }
}

export default Dishes;
