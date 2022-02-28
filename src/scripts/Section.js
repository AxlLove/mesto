export default class Section {
  constructor({item, renderer}, containerSelector) {
    this._item = item;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }
  addItem (cardData) {
    const card = this._renderer (cardData);
    this._containerSelector.prepend(card);
  }
  loadCards (){
    this._item.forEach((element)=>{
      this.addItem(element);
    });
  };
};
