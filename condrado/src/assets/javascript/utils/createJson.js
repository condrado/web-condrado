import Helper from '../utils/helper';

export default class CreateJson {
  constructor() {
    this.elementForm = null;
    this.form = null;
    this.helper = new Helper();
  }

  init = form => {
    this.form = form;
    this.elementForm = this.helper.serializeFiles(form);

    $.getJSON("assets/data/data.json", result => {
      this.addPage(result);
    });
  }

  addPage = (result) => {
    let objAct = {}
    let pages = result.pages;
    const converter = new showdown.Converter();
    const urlImg = '../build/assets/images/';
    const today = new Date();
    const day = today.getDate().toString().length === 1 ? '0' + today.getDate().toString() : today.getDate();
    const month = today.getMonth().toString().length === 1 ? '0' + today.getMonth().toString() : today.getMonth();
    const hours = today.getHours().toString().length === 1 ? '0' + today.getHours().toString() : today.getHours();
    const minutes = today.getMinutes().toString().length === 1 ? '0' + today.getMinutes().toString() : today.getMinutes();
    const seconds = today.getSeconds().toString().length === 1 ? '0' + today.getSeconds().toString() : today.getSeconds();

    objAct.id = "page-" + today.getFullYear() + month + day + hours + minutes + seconds;

    $.each($(this.elementForm), (i, obj) => {
      const objNew = {};
      let text = "";

      if (obj.name === 'labContent') {
        text = converter.makeHtml(obj.value);
      } else if (obj.name === 'labImg') {
        text = urlImg + obj.value;
      } else {
        text = obj.value;
      }

      objNew[obj.name] = text;

      if (obj.name === 'labId') {
        const textOption = $('[value="' + obj.value+'"]').text()
        objNew['labTheme'] = textOption;
      }

      $.extend( objAct, objNew );
    });

    result.pages.push(objAct);

    const myJSON = JSON.stringify(result, undefined, 4);

    $('#copyJson').find('#labContentJson').val(myJSON);
    //$('#copyJson').addClass('crr-form__fieldset--active');

    this.helper.copyJson($(this.form).find('#labContentJson'), myJSON);
  }

}
