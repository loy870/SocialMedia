const Validator = require('validator');
const isEmpty = require('./is-empty'); 

module.exports = function validateExperienceInput(data){ 
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from  : '';


    if(Validator.isEmpty(data.title)){
        errors.title = 'title is required';
    }
    if(!Validator.isEmail(data.company)){
        errors.company = 'company is invalid';
    }
    if(Validator.isEmpty(data.from)){
        errors.from = 'from is required';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
} 