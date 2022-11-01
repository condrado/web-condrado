<template>
<Page1></Page1>
</template>

<script>
import Page1 from './Page1.vue'
export default {
  components: { Page1 },
  name: 'Home',
  props: {
    msg: String
  }
}
</script>


<style lang="scss" scoped>
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
    }
}
</style>
