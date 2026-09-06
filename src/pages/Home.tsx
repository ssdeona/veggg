import { useEffect } from 'react';
import { Container, Title, SimpleGrid } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts } from '../store/productsSlice';
import { addToCart, increaseItem, decreaseItem } from '../store/cartSlice';
import Header from '../components/Header/Header';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import AppLoader from '../components/Loader/Loader';
import type { Product } from '../types/product';

export default function Home() {
  const dispatch = useAppDispatch();
  const { items: products, loading } = useAppSelector((state) => state.products);
  const cartItems = useAppSelector((state) => state.cart.items);
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.count * item.price, 0);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product: Product, count: number) => {
    dispatch(addToCart({ product, count }));
  };

  return (
    <>
      <Header
        totalItems={totalItems}
        totalPrice={totalPrice}
        cart={cartItems}
        onIncrease={(id) => dispatch(increaseItem(id))}
        onDecrease={(id) => dispatch(decreaseItem(id))}
      />
      <Container size="xl" py="xl">
        <Title mb="xl">Catalog</Title>
        {loading ? (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
            {Array.from({ length: 8 }).map((_, index) => (
              <AppLoader key={index} />
            ))}
          </SimpleGrid>
        ) : (
          <ProductGrid products={products} onAddToCart={handleAddToCart} />
        )}
      </Container>
    </>
  );
}