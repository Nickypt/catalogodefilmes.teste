const STORAGE_KEY = 'catalogoFilmes';

// --- Dados Iniciais dos Filmes Solicitados ---
// Usei URLs de imagem de exemplo. Substitua por URLs de imagens reais para que os posters apareçam.
const FILMES_INICIAIS = [
    {
        titulo: "Homem-Aranha: Através do Aranhaverso",
        diretor: "Joaquim Dos Santos, Kemp Powers, Justin Thompson",
        ano: 2023,
        sinopse: "Miles Morales é levado através do Multiverso, onde encontra uma equipe de Pessoas-Aranha encarregada de proteger a existência. Ele se vê em conflito com eles sobre como lidar com uma nova ameaça e precisa redefinir o que significa ser um herói.",
        personagens: ["Miles Morales / Homem-Aranha", "Gwen Stacy / Mulher-Aranha", "Peter B. Parker", "O Mancha", "Miguel O'Hara / Homem-Aranha 2099"],
        duracao: "140 min",
        poster:"https://tse1.mm.bing.net/th/id/OIP.0HRwXnriUsW_aM6BoroIQAHaLH?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3", // Exemplo de URL de poster
        trailer: "https://www.youtube.com/watch?v=shW9i6rnWKk" 
    },
    {
        titulo: "Faça Ela Voltar (Bring Her Back)",
        diretor: "Danny Philippou, Michael Philippou",
        ano: 2025,
        sinopse: "Dois meio-irmãos órfãos que acabam em um lar adotivo descobrem um ritual aterrorizante na casa isolada de sua nova guardiã, Laura. O filme explora o luto e os perigos de não conseguir deixar o passado ir.",
        personagens: ["Laura (Sally Hawkins)", "Andy (Billy Barratt)", "Piper (Sora Wong)"],
        duracao: "99 min",
        poster: "https://m.media-amazon.com/images/M/MV5BN2RjYThlZjUtYjVkNS00NTU1LWI0ZTYtYzQyNDM4M2ViMzU2XkEyXkFqcGdeQXVyMTYyMzgyNDQ5._V1_QL75_UY281_CR0,0,189,281_.jpg", // Exemplo de URL de poster
        trailer: "https://www.youtube.com/watch?v=TrailerFacaElaVoltar" // URL de Trailer Exemplo
    },
    {
        titulo: "Todo Mundo em Pânico",
        diretor: "Keenen Ivory Wayans",
        ano: 2000,
        sinopse: "Uma paródia que ridiculariza o gênero de terror slasher, especialmente 'Pânico' e 'Eu Sei O Que Vocês Fizeram no Verão Passado', onde um grupo de adolescentes desajeitados é caçado por um serial killer.",
        personagens: ["Cindy Campbell", "Shorty Meeks", "Ray Wilkins", "Brenda Meeks", "O Assassino"],
        duracao: "88 min",
        poster: "https://media.fstatic.com/3QThGeGbpnG6tvO4k4UCN34JYtk=/210x312/smart/filters:format(webp)/media/movies/covers/2025/06/1000028246.jpg ",
        trailer: "https://www.youtube.com/watch?v=F9C-i_j87eA"
    },
    {
        titulo: "A Órfã",
        diretor: "Jaume Collet-Serra",
        ano: 2009,
        sinopse: "Um casal adota a jovem Esther, de 9 anos. A meiguice da garota esconde um segredo terrível: Esther não é quem diz ser, e sua presença coloca a vida de toda a família em risco de morte.",
        personagens: ["Esther / Leena Klammer", "Kate Coleman", "John Coleman"],
        duracao: "123 min",
        poster: " ",
        trailer: "https://www.youtube.com/watch?v=K_a4b08X55Y"
    },
    {
        titulo: "Venom",
        diretor: "Ruben Fleischer",
        ano: 2018,
        sinopse: "O jornalista Eddie Brock se torna hospedeiro de um simbionte alienígena que lhe confere habilidades sobre-humanas. Ele deve equilibrar a necessidade de controlar a criatura com a de usá-la para deter uma ameaça maior.",
        personagens: ["Eddie Brock / Venom", "Anne Weying", "Dr. Carlton Drake / Riot"],
        duracao: "140 min",
        poster: "https://m.media-amazon.com/images/M/MV5BNzBlZTIwZDYtZDIzMS00Y2U3LWJkMTktNDg4YzI5Y2RiYmFlXkEyXkFqcGdeQXVyMTA3MDk2NDc2._V1_QL75_UY281_CR1,0,189,281_.jpg",
        trailer: "https://www.youtube.com/watch?v=XhNl9Ld5H38"
    }
];

// --- Funções de Armazenamento (localStorage) ---

function carregarFilmes() {
    const filmesJSON = localStorage.getItem(STORAGE_KEY);
    return filmesJSON ? JSON.parse(filmesJSON) : [];
}

function salvarFilmes(filmes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filmes));
}

// --- Funções do Catálogo ---

/**
 * Cadastra um novo filme com todos os detalhes.
 */
