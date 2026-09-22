# TESTES · o que falta você conferir

A lista acumulada de tudo que eu entreguei e você ainda não testou, do build mais
novo para o mais velho. Marque com [x] o que já conferiu, ou me diga em qual build
você parou e eu corto o resto de uma vez.

Este arquivo passa a ser a fonte única dessa lista, que antes vivia solta no
CLAUDE.md. Ele cresce a cada entrega, e o painel de novidades dentro do app vai
ler o mesmo conteúdo, então marcar lá ou aqui dá no mesmo.

Hoje: 257 testes pendentes (do r131 ao r311) e 4 decisões suas.

---

## r311 · o boot que não trava mais (o seu bug do loading)

- [ ] **O site abre de novo.** universatlas.com no seu navegador de sempre (o que ficava preso no loading com o erro do cadCinco): tem que abrir no último lugar guardado. E abrir direto um link de corpo, universatlas.com/#corpo=terra e universatlas.com/#corpo=marte&escala=real, nos dois modos. Desde o r307 (21 SET) esse caminho estourava; quem abria em #sistema=sol nunca viu.
- [ ] **O ENTRAR conta a visita.** Entrar em qualquer planeta e abrir o registro ▤: a visita aparece, e depois da quinta do Sistema Solar a conquista CAD-05 dispara (era ela que faltava).
- [ ] **A rede de segurança** (não dá para provocar sem quebrar o código, medido por sonda com a função apagada de propósito): um erro no link cai em casa com o aviso O LINK NÃO ABRIU E O MAPA CAIU EM CASA no rodapé e o loading termina.

---

## r310 · o censo dos exoplanetas

- [ ] **Ligar a camada.** ≋ do topo, CAMADAS DO MAPA: EXOPLANETAS CONFIRMADOS (NASA EXOPLANET ARCHIVE). Nasce desligada; ligada no cênico ela avisa para ir ao 1:1. No 1:1, afaste até uns 50 anos-luz: os pontos azulados começam a acender e a 300 al o céu fica salpicado (4.747 estrelas na posição real). Em casa (menos de 8 al) ela some de propósito, e acima de 400 mil al também.
- [ ] **Os verdes.** 42 estrelas têm um mundo temperado (raio menor que 1,8 Terras e temperatura de equilíbrio entre 180 e 320 K, um filtro e não uma promessa): ficam maiores e verdes. TRAPPIST-1, Kepler-442, LHS 1140 e TOI-700 estão entre elas. Diga se o verde destaca o bastante ou demais.
- [ ] **A ficha.** Toque num ponto (no celular o alvo é 40 por cento maior): distância, quantos planetas, tipo espectral, primeira descoberta, método, e a seção OS PLANETAS com raio (ou massa), período, temperatura, ano e método de cada um. Nas 18 estrelas que já são sistemas do atlas (TRAPPIST-1, Kepler-452, 51 Pegasi, Proxima, Barnard...) aparece o ENTRAR.
- [ ] **A busca.** / e digite kepler-442 ou hd 209458: com o censo carregado, qualquer das 4.747 estrelas aparece com EXOPLANETAS · n planetas · distância, e escolher liga a camada e vira o olhar até ela.
- [ ] **O peso.** O catálogo (exo.js, 490 KB) só desce quando a camada liga, uma vez por sessão, com um aviso de crédito. No celular, ligar e afastar até 300 al: dizer se pesou.
- [ ] **A poluição.** Os pontos são aditivos sobre o céu do 1:1, junto com a faixa da Via Láctea (r298) e os 27 marcadores antigos dos sistemas do atlas, que continuam. Dizer se ficou carregado demais ou se os pontos comuns estão fracos demais (0,55).

---

## r309 · o manual reescrito

- [ ] **Abra o ? e leia.** Quinze parágrafos, um por feature viva: os dois mapas e o botão de modo, as camadas ao vivo, o planetário (com NOITE, ISS, ⛶, e no celular APONTAR e GPS), comparar e bancada, o registro e as conquistas, o relógio com os eventos e a fase da Lua, a linha do tempo, a trava de centro, o modo foto, o tour e o modo aula, compartilhar (⇪ e ⧉) e as configurações com os ladrilhos e o idioma. Diga o que ficou longo, curto ou obscuro.
- [ ] **O parágrafo falso saiu.** O antigo dizia para afastar o zoom até o limite e afastar de novo para subir de escala; no 1:1 isso não existe desde o r157. Agora explica os dois mapas e diz que no 1:1 é só continuar afastando.
- [ ] **O ≋ tem dois sentidos** e o manual agora diz os dois: o do topo é CAMADAS DO MAPA, o de dentro do card é a LINHA DO TEMPO.
- [ ] **No celular** a linha de atalhos de teclado some e entra a de gestos (toque longo, dois dedos, ⋯, puxar a ficha). Confira que ela aparece no seu.
- [ ] **Em inglês, o manual inteiro está traduzido**: conferido por sonda, zero parágrafos sobrando em português. As chaves de tradução nascem do mesmo texto do index, então não têm como divergir.
- [ ] **Regra de casa nova** (no CLAUDE.md): toda entrega que cria um botão acrescenta a linha dele no manual e a chave no en.js, como já incrementa o BUILD e escreve a NOVIDADE.

---

## r308 · o céu visto da Lua e de Marte

- [ ] **O botão.** Abra o card de MARTE ou da LUA (qualquer modo, no mapa do Sol): ◎ O CÉU VISTO DE MARTE / DA LUA. Abre direto no último sítio (Jezero e o Mar da Tranquilidade de fábrica); o ⛶ do mapa grande lista nove sítios em cada mundo, com o minimapa desenhado do próprio corpo.
- [ ] **A TERRA NO CÉU DA LUA.** Do Mar da Tranquilidade ela está a 64° de altura, azul, com a fase ao contrário da Lua daqui (hoje a Lua está 75%, a Terra vista de lá 26%) e 1,8° de diâmetro, quase quatro Luas. Ela não nasce nem se põe: acelere o relógio a 1 s = 1 dia e veja o Sol passar enquanto ela fica. Vá ao VON KÁRMÁN (lado oculto) e ela some para sempre. Medido por sonda: 86° do centro do lado visível, -47° do lado oculto.
- [ ] **O céu preto ao meio-dia.** Na Lua não tem ar: o céu é preto com o Sol a 59° de altura, sem crepúsculo e sem névoa no horizonte. As estrelas continuam lá de dia. Diga se o chão cinza convence.
- [ ] **MARTE.** Em Jezero o Sol tem 0,35° (contra 0,53° daqui), o céu de dia é caramelo e o pôr do sol é AZUL em volta do Sol (é real: a poeira fina espalha o azul para a frente, o contrário daqui). A Terra aparece como planeta na lista, com a dica de estrela da tarde. Acelere para 1 s = 1 h: o Sol repete a posição a cada 24 h 39 min, não a cada 24 h.
- [ ] **HOJE À NOITE em outro mundo** varre um dia do MUNDO (na Lua, 29,5 dias terrestres), lista a Terra como alvo, e não tem faixa de nuvem nem passagens da ISS, que só existem daqui.
- [ ] **O que não mudou:** o planetário da Terra é o mesmo de antes, pela mesma porta, conferido por sonda (resultado idêntico ao da função antiga).
- [ ] **HONESTIDADES que estão na tela:** os horários seguem em UTC da Terra (a linha diz HORÁRIO DA TERRA); a libração da Lua (até 8°) fica de fora, então a Terra paira PERTO do lugar exato; Fobos e Deimos não entram porque a fase orbital deles não tem âncora real no app.
- [ ] **Bug pego pela sonda antes do ar:** a base equatorial do mundo tinha duas linhas iguais, e a Terra caía 10° ABAIXO do horizonte vista do centro do lado visível. A fumaça não pegaria nunca: só o teste de física pegou. Segundo: de Marte a Terra entra na lista de planetas e o planetário não tinha sprite para ela: quebrava o quadro.
- [ ] **Conquista nova:** OBS-04 · O CÉU DE OUTRO MUNDO.

---

## r307 · treze conquistas, cinco patentes e o registro honesto

