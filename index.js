requirejs.config({
  paths: {
    jquery: 'libs/jquery.min',
    List: 'containers/List',
    ListItem: 'components/ListItem',
    EventsData: 'db/listData'
  }
});

requirejs(['List', 'ListItem', 'EventsData', 'jquery'], function(List) {
  List.init();
});
