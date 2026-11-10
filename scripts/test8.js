async function run() {
    const response = await fetch('https://webcaycanh.com/');
    const html = await response.text();
    const productBlocks = html.split('class="product ');
    console.log(`Found ${productBlocks.length - 1} blocks using 'class="product '`);
    if (productBlocks.length < 2) {
        const blocks2 = html.split('class="item');
        console.log(`Found ${blocks2.length - 1} blocks using 'class="item'`);
    }
}
run();
