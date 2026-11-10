async function run() {
    const response = await fetch('https://caycanhsaigon.life');
    const html = await response.text();
    const matches = html.match(/https:\/\/res\.cloudinary\.com\/[^"'\s]+/g);
    if (matches) {
        console.log([...new Set(matches)].slice(0, 10).join('\n'));
    }
}
run();
