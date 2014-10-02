/**
 * 
 */

function validateQuickRegistration() {
	$('#quickRegistrationForm').bootstrapValidator({
    	feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            name: {
                message: 'The mind name is not valid',
                validators: {
                    // The validator will create an Ajax request
                    // sending { username: 'its value' } to the back-end
                    remote: {
                        message: 'The mindname is not available',
                        url: '/api/validate-mind-name'
                    },
        			notEmpty: {
            			message: 'The mind name is required'
        			},
        			stringLength: {
                        max: 10,
                        message: 'The mind name must be less than 10 characters'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9-]+$/i,
                        message: 'The mind name can consist of alphanumerical characters and dash only'
                    }
                }
            },
	        email: {
	            message: 'The mind email is not valid',
	            validators: {
	                // The validator will create an Ajax request
	                // sending { username: 'its value' } to the back-end
	                remote: {
	                    message: 'The mind email is already used by another mind',
	                    url: '/api/validate-mind-email'
	                },
	                emailAddress: {
                        message: 'The value is not a valid email address'
	                },
	    			notEmpty: {
	        			message: 'The mind email is required'
	    			},	
	                stringLength: {
                        max: 32,
                        message: 'The email address cannot be more than 32 characters'
                    }
	            }
	        },
	        password: {
                validators: {
                    notEmpty: {
                        message: 'The password is required and cannot be empty'
                    },
                    different: {
                        field: 'name',
                        message: 'The password cannot be the same as mindname'
                    },
                    stringLength: {
                        min: 8,
                        max: 12,
                        message: 'The password must have at least 8 characters and max 12 characters'
                    }
                }
            },
        }
    });
}