const fs = require('fs');
const path = require('path');

function slugify(text) {
    return text.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim().replace(/\s+/g, '-');
}

function generateDescription(name) {
    return `${name} là loại cây cảnh rất phổ biến và được nhiều khách hàng ưa chuộng. Cây nổi bật với vẻ đẹp tự nhiên, sinh khí mạnh mẽ và đặc biệt rất dễ trồng tại Việt Nam.

### Điểm nổi bật
- **Hình dáng:** Phát triển cứng cáp, form chuẩn đẹp mắt.
- **Sức sống:** Cây đã được ươm trồng kỹ, bộ rễ khỏe, dễ dàng thích nghi với môi trường mới.
- **Ứng dụng:** Làm đẹp không gian, tạo mảng xanh thư giãn hiệu quả.

### Ý nghĩa Phong Thủy
- Tượng trưng cho sự sinh sôi, nảy nở và vượng khí dồi dào.
- Mang đến cảm giác an lành, xua tan căng thẳng mệt mỏi cho gia chủ.

### Hướng dẫn chăm sóc
- **Ánh sáng:** Thích hợp với môi trường ánh sáng bán râm hoặc trong nhà.
- **Nước tưới:** Tưới vừa phải, đảm bảo đất khô ráo giữa các lần tưới để tránh thối rễ.
- **Đất và Phân bón:** Nên bổ sung phân hữu cơ hoặc NPK 2 tháng 1 lần để cây luôn mướt mắt.`;
}

async function run() {
    console.log("Fetching webcaycanh.com homepage...");
    const response = await fetch('https://webcaycanh.com/', { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await response.text();
    
    const blocks = html.split('class="item');
    const newProducts = [];
    
    for (let i = 1; i < blocks.length; i++) {
        const block = blocks[i];
        
        const titleMatch = block.match(/<h3[^>]*>([^<]+)<\/h3>/i);
        if (!titleMatch) continue;
        const name = titleMatch[1].trim();
        
        const priceMatch = block.match(/<span class="price[^>]*>([\d\.]+)/i);
        const priceStr = priceMatch ? priceMatch[1].replace(/[^\d]/g, '') : "150000";
        const price = parseInt(priceStr, 10);
        
        const imgMatch = block.match(/data-lazy-src="([^">]+\.(png|jpg|jpeg|webp))"/i);
        let image = imgMatch ? imgMatch[1] : "";
        if (image) image = image.replace(/-\d+x\d+(?=\.[a-z]+$)/i, '');
        if (!image) continue; // skip if no image

        newProducts.push({ name, price, image });
    }
    
    // Deduplicate
    const uniqueProducts = [];
    const seen = new Set();
    for (const p of newProducts) {
        if (!seen.has(p.name)) {
            seen.add(p.name);
            uniqueProducts.push(p);
        }
    }
    
    console.log(`Found ${uniqueProducts.length} unique products.`);
    
    // Append to mock_products.json
    const dataPath = path.join(__dirname, '../src/data/mock_products.json');
    const existingProducts = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    let maxId = Math.max(...existingProducts.map(p => p.id)) || 60;
    
    let addedCount = 0;
    
    for (const p of uniqueProducts) {
        const slug = slugify(p.name);
        if (existingProducts.find(ex => ex.slug === slug)) {
            continue;
        }
        
        existingProducts.push({
            id: ++maxId,
            slug: slug,
            name: p.name,
            price: p.price,
            category: 'cay-canh-trong-nha', // default category
            description: generateDescription(p.name),
            images: p.image,
            in_stock: true,
            sort_order: Math.floor(Math.random() * 20),
            original_price: Math.floor(p.price * 1.2 / 10000) * 10000,
            height: '50-80cm',
            light: 'Bán râm',
            water: 'Vừa phải',
            gallery: []
        });
        addedCount++;
    }
    
    fs.writeFileSync(dataPath, JSON.stringify(existingProducts, null, 2), 'utf8');
    console.log(`Added ${addedCount} new products. Total: ${existingProducts.length}`);
}
run();
