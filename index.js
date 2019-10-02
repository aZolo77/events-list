requirejs.config({
  paths: {
    jquery: 'libs/jquery.min',
    List: 'containers/List',
    ListItem: 'components/ListItem',
    EventDesc: 'components/EventDescription',
    EventsData: 'db/listData',
    Filter: 'containers/Filter'
  }
});

requirejs(['List', 'Filter'], function(List, Filter) {
  Filter.init();
  List.init();
});
