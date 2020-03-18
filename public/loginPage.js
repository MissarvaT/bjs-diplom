'use strict'

const userForm = new UserForm();

userForm.loginFormCallback = data => {
    return ApiConnector.login(data, response => {
        if (response) {
            location.reload();
        } else if (response.err) {
           userForm.setRegisterErrorMessage(error);
        }
    });
}

userForm.registerFormCallback = data => {
    return ApiConnector.register(data, response => {
        if (response) {
            location.reload();
        } else if (response.err) {
            userForm.setLoginErrorMessage(error);
        }
    })
}
