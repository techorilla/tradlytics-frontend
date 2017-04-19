(function(){

    'use strict';




    var inputFields = {
        TextOnly:{
            pattern:'/^[a-zA-Z .]*$/',
            errorValidation:{
                pattern:'Can not contain digits.'
            }
        },
        ContactNumber:{
            pattern:'/^([0-9\(\)\/\+ \-]*)$/',
            errorValidation:{
                required:'Contact Number is invalid.'
            }
        },
        PrimaryContact:{
            errorValidation:{
                required:'Primary Contact Number not provided.'
            }
        },
        SecondaryContact:{
            errorValidation:{
                required:'Secondary Contact Number not provided.'
            }
        },
        Email:{
            placeholder:'Enter Email',
            pattern:'/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i',
            errorValidations:{
                required:'Email not provided.'
            }
        },
        FirstName:{
            placeholder:'Enter First Name',
            errorValidations:{
                required:'First Name not provided.'
            }
        },
        LastName:{
            placeholder:'Enter Last Name',
            errorValidations:{
                required:'Last Name not provided.'
            }
        },
        Designation:{
            placeholder:'Enter Designation',
            errorValidations:{
                required: 'Designation not provided.'
            }
        },
        OldPassword:{
            placeholder:'******',
            errorValidations:{
                required: 'Old Password not provided.'
            }
        },
        NewPassword:{
            placeholder:'******',
            minLength:8,
            maxLength:32,
            errorValidations:{
                required: 'New Password not provided.',
                pattern:'Password should be at least 8 characters and must contain letters, a number & a special character.',
                maxLength: 'Password should be less than 32 characters',
                minLength: 'Password should be less than '
            }
        },
        ConfirmPassword:{
            placeholder:'******',
            errorValidations:{
                required: 'Re-type given password.',
                validator: 'Passwords do not match.'
            }
        }


    };

    angular
        .module('app.core')
        .constant('inputFields', inputFields)

}());
