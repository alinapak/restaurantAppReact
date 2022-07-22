import React, { useEffect, useState } from 'react';
import './Dishes.css';

function Dishes() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dishes, setDishes] = useState([]);
  const [updateForm, setUpdateForm] = useState(false);
  const [dishId, setDishId] = useState("");

  function createDish() {
    console.warn(title, price, image, restaurant);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('image', image);
    formData.append('restaurant_id', restaurant);
    fetch("http://localhost/api/v1/dishes", {
      method: 'POST',
      body: formData
    });
  }

  function selectDish(id, e) {
    dishes.map((d) => {
      if (d.id === id) {
        setDishId(d.id);
        setTitle(d.title);
        setPrice(d.price);
        setImage(d.image);
        setRestaurant((d.restaurant === null) ? " " : d.restaurant_id)
      }
    })
    setUpdateForm(true);
  }

  function changeDish() {
    const formData = new FormData;
    formData.set("_method", "PUT");
    formData.set('title', title);
    formData.set('price', price);
    formData.set('image', image);
    formData.set('restaurant_id', restaurant);
    fetch("http://localhost/api/v1/dishes/" + dishId, {
      method: 'POST',
      body: formData
    })
  }

  function deleteDish(id, e) {
    fetch("http://localhost/api/v1/dishes/" + id, { method: 'DELETE' })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          const remaining = dishes.filter(r => id !== r.id)
          setDishes(remaining)
        }
      });
  }

  useEffect(() => {
    fetch("http://localhost/api/v1/dishes")
      .then(res => res.json())
      .then(
        (result) => {
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
                <td><img style={{width:"150px", height:"150px", objectFit:"cover"}} src={dish.image} /></td>
                {dish.restaurant !== null ? (<td>{dish.restaurant.title}</td>) : (<td></td>)}
                <td>
                  <div className='d-grid gap-2 d-md-block'><button onClick={(e) => selectDish(dish.id, e)} className="btn btn-success mx-1">Atnaujinti</button><button onClick={(e) => deleteDish(dish.id, e)} className="btn btn-dark">Ištrinti</button></div></td>
                  
              </tr>
              )
            )}
          </tbody>
        </table>
        {!updateForm
          ? <div className='card  mt-3 border-success'>
            <h3 className='m-3 text-success text-center mt-5'> Pridėti patiekalą</h3>
            <form className='container'>
              <div className="form-group">
                <input type="text" className="form-control m-1" placeholder='Pavadinimas' value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="form-group">
                <input type="text" className="form-control m-1" placeholder='Kaina' value={price} onChange={(e) => setPrice(e.target.value)} required />
              </div>  <div className="form-group">
                <input type="text" className="form-control m-1" placeholder='Patiekalo nuotrauka' value={image} onChange={(e) => setImage(e.target.value)} required />
              </div>  <div className="form-group">
                {/* TODO: dropdown */}
                <input type="text" className="form-control m-1" placeholder='Kur rasti' value={restaurant} onChange={(e) => setRestaurant(e.target.value)} />
              </div>
              <button onClick={createDish} className='bg-success btn float-end text-light m-3'>Pridėti</button>
            </form>
          </div>
          : <div className='card  mt-3 border-success'>
            <h3 className='m-3 text-success text-center mt-5'> Pakeisti patiekalą</h3>
            <form className='container'>
              <div className="form-group">
                <input type="text" className="form-control m-1" placeholder='Pavadinimas' value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="form-group">
                <input type="text" className="form-control m-1" placeholder='Kaina' value={price} onChange={(e) => setPrice(e.target.value)} required />
              </div>  <div className="form-group">
                <input type="text" className="form-control m-1" placeholder='Patiekalo nuotrauka' value={image} onChange={(e) => setImage(e.target.value)} required />
              </div>  <div className="form-group">
                {/* TODO: dropdown */}
                <input type="text" className="form-control m-1" placeholder='Kur rasti' value={restaurant} onChange={(e) => setRestaurant(e.target.value)} />
              </div><button onClick={(e) => setUpdateForm(false)} className='bg-dark btn float-end text-light m-3'>Atšaukti</button>
              <button onClick={changeDish} className='bg-success btn float-end text-light m-3'>Pakeisti</button>
            </form>
          </div>}
      </div>
    );
  }
}

export default Dishes;
