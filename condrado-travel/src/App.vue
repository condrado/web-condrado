<template>
  <div class="container">
    <div class="m-fondo-0">
        <div class="m-fondo__container-0">

        </div>
    </div>
    <div class="m-fondo-1" :style="styleFondo1" :class="classFondo1" ref="refFondo1">
      <Fondo 
        :startFondo1="startFondo1"
        :refFondo1="refFondo1"
      />
    </div>

    <div class="m-fondo-2" :style="styleFondo1" :class="classFondo1" ref="refFondo2">
      <div class="m-fondo__container" :data-start="startFondo1">

      </div>
    </div>
    <button class="m-btn m-btn__primary" v-on:click="start">Start</button>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Fondo from './components/fondo.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    Fondo
  },
  data() {
    return {
      styleFondo1: '',
      classFondo1: '',
      startFondo1: false,
      styleFondo2: '',
      classFondo2: '',
      startFondo2: false,
      refFondo1: {}
    }
  },
  methods: {
    start (event) {
      let w1 =  1440 - screen.width
      let w2 =  5500 - screen.width
      // const h = screen.height
      const l1 = this.$refs['refFondo1'].getBoundingClientRect().x
      // const l2 = this.$refs['refFondo2'].getBoundingClientRect().x

      if (l1 !== 0 && this.startFondo1) {
        // w1 = (-1 * (l1 - 100))
        // w2 = (-1 * (l2 - 100))

        this.startFondo1 = false
        this.startFondo2 = false
      } else {
        this.startFondo1 = true
        this.startFondo2 = true
      }
      
      console.log(event)
      this.styleFondo1 = 'left: ' + (-1 * w1) + 'px;'
      this.styleFondo2 = 'left: ' + (-1 * w2) + 'px;'
    }
  },
}
</script>

<style>
body {
  overflow: hidden;
  width: 100%;
  height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

.container {
  overflow: hidden;
  width: 100%;
  height: 100vh;
}

.m-btn {
  position: absolute;
  margin-top: 340px;
  bottom: 0;
  left: 0;
}

.m-fondo-0 {
  background-color: #134E7E;
  background-image: url('assets/images/bg-1.svg');
  background-position: center top;
  background-size: 100vw;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
}

.m-fondo-1 {
  transition: left 60s ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
  /* width: calc(100vw * 2); */
  width: 1440px;
  margin-top: 210px;
}

.m-fondo-2 {
  transition: left 30s ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
  /* width: calc(100vw * 2); */
  width: 5500px;
  margin-top: 380px;
}

.m-fondo__container {
  background-image: url('assets/images/bg-3a.svg');
  background-position: left top;
  background-size: 120vw;
  background-repeat: no-repeat;
  height: 170px;
  position: relative;
}

.m-fondo__container-0 {
  background-image: url('assets/images/bg-3b.svg');
  background-position: center top;
  background-size: 66vw;
  background-repeat: no-repeat;
  height: 170px;
  position: absolute;
  width: 100vw;
  margin-top: 411px;
  z-index: 1;
}

.m-fondo__container img {
  width: 1440px;
} 

</style>
