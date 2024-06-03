# React Micro Frontend Todo List

## Configuração e Execução

1. Clone o repositório.
2. Instale as dependências: `npm install`.
3. Inicie a aplicação: `npm start`.
4. Execute os testes: `npm test`.

## Arquitetura e Decisões de Design

- O componente `TodoList` utiliza o estado local e `localStorage` para persistência.
- A aplicação está escrita em TypeScript para garantir segurança de tipos.
- Utilizei os princípios de micro frontends para garantir a integração independente em várias aplicações.
- Os testes foram escritos utilizando `@testing-library/react` para garantir a cobertura significativa do componente.
