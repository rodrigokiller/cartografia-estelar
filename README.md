# Cartografia Estelar

Mapa estelar 3D interativo (129 corpos, 40 sistemas, 7 galáxias) em HTML único + Three.js, sem build.
Feito por [Rodrigo Sanguanini](https://sanguanini.dev), com trilha sonora original de 14 faixas.

**No ar:** https://rodrigokiller.github.io/cartografia-estelar/

**Rodar local:** abra `index.html` no navegador (a pasta `audio/` precisa estar junto para a trilha; sem ela, toca a música generativa).
**Publicar:** `git push` na branch `main`. O GitHub Pages serve a pasta inteira, sem build step.
**Verificar os dados:** `node tools/verifica.js` confere a integridade do catálogo antes de publicar.
**Continuar com IA:** abra a pasta no VS Code com Claude Code. O `CLAUDE.md` carrega todo o contexto do projeto.

## Controles
Arraste para girar, pinça ou scroll para aproximar. Toque em um corpo para catalogar, toque de novo para entrar. Afaste o zoom para subir de escala (Corpo, Sistema, Galáxia, Universo).

Teclado: `/` busca · `?` manual · `M` registro de bordo · `T` modo tour · setas trocam de corpo · `P` modo foto · `ESC` volta um nível.
No celular, os mesmos recursos estão nos botões: ⌕ busca, ◈ registro de bordo e ⋯ abre o resto (trilha, foto, tela cheia, manual).

