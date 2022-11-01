/** fetches a json, defaults to pages.json */
module.exports = function(source = 'pages/modules', options) {
  return options.fn(require(__dirname + './assets/data/data.json'));
};
