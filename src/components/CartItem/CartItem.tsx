import {
  ActionIcon,
  Group,
  Image,
  Stack,
  Text,
} from "@mantine/core";

import {
  IconMinus,
  IconPlus,
} from "@tabler/icons-react";

import type { CartItem } from "../../types/cart";

import "./CartItem.css";

interface Props {
  item: CartItem;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
}

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
}: Props) {
  const nameParts = item.name.split(" - ");

  const productName = nameParts[0];
  const productWeight =
    nameParts.length > 1 ? nameParts[1] : item.quantity;

  return (
    <Group
      justify="space-between"
      align="center"
      className="cart-item"
      wrap="nowrap"
    >
      <Group gap="md" wrap="nowrap">
        <Image
          src={item.image}
          w={60}
          h={60}
          fit="contain"
          alt={productName}
        />

        <Stack gap={2}>
          <Group gap={5}>
            <Text className="cart-item-name">
              {productName}
            </Text>

            <Text className="cart-item-weight">
              {productWeight}
            </Text>
          </Group>

          <Text className="cart-item-price">
            ${item.price}
          </Text>
        </Stack>
      </Group>

      <Group gap={8} wrap="nowrap">
        <ActionIcon
          className="cart-counter-btn"
          onClick={() => onDecrease(item.id)}
        >
          <IconMinus size={16} />
        </ActionIcon>

        <Text className="cart-count">
          {item.count}
        </Text>

        <ActionIcon
          className="cart-counter-btn"
          onClick={() => onIncrease(item.id)}
        >
          <IconPlus size={16} />
        </ActionIcon>
      </Group>
    </Group>
  );
}