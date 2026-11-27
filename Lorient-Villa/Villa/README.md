# 🍕 Lorient Villa — Sistema de Gerenciamento de Pizzaria

Aplicação desenvolvida em **Java** com o objetivo de simular o gerenciamento de pedidos de uma pizzaria. O projeto permite cadastrar informações de clientes, selecionar pizzas de um cardápio, escolher formas de pagamento e consultar os pedidos realizados.

O sistema foi desenvolvido com foco na prática de **Programação Orientada a Objetos (POO)**, utilizando classes, encapsulamento, listas e enumerações.

## 🎯 Objetivos do projeto

- Aplicar conceitos de Programação Orientada a Objetos.
- Desenvolver um sistema de pedidos utilizando Java.
- Organizar o código em classes com responsabilidades específicas.
- Praticar estruturas de dados e manipulação de coleções.

## ⚙️ Funcionalidades

- **Novo pedido:** cadastro de nome, telefone e endereço do cliente.
- **Cardápio:** seleção de pizzas com sabores e preços predefinidos.
- **Múltiplos itens:** possibilidade de adicionar mais de uma pizza ao pedido.
- **Formas de pagamento:** dinheiro, cartão ou Pix.
- **Cálculo do pedido:** soma automática dos preços das pizzas selecionadas.
- **Listagem de pedidos:** consulta dos pedidos realizados durante a execução.
- **Status do pedido:** estrutura preparada para representar etapas como em preparo, saiu para entrega e entregue.

## 🛠️ Tecnologias utilizadas

- Java
- Programação Orientada a Objetos (POO)
- Java Collections Framework (`ArrayList` e `List`)
- Enumerações (`enum`)
- Java Scanner para entrada de dados pelo terminal

## 🏗️ Estrutura do projeto

```text
Villa/
├── src/
│   ├── Main.java
│   ├── Cliente.java
│   ├── Pizza.java
│   ├── Pedido.java
│   ├── Pizzaria.java
│   ├── FormaPagamento.java
│   └── PedidoStatus.java
│
├── bin/
├── .vscode/
└── README.md
```

### Responsabilidade das classes

| Classe | Responsabilidade |
|---|---|
| `Main` | Executa o sistema e apresenta os menus de interação. |
| `Cliente` | Armazena os dados do cliente. |
| `Pizza` | Representa uma pizza, com sabor e preço. |
| `Pedido` | Gerencia as pizzas, o pagamento, o status e o valor total. |
| `Pizzaria` | Armazena e lista os pedidos realizados. |
| `FormaPagamento` | Define as formas de pagamento disponíveis. |
| `PedidoStatus` | Define os possíveis estados de um pedido. |

## ▶️ Como executar o projeto

### Pré-requisitos

- Java JDK instalado.
- Visual Studio Code ou outra IDE de sua preferência.
- Terminal ou prompt de comando.

### 1. Clone o repositório

```bash
git clone https://github.com/GabrielNsZ/Projetos.git
```

### 2. Acesse a pasta do projeto

```bash
cd Projetos/Lorient-Villa/Villa
```

### 3. Compile os arquivos Java

```bash
javac -d bin src/*.java
```

### 4. Execute a aplicação

```bash
java -cp bin Main
```

## 🖥️ Menu principal

Ao executar a aplicação, será apresentado um menu interativo no terminal:

```text
--- MENU PIZZARIA ---
1. Fazer novo pedido
2. Listar pedidos
3. Sair

Escolha uma opção:
```

O usuário pode realizar um novo pedido, consultar os pedidos cadastrados durante a execução ou encerrar o programa.

## 📌 Observações

- O sistema utiliza armazenamento em memória, sem banco de dados.
- Os pedidos são mantidos somente enquanto a aplicação está em execução.
- O cardápio possui sabores e preços definidos diretamente no código.
- A aplicação funciona por meio de interação no terminal, sem interface gráfica.

## 📚 Aprendizados

Este projeto proporcionou a prática de conceitos fundamentais de Java, especialmente:

- Criação e organização de classes e objetos.
- Encapsulamento de atributos e métodos.
- Relacionamento entre diferentes classes.
- Utilização de listas para armazenamento de pedidos.
- Implementação de enumerações.
- Desenvolvimento de menus interativos pelo terminal.

## 👨‍💻 Desenvolvedor

**Gabriel Nascimento**

Estudante de Ciência da Computação e desenvolvedor em formação.

[GitHub — GabrielNsZ](https://github.com/GabrielNsZ)

---

*Projeto acadêmico desenvolvido para praticar Java e Programação Orientada a Objetos.*
