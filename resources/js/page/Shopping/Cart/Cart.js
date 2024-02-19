import React, { useEffect } from 'react'
import ReactDOM from 'react-dom';
import { api } from '../../../config/api';

const Cart = ({user}) => {
    const userObject = JSON.parse(user)

    useEffect(() => {
        api.get(`shopping/getusercart?user_id=${userObject.id}`)
            .then((response) => {
                console.log(response.data)
            })
            .catch(err => {
                console.log(err.response)
            })
    }, [])
    return (
        <div className="w-full px-12">
            <div className="my-8">
                <div className="text-2xl font-bold">My Cart</div>
            </div>
        </div>
    );
}

export default Cart;

if (document.getElementById('CartPage')) {
    const element = document.getElementById("CartPage");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(<Cart {...props} />, document.getElementById('CartPage'))
}