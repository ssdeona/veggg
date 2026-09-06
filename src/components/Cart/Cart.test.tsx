import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { renderWithMantine } from "../../test-utils";

import Cart from "./Cart";

import type { CartItem } from "../../types/cart";

vi.mock("./CartItem", () => ({
  default: ({ item }: { item: CartItem }) => (
    <div>{item.name}</div>
  ),
}));

const cart: CartItem[] = [
  {
    id: 1,
    name: "Carrot",
    image: "carrot.png",
    price: 5,
    quantity: "1kg",
    count: 2,
  },
  {
    id: 2,
    name: "Potato",
    image: "potato.png",
    price: 4,
    quantity: "2kg",
    count: 1,
  },
] as any;

describe("Корзина", () => {
  it("отображает список товаров", () => {
    renderWithMantine(
      <Cart
        cart={cart}
        totalPrice={14}
        onIncrease={vi.fn()}
        onDecrease={vi.fn()}
      />
    );

    expect(screen.getByText("Carrot")).toBeInTheDocument();
    expect(screen.getByText("Potato")).toBeInTheDocument();
  });

  it("отображает итоговую сумму", () => {
    renderWithMantine(
      <Cart
        cart={cart}
        totalPrice={14}
        onIncrease={vi.fn()}
        onDecrease={vi.fn()}
      />
    );

    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText(/\$\s*14\.00/)).toBeInTheDocument();
  });

  it("отображает пустую корзину с картинкой", () => {
    renderWithMantine(
      <Cart
        cart={[]}
        totalPrice={0}
        onIncrease={vi.fn()}
        onDecrease={vi.fn()}
      />
    );

    
    expect(screen.getByTestId("empty-cart-image")).toBeInTheDocument();
    

    expect(screen.getByText("Your cart is empty!")).toBeInTheDocument();
  });
});