const fs = require('fs');
const path = require('path');

const plants = [
  { name: 'Cây Kim Ngân', category: 'cay-canh-trong-nha', price: 250000 },
  { name: 'Cây Phát Tài Núi', category: 'cay-canh-trong-nha', price: 850000 },
  { name: 'Cây Bạch Mã Hoàng Tử', category: 'cay-canh-trong-nha', price: 300000 },
  { name: 'Cây Thiết Mộc Lan', category: 'cay-canh-trong-nha', price: 550000 },
  { name: 'Cây Vạn Niên Thanh', category: 'cay-canh-trong-nha', price: 220000 },
  { name: 'Cây Lan Ý', category: 'cay-canh-trong-nha', price: 150000 },
  { name: 'Cây Hồng Môn', category: 'cay-canh-trong-nha', price: 180000 },
  { name: 'Cây Phú Quý', category: 'cay-canh-trong-nha', price: 160000 },
  { name: 'Cây Ngọc Ngân', category: 'cay-canh-trong-nha', price: 140000 },
  { name: 'Cây Đại Phú Gia', category: 'cay-canh-trong-nha', price: 450000 },
  { name: 'Cây Ngũ Gia Bì', category: 'cay-canh-trong-nha', price: 280000 },
  { name: 'Cây Hạnh Phúc', category: 'cay-canh-trong-nha', price: 650000 },
  { name: 'Cây Trạng Nguyên', category: 'cay-canh-trong-nha', price: 120000 },
  { name: 'Cây Cau Tiểu Trâm', category: 'cay-canh-trong-nha', price: 110000 },
  { name: 'Cây Trầu Bà Thanh Xuân', category: 'cay-canh-trong-nha', price: 350000 },

  { name: 'Cây Bằng Lăng', category: 'cay-cong-trinh', price: 1200000 },
  { name: 'Cây Phượng Vĩ', category: 'cay-cong-trinh', price: 950000 },
  { name: 'Cây Muồng Hoàng Yến', category: 'cay-cong-trinh', price: 1100000 },
  { name: 'Cây Sứ Đại', category: 'cay-cong-trinh', price: 2500000 },
  { name: 'Cây Móng Bò', category: 'cay-cong-trinh', price: 850000 },
  { name: 'Cây Chuông Vàng', category: 'cay-cong-trinh', price: 1350000 },
  { name: 'Cây Me Tây', category: 'cay-cong-trinh', price: 3000000 },
  { name: 'Cây Ngọc Lan', category: 'cay-cong-trinh', price: 1800000 },
  { name: 'Cây Hoa Ban', category: 'cay-cong-trinh', price: 1500000 },
  { name: 'Cây Lim Xẹt', category: 'cay-cong-trinh', price: 900000 },
  { name: 'Cây Long Não', category: 'cay-cong-trinh', price: 1250000 },
  { name: 'Cây Sấu', category: 'cay-cong-trinh', price: 800000 },
  { name: 'Cây Sưa Đỏ', category: 'cay-cong-trinh', price: 4500000 },
  { name: 'Cây Lát Hoa', category: 'cay-cong-trinh', price: 1100000 },
  { name: 'Cây Giáng Hương', category: 'cay-cong-trinh', price: 3500000 },

  { name: 'Cây Tùng La Hán', category: 'cay-canh-san-vuon', price: 5500000 },
  { name: 'Cây Mai Vạn Phúc', category: 'cay-canh-san-vuon', price: 150000 },
  { name: 'Cây Chiều Tím', category: 'cay-canh-san-vuon', price: 45000 },
  { name: 'Cây Tuyết Sơn Phi Hồ', category: 'cay-canh-san-vuon', price: 250000 },
  { name: 'Cây Tường Vi', category: 'cay-canh-san-vuon', price: 450000 },
  { name: 'Cây Nguyệt Quế', category: 'cay-canh-san-vuon', price: 350000 },
  { name: 'Hoa Hồng Cổ', category: 'cay-canh-san-vuon', price: 550000 },
  { name: 'Cây Cẩm Tú Cầu', category: 'cay-canh-san-vuon', price: 180000 },
  { name: 'Cây Dâm Bụt', category: 'cay-canh-san-vuon', price: 95000 },
  { name: 'Cây Mẫu Đơn', category: 'cay-canh-san-vuon', price: 320000 },

  { name: 'Cây Mít Thái', category: 'cay-an-trai', price: 150000 },
  { name: 'Cây Bưởi Da Xanh', category: 'cay-an-trai', price: 250000 },
  { name: 'Cây Ổi Nữ Hoàng', category: 'cay-an-trai', price: 120000 },
  { name: 'Cây Vú Sữa', category: 'cay-an-trai', price: 450000 },
  { name: 'Cây Nhãn Lồng', category: 'cay-an-trai', price: 180000 },
  { name: 'Cây Chôm Chôm', category: 'cay-an-trai', price: 220000 },
  { name: 'Cây Sầu Riêng', category: 'cay-an-trai', price: 350000 },
  { name: 'Cây Khế Ngọt', category: 'cay-an-trai', price: 140000 },
  { name: 'Cây Lựu Đỏ', category: 'cay-an-trai', price: 280000 },
  { name: 'Cây Nho Ninh Thuận', category: 'cay-an-trai', price: 190000 }
];

