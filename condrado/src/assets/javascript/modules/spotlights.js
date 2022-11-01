import template from '../../../views/pages/modules/spotlights.hbs';


export default class Spotlights {
  constructor() {

  }

  init = () => {
    this.createSpotlightsSection();
  }

  createSpotlightsSection = () => {

    $.getJSON("https://deliver.kontent.ai/ce66ba9e-273d-00dd-2121-2ca4c9a9450d/items/", result => {
      this.createSpotlights(result);
      this.spotlightsPage();
    })
  }

  createSpotlights = result => {
    const pages = result.items
    const spotlightsGroup = $('#spotlights');
    const subObj = {};
    const subObjsOrder = {};
    let maxElement = "";

    pages.sort(function(a,b){
      return new Date(b.system.last_modified).getTime() - new Date(a.system.last_modified).getTime()
    });

    pages.sort(function(a, b) {
      let titleA = a.elements.tema.value.toLowerCase(), titleB = a.elements.tema.value.toLowerCase();

      if (titleA < titleB) return -1;
      if (titleA > titleB) return 1;
      return 0;
    });

    $.each($(pages), (i, page) => {
      if (page.system.type === "post") {
        const idHref = page.elements.id_tema.value;
        const id = idHref.slice(1);
        const codename = page.system.codename;

        if (maxElement.indexOf(idHref) < 0) {
          const image = page.elements.imagen_post.value.length > 0 ? page.elements.imagen_post.value[0].url : "";
          const sectionInit = '<section class="crr-spotlights__item">'
          const sectionEnd = '</section>'

          const sectionContent =
            '<a href="post.html" data-codename="' + codename + '" data-theme="' + page.elements.tema.value + '" class="crr-spotlights__link image"><img src="' + image + '" alt="' + page.elements.titulo_post.value + '" data-position="left center" /></a>' +
            '<div class="content">' +
            ' <div class="inner">' +
            '  <h3 class="crr-spotlights__title-post">' + page.elements.titulo_post.value + '</h3>' +
            '  <p>' + page.elements.resumen_del_post.value + '</p>' +
            '  <ul class="actions">' +
            '   <li><a href="post.html" data-codename="' + codename + '" class="crr-spotlights__link button">Más información</a></li>' +
            '  </ul>' +
            ' </div>' +
            '</div>'

          if (typeof subObj[id] === 'undefined') {
            subObj[id] = [];
          }

          subObj[id].push(sectionInit + sectionContent + sectionEnd);

          if (subObj[id].length === 6) {
            maxElement = maxElement + idHref;
          }
        }
      }
    })

    Object.keys(subObj).sort().forEach(function(key) {
      subObjsOrder[key] = subObj[key];
    });

    Object.keys(subObjsOrder).map(function(subObjOrder, index) {
      const posts = subObjsOrder[subObjOrder];
      const sectionIni = '<section id="' + subObjOrder + '" class="crr-spotlights wrapper fade-up"><h2 class="crr-spotlights__title"></h2>';
      const sectionEnd = '</section>';
      let postsStr = '';

      $.each($(posts), (i, post) => {
        postsStr = postsStr + post;
      })

      spotlightsGroup.append(sectionIni + postsStr + sectionEnd);
    });

    $.each($('[data-theme]'), (i, postLink) => {
      const titule = $(postLink).attr('data-theme');
      $(postLink).parents('.crr-spotlights').find('.crr-spotlights__title').text(titule);
    })

    this.eventOpenPost();
  }

  spotlightsPage = () => {
    $('.crr-spotlights > section')
      .scrollex({
        mode: 'middle',
        top: '-10vh',
        bottom: '-10vh',
        initialize: function() {

          // Deactivate section.
          $(this).addClass('inactive');

        },
        enter: function() {

          // Activate section.
          $(this).removeClass('inactive');

        }
      })
      .each(function() {

        var	$this = $(this),
          $image = $this.find('.image'),
          $img = $image.find('img'),
          x;

        // Assign image.
        $image.css('background-image', 'url(' + $img.attr('src') + ')');

        // Set background position.
        if (x = $img.data('position'))
          $image.css('background-position', x);

        // Hide <img>.
        $img.hide();

      });
  }

  eventOpenPost = () => {
    $('.crr-spotlights__link').on('click', e => {
      const href = $(e.currentTarget).attr('href');
      const codename = $(e.currentTarget).attr('data-codename');

      sessionStorage.setItem('codename', codename);
      window.location = href;
    })
  }
}
