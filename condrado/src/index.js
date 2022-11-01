import _ from 'lodash';
import './src/assets/css/app.css';
import './src/assets/images/pic02.jpg';
import './src/assets/images/pic03.jpg';
import './src/assets/images/pic04.jpg';
import './src/assets/images/pic05.jpg';
import './src/assets/images/pic06.jpg';
import './src/assets/images/pic01.jpg';
import './src/assets/images/logo-repsol.jpg';


const indexTemplate = require('./views/pages/index.hbs');

function component() {
  const element = document.createElement('div');
debugger
  //element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  div.innerHTML = indexTemplate();

  return element;
}

document.body.appendChild(component());
