const { body,param, validationResult } = require('express-validator');
const logger = require('../logs/logger');

    const userBodyValidationRules = [
        body('username').notEmpty().isString(),
        body('age').notEmpty().isNumeric(),
        body('hobbies').notEmpty().isArray(),
    ];

    const userParamsValidationRules = [
        param('userId').notEmpty().isString().isLength({ min: 36, max: 36 }),
    ];

function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        logger.error(errors)
        return res.status(400).json({
            message: 'Validation Failed',
            error : errors
        });
    }
    next();
}


module.exports = { userBodyValidationRules,userParamsValidationRules, handleValidationErrors }