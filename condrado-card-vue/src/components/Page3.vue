<template>
<div id="page-3" class="card__page active">
  <section class="card__section">
    <h2 class="card__heading">Proyectos laborales</h2>

    <div class="card__content">
      <div id="timeline" class="timeline">
        <template v-if="projectsJson.proyectsMod">
          <div class="timeline__company" v-for="project in projectsJson.proyectsMod.companies" v-bind:key="project">
            <h3 class="timeline__title">{{project.name}}</h3>
            <template v-for="year in project.years" v-bind:key="year.year">  
              <h4 class="timeline__year">{{year.year}}</h4>
              <template v-for="month in year.months" v-bind:key="month.month"> 
                <h5 class="timeline__month">{{dateJson.date.months[month.month]}}</h5>
                <template v-for="proyect in month.proyects" v-bind:key="proyect.proyect"> 
                  <div class="timeline__event">
                    <div class="timeline__content">
                      <h6 class="timeline__subtitle">{{proyect.title}}</h6>
                      <p class="timeline__description">{{proyect.desc}}</p>
                    </div>
                    <img class="timeline__img" v-bind:src="require('@/assets/images/proyects/' + proyect.logo)">
                  </div>
                </template>
              </template>
            </template>
          </div>
        </template>
      </div>
    </div>

    <div class="card__footer">
      <router-link to="/page2" class="c-btn c-btn--primary c-btn--return">Volver</router-link>
    </div>
  </section>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Page3',
  props: {
    msg: String
  },
  data() {
    return{
        projectsUrl: process.env.VUE_APP_PROJECTS_URL,
        dateUrl: process.env.VUE_APP_DATE_URL,
        projectsJson: {},
        dateJson: {}
    }
  },
  created(){
    this.fetchData();
  },
  methods: {
    fetchData(){
      axios
        .get(this.projectsUrl)
        .then(response => {
          this.projectsJson = response.data;
        })
        .catch(error => {
          console.log(error)
        })

      axios
        .get(this.dateUrl)
        .then(response => {
          this.dateJson = response.data;
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss">
@import "../assets/styles/index.scss";
@import "../assets/styles/06-components/_components.timeline.scss";
</style>
