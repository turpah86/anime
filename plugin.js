(function () {
    'use strict';

    function startPlugin() {
        // 1. Создаем страницу нашего плагина
        Lampa.Component.add('my_custom_anime', function (object) {
            var comp = new Lampa.InteractionMain(object);
            comp.create = function () {
                return '<div style="padding: 100px; text-align: center;"><h1>🚀 Твой личный плагин работает!</h1><p>Если ты видишь это, значит мы победили кеш.</p></div>';
            };
            return comp;
        });

        // 2. Функция добавления кнопки
        function addToMenu() {
            var menu_item = {
                id: 'my_custom_anime',
                title: 'МОЁ АНИМЕ ⚡️', // Название специально другое!
                icon: '<svg height="36" viewBox="0 0 24 24" width="36" fill="#ff0000"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>',
                component: 'my_custom_anime',
                ordered: 0 // Ставим в самый верх
            };

            // Добавляем в список меню
            Lampa.Menu.add(menu_item);
            
            // Форсируем обновление интерфейса
            Lampa.Component.updateMenu();
        }

        // Запускаем добавление
        addToMenu();
        
        // Повторяем через 2 секунды (на случай если Лампа тормозит)
        setTimeout(addToMenu, 2000);

        Lampa.Noty.show('Плагин МОЁ АНИМЕ загружен!');
    }

    if (window.appready) startPlugin();
    else Lampa.Listener.follow('app', function (e) {
        if (e.type == 'ready') startPlugin();
    });
})();
