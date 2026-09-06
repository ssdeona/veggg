import { useState } from "react";
import { Card, Image } from "@mantine/core";
import { IconMinus, IconPlus, IconShoppingCart, IconCheck } from "@tabler/icons-react";

import type { Product } from "../../types/product";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, count: number) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [count, setCount] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  function increase() {
    setCount((prev) => prev + 1);
  }

  function decrease() {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  }

  function handleAddToCart() {
    onAddToCart(product, count);
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  }

  const nameParts = product.name.split(" - ");
  const productName = nameParts[0];
  const productWeight = nameParts.length > 1 ? nameParts[1] : "";

  return (
    <Card withBorder={false} shadow="none" className="product-card">
      
    
      <Image
        src={product.image}
        alt={product.name}
        className="product-card__image"
        fit="contain"
      />

      <div className="product-card__content">
        
       
        <div className="product-card__top">
          
          <div className="product-card__title">
            <h3 className="product-name">{productName}</h3>
            {productWeight && (
              <span className="product-card__title-span">{productWeight}</span>
            )}
          </div>

          <div className="counter">
           
            <button onClick={decrease} data-testid="decrease-btn">
              <IconMinus size={18} stroke={2} />
            </button>
            <span>{count}</span>
            <button onClick={increase} data-testid="increase-btn">
              <IconPlus size={18} stroke={2} />
            </button>
          </div>
        </div>

      
        <div className="product-card__bottom">
          <div className="price">$ {product.price}</div>

          <button 
            className={`cart-btn ${isAdding ? 'cart-btn-added' : ''}`}
            onClick={handleAddToCart}
          >
            {isAdding ? (
              <>
                Added!
                <IconCheck size={18} stroke={2} />
              </>
            ) : (
              <>
                Add to cart
                <IconShoppingCart size={18} stroke={2} />
              </>
            )}
          </button>
        </div>

      </div>
    </Card>
  );
}