const STORAGE_KEY = 'catalogoFilmes';

// --- Dados Iniciais dos Filmes Solicitados (COM IDS) ---
const FILMES_INICIAIS = [
    { id: 1, titulo: "Homem-Aranha: Através do Aranhaverso", diretor: "Joaquim Dos Santos, Kemp Powers, Justin Thompson", ano: 2023, sinopse: "Miles Morales é levado através do Multiverso, onde encontra uma equipe de Pessoas-Aranha encarregada de proteger a existência. Ele se vê em conflito com eles sobre como lidar com uma nova ameaça e precisa redefinir o que significa ser um herói.", personagens: ["Miles Morales / Homem-Aranha", "Gwen Stacy / Mulher-Aranha", "Peter B. Parker", "O Mancha", "Miguel O'Hara / Homem-Aranha 2099"], duracao: "140 min", poster: "https://m.media-amazon.com/images/M/MV5BMjYxNjkyMjQ5MF5BMl5BanBnXkFtZTgwNTQ2OTgxNTM@._V1_QL75_UY281_CR1,0,189,281_.jpg", trailer: "https://www.youtube.com/watch?v=shW9i6rnWKk" },
    { id: 2, titulo: "Faça Ela Voltar (Bring Her Back)", diretor: "Danny Philippou, Michael Philippou", ano: 2025, sinopse: "Dois meio-irmãos órfãos que acabam em um lar adotivo descobrem um ritual aterrorizante na casa isolada de sua nova guardiã, Laura. O filme explora o luto e os perigos de não conseguir deixar o passado ir.", personagens: ["Laura (Sally Hawkins)", "Andy (Billy Barratt)", "Piper (Sora Wong)"], duracao: "99 min", poster: "https://m.media-amazon.com/images/M/MV5BN2RjYThlZjUtYjVkNS00NTU1LWI0ZTYtYzQyNDM4M2ViMzU2XkEyXkFqcGdeQXVyMTYyMzgyNDQ5._V1_QL75_UY281_CR0,0,189,281_.jpg", trailer: "https://www.youtube.com/watch?v=TrailerFacaElaVoltar" },
    { id: 3, titulo: "Todo Mundo em Pânico", diretor: "Keenen Ivory Wayans", ano: 2000, sinopse: "Uma paródia que ridiculariza o gênero de terror slasher, especialmente 'Pânico' e 'Eu Sei O Que Vocês Fizeram no Verão Passado', onde um grupo de adolescentes desajeitados é caçado por um serial killer.", personagens: ["Cindy Campbell", "Shorty Meeks", "Ray Wilkins", "Brenda Meeks", "O Assassino"], duracao: "88 min", poster: "https://m.media-amazon.com/images/M/MV5BMjI0MDY0ODQwOV5BMl5BanBnXkFtZTYwNTc1NDk2._V1_QL75_UY281_CR3,0,189,281_.jpg", trailer: "https://www.youtube.com/watch?v=F9C-i_j87eA" },
    { id: 4, titulo: "A Órfã", diretor: "Jaume Collet-Serra", ano: 2009, sinopse: "Um casal adota a jovem Esther, de 9 anos. A meiguice da garota esconde um segredo terrível: Esther não é quem diz ser, e sua presença coloca a vida de toda a família em risco de morte.", personagens: ["Esther / Leena Klammer", "Kate Coleman", "John Coleman"], duracao: "123 min", poster: "https://m.media-amazon.com/images/M/MV5BMTY5MjQ0ODQ3M15BMl5BanBnXkFtZTcwNzcyNjMzMg@@._V1_QL75_UY281_CR1,0,189,281_.jpg", trailer: "https://www.youtube.com/watch?v=K_a4b08X55Y" },
    { id: 5, titulo: "Venom", diretor: "Ruben Fleischer", ano: 2018, sinopse: "O jornalista Eddie Brock se torna hospedeiro de um simbionte alienígena que lhe confere habilidades sobre-humanas. Ele deve equilibrar a necessidade de controlar a criatura com a de usá-la para deter uma ameaça maior.", personagens: ["Eddie Brock / Venom", "Anne Weying", "Dr. Carlton Drake / Riot"], duracao: "140 min", poster: "https://m.media-amazon.com/images/M/MV5BNzBlZTIwZDYtZDIzMS00Y2U3LWJkMTktNDg4YzI5Y2RiYmFlXkEyXkFqcGdeQXVyMTA3MDk2NDc2._V1_QL75_UY281_CR1,0,189,281_.jpg", trailer: "https://www.youtube.com/watch?v=XhNl9Ld5H38" }
];

