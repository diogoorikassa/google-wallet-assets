# Hapvida Wallet Generator

Projeto para gerar carteiras digitais para **Google Wallet (Android)** e **Apple Wallet (iOS)**.

## 📱 Google Wallet (Android)

A geração para Android utiliza a API REST do Google Wallet para criar e assinar um objeto JWT que pode ser salvo usuário.

### Pré-requisitos
1.  **Node.js** instalado.
2.  Arquivo `credentials.json` (Service Account Key do Google Cloud) na raiz do projeto.
3.  Acesso ao repositório GitHub (para hospedar as imagens).

### Instalação
```bash
npm install
```

### Configuração de Assets
As imagens (`logo`, `heroImage`) precisam estar hospedadas publicamente (neste repositório) para que o Google as carregue.
1.  Substitua as imagens na pasta `assets/`.
2.  **Importante:** Faça o commit e push das alterações para o GitHub.
    ```bash
    git add .
    git commit -m "update assets"
    git push origin main
    ```
    *O script adiciona automaticamente um timestamp (`?t=...`) nas URLs para evitar cache antigo.*

### Como Gerar
Execute o script:
```bash
node gerar-carteira.js
```
O console exibirá um link (ex: `https://pay.google.com/gp/v/save/...`). Envie este link para o celular e abra para salvar o cartão.

### Personalização
O layout é definido no objeto `genericClasses` dentro do script:
-   **Header:** Nome do Beneficiário.
-   **Linha 1:** CPF e Código da Carteirinha.
-   **Linha 2:** Plano.

---

## 🍎 Apple Wallet (iOS)

A geração para iOS cria um pacote `.pkpass` (arquivo zipado com JSON e assets).

### Assets
Os assets ficam na pasta `apple-assets/` e devem seguir as especificações:
-   **strip.png** (Banner): 1125 x 432 px
-   **logo.png**: 480 x 150 px
-   **icon.png**: 87 x 87 px
*(É recomendado fornecer versões @2x e @3x)*

### Como Gerar (Pacote Raw)
Sem um certificado de desenvolvedor da Apple, geramos apenas o pacote bruto:
```bash
node gerar-carteira-apple.js
```
Isso cria a pasta `carteira.pass`.

### Como Visualizar
1.  **Sem Certificado:** Zipe a pasta `carteira.pass` e use ferramentas online como [pkpass.io](https://pkpass.io) para visualizar/assinar temporariamente.
2.  **Com Certificado:** Assine o pacote usando `signpass` ou bibliotecas Node.js e abra nativamente no Mac/iPhone.