function cadastrarFilme() {
    const titulo = document.getElementById('titulo').value.trim();
    const diretor = document.getElementById('diretor').value.trim();
    const ano = document.getElementById('ano').value.trim();
    const posterUrl = document.getElementById('posterUrl').value.trim(); 
    const sinopse = document.getElementById('sinopse').value.trim();
    // Converte a string de personagens (separados por vírgula) em um array
    const personagens = document.getElementById('personagens').value.split(',').map(p => p.trim()).filter(p => p.length > 0);
    const duracao = document.getElementById('duracao').value.trim();
    const trailer = document.getElementById('trailer').value.trim();


    if (!titulo || !diretor || !ano) {
        alert('Por favor, preencha Título, Diretor e Ano.');
        return;
    }

    const novoFilme = {
        titulo, diretor,
        ano: parseInt(ano),
        sinopse, personagens, duracao,
        poster: posterUrl,
        trailer
    };

    const filmes = carregarFilmes();
    filmes.push(novoFilme);
    salvarFilmes(filmes);

    // Limpa os campos
    document.getElementById('cadastro-filme').querySelectorAll('input, textarea').forEach(input => input.value = '');

    listarFilmes(filmes);
    alert(`Filme "${titulo}" cadastrado com sucesso!`);
}

/**
 * Lista os filmes na tabela HTML e exibe o poster.
 */
function listarFilmes(filmes = carregarFilmes()) {
    const corpoTabela = document.querySelector('#lista-filmes tbody');
    corpoTabela.innerHTML = ''; // Limpa a lista atual

    if (filmes.length === 0) {
        corpoTabela.innerHTML = '<tr><td colspan="5">Nenhum filme cadastrado.</td></tr>'; 
        return;
    }

    filmes.forEach(filme => {
        const linha = corpoTabela.insertRow();
        
        // Célula da Imagem
        const celulaPoster = linha.insertCell();
        if (filme.poster) {
            const img = document.createElement('img');
            img.src = filme.poster;
            img.alt = `Poster do filme ${filme.titulo}`;
            img.classList.add('poster');
            celulaPoster.appendChild(img);
        } else {
            celulaPoster.textContent = 'N/A';
        }

        linha.insertCell().textContent = filme.titulo;
        linha.insertCell().textContent = filme.diretor;
        linha.insertCell().textContent = filme.ano;

        // Célula de Ações (Botão Detalhes)
        const celulaAcoes = linha.insertCell();
        const btnDetalhes = document.createElement('button');
        btnDetalhes.textContent = 'Detalhes';
        btnDetalhes.onclick = () => exibirDetalhes(filme);
        celulaAcoes.appendChild(btnDetalhes);
    });
}

/**
 * Exibe as informações detalhadas do filme.
 */
function exibirDetalhes(filme) {
    const personagensLista = filme.personagens.join('\n- ') || 'N/A';
    
    let detalhes = `
        ----------------------------------
        DETALHES DO FILME: ${filme.titulo}
        ----------------------------------
        Diretor: ${filme.diretor}
        Ano: ${filme.ano}
        Duração: ${filme.duracao}

        --- Sinopse ---
        ${filme.sinopse || 'N/A'}

        --- Personagens Principais ---
        - ${personagensLista}
        
        --- Trailer ---
        ${filme.trailer ? `Link: ${filme.trailer}` : 'N/A'}
    `;
    alert(detalhes);
}

/**
 * Busca filmes por título ou diretor.
 */
function buscarFilmes() {
    const termo = document.getElementById('termoBusca').value.trim().toLowerCase();
    const todosFilmes = carregarFilmes();

    if (!termo) {
        listarFilmes(todosFilmes);
        return;
    }

    const resultados = todosFilmes.filter(filme => 
        filme.titulo.toLowerCase().includes(termo) ||
        filme.diretor.toLowerCase().includes(termo)
    );

    listarFilmes(resultados);
}

// --- Função de Exportação para Planilha (CSV) ---

/**
 * Exporta a lista completa de filmes para um arquivo CSV.
 */
function exportarCSV() {
    const filmes = carregarFilmes();

    if (filmes.length === 0) {
        alert('Não há filmes para exportar.');
        return;
    }

    // Função auxiliar para formatar texto e evitar quebras no CSV (usa aspas duplas)
    const formatarCampo = (texto) => {
        if (!texto) return '';
        // Substitui aspas internas por aspas duplas e envolve o campo em aspas
        return `"${String(texto).replace(/"/g, '""')}"`;
    };

    // 1. Define o cabeçalho do CSV
    const cabecalho = 'Título,Diretor,Ano,Duração,Sinopse,Personagens,Poster URL,Trailer URL\n';

    // 2. Mapeia os dados do array de objetos para uma string CSV
    const linhasCSV = filmes.map(filme => {
        const linha = [
            formatarCampo(filme.titulo),
            formatarCampo(filme.diretor),
            filme.ano,
            formatarCampo(filme.duracao),
            formatarCampo(filme.sinopse),
            formatarCampo(filme.personagens.join(' | ')), // Junta a lista de personagens com '|'
            formatarCampo(filme.poster),
            formatarCampo(filme.trailer)
        ];
        return linha.join(',');
    }).join('\n');

    const csvData = cabecalho + linhasCSV;

    // 3. Cria o arquivo e simula o download
    // O '\ufeff' é o BOM (Byte Order Mark) para compatibilidade com acentuação no Excel.
    const blob = new Blob(['\ufeff', csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.setAttribute('href', url);
    link.setAttribute('download', 'catalogo_filmes_completo.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Popula o catálogo com os filmes iniciais se o localStorage estiver vazio.
 */
function popularCatalogoInicial() {
    const filmes = carregarFilmes();
    if (filmes.length === 0) {
        salvarFilmes(FILMES_INICIAIS);
    }
    listarFilmes();
}


// --- Inicialização ---

// Chama a função para carregar/popular os filmes ao carregar a página
document.addEventListener('DOMContentLoaded', popularCatalogoInicial);