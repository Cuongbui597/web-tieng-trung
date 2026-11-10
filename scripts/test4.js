

async function run() {
    const url = "https://webcaycanh.com/?s=kim+ngân&post_type=product";
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await res.text();
    const match = html.match(/<img[^>]+src="([^">]+\.(jpg|png|webp))"/g);
    if (match) {
        console.log(match.slice(0, 10).join('\n'));
    }
}
run();
