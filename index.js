// index.js

function dataProvider(testName, dataSet, testFunction, formatName) {
  if (!Array.isArray(dataSet)) {
    throw new TypeError('dataSet deve ser um array');
  }
  if (typeof testFunction !== 'function') {
    throw new TypeError('testFunction deve ser uma função');
  }
  dataSet.forEach((data, index) => {
    const name = formatName
      ? formatName(data, index)
      : `${testName} - Conjunto de dados #${index + 1}`;
    it(name, function () {
      testFunction(data);
    });
  });
}

module.exports = dataProvider;

