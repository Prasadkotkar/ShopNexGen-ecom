export function isWishlisted(wishlist, product) {
  return wishlist?.products.some((p) => p.id === product.id);
}
