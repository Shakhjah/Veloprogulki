ymaps.ready(() => {
  const myMap = new ymaps.Map('map', {
    center: [55.751574, 37.573856],
    zoom: 12,
    controls: ['zoomControl', 'routeButtonControl'], // Элементы управления
    behaviors: ['routeEditor', 'drag', 'multiTouch'],
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
  // Объявляем обработчик для кнопки.
  switchPointsButton.events.add('click', (event) => {
    // Меняет местами начальную и конечную точки маршрута.
    control.routePanel.switchPoints();
  });
  myMap.controls.add(switchPointsButton);

  // my button
  const mapSaveButton = document.getElementById('mapSaveId');
  ymaps.domEvent.manager.add(mapSaveButton, 'click', (event) => {
    // event.preventDefault();
    const activeRoute = control.routePanel.state.get({});
    console.log('▶ ⇛ activeRoute', activeRoute);
    console.log('▶ ⇛ FROM', activeRoute.from);
    console.log('▶ ⇛ TO', activeRoute.to);
    console.log('▶ ⇛ TYPE', activeRoute.type);
  });
  // mapSaveButton.events.add('submit', (event) => {
  //   event.preventDefault();
  //   const activeRoute = control.routePanel.state.get({});
  //   console.log('▶ ⇛ activeRoute', activeRoute);
});
// });
