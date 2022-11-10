ymaps.ready(() => {
  const myMap = new ymaps.Map('map', {
    center: [55.751574, 37.573856],
    zoom: 12,
    controls: ['zoomControl', 'routeButtonControl'], // Элементы управления
    behaviors: ['drag', 'multiTouch', 'scrollZoom'],
  }, {
    searchControlProvider: 'yandex#search',
  });

  const control = myMap.controls.get('routeButtonControl');
  control.routePanel.state.set({
    type: 'bicycle',
  });

  control.routePanel.options.set({
    types: {
      bicycle: true,
      pedestrian: true,
      masstransit: false,
    },
    routeStrokeColor: '00FF00',
  });

  // Создаем кнопку, с помощью которой пользователи смогут менять местами начальную и конечную точки маршрута.
  const switchPointsButton = new ymaps.control.Button({
    data: { content: 'Поменять местами', title: 'Поменять точки местами' },
    options: { selectOnClick: false, maxWidth: 160 },
  });
  // // Объявляем обработчик для кнопки.
  // switchPointsButton.events.add('click', (event) => {
  //   // Меняет местами начальную и конечную точки маршрута.
  //   control.routePanel.switchPoints();
  // });
  // myMap.controls.add(switchPointsButton);

  // my button Сохранить маршрут
  const mapSaveButton = document.getElementById('mapSaveId');
  ymaps.domEvent.manager.add(mapSaveButton, 'click', (event) => {
    // event.preventDefault();
    const activeRoute = control.routePanel.state.get({});
    console.log('▶ ⇛ activeRoute', activeRoute);
    console.log('▶ ⇛ FROM', activeRoute.from);
    console.log('▶ ⇛ TO', activeRoute.to);
    console.log('▶ ⇛ TYPE', activeRoute.type);
  });

  // Режим редактирования
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
      console.log('КООРДИНАТЫ', coords);
      //-------------------
      // Добавление точки на карту.
      const myGeoObject = new ymaps.GeoObject({
        geometry: {
          type: 'Point', // тип геометрии - точка
          coordinates: coords, // координаты точки
        },
      });

      // Размещение геообъекта на карте.
      myMap.geoObjects.add(myGeoObject);
    } else {
      myMap.balloon.close();
    }
  });
});

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

// Добавление маршрута на карту.
myMap.geoObjects.add(multiRoute);
