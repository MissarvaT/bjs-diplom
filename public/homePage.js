'use strict'

const logoutButton = new LogoutButton();

logoutButton.action = () => {
    return ApiConnector.logout( response => {
        if (response.success) {
            location.reload();
        };
    });
};

ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    };
});

const ratesBoard = new RatesBoard();

function updateStocks() {
    return ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        };
    })
};

updateStocks();
setInterval(updateStocks, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => {
    return ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(false, 'Баланс успешно пополнен!')
        } else {
            moneyManager.setMessage(true, response.data);
        })
    };
};

moneyManager.conversionMoneyCallback = data => {
    return ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(false, 'Деньги успешно конвертированы!');
        } else {
            moneyManager.setMessage(true, response.data);
        } 
    });
};

moneyManager.sendMoneyCallback = data => {
    return ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(false, 'Деньги успешно переведены!');
        } else  {
            moneyManager.setMessage(true, response.data);
        } 
    });
};

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    };
});

favoritesWidget.addUserCallback = data => {
    return ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(false, 'Пользователь успешно добавлен!')
        } else {
            favoritesWidget.setMessage(true, response.data);
        });
    };
};

favoritesWidget.removeUserCallback = data => {
    return ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(false, 'Пользователь успешно удален!')
        } else {
            moneyManager.setMessage(true, response.data);
        })
    };
};



