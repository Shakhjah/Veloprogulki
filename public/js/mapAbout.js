const a = document.getElementById('from');
const b = document.getElementById('to');
const from = JSON.parse(a.value);
const to = JSON.parse(b.value);

function init() {
  // Задаём точки мультимаршрута.
  const pointA = from;
  const pointB = to;
  // Создаем мультимаршрут.
  const multiRoute = new ymaps.multiRouter.MultiRoute({
    referencePoints: [
      pointA,
      pointB,
    ],
    params: {
      // Тип маршрутизации - пешеходная маршрутизация.
      routingMode: 'bicycle',
    },
  }, {
    // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
    boundsAutoApply: true,
  });
  // ----- Настройка вида
  multiRoute.options.set({
    // Цвет метки начальной точки.
    wayPointStartIconFillColor: 'red',
    // Цвет метки конечной точки.
    wayPointFinishIconFillColor: 'blue',
    // Внешний вид линии активного маршрута.
    routeActiveStrokeWidth: 8,
    routeActiveStrokeStyle: 'solid',
    routeActiveStrokeColor: '#002233',
    // Внешний вид линий альтернативных маршрутов.
    routeStrokeStyle: 'dot',
    routeStrokeWidth: 3,
    boundsAutoApply: true,
  });
  // Включение режима редактирования.
  // multiRoute.editor.start();
  // А вот так можно отключить режим редактирования.
  // multiRoute.editor.stop();
  //---------------------------
  // Создаем кнопку. Поменять местами.
  const changePointsButton = new ymaps.control.Button({
    data: { content: 'Поменять местами точки А и В' },
    options: { selectOnClick: true },
  });

  // Объявляем обработчики для кнопки.
  changePointsButton.events.add('select', () => {
    multiRoute.model.setReferencePoints([pointB, pointA]);
  });

  changePointsButton.events.add('deselect', () => {
    multiRoute.model.setReferencePoints([pointA, pointB]);
  });

  // Создаем карту с добавленной на нее кнопкой.
  const myMap = new ymaps.Map('mapAbout', {
    center: pointA,
    zoom: 12,
    controls: [changePointsButton],
  }, {
    buttonMaxWidth: 300,
  });
  console.log('▶ ⇛ zoomABOUT', myMap._zoom);
  // Получение инфо о маршруте
  multiRoute.model.events.add('requestsuccess', () => {
    // Получение ссылки на активный маршрут.
    const activeRoute = multiRoute.getActiveRoute();
    // Вывод информации о маршруте.
    console.log(`distance-MAP-2: ${activeRoute.properties.get('distance').text}`);
    console.log(`Time-MAP-2: ${activeRoute.properties.get('duration').text}`);
    // console.log(activeRoute);

    // Для автомобильных маршрутов можно вывести
    // информацию о перекрытых участках.
    if (activeRoute.properties.get('blocked')) {
      console.log('На маршруте имеются участки с перекрытыми дорогами.');
    }
  });

  // Добавляем мультимаршрут на карту.
  myMap.geoObjects.add(multiRoute);
}

ymaps.ready(init);
