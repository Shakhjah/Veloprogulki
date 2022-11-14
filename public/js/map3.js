async function init() {
  const { geolocation } = ymaps;

  const position = await geolocation.get({
    provider: 'yandex',
    mapStateAutoApply: true,
  });

  console.log('▶ ⇛ position', position);

  const myMap = new ymaps.Map('map3', {
    center: position.geoObjects?.position || [55, 34],
    zoom: 12,
    controls: ['zoomControl', 'routeButtonControl'], // Элементы управления
    behaviors: ['drag', 'multiTouch', 'scrollZoom'],
  }, {
    buttonMaxWidth: 300,
  });
    // Получение ссылки на панель.
  const control = myMap.controls.get('routeButtonControl');
  control.routePanel.state.set({
    type: 'bicycle',
  });
  //--------------------
  const buttonEditor = new ymaps.control.Button({
    data: { content: 'Режим редактирования' },
  });
  myMap.controls.add(buttonEditor, {
    float: 'left',
  });
  //--------------------
  // Получение мультимаршрута.
  const multiRoutePromise = control.routePanel.getRouteAsync();
  //--------------------
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
        // Вывод информации об активном маршруте.
        console.log('▶ ⇛ activeRoute', activeRoute);
        console.log(`Длина: ${activeRoute.properties.get('distance').text}`);
        console.log(`Время прохождения: ${activeRoute.properties.get('duration').text}`);
        console.log(`Координаты: ${activeRoute.properties.get('boundedBy')}`);
        myMap.controls.remove('zoomControl');

        buttonEditor.events.add('select', () => {
          /**
         * Включение режима редактирования.
         * В качестве опций может быть передан объект с полями:
         * addWayPoints - разрешает добавление новых путевых точек при клике на карту. Значение по умолчанию: false.
         * dragWayPoints - разрешает перетаскивание уже существующих путевых точек. Значение по умолчанию: true.
         * removeWayPoints - разрешает удаление путевых точек при двойном клике по ним. Значение по умолчанию: false.
         * dragViaPoints - разрешает перетаскивание уже существующих транзитных точек. Значение по умолчанию: true.
         * removeViaPoints - разрешает удаление транзитных точек при двойном клике по ним. Значение по умолчанию: true.
         * addMidPoints - разрешает добавление промежуточных транзитных или путевых точек посредством перетаскивания маркера, появляющегося при наведении курсора мыши на активный маршрут. Тип добавляемых точек задается опцией midPointsType. Значение по умолчанию: true
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRoute.xml#editor
         */
          activeRoute.editor.start({
            addWayPoints: true,
            removeWayPoints: true,
          });
        });
      }
    });

    // myButton.events.add('click', () => {
    //   multiRoute.editor.start({
    //     // При включении опции addWayPoints пользователи смогут создавать
    //     // путевые точки по клику на карте.
    //     addWayPoints: true,
    //     // При включении опции removeWayPoints пользователи смогут удалять
    //     // путевые точки.
    //     // Для удаления точки нужно дважды кликнуть по ней.
    //     removeWayPoints: true,
    //     // При включении опции addMidPoints пользователи смогут создавать
    //     // новые промежуточные точки.
    //     // Чтобы создать промежуточную точку, нужно кликнуть по линии маршрута и,
    //     // удерживая кнопку, переместить точку в нужную позицию на карте.
    //     // Тип промежуточной точки (путевая или транзитная) задается в опции
    //     // editorMidPointsType.
    //     addMidPoints: true,
    //   });
    // });
  }, (err) => {
    console.log(err);
  });
  //--------------------

  //--------------------

  // // Создание мультимаршрута.
  // const multiRoute = new ymaps.multiRouter.MultiRoute({
  //   referencePoints: ['Москва', 'Тверь'],
  // }, {
  //   // Тип промежуточных точек, которые могут быть добавлены при редактировании.
  //   editorMidPointsType: 'via',
  //   // В режиме добавления новых путевых точек запрещаем ставить точки поверх объектов карты.
  //   editorDrawOver: false,
  // });

  // const buttonEditor = new ymaps.control.Button({
  //   data: { content: 'Режим редактирования' },
  // });

  // buttonEditor.events.add('select', () => {
  //   /**
  //      * Включение режима редактирования.
  //      * В качестве опций может быть передан объект с полями:
  //      * addWayPoints - разрешает добавление новых путевых точек при клике на карту. Значение по умолчанию: false.
  //      * dragWayPoints - разрешает перетаскивание уже существующих путевых точек. Значение по умолчанию: true.
  //      * removeWayPoints - разрешает удаление путевых точек при двойном клике по ним. Значение по умолчанию: false.
  //      * dragViaPoints - разрешает перетаскивание уже существующих транзитных точек. Значение по умолчанию: true.
  //      * removeViaPoints - разрешает удаление транзитных точек при двойном клике по ним. Значение по умолчанию: true.
  //      * addMidPoints - разрешает добавление промежуточных транзитных или путевых точек посредством перетаскивания маркера, появляющегося при наведении курсора мыши на активный маршрут. Тип добавляемых точек задается опцией midPointsType. Значение по умолчанию: true
  //      * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRoute.xml#editor
  //      */
  //   multiRoute.editor.start({
  //     addWayPoints: true,
  //     removeWayPoints: true,
  //   });
  // });

  // buttonEditor.events.add('deselect', () => {
  //   // Выключение режима редактирования.
  //   multiRoute.editor.stop();
  // });

  // // Создаем карту с добавленной на нее кнопкой.
  // // const myMap = new ymaps.Map('map', {
  // //   center: [56.399625, 36.71120],
  // //   zoom: 7,
  // //   controls: [buttonEditor],
  // // }, {
  // //   buttonMaxWidth: 300,
  // // });

  // // Добавляем мультимаршрут на карту.
  // myMap.geoObjects.add(multiRoute);
}

ymaps.ready(init);
