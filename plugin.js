(function () {
    'use strict';

    function startPlugin() {
        // Показываем сообщение при запуске
        Lampa.Noty.show('Плагин Anime успешно загружен!');

        // Добавляем новый компонент (страницу)
        Lampa.Component.add('my_anime', function (object) {
            var comp = new Lampa.InteractionMain(object);
            comp.create = function () {
                return '<div style="padding: 2rem; font-size: 1.5rem;">Добро пожаловать в твой личный аниме-плагин! Скоро здесь будут списки серий.</div>';
            };
            return comp;
        });

        // Добавляем кнопку в левое меню Лампы
        Lampa.Menu.add({
            id: 'my_anime',
            title: 'Anime Pro',
            icon: '<svg height="36" viewBox="0 0 24 24" width="36" xmlns="http://w3.org"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>',
            ordered: 1
        });
    }

    // Запуск при готовности приложения
    if (window.appready) startPlugin();
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') startPlugin();
        });
    }
})();
