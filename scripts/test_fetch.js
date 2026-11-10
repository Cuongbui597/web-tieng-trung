const fs = require('fs');

async function test() {
    try {
        const response = await fetch('https://webcaycanh.com/?s=Cây+Kim+Ngân&post_type=product');
        const text = await response.text();
        console.log("webcaycanh.com length:", text.length);
        
        // caycanhsaigon.life
        // But maybe it's not a real site? Let's search a few
        
        console.log("Done");
    } catch(e) {
        console.error(e);
    }
}
test();
