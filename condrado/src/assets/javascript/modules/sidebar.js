import Scrolly from '../modules/scrolly';

export default class Sidebar {
  constructor() {
    this.sidebar = null;
    this.scrolly = new Scrolly();
  }

  init = () => {
    const $sidebar = $('#sidebar');

    // Sidebar.
    if ($sidebar.length > 0) {

      $.getJSON("https://deliver.kontent.ai/ce66ba9e-273d-00dd-2121-2ca4c9a9450d/items/", result => {
        const items = result.items;
        const $sidebar_ul = $sidebar.find('ul');
        let $sidebar_li = [];
        const wellcome = '<li class="crr-sidebar__list-item"><a class="crr-sidebar__link" href="#intro" title="Bienvenido">Bienvenido</a></li>'
        const aboutMe = '<li class="crr-sidebar__list-item"><a class="crr-sidebar__link" href="#me" title="Sobre mi">Sobre mi</a></li>'
        let int = 0;
        let existTheme = "";

        items.sort(function(a, b) {
          let titleA = a.elements.tema.value.toLowerCase(), titleB = b.elements.tema.value.toLowerCase();

          if (titleA < titleB) return -1;
          if (titleA > titleB) return 1;
          return 0;
        });

        $.each($(items), (i, item) => {
          if (item.system.type === "post" && existTheme.indexOf(item.elements.id_tema.value) < 0) {
            $sidebar_li[int] = ('<li class="crr-sidebar__list-item"><a class="crr-sidebar__link" href="' +
              item.elements.id_tema.value + '" title="' +
              item.elements.tema.value + '">' +
              item.elements.tema.value + '</a></li>');

            existTheme = existTheme + item.elements.id_tema.value;
            int++;
          }
        });

        $sidebar_li.unshift(wellcome);
        $sidebar_li.push(aboutMe);
        $sidebar_ul.append($sidebar_li);

        const $sidebar_a = $sidebar.find('a');

        $sidebar_a.addClass('scrolly').on('click', e => {
          const $this = $(e.currentTarget);

          // External link? Bail.
          if ($this.attr('href').charAt(0) != '#')
            return;

          // Deactivate all links.
          $sidebar_a.removeClass('active');

          // Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
          $this.addClass('active').addClass('active-locked');

        }).each((i, link) => {

          const	$this = $(link),
              id = $this.attr('href'),
              $section = $(id);

          // No section for this link? Bail.
          if ($section.length < 1)
            return;

          // Scrollex.
          $section.scrollex({
            mode: 'middle',
            top: '-20vh',
            bottom: '-20vh',
            initialize: () => {

              // Deactivate section.
              $section.addClass('inactive');

            },
            enter: () => {

              // Activate section.
              $section.removeClass('inactive');

              // No locked links? Deactivate all links and activate this section's one.
              if ($sidebar_a.filter('.active-locked').length == 0) {
                $sidebar_a.removeClass('active');
                $this.addClass('active');
              }

              // Otherwise, if this section's link is the one that's locked, unlock it.
              else if ($this.hasClass('active-locked'))
                $this.removeClass('active-locked');
            }
          });

          if ($sidebar_a.length === i + 1) {
            this.scrolly.init();
            this.moveFirstPage();
          }

        });


        $('.crr-sidebar__hamburger').on('click', e => {
          this.openCloseMenuMobile($(e.currentTarget))
        });

        this.closeHamburger();
      });
    }
  }

  moveFirstPage = () => {
    $('.crr-sidebar__list-item').first().find('a').trigger( "click" );
  }

  openCloseMenuMobile = btn => {
    $('body').toggleClass('menu-mobile--open');
    btn.toggleClass('open');
    $('.crr-sidebar__nav').toggleClass('open');
  }

  closeHamburger = () => {
    window.addEventListener('click', e => {
      const menu = 'crr-sidebar__nav open';
      const click = $(e.target);
      const clickClass = click.attr('class');

      if (clickClass.indexOf(menu) > -1 ||
        click.parents('.crr-sidebar__nav.open').length > 0 ||
        clickClass.indexOf('crr-sidebar__hamburger-btn') > -1 ||
        clickClass.indexOf('crr-sidebar__hamburger') > -1
      ) {
        console.log('1');
      } else {
        if ($('.crr-sidebar__nav.open').length > 0) {
          this.openCloseMenuMobile($('.crr-sidebar__hamburger'))
        }
      }
    });
  }
}
