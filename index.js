window.onload = function() {

    const promise = new Promise((resolve, reject) => {
        VK.init({
            apiId: 6195445
        });
        
        VK.Auth.login(data => {
            if (data.session) {
                resolve(data)
            } else {
                reject(new Error('Не удалось авторизоваться'))
            }
        }, 8);
    });
    
    promise
    .then(() => {
        return new Promise((resolve, reject) => {
            VK.api('friends.get', {
                v: 5.68,
                fields: 'first_name, last_name, photo_100'
            }, data => resolve(data.response))
        })
    })
    .then((data) => {
        console.log(data);
        let items = data.items;
        let results = document.querySelector('#results');
        for (var i = 0; i < items.length; i++){
            results.innerHTML += items[i].first_name + '  ';
        }
        
    })
    .catch(function (e) {
        alert('Ошибка' + e.message);
    });
}
