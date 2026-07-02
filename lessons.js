/*
  Conteúdo do curso de Python.
  Cada módulo tem:
    - id, titulo, nivel, intro
    - blocos: lista de blocos de conteúdo
        tipo "texto"     -> { html }
        tipo "exemplo"   -> { titulo, codigo, explicacao }
        tipo "quiz"      -> { pergunta, opcoes[], correta (índice), explicacao }
        tipo "complete"  -> { enunciado, dica, codigoInicial, solucao, saidaEsperada }
        tipo "desafio"   -> { enunciado, dica, codigoInicial, solucao, saidaEsperada }
*/
window.CURSO = [
  {
    id: "intro",
    titulo: "Primeiros passos e print()",
    nivel: "Básico",
    intro: "Python é uma linguagem simples e legível. Vamos começar mostrando textos na tela com a função print().",
    blocos: [
      {
        tipo: "texto",
        html: `
          <p>O <code class="inline">print()</code> é a função que exibe informações na tela. É a primeira ferramenta que todo programador aprende.</p>
          <ul>
            <li>Textos ficam entre aspas: <code class="inline">"Olá"</code> ou <code class="inline">'Olá'</code>.</li>
            <li>Números <strong>não</strong> usam aspas: <code class="inline">print(42)</code>.</li>
            <li>Você pode imprimir vários itens separando por vírgula.</li>
          </ul>`
      },
      {
        tipo: "exemplo",
        titulo: "Seu primeiro programa",
        codigo: `print("Olá, mundo!")\nprint("Estou aprendendo Python")\nprint(2 + 3)`,
        explicacao: "Cada print() ocupa uma linha. Repare que 2 + 3 é calculado e mostra 5, porque não está entre aspas."
      },
      {
        tipo: "exemplo",
        titulo: "Imprimindo vários valores juntos",
        codigo: `print("Idade:", 15)\nprint("Nota:", 7.5, "aprovado")`,
        explicacao: "A vírgula dentro do print() insere um espaço automático entre os itens."
      },
      {
        tipo: "quiz",
        pergunta: "O que este código imprime? <code class='inline'>print(\"5\" )</code>",
        opcoes: ["O número 5 (resultado de uma conta)", "O texto 5", "Um erro", "Nada"],
        correta: 1,
        explicacao: "Como o 5 está entre aspas, ele é tratado como texto (string), não como número."
      },
      {
        tipo: "complete",
        enunciado: "Complete o código para imprimir exatamente: <code class='inline'>Bem-vindo ao Python!</code>",
        dica: "Use print() com o texto entre aspas.",
        codigoInicial: `# Complete a linha abaixo\nprint()`,
        solucao: `print("Bem-vindo ao Python!")`,
        saidaEsperada: "Bem-vindo ao Python!"
      },
      {
        tipo: "desafio",
        enunciado: "Escreva um programa que imprima seu nome em uma linha e sua idade em outra linha.",
        dica: "Use dois comandos print(): um para o nome e outro para a idade.",
        codigoInicial: `# Escreva seu código aqui\n`,
        solucao: `print("Maria")\nprint(15)`,
        saidaEsperada: null
      }
    ]
  },

  {
    id: "variaveis",
    titulo: "Variáveis e tipos de dados",
    nivel: "Básico",
    intro: "Variáveis são caixas com nome onde guardamos valores. Cada valor tem um tipo (texto, número inteiro, decimal ou verdadeiro/falso).",
    blocos: [
      {
        tipo: "texto",
        html: `
          <p>Para criar uma variável, usamos <code class="inline">nome = valor</code>. O sinal de igual significa "guarde este valor".</p>
          <h4>Principais tipos</h4>
          <ul>
            <li><code class="inline">str</code> — texto (string): <code class="inline">"Ana"</code></li>
            <li><code class="inline">int</code> — número inteiro: <code class="inline">42</code></li>
            <li><code class="inline">float</code> — número decimal: <code class="inline">3.14</code></li>
            <li><code class="inline">bool</code> — verdadeiro/falso: <code class="inline">True</code> ou <code class="inline">False</code></li>
          </ul>`
      },
      {
        tipo: "exemplo",
        titulo: "Criando e usando variáveis",
        codigo: `nome = "Ana"\nidade = 20\naltura = 1.65\nprint("Nome:", nome)\nprint("Idade:", idade)\nprint("Altura:", altura)`,
        explicacao: "Guardamos três valores e depois os exibimos. Uma variável pode ser reutilizada quantas vezes quiser."
      },
      {
        tipo: "exemplo",
        titulo: "Descobrindo o tipo com type()",
        codigo: `print(type("Ana"))\nprint(type(20))\nprint(type(1.65))\nprint(type(True))`,
        explicacao: "A função type() revela o tipo de um valor. Muito útil para entender o que você está manipulando."
      },
      {
        tipo: "quiz",
        pergunta: "Qual é o tipo do valor <code class='inline'>3.14</code>?",
        opcoes: ["int", "str", "float", "bool"],
        correta: 2,
        explicacao: "Números com casa decimal (ponto) são do tipo float."
      },
      {
        tipo: "complete",
        enunciado: "Crie uma variável chamada <code class='inline'>cidade</code> com o valor <code class='inline'>São Paulo</code> e imprima-a.",
        dica: "Primeiro atribua o valor, depois use print(cidade).",
        codigoInicial: `cidade = \nprint(cidade)`,
        solucao: `cidade = "São Paulo"\nprint(cidade)`,
        saidaEsperada: "São Paulo"
      },
      {
        tipo: "desafio",
        enunciado: "Crie variáveis para um produto: nome, preço e quantidade. Depois imprima uma linha assim: <code class='inline'>Produto: Caneta | Preço: 2.5 | Qtd: 10</code>",
        dica: "Use print() com vírgulas ou monte o texto separando os itens.",
        codigoInicial: `nome = "Caneta"\npreco = 2.5\nqtd = 10\n# Complete abaixo\n`,
        solucao: `nome = "Caneta"\npreco = 2.5\nqtd = 10\nprint("Produto:", nome, "| Preço:", preco, "| Qtd:", qtd)`,
        saidaEsperada: "Produto: Caneta | Preço: 2.5 | Qtd: 10"
      }
    ]
  },

  {
    id: "operadores",
    titulo: "Operadores e cálculos",
    nivel: "Básico",
    intro: "Python é uma ótima calculadora. Vamos ver operadores matemáticos e como combinar textos.",
    blocos: [
      {
        tipo: "texto",
        html: `
          <h4>Operadores matemáticos</h4>
          <ul>
            <li><code class="inline">+</code> soma, <code class="inline">-</code> subtração</li>
            <li><code class="inline">*</code> multiplicação, <code class="inline">/</code> divisão</li>
            <li><code class="inline">//</code> divisão inteira, <code class="inline">%</code> resto (módulo)</li>
            <li><code class="inline">**</code> potência</li>
          </ul>`
      },
      {
        tipo: "exemplo",
        titulo: "Contas básicas",
        codigo: `print(10 + 3)\nprint(10 / 3)\nprint(10 // 3)\nprint(10 % 3)\nprint(2 ** 4)`,
        explicacao: "10/3 dá decimal, 10//3 dá só a parte inteira (3), 10%3 dá o resto (1) e 2**4 é 2 elevado a 4 (16)."
      },
      {
        tipo: "exemplo",
        titulo: "Juntando textos (concatenação)",
        codigo: `nome = "Ana"\nsobrenome = "Silva"\ncompleto = nome + " " + sobrenome\nprint(completo)`,
        explicacao: "O sinal + junta textos. Precisamos adicionar o espaço \" \" manualmente entre nome e sobrenome."
      },
      {
        tipo: "quiz",
        pergunta: "Quanto é <code class='inline'>17 % 5</code>?",
        opcoes: ["3", "2", "3.4", "12"],
        correta: 1,
        explicacao: "% é o resto da divisão. 17 dividido por 5 é 3 e sobra 2. Logo, o resto é 2."
      },
      {
        tipo: "complete",
        enunciado: "Calcule a média de 8 e 6 e imprima o resultado.",
        dica: "Some os dois e divida por 2. Use parênteses: (8 + 6) / 2.",
        codigoInicial: `media = \nprint("Média:", media)`,
        solucao: `media = (8 + 6) / 2\nprint("Média:", media)`,
        saidaEsperada: "Média: 7.0"
      },
      {
        tipo: "desafio",
        enunciado: "Uma loja vende 3 itens a R$ 12 cada. Calcule e imprima o total no formato: <code class='inline'>Total: 36</code>",
        dica: "Multiplique quantidade pelo preço.",
        codigoInicial: `quantidade = 3\npreco = 12\n# Complete abaixo\n`,
        solucao: `quantidade = 3\npreco = 12\nprint("Total:", quantidade * preco)`,
        saidaEsperada: "Total: 36"
      }
    ]
  },

  {
    id: "condicionais",
    titulo: "Condicionais: if, elif, else",
    nivel: "Básico",
    intro: "Programas precisam tomar decisões. As condicionais executam blocos de código dependendo se algo é verdadeiro ou falso.",
    blocos: [
      {
        tipo: "texto",
        html: `
          <p>Usamos <code class="inline">if</code> (se), <code class="inline">elif</code> (senão se) e <code class="inline">else</code> (senão). O bloco de dentro precisa de <strong>indentação</strong> (4 espaços).</p>
          <h4>Comparadores</h4>
          <ul>
            <li><code class="inline">==</code> igual, <code class="inline">!=</code> diferente</li>
            <li><code class="inline">&gt;</code> maior, <code class="inline">&lt;</code> menor</li>
            <li><code class="inline">&gt;=</code> maior ou igual, <code class="inline">&lt;=</code> menor ou igual</li>
          </ul>`
      },
      {
        tipo: "exemplo",
        titulo: "Verificando uma nota",
        codigo: `nota = 7\n\nif nota >= 7:\n    print("Aprovado")\nelse:\n    print("Reprovado")`,
        explicacao: "Se a nota for maior ou igual a 7, imprime Aprovado. Caso contrário, imprime Reprovado. Repare nos 4 espaços de indentação."
      },
      {
        tipo: "exemplo",
        titulo: "Várias condições com elif",
        codigo: `idade = 16\n\nif idade < 12:\n    print("Criança")\nelif idade < 18:\n    print("Adolescente")\nelse:\n    print("Adulto")`,
        explicacao: "O Python testa de cima para baixo e para no primeiro que for verdadeiro. Como 16 não é < 12, mas é < 18, imprime Adolescente."
      },
      {
        tipo: "quiz",
        pergunta: "Com <code class='inline'>x = 10</code>, o que imprime: <code class='inline'>if x > 5: print(\"A\")</code> <code class='inline'>else: print(\"B\")</code>?",
        opcoes: ["A", "B", "A e B", "Um erro"],
        correta: 0,
        explicacao: "10 é maior que 5, então a condição é verdadeira e imprime A."
      },
      {
        tipo: "complete",
        enunciado: "Complete para verificar se um número é positivo. Se <code class='inline'>numero</code> for maior que 0, imprima <code class='inline'>Positivo</code>.",
        dica: "A comparação é numero > 0. Não esqueça dos dois pontos e da indentação.",
        codigoInicial: `numero = 5\nif numero ______ 0:\n    print("Positivo")`,
        solucao: `numero = 5\nif numero > 0:\n    print("Positivo")`,
        saidaEsperada: "Positivo"
      },
      {
        tipo: "desafio",
        enunciado: "Escreva um programa que classifique um número guardado em <code class='inline'>n</code> como <code class='inline'>Par</code> ou <code class='inline'>Impar</code>. Teste com n = 8.",
        dica: "Um número é par quando o resto da divisão por 2 é zero: n % 2 == 0.",
        codigoInicial: `n = 8\n# Complete abaixo\n`,
        solucao: `n = 8\nif n % 2 == 0:\n    print("Par")\nelse:\n    print("Impar")`,
        saidaEsperada: "Par"
      }
    ]
  },

  {
    id: "loops",
    titulo: "Repetições: for e while",
    nivel: "Básico",
    intro: "Loops permitem repetir tarefas sem escrever o mesmo código várias vezes.",
    blocos: [
      {
        tipo: "texto",
        html: `
          <p><code class="inline">for</code> repete um número conhecido de vezes (geralmente com <code class="inline">range()</code>). <code class="inline">while</code> repete enquanto uma condição for verdadeira.</p>
          <p><code class="inline">range(5)</code> gera os números 0, 1, 2, 3, 4. <code class="inline">range(1, 6)</code> gera 1, 2, 3, 4, 5.</p>`
      },
      {
        tipo: "exemplo",
        titulo: "Contando com for",
        codigo: `for i in range(1, 6):\n    print("Número:", i)`,
        explicacao: "A variável i assume cada valor de 1 a 5. O código dentro do for é repetido 5 vezes."
      },
      {
        tipo: "exemplo",
        titulo: "Repetindo com while",
        codigo: `contador = 3\nwhile contador > 0:\n    print("Faltam", contador)\n    contador = contador - 1\nprint("Fim!")`,
        explicacao: "Enquanto contador for maior que 0, imprime e diminui 1. Sem o 'contador - 1', o loop seria infinito!"
      },
      {
        tipo: "quiz",
        pergunta: "Quantas vezes o loop <code class='inline'>for i in range(3)</code> executa?",
        opcoes: ["2 vezes", "3 vezes", "4 vezes", "Infinitas vezes"],
        correta: 1,
        explicacao: "range(3) gera 0, 1, 2 — três valores, logo o loop executa 3 vezes."
      },
      {
        tipo: "complete",
        enunciado: "Complete o loop para imprimir os números de 1 a 3.",
        dica: "range(1, 4) gera 1, 2 e 3.",
        codigoInicial: `for numero in range():\n    print(numero)`,
        solucao: `for numero in range(1, 4):\n    print(numero)`,
        saidaEsperada: "1\n2\n3"
      },
      {
        tipo: "desafio",
        enunciado: "Use um loop para somar todos os números de 1 até 5 e imprima o total no formato: <code class='inline'>Soma: 15</code>",
        dica: "Crie uma variável soma = 0 antes do loop e vá acumulando: soma = soma + i.",
        codigoInicial: `soma = 0\n# Complete abaixo\n`,
        solucao: `soma = 0\nfor i in range(1, 6):\n    soma = soma + i\nprint("Soma:", soma)`,
        saidaEsperada: "Soma: 15"
      }
    ]
  },

  {
    id: "listas",
    titulo: "Listas",
    nivel: "Intermediário",
    intro: "Listas guardam vários valores em uma única variável, na ordem em que você adicionou.",
    blocos: [
      {
        tipo: "texto",
        html: `
          <p>Criamos listas com colchetes <code class="inline">[]</code>. Cada item tem uma posição (índice) começando em <strong>0</strong>.</p>
          <ul>
            <li><code class="inline">lista[0]</code> acessa o primeiro item</li>
            <li><code class="inline">lista.append(x)</code> adiciona x ao final</li>
            <li><code class="inline">len(lista)</code> conta quantos itens tem</li>
          </ul>`
      },
      {
        tipo: "exemplo",
        titulo: "Criando e acessando listas",
        codigo: `frutas = ["maçã", "banana", "uva"]\nprint(frutas[0])\nprint(frutas[2])\nprint("Total:", len(frutas))`,
        explicacao: "frutas[0] é a maçã (primeira posição) e frutas[2] é a uva. len() mostra que há 3 itens."
      },
      {
        tipo: "exemplo",
        titulo: "Percorrendo uma lista com for",
        codigo: `notas = [8, 6, 10, 7]\nfor nota in notas:\n    print("Nota:", nota)`,
        explicacao: "O for passa por cada item da lista automaticamente, sem precisar de índices."
      },
      {
        tipo: "quiz",
        pergunta: "Na lista <code class='inline'>cores = [\"azul\", \"verde\", \"vermelho\"]</code>, o que retorna <code class='inline'>cores[1]</code>?",
        opcoes: ["azul", "verde", "vermelho", "Um erro"],
        correta: 1,
        explicacao: "Os índices começam em 0, então cores[1] é o segundo item: verde."
      },
      {
        tipo: "complete",
        enunciado: "Adicione o item <code class='inline'>laranja</code> à lista de frutas.",
        dica: "Use o método .append() com o valor entre aspas.",
        codigoInicial: `frutas = ["maçã", "banana"]\nfrutas.______("laranja")\nprint(frutas)`,
        solucao: `frutas = ["maçã", "banana"]\nfrutas.append("laranja")\nprint(frutas)`,
        saidaEsperada: "['maçã', 'banana', 'laranja']"
      },
      {
        tipo: "desafio",
        enunciado: "Dada a lista <code class='inline'>numeros = [4, 8, 15, 16, 23]</code>, calcule e imprima a média no formato: <code class='inline'>Média: 13.2</code>",
        dica: "Use sum(numeros) para somar tudo e len(numeros) para contar. Depois divida um pelo outro.",
        codigoInicial: `numeros = [4, 8, 15, 16, 23]\n# Complete abaixo\n`,
        solucao: `numeros = [4, 8, 15, 16, 23]\nmedia = sum(numeros) / len(numeros)\nprint("Média:", media)`,
        saidaEsperada: "Média: 13.2"
      }
    ]
  },

  {
    id: "dicionarios",
    titulo: "Dicionários",
    nivel: "Intermediário",
    intro: "Dicionários guardam pares de chave e valor — como um cadastro onde cada informação tem um rótulo.",
    blocos: [
      {
        tipo: "texto",
        html: `
          <p>Usamos chaves <code class="inline">{}</code> com pares <code class="inline">chave: valor</code>. Acessamos pelo nome da chave, não por posição.</p>
          <ul>
            <li><code class="inline">pessoa["nome"]</code> acessa o valor da chave "nome"</li>
            <li><code class="inline">pessoa["idade"] = 30</code> adiciona ou altera</li>
          </ul>`
      },
      {
        tipo: "exemplo",
        titulo: "Criando um dicionário",
        codigo: `aluno = {\n    "nome": "Pedro",\n    "idade": 17,\n    "nota": 9.5\n}\nprint(aluno["nome"])\nprint("Nota:", aluno["nota"])`,
        explicacao: "Acessamos os valores usando a chave entre colchetes e aspas. Muito mais legível que lembrar posições."
      },
      {
        tipo: "exemplo",
        titulo: "Percorrendo um dicionário",
        codigo: `precos = {"café": 5, "pão": 2, "leite": 4}\nfor item in precos:\n    print(item, "custa", precos[item])`,
        explicacao: "Ao percorrer com for, item recebe cada chave, e precos[item] retorna o valor correspondente."
      },
      {
        tipo: "quiz",
        pergunta: "Como acessar o valor da chave <code class='inline'>\"email\"</code> no dicionário <code class='inline'>user</code>?",
        opcoes: ["user.email", "user(\"email\")", "user[\"email\"]", "user{email}"],
        correta: 2,
        explicacao: "Em dicionários usamos colchetes com a chave entre aspas: user[\"email\"]."
      },
      {
        tipo: "complete",
        enunciado: "Adicione a chave <code class='inline'>\"cidade\"</code> com valor <code class='inline'>\"Recife\"</code> ao dicionário.",
        dica: "Use pessoa[\"cidade\"] = valor.",
        codigoInicial: `pessoa = {"nome": "Lia"}\npessoa______ = "Recife"\nprint(pessoa)`,
        solucao: `pessoa = {"nome": "Lia"}\npessoa["cidade"] = "Recife"\nprint(pessoa)`,
        saidaEsperada: "{'nome': 'Lia', 'cidade': 'Recife'}"
      },
      {
        tipo: "desafio",
        enunciado: "Crie um dicionário representando um livro (título, autor, ano) e imprima uma frase: <code class='inline'>Dom Casmurro foi escrito por Machado de Assis em 1899</code>",
        dica: "Monte a frase com print() usando as chaves do dicionário separadas por vírgula.",
        codigoInicial: `livro = {\n    "titulo": "Dom Casmurro",\n    "autor": "Machado de Assis",\n    "ano": 1899\n}\n# Complete abaixo\n`,
        solucao: `livro = {\n    "titulo": "Dom Casmurro",\n    "autor": "Machado de Assis",\n    "ano": 1899\n}\nprint(livro["titulo"], "foi escrito por", livro["autor"], "em", livro["ano"])`,
        saidaEsperada: "Dom Casmurro foi escrito por Machado de Assis em 1899"
      }
    ]
  },

  {
    id: "funcoes",
    titulo: "Funções",
    nivel: "Intermediário",
    intro: "Funções são blocos de código reutilizáveis. Você define uma vez e chama quantas vezes quiser.",
    blocos: [
      {
        tipo: "texto",
        html: `
          <p>Criamos funções com <code class="inline">def</code>. Elas podem receber <strong>parâmetros</strong> (entradas) e devolver um resultado com <code class="inline">return</code>.</p>`
      },
      {
        tipo: "exemplo",
        titulo: "Função simples",
        codigo: `def saudar(nome):\n    print("Olá,", nome + "!")\n\nsaudar("Ana")\nsaudar("Bruno")`,
        explicacao: "Definimos saudar() uma vez e chamamos duas vezes com nomes diferentes. Reaproveitamos o código."
      },
      {
        tipo: "exemplo",
        titulo: "Função que retorna um valor",
        codigo: `def dobro(numero):\n    return numero * 2\n\nresultado = dobro(5)\nprint(resultado)\nprint(dobro(10))`,
        explicacao: "O return devolve o resultado para quem chamou. Podemos guardar em uma variável ou usar direto no print()."
      },
      {
        tipo: "quiz",
        pergunta: "Qual palavra-chave define uma função em Python?",
        opcoes: ["function", "def", "func", "define"],
        correta: 1,
        explicacao: "Em Python usamos def seguido do nome da função."
      },
      {
        tipo: "complete",
        enunciado: "Complete a função que soma dois números e retorna o resultado.",
        dica: "Use return a + b dentro da função.",
        codigoInicial: `def somar(a, b):\n    ______ a + b\n\nprint(somar(4, 6))`,
        solucao: `def somar(a, b):\n    return a + b\n\nprint(somar(4, 6))`,
        saidaEsperada: "10"
      },
      {
        tipo: "desafio",
        enunciado: "Crie uma função <code class='inline'>eh_maior_idade(idade)</code> que retorne o texto <code class='inline'>Maior</code> se a idade for 18 ou mais, e <code class='inline'>Menor</code> caso contrário. Teste com 20.",
        dica: "Use if/else dentro da função e return em cada caso.",
        codigoInicial: `def eh_maior_idade(idade):\n    # Complete aqui\n    pass\n\nprint(eh_maior_idade(20))`,
        solucao: `def eh_maior_idade(idade):\n    if idade >= 18:\n        return "Maior"\n    else:\n        return "Menor"\n\nprint(eh_maior_idade(20))`,
        saidaEsperada: "Maior"
      }
    ]
  },

  {
    id: "strings",
    titulo: "Trabalhando com textos (strings)",
    nivel: "Intermediário",
    intro: "Strings têm muitos recursos úteis para transformar e analisar textos.",
    blocos: [
      {
        tipo: "texto",
        html: `
          <h4>Métodos úteis</h4>
          <ul>
            <li><code class="inline">.upper()</code> maiúsculas / <code class="inline">.lower()</code> minúsculas</li>
            <li><code class="inline">.strip()</code> remove espaços das pontas</li>
            <li><code class="inline">.replace(a, b)</code> troca a por b</li>
            <li><code class="inline">len(texto)</code> conta os caracteres</li>
          </ul>
          <p><strong>f-strings</strong> facilitam montar textos: <code class="inline">f"Olá {nome}"</code>.</p>`
      },
      {
        tipo: "exemplo",
        titulo: "Métodos de string",
        codigo: `texto = "  Python é Legal  "\nprint(texto.upper())\nprint(texto.strip())\nprint(texto.replace("Legal", "Incrível"))\nprint("Tamanho:", len("Python"))`,
        explicacao: "Cada método devolve uma nova string transformada. O original não muda a menos que você o reatribua."
      },
      {
        tipo: "exemplo",
        titulo: "f-strings (formatação moderna)",
        codigo: `nome = "Ana"\nidade = 20\nprint(f"{nome} tem {idade} anos")\nprint(f"No próximo ano terá {idade + 1}")`,
        explicacao: "Colocando f antes das aspas, podemos inserir variáveis e até contas dentro de chaves {}."
      },
      {
        tipo: "quiz",
        pergunta: "O que <code class='inline'>\"Oi\".upper()</code> retorna?",
        opcoes: ["oi", "OI", "Oi", "Um erro"],
        correta: 1,
        explicacao: ".upper() transforma todas as letras em maiúsculas: OI."
      },
      {
        tipo: "complete",
        enunciado: "Use uma f-string para imprimir: <code class='inline'>Produto: Caneta - R$ 3</code>",
        dica: "Coloque as variáveis dentro de chaves na f-string: f\"...{produto}...\".",
        codigoInicial: `produto = "Caneta"\npreco = 3\nprint(f"Produto: ______ - R$ ______")`,
        solucao: `produto = "Caneta"\npreco = 3\nprint(f"Produto: {produto} - R$ {preco}")`,
        saidaEsperada: "Produto: Caneta - R$ 3"
      },
      {
        tipo: "desafio",
        enunciado: "Peça (já definido) um nome em <code class='inline'>nome = \"maria souza\"</code> e imprima-o com a primeira letra de cada palavra maiúscula: <code class='inline'>Maria Souza</code>.",
        dica: "Existe um método de string chamado .title() que faz exatamente isso.",
        codigoInicial: `nome = "maria souza"\n# Complete abaixo\n`,
        solucao: `nome = "maria souza"\nprint(nome.title())`,
        saidaEsperada: "Maria Souza"
      }
    ]
  }
];
