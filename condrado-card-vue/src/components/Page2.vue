<template>
<div id="page-2" class="card__page">
    <section class="card__section">
        <h2 class="card__heading">Secciones</h2>

        <splide :options="options">
          <splide-slide>
             <router-link to="/page3">Proyectos laborales</router-link>
          </splide-slide>
          <splide-slide>
             <router-link to="/page3">Ideas</router-link>
          </splide-slide>
          <splide-slide>
             <router-link to="/page3">Proyectos personales</router-link>
          </splide-slide>
        </splide>

        <div class="card__footer">
            <router-link to="/" class="c-btn c-btn--primary c-btn--return">Volver</router-link>
        </div>
    </section>
</div>
</template>

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
export default {
  name: 'Page2',
  props: {
    msg: String
  },
  components: {
    Splide,
    SplideSlide,
  },
  data() {
    return {
      options: {
        type   : 'loop',
        perPage: 1,
        gap    : '1rem',
        drag   : true,
        padding: {
          right: '5rem',
          left : '5rem',
        },
      },
    };
  },
}
</script>

<style lang="scss">
@import "../assets/styles/index.scss";
@import "../../node_modules/@splidejs/splide/dist/css/themes/splide-default.min.css";

#page-2 {
  .card {
    &__section {
      padding: rem(76) 0 0 0;
    } 
  }
  
  .splide {
    height: 100%;

    &__track {
      height: inherit;
    }

    &__list {
      height: inherit;
    }

    &__slide {
      text-align: center;
      border: 1px solid;
      height: inherit;

      a {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
}
</style>
