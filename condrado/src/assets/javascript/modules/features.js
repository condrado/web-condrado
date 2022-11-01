export default class Features {
  init = () => {
    $('.features').scrollex({
      mode: 'middle',
      top: '-20vh',
      bottom: '-20vh',
      initialize: () => {

        // Deactivate section.
        $(this).addClass('inactive');

      },
      enter: () => {

        // Activate section.
        $(this).removeClass('inactive');

      }
    });
  }
}
