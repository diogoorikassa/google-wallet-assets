const fs = require('fs');
const path = require('path');

// --- CONFIGURATION ---
const OUTPUT_DIR = './carteira.pass';
const ASSETS_DIR = './apple-assets';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
}

// 1. Define pass.json Structure
const pass = {
    "formatVersion": 1,
    "passTypeIdentifier": "pass.com.wallet.hapvida",
    "serialNumber": "1234567890",
    "teamIdentifier": "242MY65552",
    "organizationName": "Hapvida",
    "description": "Carteirinha Hapvida",
    "foregroundColor": "rgb(255, 255, 255)",
    "backgroundColor": "rgb(21, 57, 170)",
    "labelColor": "rgb(255, 255, 255)",
    "storeCard": {
        "primaryFields": [
            {
                "key": "beneficiary",
                "label": "Beneficiário",
                "value": "Rayssa Oliveira Bezerra"
            }
        ],
        "secondaryFields": [
            {
                "key": "cpf",
                "label": "CPF",
                "value": "123.456.789-01"
            },
            {
                "key": "code",
                "label": "Código da carteirinha",
                "value": "0YXY2034227008"
            }
        ],
        "auxiliaryFields": [
            {
                "key": "plan",
                "label": "Plano",
                "value": "PREMIUM 900.1 CE APT COP"
            }
        ]
    },

};

// 2. Write pass.json
fs.writeFileSync(path.join(OUTPUT_DIR, 'pass.json'), JSON.stringify(pass, null, 2));
console.log('✅ pass.json created.');

// 3. Copy Assets
const assetMapping = {
    'icon.png': 'icon-87x87.png',
    'icon@2x.png': 'icon-87x87@2x.png',
    'icon@3x.png': 'icon-87x87@3x.png',
    'logo.png': 'logo-480x150.png',
    'logo@2x.png': 'logo-480x150@2x.png',
    'logo@3x.png': 'logo-480x150@3x.png',
    'strip.png': 'strip-1125x432.png',
    'strip@2x.png': 'strip-1125x432@2x.png',
    'strip@3x.png': 'strip-1125x432@3x.png'
};

Object.entries(assetMapping).forEach(([destName, srcName]) => {
    const src = path.join(ASSETS_DIR, srcName);
    const dest = path.join(OUTPUT_DIR, destName);

    if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`✅ Copied ${srcName} -> ${destName}`);
    } else {
        // Try fallback to standard name if specific dimension name fails
        const fallbackSrc = path.join(ASSETS_DIR, destName);
        if (fs.existsSync(fallbackSrc)) {
            fs.copyFileSync(fallbackSrc, dest);
            console.log(`✅ Copied ${destName}`);
        } else {
            console.warn(`⚠️ Warning: Asset not found: ${srcName} (or ${destName})`);
        }
    }
});

console.log('\nSUCCESS! Raw pass package generated at ./carteira.pass');
console.log('To preview without a certificate, you can try uploading this folder (zipped) to tools like pkpass.io or passsource.com (use with caution for production data).');
