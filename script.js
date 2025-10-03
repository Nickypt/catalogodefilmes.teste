const STORAGE_KEY = 'catalogoFilmes';

// --- Dados Iniciais dos Filmes Solicitados (COM IDS) ---
// Adicionamos um ID para cada filme inicial. Novos IDs serão gerados automaticamente.
const FILMES_INICIAIS = [
    {
        id: 1, // ID Único
        titulo: "Homem-Aranha: Através do Aranhaverso",
        diretor: "Joaquim Dos Santos, Kemp Powers, Justin Thompson",
        ano: 2023,
        sinopse: "Miles Morales é levado através do Multiverso, onde encontra uma equipe de Pessoas-Aranha encarregada de proteger a existência. Ele se vê em conflito com eles sobre como lidar com uma nova ameaça e precisa redefinir o que significa ser um herói.",
        personagens: ["Miles Morales / Homem-Aranha", "Gwen Stacy / Mulher-Aranha", "Peter B. Parker", "O Mancha", "Miguel O'Hara / Homem-Aranha 2099"],
        duracao: "140 min",
        poster: "https://m.media-amazon.com/images/M/MV5BMjYxNjkyMjQ5MF5BMl5BanBnXkFtZTgwNTQ2OTgxNTM@._V1_QL75_UY281_CR1,0,189,281_.jpg", 
        trailer: "https://www.youtube.com/watch?v=shW9i6rnWKk" 
    },
    {
        id: 2,
        titulo: "Faça Ela Voltar (Bring Her Back)",
        diretor: "Danny Philippou, Michael Philippou",
        ano: 2025,
        sinopse: "Dois meio-irmãos órfãos que acabam em um lar adotivo descobrem um ritual aterrorizante na casa isolada de sua nova guardiã, Laura. O filme explora o luto e os perigos de não conseguir deixar o passado ir.",
        personagens: ["Laura (Sally Hawkins)", "Andy (Billy Barratt)", "Piper (Sora Wong)"],
        duracao: "99 min",
        poster: "https://m.media-amazon.com/images/M/MV5BN2RjYThlZjUtYjVkNS00NTU1LWI0ZTYtYzQyNDM4M2ViMzU2XkEyXkFqcGdeQXVyMTYyMzgyNDQ5._V1_QL75_UY281_CR0,0,189,281_.jpg", 
        trailer: "https://www.youtube.com/watch?v=TrailerFacaElaVoltar" 
    },
    {
        id: 3,
        titulo: "Todo Mundo em Pânico",
        diretor: "Keenen Ivory Wayans",
        ano: 2000,
        sinopse: "Uma paródia que ridiculariza o gênero de terror slasher, especialmente 'Pânico' e 'Eu Sei O Que Vocês Fizeram no Verão Passado', onde um grupo de adolescentes desajeitados é caçado por um serial killer.",
        personagens: ["Cindy Campbell", "Shorty Meeks", "Ray Wilkins", "Brenda Meeks", "O Assassino"],
        duracao: "88 min",
        poster: "https://m.media-amazon.com/images/M/MV5BMjI0MDY0ODQwOV5BMl5BanBnXkFtZTYwNTc1NDk2._V1_QL75_UY281_CR3,0,189,281_.jpg",
        trailer: "https://www.youtube.com/watch?v=F9C-i_j87eA"
    },
    {
        id: 4,
        titulo: "A Órfã",
        diretor: "Jaume Collet-Serra",
        ano: 2009,
        sinopse: "Um casal adota a jovem Esther, de 9 anos. A meiguice da garota esconde um segredo terrível: Esther não é quem diz ser, e sua presença coloca a vida de toda a família em risco de morte.",
        personagens: ["Esther / Leena Klammer", "Kate Coleman", "John Coleman"],
        duracao: "123 min",
        poster: "https://m.media-amazon.com/images/M/MV5BMTY5MjQ0ODQ3M15BMl5BanBnXkFtZTcwNzcyNjMzMg@@._V1_QL75_UY281_CR1,0,189,281_.jpg",
        trailer: "https://www.youtube.com/watch?v=K_a4b08X55Y"
    },
    {
        id: 5,
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

// --- Funções de Ação Principal ---

/**
 * Gera um ID único e sequencial para um novo filme.
 */
function gerarNovoId(filmes) {
    if (filmes.length === 0) {
        return 1;
    }
    // Encontra o maior ID existente e soma 1
    const maxId = filmes.reduce((max, filme) => (filme.id > max ? filme.id : max), 0);
    return maxId + 1;
}

/**
 * Cadastra um novo filme (agora com ID único).
 */
function cadastrarFilme() {
    const titulo = document.getElementById('titulo').value.trim();
    const diretor = document.getElementById('diretor').value.trim();
    const ano = document.getElementById('ano').value.trim();
    const posterUrl = document.getElementById('posterUrl').value.trim(); 
    const sinopse = document.getElementById('sinopse').value.trim();
    const personagens = document.getElementById('personagens').value.split(',').map(p => p.trim()).filter(p => p.length > 0);
    const duracao = document.getElementById('duracao').value.trim();
    const trailer = document.getElementById('trailer').value.trim();


    if (!titulo || !diretor || !ano) {
        alert('Por favor, preencha Título, Diretor e Ano.');
        return;
    }

    const filmes = carregarFilmes();
    
    const novoFilme = {
        id: gerarNovoId(filmes), // Gera o ID único
        titulo, diretor,
        ano: parseInt(ano),
        sinopse, personagens, duracao,
        poster: posterUrl,
        trailer
    };

    filmes.push(novoFilme);
    salvarFilmes(filmes);

    // Limpa os campos
    document.getElementById('cadastro-filme').querySelectorAll('input, textarea').forEach(input => input.value = '');

    listarFilmes(filmes);
    // Usaremos alert temporariamente, mas o ideal seria o Toast
    console.log(`Filme "${titulo}" cadastrado com sucesso!`); 
}

/**
 * Remove um filme do catálogo usando seu ID único.
 * @param {number} id O ID único do filme a ser excluído.
 */
function excluirFilme(id) {
    if (!confirm('Tem certeza que deseja EXCLUIR este filme do catálogo?')) {
        return;
    }

    let filmes = carregarFilmes();
    const tituloExcluido = filmes.find(f => f.id === id)?.titulo || 'Filme';
    
    // Filtra o array, mantendo apenas os filmes cujo ID é diferente do ID a ser excluído
    filmes = filmes.filter(filme => filme.id !== id);
    
    salvarFilmes(filmes);
    listarFilmes(filmes);
    console.log(`${tituloExcluido} excluído com sucesso!`);
}


/**
 * Lista os filmes na tabela HTML, agora com botões de Ações.
 */
function listarFilmes(filmes = carregarFilmes()) {
    const corpoTabela = document.querySelector('#lista-filmes tbody');
    corpoTabela.innerHTML = ''; 

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

        // Célula de Ações (Detalhes e Excluir)
        const celulaAcoes = linha.insertCell();
        
        const btnDetalhes = document.createElement('button');
        btnDetalhes.textContent = 'Detalhes';
        btnDetalhes.onclick = () => exibirDetalhes(filme);
        celulaAcoes.appendChild(btnDetalhes);
        
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        // A função de excluir agora usa o ID único do filme
        btnExcluir.onclick = () => excluirFilme(filme.id); 
        // Estilo secundário para o botão Excluir
        btnExcluir.style.backgroundColor = '#dc3545'; 
        btnExcluir.style.marginLeft = '5px';
        btnExcluir.onmouseover = () => btnExcluir.style.backgroundColor = '#c82333';
        btnExcluir.onmouseout = () => btnExcluir.style.backgroundColor = '#dc3545';
        
        celulaAcoes.appendChild(btnExcluir);
    });
}

