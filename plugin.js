(function () {
    'use strict';

    function startPlugin() {
        // Добавляем компонент (страницу) как это делают профи
        Lampa.Component.add('anime_pro', function (object) {
            var comp = new Lampa.InteractionMain(object);
            
            comp.create = function () {
                // Это создаст пустую сетку, куда потом можно грузить постеры
                return comp.render();
            };

            comp.empty = function () {
                return '<div class="empty">Здесь скоро будет список аниме...</div>';
            };

            return comp;
        });

        // "Спизженный" метод регистрации меню, который работает во всех версиях
        var item = {
            id: 'anime_pro',
            title: 'Anime Pro',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://w3.org"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="white"/></svg>',
            component: 'anime_pro',
            ordered: 1
        };

        // Принудительная вставка в список меню
        Lampa.Menu.add(item);
        
        // Уведомление для проверки
        Lampa.Noty.show('Anime Pro: Плагин активирован!');
    }

    if (window.appready) startPlugin();
    else Lampa.Listener.follow('app', function (e) {
        if (e.type == 'ready') startPlugin();
    });
})();
