const Orderbook = require('../orderbook');
const { ORDER_TYPE, REQUEST_TYPE } = require('../constants');


describe('Orderbook', () => {
  let orderbook;
  beforeEach(() => {
    orderbook = new Orderbook();
  });

  it('should add new orders to the orderbook', () => {
    const orderPrice = 100;
    const orderQuantity = 10;
    const orderType = ORDER_TYPE.ASK;

    orderbook.addOrder(orderPrice, orderQuantity, orderType);

    expect(orderbook.getOrders().size).toBe(1);
  });

  it('should not add invalid orders to the orderbook', () => {
    const orderPrice = 100;
    const orderQuantity = 10;
    const orderType = 'invalid_type';
    orderbook.addOrder(orderPrice, orderQuantity, orderType);
    expect(orderbook.getOrders().size).toBe(0);
  });

  it('should send order to peer', () => {

    let mockPeerRPCClient = new PeerRPCClient();

    const order = {
      id: '123',
      type: 'ASK',
      price: 100,
      quantity: 10,
      timestamp: new Date().getTime(),
    };
    orderbook.sendOrder(mockPeerRPCClient, order);
    expect(mockPeerRPCClient.request).toHaveBeenCalled();
  });
});
