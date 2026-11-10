const { createClient } = require('@vercel/postgres');
const { loadEnvConfig } = require('@next/env');
const fs = require('fs');

loadEnvConfig(process.cwd());

const updates = [
    {
        slug: 'bang-dai-loan',
        description: 'Cây Bàng Đài Loan là loại cây cảnh quan, bóng mát công trình được ưa chuộng. Với dáng thẳng tắp, các cành nhánh tạo thành những tầng tán xòe rộng đẹp mắt, cây mang lại không gian xanh mát cho đường phố.\n\n### Đặc điểm nổi bật\n- **Hình thái:** Thân gỗ mọc thẳng, phân cành thành các tầng xòe ngang đẹp mắt.\n- **Lá:** Lá nhỏ, ít rụng, rất phù hợp cho cảnh quan đô thị để giữ vệ sinh sạch sẽ.\n- **Khả năng thích nghi:** Sinh trưởng nhanh, chịu hạn và chịu nhiệt rất tốt.\n\n### Ý nghĩa phong thủy\nDáng cây vươn thẳng vươn cao tượng trưng cho sự ngay thẳng, ý chí nỗ lực vươn lên không ngừng nghỉ và sự thăng tiến vững chắc trong sự nghiệp.\n\n### Hướng dẫn chăm sóc\n- **Ánh sáng:** Cây ưa nắng toàn phần, nên trồng ở khu vực rộng rãi.\n- **Nước tưới:** Tưới nước vừa phải (2-3 lần/tuần khi cây mới trồng).\n- **Đất:** Không kén đất, dễ dàng sinh trưởng trên nhiều loại địa hình.'
    },
    {
        slug: 'cay-loc-vung',
        description: 'Lộc Vừng là một trong tứ đại cây cảnh (Sanh, Sung, Tùng, Lộc), mang lại may mắn, tài lộc cho gia chủ. Hoa lộc vừng mọc thành chùm dài màu đỏ rực rỡ, tỏa hương thơm ngát về đêm.\n\n### Đặc điểm nổi bật\n- **Hình dáng:** Thân gỗ, sống lâu năm. Vỏ cây sần sùi tạo nét cổ kính.\n- **Hoa:** Hoa mọc thành chuỗi dài từ 20-50cm, cánh hoa đỏ rực mỏng manh li ti rủ xuống trông như pháo hoa.\n- **Ra hoa:** Thường ra hoa từ tháng 6 đến tháng 8 âm lịch.\n\n### Ý nghĩa phong thủy\n- "Lộc" ứng với tài lộc, "Vừng" ngụ ý nhỏ nhặt nhưng rất nhiều. Mang ý nghĩa tài lộc dồi dào, hưng vượng.\n- Hoa màu đỏ tượng trưng cho hỷ sự, may mắn bình an.\n\n### Cách chăm sóc\n- **Ánh sáng:** Ưa sáng nhưng cũng chịu được bóng râm bán phần.\n- **Tưới nước:** Rất ưa nước, rễ cây có thể sống trong môi trường bán ngập lụt nên cần tưới nhiều và thường xuyên.\n- **Dinh dưỡng:** Bón phân định kỳ để cây đủ sức ra hoa.'
    },
    {
        slug: 'cay-sao-den',
        description: 'Sao Đen là cây gỗ lớn thân thẳng, tán lá rậm rạp xanh quanh năm, rất phù hợp làm cây bóng mát cho công viên, trường học, hay khu đô thị.\n\n### Đặc điểm nổi bật\n- Thân cây có thể đạt kích thước khổng lồ trong tự nhiên.\n- Lá thuôn dài, mặt trên nhẵn bóng, ít rụng lá.\n- Gỗ Sao Đen rất quý, có giá trị kinh tế cao, không bị mối mọt.\n\n### Vai trò cảnh quan\n- Nhờ tán lá dày đặc, Sao Đen cho bóng mát tuyệt vời, cản bụi và lọc không khí cực kì hiệu quả.\n- Rễ cọc đâm sâu giúp cây chịu được gió bão tốt, khó đổ ngã.\n\n### Hướng dẫn trồng và chăm sóc\n- Cây ưa đất ẩm, sâu dày, chịu được ngập úng nhẹ.\n- Trong giai đoạn mới trồng cần chống đỡ cẩn thận và tưới nước giữ ẩm thường xuyên.\n- Chịu được nắng gắt toàn phần khi đã trưởng thành.'
    },
    {
        slug: 'cay-kim-tien',
        description: 'Cây Kim Tiền (hay còn gọi là Kim Phát Tài) là loại cây cảnh nội thất số 1 hiện nay. Với lá xanh bóng, mọc vươn thẳng, cây không chỉ làm đẹp không gian mà còn mang lại sinh khí ngập tràn.\n\n### Đặc điểm nhận dạng\n- Lá hình bầu dục, mọc đối xứng dọc theo cuống, màu xanh mướt, sáng bóng.\n- Thân phình to ở gốc để tích trữ nước.\n- Sống bền bỉ trong nhà máy lạnh.\n\n### Ý nghĩa phong thủy\n- Đúng như tên gọi, Kim Tiền tượng trưng cho tiền tài, phú quý và sự giàu sang.\n- Thường được dùng làm quà tặng khai trương, tân gia với lời chúc "Phát tài phát lộc".\n\n### Bí quyết chăm sóc\n- **Nước tưới:** Rất sợ úng nước. Chỉ tưới khi đất thật khô (1-2 tuần/lần). Dùng khăn ẩm lau lá để lá luôn bóng bẩy.\n- **Ánh sáng:** Ưa bóng râm hoặc ánh sáng hắt nhẹ. Tránh để nơi có nắng gắt chiếu trực tiếp làm cháy lá.\n- **Đất:** Đất trồng cần tơi xốp, thoát nước cực tốt.'
    },
    {
        slug: 'cay-luoi-ho',
        description: 'Lưỡi Hổ được NASA công nhận là một trong những loài cây có khả năng thanh lọc không khí tốt nhất. Đặc biệt, cây hấp thụ CO2 và nhả Oxy vào ban đêm, vô cùng phù hợp để đặt trong phòng ngủ.\n\n### Công dụng tuyệt vời\n- Hấp thụ hiệu quả 107 độc tố (bao gồm cả Formadehyde, Xylene, Toluene).\n- Hấp thụ từ tính phát ra từ máy tính, điện thoại, các thiết bị điện tử.\n\n### Ý nghĩa phong thủy\n- Những chiếc lá vươn cao sắc nhọn như lưỡi gươm giúp xua đuổi tà khí, bảo vệ gia chủ khỏi những điều xui xẻo.\n- Mang năng lượng phong thủy mạnh mẽ, thể hiện sự cứng rắn, kiên cường.\n\n### Chăm sóc siêu dễ\n- **Ánh sáng:** Sống tốt ở mọi điều kiện, từ bóng râm phòng kín đến ngoài trời nắng gắt.\n- **Nước tưới:** Là cây mọng nước, Lưỡi Hổ chịu hạn cực giỏi. Chỉ tưới khoảng 1-2 lần/tháng.\n- Gần như không có sâu bệnh.'
    },
    {
        slug: 'cay-trau-ba',
        description: 'Trầu Bà (Vạn Niên Thanh leo) là giống cây leo thân thảo, lá hình trái tim xanh ngát. Cây cực kì dễ sống, có thể trồng đất hoặc trồng thủy sinh trang trí bàn làm việc.\n\n### Đặc điểm nổi bật\n- Sinh trưởng nhanh, rễ vươn khỏe.\n- Lá xanh bóng, đôi khi có đốm vàng hoặc trắng tùy giống.\n- Thích hợp trồng giỏ treo, bám cột hoặc bình thủy tinh trong suốt.\n\n### Công dụng và Ý nghĩa\n- Có khả năng hút bức xạ máy tính, thanh lọc không khí khỏi các khí độc dễ bay hơi.\n- Phong thủy mang ý nghĩa may mắn, bình an, hanh thông trong công việc, học tập.\n\n### Cách chăm sóc\n- **Trồng đất:** Tưới nước 2-3 lần/tuần, giữ đất luôn ẩm.\n- **Trồng thủy sinh:** Thay nước 1 tuần/lần, có thể nhỏ thêm 1-2 giọt dung dịch thủy canh để lá xanh tốt.\n- Tránh nắng gắt chiếu trực tiếp làm vàng lá.'
    },
    {
        slug: 'hoa-giay',
        description: 'Hoa Giấy (Bông Giấy) mang vẻ đẹp rực rỡ, mộc mạc nhưng đầy cuốn hút. Hoa có cấu tạo độc đáo, mỏng manh như tờ giấy, nở rộ quanh năm bất chấp cái nắng chói chang của mùa hè.\n\n### Đặc điểm\n- Cây thuộc dạng thân gỗ leo bò trườn, phân nhiều nhánh.\n- Màu sắc hoa đa dạng: Hồng, Đỏ, Trắng, Vàng, Cam... Thậm chí có cây ghép 5 màu ngũ sắc.\n- Chịu hạn cực tốt, càng nắng gắt hoa càng bung nở rực rỡ.\n\n### Trang trí cảnh quan\n- Tuyệt vời khi trồng leo giàn phơi, ban công, làm cổng vòm hoặc hàng rào sinh thái.\n- Có thể cắt tỉa làm cây bonsai chậu vô cùng nghệ thuật.\n\n### Chăm sóc Hoa Giấy ra nhiều hoa\n- **Ánh sáng:** Bắt buộc phải trồng ở nơi có nắng trực tiếp (ít nhất 6 tiếng/ngày).\n- **Ép hoa:** Khi cây đang sinh trưởng mạnh (nhiều lá xanh), hãy xiết nước (ngưng tưới) vài ngày để lá héo rụng bớt, sau đó tưới lại cùng phân NPK để ép cây nảy nụ đồng loạt.'
    },
    {
        slug: 'cay-tung-bach',
        description: 'Tùng Bách mang dáng vóc uy nghi, thanh tao, lá kim xanh mướt quanh năm. Đây là loại cây trang trí sân vườn biệt thự, nhà thờ họ, hoặc trồng chậu bonsai vô cùng đẳng cấp.\n\n### Ý nghĩa hình tượng\n- Tùng Bách nằm trong bộ Tứ Quý "Tùng - Cúc - Trúc - Mai". Cây chịu được sương tuyết, bão bùng mà vẫn xanh tươi, tượng trưng cho khí tiết người quân tử, kiên cường bất khuất.\n- Trồng trước nhà mang ý nghĩa trường thọ, bình an, xua đuổi tà ma.\n\n### Đặc điểm sinh học\n- Thân gỗ, sống rất thọ.\n- Lá hình kim, mọc thành từng cụm xoắn ốc tuyệt đẹp.\n- Có mùi tinh dầu thơm nhẹ giúp xua đuổi côn trùng.\n\n### Chăm sóc cơ bản\n- Ưa ánh sáng, chịu được sương giá lẫn nắng nóng.\n- Không chịu được ngập úng. Cần đảm bảo hệ thống thoát nước tốt ở gốc.\n- Cắt tỉa tạo dáng (bonsai) vào mùa xuân để cây luôn giữ form đẹp.'
    },
    {
        slug: 'cay-hong-loc',
        description: 'Hồng Lộc là loại cây bụi đặc biệt với phần lộc non trên ngọn có màu đỏ hồng rực rỡ, bừng sáng cả một góc vườn. Cây rất dễ cắt tỉa, phù hợp tạo hình tháp, hình chóp hay trồng viền lối đi.\n\n### Đặc điểm nổi bật\n- Lá mọc đối, hình bầu dục, bóng nhẵn.\n- Lá non khi mới nảy có màu đỏ tươi hoặc cam hồng, chuyển dần sang vàng và xanh đậm khi già.\n- Cây chuộng nắng, càng nắng nhiều lộc non càng đỏ thắm.\n\n### Ý nghĩa phong thủy\n- Đúng với tên "Hồng Lộc", cây tượng trưng cho những lộc lá may mắn, điềm lành đỏ rực rỡ mang đến cho gia chủ.\n\n### Cách trồng và chăm sóc\n- Thường xuyên cắt tỉa ngọn (1-2 tháng/lần) để kích thích cây đâm nhiều chồi non mới màu đỏ.\n- Cần trồng ở nơi đón nắng trực tiếp trọn vẹn.\n- Tưới nước đều đặn mỗi ngày nếu trồng chậu, hoặc 2 ngày/lần nếu trồng ngoài đất vườn.'
    },
    {
        slug: 'cay-xoai',
        description: 'Cây Xoài vừa cho bóng mát tuyệt vời, vừa cho những trái xoài thơm ngon. Các giống xoài ghép (xoài Thái, xoài Đài Loan, xoài cát Hòa Lộc) hiện nay rất nhanh ra trái, có thể thu hoạch chỉ sau 1-2 năm trồng.\n\n### Ưu điểm của cây Xoài Ghép\n- Cho quả sớm, năng suất cao.\n- Cây lùn, tán rộng dễ thu hoạch, thích hợp trồng ở không gian sân vườn nhà phố.\n- Quả to, ngọt, ít xơ.\n\n### Lợi ích\n- Vừa có cây xanh lọc không khí, tạo bóng mát cho lũ trẻ vui chơi.\n- Vừa cung cấp nguồn trái cây sạch, an toàn cho cả gia đình.\n- Trồng xoài trước nhà còn có ý nghĩa đem lại sự sung túc, no đủ.\n\n### Chăm sóc để cây sai quả\n- **Đất trồng:** Đất phải màu mỡ, thoát nước tốt.\n- **Bón phân:** Bón phân NPK định kỳ, đặc biệt là giai đoạn cây chuẩn bị ra hoa và lúc đậu quả non.\n- **Nước:** Cây cần nhiều nước trong thời kỳ kết trái để quả lớn và căng mọng. Tuy nhiên khi cây đang xiết hoa thì cần giảm tưới.'
    }
];

async function run() {
    const client = createClient();
    await client.connect();

    try {
        for (const update of updates) {
            await client.query(`UPDATE products SET description = $1 WHERE slug = $2`, [update.description, update.slug]);
            console.log(`Updated ${update.slug}`);
        }
        
        // Also update the mock products if any exist in the DB (just in case they were added to DB)
        const dataPath = require('path').join(__dirname, 'src/data/mock_products.json');
        if (fs.existsSync(dataPath)) {
            const mockProducts = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
            for (const mock of mockProducts) {
                await client.query(`UPDATE products SET description = $1, images = $2 WHERE slug = $3`, [mock.description, mock.images, mock.slug]);
            }
            console.log('Updated mock products in DB (if they exist).');
        }

    } catch (e) {
        console.error(e);
    }
    
    await client.end();
}

run();
