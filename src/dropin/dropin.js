// 0. Get clientKey
getClientKey().then(clientKey => {
    getPaymentMethods().then(paymentMethodsResponse => {

        // Get URL params
        const params = new URLSearchParams(window.location.search);
        const allowPaymentMethods = params.get('paymentMethod') || [];

        // 1. Create an instance of AdyenCheckout
        const checkout = new AdyenCheckout({
            environment: 'test',
            clientKey: clientKey, // Mandatory. clientKey from Customer Area
            paymentMethodsResponse,
            allowPaymentMethods,
            // showPayButton: false,
            // removePaymentMethods: ['paysafecard', 'c_cash'],
            onChange: (state, component) => {
                updateStateContainer(state); // Demo purposes only
            },
            onSubmit: (state, component) => {
                // state.data;
                // state.isValid;
                makePayment(state.data);
            }
        });

        // 2. Create and mount the Component
        window.dropin = checkout
            .create('dropin', {
                // Events
                onSelect: activeComponent => {
                    if (activeComponent.state && activeComponent.state.data) updateStateContainer(activeComponent.data); // Demo purposes only
                }
            })
            .mount('#dropin-container');
    });
});
