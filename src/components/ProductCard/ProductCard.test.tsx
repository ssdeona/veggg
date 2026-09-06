import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { renderWithMantine } from "../../test-utils";

import ProductCard from "./ProductCard";

import type { Product } from "../../types/product";

const product: Product = {
  id: 1,
  name: "Carrot",
  image: "carrot.png",
  price: 5,
  quantity: "1kg",
} as any;

describe("Карточка товара", () => {
  it("отображает информацию о товаре", () => {
    renderWithMantine(
      <ProductCard
        product={product}
        onAddToCart={vi.fn()}
      />
    );

    expect(screen.getByText("Carrot")).toBeInTheDocument();
    expect(screen.getByText(/\$\s*5/)).toBeInTheDocument();
  });

  it("увеличивает количество при нажатии на плюс", async () => {
    const user = userEvent.setup();

    renderWithMantine(
      <ProductCard
        product={product}
        onAddToCart={vi.fn()}
      />
    );

   
    const plusButton = screen.getByTestId("increase-btn");

    await user.click(plusButton);

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("не позволяет уменьшить количество меньше единицы", async () => {
    const user = userEvent.setup();

    renderWithMantine(
      <ProductCard
        product={product}
        onAddToCart={vi.fn()}
      />
    );

    
    const minusButton = screen.getByTestId("decrease-btn");

    await user.click(minusButton);

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("вызывает функцию добавления в корзину", async () => {
    const user = userEvent.setup();

    const onAddToCart = vi.fn();

    renderWithMantine(
      <ProductCard
        product={product}
        onAddToCart={onAddToCart}
      />
    );

    const button = screen.getByRole("button", {
      name: /add to cart/i,
    });

    await user.click(button);

    expect(onAddToCart).toHaveBeenCalledTimes(1);
    expect(onAddToCart).toHaveBeenCalledWith(product, 1);
  });

  it("передаёт выбранное количество в корзину", async () => {
    const user = userEvent.setup();

    const onAddToCart = vi.fn();

    renderWithMantine(
      <ProductCard
        product={product}
        onAddToCart={onAddToCart}
      />
    );

    const plusButton = screen.getByTestId("increase-btn");

    await user.click(plusButton);
    await user.click(plusButton);

    const addButton = screen.getByRole("button", {
      name: /add to cart/i,
    });

    await user.click(addButton);

    expect(onAddToCart).toHaveBeenCalledWith(product, 3);
  });
});