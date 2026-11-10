const fs = require('fs');
const path = require('path');

const beautifulImages = [
    "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1416879598555-22b07e4d8fb8?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1517191434949-5e90cd67d2b6?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1597848212624-a19eb35e26f6?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1545241047-6083a36a1c08?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1599598425947-330026296880?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1604762524889-3e2fcc145683?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1466692476877-3e1dc12fa4e8?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1589824781711-2eb2a7923483?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1597055181308-f2b704c7d9fc?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1595240212001-c8a77918f4bb?auto=format&fit=crop&q=80&w=800"
];

function run() {
    const dataPath = path.join(__dirname, '../src/data/mock_products.json');
    const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    for (let i = 0; i < products.length; i++) {
        // cycle through the beautiful images
        products[i].images = beautifulImages[i % beautifulImages.length];
    }

    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2), 'utf8');
    console.log('Replaced all mock product images with beautiful Unsplash images.');
}

run();
