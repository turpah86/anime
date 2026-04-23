(function () {
    'use strict';

    var plugin = {
        component: 'my_anime_hacker',
        name: 'Anime Hacker',
        icon: '<svg height="36" viewBox="0 0 24 24" width="36" fill="#00ff00"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>'
    };

    // Создаем страницу (Компонент)
    function animePage(object) {
        var comp = new Lampa.InteractionMain(object);
        comp.create = function () {
            this.activity.loader(true);
            var _this = this;
            // Запрос к аниме-базе
            Lampa.HTTP.get('https://jikan.moe', function (data) {
                var items = data.data.map(function (a) {
                    return { title: a.title, img: a.images.jpg.image_url, description: a.synopsis };
                });
                _this.build(items);
                _this.activity.loader(false);
            });
            return comp.render();
        };
        comp.build = function(items) {
            var _this = this;
            items.forEach(function(item) {
                var card = Lampa.Template.get('card', item);
                card.on('hover:enter', function () {
                    Lampa.Activity.push({ component: 'search', search: item.title });
                });
                _this.append(card);
            });
        };
        return this.render();
    };

    // Официальная регистрация компонента
    Lampa.Component.add(plugin.component, animePage);

    // Функция запуска
    function pluginStart() {
        if (window['plugin_' + plugin.component + '_ready']) return;
        window['plugin_' + plugin.component + '_ready'] = true;

        // Создаем элемент меню как в твоем примере
        var menu_item = $('<li class="menu__item selector">' +
            '<div class="menu__ico">' + plugin.icon + '</div>' +
            '<div class="menu__text">' + plugin.name + '</div>' +
        '</li>');

        menu_item.on('hover:enter', function () {
            Lampa.Activity.push({
                title: plugin.name,
                component: plugin.component,
                page: 1
            });
        });

        // Добавляем в список
        $('.menu .menu__list').append(menu_item);
    }

    if (window.appready) pluginStart();
    else Lampa.Listener.follow('app', function (e) { if (e.type === 'ready') pluginStart(); });
})();
