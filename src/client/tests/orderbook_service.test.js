const Orderbook = require("../orderbook");
const { ORDER_TYPE, REQUEST_TYPE } = require("../constants");
const { PeerRPCClient } = require("grenache-nodejs-ws");

// Mock PeerRPCClient class
jest.mock("grenache-nodejs-ws", () => {
  const mockPeerRPCClient = {
    request: jest.fn(),
  };
  return {
    PeerRPCClient: jest.fn(() => mockPeerRPCClient),
  };
});

describe("Orderbook", () => {
  let orderbook;
  beforeEach(() => {
    orderbook = new Orderbook();
  });

  it("should send order to peer", () => {
    let mockPeerRPCClient = new PeerRPCClient();

    const order = {
      id: "123",
      type: "ASK",
      price: 100,
      quantity: 10,
      timestamp: new Date().getTime(),
    };
    orderbook.sendOrder(mockPeerRPCClient, order);
    expect(mockPeerRPCClient.request).toHaveBeenCalled();
  });
});
