const { expect } = require('chai');
const sinon = require('sinon');
const dataProvider = require('../index');

describe('Função dataProvider', () => {
  it('deve ser uma função', () => {
    expect(dataProvider).to.be.a('function');
  });

  it('deve criar testes para cada item de dados', () => {
    const testName = 'Teste DataProvider';
    const dataSet = [      { input: 'Teste1', expected: 'Resultado1' },      { input: 'Teste2', expected: 'Resultado2' },    ];
    const testFunction = sinon.spy();

    // Criar um spy para o `it` global
    const itSpy = sinon.spy();
    const originalIt = global.it;
    global.it = itSpy;

    // Chamar o dataProvider
    dataProvider(testName, dataSet, testFunction);

    // Verificar se `it` foi chamado para cada item de dados
    expect(itSpy.calledTwice).to.be.true;

    // Verificar os nomes dos testes
    expect(itSpy.firstCall.args[0]).to.equal('Teste DataProvider - Conjunto de dados #1');
    expect(itSpy.secondCall.args[0]).to.equal('Teste DataProvider - Conjunto de dados #2');

    // Executar as funções de teste e verificar se `testFunction` foi chamado com os dados corretos
    itSpy.firstCall.args[1](); // Chama testFunction com dataSet[0]
    itSpy.secondCall.args[1](); // Chama testFunction com dataSet[1]

    expect(testFunction.calledTwice).to.be.true;
    expect(testFunction.firstCall.args[0]).to.deep.equal(dataSet[0]);
    expect(testFunction.secondCall.args[0]).to.deep.equal(dataSet[1]);

    // Restaurar o `it` global
    global.it = originalIt;
  });

  it('deve usar formatName se fornecido', () => {
    const testName = 'Teste DataProvider';
    const dataSet = [{ input: 'Teste1', expected: 'Resultado1' }];
    const testFunction = sinon.spy();
    const formatName = sinon.stub().returns('Nome Personalizado');

    // Criar um spy para o `it` global
    const itSpy = sinon.spy();
    const originalIt = global.it;
    global.it = itSpy;

    // Chamar o dataProvider com formatName
    dataProvider(testName, dataSet, testFunction, formatName);

    // Verificar se `formatName` foi chamado corretamente
    expect(formatName.calledOnce).to.be.true;
    expect(formatName.firstCall.args[0]).to.deep.equal(dataSet[0]);
    expect(formatName.firstCall.args[1]).to.equal(0);

    // Verificar se o `it` foi chamado com o nome personalizado
    expect(itSpy.calledOnce).to.be.true;
    expect(itSpy.firstCall.args[0]).to.equal('Nome Personalizado');

    // Executar a função de teste
    itSpy.firstCall.args[1]();

    // Verificar se `testFunction` foi chamado
    expect(testFunction.calledOnce).to.be.true;

    // Restaurar o `it` global
    global.it = originalIt;
  });

  it('deve lidar com dataSet vazio', () => {
    const testName = 'Teste DataProvider';
    const dataSet = [];
    const testFunction = sinon.spy();

    // Criar um spy para o `it` global
    const itSpy = sinon.spy();
    const originalIt = global.it;
    global.it = itSpy;

    // Chamar o dataProvider
    dataProvider(testName, dataSet, testFunction);

    // Verificar que `it` não foi chamado
    expect(itSpy.notCalled).to.be.true;

    // Restaurar o `it` global
    global.it = originalIt;
  });

  it('deve lançar um erro se dataSet não for fornecido', () => {
    const testName = 'Teste DataProvider';
    const testFunction = sinon.spy();

    expect(() => dataProvider(testName, null, testFunction)).to.throw(
      TypeError,
      'dataSet deve ser um array'
    );
  });

  it('deve lançar um erro se testFunction não for fornecido', () => {
    const testName = 'Teste DataProvider';
    const dataSet = [{ input: 'Teste1' }];

    expect(() => dataProvider(testName, dataSet, null)).to.throw(
      TypeError,
      'testFunction deve ser uma função'
    );
  });
});