async function run() {
    const response = await fetch('https://webcaycanh.com/cua-hang/');
    const html = await response.text();
    
    const products = [];
    const productBlocks = html.split('<li class="product');
    for (let i = 1; i < productBlocks.length; i++) {
        const block = productBlocks[i];
        
        const titleMatch = block.match(/<h3[^>]*>([^<]+)<\/h3>/i) || block.match(/<h2[^>]*class="woocommerce-loop-product__title"[^>]*>([^<]+)<\/h2>/i);
        const name = titleMatch ? titleMatch[1].trim() : "Unknown";
        
        const priceMatch = block.match(/<span class="woocommerce-Price-amount amount"><bdi>([^<]+)<span/i);
        const priceStr = priceMatch ? priceMatch[1].replace(/[^\d]/g, '') : "100000";
        const price = parseInt(priceStr, 10);
        
        const imgMatch = block.match(/<img[^>]+src="([^">]+\.(jpg|jpeg|png|webp))"/i);
        let image = imgMatch ? imgMatch[1] : "";
        if (image) image = image.replace(/-\d+x\d+(?=\.[a-z]+$)/i, '');
        
        if (name !== "Unknown") {
            products.push({ name, price, image });
        }
    }
    
    console.log(`Found ${products.length} products`);
    console.log(products.slice(0, 5));
}
run();