// ==========================================================
// 1. Storage Manager (Lógica de Dados)
// ==========================================================
const StorageManager = {
    carregar: () => {
        const filmesJSON = localStorage.getItem(STORAGE_KEY);
        return filmesJSON ? JSON.parse(filmesJSON) : [];
    },
    salvar: (filmes) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filmes));
    },
    gerarNovoId: (filmes) => {
        if (filmes.length === 0) return 1;
        const maxId = filmes.reduce((max, filme) => (filme.id > max ? filme.id : max), 0);
        return maxId + 1;
    },
    popularCatalogoInicial: () => {
        const filmes = StorageManager.carregar();
        if (filmes.length === 0) {
            StorageManager.salvar(FILMES_INICIAIS);
        }
        UIManager.listarFilmes();
    }
};


// ==========================================================
// 2. UI Manager (Lógica de Interface e Ações)
// ==========================================================
const UIManager = {
    estadoOrdenacao: { campo: 'titulo', order: 'asc' },

    // --- Funções de Ação Principal ---
    cadastrarFilme: () => {
        const titulo = document.getElementById('titulo').value.trim();
        const diretor = document.getElementById('diretor').value.trim();
        const ano = document.getElementById('ano').value.trim();
        
        if (!titulo || !diretor || !ano) {
            UIManager.mostrarToast('Preencha Título, Diretor e Ano.', 'error');
            return;
        }

        const filmes = StorageManager.carregar();
        
        const novoFilme = {
            id: StorageManager.gerarNovoId(filmes), 
            titulo, diretor,
            ano: parseInt(ano),
            sinopse: document.getElementById('sinopse').value.trim(),
            personagens: document.getElementById('personagens').value.split(',').map(p => p.trim()).filter(p => p.length > 0),
            duracao: document.getElementById('duracao').value.trim(),
            poster: document.getElementById('posterUrl').value.trim(),
            trailer: document.getElementById('trailer').value.trim()
        };

        filmes.push(novoFilme);
        StorageManager.salvar(filmes);

        // Limpa os campos
        document.getElementById('cadastro-filme').querySelectorAll('input, textarea').forEach(input => input.value = '');

        UIManager.listarFilmes(filmes);
        UIManager.mostrarToast(`Filme "${titulo}" cadastrado com sucesso!`); 
    },

    excluirFilme: (id) => {
        if (!confirm('Tem certeza que deseja EXCLUIR este filme do catálogo?')) {
            return;
        }

        let filmes = StorageManager.carregar();
        const tituloExcluido = filmes.find(f => f.id === id)?.titulo || 'Filme';
        
        filmes = filmes.filter(filme => filme.id !== id);
        
        StorageManager.salvar(filmes);
        UIManager.listarFilmes(filmes);
        UIManager.mostrarToast(`${tituloExcluido} excluído!`);
    },

    buscarFilmes: () => {
        const termo = document.getElementById('termoBusca').value.trim().toLowerCase();
        const todosFilmes = StorageManager.carregar();

        if (!termo) {
            UIManager.listarFilmes(todosFilmes);
            return;
        }

        const resultados = todosFilmes.filter(filme => 
            filme.titulo.toLowerCase().includes(termo) ||
            filme.diretor.toLowerCase().includes(termo)
        );

        UIManager.listarFilmes(resultados);
    },

    ordenarFilmes: (campo) => {
        const filmes = StorageManager.carregar();
        let { campo: campoAtual, order } = UIManager.estadoOrdenacao;

        if (campo === campoAtual) {
            order = order === 'asc' ? 'desc' : 'asc';
        } else {
            order = 'asc';
        }

        filmes.sort((a, b) => {
            let valA = a[campo];
            let valB = b[campo];

            if (typeof valA === 'string') {
                valA = valA.toLowerCase();
                valB = valB.toLowerCase();
            }

            if (valA < valB) return order === 'asc' ? -1 : 1;
            if (valA > valB) return order === 'asc' ? 1 : -1;
            return 0;
        });

        UIManager.estadoOrdenacao = { campo, order };
        UIManager.listarFilmes(filmes);
    },

    exportarCSV: () => {
        const filmes = StorageManager.carregar();

        if (filmes.length === 0) {
            UIManager.mostrarToast('Não há filmes para exportar.', 'error');
            return;
        }

        const formatarCampo = (texto) => {
            if (!texto) return '';
            return `"${String(texto).replace(/"/g, '""')}"`;
        };

        const cabecalho = 'ID,Título,Diretor,Ano,Duração,Sinopse,Personagens,Poster URL,Trailer URL\n';

        const linhasCSV = filmes.map(filme => {
            const linha = [
                filme.id,
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

        const blob = new Blob(['\ufeff', csvData], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.setAttribute('href', url);
        link.setAttribute('download', 'catalogo_filmes_completo.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        UIManager.mostrarToast('Dados exportados com sucesso!');
    },

    // --- Funções de Renderização (Tabela e Modal) ---
    listarFilmes: (filmes = StorageManager.carregar()) => {
        const corpoTabela = document.querySelector('#lista-filmes tbody');
        corpoTabela.innerHTML = ''; 

        if (filmes.length === 0) {
            corpoTabela.innerHTML = '<tr><td colspan="5">Nenhum filme encontrado.</td></tr>'; 
            return;
        }

        filmes.forEach(filme => {
            const linha = corpoTabela.insertRow();
            
            // Poster
            const celulaPoster = linha.insertCell();
            if (filme.poster) {
                const img = document.createElement('img');
                img.src = filme.poster;
                img.alt = `Poster de ${filme.titulo}`;
                img.classList.add('poster');
                celulaPoster.appendChild(img);
            } else {
                celulaPoster.textContent = 'N/A';
            }

            linha.insertCell().textContent = filme.titulo;
            linha.insertCell().textContent = filme.diretor;
            linha.insertCell().textContent = filme.ano;

            // Ações
            const celulaAcoes = linha.insertCell();
            
            const btnDetalhes = document.createElement('button');
            btnDetalhes.textContent = 'Detalhes';
            btnDetalhes.onclick = () => UIManager.exibirDetalhes(filme);
            celulaAcoes.appendChild(btnDetalhes);
            
            const btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.classList.add('btn-excluir');
            btnExcluir.onclick = () => UIManager.excluirFilme(filme.id); 
            btnExcluir.style.marginLeft = '5px';
            
            celulaAcoes.appendChild(btnExcluir);
        });
    },

    exibirDetalhes: (filme) => {
        // Popula os campos no novo layout do Modal
        document.getElementById('modal-titulo').textContent = filme.titulo;
        document.getElementById('modal-diretor').textContent = filme.diretor;
        document.getElementById('modal-ano').textContent = filme.ano;
        document.getElementById('modal-duracao').textContent = filme.duracao || 'N/A';
        document.getElementById('modal-sinopse').textContent = filme.sinopse || 'Sinopse não disponível.';
        
        // Poster 
        document.getElementById('modal-poster').src = filme.poster || 'https://via.placeholder.com/200x300?text=Sem+Poster';
        
        // Lista de Personagens (Usando <ul> e <li>)
        const ulPersonagens = document.getElementById('modal-personagens');
        ulPersonagens.innerHTML = ''; // Limpa a lista antiga

        if (filme.personagens.length > 0) {
            filme.personagens.forEach(personagem => {
                const li = document.createElement('li');
                li.textContent = personagem;
                ulPersonagens.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = 'Personagens não listados.';
            ulPersonagens.appendChild(li);
        }

        // Trailer (Botão estilizado)
        const trailerElement = document.getElementById('modal-trailer');
        if (filme.trailer && filme.trailer.startsWith('http')) {
            trailerElement.href = filme.trailer;
            trailerElement.style.display = 'inline-flex'; 
        } else {
            trailerElement.style.display = 'none';
        }

        // Exibe o modal
        document.getElementById('modal-backdrop').style.display = 'block';
    },

    fecharModal: () => {
        document.getElementById('modal-backdrop').style.display = 'none';
    },

    // --- Toast Notification ---
    mostrarToast: (message, type = 'success') => {
        const toast = document.getElementById('toast-notification');
        toast.textContent = message;
        
        toast.className = ''; 
        toast.classList.add(type === 'error' ? 'toast-error' : 'toast-success');
        
        toast.classList.remove('toast-hidden');

        setTimeout(() => {
            toast.classList.add('toast-hidden');
        }, 3000);
    }
};


// ==========================================================
// 3. Inicialização
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
    // Carrega os filmes iniciais ou a lista salva
    StorageManager.popularCatalogoInicial();
    
    // Adiciona evento para fechar modal com ESC ou clique fora
    const modalBackdrop = document.getElementById('modal-backdrop');
    modalBackdrop.addEventListener('click', (event) => {
        if (event.target === modalBackdrop) {
            UIManager.fecharModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modalBackdrop.style.display === 'block') {
            UIManager.fecharModal();
        }
    });
});