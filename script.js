function carregarCSV() {
    const fileInput = document.getElementById('fileInput');
    const reader = new FileReader();

    if (!fileInput.files[0]) {
        alert('Por favor, selecione um arquivo CSV');
        return;
    }

    reader.readAsText(fileInput.files[0]);

    reader.addEventListener('load', function() {
        const content = reader.result;
        processarCSV(content);
    });
};


//Lógica principal
function processarCSV(content) {
    let split_line = content.split("\n");
    let header = split_line[0].split(";");
    let dict = {};
    let headerNames = [];

    for (let index_header = 0; index_header < header.length; index_header++) {
        let cabecalho = header[index_header];
        dict[cabecalho] = [];
        headerNames.push(header[index_header]);
    };

    for (let index = 1; index < split_line.length; index++) {
        let lineAfterHeader = split_line[index].split(";");
        if(lineAfterHeader[0]) {
            for (let index_line = 0; index_line < lineAfterHeader.length; index_line++) {
                dict[headerNames[index_line]].push(lineAfterHeader[index_line]);
            };
        };
    };

    // Criar tabela HTML
    let table = '<table>';
    
    // Cabeçalho da tabela
    table += '<tr>';
    headerNames.forEach(header => {
        table += `<th>${header}</th>`;
    });
    table += '</tr>';
    
    // Dados da tabela
    const numRows = dict[headerNames[0]].length;
    for(let i = 0; i < numRows; i++) {
        table += '<tr>';
        headerNames.forEach(header => {
            table += `<td>${dict[header][i]}</td>`;
        });
        table += '</tr>';
    };
    table += '</table>';


    // // Mostrar o dicionário original como texto
    // const dictText = `<pre>${JSON.stringify(dict, null, 2)}</pre>`;
    
    // // Inserir no HTML
    // document.getElementById('resultado').innerHTML = table + '<br><h3>Dicionário:</h3>' + dictText;

    // Inserir no HTML
    document.getElementById('resultado').innerHTML = table;
}