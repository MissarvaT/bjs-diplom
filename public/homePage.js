'use strict'

const logoutButton = new LogoutButton();

logoutButton.action = () => {
    return ApiConnector.logout( response => {
        if (response) {
            location.reload();
        };
    });
};

ApiConnector.current((response) => {
    if (response) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();

function updateStocks() {
    return ApiConnector.getStocks(response => {
        if (response) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }})
};

updateStocks();
setInterval(updateStocks, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => {
    return ApiConnector.addMoney(data, response => {
        if (err) {
            moneyManager.setMessage(true, err);
        } else if (response) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(false, 'Баланс успешно пополнен!')
        }
    })
};

moneyManager.conversionMoneyCallback = data => {
    return ApiConnector.convertMoney(data, response => {
        if (err) {
            moneyManager.setMessage(true, err);
        } else if (response) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(false, 'Деньги успешно конвертированы!');
        };
    });
};

moneyManager.sendMoneyCallback = data => {
    return ApiConnector.transferMoney(data, response => {
        if (err) {
            moneyManager.setMessage(true, err);
        } else if (response) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(false, 'Деньги успешно переведены!');
        };
    });
};

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        favoritesWidget.updateUsersList(response.data);
    };
});

favoritesWidget.addUserCallback = data => {
    return ApiConnector.addUserToFavorites(data, response => {
        if (err) {
            favoritesWidget.setMessage(true, err);
        } else if (response) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            favoritesWidget.updateUsersList(response.data);
            favoritesWidget.setMesage(false, 'Пользователь успешно добавлен!')
        };
    });
};
favoritesWidget.removeUserCallback = data => {
    return ApiConnector.removeUserFromFavorites(data, response => {
        if (err) {
            moneyManager.setMessage(true, err);
        } else if (response) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(false, 'Пользователь успешно удален!')
        };
    })
};
