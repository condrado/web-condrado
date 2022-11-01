<template>
<div id="page-1" class="card__page active">
    <section class="card__section">
        <figure class="card__figure">
            <img class="card__photo" src="../assets/images/conrado.jpg" alt="Fotagrafia de Conrado Ramos">
        </figure>
        
        <div class="card__content">
            <h1 class="card__heading">Conrado Ramos Rivas</h1>

            <p class="card__text">
                Mi nombre es Conrado. Actualmente vivo en Madrid y me encanta andar por la ciudad y disfrutar de ella.
            </p>
            <p class="card__text">
                Me dedico al desarrollo web y llevo mas de 11 años trabajando de ello. Si queres saber más de mis trabajos, recomendaciones y trucos en el mundo web no dudes en continuar viendo mi web cotilleando las sección que mas te interese.
            </p>
            <p class="card__text">
                Por cierto, ¡muchas gracias por visitarme!
            </p>
        </div>

        <div class="card__footer">
          <router-link to="/page2" class="c-btn c-btn--primary c-btn--return">Continuar</router-link>
        </div>
    </section>
</div>
</template>

<script>
export default {
  name: 'Page',
  props: {
    msg: String
  }
}
</script>

<style lang="scss">
@import "../assets/styles/index.scss";

#page-1 {
    &::before {
        content: '';
        width: rem(880);
        height: rem(880);
        left: calc(50% - 440px);
        top: rem(-700);
        background-color: $color-blue-04;
        position: absolute;
        border-radius: 50%;
        opacity: .8;
    }
    &::after {
        content: '';
        width: rem(880);
        height: rem(880);
        left: calc(50% - 455px);
        top: rem(-690);
        background-color: $color-blue-04;
        position: absolute;
        border-radius: 50%;
        opacity: .3;
    }

    .card {
        &__section {
            padding: 0;

            .card__heading {
                position: static;
            }
        }

        &__heading,
        &__footer {
            box-shadow: none;
        } 

        &__heading{
            &::after {
              display: none;
            }
        } 
    }
}
</style>
