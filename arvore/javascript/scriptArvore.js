// Definição da estrutura do nó da árvore binária
class Node {
    constructor(ra, disciplina, nota) {
        this.ra = ra;
        this.disciplina = disciplina;
        this.nota = nota;
        this.left = null;
        this.right = null;
    }
}

let root = null; // Raiz da árvore binária

// Função para adicionar um novo nó à árvore binária
function insertNode(root, newNode) {
    if (root === null) {
        root = newNode;
    } else {
        // Inserção ordenada por nota e em caso de repetição de nota, ordenar por RA
        if (newNode.nota < root.nota || (newNode.nota === root.nota && newNode.ra < root.ra)) {
            if (root.left === null) {
                root.left = newNode;
            } else {
                insertNode(root.left, newNode);
            }
        } else {
            if (root.right === null) {
                root.right = newNode;
            } else {
                insertNode(root.right, newNode);
            }
        }
    }
}

// Função para percorrer a árvore binária em ordem crescente e gerar os resultados
function inOrderTraversal(node, results) {
    if (node !== null) {
        inOrderTraversal(node.left, results);
        results.push({ ra: node.ra, disciplina: node.disciplina, nota: node.nota });
        inOrderTraversal(node.right, results);
    }
}

// Função para percorrer a árvore binária em ordem decrescente e gerar os resultados
function reverseOrderTraversal(node, results) {
    if (node !== null) {
        reverseOrderTraversal(node.right, results);
        results.push({ ra: node.ra, disciplina: node.disciplina, nota: node.nota });
        reverseOrderTraversal(node.left, results);
    }
}

// Função para contar o número de nós na árvore binária
function countNodes(node) {
    if (node === null) {
        return 0;
    }
    return 1 + countNodes(node.left) + countNodes(node.right);
}

// Função para adicionar um novo valor
function addValue() {
    const ra = document.getElementById('ra').value;
    const disciplina = document.getElementById('disciplina').value;
    const nota = parseFloat(document.getElementById('nota').value);

    if (root !== null && countNodes(root) >= 10) {
        alert('Já foram inseridos 10 valores.');
        return;
    }

    const newNode = new Node(ra, disciplina, nota); // Cria um novo nó com os valores inseridos pelo usuário

    if (root === null) {
        root = newNode; // Se a árvore estiver vazia, o novo nó se torna a raiz
    } else {
        insertNode(root, newNode); // Caso contrário, insere o novo nó na árvore
    }

    showResults(); // Chama a função para mostrar os resultados
}

// Função para resetar o formulário e a árvore
function resetForm() {
    root = null; // Reseta a raiz da árvore para null
    document.getElementById('results').innerHTML = ''; // Limpa os resultados exibidos
}

// Função para mostrar os resultados
function showResults() {
    let ascendingResults = []; // Array para armazenar os resultados em ordem crescente
    let descendingResults = []; // Array para armazenar os resultados em ordem decrescente

    // Percorre a árvore binária em ordem crescente e armazena os resultados
    inOrderTraversal(root, ascendingResults);
    // Percorre a árvore binária em ordem decrescente e armazena os resultados
    reverseOrderTraversal(root, descendingResults);

    let resultsHTML = ''; // String para armazenar o HTML dos resultados

    // Adiciona os resultados em ordem crescente à string HTML
    resultsHTML += '<h3>Ordem Crescente</h3>';
    ascendingResults.forEach(result => {
        resultsHTML += `<p>RA: ${result.ra} - Disciplina: ${result.disciplina} - Nota: ${result.nota}</p>`;
    });

    // Adiciona os resultados em ordem decrescente à string HTML
    resultsHTML += '<h3>Ordem Decrescente</h3>';
    descendingResults.forEach(result => {
        resultsHTML += `<p>RA: ${result.ra} - Disciplina: ${result.disciplina} - Nota: ${result.nota}</p>`;
    });

    // Atualiza o conteúdo da div de resultados com os resultados em ordem crescente e decrescente
    document.getElementById('results').innerHTML = resultsHTML;
}
