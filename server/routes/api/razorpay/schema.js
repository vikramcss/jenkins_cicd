module.exports = schemas = {
  getPaymentId: {
    body: {
      type: 'object',
      properties: {
        amount: { type: 'string' },
      },
    }
  }
};