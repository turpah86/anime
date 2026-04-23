(function () {
    'use strict';

    Lampa.Component.add('my_hacker_anime', function (object) {
        var comp = new Lampa.InteractionMain(object);
        
        comp.create = function () {
            this.activity.loader(true);
            var _this = this;

            // Тянем данные из открытой базы (как это делают все аниме-плагины)
            Lampa.HTTP.get('https://jikan.moe', function (data) {
                var items = data.data.map(function (a) {
                    return {
                        title: a.title,
                        name: a.title,
                        img: a.images.jpg.image_url,
                        background_image: a.images.jpg.large_image_url,
                        description: a.synopsis,
                        year: a.year,
                        rating: a.score
                    };
                });

                _this.build(items);
                _this.activity.loader(false);
            }, function () {
                Lampa.Noty.show('Ошибка загрузки базы аниме');
            });

            return comp.render();
        };

        comp.build = function(items) {
            var _this = this;
            items.forEach(function(item) {
                var card = Lampa.Template.get('card', item);
                
                card.on('hover:focus', function () {
                    Lampa.Background.change(item.background_image);
                });

                card.on('hover:enter', function () {
                    // При клике открываем встроенный поиск Лампы по этому аниме
                    Lampa.Activity.push({
                        url: '',
                        title: 'Поиск: ' + item.title,
                        component: 'search',
                        search: item.title,
                        page: 1
                    });
                });

                _this.append(card);
            });
        };

        return comp;
    });

    // Вставляем кнопку в меню (метод, который у тебя сработал)
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
