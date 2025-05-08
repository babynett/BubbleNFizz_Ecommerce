import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CustomTitle from "../../texts/CustomTitle";
import { api } from "../../config/api";
import CustomShoppingCard from "../../components/shopping/CustomShoppingCard";

const BubbleBathPage = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        api.get("shopping/getbathproducts")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);
    return (
        <div className="w-full">
            <div className="mx-10 my-12">
                <CustomTitle text={`Bubble Bath`} />
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5">
                    {products.map((item, index) => {
                        return (
                            <div className="col-span-1" key={index}>
                                <CustomShoppingCard
                                    title={item.product_details.product_name}
                                    price={item.product_details.product_price}
                                    rating={item.product_details.product_rating}
                                    scentName={
                                        item.product_details.product_scent_name
                                    }
                                    onClick={() =>
                                        (location.href = `/shopping/${item.id}`)
                                    }
                                    image={item.product_details.product_images}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default BubbleBathPage;

if (document.getElementById("BubbleBathPage")) {
    ReactDOM.render(
        <BubbleBathPage />,
        document.getElementById("BubbleBathPage")
    );
}
