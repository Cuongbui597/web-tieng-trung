async function run() {
    const response = await fetch('https://webcaycanh.com/');
    const html = await response.text();
    const blocks = html.split('class="item');
    console.log(blocks[1].slice(0, 1000));
}
run();
