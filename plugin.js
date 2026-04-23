(function () {
    'use strict';

    function startPlugin() {
        // 1. Сразу выводим уведомление - если его нет, значит файл не запустился
        Lampa.Noty.show('Аниме плагин: ПРОВЕРКА ЗАПУСКА');

        // 2. Создаем страницу
        Lampa.Component.add('my_anime_page', function (object) {
            var comp = new Lampa.InteractionMain(object);
            comp.create = function () {
                return '<div style="padding: 50px; font-size: 24px; color: #fff;">УРА! Твой личный плагин открылся!</div>';
            };
            return comp;
        });

        // 3. Добавляем в меню (самый простой способ)
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') {
                Lampa.Menu.add({
                    id: 'my_anime_page',
                    title: 'Anime Pro',
                    icon: '<svg height="36" viewBox="0 0 24 24" width="36" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>',
                    component: 'my_anime_page',
                    ordered: 0 // Ставим в самый верх меню
                });
            }
        });
    }

    if (window.appready) startPlugin();
    else Lampa.Listener.follow('app', function (e) {
        if (e.type == 'ready') startPlugin();
    });
})();
