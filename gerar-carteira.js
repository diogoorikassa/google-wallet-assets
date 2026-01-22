const { GoogleAuth } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const fs = require('fs');

// --- CONFIGURAÇÃO ---
const CREDENTIALS_FILE = './credentials.json';

// Este é o ID do Emissor (Correto conforme seu código)
const ISSUER_ID = '3388000000023072852';

// CORREÇÃO AQUI: O Class ID precisa ter o prefixo do Emissor + ponto
const CLASS_ID = `${ISSUER_ID}.health_card_v2`;
// --------------------
const credentials = require(CREDENTIALS_FILE);

const payload = {
  iss: credentials.client_email,
  aud: 'google',
  typ: 'savetowallet',
  iat: Math.floor(Date.now() / 1000),
  origins: [],
  payload: {
    genericClasses: [
      {
        id: CLASS_ID,
        classTemplateInfo: {
          cardTemplateOverride: {
            cardRowTemplateInfos: [
              {
                twoItems: {
                  startItem: { firstValue: { fields: [{ fieldPath: "object.textModulesData['cpf']" }] } },
                  endItem: { firstValue: { fields: [{ fieldPath: "object.textModulesData['card_code']" }] } }
                }
              },
              {
                oneItem: {
                  item: { firstValue: { fields: [{ fieldPath: "object.textModulesData['plan']" }] } }
                }
              }
            ]
          }
        }
      }
    ],
    genericObjects: [
      {
        id: `${ISSUER_ID}.objeto_teste_${Date.now()}`, // ID único para este cartão específico
        classId: CLASS_ID,
        logo: {
          sourceUri: { uri: `https://raw.githubusercontent.com/diogoorikassa/google-wallet-assets/main/assets/wallet-logo-topo.png?t=${Date.now()}` }
        },
        heroImage: {
          sourceUri: { uri: `https://raw.githubusercontent.com/diogoorikassa/google-wallet-assets/main/assets/wallet-heroImage.png?t=${Date.now()}` },
          contentDescription: {
            defaultValue: { language: 'pt-BR', value: 'Imagem de destaque do cartão' }
          }
        },
        cardTitle: {
          defaultValue: { language: 'pt-BR', value: 'Hapvida' }
        },
        subheader: {
          defaultValue: { language: 'pt-BR', value: 'Beneficiário' }
        },
        header: {
          defaultValue: { language: 'pt-BR', value: 'Rayssa Oliveira Bezerra' }
        },
        textModulesData: [
          {
            header: 'CPF',
            body: '123.456.789-01',
            id: 'cpf'
          },
          {
            header: 'Código da carteirinha',
            body: '0YXY2034227008',
            id: 'card_code'
          },
          {
            header: 'Plano',
            body: 'PREMIUM 900.1 CE APT COP',
            id: 'plan'
          }
        ],
        hexBackgroundColor: '#1539AA' // Azul
      }
    ]
  }
};

// Assina o Token JWT usando a chave privada do arquivo JSON
const token = jwt.sign(payload, credentials.private_key, {
  algorithm: 'RS256'
});

console.log('--------------------------------------------------');
console.log('SUCESSO! Copie o link abaixo e mande para seu celular:');
console.log(`https://pay.google.com/gp/v/save/${token}`);
console.log('--------------------------------------------------');