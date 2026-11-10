const fs = require('fs');
const path = require('path');
const https = require('https');

// We will use native fetch available in Node.js 18+ to fetch search results from a plant shop
async function fetchImageForPlant(plantName) {
    try {
        // Search on a popular VN plant shop
        const query = encodeURIComponent(plantName);
        const url = `https://caycanhhanoi.vn/?s=${query}&post_type=product`;
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
            }
        });
        const html = await response.text();
        
        // Simple regex to find the first product image
        const match = html.match(/<img[^>]+src="([^">]+\.(jpg|jpeg|png|webp))"[^>]*class="[^"]*attachment-woocommerce_thumbnail/i);
        if (match && match[1]) {
            return match[1];
        }

        // Fallback: search another site or just find any img inside product block
        const match2 = html.match(/<img[^>]+src="([^">]+\.(jpg|jpeg|png|webp))"/i);
        if (match2 && match2[1]) {
            return match2[1];
        }

    } catch (e) {
        console.log(`Failed to fetch for ${plantName}`);
    }
    return null;
}

async function run() {
    const dataPath = path.join(__dirname, '../src/data/mock_products.json');
    const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    console.log(`Fetching images for ${products.length} products...`);
    
    for (let i = 0; i < products.length; i++) {
        const p = products[i];
        if (p.images.includes('unsplash.com')) {
            console.log(`[${i+1}/${products.length}] Fetching image for ${p.name}...`);
            const imgUrl = await fetchImageForPlant(p.name);
            if (imgUrl) {
                p.images = imgUrl;
                console.log(` -> Found: ${imgUrl}`);
            } else {
                console.log(` -> Not found`);
            }
            // Small delay to prevent being blocked
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }

    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2), 'utf8');
    console.log('Done updating images!');
}

run();