// --- Funções do Modal de Detalhes (Novo) ---

/**
 * Popula e exibe o modal com os dados do filme.
 */
function exibirDetalhes(filme) {
    // Popula o Modal com os dados do filme
    document.getElementById('modal-titulo').textContent = filme.titulo;
    document.getElementById('modal-diretor').textContent = filme.diretor;
    document.getElementById('modal-ano').textContent = filme.ano;
    document.getElementById('modal-duracao').textContent = filme.duracao;
    document.getElementById('modal-sinopse').textContent = filme.sinopse;
    
    const personagensLista = filme.personagens.join(', ') || 'N/A';
    document.getElementById('modal-personagens').textContent = personagensLista;
    
    // Poster
    const posterElement = document.getElementById('modal-poster');
    posterElement.src = filme.poster || 'placeholder-image-url.jpg'; // URL de fallback
    posterElement.alt = `Poster do filme ${filme.titulo}`;

    // Trailer
    const trailerElement = document.getElementById('modal-trailer');
    if (filme.trailer) {
        trailerElement.href = filme.trailer;
        trailerElement.style.display = 'inline-block';
    } else {
        trailerElement.style.display = 'none';
    }

    // Exibe o modal
    document.getElementById('modal-backdrop').style.display = 'block';
}

/**
 * Fecha o modal.
 */
function fecharModal() {
    document.getElementById('modal-backdrop').style.display = 'none';
}

// Fecha o modal ao clicar fora ou pressionar ESC
document.addEventListener('DOMContentLoaded', () => {
    const modalBackdrop = document.getElementById('modal-backdrop');
    modalBackdrop.addEventListener('click', (event) => {
        if (event.target === modalBackdrop) {
            fecharModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modalBackdrop.style.display === 'block') {
            fecharModal();
        }
    });
});


/**
 * Busca filmes por título ou diretor (Mantida).
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

// --- Função de Exportação para Planilha (CSV) Atualizada com ID ---

function exportarCSV() {
    const filmes = carregarFilmes();

    if (filmes.length === 0) {
        alert('Não há filmes para exportar.');
        return;
    }

    const formatarCampo = (texto) => {
        if (!texto) return '';
        return `"${String(texto).replace(/"/g, '""')}"`;
    };

    // 1. Define o cabeçalho do CSV (agora inclui ID)
    const cabecalho = 'ID,Título,Diretor,Ano,Duração,Sinopse,Personagens,Poster URL,Trailer URL\n';

    // 2. Mapeia os dados do array de objetos para uma string CSV
    const linhasCSV = filmes.map(filme => {
        const linha = [
            filme.id, // Adiciona o ID
            formatarCampo(filme.titulo),
            formatarCampo(filme.diretor),
            filme.ano,
            formatarCampo(filme.duracao),
            formatarCampo(filme.sinopse),
            formatarCampo(filme.personagens.join(' | ')),
            formatarCampo(filme.poster),
            formatarCampo(filme.trailer)
        ];
        return linha.join(',');
    }).join('\n');

    const csvData = cabecalho + linhasCSV;

    // 3. Cria o arquivo e simula o download
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

document.addEventListener('DOMContentLoaded', popularCatalogoInicial);