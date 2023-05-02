const Orderbook = require("../orderbook");
const { ORDER_TYPE } = require("../constants");

describe("Orderbook", () => {
  let orderbook;

  beforeEach(() => {
    orderbook = new Orderbook();
  });

  test("adds and matches orders correctly", async () => {
    // add some orders to the orderbook
    await orderbook.addOrder({
      id: 1,
      type: ORDER_TYPE.BID,
      price: 10,
      quantity: 5,
    });
    await orderbook.addOrder({
      id: 2,
      type: ORDER_TYPE.BID,
      price: 9,
      quantity: 3,
    });
    await orderbook.addOrder({
      id: 3,
      type: ORDER_TYPE.ASK,
      price: 8,
      quantity: 4,
    });
    await orderbook.addOrder({
      id: 4,
      type: ORDER_TYPE.ASK,
      price: 11,
      quantity: 2,
    });

    // the orders should be added to the orderbook
    // the orders should be affected by the matchOrder function
    expect(orderbook.orders.size).toBe(3);
  });

  test("handles concurrent access correctly", async () => {
    // add two orders concurrently
    const addOrder1 = orderbook.addOrder({
      id: 1,
      type: ORDER_TYPE.BID,
      price: 10,
      quantity: 5,
    });
    const addOrder2 = orderbook.addOrder({
      id: 2,
      type: ORDER_TYPE.ASK,
      price: 8,
      quantity: 4,
    });
    await Promise.all([addOrder1, addOrder2]);

    // the orders should be added to the orderbook
    expect(orderbook.orders.size).toBe(1);
  });
});
