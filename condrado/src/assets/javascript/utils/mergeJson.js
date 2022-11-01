const glob = require('glob');
const path = require('path');

module.exports = function mergeJSON(absoluteGlobPattern) {
  const dataFiles = glob.sync(absoluteGlobPattern);
  let resultingData = {};
  const idsAdded = [];
  dataFiles.forEach(filepath => {
    const id = path.basename(filepath, '.json');
    if (idsAdded.find(idArr => idArr === id)) {
      throw new Error(
        `Duplicate id '${id}'. It has already been added to result.`,
      );
    }
    idsAdded.push(id);
    resultingData = { ...resultingData, ...require(filepath) };
  });
  return resultingData;
};
