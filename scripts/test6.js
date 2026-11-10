async function run() {
    const response = await fetch('https://webcaycanh.com/cua-hang/');
    const html = await response.text();
    const links = [...new Set([...html.matchAll(/href="(https:\/\/webcaycanh\.com\/[^"]+)"/g)].map(m => m[1]))];
    const products = links.filter(l => !l.includes('wp-') && !l.includes('page') && l !== 'https://webcaycanh.com/' && !l.includes('cua-hang') && !l.includes('danh-muc'));
    console.log(products.slice(0, 15));
}
run();