- [ ] **As 13 conquistas novas** (registro de bordo ▤ · ⬡ CONQUISTAS): três de observatório (abrir o planetário, o NOITE, ver uma passagem da ISS), cinco das camadas ao vivo (travar num satélite, ficha de tremor, aurora, T-0 de um lançamento, chegar ao chão em ladrilhos), quatro de bancada e compartilhar (seis mundos, o cartão, o link da vista, a linha do tempo de uma sonda) e uma do céu (catalogar uma chuva). Cada uma diz como fazer. Faça uma e veja o selo.
- [ ] **Os cinco degraus novos:** COMODORO (100), VICE-ALMIRANTE (135), ALMIRANTE DE ESQUADRA (170), GRÃO-ALMIRANTE (205) e GUARDIÃO DO CATÁLOGO (235). Os oito de baixo mantêm os nomes de sempre (ninguém é rebaixado); só três descrições mudaram porque tinham ficado falsas com o atlas crescendo.
- [ ] **Os toasts não se engolem mais.** Faça duas conquistas seguidas (ou uma que promova): os avisos aparecem um depois do outro, 3 segundos cada. Medido por sonda: conquista, promoção, conquista, na ordem.
- [ ] **O Faltam N ficou honesto.** No registro, a linha embaixo da patente contava com o número cru de corpos enquanto a patente somava as conquistas: com 22 conquistas o erro era de 44 pontos cravados. Agora as duas contas são a mesma.
- [ ] **A promoção compara o degrau, não o nome.** Troque o idioma nas configurações: não pode aparecer ★ PROMOVIDO só por isso (antes aparecia, porque o nome guardado mudava de língua). Quem já tinha patente migra sem perder nada.
- [ ] **ONDE CHEGAMOS** (filtro do registro) foi de 40 para 84 corpos, validados contra o atlas: entraram as luas que a Cassini, a Voyager 2 e a New Horizons fotografaram, o 67P onde a Philae pousou, os alvos da Lucy, a Parker e a JUICE; saíram iapeto (typo) e itokawa (não existe no atlas).
- [ ] **A conta de 35 conquistas vale 70 pontos de bônus na carreira** (cada uma segue valendo 2). Me diga se você acha que subiu rápido demais ou devagar demais depois de brincar um pouco.

---

## r306 · os lançamentos de foguete ao vivo

- [ ] **A camada.** Filtro ≋ · PRÓXIMOS LANÇAMENTOS DE FOGUETE, escala 1:1, chegue perto da Terra: cada base com lançamento marcado nos próximos dias vira um cone âmbar na superfície (Wenchang, Vandenberg, Cabo Canaveral, Kourou, Mahia...). O próximo ganha rótulo com a contagem regressiva andando.
- [ ] **A ficha.** Toque num cone: foguete, quem lança, a missão, a órbita, o status e a precisão do horário. A linha AGORA mostra a contagem viva. Dois botões: **◈ IR AO T-0** leva o relógio a 30 s da decolagem, **◎ VER A BASE** põe a câmera em cima da plataforma (conferido por sonda: 0 grau de desvio).
- [ ] **Nos eventos do relógio** (◈ · ESCOLHER UM EVENTO DO CÉU) apareceu o chip LANÇAMENTOS, com os mesmos 20 lançamentos: funciona no mapa cênico também, onde não há cone. Escolher um leva o relógio ao T-0, e no 1:1 perto da Terra abre a ficha da base.
- [ ] **Sem chave e com cache.** Os dados vêm da Launch Library 2 (The Space Devs), que limita quem não tem conta a poucos pedidos por hora: a resposta fica guardada 6 horas no seu navegador. Se aparecer LANÇAMENTOS: NÃO CARREGOU, é isso.
- [ ] **O horário ainda está em UTC** na ficha (o fuso só existe dentro do planetário). Me diga se quer a hora de Brasília ali.
- [ ] **Bug pego pela sonda antes do ar:** com a ficha de um lançamento aberta, a trava de centro ia perseguir o CONE em vez do centro da Terra (o id do lançamento é um número, igual ao do marcador), e a câmera caía 133 graus longe da base. Hoje os tremores, os satélites e os lançamentos travam na Terra.
- [ ] **Uma novidade de arquitetura que você não vê:** o card ganhou botões próprios por ficha (o gancho acoes). O planetário e outros cards vão poder usar isso.

---

## r305 · o link que leva ao instante

