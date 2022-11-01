<template>
  <div class="m-fondo__container" :data-start="startFondo1">
    <!-- <img :src="require(`../assets/images/bg-2.svg`)" alt="f"> -->
  </div>
</template>

<script>
export default {
  name: 'Fondo',
  data() {
    return {
      startFondo: this.startFondo1
    }
  },
  props: {
    styleFondo1: String,
    classFondo1: String,
    startFondo1: Boolean,
    refFondo1: Object
  },
  computed: {
    styleFondo () {
      return '2'
    }
  },
  mounted() {
    this.startFondo = this.startFondo1
    this.$emit('refFondo1', this.$refs)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-fondo__container {
  background-image: url('../assets/images/bg-2.svg');
  background-position: left top;
  background-size: 120vw;
  background-repeat: no-repeat;
  height: 423px;
}

.m-fondo__container img {
  width: 1440px;
} 
</style>
