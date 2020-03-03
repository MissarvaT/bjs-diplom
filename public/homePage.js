'use strict'

const logoutButton = new LogoutButton();

logoutButton.action = () => {
    return ApiConnector.logout( (err, data) => {
        if (data) {
            location.reload();
        };
    });
};

ApiConnector.current((err, data) => {
    if (data) {
        ProfileWidget.showProfile(data);
    }
});

const ratesBoard = new RatesBoard();

function updateStocks() {
    return ApiConnector.getStocks((err, data) => {
        if (data) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(data);
        }})
};

updateStocks();
setInterval(updateStocks, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => {
    return ApiConnector.addMoney(data, (err, data) => {
        if (err) {
            moneyManager.setMessage(true, err);
        } else if (data) {
            ProfileWidget.showProfile(data);
            moneyManager.setMessage(false, 'Баланс успешно пополнен!')
        }
    })
};

moneyManager.conversionMoneyCallback = data => {
    return ApiConnector.convertMoney(data, (err, data) => {
        if (err) {
            moneyManager.setMessage(true, err);
        } else if (data) {
            ProfileWidget.showProfile(data);
            moneyManager.setMessage(false, 'Деньги успешно конвертированы!');
        };
    });
};

moneyManager.sendMoneyCallback = data => {
    return ApiConnector.transferMoney(data, (err, data) => {
        if (err) {
            moneyManager.setMessage(true, err);
        } else if (data) {
            ProfileWidget.showProfile(data);
            moneyManager.setMessage(false, 'Деньги успешно переведены!');
        };
    });
};

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((err,data) => {
    if (data) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(data);
        favoritesWidget.updateUsersList(data);
    };
});

favoritesWidget.addUserCallback = data => {
    return ApiConnector.addUserToFavorites(data, (err, data) => {
        if (err) {
            favoritesWidget.setMessage(true, err);
        } else if (data) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(data);
            favoritesWidget.updateUsersList(data);
            favoritesWidget.setMesage(false, 'Пользователь успешно добавлен!')
        };
    });
};
favoritesWidget.removeUserCallback = data => {
    return ApiConnector.removeUserFromFavorites(data, (err, data) => {
        if (err) {
            moneyManager.setMessage(true, err);
        } else if (data) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(data);
            moneyManager.updateUsersList(data);
            favoritesWidget.setMessage(false, 'Пользователь успешно удален!')
        };
    })
};
