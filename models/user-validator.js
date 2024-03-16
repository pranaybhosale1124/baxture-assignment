const { body,param, validationResult } = require('express-validator');

    const userBodyValidationRules = [
        body('username').notEmpty().isString(),
        body('age').notEmpty().isNumeric(),
        body('hobbies').notEmpty().isArray(),
    ];

    const userParamsValidationRules = [
        param('userId').notEmpty().isString(),
    ];

function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            code: 402,
            error: 'Validation Failed'
        });
    }
    next();
}


module.exports = { userBodyValidationRules,userParamsValidationRules, handleValidationErrors }