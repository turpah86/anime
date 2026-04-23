(function () {
    'use strict';

    // 1. Регистрируем саму страницу (это работает везде)
    Lampa.Component.add('my_hack', function (object) {
        var comp = new Lampa.InteractionMain(object);
        comp.create = function () {
            return '<div style="padding: 100px; text-align: center;"><h1>💎 ХАКЕР АНИМЕ 💎</h1><p>Кнопка вставлена в обход системной ошибки!</p></div>';
        };
        return comp;
    });

    // 2. Вставляем кнопку прямо в дерево элементов (DOM)
    function injectButton() {
        // Ищем тот самый блок меню, который мы видели у тебя в инспекторе
        var menu = $('.menu .scroll__body');
        
        if (menu.length && !$('.menu__item[data-action="my_hack"]').length) {
            var item = $('<div class="menu__item selector" data-action="my_hack">' +
                '<div class="menu__ico">' +
                    '<svg height="36" viewBox="0 0 24 24" width="36" fill="#00ff00"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>' +
                '</div>' +
                '<div class="menu__text">ХАКЕР АНИМЕ ⚡️</div>' +
            '</div>');

            // Вешаем действие при клике
            item.on('click', function () {
                Lampa.Activity.push({
                    title: 'ХАКЕР АНИМЕ',
                    component: 'my_hack'
                });
            });

            // Добавляем в самый конец списка меню
            menu.append(item);
            console.log('Hacker: Button injected successfully!');
        }
    }

    // Запускаем проверку каждые 2 секунды, пока меню не появится
    var timer = setInterval(injectButton, 2000);
})();
