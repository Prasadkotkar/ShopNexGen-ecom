// Function to sum up the selling price of cart items
export const sumCartItemSellingPrice = (items) => {
    return items.reduce((acc, item) => {
        return item?.sellingPrice + acc;
    }, 0);
};

// Function to sum up the MRP price of cart items
export const sumCartItemMrpPrice = (items) => {
    return items.reduce((acc, item) => {
        return item?.mrpPrice + acc;
    }, 0);
};
