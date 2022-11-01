import CreateJson from '../utils/createJson';
import Helper from '../utils/helper';

export default class Form {
  constructor() {
    this.session = null;
    this.result = null
    this.helper = new Helper();
  }

  init = () => {
    if ($('#form-admin').length > 0) {
      this.createSelectThemes()
      this.formAdminOpenForm();
      this.formAdminGetListSidebars();
      this.formAdminSubmit();
      this.maxMinTextarea()
    }
  }

  createSelectThemes = () => {
    const select = $('#labId');

    $.getJSON("../src/assets/data/data.json", result => {
      const sidebars = result.sidebar;
      let selectThemes = [];
      const idAdd = [];

      $.each($(sidebars), (i, sidebar) => {
        const exist = idAdd.includes(sidebar.href);
        const obj = {};

        if (!exist && sidebar.isPost) {
          obj.theme = sidebar.href;
          obj.value = sidebar.title;

          selectThemes.push(obj);
          idAdd.push(sidebar.href);
        }
      })

      selectThemes = selectThemes.sort(this.helper.dynamicSort('value'))

      $.each(selectThemes, (i, selectTheme) => {
        select.append('<option value="' + selectTheme.theme + '">' + selectTheme.value + '</option>')
      });
    })
  }

  maxMinTextarea = () => {
    $('.icon-resize-full').on('click', event => {
      event.stopPropagation();
      event.preventDefault();

      const btn = event.currentTarget;

      $(btn).prev().toggleClass('crr-form--full');
      $('#copyJson').removeClass('crr-form__fieldset--active')
    });
  }

  formAdminOpenForm = () => {
    $('.crr-form__btn-new').on('click', e => {
      const btn = e.currentTarget;
      const fiedset = btn.dataset.form;

      $('.crr-form__fieldset').removeClass('crr-form__fieldset--active');

      if (typeof fiedset !== 'undefined') {
        $('#' + fiedset).toggleClass('crr-form__fieldset--active');
      }
    });
  }

  formAdminGetListSidebars = isRefresh => {
    if (isRefresh) {
      const resultStr = sessionStorage.getItem('jsonApp');
      const result = JSON.parse(resultStr);

      this.formAdminMakeTableSidebars(result)

      sessionStorage.setItem('jsonApp', JSON.stringify(result));
    } else {
      $.getJSON("../src/assets/data/data.json", result => {
        sessionStorage.setItem('jsonApp', JSON.stringify(result));
        this.result = result;

        this.formAdminMakeTableSidebars(result)
      })
    }
  };

  formAdminMakeTableSidebars = (result) => {
    const sidebars = result.sidebar;
    const $sidebar_tbody = $('.crr-table--theme').find('tbody');

    $sidebar_tbody.find('tr').remove();

    $.each($(sidebars), (i, sidebar) => {
      const isPost = sidebar.isPost ? "Si" : "No";
      $sidebar_tbody.append('<tr><td>' + sidebar.title + '</td><td>' + sidebar.href + '</td><td>' + sidebar.linkTitle + '</td><td>' + isPost + '</td><td class="crr-table--no-pading"><a class="crr-form__btn-action icon-minus" href="#"></a></td></tr>');
    });

      this.formAdminAddTheme();
      this.formAdminRemoveTheme();
  };

  formAdminAddTheme = () => {
    let _this = this;

    $('.crr-form__btn-action.icon-plus').off();
    $('.crr-form__btn-action.icon-plus').on('click', e => {
      e.stopPropagation();
      e.preventDefault();

      const btn = $(e.currentTarget);
      const formTheme = btn.parents('#newTheme');
      const inputs = formTheme.length > 0 ? formTheme.find('input') : [];
      let newSidebars = {};

      $.each($(inputs), (i, input) => {
        const key = $(input).attr('name');
        let text = $(input).val();

        if (key === 'href') {
          text = '#' + text;
        }
        if (key === 'isPost') {
          text = $(input).is(":checked") ? true : false;
        }

        newSidebars[key] = text;
      });

      _this.result.sidebar.push(newSidebars);
      _this.result.sidebar = this.helper.orderByNumber(_this.result.sidebar, 'position');

      sessionStorage.setItem('jsonApp',  JSON.stringify(_this.result));
      _this.formAdminGetListSidebars(true);

      const myJSON = JSON.stringify(_this.result, undefined, 4);

      $('#copyJson').find('#labContentJson').val(myJSON);
      //$('#copyJson').addClass('crr-form__fieldset--active');

      this.helper.copyJson($('#copyJson').find('#labContentJson'), myJSON);
    })
  }

  formAdminRemoveTheme = () => {
    let _this = this;

    $('.crr-form__btn-action.icon-minus').off();
    $('.crr-form__btn-action.icon-minus').on('click', e => {
      e.stopPropagation();
      e.preventDefault();

      const btn = $(e.currentTarget);
      const formTheme = btn.parents('#newTheme');
      const tr = btn.parents('tr');
      const td = tr.find('td');
      const href = $(td[1]).text();
      let sidebar = _this.result.sidebar;

      _this.result.sidebar = jQuery.grep(sidebar, value => {
        return value.href != href;
      });

      sessionStorage.setItem('jsonApp',  JSON.stringify(_this.result));
      _this.formAdminGetListSidebars(true);

      const myJSON = JSON.stringify(_this.result, undefined, 4);

      $('#copyJson').find('#labContentJson').val(myJSON);
      //$('#copyJson').addClass('crr-form__fieldset--active');

      this.helper.copyJson($('#copyJson').find('#labContentJson'), myJSON);
    })
  }

  formAdminSubmit = () => {
    $('#form-admin').on('submit', event => {
      const createJson = new CreateJson();

      // Stop propagation, default.
      event.stopPropagation();
      event.preventDefault();
      const form = event.currentTarget;

      createJson.init(form);

      // Submit form.
     // $(this).parents('form').submit();
    });
  }
}
