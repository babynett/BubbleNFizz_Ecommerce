import React, { useEffect, useState } from "react";
import { api } from "../../config/api";
import CustomTitle from "../../texts/CustomTitle";
import RecentProductCard from "../../cards/RecentProductCard";

const MyRecentProducts = ({ user }) => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        api.post("shopping/getrecentproducts", {
            user_id: user.id,
        })
            .then((response) => {
                // console.log(response.data);
                setProducts(response.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);
    return (
        <>
            <div className="grid grid-cols-1 gap-3">
                <CustomTitle text={`Recently Viewed Products`} />
                {products.length > 0 &&
                    products.map((item, index) => {
                        console.log(item)
                        return (
                            <div key={index} className="col-span-1">
                                <RecentProductCard
                                    product_id={item.product.id}
                                    product_name={item.product.product_name}
                                    product_image={item.product.product_image}
                                    product_price={item.product.product_price}
                                    product_scent={
                                        item.product.product_scent_name
                                    }
                                    darkMode={false}
                                />
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default MyRecentProducts;
