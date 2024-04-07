import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CustomTitle from "../../texts/CustomTitle";
import { api } from "../../config/api";
import CustomShoppingCard from "../../components/shopping/CustomShoppingCard";
import ProductSideBar from "./ProductSidebar/ProductSideBar";

const AllProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [sort, setSort] = useState("");
    const [active, setActive] = useState('%%')

    useEffect(() => {
        api.get(`shopping/getpaymentproduct?category=${active}&sort=${sort}`)
            .then((response) => {
                setProducts(response.data);
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err.response);
            });
        console.log(sort);
    }, [active]);

    const options = ["Highest Price", "Lowest Price"];

    return (
        <div className="w-full">
            <div className="mx-10 my-12">
                        {/* <CustomTitle
                            text={"All Products"}
                            options={options}
                            hasButton
                            setSort={setSort}
                            sort={sort}
                        /> */}
                        <CustomTitle
                            text={"All Products"}
                        />
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-3">
                        <ProductSideBar active={active} setActive={setActive} />
                    </div>
                    <div className="col-span-9">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {products.map((item, index) => {
                                return (
                                    <div className="col-span-1" key={index}>
                                        <CustomShoppingCard
                                            title={String(item.product_details.product_name).replace('Bubble N Fizz', '')}
                                            price={item.product_details.product_price}
                                            rating={item.product_details.product_rating}
                                            scentName={item.product_details.product_scent_name}
                                            onClick={() =>
                                                (location.href = `/shopping/${item.product_details.id}`)
                                            }
                                            sales={item.product_sales}
                                    image={item.product_details.product_images}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
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
