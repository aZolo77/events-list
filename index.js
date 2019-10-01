requirejs.config({
  paths: {
    jquery: 'libs/jquery.min',
    List: 'containers/List',
    ListItem: 'components/ListItem',
    EventsData: 'db/listData',
    Filter: 'containers/Filter'
  }
});

requirejs(['List', 'ListItem', 'EventsData', 'Filter', 'jquery'], function(
  List,
  ListItem,
  EventsData,
  Filter
) {
  Filter.init();
  List.init();
});
