(function () {
    'use strict';

    Lampa.Component.add('my_hacker_anime', function (object) {
        var comp = new Lampa.InteractionMain(object);
        
        comp.create = function () {
            this.activity.loader(true);
            var _this = this;

            // ТЕСТОВЫЕ ДАННЫЕ (если интернет-база тупит)
            var test_items = [
                {title: 'Наруто', img: 'https://media-amazon.com', description: 'Тестовая карточка'},
                {title: 'Ван Пис', img: 'https://media-amazon.com', description: 'Проверка работы'}
            ];

            // Пробуем загрузить реальный ТОП аниме
            Lampa.HTTP.get('https://jikan.moe', function (data) {
                var items = data.data.map(function (a) {
                    return {
                        title: a.title,
                        name: a.title,
                        img: a.images.jpg.image_url,
                        description: a.synopsis
                    };
                });
                _this.build(items);
                _this.activity.loader(false);
            }, function () {
                // Если база не ответила - грузим тест
                _this.build(test_items);
                _this.activity.loader(false);
                Lampa.Noty.show('Гружу тестовые данные...');
            });

            return comp.render();
        };

        comp.build = function(items) {
            var _this = this;
            items.forEach(function(item) {
                var card = Lampa.Template.get('card', item);
                card.on('hover:enter', function () {
                    Lampa.Activity.push({url: '', title: item.title, component: 'search', search: item.title, page: 1});
                });
                _this.append(card);
            });
        };

        return comp;
    });

    function inject() {
        var menu = $('.menu .scroll__body');
        if (menu.length && !$('.menu__item[data-action="my_hacker_anime"]').length) {
            var item = $('<div class="menu__item selector" data-action="my_hacker_anime">' +
                '<div class="menu__ico"><svg height="36" viewBox="0 0 24 24" width="36" fill="#00ff00"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg></div>' +
                '<div class="menu__text">ХАКЕР АНИМЕ ⚡️</div>' +
            '</div>');
            item.on('click', function () {
                Lampa.Activity.push({ title: 'ХАКЕР АНИМЕ', component: 'my_hacker_anime' });
            });
            menu.append(item);
        }
    }
    setInterval(inject, 2000);
})();
