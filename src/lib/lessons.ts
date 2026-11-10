import fs from 'fs';
import path from 'path';

export interface LessonItem {
    slug: string;
    title: string;
    category: string; // 'hsk-1' | 'hsk-2' | 'hsk-3' | 'cong-xuong' | 'cong-ty' | 'tre-em'
    hsk_level?: string;
    hanzi?: string;
    pinyin?: string;
    meaning?: string;
    description: string;
    duration: string;
    vocabCount: number;
    dialogue?: Array<{ speaker: string; hanzi: string; pinyin: string; viet: string }>;
    vocabList?: Array<{ hanzi: string; pinyin: string; viet: string; example?: string }>;
    notes?: string[];
}

export const PRESET_LESSONS: LessonItem[] = [
    // HSK 1
    {
        slug: 'hsk1-bai-1-chao-hoi',
        title: 'Bài 1: Chào hỏi cơ bản (你好 - Nǐ hǎo)',
        category: 'hsk-1',
        hsk_level: 'HSK 1',
        hanzi: '你好',
        pinyin: 'Nǐ hǎo',
        meaning: 'Xin chào',
        description: 'Làm quen với cách phát âm, thanh điệu pinyin và câu chào hỏi lịch sự thường ngày trong tiếng Trung.',
        duration: '25 phút',
        vocabCount: 10,
        dialogue: [
            { speaker: 'A', hanzi: '你好！', pinyin: 'Nǐ hǎo!', viet: 'Xin chào!' },
            { speaker: 'B', hanzi: '你好！你好吗？', pinyin: 'Nǐ hǎo! Nǐ hǎo ma?', viet: 'Xin chào! Bạn có khỏe không?' },
            { speaker: 'A', hanzi: '我很好，谢谢你。', pinyin: 'Wǒ hěn hǎo, xièxie nǐ.', viet: 'Tôi rất khỏe, cảm ơn bạn.' },
            { speaker: 'B', hanzi: '不客气，再见！', pinyin: 'Bú kèqi, zàijiàn!', viet: 'Không có chi, tạm biệt!' },
        ],
        vocabList: [
            { hanzi: '你', pinyin: 'nǐ', viet: 'bạn, anh, chị (ngôi thứ 2)' },
            { hanzi: '好', pinyin: 'hǎo', viet: 'tốt, khỏe, đẹp' },
            { hanzi: '我', pinyin: 'wǒ', viet: 'tôi, mình' },
            { hanzi: '很', pinyin: 'hěn', viet: 'rất' },
            { hanzi: '谢谢', pinyin: 'xièxie', viet: 'cảm ơn' },
            { hanzi: '不客气', pinyin: 'bú kèqi', viet: 'đừng khách sáo, không có chi' },
            { hanzi: '再见', pinyin: 'zàijiàn', viet: 'tạm biệt' },
        ],
        notes: [
            'Quy tắc biến điệu hai thanh 3: Khi hai thanh 3 đi liền nhau (Nǐ hǎo), âm đầu đọc thành thanh 2 (Ní hǎo).',
            'Cách dùng trợ từ nghi vấn 吗 (ma) ở cuối câu hỏi Yes/No.'
        ]
    },
    {
        slug: 'hsk1-bai-2-so-dem-va-thoi-gian',
        title: 'Bài 2: Số đếm & Hỏi giờ (数字与时间)',
        category: 'hsk-1',
        hsk_level: 'HSK 1',
        hanzi: '数字',
        pinyin: 'Shùzì',
        meaning: 'Số đếm',
        description: 'Nắm vững các số đếm từ 1 đến 100, cách hỏi ngày tháng, giờ giấc trong sinh hoạt.',
        duration: '30 phút',
        vocabCount: 15,
        dialogue: [
            { speaker: 'A', hanzi: '现在几点？', pinyin: 'Xiànzài jǐ diǎn?', viet: 'Bây giờ là mấy giờ?' },
            { speaker: 'B', hanzi: '现在早上八点三十分。', pinyin: 'Xiànzài zǎoshang bā diǎn sānshí fēn.', viet: 'Bây giờ là 8 giờ 30 phút sáng.' },
        ],
        vocabList: [
            { hanzi: '一、二、三', pinyin: 'yī, èr, sān', viet: '1, 2, 3' },
            { hanzi: '四、五、六', pinyin: 'sì, wǔ, liù', viet: '4, 5, 6' },
            { hanzi: '七、八、九、十', pinyin: 'qī, bā, jiǔ, shí', viet: '7, 8, 9, 10' },
            { hanzi: '点', pinyin: 'diǎn', viet: 'giờ' },
            { hanzi: '分', pinyin: 'fēn', viet: 'phút' },
        ],
        notes: ['Thứ tự thời gian tiếng Trung luôn đi từ lớn đến nhỏ: Năm -> Tháng -> Ngày -> Buổi -> Giờ.']
    },

    // HSK 2
    {
        slug: 'hsk2-bai-1-mua-sam-va-hoi-gia',
        title: 'Bài 1: Mua sắm & Trả giá (买东西 - Mǎi dōngxi)',
        category: 'hsk-2',
        hsk_level: 'HSK 2',
        hanzi: '买东西',
        pinyin: 'Mǎi dōngxi',
        meaning: 'Mua đồ',
        description: 'Mẫu câu hỏi giá tiền, so sánh đắt rẻ, thanh toán bằng tiền mặt hoặc quét mã QR.',
        duration: '35 phút',
        vocabCount: 18,
        dialogue: [
            { speaker: 'A', hanzi: '这个多少钱一斤？', pinyin: 'Zhège duōshao qián yì jīn?', viet: 'Cái này bao nhiêu tiền một cân?' },
            { speaker: 'B', hanzi: '二十块钱一斤。', pinyin: 'Èrshí kuài qián yì jīn.', viet: '20 đồng một cân.' },
            { speaker: 'A', hanzi: '太贵了！能便宜一点吗？', pinyin: 'Tài guì le! Néng piányi yìdiǎn ma?', viet: 'Đắt quá! Có thể rẻ hơn một chút không?' },
            { speaker: 'B', hanzi: '给你十八块吧。', pinyin: 'Gěi nǐ shíbā kuài ba.', viet: 'Lấy bạn 18 đồng nhé.' },
        ],
        vocabList: [
            { hanzi: '买 / 卖', pinyin: 'mǎi / mài', viet: 'mua / bán' },
            { hanzi: '多少钱', pinyin: 'duōshao qián', viet: 'bao nhiêu tiền' },
            { hanzi: '贵 / 便宜', pinyin: 'guì / piányi', viet: 'đắt / rẻ' },
            { hanzi: '块 / 元', pinyin: 'kuài / yuán', viet: 'đồng (đơn vị tệ)' },
        ],
        notes: ['Cấu trúc 太 + tính từ + 了 (quá/lắm): 太贵了 (đắt quá), 太好了 (tốt quá).']
    },

    // HSK 3
    {
        slug: 'hsk3-bai-1-phong-van-xin-viec',
        title: 'Bài 1: Phỏng vấn & Giới thiệu năng lực (面试与工作)',
        category: 'hsk-3',
        hsk_level: 'HSK 3',
        hanzi: '面试',
        pinyin: 'Miànshì',
        meaning: 'Phỏng vấn',
        description: 'Cách trả lời phỏng vấn xin việc, giới thiệu kinh nghiệm làm việc và nguyện vọng nghề nghiệp.',
        duration: '45 phút',
        vocabCount: 25,
        dialogue: [
            { speaker: 'Giám khảo', hanzi: '请先简单介绍一下你自己。', pinyin: 'Qǐng xiān jiǎndān jièshào yíxià nǐ zìjǐ.', viet: 'Xin mời giới thiệu ngắn gọn về bản thân bạn trước.' },
            { speaker: 'Ứng viên', hanzi: '我叫李明，毕业于对外经贸大学，有三年管理经验。', pinyin: 'Wǒ jiào Lǐ Míng, bìyè yú Duìwài Jīngmào Dàxué, yǒu sān nián guǎnlǐ jīngyàn.', viet: 'Tôi tên Lý Minh, tốt nghiệp ĐH Kinh tế Thương mại, có 3 năm kinh nghiệm quản lý.' },
        ],
        vocabList: [
            { hanzi: '面试', pinyin: 'miànshì', viet: 'phỏng vấn' },
            { hanzi: '毕业', pinyin: 'bìyè', viet: 'tốt nghiệp' },
            { hanzi: '经验', pinyin: 'jīngyàn', viet: 'kinh nghiệm' },
            { hanzi: '责任心', pinyin: 'zérènxīn', viet: 'tinh thần trách nhiệm' },
        ],
        notes: ['Cách dùng phó từ kết nối 先... 然后... (trước tiên... sau đó...).']
    },

    // Giao tiếp công xưởng
    {
        slug: 'cong-xuong-an-toan-lao-dong',
        title: 'Chuyên đề 1: An toàn lao động & Quy định xưởng (安全生产)',
        category: 'cong-xuong',
        hsk_level: 'Công xưởng',
        hanzi: '安全生产',
        pinyin: 'Ānquán shēngchǎn',
        meaning: 'Sản xuất an toàn',
        description: 'Từ vựng mũ bảo hộ, găng tay, nút dừng khẩn cấp và các khẩu hiệu an toàn bắt buộc tại nhà máy.',
        duration: '40 phút',
        vocabCount: 20,
        dialogue: [
            { speaker: 'Đốc công', hanzi: '进入车间必须戴安全帽和防护手套！', pinyin: 'Jìnrù chējiān bìxū dài ānquánmào hé fánghù shǒutào!', viet: 'Vào xưởng bắt buộc phải đội mũ bảo hộ và đeo găng tay!' },
            { speaker: 'Công nhân', hanzi: '好的，主管！我马上戴上。', pinyin: 'Hǎo de, zhǔguǎn! Wǒ mǎshàng dài shàng.', viet: 'Vâng thưa quản lý! Tôi đội vào ngay.' },
            { speaker: 'Đốc công', hanzi: '如果机器有异常，立刻按下红色紧急停止按钮。', pinyin: 'Rúguǒ jīqì yǒu yìcháng, lìkè àn xià hóngsè jǐnjí tíngzhǐ ànniǔ.', viet: 'Nếu máy có dấu hiệu bất thường, bấm ngay nút dừng khẩn cấp màu đỏ.' },
        ],
        vocabList: [
            { hanzi: '车间', pinyin: 'chējiān', viet: 'phân xưởng' },
            { hanzi: '安全帽', pinyin: 'ānquánmào', viet: 'mũ bảo hộ' },
            { hanzi: '防护手套', pinyin: 'fánghù shǒutào', viet: 'găng tay bảo hộ' },
            { hanzi: '紧急停止', pinyin: 'jǐnjí tíngzhǐ', viet: 'dừng khẩn cấp' },
            { hanzi: '主管 / 组长', pinyin: 'zhǔguǎn / zǔzhǎng', viet: 'quản lý / tổ trưởng' },
        ],
        notes: ['Nắm rõ tên các thiết bị, biển cảnh báo nguy hiểm trong xưởng sản xuất có yếu tố Trung Quốc/Đài Loan.']
    },
    {
        slug: 'cong-xuong-bao-cao-san-luong',
        title: 'Chuyên đề 2: Báo cáo sản lượng & Giao ca (产量汇报与交班)',
        category: 'cong-xuong',
        hsk_level: 'Công xưởng',
        hanzi: '产量汇报',
        pinyin: 'Chǎnliàng huìbào',
        meaning: 'Báo cáo sản lượng',
        description: 'Cách báo cáo số lượng đạt chuẩn, phế phẩm, tiến độ dây chuyền và bàn giao sổ ca.',
        duration: '40 phút',
        vocabCount: 20,
        dialogue: [
            { speaker: 'Tổ trưởng', hanzi: '今天早班完成了多少件？', pinyin: 'Jīntiān zǎobān wánchéng le duōshao jiàn?', viet: 'Ca sáng hôm nay hoàn thành được bao nhiêu chiếc?' },
            { speaker: 'Công nhân', hanzi: '报告组长，合格品850件，不良品15件。', pinyin: 'Bàogào zǔzhǎng, hégépǐn bābǎi wǔshí jiàn, bùliángpǐn shíwǔ jiàn.', viet: 'Báo cáo tổ trưởng, hàng đạt 850 chiếc, hàng lỗi 15 chiếc.' },
        ],
        vocabList: [
            { hanzi: '早班 / 夜班', pinyin: 'zǎobān / yèbān', viet: 'ca sáng / ca đêm' },
            { hanzi: '合格品', pinyin: 'hégépǐn', viet: 'hàng đạt chuẩn' },
            { hanzi: '不良品 / 废品', pinyin: 'bùliángpǐn / fèipǐn', viet: 'hàng lỗi, phế phẩm' },
            { hanzi: '交接班', pinyin: 'jiāojiē bān', viet: 'bàn giao ca làm' },
        ],
        notes: ['Số từ và lượng từ chuyên dụng trong kiểm kê hàng hóa công nghiệp.']
    },

    // Giao tiếp công ty
    {
        slug: 'cong-ty-hop-hanh-bao-cao',
        title: 'Chuyên đề: Họp hành & Báo cáo tiến độ dự án (开会与项目汇报)',
        category: 'cong-ty',
        hsk_level: 'Công ty',
        hanzi: '开会汇报',
        pinyin: 'Kāihuì huìbào',
        meaning: 'Họp & báo cáo',
        description: 'Giao tiếp lịch thiệp với sếp và đồng nghiệp người Trung, gửi email tóm tắt cuộc họp.',
        duration: '45 phút',
        vocabCount: 22,
        dialogue: [
            { speaker: 'Giám đốc', hanzi: '今天的会议主要讨论下个季度的营销方案。', pinyin: 'Jīntiān de huìyì zhǔyào tǎolùn xià ge jìdù de yíngxiāo fāng\'àn.', viet: 'Cuộc họp hôm nay chủ yếu thảo luận phương án tiếp thị quý tới.' },
            { speaker: 'Nhân viên', hanzi: '我已经把详细报告发到各位的邮箱了。', pinyin: 'Wǒ yǐjīng bǎ xiángxì bàogào fā dào gèwèi de yóuxiāng le.', viet: 'Tôi đã gửi báo cáo chi tiết vào hòm thư của mọi người rồi ạ.' },
        ],
        vocabList: [
            { hanzi: '会议', pinyin: 'huìyì', viet: 'cuộc họp' },
            { hanzi: '方案', pinyin: 'fāng\'àn', viet: 'phương án, đề án' },
            { hanzi: '下个季度', pinyin: 'xià ge jìdù', viet: 'quý tới' },
            { hanzi: '发邮件', pinyin: 'fā yóujiàn', viet: 'gửi email' },
        ],
        notes: ['Kính ngữ và phong thái ứng xử chuẩn mực trong văn phòng doanh nghiệp Trung Quốc.']
    },

    // Trẻ em
    {
        slug: 'tre-em-mau-sac-va-con-vat',
        title: 'Bé vui học: Màu sắc rực rỡ & Động vật đáng yêu (颜色与动物)',
        category: 'tre-em',
        hsk_level: 'Trẻ em',
        hanzi: '颜色动物',
        pinyin: 'Yánsè dòngwù',
        meaning: 'Màu sắc & động vật',
        description: 'Bài học sinh động với hình vẽ chú gấu trúc Panda, mèo con, quả táo đỏ và các trò chơi đố vui.',
        duration: '20 phút',
        vocabCount: 12,
        dialogue: [
            { speaker: 'Cô giáo', hanzi: '小朋友，大熊猫是什么颜色的？', pinyin: 'Xiǎopéngyou, dàxióngmāo shì shénme yánsè de?', viet: 'Các bạn nhỏ ơi, gấu trúc khổng lồ màu gì nhỉ?' },
            { speaker: 'Bé', hanzi: '是黑色和白色的！', pinyin: 'Shì hēisè hé báisè de!', viet: 'Là màu đen và màu trắng ạ!' },
        ],
        vocabList: [
            { hanzi: '大熊猫', pinyin: 'dàxióngmāo', viet: 'gấu trúc khổng lồ' },
            { hanzi: '红色', pinyin: 'hóngsè', viet: 'màu đỏ' },
            { hanzi: '黄色', pinyin: 'huángsè', viet: 'màu vàng' },
            { hanzi: '猫 / 狗', pinyin: 'māo / gǒu', viet: 'mèo / chó' },
        ],
        notes: ['Phương pháp liên tưởng âm thanh và hình ảnh sinh động giúp trẻ ghi nhớ tự nhiên.']
    }
];

export async function getAllLessons(): Promise<LessonItem[]> {
    return PRESET_LESSONS;
}

export async function getLessonBySlug(slug: string): Promise<LessonItem | null> {
    return PRESET_LESSONS.find(l => l.slug === slug) || null;
}

export async function getLessonsByCategory(category: string): Promise<LessonItem[]> {
    return PRESET_LESSONS.filter(l => l.category === category);
}
