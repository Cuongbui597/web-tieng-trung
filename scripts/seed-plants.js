const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Helper to load env vars from .env.local
function loadEnv() {
  try {
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      content.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
          const key = match[1].trim();
          let value = match[2].trim();
          // Remove quotes if present
          if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
          }
          process.env[key] = value;
        }
      });
    }
  } catch (e) {
    console.error('Error loading .env.local:', e);
  }
}

loadEnv();

const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

if (!connectionString) {
  console.error('No database connection string found in .env.local');
  process.exit(1);
}

const client = new Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

const products = [
  // Cây công trình (Construction Trees)
  {
    name: 'Bàng Đài Loan',
    slug: 'bang-dai-loan',
    price: 550000,
    category: 'cay-cong-trinh',
    description: 'Cây Bàng Đài Loan có dáng thẳng, tán lá đẹp, xếp tầng, thường được trồng lấy bóng mát cho công trình, đường phố.',
    images: 'https://images.unsplash.com/photo-1542361345-89e58247f2d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    in_stock: true
  },
  {
    name: 'Cây Lộc Vừng',
    slug: 'cay-loc-vung',
    price: 1200000,
    category: 'cay-cong-trinh',
    description: 'Cây Lộc Vừng nằm trong tứ đại cây cảnh (Sanh, Sung, Tùng, Lộc), mang ý nghĩa tài lộc, may mắn.',
    images: 'https://images.unsplash.com/photo-1621255877477-8c347d4e5111?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    in_stock: true
  },
  {
    name: 'Cây Sao Đen',
    slug: 'cay-sao-den',
    price: 850000,
    category: 'cay-cong-trinh',
    description: 'Cây Sao Đen là cây bóng mát phổ biến, thân gỗ lớn, thẳng, tán lá xanh quanh năm.',
    images: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    in_stock: true
  },

  // Cây cảnh trong nhà (Indoor Plants)
  {
    name: 'Cây Kim Tiền',
    slug: 'cay-kim-tien',
    price: 150000,
    category: 'cay-canh-trong-nha',
    description: 'Cây Kim Tiền mang ý nghĩa tài lộc, phú quý. Thích hợp để bàn, văn phòng, ít tốn công chăm sóc.',
    images: 'https://images.unsplash.com/photo-1614531341773-3bff8b7cb3fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    in_stock: true
  },
  {
    name: 'Cây Lưỡi Hổ',
    slug: 'cay-luoi-ho',
    price: 120000,
    category: 'cay-canh-trong-nha',
    description: 'Cây Lưỡi Hổ có khả năng lọc không khí cực tốt, hấp thụ 107 loại độc tố, kể cả các độc tố gây ung thư.',
    images: 'https://images.unsplash.com/photo-1598263156292-6b3a0eec268a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    in_stock: true
  },
  {
    name: 'Cây Trầu Bà',
    slug: 'cay-trau-ba',
    price: 80000,
    category: 'cay-canh-trong-nha',
    description: 'Cây Trầu Bà dễ trồng, sinh trưởng nhanh, có thể trồng đất hoặc thủy sinh, giúp lọc không khí.',
    images: 'https://images.unsplash.com/photo-1600417148543-5151f7743d7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    in_stock: true
  },

  // Cây cảnh sân vườn (Garden Plants)
  {
    name: 'Hoa Giấy',
    slug: 'hoa-giay',
    price: 250000,
    category: 'cay-canh-san-vuon',
    description: 'Hoa Giấy rực rỡ nhiều màu sắc, dễ trồng, chịu hạn tốt, thường trồng làm cổng, hàng rào.',
    images: 'https://images.unsplash.com/photo-1558296332-9cb5e4d1f2b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    in_stock: true
  },
  {
    name: 'Cây Tùng Bách',
    slug: 'cay-tung-bach',
    price: 450000,
    category: 'cay-canh-san-vuon',
    description: 'Cây Tùng Bách có dáng đẹp, sang trọng, thường được trồng trang trí sân vườn biệt thự.',
    images: 'https://images.unsplash.com/photo-1596700813936-e63083dbd637?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    in_stock: true
  },
  {
    name: 'Cây Hồng Lộc',
    slug: 'cay-hong-loc',
    price: 180000,
    category: 'cay-canh-san-vuon',
    description: 'Cây Hồng Lộc có lộc non màu đỏ hồng đẹp mắt, thường trồng viền hoặc tạo cảnh quan.',
    images: 'https://images.unsplash.com/photo-1627917897284-82a9341852d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    in_stock: true
  },

  // Cây ăn trái (Fruit Trees)
  {
    name: 'Cây Xoài',
    slug: 'cay-xoai',
    price: 350000,
    category: 'cay-an-trai',
    description: 'Cây Xoài giống mới, cho quả ngon, năng suất cao. Cây ghép nhanh ra trái.',
    images: 'https://images.unsplash.com/photo-1596486026859-f9c34d8721c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    in_stock: true
  },
  {
    name: 'Cây Ổi',
    slug: 'cay-oi',
    price: 120000,
    category: 'cay-an-trai',
    description: 'Cây Ổi Nữ Hoàng, Ổi Lê Đài Loan giòn, ngọt, ít hạt. Dễ trồng trong chậu hoặc vườn.',
    images: 'https://images.unsplash.com/photo-1595123550441-d377e017de6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    in_stock: true
  },
  {
    name: 'Cây Mít',
    slug: 'cay-mit',
    price: 200000,
    category: 'cay-an-trai',
    description: 'Cây Mít Thái siêu sớm, múi dày, ngọt đậm, cơm vàng. Cây khỏe, ít sâu bệnh.',
    images: 'https://images.unsplash.com/photo-1623867018337-37dfd10c2c19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    in_stock: true
  }
];

async function seed() {
  await client.connect();
  console.log('Connected to database');

  try {
    for (const product of products) {
      console.log(`Upserting ${product.name}...`);
      await client.query(`
        INSERT INTO products (slug, name, price, description, images, category, in_stock, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
        ON CONFLICT (slug) 
        DO UPDATE SET 
          name = EXCLUDED.name,
          price = EXCLUDED.price,
          description = EXCLUDED.description,
          images = EXCLUDED.images,
          category = EXCLUDED.category,
          in_stock = EXCLUDED.in_stock;
      `, [
        product.slug,
        product.name,
        product.price,
        product.description,
        product.images,
        product.category,
        product.in_stock
      ]);
    }
    console.log('Seeding completed successfully!');
  } catch (e) {
    console.error('Error seeding data:', e);
  } finally {
    await client.end();
  }
}

seed();
