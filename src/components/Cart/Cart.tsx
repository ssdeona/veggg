import {
  Divider,
  Group,
  Image,
  Stack,
  Text,
} from "@mantine/core";

import type { CartItem as CartItemType } from "../../types/cart";
import CartItem from "../CartItem/CartItem";
import emptyCartImg from "../../assets/cart_empty.png";
import "./Cart.css";

interface CartProps {
  cart: CartItemType[];
  totalPrice: number;

  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
}

export default function Cart({
  cart,
  totalPrice,
  onIncrease,
  onDecrease,
}: CartProps) {
  if (cart.length === 0) {
    return (
      <div className="empty-cart">
  <Image
    src={emptyCartImg}
    alt="Empty cart"
    className="empty-cart-image"
    data-testid="empty-cart-image" 
  />
  <Text className="empty-cart-text">Your cart is empty!</Text>
</div>
    );
  }

  return (
    <Stack gap={0} className="cart">
      {cart.map((item, index) => (
        <div key={item.id}>
          <CartItem
            item={item}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />

          {index !== cart.length - 1 && (
            <Divider className="cart-divider" />
          )}
        </div>
      ))}

      <Divider className="cart-divider" />

      <Group className="cart-total">
        <Text className="cart-total-label">
          Total
        </Text>

        <Text className="cart-total-price">
          ${totalPrice.toFixed(2)}
        </Text>
      </Group>
    </Stack>
  );
}