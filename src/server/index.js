"use strict";

const { PeerRPCServer } = require("grenache-nodejs-http");
const Link = require("grenache-nodejs-link");
const Orderbook = require("./orderbook");
const { REQUEST_TYPE } = require("./constants");

const link = new Link({
  grape: "http://127.0.0.1:30001",
});
link.start();

const peer = new PeerRPCServer(link, {
  timeout: 300000,
});
peer.init();

const port = 1024 + Math.floor(Math.random() * 1000);
const service = peer.transport("server");
service.listen(port);

setInterval(function () {
  link.announce("orderbook_service", service.port, {});
}, 1000);

// orderbook
const orderbook = new Orderbook();

service.on("request", (rid, key, payload, handler) => {
  switch (payload.type) {
    case REQUEST_TYPE.ADD_ORDER:
      orderbook.addOrder(payload.order);
      handler.reply(null, {
        response: ok,
      });
      break;
    case REQUEST_TYPE.CANCEL_ORDER:
      //TODO: Missing Implementation
      handler.reply(null, {
        response: ok,
      });
      break;
  }
});
