const fs = require('fs');
const path = require('path');

async function fetchImageForPlant(plantName) {
    try {
        const query = encodeURIComponent(plantName);
        const url = `https://webcaycanh.com/?s=${query}&post_type=product`;
        const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const html = await response.text();
        
        // Match the product image
        // Exclude logos
        const matches = [...html.matchAll(/<img[^>]+src="([^">]+\.(jpg|jpeg|png|webp))"[^>]*>/ig)];
        for (const match of matches) {
            const imgUrl = match[1];
            if (imgUrl.includes('logo')) continue;
            if (imgUrl.includes('/wp-content/uploads/')) {
                return imgUrl.replace(/-\d+x\d+(?=\.[a-z]+$)/i, '');
            }
        }
    } catch (e) {
        console.log(`Failed for ${plantName}`);
    }
    return null;
}

async function run() {
    const dataPath = path.join(__dirname, '../src/data/mock_products.json');
    const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    console.log(`Fetching REAL images from webcaycanh.com...`);
    
    for (let i = 0; i < products.length; i++) {
        const p = products[i];
        console.log(`[${i+1}/${products.length}] ${p.name}...`);
        const imgUrl = await fetchImageForPlant(p.name);
        if (imgUrl) {
            p.images = imgUrl;
            console.log(` -> Found: ${imgUrl}`);
        } else {
            console.log(` -> Not found, keeping Unsplash fallback`);
        }
        await new Promise(resolve => setTimeout(resolve, 300));
    }

    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2), 'utf8');
    console.log('Done updating images!');
}

run();
