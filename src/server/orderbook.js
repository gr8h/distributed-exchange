const { ORDER_TYPE } = require("./constants");

class Orderbook {
  constructor() {
    this.orders = new Map();
    this.lock = Promise.resolve();
  }

  getBids() {
    return Array.from(this.orders.values()).filter(
      (order) => order.type === ORDER_TYPE.BID
    );
  }

  getAsks() {
    return Array.from(this.orders.values()).filter(
      (order) => order.type === ORDER_TYPE.ASK
    );
  }

  async addOrder(order) {
    await this.lock;
    this.lock = new Promise((resolve) => {
      this.orders.set(order.id, order);
      console.log(`New ${order.type} Order added with Id: ${order.id}`);
      this.matchOrders();
      resolve();
    });
  }

  matchOrders() {
    const bids = this.getBids().sort((a, b) => b.price - a.price);
    const asks = this.getAsks().sort((a, b) => a.price - b.price);
    const matchedOrders = [];

    for (let i = 0; i < bids.length; i++) {
      const bid = bids[i];
      for (let j = 0; j < asks.length; j++) {
        const ask = asks[j];
        if (bid.price >= ask.price) {
          const quantity = Math.min(bid.quantity, ask.quantity);
          const matchedOrder = { bid, ask, quantity };
          matchedOrders.push(matchedOrder);
          bid.quantity -= quantity;
          ask.quantity -= quantity;
          if (bid.quantity === 0) {
            bids.splice(i, 1);
            i--;
          }
          if (ask.quantity === 0) {
            asks.splice(j, 1);
            j--;
          }
          if (i >= bids.length || j >= asks.length) {
            break;
          }
        }
      }
    }

    matchedOrders.forEach(({ bid, ask, quantity }) => {
      // execute the trade
      console.log(
        `Matched order: bid ${bid.id} (${bid.price}, ${bid.quantity}) - ask ${ask.id} (${ask.price}, ${ask.quantity})`
      );
      console.log(`Executed quantity: ${quantity}`);

      // remove the matched orders from the order book
      if (bid.quantity == 0) {
        this.orders.delete(bid.id);
      }
      if (ask.quantity == 0) {
        this.orders.delete(ask.id);
      }
    });
  }
}

module.exports = Orderbook;
