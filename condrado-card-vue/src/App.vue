<template>
  <div class="card">
    <div :class="{ 'hide-card': isHideCard }" class="card___container ">
      <div class="card__overview">
        <router-view/>
      </div>
      <ul class="card__tags">
        <li class="card__tag">
            <a class="card__tag-link" target="_blank" href="https://codepen.io/condrado/pens/">Codepen</a>
        </li>
        <li class="card__tag">
            <a class="card__tag-link" target="_blank" href="https://github.com/conradoTCK">Github</a>
        </li>
        <li class="card__tag">
            <a class="card__tag-link" target="_blank" href="https://es.linkedin.com/in/conrado-ramos-rivas-36973230">Linkedin</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      isHideCard: true,
    }
  },
  mounted(){
    setTimeout(() => {
      this.isHideCard = false;
    }, 1000)
  }
}
</script>

<style lang="scss">
  @import "./assets/styles/index.scss";
  @import "./assets/styles/06-components/_components.button.scss";
  @import "./assets/styles/06-components/_components.card.scss";
</style>
