define(['jquery'], function($) {
  var listItem = function(item) {
    return {
      id: item.id,
      title: item.title || '',
      description: item.description || '',
      price: item.price || '',
      type: item.type || '',
      fav: item.fav,
      create: function() {
        var elem = document.createElement('div');
        elem.id = `event-${this.id}`;
        elem.classList.add('list__item');
        if (this.fav === true) {
          elem.classList.add('list__item_fav');
        }

        var ttl = `<div class="list__item-ttl">${this.title}</div>`;
        var desc = `<div class="list__item-desc">${this.description}</div>`;
        var elemPrice = `<span class="list__item-price">Стоимость: ${this.price} &#8381;</span>`;
        var btnClass = this.fav
          ? 'list__item-btn list__item-fav'
          : 'list__item-btn list__item-unfav';
        var btnText = this.fav ? 'В избранном' : 'В избранное';
        var favButton = `<button id="fav-btn-${this.id}" class="${btnClass}">${btnText}</button>`;
        $(elem).html(ttl + desc + elemPrice + favButton);
        return elem;
      }
    };
  };

  return listItem;
});
