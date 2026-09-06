import { Popover } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";

import type { CartItem } from "../../types/cart";
import Cart from "../Cart/Cart";
import logo from "../../assets/logo.png";
import "./Header.css";

interface HeaderProps {
  totalItems: number;
  totalPrice: number;
  cart: CartItem[];

  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
}

export default function Header({
  totalItems,
  totalPrice,
  cart,
  onIncrease,
  onDecrease,
}: HeaderProps) {
  return (
    <header className="header">
      <div className="container">
        <a href="#" className="logo">
          <img src={logo} alt="Vegetable Shop" />
        </a>

        <Popover
          width={380}
          shadow="lg"
          position="bottom-end"
        >
          <Popover.Target>
            <button className="cart-button">
              {totalItems > 0 && (
                <span className="cart-count">
                  {totalItems}
                </span>
              )}

              <span className="cart-text">
                Cart
              </span>

              <IconShoppingCart
                size={20}
                stroke={2}
              />
            </button>
          </Popover.Target>

          <Popover.Dropdown className="cart-dropdown">
            <Cart
              cart={cart}
              totalPrice={totalPrice}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
            />
          </Popover.Dropdown>
        </Popover>
      </div>
    </header>
  );
}