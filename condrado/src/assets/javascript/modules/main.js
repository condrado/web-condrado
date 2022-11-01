import { breakpoints } from '../utils/constants';

export default class Main {
  init = () => {
    const	$window = $(window),
      $body = $('body');

    // Hack: Enable IE flexbox workarounds.
    if (browser.name == 'ie')
      $body.addClass('is-ie');

    // Play initial animations on page load.
    $window.on('load', () => {

      window.setTimeout(() => {
        $body.removeClass('is-preload');
      }, 100);
    });
  }
}
