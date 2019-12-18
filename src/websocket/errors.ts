export const errNotInitialized = new Error(
  'Trading is not yet initialized. Did you wait for onReady()?'
);
export const errPlaceOrderBadResponse = new Error('place order failed: bad response');
export const errCancelOrderBadResponse = new Error('cancel order failed: bad response');

// Thrown when user calls send() or disconnect() before calling connect()
export const errConnNotReady = new Error(
  "Connection not ready. Did you forget to call 'connect()'?"
);
