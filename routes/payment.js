module.exports = function(app) {

    var PaymentService = require('../services/payment.js');

    // GET - Return all payments in the DB
    findAllPayments = function(req, res) {

        console.log('GET - findAllPayments');

        PaymentService.findPayments({

            onSuccess: function(payments) {
                res.jsonp(payments);
            },
            
            onError: function(error) {
                res.jsonp({error:error});
            },
        });
    };

    // GET - Return a payment with specified ID
    findPayment = function(req, res) {

        var paymentId = req.params.id;
        console.log('GET - findPaymentById - paymentId=' + paymentId);

        PaymentService.findPaymentById({

            paymentId: paymentId,

            onSuccess: function(payment) {
                res.jsonp(payment);
            },
            
            onError: function(error) {
                res.jsonp({error:error});
            },
        });
    };

    // POST - Insert a new payment in the DB
    addPayment = function(req, res) {

        console.log('POST - addPayment');

        PaymentService.savePayment({

            paymentNick:     req.body.paymentNick,
            paymentImageUrl: req.body.paymentImageUrl,
            paymentMoney:    req.body.paymentMoney,
            paymentDate:     Date.now(),
            paymentProject:  req.body.paymentProject,

            onSuccess: function(payment) {
                res.jsonp(payment);
            },
            
            onError: function(error) {
                res.jsonp({error:error});
            },
        });
    };

    // PUT - Update a register already exists
    updatePayment = function(req, res) {
        
        var paymentId = req.params.id;
        console.log('PUT - updatePayment - paymentId=' + paymentId);

        PaymentService.findPaymentByIdAndUpdate({

            paymentId:       paymentId,
            paymentNick:     req.body.paymentNick,
            paymentImageUrl: req.body.paymentImageUrl,
            paymentMoney:    req.body.paymentMoney,
            paymentDate:     Date.now(),
            paymentProject:  req.body.paymentProject,

            onSuccess: function(payment) {
                res.jsonp(payment);
            },
            
            onError: function(error) {
                res.jsonp({error:error});
            },
        });
    };

    // DELETE - Delete a payment with specified ID
    deletePayment = function(req, res) {
        
        var paymentId = req.params.id;
        console.log('DELETE - deletePayment - paymentId=' + paymentId);

        PaymentService.findPaymentByIdAndRemove({

            paymentId: paymentId,

            onSuccess: function(payment) {
                res.jsonp(payment);
            },
            
            onError: function(error) {
                res.jsonp({error:error});
            },
        });
    };

    // Link routes and functions
    app.get('/payment', findAllPayments);
    app.get('/payment/:id', findPayment);
    app.post('/payment', addPayment);
    app.put('/payment/:id', updatePayment);
    app.delete('/payment/:id', deletePayment);

}