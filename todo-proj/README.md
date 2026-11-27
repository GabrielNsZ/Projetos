# 📱 To-Do Mobile — Aplicativo de Gerenciamento de Tarefas

Aplicativo mobile desenvolvido com **React Native e JavaScript**, com o objetivo de facilitar a organização de atividades e tarefas do dia a dia.

O projeto permite cadastrar tarefas, visualizar a lista de atividades e remover itens concluídos ou que não são mais necessários. Os dados são armazenados localmente no dispositivo utilizando AsyncStorage.

## 🎯 Objetivos do projeto

- Desenvolver uma aplicação mobile utilizando React Native.
- Praticar conceitos de desenvolvimento de interfaces.
- Implementar navegação entre telas.
- Trabalhar com armazenamento local de informações.
- Aplicar conceitos de componentes reutilizáveis e gerenciamento de estado.

## ⚙️ Funcionalidades

- **Listagem de tarefas:** visualização das atividades cadastradas.
- **Cadastro de tarefas:** criação de novas atividades por meio de um campo de texto.
- **Remoção de tarefas:** exclusão de atividades da lista.
- **Armazenamento local:** persistência dos dados utilizando AsyncStorage.
- **Navegação entre telas:** alternância entre a lista de tarefas e a tela de cadastro.

## 🛠️ Tecnologias utilizadas

- **JavaScript:** linguagem principal do projeto.
- **React Native:** desenvolvimento da aplicação mobile.
- **React:** construção dos componentes e gerenciamento de estado.
- **React Navigation:** navegação entre telas.
- **AsyncStorage:** armazenamento local das tarefas.
- **React Native Vector Icons:** utilização de ícones na interface.

## 🏗️ Estrutura do projeto

```text
todo-proj/
├── App.js
└── src/
    ├── components/
    │   └── TaskItem.js
    │
    └── screens/
        ├── HomeScreen.js
        └── AddScreen.js
```

### Responsabilidade dos arquivos

| Arquivo | Responsabilidade |
|---|---|
| `App.js` | Configura a navegação principal do aplicativo. |
| `HomeScreen.js` | Exibe as tarefas cadastradas e permite removê-las. |
| `AddScreen.js` | Permite cadastrar e salvar novas tarefas. |
| `TaskItem.js` | Componente responsável pela apresentação individual de cada tarefa. |

## 💾 Armazenamento de dados

O aplicativo utiliza o **AsyncStorage** para armazenar as tarefas localmente.

As informações são salvas no dispositivo em formato JSON, utilizando a chave:

```javascript
@minhas_tarefas
```

Cada tarefa possui os seguintes atributos:

```javascript
{
  id: Date.now(),
  text: "Descrição da tarefa",
  completed: false
}
```

## ▶️ Como executar o projeto

### Pré-requisitos

- Node.js instalado.
- Ambiente React Native configurado.
- Android Studio ou dispositivo Android para execução, conforme a configuração do projeto.
- Dependências do React Native e bibliotecas utilizadas instaladas.

### Execução

Após configurar as dependências e o ambiente de desenvolvimento:

1. Abra a pasta do projeto no Visual Studio Code.
2. Instale as dependências necessárias.
3. Inicie o ambiente de execução React Native.
4. Execute o aplicativo em um emulador ou dispositivo compatível.

> **Observação:** o repositório atualmente não contém o `package.json`. Por isso, é necessário restaurar ou configurar as dependências antes de executar os comandos de instalação e inicialização.

## 📚 Aprendizados

Durante o desenvolvimento deste projeto, foram praticados conceitos como:

- Desenvolvimento mobile com React Native.
- Componentização de interfaces.
- Hooks do React, como `useState` e `useEffect`.
- Navegação entre telas.
- Manipulação de listas com `FlatList`.
- Operações assíncronas com AsyncStorage.
- Persistência de dados localmente.

## 🚀 Possíveis melhorias futuras

- Implementar edição de tarefas.
- Adicionar opção para marcar tarefas como concluídas.
- Criar filtros para tarefas pendentes e concluídas.
- Melhorar o design e a experiência de usuário.
- Implementar notificações e lembretes.

## 👨‍💻 Desenvolvedor

**Gabriel Nascimento**

Estudante de Ciência da Computação e desenvolvedor em formação.

[GitHub — GabrielNsZ](https://github.com/GabrielNsZ)

---

*Projeto desenvolvido para praticar desenvolvimento mobile, JavaScript e React Native.*
