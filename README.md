# The BFX challenge Solution

## Requirement:
* Code in Javascript
* Use Grenache for communication between nodes
* Simple order matching engine
* You don't need to create a UI or HTTP API

## Implemented features
* Each client will have its own instance of the orderbook.
* Clients submit orders to their own instance of orderbook. The order is distributed to other instances, too.
* If a client's order matches with another order, any remainer is added to the orderbook, too.
* Race condition is handled by using of Javascript Promise

## Todo
* More test cases should be added, test sync functionality
* Enhance the matching engine currently it's O(n^2)
* Add support for multiple assests/pairs
* TypeScript, Linters ... etc