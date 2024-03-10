import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CustomTitle from "../../texts/CustomTitle";
import { api } from "../../config/api";
import CustomShoppingCard from "../../components/shopping/CustomShoppingCard";

const AllProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [sort, setSort] = useState('')

    useEffect(() => {
        api.get(`shopping/getallproducts?sort=${sort}`)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
            console.log(sort)
    }, [sort]);

    const options = ['Highest Price', 'Lowest Price']

    return (
        <div className="w-full">
            <div className="mx-10 my-12">
                <CustomTitle text={"All Products"} options={options} hasButton setSort={setSort} sort={sort} />
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                    {products.map((item, index) => {
                        return (
                            <div className="col-span-1" key={index}>
                                <CustomShoppingCard
                                    title={item.product_name}
                                    price={item.product_price}
                                    rating={item.product_rating}
                                    scentName={item.product_scent_name}
                                    onClick={() =>
                                        location.href = `/shopping/${item.id}`
                                    }
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AllProductsPage;

if (document.getElementById("AllProducts")) {
    ReactDOM.render(
        <AllProductsPage />,
        document.getElementById("AllProducts")
    );
}
