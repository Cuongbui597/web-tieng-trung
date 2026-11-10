const fs = require('fs');
const path = require('path');

const plants = [
  // Indoor
  { name: 'Cây Trúc Nhật', category: 'cay-canh-trong-nha', price: 210000 },
  { name: 'Cây Trúc Bách Hợp', category: 'cay-canh-trong-nha', price: 260000 },
  { name: 'Cây Trường Sinh', category: 'cay-canh-trong-nha', price: 130000 },
  { name: 'Cây Thường Xuân', category: 'cay-canh-trong-nha', price: 95000 },
  { name: 'Cây Đuôi Công', category: 'cay-canh-trong-nha', price: 175000 },
  { name: 'Cây Phong Lộc Hoa', category: 'cay-canh-trong-nha', price: 220000 },
  { name: 'Cây Tổ Chim', category: 'cay-canh-trong-nha', price: 150000 },
  { name: 'Cây Dương Xỉ', category: 'cay-canh-trong-nha', price: 80000 },
  { name: 'Cây Nha Đam', category: 'cay-canh-trong-nha', price: 60000 },
  { name: 'Cây Phát Tài Búp Sen', category: 'cay-canh-trong-nha', price: 190000 },
  { name: 'Cây Vạn Lộc', category: 'cay-canh-trong-nha', price: 165000 },
  { name: 'Cây Ngân Hậu', category: 'cay-canh-trong-nha', price: 180000 },
  { name: 'Cây Lan Bình Rượu', category: 'cay-canh-trong-nha', price: 320000 },
  { name: 'Cây Cau Nhật', category: 'cay-canh-trong-nha', price: 420000 },
  { name: 'Cây Cọ Nhật', category: 'cay-canh-trong-nha', price: 380000 },

  // Landscape
  { name: 'Cây Bàng Vuông', category: 'cay-cong-trinh', price: 1800000 },
  { name: 'Cây Osaka Đỏ', category: 'cay-cong-trinh', price: 1400000 },
  { name: 'Cây Osaka Trắng', category: 'cay-cong-trinh', price: 1450000 },
  { name: 'Cây Vàng Anh', category: 'cay-cong-trinh', price: 2200000 },
  { name: 'Cây Lộc Vừng Đỏ', category: 'cay-cong-trinh', price: 3500000 },
  { name: 'Cây Gõ Đỏ', category: 'cay-cong-trinh', price: 5500000 },
  { name: 'Cây Nhạc Ngựa', category: 'cay-cong-trinh', price: 1150000 },
  { name: 'Cây Thông Đất', category: 'cay-cong-trinh', price: 650000 },
  { name: 'Cây Phi Lao', category: 'cay-cong-trinh', price: 450000 },
  { name: 'Cây Bạch Đàn', category: 'cay-cong-trinh', price: 350000 },
  { name: 'Cây Xà Cừ', category: 'cay-cong-trinh', price: 1550000 },
  { name: 'Cây Tràm Bông Vàng', category: 'cay-cong-trinh', price: 550000 },
  { name: 'Cây Liễu Rủ', category: 'cay-cong-trinh', price: 1350000 },
  { name: 'Cây Dừa Kiểng', category: 'cay-cong-trinh', price: 1950000 },
  { name: 'Cây Cọ Dầu', category: 'cay-cong-trinh', price: 2400000 },

  // Garden
  { name: 'Cây Hoa Sứ', category: 'cay-canh-san-vuon', price: 450000 },
  { name: 'Cây Dạ Yến Thảo', category: 'cay-canh-san-vuon', price: 65000 },
  { name: 'Cây Sử Quân Tử', category: 'cay-canh-san-vuon', price: 250000 },
  { name: 'Cây Trúc Quân Tử', category: 'cay-canh-san-vuon', price: 350000 },
  { name: 'Cây Huỳnh Liên', category: 'cay-canh-san-vuon', price: 550000 },
  { name: 'Cây Thiên Điểu', category: 'cay-canh-san-vuon', price: 220000 },
  { name: 'Cây Mai Địa Thảo', category: 'cay-canh-san-vuon', price: 85000 },
  { name: 'Cây Thiết Mộc Lan Ghép', category: 'cay-canh-san-vuon', price: 1250000 },
  { name: 'Cây Tùng Kim', category: 'cay-canh-san-vuon', price: 850000 },
  { name: 'Cây Sanh Bonsai', category: 'cay-canh-san-vuon', price: 4500000 },
  { name: 'Cây Chuỗi Ngọc', category: 'cay-canh-san-vuon', price: 55000 },
  { name: 'Cây Hoa Trang', category: 'cay-canh-san-vuon', price: 140000 },
  { name: 'Cây Đỗ Quyên', category: 'cay-canh-san-vuon', price: 450000 },

  // Fruit
  { name: 'Cây Chanh Dây', category: 'cay-an-trai', price: 110000 },
  { name: 'Cây Cam Sành', category: 'cay-an-trai', price: 240000 },
  { name: 'Cây Bưởi Diễn', category: 'cay-an-trai', price: 550000 },
  { name: 'Cây Mít Ruột Đỏ', category: 'cay-an-trai', price: 450000 },
  { name: 'Cây Mận An Phước', category: 'cay-an-trai', price: 210000 },
  { name: 'Cây Táo Thái', category: 'cay-an-trai', price: 195000 },
  { name: 'Cây Lê Ki Ma', category: 'cay-an-trai', price: 280000 }
];

