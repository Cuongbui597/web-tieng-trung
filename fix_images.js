const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src/data/mock_products.json');
const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

for (const p of products) {
    if (p.images && p.images.includes('caycanhhanoi')) {
        // Remove the thumbnail suffix like -247x296 or -202x247
        p.images = p.images.replace(/-\d+x\d+(?=\.[a-z]+$)/i, '');
    }
}

fs.writeFileSync(dataPath, JSON.stringify(products, null, 2), 'utf8');
console.log('Fixed image URLs in mock_products.json');
