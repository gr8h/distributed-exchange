"use strict";

const { ORDER_TYPE, REQUEST_TYPE } = require("./constants");
const { v4: uuidv4 } = require('uuid');


class Orderbook {
  constructor() {
    this.orders = new Map();
  }

  addOrder(order_price, order_quantity, order_type) {
    if (order_type != ORDER_TYPE.ASK && order_type != ORDER_TYPE.BID) {
      return null;
    }

    const newOrder = {
      id: uuidv4(),
      type: order_type,
      price: order_price,
      quantity: order_quantity,
      timestamp: new Date().getTime(),
    };

    console.log(newOrder)

    this.orders.set(newOrder.id, newOrder);

    return newOrder
  }

  getOrders() {
    return this.orders;
  }

  sendOrder(peer, order) {
    peer.request(
      "orderbook_service",
      {
        type: REQUEST_TYPE.ADD_ORDER,
        order,
      },
      {
        timeout: 10000,
      },
      (err, data) => {
        if (err) {
          console.error("order error", err);
          return;
        }
        console.log("order added", data);
      }
    );
  }
}

module.exports = Orderbook;
