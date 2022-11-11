function init() {
  // Создаем карту с добавленной на нее кнопкой.
  const myMap = new ymaps.Map('map', {
    center: [55.751574, 37.573856],
    zoom: 12,
    controls: ['zoomControl', 'routeButtonControl'], // Элементы управления
    behaviors: ['drag', 'multiTouch', 'scrollZoom'],
  }, {
    buttonMaxWidth: 300,
  });

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
