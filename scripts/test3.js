async function run() {
    try {
        const response = await fetch('https://caycanhsaigon.life/api/products');
        if (response.ok) {
            const data = await response.json();
            console.log("Found API!", data.slice(0, 2));
        } else {
            console.log("No API /api/products", response.status);
        }
    } catch (e) {
        console.log(e);
    }
}
run();
