function init() {
  // Создаем карту с добавленной на нее кнопкой.
  const myMap = new ymaps.Map('map', {
    center: [55.751574, 37.573856],
    zoom: 12,
    controls: ['routePanelControl'], // Элементы управления
    behaviors: ['drag', 'multiTouch', 'scrollZoom'],
  }, {
    buttonMaxWidth: 300,
  });
  //-----------------------------
  // Получение ссылки на панель.
  const control = myMap.controls.get('routePanelControl');

  // Получение мультимаршрута.
  const multiRoutePromise = control.routePanel.getRouteAsync();
  //-----------------------------
  // Получение мультимаршрута.
  multiRoutePromise.then((multiRoute) => {
    // Подписка на событие обновления мультимаршрута.
    multiRoute.model.events.add('requestsuccess', () => {
      // Получение ссылки на активный маршрут.
      const activeRoute = multiRoute.getActiveRoute();
      // Когда панель добавляется на карту, она
      // создает маршрут с изначально пустой геометрией.
      // Только когда пользователь выберет начальную и конечную точки,
      // маршрут будет перестроен с непустой геометрией.
      // Поэтому для избежания ошибки нужно добавить проверку,
      // что маршрут не пустой.
      if (activeRoute) {
        // При клике на карту будет чтото происходить
        myMap.events.add('click', () => {
          console.log('▶ ⇛ activeRoute', activeRoute);
          // Вывод информации об активном маршруте.
          console.log(`Длина: ${activeRoute.properties.get('distance').text}`);
          console.log(`Время прохождения: ${activeRoute.properties.get('duration').text}`);
          console.log(`Строка с координатами: ${activeRoute.properties.get('boundedBy')}`);
          // Включение режима редактирования и задание его настроек.
          multiRoute.editor.start({
            // При включении опции addWayPoints пользователи смогут создавать
            // путевые точки по клику на карте.
            addWayPoints: true,
            // При включении опции removeWayPoints пользователи смогут удалять
            // путевые точки.
            // Для удаления точки нужно дважды кликнуть по ней.
            removeWayPoints: true,
            // При включении опции addMidPoints пользователи смогут создавать
            // новые промежуточные точки.
            // Чтобы создать промежуточную точку, нужно кликнуть по линии маршрута и,
            // удерживая кнопку, переместить точку в нужную позицию на карте.
            // Тип промежуточной точки (путевая или транзитная) задается в опции
            // editorMidPointsType.
            addMidPoints: true,
          });
        });
      }
    });
  }, (err) => {
    console.log(err);
  });
  //-----------------------------
  // При клике на карту будет чтото происходить
  myMap.events.add('click', () => {
    console.log('▶ ⇛ multiRoutePromise', multiRoutePromise);
  });
  //-----------------------------
  // Обработка события, возникающего при щелчке
  // левой кнопкой мыши в любой точке карты.
  // При возникновении такого события откроем балун.
  myMap.events.add('click', (e) => {
    if (!myMap.balloon.isOpen()) {
      const coords = e.get('coords');
      myMap.balloon.open(coords, {
        contentHeader: 'Событие!',
        contentBody: '<p>Кто-то щелкнул по карте.</p>'
          + `<p>Координаты щелчка: ${[
            coords[0].toPrecision(6),
            coords[1].toPrecision(6),
          ].join(', ')}</p>`,
        contentFooter: '<sup>Щелкните еще раз</sup>',
      });
    } else {
      myMap.balloon.close();
    }
  });
}

ymaps.ready(init);
