var Payment = require('../models/payment.js');
var ProjectService = require('../services/project.js');

findPayments = function(options) {

    console.log('findPayments options=%j', options); 

    options.onSuccess = options.onSuccess || function() {};
    options.onError   = options.onError   || function() {};

    Payment.find().populate('project').exec(function(error, payments) {
        
        if(!error) {

            if(payments) {

                console.log('payments=' + payments);
                options.onSuccess(payments);
            } else {

                var errorMessage = 'Payments not found';
                console.log('ERROR retrieving payments: ' + errorMessage);
                options.onError(errorMessage);
            }
        } else {

            console.log('ERROR retrieving payments: ' + error);
            options.onError(error);
        }
    });
};

findPaymentById = function(options) {

    console.log('findPaymentById options=%j', options);

    options.paymentId = options.paymentId || 0;
    options.onSuccess = options.onSuccess || function() {};
    options.onError   = options.onError   || function() {};

    Payment.findById(options.paymentId).populate('project').exec(function(error, payment) {

        if(!error) {

            if(payment) {

                console.log('payment=' + payment);
                options.onSuccess(payment);

            } else {
                
                var errorMessage = 'Payment not found';
                console.log('ERROR retrieving payment with paymentId="' + options.paymentId + '": ' + errorMessage);
                options.onError(errorMessage);
            }
        } else {

            console.log('ERROR retrieving payment with paymentId="' + options.paymentId + '": ' + error);
            options.onError(error);
        }
    });
};

_updateProject = function(payment, options) {

    console.log('_updateProject payment=%j', payment);
    console.log('_updateProject options=%j', options);

    ProjectService.findProjectById({

        projectId: payment.project,

        onSuccess: function(project) {

            project.payments.push(payment._id);

            ProjectService.saveProject({

                project: project,

                onSuccess: function(newProject) {

                    console.log('project=' + newProject + ' updated');

                    options.onSuccess(payment); // is not an error
                },
                
                onError: options.onError

            });
        },
        
        onError: options.onError
    });
};

savePayment = function(options) {

    console.log('savePayment options=%j', options);

    options.onSuccess = options.onSuccess || function() {};
    options.onError   = options.onError   || function() {};

    var payment = options.payment || new Payment({
        nick:      options.paymentNick,
        imageUrl:  options.paymentImageUrl,
        money:     options.paymentMoney,
        date:      options.paymentDate,
        project:   options.paymentProject
    });

    payment.save(function(error, newPayment) {

      if(!error && newPayment) {

        console.log('payment=' + newPayment + ' saved');

        _updateProject(payment, options);

      } else {

        console.log('ERROR saving payment=' + payment + ': ' + error);
        options.onError(error);
      }
    });
};

findPaymentByIdAndUpdate = function(options) {


    console.log('findPaymentByIdAndUpdate options=%j', options);

    findPaymentById({
        paymentId: options.paymentId,
        onSuccess: function(payment) {

            payment.nick     = options.paymentNick;
            payment.imageUrl = options.paymentImageUrl;
            payment.money    = options.paymentMoney;
            payment.date     = options.paymentDate;
            payment.project  = options.paymentProject;

            savePayment({
                payment:   payment,
                onSuccess: options.onSuccess,
                onError:   options.onError
            });
        },
        onError : options.onError
    });

};

findPaymentByIdAndRemove = function(options) {

    console.log('findPaymentByIdAndRemove options=%j', options);

    findPaymentById({
        paymentId: options.paymentId,
        onSuccess: function(payment) {

            payment.remove(function(error) {

                if(!error) {

                    console.log('payment=' + payment + ' removed');
                    options.onSuccess(payment);

                } else {

                    console.log('ERROR removing payment=' + payment + ': ' + error);
                    options.onError(error);
                }
            });
        },
        onError : options.onError
    });

};

exports.findPayments             = findPayments;
exports.findPaymentById          = findPaymentById;
exports.savePayment              = savePayment;
exports.findPaymentByIdAndUpdate = findPaymentByIdAndUpdate;
exports.findPaymentByIdAndRemove = findPaymentByIdAndRemove;