export default class PostContent {
  init = () => {
    const postContent = $('.crr-post-content');

    if (postContent.length > 0) {
      const codename = sessionStorage.getItem('codename');

      $.getJSON("https://deliver.kontent.ai/ce66ba9e-273d-00dd-2121-2ca4c9a9450d/items/" + codename, result => {
        $('.crr-post-content__title').text(result.item.elements.titulo_post.value);
        $('.crr-breadcrumb__link--theme').text(result.item.elements.tema.value);
        $('.crr-breadcrumb__text').text(result.item.elements.titulo_post.value);
        $('.crr-post-content__content').append(result.item.elements.untitled_rich_text.value);
        $('.crr-post-content__figure').append('<img class="crr-post-content__img" src="' +
          result.item.elements.imagen_post.value[0].url + '" alt="">');
      });

    }
  }
}
