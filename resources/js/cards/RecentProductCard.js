import React from "react";

const RecentProductCard = ({
    product_id,
    product_name,
    product_scent,
    product_price,
    darkMode = true,
}) => {
    return (
        <div className="bg-transparent grid grid-cols-12 gap-6" onClick={() => location.href = `/shopping/${product_id}`}>
            <div className="col-span-3">
                <div className="flex justify-center items-center h-full">
                    <img
                        src={`https://picsum.photos/500/300`}
                        height={300}
                        width={500}
                    />
                </div>
            </div>
            <div className="col-span-6 h-full flex flex-col justify-between">
                <div
                    className={`text-lg ${
                        darkMode ? "text-white" : "text-black"
                    }`}
                >
                    {product_name} ({product_scent})
                </div>
            </div>
            <div className="col-span-3">
                <div className="flex justify-center items-center h-full">
                    <div
                        className={`text-lg ${
                            darkMode ? "text-white" : "text-black"
                        } font-bold`}
                    >
                        ₱{product_price}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentProductCard;