- [ ] **O ⧉ no canto da ficha.** Enquadre alguma coisa (o eclipse, a ISS passando, a Apollo no meio da rota), toque no ⧉ ao lado do ✕ e cole o link numa aba anônima: a pessoa cai exatamente no que você estava vendo, com a mesma câmera, a mesma data, as mesmas camadas e o mesmo lugar do planetário.
- [ ] **O link antigo não mudou.** O #corpo=, o #sistema= e o #galaxia= continuam curtos e legíveis como sempre. Este é um segundo formato, só para quando você quer o instante exato.
- [ ] **Colar numa aba JÁ ABERTA** também funciona (era um buraco que a auditoria achou no #bancada=).
- [ ] **O que NÃO viaja, de propósito:** os seus filtros de linha e de objeto, que são preferência pessoal de quem recebe. Viajam só as seis camadas que fazem a vista ser o que é: satélites, terremotos, ladrilhos, aurora, constelações e nomes das estrelas. Me diga se você quer mais alguma junto.
- [ ] **Um tutorial contextual pode aparecer** para quem abre o link, se ele ligar uma camada que a pessoa nunca viu (os satélites, por exemplo). Achei que explica o que ela está vendo, mas se você achar intrusivo eu suprimo.
- [ ] **Conferido por sonda:** a câmera volta com 0 km de erro no pivô, a data bate, e abrir o app direto por um link de vista cai no lugar certo. De carona, a sonda pegou um TDZ meu antes de ir para o ar (o mesmo tombo do r232 e do r291).

---

## r304 · a aurora ao vivo

- [ ] **A camada.** Filtro ≋ · AURORA AO VIVO NA TERRA, escala 1:1, chegue perto da Terra e gire para o lado da NOITE: o oval verde aparece em volta do polo magnético. Nasce desligada, e só baixa os dados quando você liga (142 KB comprimidos).
- [ ] **Só do lado escuro.** Gire para o lado do dia: ela some, como tem que ser. E de longe ela apaga sozinha, senão viraria um aro verde em volta de um grão.
- [ ] **O card do Sol ganhou a linha AGORA**, com o índice Kp deste minuto, o nível (céu calmo, agitado, tempestade menor...) e as escalas R/S/G do NOAA. Aparece depois que a camada carrega.
- [ ] **A HONESTIDADE, e eu quero sua opinião.** O verde é uma ESCALA de probabilidade, não a cor medida, e o que o modelo entrega é a CHANCE de ver aurora naquele ponto, não uma foto dela. Está escrito no CREDITOS.md. Acha que precisa estar escrito também na tela?
- [ ] **Hoje o céu está calmo** (Kp 0, pico de 18 por cento de chance), então o arco é suave. Se der uma tempestade solar nas próximas semanas, vale reabrir: a diferença é grande.
- [ ] **Conferido por prova numérica:** 7 de 7 pontos batem entre o que o shader lê em cada (latitude, longitude) e o que a fonte gravou, e 100 por cento dos pixels acesos estão acima de 50 graus de latitude, com o pico em -71. Mais o print do oval sul com as luzes das Américas no terminador.
- [ ] **Bug de carona consertado:** a linha AGORA da LUA misturava dois relógios, a hora vinha do relógio de parede e a fase do relógio simulado. Viaje para 2029 e confira que os dois falam da mesma data agora.

---

## r303 · hoje à noite

- [ ] **O botão NOITE no planetário.** Card da Terra, ◎ ABRIR O PLANETÁRIO, e o botão **NOITE** no cabeçalho: a lista do que vale a pena olhar deste lugar nas próximas horas, do mais alto no céu para o mais baixo, com a altura, o rumo e a hora de cada um.
- [ ] **A dica de como achar.** Cada astro vem com uma linha honesta: Júpiter com o binóculo mostrando as luas de Galileu, Saturno com os anéis pedindo telescópio pequeno, Mercúrio baixo e no clarão do crepúsculo.
- [ ] **A barrinha de nuvem.** Vem do Open-Meteo (sem chave, 1,4 KB), uma barra por hora da noite: barra alta e verde é céu limpo, baixa e roxa é fechado. Confira contra a previsão do tempo que você usa. Se a rede falhar, o card continua funcionando sem ela.
- [ ] **OS HORÁRIOS AGORA SÃO OS DO LUGAR.** Era o NÃO FEITO do r296: as passagens da ISS só existiam em UTC. O fuso vem de carona na previsão do tempo, então escolha Tóquio ou Lisboa no mapa grande e confira se os horários fazem sentido para lá.
- [ ] **▶ VER NO CÉU** leva o relógio ao melhor momento do astro e vira o olhar para ele.
- [ ] **O BUG DA TIANGONG (achado da auditoria).** Na lista do botão ISS, ▶ VER ESTA PASSAGEM mirava SEMPRE a ISS, mesmo nas passagens da Tiangong: o relógio andava e o olhar não se mexia, em silêncio. Agora mira a estação certa, e avisa quando ela não está acima do horizonte.
- [ ] **Polo Norte em setembro** deve dizer SEM NOITE AQUI (dia polar). Conferido por sonda.
- [ ] **Conferência independente:** as alturas de Mercúrio, Vênus, Marte, Júpiter e Saturno para São Paulo nesta noite batem dentro de 1 grau com um Kepler escrito do zero, e o fim do crepúsculo dentro de 2 minutos.

---

## r302 · o relógio honesto e o tutorial destravado

- [ ] **A FASE DA LUA SE CONTRADIZIA NA MESMA TELA.** O balão do disquinho do relógio dizia uma coisa (mês sinódico médio, interpolação linear) e o planetário, dois cliques adiante, dizia outra (Meeus com 60 termos): até 9,2 pontos de iluminação de diferença, e o NOME da fase saía diferente em 10 por cento das horas do ano. Agora os dois usam a mesma conta. Confira passando o mouse no disquinho e abrindo o planetário na mesma data.
- [ ] **A prova do eclipse.** Ponha o relógio em 12 AGO 2026 17:46 UTC (eclipse total do Sol): a Lua tem que estar em LUA NOVA com 0 por cento. E em 28 AGO 2026 04:13 (eclipse lunar): LUA CHEIA com 100 por cento. Medido: elongação de 0,07 e 179,94 graus. O modelo antigo dava 352,89 no primeiro.
- [ ] **AS ESTAÇÕES ESTAVAM NO DIA ERRADO.** O relógio · ◈ · EVENTOS gerava as quatro estações com o dia escrito à mão no código, igual para todo ano. O equinócio de setembro de 2026 é dia **23 às 00:05 UTC**, não 22; o de 2027 também é dia 23; e o solstício de dezembro de 2027 é dia 22, não 21. Agora vem da série de Meeus e mostra a HORA (o aviso de data aproximada saiu das quatro).
- [ ] **A conferência que fecha sozinha:** a conta nova reproduz a constante do solstício de junho que o app já carrega desde o r171 com 1 minuto de diferença.
- [ ] **O TUTORIAL TRAVAVA PARA SEMPRE.** Com a escala 1:1 ligada, os passos 5, 6 e 7 do tutorial de boas-vindas eram impossíveis de cumprir (eles testavam a troca de cena, que no 1:1 não existe): o PRÓXIMO ficava desabilitado e a única saída era PULAR, que marca as boas-vindas como vistas de vez. Teste: ligue a escala 1:1, apague os dados do site e recarregue.
- [ ] **O passo das sondas prometia o que não entregava:** ele mandava ligar a LINHA das sondas e dizia que as rotas apareceriam, mas o OBJETO sondas nasce desligado e a rota é filha dele, então nada aparecia e o check fechava assim mesmo. Agora ele pede os dois.

---

## r301 · a Lua e Marte em ladrilhos, e o relógio de Marte

- [ ] **A Lua em detalhe.** ⚙︎ EXTRAS, ligue SUPERFÍCIE EM LADRILHOS, vá para a escala 1:1, entre na Lua e aproxime: a pele vira o mosaico LRO a 83 m por pixel. Procure Tycho (com os raios) e o Mar da Tranquilidade. Medido por sonda: os ladrilhos entram em 1,8 s, e o print mostra o lado oculto em detalhe, sem costura.
- [ ] **Marte em detalhe.** O mesmo em Marte, com o mosaico Viking a 325 m por pixel: Valles Marineris, Olympus Mons, a bacia Hellas, a cratera Jezero.
- [ ] **A COR DE MARTE, e aqui eu quero sua opinião.** O mosaico Viking é mais acinzentado que o Marte desenhado do app, então dá para ver a emenda entre a área com ladrilho e o resto da esfera. É o dado real da NASA, sem retoque. Quer que eu deixe honesto assim, ou que eu puxe a cor dos ladrilhos de Marte para o alaranjado do desenho para a emenda sumir?
- [ ] **MARTE GIRAVA PELO HORÁRIO DE GREENWICH.** O dia marciano tem 24 h 39 min, e o planeta usava a conta da Terra desde sempre: o erro ia de -169 a +150 graus, ou seja o lado ERRADO pegando sol. Agora é o Mars24 do GISS. Confira com o relógio acelerado em 1 s = 1 h: Marte dá a volta em uns 24 s e meio, não em 24. Conferido contra a rotação IAU: as duas contas ficam dentro de 0,29 grau em 31 anos.
- [ ] **O toggle mudou de nome** para SUPERFÍCIE EM LADRILHOS DA NASA · TERRA, LUA E MARTE, e o tutorial da primeira ligada fala dos três.
- [ ] **A Terra continua igual.** O caminho dela não mudou em nada (mesma camada do dia, mesma reserva Blue Marble, mesmo Blue Marble no futuro e no passado).

---

## r300 · o painel de novidades

- [ ] **O ponto âmbar no `?`.** Abra o app: uns segundos depois aparece um pontinho âmbar no canto do botão `?` e um aviso discreto passa uma vez. Ele só aparece quando tem build que você ainda não reconheceu, e apaga sozinho quando você abre o painel.
- [ ] **O painel.** Abra o `?` e clique em **✦ O QUE MUDOU NESTA VERSÃO**: a lista das 14 entregas mais recentes, da mais nova para a mais velha, com as não vistas marcadas em âmbar. Medido por sonda: 14 itens, 12 marcados como novos para quem parou no r280.
- [ ] **O ▸ VER leva à feature.** Cada entrada que tem destino ganha um botão: o do planetário abre o planetário, o das luas novas voa até Netuno, o dos satélites abre o filtro. É isso que faz o painel valer mais do que um texto.
- [ ] **Visitante de primeira viagem não vê nada.** Abra numa aba anônima: o painel fica calado e quem manda é o tutorial de boas-vindas, como sempre foi. Conferido por sonda.
- [ ] **O ESC.** Com o painel aberto por cima do manual, o primeiro ESC fecha o painel e o manual continua lá; o segundo fecha o manual.
- [ ] **Em inglês.** Troque o idioma e abra de novo: as 14 entradas, os títulos, as datas e os botões estão traduzidos.
- [ ] **Uma linha por entrega daqui para a frente.** A partir de agora toda entrega acrescenta a linha dela na tabela NOVIDADES, como já incrementa o BUILD. Se você achar o texto comprido ou curto demais, me diga o tom que eu calibro.

---

## r299 · o pacote do celular e da primeira visita

- [ ] **O ✕ do planetário no celular.** Abra o card da Terra, ◎ ABRIR O PLANETÁRIO, e feche pelo ✕. Antes a barra ⌕ ▤ ⋯ ficava por cima dele e cobria 28 dos 30 px: no celular não havia saída nenhuma (não existe ESC lá). Vale também para registro, busca, comparar, manual, bancada, eventos, satélites e a caixinha de rotas.
- [ ] **O celular esquentando menos.** Deixe o planetário aberto por uns minutos no celular, que é o que o r297 pede ao mandar apontar o aparelho para o céu. O mapa atrás parou de ser desenhado: medido por sonda, de 119 quadros por segundo para ZERO enquanto o modal está aberto, com os satélites e os ladrilhos também em repouso. A câmera continua correndo, então fechar não dá salto.
- [ ] **A primeira visita ficou uns 70 por cento mais leve.** Abra o site num celular no 4G com o cache limpo. As fotos da NASA (1,43 MB comprimidos) não descem mais para quem está no modo DESENHO, que é o padrão desde o r172. Quem liga o botão FOTO baixa na hora, com o aviso BAIXANDO AS FOTOS DA NASA (medido: 268 ms no desktop).
- [ ] **O botão FOTO continua aparecendo em Júpiter, Saturno, Vênus, Mercúrio e Netuno**, que são os corpos que só têm foto. Essa era a armadilha do conserto, e está conferida por sonda nos oito.
- [ ] **A pinça voltou no celular.** O user-scalable=no saiu do viewport: agora dá para ampliar com dois dedos o texto de 8,5 px da ficha e dos popovers. A pinça da câmera no mapa não mudou, ela nunca dependeu disso.
- [ ] **O ESC na ordem certa (desktop).** Abra o ⚙︎ e depois o registro ▤: o primeiro ESC fecha o registro, que está por cima, e não o popover escondido atrás dele. O segundo ESC fecha o popover. Medido por sonda.
- [ ] **A caixinha de rotas (tecla T) em celular deitado.** Ela agora rola por dentro e o cabeçalho com o ✕ fica fixo. Antes as 10 rotas davam 645 px de conteúdo e o ✕ saía da tela, sem clique-fora para fechar.
- [ ] **Os botões do relógio, do seletor de data e da barra do tour no celular** ficaram de 30 px (eram uns 14x10). Confira se a linha do relógio não quebrou em duas no seu aparelho.
- [ ] **A NEBULOSA DA FORMIGA tinha dois marcadores** em cantos opostos da galáxia, os dois abrindo a mesma ficha, e um corpo fantasma no catálogo (NÚCLEO DA FORMIGA, que contava no total e não existia em mapa nenhum). Agora é uma só, e o que a versão velha tinha de melhor (o laser natural de 2018 e a largura de 1,6 ano-luz) entrou na ficha viva, com a ressalva honesta de que as medidas de distância vão de 3.000 a 8.000 anos-luz.
- [ ] **A galáxia SOMBRERO também estava duplicada** no universo, com duas fichas que se contradiziam (31 e 29,3 milhões de anos-luz). Ficou a boa. EFEITO COLATERAL A CONFERIR: o desenho procedural do REDEMOINHO mudou um pouco, porque ele andou uma casa na lista das galáxias. Diga se ficou melhor ou pior.
- [ ] **Os contadores caíram de propósito:** 253 para 252 corpos e 8 para 7 galáxias, porque os dois duplicados saíram. O registro de bordo mostra os números novos.

---

## DECISÕES QUE SÓ VOCÊ PODE TOMAR

Não são testes: são escolhas que travam trabalho meu até você responder.

- [ ] **Licença do repositório.** O repo é público e carrega 89 MB de música autoral sua, mais dados de NASA, USGS, CelesTrak e Yale BSC5, e não tem arquivo LICENSE. Código e álbum podem ter licenças diferentes (por exemplo MIT no código e "todos os direitos reservados" na música).
- [ ] **Terceiro idioma.** Se espanhol entra algum dia, vale generalizar a arquitetura ANTES (1 build, enquanto o custo é refatorar dois pontos). Se nunca entra, eu paro de pagar esse imposto em toda entrega. Custo medido por idioma depois da generalização: 13.023 strings.
- [ ] **A oitava galáxia.** O Sombrero duplicado saiu e ficamos com 7. Quer que eu ponha uma galáxia de verdade no lugar (M81 ou M82, as duas da Ursa Maior, vizinhas e fotogênicas) para voltar a 8, ou fica em 7?
- [ ] **Testar r296, r297 e r298 no celular de verdade.** São as três entregas mais recentes e a auditoria de 81 agentes não achou NADA nelas, o que quer dizer que ninguém olhou, não que estão certas. O código dos sensores só roda no aparelho: passagens da ISS, APONTAR, GPS e a faixa da Via Láctea.

---

## O acumulado, de r298 a r131

- [ ] r298 · A FAIXA DA VIA LÁCTEA: no planetário de noite (ex.: São Paulo às 22h, olhando para o oeste) a faixa difusa passando por Sagitário e Escorpião com o bojo e a fenda escura; no mapa do Sol (cênico e 1:1) o mesmo brilho no céu, sumindo ao afastar de casa; dizer se fica, se está forte ou fraca demais.
- [ ] r297 · PLANETÁRIO no celular: botão APONTAR (pede permissão): apontar a parte de trás do celular para a Lua ou uma estrela e ver o nome; se a bússola errar, arrastar de lado corrige; girar o celular de lado (paisagem) e dizer se o céu rola junto certo; botão GPS (pede permissão): o lugar vai para a sua posição.
- [ ] r296 · PLANETÁRIO · botão ISS no cabeçalho: a lista das passagens visíveis da ISS e da Tiangong nos próximos 5 dias do lugar escolhido; ▶ VER ESTA PASSAGEM leva o relógio ao ponto alto e vira o olhar; a estação cruza o céu como um ponto âmbar (cinza na sombra da Terra), tocar nela abre a ficha; conferir com o Heavens-Above ou o app da NASA se os horários batem (UTC).
- [ ] r295 · ⚙︎ EXTRAS · TERRA EM LADRILHOS DA NASA (experimental): ligar, ir ao 1:1, ENTRAR na Terra e aproximar até quase encostar (uns 130 km): a pele vira a foto de satélite de ontem, com as nuvens; mudar a data do relógio para outro dia (desde NOV 2015) troca a foto; no celular, dizer se pesou.
- [ ] r294 · card da Terra: ◎ ABRIR O PLANETÁRIO (o nome novo): o chão virou paisagem, sem grade, com os morros no horizonte e o chão em perspectiva; olhar para baixo, para o horizonte e para cima de dia, ao pôr do sol e de noite; os nomes de dia estão escuros com halo claro; dizer se o chão convence.
- [ ] r293 · a terceira lapidada: no céu de um lugar o chão é opaco (nada aparece através dele) e as estrelas ficam visíveis de dia; a rota A CORRIDA DA LUA no 1:1 roda as missões; o ⚖ comparar não vaza contexto WebGL; no /en a bancada e o comparar leem os tamanhos; as configurações e o filtro rolam por dentro no celular com o ✕ fixo; alvos de toque maiores; ◂ ▸ do tour sem paradas fantasmas.
- [ ] r292 · céu de um lugar de dia: o chão virou um piso de planetário (horizonte fino, meridianos e anéis de largura constante, névoa no horizonte); dizer se agora ficou bom ou o que falta.
- [ ] r291 · a segunda lapidada: sem vazamento de memória ao navegar (o céu profundo era recriado e nunca liberado), ?aula= volta a abrir, links com &escala=real trocam o modo de verdade, S e T fecham o registro antes de abrir, o seletor de data aparece por cima do céu de um lugar, e a busca/tour/régua/registro traduzidos por inteiro no /en.
- [ ] r290 · a varredura dos agentes: 27 consertos (ESC e o segundo toque fechando como o ✕, o marcador de sistema no céu galáctico, os popovers fechando no ESC, eventos em inglês, a oposição de Júpiter em 11 FEV 2027, o eclipse lunar igual de qualquer lugar, as estrelas do céu local com a precessão, sem vazamentos ao ligar e desligar os satélites).
- [ ] r289 · no card: o compartilhar virou o ícone ⇪ ao lado do ✕; no CÉU DE UM LUGAR: 5 mil estrelas reais de noite, os nomes das constelações, tocar num astro abre o card ali dentro, o chão de dia com a grade, ⛶ abre o mapa grande com a busca de lugares (ex.: Lisboa, Mauna Kea), pinça no celular.
- [ ] r288 · card de Netuno: NÁIADE, TALASSA (a dança de esquiva) e DESPINA; card de Urano: BIANCA, CRÉSSIDA e JULIETA (o enxame de Pórcia); no 1:1 as seis orbitam coladas nos anéis.
- [ ] r287 · card da Terra: ◎ VER O CÉU DE UM LUGAR, tocar num ponto da Terra: o planetário desse lugar na data do relógio (arrastar gira, bússola, mapa clicável com zoom, HUD, ◈ data); testar o eclipse total de 12 AGO 2026 17:46 UTC vendo da Islândia ou da Espanha (a Lua cobre o Sol) e o lunar de 28 AGO 04:13; a Lua do relógio ficou neutra (norte para cima).
- [ ] r286 · card da Terra (1:1): ◎ O CÉU DE HOJE: a Lua, os planetas (a leste = anoitecer, a oeste = madrugada) e os cometas perto do periélio; MIRAR põe a câmera na Terra olhando para o astro; tutorial na primeira vez; mude a data no relógio e reabra.
- [ ] r285 · card de Saturno: JANO e EPIMETEU (o par que troca de órbita) e TELESTO e CALIPSO (as troianas de Tétis): 16 luas no mapa agora.
- [ ] r284 · canto do relógio: o disquinho da Lua com a fase de hoje (passe o mouse: fase, idade, próximo eclipse); tocar abre os eclipses; mude a data e veja a fase mudar.
- [ ] r283 · satélites (1:1): tocar num pontinho ou na ISS perto da Terra só abre a ficha (a câmera fica na Terra); ▶ ENTRAR · TRAVAR NO SATÉLITE voa e trava; o James Webb ficou do tamanho de um pontinho a qualquer zoom; travado no Webb, a Terra lá longe não mostra mais a nuvem de satélites.
- [ ] r282 · no mapa do Sol: PONS-BROOKS (o cometa do diabo de 2024, órbita em pé de 71 anos, linha do tempo 1954-2095 com a explosão dos chifres) e o ATLAS G3 (o de janeiro de 2025, visto de dia, desfeito na saída; no 1:1 a hipérbole raspa a 0,094 UA).
- [ ] r281 · card de Fobos: a seção A MMX (a sonda da JAXA que vai pousar lá e trazer amostra); relógio · EVENTOS: MMX DECOLA PARA FOBOS (OUT 2026); card da Terra: a fileira AS CHUVAS DE METEOROS (tocar num badge abre o cometa pai) e a seção com as dez chuvas.
- [ ] r280 · satélites (1:1): afastando, eles somem por altitude (ISS a ~190 mil km, GPS a ~740 mil, MMS fica até 5 milhões); nada de nome no zoom de sistema; nomes sem piscar; ISS com zoom até o desenho; nome não aparece atrás da Terra; ≋ · CONFIGURAR OS SATÉLITES AO VIVO (grupos, cores, lixo); tutorial na primeira vez; fechar a ficha de perto não joga mais no Sol.
- [ ] r279 · no mapa do Sol: os cometas WIRTANEN (o de Natal de 2018, alvo original da Rosetta), GIACOBINI-ZINNER (Dracônidas, o primeiro visitado por sonda) e TUTTLE (Ursídeas, núcleo duplo); fichas, linhas do tempo; no relógio, ◈ EVENTOS: DRACÔNIDAS 8 OUT e URSÍDEAS 22 DEZ.
- [ ] r278 · card de Euríbates: a lua QUETA; card de Pátroclo: MENÉCIO (ENTRAR mostra o par); no cinturão, DINKINESH com a lua dupla SELAM (a primeira parada da Lucy).
- [ ] r277 · satélites: pontos redondos; tocar num pontinho trava a câmera nele, mostra o nome e libera o zoom até o desenho; buscar um satélite (ex.: COSMOS, STARLINK, GPS) voa até ele; o ✕ devolve a Terra; os nomes não empilham; ficha com OPERADOR; « » andam entre os corpos do 1:1.
- [ ] r276 · satélites no celular, de novo: os nomes só nos que estão na frente da Terra, acompanhando o arrasto e sem sumir com a ficha aberta; tocar num pontinho não solta mais a Terra (era o 'seleciona o Sol'); o seletor de data no celular agora abre no topo.
- [ ] r275 · card de Éris: a lua DISNOMIA (a balança que rebaixou Plutão) e a seção A PESAGEM.
- [ ] r274 · no mapa do Sol: os troianos EURÍBATES e HEITOR (60 graus à frente de Júpiter) e PÁTROCLO (atrás), nos dois modos; card da Terra, SONDAS: a LUCY com a linha do tempo dos sobrevoos.
- [ ] r273 · card da Parker: ≋ LINHA DO TEMPO percorre a elipse de 88 dias com os marcos dos mergulhos na coroa.
- [ ] r272 · satélites ao vivo (celular e desktop): de longe só pontinhos; chegando perto a ISS, a Tiangong e o Hubble viram o desenho do tamanho do pontinho; tocar num pontinho abre a ficha; os 5 mais perto do centro da tela ganham nome; o James Webb parou de dar a volta em minutos (fica em L2, 180 dias).
- [ ] r271 · no cinturão: HÍGIA (a quase-esfera candidata a planeta anão) e INTERAMNIA (a escura de 17 graus), com fichas e órbitas reais no 1:1.
- [ ] r270 · card da Terra, SONDAS: JUICE e EUROPA CLIPPER (o arco até a posição de hoje e a linha do tempo das catapultas) e a PARKER numa elipse de 88 dias raspando o Sol (no 1:1 a elipse de 0,046 a 0,73 UA).
- [ ] r269 · card da ISS: as seções OS MÓDULOS (Zarya a Nauka) e A APOSENTADORIA (2030, o veículo da SpaceX, o ponto Nemo).
- [ ] r268 · card da Terra, satélites: SKYLAB e MIR (fichas históricas) e TIANGONG (ativa, e ao vivo com os satélites ligados); bancada: preset AS ESTAÇÕES ESPACIAIS com os quatro modelos.
- [ ] r267 · no mapa do Sol: HYAKUTAKE (a cauda de 570 milhões de km, 1996) e McNAUGHT (visto de dia em 2007) com cauda, ficha e linha do tempo; no 1:1 os dois estão a 55 e 41 UA.
- [ ] r266 · card de Júpiter: MÉTIS e TEBE nas luas (as internas dos anéis) e a seção OS ANÉIS; os quatro gigantes têm a ficha dos anéis agora.
- [ ] r265 · no MAPA CÊNICO também: ligar SATÉLITES (objeto) no filtro e olhar a Terra: a ISS, a Tiangong e o Hubble desenhados orbitando com a inclinação e o período reais (altitude comprimida, a ficha avisa 'estimada'); ligar SATÉLITES (linha) para as órbitas.
- [ ] r264 · no 1:1, ligar SATÉLITES (objeto) no filtro ≋: os ~310 de verdade entram (o toggle antigo sumiu); a ISS e o Hubble aparecem com o modelo desenhado e o card de sempre com a linha AGORA; clicar em qualquer pontinho abre a ficha dele; ligar SATÉLITES (linha) desenha as órbitas dos próximos 90 min; ENTRAR na ISS voa até ela.
- [ ] r263 · card de Netuno: GALATEIA (a pastora dos arcos) e LARISSA nas luas, e a seção OS ANÉIS E OS ARCOS.
- [ ] r262 · no 1:1, ligar TERREMOTOS DAS ÚLTIMAS 24 H no filtro ≋ e chegar na Terra: os pontos na superfície (o maior com nome); clicar num deles abre a ficha do tremor.
- [ ] r261 · no 1:1, ligar SATÉLITES AO VIVO NA TERRA no filtro ≋ e chegar perto da Terra: uns 310 satélites de verdade (ISS, Tiangong, Hubble com nome, GPS, Galileo, GLONASS) girando com o relógio; acelerar o relógio para ver a ISS dar a volta em 90 min; conferir se pesou no celular.
- [ ] r260 · céu com constelações ligadas: os TRIÂNGULOS DE VERÃO (Vega, Altair, Deneb) e DE INVERNO (Sírius, Procíon, Betelgeuse) desenhados e clicáveis, com ficha; a conquista das figuras foi a 25.
- [ ] r259 · linha do tempo do HALLEY: começa em 1682 e passa por 1758, 1835 e 1910 com os marcos falando (Twain, o cianogênio); a ficha ganhou AS PASSAGENS com Bayeux e Giotto.
- [ ] r258 · card de Saturno: PAN (o ravióli da divisão de Encke), PROMETEU e PANDORA nas luas (12 no mapa agora) e a seção OS ANÉIS com a idade jovem e a chuva de anéis.
- [ ] r257 · na galáxia e no céu do 1:1: PROCYON (com a anã branca orbitando), ALTAIR e DENEB com ENTRAR; bancada AS ESTRELAS agora com 10 degraus.
- [ ] r256 · card de Urano: PUCK, CORDÉLIA e OFÉLIA nas luas (no 1:1 as pastoras orbitam coladas no anel) e a seção OS ANÉIS com a descoberta de 1977.
- [ ] r255 · no mapa do Sol: FAETONTE (a pedra das Gemínidas, a elipse de 0,14 a 2,4 UA cruzando a Terra) e o cometa THATCHER (Líridas, órbita em pé de 415 anos); nos EVENTOS, Gemínidas e Líridas agora catalogam o pai.
- [ ] r254 · caixinha de rotas (T): AS CHUVAS DE ESTRELAS, cinco paradas pelos cometas das chuvas de meteoros, fechando na Terra.
- [ ] r253 · relógio · ◈ · EVENTOS: chip CHUVAS DE METEOROS (Perseidas, Leônidas, Gemínidas...); escolher uma leva ao dia do pico e, no mapa do Sol, cataloga o cometa pai na ficha.
- [ ] r252 · na galáxia: HD 80606 (o planeta de órbita de cometa, veja a elipse no mapa do sistema), WASP-76 (a chuva de ferro) e PSR J1719-1438 (o planeta de diamante); no 1:1 os três estão no céu na posição real.
- [ ] r251 · Apollo 11 (cênico e 1:1): o foguete aponta o nariz para onde vai, no estacionamento e na saída (era ~33 graus torto por um giro decorativo do modelo mais o giro da Terra).
- [ ] r250 · midia/universatlas-20s.mp4 (e o -vertical): o vídeo v2 com a Terra grande de dia, a Via Láctea de cima e a Apollo 11 saindo da Flórida no fim; dizer o que mudar.
- [ ] r249 · no mapa do Sol (cênico e 1:1): os cometas ENCKE (órbita curta, 3,3 anos) e TEMPEL-TUTTLE (a inclinada ao contrário, 33 anos); abrir as fichas (Táuridas e Leônidas) e rodar as linhas do tempo.
- [ ] r248 · abrir www.universatlas.com/en e visitar as Plêiades, a Nebulosa do Caranguejo, SN 1987A e a galáxia do Sombrero: fichas, hints e o card da galáxia em inglês (era o último lote em português).
- [ ] r247 · midia/universatlas-20s.mp4: o vídeo de 20 s gerado pelo app (mapa cênico de cima e o zoom da Terra à Via Láctea); dizer se serve para postar ou o que mudar no roteiro.
- [ ] r246 · card de qualquer corpo: ⇪ COMPARTILHAR gera a imagem do cartão (no celular abre a folha de compartilhar; no computador baixa o PNG).
- [ ] r245 · em inglês, entrar em Vega, Fomalhaut, Cygnus X-1, Kepler-16, no pulsar Lich ou em K2-18: fichas e cards inteiros em inglês (só nebulosas e aglomerados seguem em português).
- [ ] r244 · APOPHIS perto da órbita da Terra, com a ficha da passagem de 2029; no relógio, ◈ EVENTOS: o marco de 13 ABR 2029 leva o sistema ao instante da passagem.
- [ ] r243 · tour MUNDOS DE ÁGUA: agora nove oceanos (Calisto, Mimas, Dione, Tritão e Ceres entraram); bancada: preset MUNDOS OCEÂNICOS.
- [ ] r242 · em inglês, entrar em TRAPPIST-1, Alpha Centauri, Sirius, Betelgeuse ou no centro da galáxia: fichas e o card do sistema inteiros em inglês (as nebulosas e os exóticos ainda em português).
- [ ] r241 · o cometa SWIFT-TUTTLE (o pai das Perseidas) no mapa, com a elipse retrógrada de 133 anos e a linha do tempo 1992-2126.
- [ ] r240 · no cinturão, BENNU e RYUGU (as pedras das amostras): fichas com a OSIRIS-REx e a Hayabusa2; no 1:1 as duas órbitas cruzam a vizinhança da Terra.
- [ ] r239 · num navegador em inglês (ou celular em inglês), abrir universatlas.com sem nada: já entra em inglês; no seu, em português, nada muda. E o Sistema Solar inteiro (sondas, ISS, cometas, cinturões) está em inglês no /en.
- [ ] r238 · em inglês (/en): as luas (Io, Titã, Encélado, as de Plutão...) e as missões (Apollo, Artemis, Luna, Chang'e, SLIM) agora com a ficha inteira em inglês; sondas, satélites, cometas e regiões ainda em português.
- [ ] r237 · no mapa, o 3I/ATLAS ao lado da ʻOumuamua, com ficha, cauda e a linha do tempo 2025-2027 (a passagem por Marte e o periélio nos marcos); no 1:1 ele dobra a 1,36 UA.
- [ ] r236 · card de Plutão: as cinco luas (Caronte, Estige, Nix, Cérbero, Hidra) com ficha; no 1:1 as quatro pequenas orbitam por fora de Caronte.
- [ ] r235 · no mapa, o TSUCHINSHAN-ATLAS (C/2023 A3) com cauda, ficha e linha do tempo 2023-2026 (o show de outubro de 2024 nos marcos); no 1:1 ele e a ʻOumuamua dobram no periélio real; parada nova na rota AS VIAJANTES.
- [ ] r234 · card de Júpiter: AMALTEIA e HIMALIA nas luas (6 principais); card de Netuno: PROTEU e NEREIDA (3 principais); no 1:1 a Nereida orbita longe e a Amalteia por dentro de Io.
- [ ] r233 · em inglês (/en), abrir a ficha da Terra, de Saturno e do Sol: agora o conteúdo inteiro está em inglês (as luas e as missões ainda em português).
- [ ] r232 · IDIOMA: ⚙︎ configurações · IDIOMA · LANGUAGE: o mapa recarrega em inglês no mesmo lugar (HUD, rastro, card, tutorial, registro; as fichas ainda em português); www.universatlas.com/en abre direto em inglês e o link colado no WhatsApp mostra o cartão em inglês (og_en.jpg).
- [ ] r231 · missão cênica: se a Lua ou a nave aparecerem PRETAS de novo, mandar print e o caminho (mapa ou foco, FOTO ligada ou não): em headless as duas estão acesas nos dois palcos; e node tools/missoes.js agora audita o cênico também.
- [ ] r230 · o link do site tem um cartão novo: o mapa cênico visto de cima com o wordmark (cole o link no WhatsApp; o antigo está guardado em og_old.jpg).
- [ ] r229 · Saturno ganhou HIPÉRION (a esponja caótica) e FEBE (a retrógrada capturada que pinta Jápeto): 9 luas com ficha, e o card diz 274 confirmadas.
- [ ] r228 · o tour no 1:1 é um voo só: as voltas ao sistema não trocam mais de cena, só recuam.
- [ ] r227 · a Apollo agora DECOLA DA FLÓRIDA: a Terra gira ancorada no lançamento (Cabo Canaveral sob a rota no início).
- [ ] r226 · missões: nave do tamanho de cidade, câmera colada, tripuladas na metade da velocidade, splashdown NA superfície, nariz alinhado de saída e as labels das luas sem aglomerar a 1 UA.
- [ ] r225 · A TRILHA: na linha do tempo a rota acende por onde a nave passou, com cauda desbotando, e o caminho à frente fica apagado (sua ideia, em toda missão).
- [ ] r224 · missões no 1:1: o scroll não joga mais a câmera para longe (piso mínimo na linha do tempo) e a nave caiu para 0,16x a Terra.
- [ ] r223 · os shaders compilam atrás da tela de loading: o primeiro F5 frio deve parar de congelar o mapa visível (as linhas crono do Shift+D agora incluem compile).
- [ ] r222 · o popover de EVENTOS ganhou as diagonais do chanfro que faltavam.
- [ ] r221 · tutorial no celular: o menu ⋯ fica por cima do balão, e os passos do voltar e do filtro DEMONSTRAM o caminho (a caixa pisca no ⋯, abriu, pisca no botão); o marcador da galáxia agora diz SISTEMA SOLAR.
- [ ] r220 · POLARIS entrou no atlas (com a história da precessão) e a escada AS ESTRELAS vai da anã branca Sirius B até Betelgeuse, em sete degraus.
- [ ] r219 · na bancada, as estrelas dizem N × SOL (Antares 680 × SOL, não 74 mil × Terra).
- [ ] r218 · linha do tempo no 1:1: a câmera agora chega COLADA na Terra (~200 mil km) acompanhando a nave sair; zoom out livre para ver a rota inteira.
- [ ] r217 · node tools/missoes.js audita as missões sozinho (lançamento, destino, nave, câmera).
- [ ] r216 · no 1:1, ENTRAR numa estrela do céu VOA até ela no mesmo mapa, e o zoom out do sistema devolve ao mapa estacionado onde você estava (ESC traz para casa).
- [ ] r215 · ALDEBARAN, RIGEL e ANTARES entraram como sistemas navegáveis (cênico e 1:1 com ENTRAR pelo céu), e a bancada ganhou o preset AS ESTRELAS com a escada Sol → Betelgeuse.
- [ ] r214 · o lançamento das sondas ganhou marcador âmbar na Terra da partida e o começo da rota aceso.
- [ ] r213 · toda sonda agora é LANÇADA DA TERRA de verdade: a câmera chega no lançamento com a Terra ali (era o vazio de 2 por cento que você viu na Voyager 2).
- [ ] r212 · missões no 1:1: o foguete ficou menor que a Terra (0,7x) e o zoom da chegada não é mais desfeito em nenhuma missão; auditoria de 7 missões com fins e lançamentos conferidos.
- [ ] r211 · bancada: scroll da casa, sem barrinha fantasma, respiro nas bordas, um botão só no registro, presets LUAS DE JÚPITER e TRAPPIST-1, e ◉ PÔR NA BANCADA em qualquer card.
- [ ] r210 · o botão ⧉ da bancada copia um link compartilhável (#bancada=terra,lua,saturno abre direto com esses mundos).
- [ ] r209 · a busca da bancada aceita as naves: ISS, Hubble, Saturn V entram com os modelos 3D (fora de escala, avisado na legenda).
- [ ] r208 · clique num globo da bancada: abre a ficha do corpo (e o ENTRAR viaja até ele).
- [ ] r207 · bancada: abre centralizada de primeira, a escala segue a sua seleção (tire os gigantes e os pequenos crescem), MERCÚRIO não corta e o disco do Sgr A* cabe.
- [ ] r206 · o anel de Saturno abriu de pôster na bancada (com a divisão de Cassini), e o de Urano aparece de perfil como deve.
- [ ] r205 · Saturno ganhou os ANÉIS na bancada e no comparar, cada coluna diz quantas Terras cabem, e o grupo PERSONALIZADO tem a busca para montar a sua bancada (fica salva).
- [ ] r204 · bancada: os globos das pontas pararam de ficar ovais, desmarcar voltou, o trilho zera ao trocar de grupo, as legendas não empilham mais e o comparar cabe inteiro (com botão ⛶ de ampliar).
- [ ] r203 · o ⚖ comparar dois corpos agora abre com os globos 3D girando em escala e inclinação reais, no lugar das bolinhas chapadas.
- [ ] r202 · na bancada: busque e adicione qualquer corpo do atlas, e ARRASTE os chips para reordenar os globos (funciona no toque também).
- [ ] r201 · a bancada cresceu: grupo SISTEMA SOLAR completo (10 corpos rolando de lado), sem sobreposição, com inclinação real dos eixos e o chanfro da casa.
- [ ] r200 · o boot ganhou cronômetro (Shift+D, linhas crono) e a Lua desenhada não segura mais o carregamento: nasce procedural e troca de pele sozinha 1,4 s depois.
- [ ] r199 · no cênico, ENTRAR num planeta meio sombra chega com ele meio sombra: a fase de iluminação atravessa a troca de cena.
- [ ] r198 · a bancada agora tem grupos: ROCHOSOS, GIGANTES e LUAS GRANDES em escala relativa (registro de bordo · TAMANHOS DO SISTEMA SOLAR).
- [ ] r197 · na barra da missão o botão ⟳ alterna TERRA GIRANDO / PARADA, e o estacionamento agora dura uns 4 segundos legíveis.
- [ ] r196 · os Andes viraram morrinhos de verdade (sem risco reto, sem vazar no mar) e a margem da costa ganhou largura viva e rampa suave.
- [ ] r195 · Apollo 11 no cênico: o foguete parou de girar feito pião, a Terra gira pelos DIAS da missão (ancorada no Sol), a Lua da missão tem o mapa dela e a órbita desenhada.
- [ ] r194 · no zoom galáctico, ◎ VER A GALÁXIA DE CIMA (e o clique na VIA LÁCTEA) agora TRAVA o centro: arrastar orbita a galáxia; fechar a ficha devolve para casa.
- [ ] r193 · sonda escondida pelo filtro aparece ao ser clicada; o ✕ da missão volta à Terra; o zoom da linha do tempo enquadra (era o alvo do zoom deslizante); setas ‹ › somem na missão; botão da bancada no registro de bordo.
- [ ] r192 · a listra vertical dos Andes e das Rochosas sumiu, a margem da costa afinou e as luzes grandes das cidades viraram pontinhos.
- [ ] r191 · no zoom galáctico, o card da VIA LÁCTEA tem ◎ VER A GALÁXIA DE CIMA e a fileira IR PARA (SISTEMA SOLAR primeiro, depois as galáxias famosas).
- [ ] r190 · a Terra v2: as águas dentro da África e do Brasil sumiram, o Egito e o Saara desbotaram para areia e a margem da costa ganhou degradê mais longo.
- [ ] r189 · a Lua desenhada perdeu o buraco preto do polo e a costura de crateras; o brilho em volta era o glow de seleção do cênico, mantido por decisão sua.
- [ ] r188 · abra file:///...#corpo=terra&escala=real (ou marte, lua): agora cai no MAPA 1:1 voando até o corpo, e dali zoom out é só zoom, sem cenas trocando.
- [ ] r187 · na bancada dos mundos habitáveis: os globos agora têm o TAMANHO relativo real (o chip TAMANHO EM ESCALA desliga se quiser) e o Sol da bancada gira: veja a noite varrer os mundos e as cidades da Terra acenderem.
- [ ] r186 · a LUA desenhada agora é o mapa de verdade dela (mares, Tycho, Copérnico) em toda cena, não mais pedra procedural.
- [ ] r185 · NO 1:1: afaste até a galáxia e olhe o rastro do topo mudar sozinho (UNIVERSO › VIA LÁCTEA › ...); clique nos elos: a câmera VOA na mesma cena, sem trocar de modo. E troque cênico/1:1 estando na galáxia: você cai no mesmo lugar do outro modo.
- [ ] r184 · no card da Terra (ou de qualquer mundo com cara de terra): ◉ MUNDOS HABITÁVEIS LADO A LADO abre a bancada com três globos girando e as barras de habitabilidade; os chips trocam os mundos.
- [ ] r183 · entre em VÊNUS e em TITÃ no desenho: a bruma ganhou fluxo de verdade (faixas serpenteando, vórtice no polo), sem perder o estilo.
- [ ] r182 · gire a Terra desenhada para a noite: as cidades acendem nos lugares certos (costa e metrópoles), sem piscar e sem luz no mar.
- [ ] r181 · A TERRA COM OS CONTINENTES: olhe a Terra desenhada (cênico, ou 1:1 sem foto): África, Europa, as Américas e os Andes no lugar, no estilo v2 (plataforma, fundo do mar, neve). E Kepler-452b e os outros mundos habitáveis ganharam o mesmo visual, cada um com continentes aleatórios próprios (sem neve onde não há calota).
- [ ] r180 · entre no CENTRO DA GALÁXIA (1:1) ou no marcador do sgra (cênico): o buraco negro agora é uma sombra com o disco assimétrico da foto do EHT, e S2, S38 e S62 orbitam em volta. Andrômeda tem ENTRAR na ficha do céu. No celular, os alvos do céu ficaram mais fáceis de acertar.
- [ ] r179 · os EIXOS: no cênico e no 1:1, a Terra roda inclinada 23,4 graus, Marte 25, Urano deitado; acelere o relógio no foco e o giro acontece em volta do eixo torto.
- [ ] r178 · TERRA V2: olhe a Terra no cênico (e no 1:1 sem foto): costa recortada com penínsulas, plataforma rasa verde-água, oceano com fundo e serras nevadas. Se não gostar, é um revert só.
- [ ] r177 · no MAPA CÊNICO do Sol, ligue CONSTELAÇÕES no filtro: o céu é o mesmo do 1:1 agora (Órion, Cruzeiro, as 166 estrelas reais, tudo clicável nos dois modos).
- [ ] r176 · no zoom galáctico: clique em ANDRÔMEDA ou numa NUVEM DE MAGALHÃES (ficha + a câmera centraliza), clique no CENTRO DA GALÁXIA e use ENTRAR (o sistema do Sagittarius A* com a estrela S2 é navegoável), e feche o card do SISTEMA SOLAR no ✕ para ver a Via Láctea de cima. 47 Tucanae e Ômega Centauri estão no halo. No celular, o ⋯ tem o ◈ de ir para uma data.
- [ ] r175 · afaste até ver a Via Láctea: ela ganhou disco de luz, núcleo quente e nós azuis nos braços; o fundo de galáxias já aparece a 50 mil AL; SISTEMA SOLAR marca a nossa casa (clique para voltar); e os sistemas do atlas (TRAPPIST, Kepler-452, os Pilares) acendem na posição real conforme o zoom abraça cada um. Sedna e companhia não poluem mais o zoom galáctico.
- [ ] r174 · NO 1:1 as setas ‹ › voam de corpo em corpo sem trocar de cena (com lua na ficha, andam pelas luas). E ligue EFEITO LIGHTSPEED na engrenagem: segure um zoom fundo pela galáxia e os riscos de filme aparecem.
- [ ] r173 · EVENTOS: relógio · ◈ · ESCOLHER UM EVENTO DO CÉU: busque 'eclipse', filtre por tipo e por passado/futuro; escolher um leva o sistema para o INSTANTE exato (e as estações do ano estão lá, ano a ano).
- [ ] r172 · no celular, arraste começando em cima de um NOME: o mapa gira normalmente, e o toque parado no nome continua abrindo a ficha.
- [ ] r172 · clique num corpo e olhe o endereço: virou #corpo=<id> de novo, curto; F5 abre o corpo. Link antigo com &alvo= ainda funciona.
- [ ] r172 · a foto agora é OPÇÃO (nasce tudo desenhado); o botão FOTO/DESENHO funciona também dentro do foco cênico. Com foto, a noite da Terra ficou limpa (era o véu azul do Black Marble) e a nuvem acompanha o terminador do chão.
- [ ] r172 · no foco cênico, gire para o lado da noite: o SOL aparece do outro lado, maior e com halo, exatamente de onde a luz vem; com ele fora de quadro, um clarilão na beirada aponta a direção. A Lua cheia fica oposta ao Sol visível.
- [ ] r172 · no 1:1, chegue em CERES: virou um corpo com relevo e luz (era uma bola chapada). Vesta, Palas e Eros idem.
- [ ] r172 · o seletor de data tem HORA e MINUTO, e os eclipses pulam para o horário exato (28 AGO 2026 04:13 UTC).
- [ ] r171 · AS ESTAÇÕES: no modo desenho, entre na Terra e acelere o relógio para 1 s = 1 mês. A calota do norte recua no verão de lá enquanto a do sul cresce, e o verde de cada hemisfério desbota para ocre no outono dele. Compare 21 de junho com 21 de dezembro no seletor de data.
- [ ] r170 · entre na Terra no modo cênico e gire com o mouse: o centro do giro voltou a ser a Terra, e ela continua deslocada para o lado do card em qualquer ângulo.
- [ ] r170 · as luas voltaram a orbitar no foco da escala 1:1.
- [ ] r169 · a luz e a sombra dos planetas voltaram ao que eram: o fio de luz na borda que eu tinha posto no r168 saiu.
- [ ] r168 · DE LONGE O DESENHO, DE PERTO A FOTO: o mapa cênico voltou a ser o desenhado que você gosta. No 1:1, chegue perto de um planeta e a pele troca para a foto da NASA sozinha, só naquele corpo. O botão do card continua alternando FOTO e DESENHO.
- [ ] r168 · Vênus não fica mais igual à Terra no modo desenho (era um else que caía na textura errada).
- [ ] r168 · os planetas desenhados ganharam um fio de luz na borda iluminada, roubado dos planetas em CSS puro: dá volume sem clarear o disco.
- [ ] r167 · AS FOTOS: abra o mapa e olhe a Terra, a Lua, Marte, Júpiter, Saturno, Vênus, Mercúrio, Urano e Netuno. Agora são os mapas de verdade da NASA, com nuvem e luzes de cidade na Terra. O botão do lado do nome alterna FOTO e DESENHO se quiser comparar.
- [ ] r166 · RELEVO: ligue o LIVE e chegue perto da Terra, girando até o lado da noite. Perto do terminador as cordilheiras e o fundo do mar aparecem em relevo, e a nuvem faz sombra no chão. Vale para a Lua e Marte também: as crateras ficam fundas.
- [ ] r166 · O LINK LEMBRA: clique num corpo e olhe o endereço, agora tem &alvo=. Dê F5 e você volta no mesmo corpo E no mesmo zoom (a câmera fica guardada à parte, para o link continuar legível de compartilhar).
- [ ] r165 · O LADO CERTO: ligue o LIVE na Terra e compare com o NASA Eyes: quem está pegando sol agora é a América, e o planeta gira com o relógio (acelere o tempo e veja).
- [ ] r165 · o modo ao vivo estava QUEBRADO desde o r164 (uma linha de declaração sumiu na reescrita das nuvens). Se você tentou ligar e nada aconteceu, era isso.
- [ ] r165 · a Terra ficou menos de desenho: mar mais fundo, sem aquele contorno azul em volta dos continentes, verde mais fechado e relevo mais fino.
- [ ] r165 · A LUA REFEITA: entre nela. Mares escuros no lugar certo, planalto socado de cratera, Clavius, Platão, Copérnico e os raios do Tycho cruzando meio disco.
- [ ] r164 · O ZOOM DESLIZA: no 1:1, dê um toquinho na roda: a câmera caminha até o ponto em vez de pular. Rolar rápido continua rápido, porque cada giro soma no alvo.
- [ ] r164 · NUVENS NOVAS: ligue o LIVE na Terra. As nuvens agora têm o clima certo (banda no equador, desertos limpos, ciclones em vírgula nas latitudes médias) e são iguais toda vez que você abre.
- [ ] r164 · MARTE AO VIVO: o botão LIVE também aparece em Marte. Procure o Valles Marineris, o Syrtis Major escuro, os vulcões de Tharsis e a fronteira entre o norte liso e o sul cheio de cratera.
- [ ] r164 · sumiu o anel escuro que cercava toda mancha clara das texturas (era o degradê desbotando para preto transparente).
- [ ] r163 · A TERRA: entre na Terra e ligue o botão LIVE do lado do nome. A costa agora é recortada (golfos e penínsulas no lugar de polígonos), o oceano tem fundo, a terra tem relevo, e os Andes e as Rochosas deixaram de parecer um arranhão. A textura dobrou de resolução.
- [ ] r163 · nenhum corpo fica mais com a luz presa na câmera: a varredura do fim do mapa recolhe qualquer pele esquecida (a auditoria tinha achado três).
- [ ] r162 · O ZOOM: no 1:1, gire a roda longe de casa: o passo agora cresce com a distância (até 4x), e colado num planeta continua fininho para enquadrar. Vale para a roda, os botões, a pinça e as teclas + e -.
- [ ] r162 · entrar num corpo no 1:1 para mais longe (7,5 raios no lugar de 2,6): dá para ver o corpo inteiro com folga.
- [ ] r162 · AS LUAS DE MARTE: no 1:1, entre em Marte e procure Fobos e Deimos. Eles eram desenhados com 59 por cento do raio do planeta e agora são os grãos que são de verdade. Mimas, Miranda e a própria Lua também encolheram para o tamanho certo.
- [ ] r162 · o tour também anda no contínuo: no 1:1, a rota inteira vira um voo só, sem troca de cena.
- [ ] r161 · A SOMBRA: no MODO CÊNICO, olhe os planetas no mapa: agora cada um tem dia e noite pelo lado do Sol (antes a luz seguia a câmera e nunca escurecia). Entre num planeta e gire: o terminador fica parado no lugar, e no SISTEMA PLANETÁRIO as luas passam por fases enquanto orbitam.
- [ ] r161 · A LUA NO FOCO: entre na Terra (dois cliques, sem abrir o planetário): a Lua entra exatamente no mesmo lugar em que está no mapa, do lado oposto ao Sol hoje. Vale para as luas de todos os planetas.
- [ ] r161 · modo AO VIVO da Terra de volta como TESTE: botão LIVE do lado do nome TERRA (na ficha e também no mapa 1:1), liga e desliga na hora.
- [ ] r161 · abrir o SISTEMA PLANETÁRIO não dá mais o corte seco nem joga a Terra para a direita e de volta: é o inverso exato da animação de fechar.
- [ ] r160 · luas auditadas: Fobos e Deimos agora dão a volta em Marte no tempo real deles (7 h e 30 h: acelere o relógio no foco de Marte); Urano ganhou ARIEL e UMBRIEL, e JÁPETO finalmente aparece no mapa de Saturno.
- [ ] r157 · O CONTÍNUO PARA DENTRO: no 1:1, clique duas vezes num planeta: a câmera VOA até ele sem trocar de cena, e o zoom continua livre até encostar (1,45 raios). O planeta ganha malha fina, nuvens e atmosfera sozinho quando você chega perto.
- [ ] r156 · A LUA: no 1:1, veja a Terra hoje (28 AGO 2026, noite de eclipse): a Lua está do lado OPOSTO ao Sol, como nos outros apps.
- [ ] r153 · O CONTÍNUO INTEIRO: no 1:1, afaste sem parar. Passando de umas centenas de anos-luz a VIA LÁCTEA nasce em volta, com os braços espirais, e o Sol fica na borda de um deles, marcado como BRAÇO DE ÓRION · VOCÊ ESTÁ AQUI. O teto agora é 60 mil anos-luz.
- [ ] r148 · A RÉGUA DO SEU DESENHO: no 1:1, vá dando zoom out sem parar: o disco de 1 UA acende do centro para fora, fica no ponto quando vira um círculo médio, e some enquanto o de 10 UA já está nascendo. Depois 100, depois 1.000.
- [ ] r145 · O CORTE ACABOU: no 1:1, entrar na Terra (ou em qualquer planeta) mantendo o mesmo céu atrás, com as constelações no lugar.
- [ ] r143 · O SONHO: no 1:1, aperte a busca e digite SIRIUS (ou VEGA, ALPHA CENTAURI, BETELGEUSE): a câmera vira e VOA até lá, com as constelações se desmanchando no caminho, e chega no sistema sem corte. Estrela sem sistema no atlas (ALGOL, DENEB): a viagem para lá e o ESC traz de volta.
- [ ] r141 · O BUG QUE VOCÊ REPORTOU: no 1:1, abrir a linha do tempo de QUALQUER missão (Apollo 8 inclusive): a câmera agora mergulha e para na medida da rota, e não mais lá longe.

---

## Já fechado

Os testes de r109 a r130 (58 itens) foram entregues e fechados em 25 e
26 AGO 2026. Ficam no CLAUDE.md como histórico.
