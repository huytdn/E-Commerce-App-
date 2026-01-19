import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } =
    useAppContext();

  if (!product) return null;

  return (
    <div
      className="
    group
    w-full
    border border-gray-200
    rounded-xl
    bg-white
    px-4
    py-5
    transition-all duration-300
    hover:-translate-y-2
    hover:shadow-lg
    mt-8
  "
      onClick={() => {
        navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
        scrollTo(0, 0);
      }}
    >
      {/* Image */}
      <div className="cursor-pointer flex items-center justify-center px-2 overflow-hidden rounded-lg">
        <img
          className="
            transition-transform duration-300
            group-hover:scale-110
            max-w-26 md:max-w-36
          "
          src={product.image[0]}
          alt={product.name}
        />
      </div>

      {/* Content */}
      <div className="text-gray-500/60 text-sm mt-3">
        <p>{product.category}</p>

        <p className="text-gray-700 font-medium text-lg truncate w-full mt-1">
          {product.name}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-0.5 mt-1">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <img
                key={i}
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                alt=""
                className="md:w-3.5 w-3"
              />
            ))}
          <p>(4)</p>
        </div>

        {/* Price + Action */}
        <div className="flex items-end justify-between mt-4">
          <p className="md:text-xl text-base font-medium text-primary">
            {currency}${product.offerPrice}{" "}
            <span className="text-gray-500/60 md:text-sm text-xs line-through ml-1">
              {currency}${product.price}
            </span>
          </p>

          {/* Cart Button */}
          <div className="text-primary" onClick={(e) => e.stopPropagation()}>
            {!cartItems[product._id] ? (
              <button
                onClick={() => addToCart(product._id)}
                className="
                  flex items-center justify-center gap-1
                  bg-primary/10
                  border border-primary/40
                  md:w-[80px] w-[64px]
                  h-[34px]
                  rounded-lg
                  text-sm
                  transition-all duration-300
                  group-hover:bg-primary
                  group-hover:text-white
                "
              >
                <img
                  src={assets.cart_icon}
                  alt="cart_icon"
                  className="group-hover:invert"
                />
                Add
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded-lg select-none">
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  -
                </button>
                <span className="w-5 text-center">
                  {cartItems[product._id]}
                </span>
                <button
                  onClick={() => addToCart(product._id)}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
