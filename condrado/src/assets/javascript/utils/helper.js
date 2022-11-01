export default class Helper {
  serializeFiles = form => {
    const formData = [];
    const idForm = $(form).attr('id');
    let formParams = $('#' + idForm + ' [name]:visible' ).serializeArray();

    $.each($(form).find('input[type="file"]'), function(i, tag) {
      $.each($(tag)[0].files, function(i, file) {
        formData.push({"name": tag.name, "value": file.name});
        $
      });
    });

    formParams = $.merge(formParams, formData)

    return formParams;
  }

  actualiceSession = objJSON => {
    sessionStorage.setItem('json', objJSON);
  }

  copyJson = (input, myJSON) => {
    $('#btnCopyJSON').addClass('copy-pending');

    $('#btnCopyJSON').off()
    $('#btnCopyJSON').on('click', e => {
      e.stopPropagation();
      e.preventDefault();

      $('#labContentJson').select();
      document.execCommand("copy");
      $(e.currentTarget).removeClass('copy-pending');
    })

    input.on('focus', e => {
      $(e.currentTarget).select();
      document.execCommand("copy");
      const labaeText = $(e.currentTarget).prev().text();
      $(e.currentTarget).prev().text("JSON copiado")
    });
  }

  orderByNumber = (obj, property, sortOrder) => {
    if (sortOrder !== -1 && sortOrder !== 1) sortOrder = 1;


    return obj.sort((a, b) => {
      return (a[property] - b[property]) * sortOrder;
    })

  }
}
