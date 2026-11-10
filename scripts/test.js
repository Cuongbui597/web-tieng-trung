

async function run() {
    const response = await fetch('https://caycanhsaigon.life/?s=Cây+Kim+Ngân&post_type=product');
    const html = await response.text();
    const matches = html.match(/<img[^>]+>/ig);
    if (matches) {
        console.log(matches.slice(0, 5).join('\n\n'));
    }
}
run();
