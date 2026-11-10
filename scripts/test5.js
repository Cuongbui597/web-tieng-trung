

async function run() {
    try {
        const response = await fetch('https://webcaycanh.com/cua-hang/', { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const html = await response.text();
        console.log("Length:", html.length);
        
        // Find product links: <a href="https://webcaycanh.com/san-pham/.../"
        const productLinks = [...new Set([...html.matchAll(/href="(https:\/\/webcaycanh\.com\/[^"]+)"/g)].map(m => m[1]))];
        const sanphamLinks = productLinks.filter(l => l.includes('webcaycanh.com') && !l.includes('/danh-muc/') && !l.includes('/tu-khoa/'));
        console.log(sanphamLinks.slice(0, 10));
    } catch(e) {
        console.error(e);
    }
}
run();
