import Main from '../javascript/modules/main';
import Form from '../javascript/modules/form';
import Sidebar from '../javascript/modules/sidebar';
import Scrolly from '../javascript/modules/scrolly';
import Spotlights from '../javascript/modules/spotlights';
import Features from '../javascript/modules/features';
import PostContent from '../javascript/modules/post-content';

const main = new Main();
const form = new Form();
const sidebar = new Sidebar();
const scrolly = new Scrolly();
const spotlights = new Spotlights();
const features = new Features();
const postContent = new PostContent();

document.addEventListener('DOMContentLoaded', () => {
  main.init();
  form.init();
  spotlights.init();
  sidebar.init();
  scrolly.init();
  features.init();
  postContent.init();
  }, false,
);
