let values = []; // Array para armazenar os valores inseridos pelo usuário

// Função para adicionar um novo valor
function addValue() {
    const ra = document.getElementById('ra').value;
    const disciplina = document.getElementById('disciplina').value;
    const nota = parseFloat(document.getElementById('nota').value);

    if (values.length < 10) { // Verifica se já foram inseridos 10 valores
        values.push({ ra, disciplina, nota }); // Adiciona o novo valor ao array
        showResults(); // Chama a função para mostrar os resultados
    } else {
        alert('Já foram inseridos 10 valores.');
    }
}

// Função para mostrar os resultados
function showResults() {
    let sortedValues = [...values]; // Copia os valores para um novo array
    sortedValues.sort((a, b) => a.nota - b.nota || a.ra.localeCompare(b.ra)); // Ordena os valores pelo critério especificado

    let ascendingResult = '<h3>Ordem Crescente</h3>'; // Inicia a string para os resultados em ordem crescente
    sortedValues.forEach(value => { // Itera sobre os valores ordenados
        ascendingResult += `<p>RA: ${value.ra} - Disciplina: ${value.disciplina} - Nota: ${value.nota}</p>`; // Adiciona cada valor à string de resultados
    });

    let descendingResult = '<h3>Ordem Decrescente</h3>'; // Inicia a string para os resultados em ordem decrescente
    sortedValues.reverse(); // Inverte a ordem dos valores
    sortedValues.forEach(value => { // Itera sobre os valores invertidos
        descendingResult += `<p>RA: ${value.ra} - Disciplina: ${value.disciplina} - Nota: ${value.nota}</p>`; // Adiciona cada valor à string de resultados
    });

    // Atualiza o conteúdo da div de resultados com os resultados em ordem crescente e decrescente
    document.getElementById('results').innerHTML = ascendingResult + descendingResult;
}
