export default class Scrolly {
  constructor() {

  }

  init = () => {
    const $sidebar = $('#sidebar');

    // Breakpoints.
    breakpoints({
      xlarge:   [ '1281px',  '1680px' ],
      large:    [ '981px',   '1280px' ],
      medium:   [ '737px',   '980px'  ],
      small:    [ '481px',   '736px'  ],
      xsmall:   [ null,      '480px'  ]
    });

    // Scrolly.
    $('.scrolly').scrolly({
      speed: 1000,
      offset: function() {

        // If <=large, >small, and sidebar is present, use its height as the offset.
        if (breakpoints.active('<=large')
          &&	!breakpoints.active('<=small')
          &&	$sidebar.length > 0)
          return $sidebar.height();

        return 0;
      }
    });
  }
}
