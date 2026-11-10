async function run() {
    const response = await fetch('https://webcaycanh.com/');
    const html = await response.text();
    const blocks = html.split('class="item');
    for (let i = 1; i < 3; i++) {
        console.log(blocks[i].slice(0, 300));
        console.log("-------------------");
    }
}
run();
