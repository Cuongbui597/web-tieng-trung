const fs = require('fs');
const path = require('path');

async function fetchImageForPlant(plantName) {
    try {
        const query = encodeURIComponent(plantName);
        const url = `https://caycanhsaigon.life/?s=${query}&post_type=product`;
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        });
        const html = await response.text();
        
        // Search for WooCommerce thumbnail
        const match = html.match(/<img[^>]+src="([^">]+\.(jpg|jpeg|png|webp))"[^>]*class="[^"]*attachment-woocommerce_thumbnail/i);
        if (match && match[1]) {
            return match[1].replace(/-\d+x\d+(?=\.[a-z]+$)/i, '');
        }

        const match2 = html.match(/<img[^>]+src="([^">]+\.(jpg|jpeg|png|webp))"/i);
        if (match2 && match2[1]) {
            return match2[1].replace(/-\d+x\d+(?=\.[a-z]+$)/i, '');
        }

    } catch (e) {
        console.log(`Failed for ${plantName}`);
    }
    return null;
}

async function run() {
    const dataPath = path.join(__dirname, '../src/data/mock_products.json');
    const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    console.log(`Fetching new images from caycanhsaigon.life...`);
    
    for (let i = 0; i < products.length; i++) {
        const p = products[i];
        // We will fetch new images for all mock products since user said "bộ hình ảnh bạn đưa chưa đẹp"
        // But keep existing if fetch fails
        console.log(`[${i+1}/${products.length}] ${p.name}...`);
        const imgUrl = await fetchImageForPlant(p.name);
        if (imgUrl) {
            p.images = imgUrl;
            console.log(` -> Found: ${imgUrl}`);
        } else {
            console.log(` -> Not found, keeping old image`);
        }
        await new Promise(resolve => setTimeout(resolve, 300));
    }

    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2), 'utf8');
    console.log('Done updating images!');
}

run();