function slugify(text) {
  return text.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim().replace(/\s+/g, '-');
}

function generateDescription(name, category) {
  let catText = 'cây cảnh';
  let light = 'Bán râm';
  let water = 'Vừa phải';

  if (category === 'cay-cong-trinh') {
    catText = 'cây công trình, bóng mát';
    light = 'Nắng toàn phần';
  } else if (category === 'cay-canh-trong-nha') {
    catText = 'cây nội thất, văn phòng';
    light = 'Bán râm / Trong nhà';
    water = 'Ít';
  } else if (category === 'cay-canh-san-vuon') {
    catText = 'cây trang trí sân vườn';
    light = 'Nắng trực tiếp';
  } else if (category === 'cay-an-trai') {
    catText = 'cây giống ăn trái chất lượng cao';
    light = 'Nắng trực tiếp';
    water = 'Nhiều';
  }

  return `${name} là loại ${catText} rất phổ biến và được nhiều khách hàng ưa chuộng. Cây nổi bật với vẻ đẹp tự nhiên, sinh khí mạnh mẽ và đặc biệt rất dễ trồng tại Việt Nam.

### Điểm nổi bật
- **Hình dáng:** Phát triển cứng cáp, form chuẩn đẹp mắt.
- **Sức sống:** Cây đã được ươm trồng kỹ, bộ rễ khỏe, dễ dàng thích nghi với môi trường mới.
- **Ứng dụng:** Làm đẹp không gian, tạo mảng xanh thư giãn hiệu quả.

### Ý nghĩa Phong Thủy
- Tượng trưng cho sự sinh sôi, nảy nở và vượng khí dồi dào.
- Mang đến cảm giác an lành, xua tan căng thẳng mệt mỏi cho gia chủ.

### Hướng dẫn chăm sóc
- **Ánh sáng:** Thích hợp với môi trường ánh sáng ${light.toLowerCase()}.
- **Nước tưới:** Tưới ${water.toLowerCase()}, đảm bảo đất khô ráo giữa các lần tưới để tránh thối rễ.
- **Đất và Phân bón:** Nên bổ sung phân hữu cơ hoặc NPK 2 tháng 1 lần để cây luôn mướt mắt.`;
}

async function run() {
    const dataPath = path.join(__dirname, '../src/data/mock_products.json');
    const existingProducts = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    let maxId = Math.max(...existingProducts.map(p => p.id)) || 60;
    
    console.log('Generating 50 more mock products...');
    
    for (let i = 0; i < plants.length; i++) {
        const plant = plants[i];
        const slug = slugify(plant.name);
        // avoid duplicates if accidentally run twice
        if (existingProducts.find(p => p.slug === slug)) continue;
        
        const newProduct = {
            id: maxId + 1 + i,
            slug: slug,
            name: plant.name,
            price: plant.price,
            category: plant.category,
            description: generateDescription(plant.name, plant.category),
            images: 'https://images.unsplash.com/photo-1597848212624-a19eb35e26f6?auto=format&fit=crop&q=80&w=800',
            in_stock: true,
            sort_order: 50 - i, // append at lower order
            original_price: Math.floor(plant.price * 1.2 / 10000) * 10000,
            height: plant.category === 'cay-cong-trinh' ? '3-5m' : '50-80cm',
            light: plant.category.includes('trong-nha') ? 'Bán râm' : 'Nắng toàn phần',
            water: plant.category.includes('trong-nha') ? 'Ít' : 'Vừa phải',
            gallery: []
        };
        existingProducts.push(newProduct);
    }
    
    fs.writeFileSync(dataPath, JSON.stringify(existingProducts, null, 2), 'utf8');
    console.log(`Total products now: ${existingProducts.length}`);
}

run();
