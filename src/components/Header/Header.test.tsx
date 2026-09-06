import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { renderWithMantine } from "../../test-utils";

import Header from "./Header";

import type { CartItem } from "../../types/cart";

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

describe("Шапка сайта", () => {
  it("отображает общее количество товаров", () => {
    renderWithMantine(
      <Header
        totalItems={3}
        totalPrice={14}
        cart={cart}
        onIncrease={vi.fn()}
        onDecrease={vi.fn()}
      />
    );

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("отображает кнопку корзины с текстом Cart", () => {
    renderWithMantine(
      <Header
        totalItems={3}
        totalPrice={14}
        cart={cart}
        onIncrease={vi.fn()}
        onDecrease={vi.fn()}
      />
    );

    expect(screen.getByText("Cart")).toBeInTheDocument();
  });
});