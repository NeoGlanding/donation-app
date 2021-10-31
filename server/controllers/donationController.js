const cfunc = require('./../utils/cfunc');

class Controller {
    static post = cfunc(async(req, res, next) => {
        const {SF} = req;
        const {donation , email , fullName , nric , phoneNumber , address} = req.body

        // Check if donation less than 10;
        if (donation < 10) return next({code: 400, message: 'Donation should be more than 10'});

        // Email Checking
        const exist = await SF.sobject("Contact")
                                .findOne({Email: email})
                                .select('Email')

        // If email doesn't exist
        if(!exist) {
            const payload = {
                Email: email,
                LastName: fullName,
                MailingCity: address,
                NRIC__c: nric,
                Phone: phoneNumber
            }
            // Create to Contact Object
            let result = await SF.sobject("Contact").create(payload)
            if(!result.success) return next({code: 500, message: 'Internal Server Error'})
        }


        // Find Contact from Contact Object
        let contact = await SF.sobject("Contact")
                            .findOne({Email: email})
                            .select("Id");
        

        // create donation
        let date = new Date()
        let donationResult = await SF.sobject("Donation__c")
                                .create({
                                    Donor_Name__c: contact.Id,
                                    Donation_Amount__c: donation,
                                    Donation_Datetime__c: date.toISOString()
                                })
        if(!donationResult.success) return next({code: 500, message: 'Internal Server Error'})

        res.status(201).json({
            message: "Donation submitted"
        })
    })
}

module.exports = Controller