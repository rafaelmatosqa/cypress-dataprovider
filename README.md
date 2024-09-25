# cypress-dataprovider

Fornece funcionalidade de DataProvider para testes Cypress, permitindo a execução de testes orientados a dados de forma simples e organizada.

## Instalação

Instale o pacote via npm:

```bash
npm install cypress-dataprovider
```

## Uso

```javascript
const dataProvider = require("cypress-dataprovider");

const testData = [
  { input: "Teste1", expected: "Resultado1" },
  { input: "Teste2", expected: "Resultado2" },
  { input: "Teste3", expected: "Resultado3" },
];

describe("Testes com DataProvider", () => {
  dataProvider("Deve validar o resultado correto", testData, (data) => {
    // Seu teste aqui usando data.input e data.expected
    cy.visit("/pagina-de-teste");
    cy.get("#input").type(data.input);
    cy.get("#submit").click();
    cy.get("#output").should("contain", data.expected);
  });
});
```

## Personalizando o Nome dos Testes

Você pode fornecer uma função opcional formatName para personalizar o nome de cada teste:

```javascript
dataProvider(
  "Teste Base",
  testData,
  (data) => {
    // Seu teste aqui
  },
  (data, index) => `Validando input: ${data.input} (Conjunto ${index + 1})`
);
```