// Beautiful Unsplash images for plants
const images = [
  'https://images.unsplash.com/photo-1597848212624-a19eb35e26f6?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1416879598555-22b07e4d8fb8?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1517191434949-5e90cd67d2b6?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800'
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
  let height = '50-100cm';

  if (category === 'cay-cong-trinh') {
    catText = 'cây công trình, cây bóng mát';
    light = 'Nắng toàn phần';
    height = '3-5m';
  } else if (category === 'cay-canh-trong-nha') {
    catText = 'cây nội thất, cây văn phòng';
    light = 'Bán râm / Trong nhà';
    water = 'Ít';
  } else if (category === 'cay-canh-san-vuon') {
    catText = 'cây trang trí sân vườn';
    light = 'Nắng trực tiếp';
  } else if (category === 'cay-an-trai') {
    catText = 'cây ăn trái thơm ngon';
    light = 'Nắng trực tiếp';
    water = 'Nhiều';
    height = '2-4m';
  }

  return `${name} là loại ${catText} đang rất được ưa chuộng hiện nay. Cây không chỉ mang lại không gian xanh mát, gần gũi với thiên nhiên mà còn tô điểm thêm vẻ đẹp cho kiến trúc của bạn.

### Đặc điểm nổi bật
- **Hình thái:** Cây có dáng vẻ khỏe khoắn, cành lá sum suê.
- **Sức sống:** Cây sinh trưởng tốt trong môi trường khí hậu Việt Nam, khả năng chống chịu sâu bệnh cực tốt.
- **Tính ứng dụng:** Dễ dàng bố trí ở nhiều không gian khác nhau, từ chậu nhỏ đến bồn hoa lớn.

### Công dụng và Ý nghĩa phong thủy
- Giúp thanh lọc không khí, giảm thiểu bụi mịn và các chất độc hại trong môi trường sống.
- Trong phong thủy, ${name} được tin là mang lại năng lượng tích cực, xua tan luồng khí xấu.
- Giúp gia chủ thu hút tài lộc, bình an và thăng tiến trong sự nghiệp.

### Hướng dẫn chăm sóc cơ bản
- **Ánh sáng:** Cây chuộng môi trường ánh sáng ${light.toLowerCase()}.
- **Chế độ tưới:** Nhu cầu nước ${water.toLowerCase()}, tránh tưới quá đẫm gây úng rễ.
- **Đất trồng:** Nên sử dụng đất tơi xốp, giàu mùn và thoát nước tốt.
- **Dinh dưỡng:** Bón phân định kỳ 1-2 tháng/lần bằng phân hữu cơ hoặc NPK loãng để cây xanh tốt quanh năm.`;
}

const mockProducts = plants.map((plant, index) => {
  const slug = slugify(plant.name);
  const img = images[index % images.length];
  
  return {
    id: 11 + index,
    slug: slug,
    name: plant.name,
    price: plant.price,
    category: plant.category,
    description: generateDescription(plant.name, plant.category),
    images: img,
    in_stock: true,
    sort_order: 100 - index,
    original_price: Math.floor(plant.price * 1.2 / 10000) * 10000,
    height: plant.category === 'cay-cong-trinh' ? '3-5m' : '50-80cm',
    light: plant.category.includes('trong-nha') ? 'Bán râm' : 'Nắng toàn phần',
    water: plant.category.includes('trong-nha') ? 'Ít' : 'Vừa phải',
    gallery: []
  };
});

fs.mkdirSync(path.join(__dirname, 'src/data'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'src/data/mock_products.json'), JSON.stringify(mockProducts, null, 2), 'utf8');
console.log('Successfully generated 50 mock products!');
