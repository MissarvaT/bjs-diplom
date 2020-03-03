'use strict'

const userForm = new UserForm();

userForm.loginFormCallback = data => {
    return ApiConnector.login(data, (err, data) => {
        if (data) {
            location.reload();
        } else if (err) {
           userForm.setRegisterErrorMessage('Ошибка авторизации!');
        }
    });
}

userForm.registerFormCallback = data => {
    return ApiConnector.register(data, (err, data) => {
        if (data) {
            location.reload();
        } else if (err) {
            userForm.setLoginErrorMessage('Ошибка при регистрации!')
        }
    })
}

