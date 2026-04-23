(function () {
    'use strict';

    function start() {
        // 1. Создаем страницу плагина
        Lampa.Component.add('my_hack', function (object) {
            var comp = new Lampa.InteractionMain(object);
            comp.create = function () {
                return '<div style="padding: 100px; text-align: center;"><h1>💎 ХАКЕР АНИМЕ 💎</h1><p>Кнопка вставлена в обход системы!</p></div>';
            };
            return comp;
        });

        // 2. Вставляем кнопку прямо в HTML структуру
        function inject() {
            var menu = $('.menu .scroll__body');
            if (menu.length && !$('.menu__item[data-action="my_hack"]').length) {
                // Создаем элемент как на твоем скрине
                var item = $('<div class="menu__item selector" data-action="my_hack">' +
                    '<div class="menu__ico">' +
                        '<svg height="36" viewBox="0 0 24 24" width="36" fill="#00ff00"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>' +
                    '</div>' +
                    '<div class="menu__text">ХАКЕР АНИМЕ ⚡️</div>' +
                '</div>');

                // Обработка клика
                item.on('click', function () {
                    Lampa.Activity.push({
                        title: 'ХАКЕР АНИМЕ',
                        component: 'my_hack'
                    });
                });

                menu.append(item);
                console.log('Plugin: Button injected manually');
            }
        }

        // Пробуем вставить несколько раз
        setInterval(inject, 2000);
    }

    // Запускаем без проверок на Lampa.Menu
    start();
})();
