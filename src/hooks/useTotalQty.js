import { useSelector } from "react-redux";

export function useTotalQty() {
  const cart = useSelector((state) => state.cart.items);
  return cart.reduce((acc, item) => acc + item.qty, 0);
}
