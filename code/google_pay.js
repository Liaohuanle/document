function GooglePay(){
  return this
}

GooglePay.prototype.init = function(loadCB){
  console.info('hello is init')
  /**
   * Payment methods accepted by your gateway
   *
   * @todo confirm support for both payment methods with your gateway
   */
  this.allowedPaymentMethods = ['CARD', 'TOKENIZED_CARD'];
  
  /**
   * Card networks supported by your site and your gateway
   *
   * @see {@link https://developers.google.com/pay/api/web/reference/object#CardRequirements|CardRequirements}
   * @todo confirm card networks supported by your site and gateway
   */
  this.allowedCardNetworks = ['AMEX', 'DISCOVER', 'JCB', 'MASTERCARD', 'VISA'];
  
  /**
   * Identify your gateway and your site's gateway merchant identifier
   *
   * The Google Pay API response will return an encrypted payment method capable of
   * being charged by a supported gateway after shopper authorization
   *
   * @todo check with your gateway on the parameters to pass
   * @see {@link https://developers.google.com/pay/api/web/reference/object#Gateway|PaymentMethodTokenizationParameters}
   */
  this.tokenizationParameters = {
    tokenizationType: 'PAYMENT_GATEWAY',
    parameters: {
      'gateway': 'example',
      'gatewayMerchantId': 'abc123'
    }
  }

  // $('body').append($(''))
};


/**
 * Initialize a Google Pay API client
 *
 * @returns {google.payments.api.PaymentsClient} Google Pay API client
 */
GooglePay.prototype.getGooglePaymentsClient = function() {
  return (new google.payments.api.PaymentsClient({environment: 'TEST'}));
}

/**
 * Initialize Google PaymentsClient after Google-hosted JavaScript has loaded
 */
GooglePay.prototype.onGooglePayLoaded = function() {
  const that = this
  var paymentsClient = this.getGooglePaymentsClient();
  paymentsClient.isReadyToPay({
    allowedPaymentMethods: that.allowedPaymentMethods
  })
  .then(function(response) {
    console.info(response)
    if (response.result) {
      that.addGooglePayButton();
      that.prefetchGooglePaymentData();
    }
  })
  .catch(function(err) {
    // show error in developer console for debugging
    console.error(err);
  });
}

/**
 * Add a Google Pay purchase button alongside an existing checkout button
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/object#ButtonOptions|Button options}
 * @see {@link https://developers.google.com/pay/api/web/guides/brand-guidelines|Google Pay brand guidelines}
 */
GooglePay.prototype.addGooglePayButton = function () {
  var paymentsClient = this.getGooglePaymentsClient();
  var button = paymentsClient.createButton({onClick:onGooglePaymentButtonClicked});
  document.getElementById('description').appendChild(button);
}

/**
 * Configure support for the Google Pay API
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/object#PaymentDataRequest|PaymentDataRequest}
 * @returns {object} PaymentDataRequest fields
 */
GooglePay.prototype.getGooglePaymentDataConfiguration = function() {
  return {
    // @todo a merchant ID is available for a production environment after approval by Google
    // @see {@link https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist|Integration checklist}
    merchantId: '01234567890123456789',
    paymentMethodTokenizationParameters: this.tokenizationParameters,
    allowedPaymentMethods: this.allowedPaymentMethods,
    cardRequirements: {
      allowedCardNetworks: this.allowedCardNetworks
    }
  };
}

/**
 * Provide Google Pay API with a payment amount, currency, and amount status
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/object#TransactionInfo|TransactionInfo}
 * @returns {object} transaction info, suitable for use as transactionInfo property of PaymentDataRequest
 */
GooglePay.prototype.getGoogleTransactionInfo = function() {
  return {
    currencyCode: 'USD',
    totalPriceStatus: 'FINAL',
    // set to cart total
    totalPrice: '1.00'
  };
}

/**
 * Prefetch payment data to improve performance
 */
GooglePay.prototype.prefetchGooglePaymentData = function() {
  var paymentDataRequest = this.getGooglePaymentDataConfiguration();
  // transactionInfo must be set but does not affect cache
  paymentDataRequest.transactionInfo = {
    totalPriceStatus: 'NOT_CURRENTLY_KNOWN',
    currencyCode: 'USD'
  };
  var paymentsClient = this.getGooglePaymentsClient();
  paymentsClient.prefetchPaymentData(paymentDataRequest);
}

/**
 * Show Google Pay chooser when Google Pay purchase button is clicked
 */
GooglePay.prototype.onGooglePaymentButtonClicked = function() {
  var paymentDataRequest = this.getGooglePaymentDataConfiguration();
  paymentDataRequest.transactionInfo = this.getGoogleTransactionInfo();

  var paymentsClient = this.getGooglePaymentsClient();
  paymentsClient.loadPaymentData(paymentDataRequest)
      .then(function(paymentData) {
        // handle the response
        processPayment(paymentData);
      })
      .catch(function(err) {
        // show error in developer console for debugging
        console.error(err);
      });
}

/**
 * Process payment data returned by the Google Pay API
 *
 * @param {object} paymentData response from Google Pay API after shopper approves payment
 * @see {@link https://developers.google.com/pay/api/web/reference/object#PaymentData|PaymentData object reference}
 */
GooglePay.prototype.processPayment = function(paymentData) {
  // show returned data in developer console for debugging
  console.log(paymentData);
  // @todo pass payment data response to gateway to process payment
}

export default GooglePay
