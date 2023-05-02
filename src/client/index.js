'use strict'

const { PeerRPCClient }  = require('grenache-nodejs-ws');
const Link = require('grenache-nodejs-link');

const { submitOrder } = require('./order');
const Orderbook = require('./orderbook');

const link = new Link({
  grape: 'http://127.0.0.1:30001'
})
link.start()

const peer = new PeerRPCClient(link, {})
peer.init()

// orderbook
const orderbook = new Orderbook()

const order = orderbook.addOrder(100, 100, 'Ask');

orderbook.sendOrder(peer, order);