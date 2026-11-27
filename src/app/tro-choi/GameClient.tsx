"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { GARMENT_VOCAB_DATABASE, GARMENT_LESSONS } from './garmentVocab';
import { BUOI_1_VOCAB } from './buoi1Vocab';
import { ALL_HSK_EXTRA_VOCAB } from './hskVocab';
import { FACTORY_EXTRA_VOCAB } from './factoryVocab';
import { ALL_LIVING_VOCAB } from './livingVocab';
import { useVirtualKeyboard } from '@/hooks/useVirtualKeyboard';

interface WordItem {
    id: string;
    hanzi: string;
    pinyin: string;
    meanings: string[]; // Các nghĩa tiếng Việt chấp nhận được
    category: 'hsk-1' | 'hsk-2' | 'hsk-3' | 'cong-xuong' | 'may-mac' | 'buoi-1' | 'buoi-1-phong-o' | 'buoi-2-ktx' | 'buoi-3-bep' | 'buoi-4-trang-phuc' | string;
    categoryLabel: string;
    lesson?: string;
    lessonLabel?: string;
    lessonTopic?: string;
    isReview?: boolean;
    part?: 'A' | 'B' | 'C';
    partTitle?: string;
    note?: string;
    exampleSentence?: {
        hanzi: string;
        pinyin: string;
        vietnamese: string;
        grammarNote?: string;
    };
}

const TOTAL_ROUND_WORDS = 16;
const ROUND_TIME_LIMIT = 60; // 1 phút giới hạn cho mỗi lượt chơi

// KHO TỪ VỰNG PHONG PHÚ: 170+ TỪ VỰNG CHUẨN
const VOCAB_DATABASE: WordItem[] = [
    // ==================== HSK 1 (35 TỪ) ====================
    { id: 'h1_1', hanzi: '你好', pinyin: 'nǐ hǎo', meanings: ['xin chào', 'chào', 'chào bạn', 'xin chao', 'chao ban', 'chao'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_2', hanzi: '谢谢', pinyin: 'xièxie', meanings: ['cảm ơn', 'cám ơn', 'cảm ơn bạn', 'cam on', 'cam on ban'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_3', hanzi: '再见', pinyin: 'zàijiàn', meanings: ['tạm biệt', 'hẹn gặp lại', 'tam biet', 'hen gap lai', 'bye'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_4', hanzi: '对不起', pinyin: 'duìbuqǐ', meanings: ['xin lỗi', 'xin loi'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_5', hanzi: '没关系', pinyin: 'méi guānxi', meanings: ['không sao', 'không có gì', 'khong sao', 'khong co gi'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_6', hanzi: '水', pinyin: 'shuǐ', meanings: ['nước', 'nuoc', 'nước uống'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_7', hanzi: '茶', pinyin: 'chá', meanings: ['trà', 'chè', 'tra', 'che', 'nước trà', 'nuoc tra'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_8', hanzi: '吃', pinyin: 'chī', meanings: ['ăn', 'an', 'ăn cơm'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_9', hanzi: '喝', pinyin: 'hē', meanings: ['uống', 'uong', 'uống nước'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_10', hanzi: '猫', pinyin: 'māo', meanings: ['mèo', 'con mèo', 'meo', 'con meo'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_11', hanzi: '狗', pinyin: 'gǒu', meanings: ['chó', 'con chó', 'cho', 'con cho'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_12', hanzi: '苹果', pinyin: 'píngguǒ', meanings: ['táo', 'quả táo', 'trái táo', 'tao', 'qua tao'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_13', hanzi: '钱', pinyin: 'qián', meanings: ['tiền', 'tien', 'tiền bạc'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_14', hanzi: '书', pinyin: 'shū', meanings: ['sách', 'cuốn sách', 'quyển sách', 'sach', 'cuon sach'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_15', hanzi: '老师', pinyin: 'lǎoshī', meanings: ['thầy giáo', 'cô giáo', 'giáo viên', 'thầy', 'cô', 'thay co', 'giao vien'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_16', hanzi: '学生', pinyin: 'xuésheng', meanings: ['học sinh', 'sinh viên', 'hoc sinh', 'sinh vien'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_17', hanzi: '爸爸', pinyin: 'bàba', meanings: ['bố', 'ba', 'cha', 'bo', 'ba ba'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_18', hanzi: '妈妈', pinyin: 'māma', meanings: ['mẹ', 'má', 'me', 'ma'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_19', hanzi: '儿子', pinyin: 'érzi', meanings: ['con trai', 'con giai', 'con trai toi'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_20', hanzi: '女儿', pinyin: 'nǚ\'ér', meanings: ['con gái', 'con gai'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_21', hanzi: '家', pinyin: 'jiā', meanings: ['nhà', 'gia đình', 'nha', 'gia dinh'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_22', hanzi: '学校', pinyin: 'xuéxiào', meanings: ['trường học', 'trường', 'truong hoc', 'truong'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_23', hanzi: '商店', pinyin: 'shāngdiàn', meanings: ['cửa hàng', 'tiệm', 'cua hang', 'tiem'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_24', hanzi: '看', pinyin: 'kàn', meanings: ['nhìn', 'xem', 'đọc', 'nhin', 'xem phim'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_25', hanzi: '听', pinyin: 'tīng', meanings: ['nghe', 'lắng nghe', 'nghe nhac'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_26', hanzi: '说话', pinyin: 'shuōhuà', meanings: ['nói chuyện', 'nói', 'noi chuyen', 'noi'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_27', hanzi: '买', pinyin: 'mǎi', meanings: ['mua', 'mua đồ', 'mua sắm'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_28', hanzi: '大', pinyin: 'dà', meanings: ['to', 'lớn', 'to lớn'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_29', hanzi: '小', pinyin: 'xiǎo', meanings: ['nhỏ', 'bé', 'nho', 'be'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_30', hanzi: '多', pinyin: 'duō', meanings: ['nhiều', 'nhieu'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_31', hanzi: '少', pinyin: 'shǎo', meanings: ['ít', 'it'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_32', hanzi: '好', pinyin: 'hǎo', meanings: ['tốt', 'đẹp', 'hay', 'được', 'tot', 'dep'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_33', hanzi: '冷', pinyin: 'lěng', meanings: ['lạnh', 'lanh'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_34', hanzi: '热', pinyin: 'rè', meanings: ['nóng', 'nong'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_35', hanzi: '衣服', pinyin: 'yīfu', meanings: ['quần áo', 'áo quần', 'áo', 'quan ao'], category: 'hsk-1', categoryLabel: 'HSK 1' },

    // ==================== HSK 2 (35 TỪ) ====================
    { id: 'h2_1', hanzi: '早上', pinyin: 'zǎoshang', meanings: ['buổi sáng', 'sáng', 'buoi sang', 'sang'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_2', hanzi: '晚上', pinyin: 'wǎnshang', meanings: ['buổi tối', 'tối', 'buoi toi', 'toi'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_3', hanzi: '帮助', pinyin: 'bāngzhù', meanings: ['giúp đỡ', 'giúp', 'trợ giúp', 'giup do', 'giup'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_4', hanzi: '便宜', pinyin: 'piányi', meanings: ['rẻ', 're', 'giá rẻ', 're tien'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_5', hanzi: '贵', pinyin: 'guì', meanings: ['đắt', 'mắc', 'quý', 'dat', 'mac'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_6', hanzi: '准备', pinyin: 'zhǔnbèi', meanings: ['chuẩn bị', 'chuan bi'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_7', hanzi: '欢迎', pinyin: 'huānyíng', meanings: ['hoan nghênh', 'chào đón', 'chao don', 'hoan nghenh', 'chào mừng'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_8', hanzi: '旅游', pinyin: 'lǚyóu', meanings: ['du lịch', 'du lich', 'đi du lịch'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_9', hanzi: '运动', pinyin: 'yùndòng', meanings: ['vận động', 'thể thao', 'van dong', 'the thao'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_10', hanzi: '时间', pinyin: 'shíjiān', meanings: ['thời gian', 'thoi gian', 'giờ giấc'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_11', hanzi: '身体', pinyin: 'shēntǐ', meanings: ['sức khỏe', 'cơ thể', 'thân thể', 'suc khoe', 'co the'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_12', hanzi: '生日', pinyin: 'shēngrì', meanings: ['sinh nhật', 'sinh nhat', 'ngày sinh'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_13', hanzi: '跑步', pinyin: 'pǎobù', meanings: ['chạy bộ', 'chạy', 'chay bo'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_14', hanzi: '游泳', pinyin: 'yóuyǒng', meanings: ['bơi lội', 'bơi', 'boi loi', 'boi'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_15', hanzi: '唱歌', pinyin: 'chànggē', meanings: ['ca hát', 'hát', 'ca hat', 'hat'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_16', hanzi: '跳舞', pinyin: 'tiàowǔ', meanings: ['khiêu vũ', 'nhảy múa', 'múa', 'khieu vu', 'nhay mua'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_17', hanzi: '门', pinyin: 'mén', meanings: ['cửa', 'cái cửa', 'cua', 'canh cua'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_18', hanzi: '眼睛', pinyin: 'yǎnjing', meanings: ['mắt', 'đôi mắt', 'mat', 'doi mat'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_19', hanzi: '颜色', pinyin: 'yánsè', meanings: ['màu sắc', 'màu', 'mau sac', 'mau'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_20', hanzi: '机场', pinyin: 'jīchǎng', meanings: ['sân bay', 'phi trường', 'san bay'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_21', hanzi: '车站', pinyin: 'chēzhàn', meanings: ['bến xe', 'nhà ga', 'trạm xe', 'ben xe', 'nha ga'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_22', hanzi: '医院', pinyin: 'yīyuàn', meanings: ['bệnh viện', 'nhà thương', 'benh vien'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_23', hanzi: '药', pinyin: 'yào', meanings: ['thuốc', 'thuoc', 'uống thuốc'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_24', hanzi: '晴', pinyin: 'qíng', meanings: ['nắng', 'trời nắng', 'nang', 'troi nang'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_25', hanzi: '阴', pinyin: 'yīn', meanings: ['âm u', 'trời râm', 'râm', 'am u'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_26', hanzi: '下雨', pinyin: 'xiàyǔ', meanings: ['mưa', 'trời mưa', 'mua', 'troi mua'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_27', hanzi: '事情', pinyin: 'shìqing', meanings: ['sự việc', 'chuyện', 'việc', 'su viec'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_28', hanzi: '问', pinyin: 'wèn', meanings: ['hỏi', 'hoi', 'hỏi thăm'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_29', hanzi: '走', pinyin: 'zǒu', meanings: ['đi', 'bước đi', 'di', 'di bo'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_30', hanzi: '进', pinyin: 'jìn', meanings: ['vào', 'tiến vào', 'vao'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_31', hanzi: '出', pinyin: 'chū', meanings: ['ra', 'xuất', 'ra ngoài'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_32', hanzi: '穿', pinyin: 'chuān', meanings: ['mặc', 'đi giày', 'mac', 'mac ao'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_33', hanzi: '洗', pinyin: 'xǐ', meanings: ['rửa', 'giặt', 'tắm', 'rua', 'giat'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_34', hanzi: '快乐', pinyin: 'kuàilè', meanings: ['vui vẻ', 'hạnh phúc', 'vui ve', 'hanh phuc'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_35', hanzi: '希望', pinyin: 'xīwàng', meanings: ['hy vọng', 'mong muốn', 'hy vong', 'mong doi'], category: 'hsk-2', categoryLabel: 'HSK 2' },

    // ==================== HSK 3 (35 TỪ) ====================
    { id: 'h3_1', hanzi: '打算', pinyin: 'dǎsuàn', meanings: ['dự định', 'kế hoạch', 'du dinh', 'tính'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_2', hanzi: '容易', pinyin: 'róngyì', meanings: ['dễ', 'dễ dàng', 'de', 'de dang', 'đơn giản'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_3', hanzi: '满意', pinyin: 'mǎnyì', meanings: ['hài lòng', 'thỏa mãn', 'hai long', 'vừa lòng'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_4', hanzi: '经理', pinyin: 'jīnglǐ', meanings: ['giám đốc', 'quản lý', 'kinh lý', 'quan ly', 'giam doc'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_5', hanzi: '解决', pinyin: 'jiějué', meanings: ['giải quyết', 'giai quyet', 'xử lý'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_6', hanzi: '努力', pinyin: 'nǔlì', meanings: ['nỗ lực', 'cố gắng', 'cham chi', 'chăm chỉ', 'no luc', 'co gang'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_7', hanzi: '相信', pinyin: 'xiāngxìn', meanings: ['tin tưởng', 'tin', 'tin tuong'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_8', hanzi: '习惯', pinyin: 'xíguàn', meanings: ['thói quen', 'tập quán', 'thoi quen', 'quen'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_9', hanzi: '检查', pinyin: 'jiǎnchá', meanings: ['kiểm tra', 'kiem tra', 'xem xet'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_10', hanzi: '环境', pinyin: 'huánjìng', meanings: ['môi trường', 'hoàn cảnh', 'moi truong'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_11', hanzi: '成功', pinyin: 'chénggōng', meanings: ['thành công', 'thanh cong'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_12', hanzi: '机会', pinyin: 'jīhuì', meanings: ['cơ hội', 'dịp', 'co hoi'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_13', hanzi: '变化', pinyin: 'biànhuà', meanings: ['thay đổi', 'biến hóa', 'biến đổi', 'thay doi'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_14', hanzi: '参加', pinyin: 'cānjiā', meanings: ['tham gia', 'tham dự', 'tham gia vao'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_15', hanzi: '决定', pinyin: 'juédìng', meanings: ['quyết định', 'quyet dinh'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_16', hanzi: '了解', pinyin: 'liǎojiě', meanings: ['tìm hiểu', 'hiểu rõ', 'nắm bắt', 'hieu ro'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_17', hanzi: '清楚', pinyin: 'qīngchu', meanings: ['rõ ràng', 'sáng tỏ', 'ro rang'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_18', hanzi: '简单', pinyin: 'jiǎndān', meanings: ['đơn giản', 'giản dị', 'don gian'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_19', hanzi: '热情', pinyin: 'rèqíng', meanings: ['nhiệt tình', 'nhiệt huyết', 'nhiet tinh'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_20', hanzi: '认真', pinyin: 'rènzhēn', meanings: ['nghiêm túc', 'chăm chỉ', 'cẩn thận', 'nghiem tuc'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_21', hanzi: '聪明', pinyin: 'cōngming', meanings: ['thông minh', 'sáng dạ', 'thong minh'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_22', hanzi: '舒服', pinyin: 'shūfu', meanings: ['thoải mái', 'dễ chịu', 'thoai mai', 'de chiu'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_23', hanzi: '照顾', pinyin: 'zhàogù', meanings: ['chăm sóc', 'chiếu cố', 'cham soc'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_24', hanzi: '比较', pinyin: 'bǐjiào', meanings: ['so sánh', 'tương đối', 'khá', 'so sanh'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_25', hanzi: '方便', pinyin: 'fāngbiàn', meanings: ['thuận tiện', 'tiện lợi', 'thuan tien'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_26', hanzi: '礼物', pinyin: 'lǐwù', meanings: ['quà tặng', 'món quà', 'quà', 'qua tang'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_27', hanzi: '银行', pinyin: 'yínháng', meanings: ['ngân hàng', 'ngan hang'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_28', hanzi: '会议', pinyin: 'huìyì', meanings: ['cuộc họp', 'hội nghị', 'cuoc hop'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_29', hanzi: '同事', pinyin: 'tóngshì', meanings: ['đồng nghiệp', 'dong nghiep'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_30', hanzi: '迟到', pinyin: 'chídào', meanings: ['đến muộn', 'đi trễ', 'muộn', 'di tre', 'den muon'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_31', hanzi: '请假', pinyin: 'qǐngjià', meanings: ['xin nghỉ', 'xin phép nghỉ', 'xin nghi'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_32', hanzi: '愿意', pinyin: 'yuànyì', meanings: ['bằng lòng', 'sẵn lòng', 'muốn', 'bang long'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_33', hanzi: '影响', pinyin: 'yǐngxiǎng', meanings: ['ảnh hưởng', 'tác động', 'anh huong'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_34', hanzi: '放心', pinyin: 'fàngxīn', meanings: ['yên tâm', 'an tâm', 'yen tam'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_35', hanzi: '提高', pinyin: 'tígāo', meanings: ['nâng cao', 'cải thiện', 'nang cao'], category: 'hsk-3', categoryLabel: 'HSK 3' },

    // ==================== CÔNG XƯỞNG / NHÀ MÁY (35 TỪ) ====================
    { id: 'cx_1', hanzi: '工厂', pinyin: 'gōngchǎng', meanings: ['nhà máy', 'nhà xưởng', 'xưởng', 'công xưởng', 'nha may'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_2', hanzi: '车间', pinyin: 'chējiān', meanings: ['phân xưởng', 'xưởng', 'phan xuong', 'chuyền'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_3', hanzi: '主管', pinyin: 'zhǔguǎn', meanings: ['quản lý', 'chủ quản', 'quan ly', 'chu quan', 'sếp'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_4', hanzi: '组长', pinyin: 'zǔzhǎng', meanings: ['tổ trưởng', 'to truong', 'trưởng nhóm'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_5', hanzi: '安全', pinyin: 'ānquán', meanings: ['an toàn', 'an toan'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_6', hanzi: '质量', pinyin: 'zhìliàng', meanings: ['chất lượng', 'chat luong'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_7', hanzi: '产量', pinyin: 'chǎnliàng', meanings: ['sản lượng', 'san luong'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_8', hanzi: '机器', pinyin: 'jīqì', meanings: ['máy móc', 'máy', 'may moc', 'may'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_9', hanzi: '零件', pinyin: 'língjiàn', meanings: ['linh kiện', 'phụ tùng', 'linh kien', 'chi tiết'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_10', hanzi: '仓库', pinyin: 'cāngkù', meanings: ['kho', 'nhà kho', 'kho hàng', 'cang cu'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_11', hanzi: '加班', pinyin: 'jiābān', meanings: ['tăng ca', 'làm thêm giờ', 'làm thêm', 'tang ca'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_12', hanzi: '上班', pinyin: 'shàngbān', meanings: ['đi làm', 'vào ca', 'di lam', 'vao ca'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_13', hanzi: '下班', pinyin: 'xiàbān', meanings: ['tan làm', 'tan ca', 'hết giờ', 'tan lam', 'tan ca'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_14', hanzi: '夜班', pinyin: 'yèbān', meanings: ['ca đêm', 'ca tối', 'ca dem', 'lam dem'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_15', hanzi: '白班', pinyin: 'báibān', meanings: ['ca ngày', 'ca sáng', 'ca ngay'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_16', hanzi: '产品', pinyin: 'chǎnpǐn', meanings: ['sản phẩm', 'hàng hóa', 'san pham'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_17', hanzi: '包装', pinyin: 'bāozhuāng', meanings: ['đóng gói', 'bao bì', 'dong goi'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_18', hanzi: '不良品', pinyin: 'bùliángpǐn', meanings: ['phế phẩm', 'hàng lỗi', 'hàng hỏng', 'phe pham', 'hang loi'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_19', hanzi: '合格', pinyin: 'hégé', meanings: ['đạt tiêu chuẩn', 'hợp cách', 'đạt', 'dat'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_20', hanzi: '维修', pinyin: 'wéixiū', meanings: ['sửa chữa', 'bảo trì', 'bảo dưỡng', 'sua chua'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_21', hanzi: '工具', pinyin: 'gōngjù', meanings: ['công cụ', 'dụng cụ', 'cong cu', 'dung cu'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_22', hanzi: '模具', pinyin: 'mújù', meanings: ['khuôn mẫu', 'khuôn', 'khuon mau'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_23', hanzi: '原料', pinyin: 'yuánliào', meanings: ['nguyên liệu', 'vật liệu', 'nguyen lieu'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_24', hanzi: '操作', pinyin: 'cāozuò', meanings: ['thao tác', 'vận hành', 'thao tac'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_25', hanzi: '手套', pinyin: 'shǒutào', meanings: ['găng tay', 'bao tay', 'gang tay'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_26', hanzi: '口罩', pinyin: 'kǒuzhào', meanings: ['khẩu trang', 'khau trang'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_27', hanzi: '安全帽', pinyin: 'ānquánmào', meanings: ['mũ bảo hộ', 'nón bảo hộ', 'mu bao ho'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_28', hanzi: '工资', pinyin: 'gōngzī', meanings: ['tiền lương', 'lương', 'tien luong', 'luong'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_29', hanzi: '奖金', pinyin: 'jiǎngjīn', meanings: ['tiền thưởng', 'thưởng', 'tien thuong'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_30', hanzi: '罚款', pinyin: 'fákuǎn', meanings: ['phạt tiền', 'phạt', 'phat tien'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_31', hanzi: '生产', pinyin: 'shēngchǎn', meanings: ['sản xuất', 'san xuat'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_32', hanzi: '交货', pinyin: 'jiāohuò', meanings: ['giao hàng', 'xuất hàng', 'giao hang'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_33', hanzi: '盘点', pinyin: 'pándiǎn', meanings: ['kiểm kê', 'đếm hàng', 'kiem ke'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_34', hanzi: '标准', pinyin: 'biāozhǔn', meanings: ['tiêu chuẩn', 'chuẩn', 'tieu chuan'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_35', hanzi: '按时', pinyin: 'ànshí', meanings: ['đúng giờ', 'dung gio'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
];

const ALL_VOCAB_DATABASE: WordItem[] = [
    ...VOCAB_DATABASE,
    ...(ALL_HSK_EXTRA_VOCAB as WordItem[]),
    ...(FACTORY_EXTRA_VOCAB as WordItem[]),
    ...(GARMENT_VOCAB_DATABASE as WordItem[]),
    ...(BUOI_1_VOCAB as WordItem[]),
    ...(ALL_LIVING_VOCAB as WordItem[]),
];

function removeVietnameseAccents(str: string): string {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
}

function cleanInput(str: string): string {
    return str
        .toLowerCase()
        .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'!]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

// Bộ tạo âm thanh chuẩn Web Audio API (Offline, không cần MP3 ngoài)
class SoundEffects {
    ctx: AudioContext | null = null;
    enabled: boolean = true;

    init() {
        if (!this.ctx && typeof window !== 'undefined') {
            const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {});
        }
    }

    playTap() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
            osc.start(now);
            osc.stop(now + 0.05);
        } catch {}
    }

    playCorrect() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        // Chime: C5 -> E5 -> G5
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

        osc.start(now);
        osc.stop(now + 0.45);
    }

    playDissolve() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.3);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.start(now);
        osc.stop(now + 0.35);
    }

    playWrong() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.setValueAtTime(130, now + 0.12);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        osc.start(now);
        osc.stop(now + 0.3);
    }

    playWin() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + i * 0.1);
            gain.gain.setValueAtTime(0.2, now + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.4);
            osc.start(now + i * 0.1);
            osc.stop(now + i * 0.1 + 0.4);
        });
    }

    playTimeOver() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'square';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.setValueAtTime(165, now + 0.2);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        osc.start(now);
        osc.stop(now + 0.5);
    }
}

const sfx = new SoundEffects();

// Haptic feedback nhẹ cho mobile
function triggerHaptic(pattern: number | number[] = 15) {
    if (typeof window !== 'undefined' && 'navigator' in window && typeof window.navigator.vibrate === 'function') {
        try {
            window.navigator.vibrate(pattern);
        } catch {}
    }
}

function speakChinese(text: string) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
        window.speechSynthesis.cancel();
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
        }
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-CN';
        utterance.rate = 0.80; // Tốc độ chuẩn cho người học nghe rõ thanh điệu
        utterance.pitch = 1.0;

        const voices = window.speechSynthesis.getVoices();
        const zhVoice = voices.find(v => v.lang === 'zh-CN' || v.lang === 'zh_CN' || v.lang === 'cmn-Hans-CN') ||
            voices.find(v => v.name.includes('Ting-Ting') || v.name.includes('Yaoyao') || v.name.includes('Huihui') || v.name.includes('Chinese')) ||
            voices.find(v => v.lang.startsWith('zh') || v.lang.includes('cmn'));
        if (zhVoice) {
            utterance.voice = zhVoice;
        }

        setTimeout(() => {
            if (typeof window !== 'undefined' && window.speechSynthesis) {
                window.speechSynthesis.speak(utterance);
            }
        }, 30);
    } catch {
        // Fallback
    }
}

function stopChineseSpeech() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
        try {
            window.speechSynthesis.cancel();
        } catch {}
    }
}

// Component GameInput: Tách biệt hoàn toàn việc nhập phím với bộ đếm giờ của cha
// Đảm bảo gõ tiếng Việt Telex / VNI / Unikey 100% mượt mà, giữ vững bàn phím không sập
interface GameInputProps {
    isLocked?: boolean;
    feedbackMessage: string | null;
    currentWordId: string;
    isCompact?: boolean;
    onCheckAnswer: (text: string, isExplicitSubmit: boolean) => void;
    onClearFeedback: () => void;
}

function GameInput({
    isLocked = false,
    feedbackMessage,
    currentWordId,
    isCompact = false,
    onCheckAnswer,
    onClearFeedback,
}: GameInputProps) {
    const [val, setVal] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const isComposingRef = useRef(false);

    // Khi chuyển sang từ mới: Xóa ô gõ, xóa lỗi và giữ nguyên focus bàn phím
    useEffect(() => {
        setVal('');
        onClearFeedback();
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [currentWordId]);

    // Tự động focus input khi không bị khóa animation
    useEffect(() => {
        if (!isLocked && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isLocked]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isLocked) return;
        const value = e.target.value;
        setVal(value);
        if (feedbackMessage) onClearFeedback();

        // Chỉ tự động kiểm tra khi người dùng không trong quá trình gõ dấu Telex (Composition)
        if (!isComposingRef.current) {
            onCheckAnswer(value, false);
        }
    };

    const handleCompositionStart = () => {
        isComposingRef.current = true;
    };

    const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
        isComposingRef.current = false;
        if (isLocked) return;
        const finalVal = e.currentTarget.value;
        setVal(finalVal);
        onCheckAnswer(finalVal, false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLocked) return;
        onCheckAnswer(val, true);
        // Duy trì bàn phím mở trên điện thoại, không để bị giật đóng mở
        inputRef.current?.focus();
    };

    return (
        <form onSubmit={handleSubmit} className={isCompact ? "space-y-1" : "space-y-2 sm:space-y-3"}>
            {!isCompact && (
                <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[var(--muted)] text-center">
                    Gõ nghĩa tiếng Việt vào đây (nhấn Enter hoặc bấm Gửi):
                </label>
            )}
            <div className="flex gap-1.5 sm:gap-2">
                <input
                    ref={inputRef}
                    type="text"
                    readOnly={isLocked}
                    value={val}
                    onChange={handleChange}
                    onCompositionStart={handleCompositionStart}
                    onCompositionEnd={handleCompositionEnd}
                    placeholder={isCompact ? "Gõ nghĩa tiếng Việt rồi bấm Gửi..." : "Ví dụ: xin chào, cảm ơn, trà..."}
                    className={`w-full px-3 py-2.5 sm:px-5 sm:py-3.5 text-center rounded-xl sm:rounded-2xl border-2 bg-white/90 text-base sm:text-xl font-bold text-[var(--text)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:ring-4 focus:ring-[var(--accent)]/20 transition-all shadow-inner touch-manipulation ${
                        feedbackMessage?.startsWith('❌')
                            ? 'border-rose-400 bg-rose-50/60'
                            : feedbackMessage?.startsWith('⚠️')
                            ? 'border-amber-400 bg-amber-50/60'
                            : 'border-[var(--border)] focus:border-[var(--accent)]'
                    }`}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                />
                <button
                    type="submit"
                    disabled={isLocked}
                    className="btn btn-primary px-4 sm:px-6 rounded-xl sm:rounded-2xl font-bold shrink-0 text-sm sm:text-base shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50 touch-manipulation select-none"
                >
                    <span>Gửi</span>
                    <span>→</span>
                </button>
            </div>
        </form>
    );
}

export default function GameClient() {
    const { isKeyboardOpen, viewportHeight, isFullscreen, toggleFullscreen } = useVirtualKeyboard();
    const [selectedCategory, setSelectedCategory] = useState<string>('buoi-1');
    const [selectedLesson, setSelectedLesson] = useState<string>('b1');
    const [showGarmentPicker, setShowGarmentPicker] = useState<boolean>(false);
    const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
    const [endReason, setEndReason] = useState<'completed' | 'timeout'>('completed');

    // Bộ 16 từ cho mỗi lượt chơi (Tuần tự theo bài học hoặc ngẫu nhiên)
    const [roundWords, setRoundWords] = useState<WordItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Đồng hồ đếm ngược đúng 1 phút (60 giây) cho cả lượt chơi
    const [totalTimeLeft, setTotalTimeLeft] = useState<number>(ROUND_TIME_LIMIT);

    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [bestScore, setBestScore] = useState<number>(() => {
        if (typeof window === 'undefined') return 0;
        try {
            const saved = localStorage.getItem('hsk_game_highscore_16');
            return saved ? parseInt(saved, 10) : 0;
        } catch {
            return 0;
        }
    });
    const [showPinyin, setShowPinyin] = useState(true);
    const [soundOn, setSoundOn] = useState(true);
    const [autoVoice, setAutoVoice] = useState(true);
    const [isDissolving, setIsDissolving] = useState(false);
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; size: number }>>([]);
    const [wrongShake, setWrongShake] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
    const [showHint, setShowHint] = useState(false);
    const [isRevealingWrong, setIsRevealingWrong] = useState(false);
    const [revealedAnswer, setRevealedAnswer] = useState<{
        typed: string;
        correctMeaning: string;
        isSkip?: boolean;
    } | null>(null);

    // Lịch sử kết quả cho từng từ trong 16 từ
    const [history, setHistory] = useState<Array<{
        hanzi: string;
        pinyin: string;
        meaning: string;
        correct: boolean;
        example?: {
            hanzi: string;
            vietnamese: string;
            grammarNote?: string;
        };
    }>>([]);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Từ hiện tại đang hiển thị
    const currentWord = roundWords[currentIndex] || null;

    // Bắt đầu lượt chơi mới (16 từ) - 1 Chạm Chơi Ngay
    const startGame = (targetCategory?: string, targetLesson?: string) => {
        sfx.init();
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            try {
                if (window.speechSynthesis.paused) {
                    window.speechSynthesis.resume();
                }
            } catch {}
        }
        const activeCategory = targetCategory || selectedCategory;
        const activeLesson = targetLesson !== undefined ? targetLesson : selectedLesson;
        if (targetCategory) setSelectedCategory(targetCategory);
        if (targetLesson !== undefined) setSelectedLesson(targetLesson);

        let selected16: WordItem[] = [];

        if (activeCategory === 'buoi-1') {
            // Lấy 16 từ Buổi 1 THEO ĐÚNG THỨ TỰ TỪ TRÊN XUỐNG DƯỚI (Phần A -> Phần B -> Phần C)
            const buoi1Pool = ALL_VOCAB_DATABASE.filter(w => w.category === 'buoi-1');
            selected16 = buoi1Pool.slice(0, TOTAL_ROUND_WORDS);
        } else if (activeCategory === 'buoi-1-phong-o') {
            // Lấy 16 từ Buổi 1 Phòng ở & Xưởng
            const roomPool = ALL_VOCAB_DATABASE.filter(w => w.category === 'buoi-1-phong-o');
            selected16 = roomPool.slice(0, TOTAL_ROUND_WORDS);
        } else if (activeCategory === 'buoi-2-ktx') {
            // Lấy 16 từ Buổi 2 Ký túc xá & Đồ dùng sinh hoạt
            const dormPool = ALL_VOCAB_DATABASE.filter(w => w.category === 'buoi-2-ktx');
            selected16 = dormPool.slice(0, TOTAL_ROUND_WORDS);
        } else if (activeCategory === 'buoi-3-bep') {
            // Lấy 16 từ Buổi 3 Bếp núc & Thời gian
            const kitchenPool = ALL_VOCAB_DATABASE.filter(w => w.category === 'buoi-3-bep');
            selected16 = kitchenPool.slice(0, TOTAL_ROUND_WORDS);
        } else if (activeCategory === 'buoi-4-trang-phuc') {
            // Lấy 16 từ Buổi 4 Trang phục hàng ngày & Ngày tháng
            const clothingPool = ALL_VOCAB_DATABASE.filter(w => w.category === 'buoi-4-trang-phuc');
            selected16 = clothingPool.slice(0, TOTAL_ROUND_WORDS);
        } else if (activeCategory === 'may-mac' && activeLesson !== 'all') {
            // Lấy 16 từ của bài đã chọn THEO ĐÚNG THỨ TỰ TỪ TRÊN XUỐNG DƯỚI (Không xáo trộn)
            const lessonPool = ALL_VOCAB_DATABASE.filter(w => w.category === 'may-mac' && w.lesson === activeLesson);
            selected16 = lessonPool.slice(0, TOTAL_ROUND_WORDS);
        } else {
            const pool = activeCategory === 'all'
                ? ALL_VOCAB_DATABASE
                : ALL_VOCAB_DATABASE.filter(w => w.category === activeCategory);
            const shuffled = [...pool].sort(() => Math.random() - 0.5);
            selected16 = shuffled.slice(0, TOTAL_ROUND_WORDS);
        }

        setRoundWords(selected16);
        setCurrentIndex(0);
        setTotalTimeLeft(ROUND_TIME_LIMIT);
        setScore(0);
        setStreak(0);
        setHistory([]);
        setFeedbackMessage(null);
        setShowHint(false);
        setIsRevealingWrong(false);
        setRevealedAnswer(null);
        setIsDissolving(false);
        setParticles([]);
        setGameState('playing');

        if (autoVoice && selected16[0]) {
            setTimeout(() => speakChinese(selected16[0].hanzi), 300);
        }
    };

    // Kết thúc lượt chơi
    const endGame = useCallback((reason: 'completed' | 'timeout') => {
        if (timerRef.current) clearInterval(timerRef.current);
        setEndReason(reason);
        setGameState('gameover');

        if (reason === 'completed') {
            sfx.playWin();
        } else {
            sfx.playTimeOver();
        }

        setScore(currentScore => {
            setBestScore(prevBest => {
                if (currentScore > prevBest) {
                    localStorage.setItem('hsk_game_highscore_16', currentScore.toString());
                    return currentScore;
                }
                return prevBest;
            });
            return currentScore;
        });
    }, []);

    // Hiệu ứng hạt nổ tan biến chữ Hán khi trả lời đúng
    const triggerDissolve = (onComplete: () => void) => {
        setIsDissolving(true);
        triggerHaptic([25, 40, 30]);
        sfx.playDissolve();
        sfx.playCorrect();

        const newParticles = [];
        const colors = ['#c0392b', '#f39c12', '#e74c3c', '#f1c40f', '#ffffff', '#2ecc71'];
        for (let i = 0; i < 28; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = 60 + Math.random() * 120;
            newParticles.push({
                id: i,
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: 6 + Math.random() * 10,
            });
        }
        setParticles(newParticles);

        setTimeout(() => {
            setIsDissolving(false);
            setParticles([]);
            onComplete();
        }, 550);
    };

    // Chuyển sang câu tiếp theo
    const moveToNextWord = useCallback((wasCorrect: boolean) => {
        if (!currentWord) return;

        setHistory(prev => [
            ...prev,
            {
                hanzi: currentWord.hanzi,
                pinyin: currentWord.pinyin,
                meaning: currentWord.meanings[0],
                correct: wasCorrect,
                example: currentWord.exampleSentence ? {
                    hanzi: currentWord.exampleSentence.hanzi,
                    vietnamese: currentWord.exampleSentence.vietnamese,
                    grammarNote: currentWord.exampleSentence.grammarNote,
                } : undefined,
            },
        ]);

        setFeedbackMessage(null);
        setShowHint(false);

        const nextIdx = currentIndex + 1;
        if (nextIdx >= roundWords.length) {
            // Đã hoàn thành toàn bộ 16 từ!
            endGame('completed');
        } else {
            setCurrentIndex(nextIdx);
            if (autoVoice && roundWords[nextIdx]) {
                setTimeout(() => speakChinese(roundWords[nextIdx].hanzi), 200);
            }
        }
    }, [currentWord, currentIndex, roundWords, autoVoice, endGame]);

    // Kiểm tra đáp án
    const checkAnswer = (text: string, isExplicitSubmit: boolean = false) => {
        if (!currentWord || isDissolving || gameState !== 'playing') return;

        const cleanTyped = cleanInput(text);
        if (!cleanTyped) {
            if (isExplicitSubmit) {
                setFeedbackMessage('⚠️ Vui lòng nhập nghĩa tiếng Việt trước khi bấm Gửi!');
                setWrongShake(true);
                setTimeout(() => setWrongShake(false), 500);
            }
            return;
        }

        const unaccentedTyped = removeVietnameseAccents(cleanTyped);

        const isMatch = currentWord.meanings.some(m => {
            const cleanMeaning = cleanInput(m);
            const unaccentedMeaning = removeVietnameseAccents(cleanMeaning);
            return cleanTyped === cleanMeaning || unaccentedTyped === unaccentedMeaning;
        });

        if (isMatch) {
            // Trả lời chính xác!
            setFeedbackMessage(null);
            setShowHint(false);

            // Điểm thưởng theo tốc độ và chuỗi combo
            const timeBonus = Math.max(1, Math.floor(totalTimeLeft / 6));
            const multiplier = streak >= 5 ? 3 : streak >= 2 ? 2 : 1;
            const pointsEarned = (10 + timeBonus) * multiplier;

            setScore(prev => prev + pointsEarned);
            setStreak(prev => prev + 1);

            triggerDissolve(() => {
                moveToNextWord(true);
            });
        } else if (isExplicitSubmit) {
            // Khi bấm Gửi hoặc nhấn Enter nhưng đáp án chưa đúng:
            // Rung lắc cảnh báo và hiện thông báo lỗi, cho phép người dùng sửa lại hoặc bấm Gợi ý / Bỏ qua
            triggerHaptic(40);
            sfx.playWrong();
            setWrongShake(true);
            setTimeout(() => setWrongShake(false), 500);
            setFeedbackMessage('❌ Chưa chính xác, hãy thử lại hoặc bấm Gợi ý / Bỏ qua!');
        }
    };

    // Bỏ qua từ hiện tại -> Hiện đáp án đúng và ghi nhận sai
    const handleSkip = () => {
        if (!currentWord || isDissolving || isRevealingWrong || gameState !== 'playing') return;
        triggerHaptic(30);
        sfx.playWrong();
        setStreak(0);
        setWrongShake(true);
        setTimeout(() => setWrongShake(false), 500);

        setIsRevealingWrong(true);
        setRevealedAnswer({
            typed: '',
            correctMeaning: currentWord.meanings[0],
            isSkip: true,
        });

        // Ghi nhận sai
        setHistory(prev => [
            ...prev,
            {
                hanzi: currentWord.hanzi,
                pinyin: currentWord.pinyin,
                meaning: currentWord.meanings[0],
                correct: false,
                example: currentWord.exampleSentence ? {
                    hanzi: currentWord.exampleSentence.hanzi,
                    vietnamese: currentWord.exampleSentence.vietnamese,
                    grammarNote: currentWord.exampleSentence.grammarNote,
                } : undefined,
            },
        ]);

        setTimeout(() => {
            setIsRevealingWrong(false);
            setRevealedAnswer(null);
            setFeedbackMessage(null);
            setShowHint(false);

            const nextIdx = currentIndex + 1;
            if (nextIdx >= roundWords.length) {
                endGame('completed');
            } else {
                setCurrentIndex(nextIdx);
                if (autoVoice && roundWords[nextIdx]) {
                    setTimeout(() => speakChinese(roundWords[nextIdx].hanzi), 200);
                }
            }
        }, 1500);
    };

    // Bộ đếm thời gian 60 giây (1 phút) cho cả lượt chơi
    useEffect(() => {
        if (gameState !== 'playing') {
            if (timerRef.current) clearInterval(timerRef.current);
            return;
        }

        timerRef.current = setInterval(() => {
            setTotalTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current!);
                    endGame('timeout');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [gameState, endGame]);

    // Bật/tắt âm thanh hiệu ứng
    const toggleSound = () => {
        setSoundOn(prev => {
            sfx.enabled = !prev;
            return !prev;
        });
    };

    const timeSpent = ROUND_TIME_LIMIT - totalTimeLeft;
    const correctCount = history.filter(h => h.correct).length;

    return (
        <div className="min-h-screen py-3 sm:py-8 px-2.5 sm:px-4 relative overflow-hidden">
            {/* Background floating decor */}
            <div className="absolute top-10 left-10 text-9xl font-[family:var(--font-serif)] text-[var(--accent)]/5 select-none pointer-events-none">
                字
            </div>
            <div className="absolute bottom-10 right-10 text-9xl font-[family:var(--font-serif)] text-[var(--accent)]/5 select-none pointer-events-none">
                语
            </div>

            <div className="container-app max-w-3xl mx-auto relative z-10">
                {/* ==================== MÀN HÌNH BẮT ĐẦU ==================== */}
                {gameState === 'idle' && (
                    <>
                        {/* Header title */}
                        <div className="text-center mb-4 sm:mb-8">
                            <div className="inline-flex items-center gap-2 badge-gradient mb-2 sm:mb-3 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                <span>🎮</span> Thử Thách 16 Từ Trong 1 Phút
                            </div>
                            <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--text)] tracking-tight mb-2">
                                Từ Vựng <span className="text-gradient-accent">Tan Biến</span>
                            </h1>
                            <p className="text-xs sm:text-sm text-[var(--muted)] max-w-lg mx-auto">
                                Đúng <strong>16 từ vựng không lặp lại</strong> trong vòng <strong>60 giây</strong>. Gõ nhanh tiếng Việt chuẩn để ghi điểm combo tối đa!
                            </p>
                        </div>

                        <div className="card rounded-[1.5rem] sm:rounded-[2.5rem] p-4 sm:p-12 bg-white/40 backdrop-blur-xl border border-white/40 shadow-2xl text-center">
                        <div className="text-5xl sm:text-6xl mb-3 sm:mb-4 animate-bounce">
                            🏮
                        </div>
                        <h2 className="text-xl sm:text-3xl font-bold text-[var(--text)] mb-1 sm:mb-2">
                            Chọn Bài Học & Thử Thách
                        </h2>
                        <p className="text-xs sm:text-sm text-[var(--muted)] mb-4 sm:mb-6 max-w-md mx-auto">
                            ⚡ <strong>1-Chạm chơi ngay:</strong> Bấm vào bất kỳ thẻ bài để bắt đầu lượt đấu <strong>16 từ / 60 giây</strong>!
                        </p>

                        {/* Danh sách thẻ bài Action Cards - Bấm là chơi ngay */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3.5 mb-4 sm:mb-6">
                            {[
                                { id: 'buoi-1', label: 'Buổi 1: QC May Mặc', icon: '📋', count: '16 từ cốt lõi', highlight: true },
                                { id: 'buoi-1-phong-o', label: 'Buổi 1: Phòng Ở & Xưởng', icon: '🪑', count: '16 từ thực chiến', highlight: true },
                                { id: 'buoi-2-ktx', label: 'Buổi 2: Ký Túc Xá', icon: '🛏️', count: '16 từ KTX & Vệ sinh', highlight: true },
                                { id: 'buoi-3-bep', label: 'Buổi 3: Bếp Núc & Tuần', icon: '🍳', count: '16 từ Bếp & Thời gian', highlight: true },
                                { id: 'buoi-4-trang-phuc', label: 'Buổi 4: Trang Phục', icon: '👕', count: '16 từ Quần áo & Lịch', highlight: true },
                                { id: 'may-mac', label: '12 Bài Dệt May', icon: '🧵', count: '180+ từ (12 Bài)' },
                                { id: 'all', label: 'Tất cả chủ đề', icon: '🌟', count: '760+ từ ngẫu nhiên' },
                                { id: 'cong-xuong', label: 'Công xưởng', icon: '🏭', count: '135 từ nhà máy' },
                                { id: 'hsk-1', label: 'HSK 1 (Sơ cấp)', icon: '🎯', count: '135 từ cơ bản' },
                                { id: 'hsk-2', label: 'HSK 2 (Cơ bản)', icon: '📗', count: '135 từ thiết yếu' },
                                { id: 'hsk-3', label: 'HSK 3 (Trung cấp)', icon: '📘', count: '135 từ nâng cao' },
                            ].map(cat => {
                                const isGarment = cat.id === 'may-mac';
                                const isGarmentActive = isGarment && showGarmentPicker;

                                return (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => {
                                            sfx.playTap();
                                            triggerHaptic(15);
                                            if (isGarment) {
                                                setShowGarmentPicker(prev => !prev);
                                            } else {
                                                startGame(cat.id);
                                            }
                                        }}
                                        className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-xs sm:text-sm font-semibold transition-all flex flex-col items-center justify-between gap-1.5 cursor-pointer relative touch-manipulation select-none active:scale-95 shadow-xs hover:shadow-md hover:-translate-y-0.5 ${
                                            isGarmentActive
                                                ? 'bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-400'
                                                : cat.highlight
                                                ? 'bg-white/80 border-rose-200 hover:border-rose-400 hover:bg-rose-50/40 text-[var(--text)]'
                                                : 'bg-white/70 border-[var(--border)] hover:border-[var(--accent)] hover:bg-white text-[var(--text)]'
                                        }`}
                                    >
                                        {cat.highlight && (
                                            <span className="absolute -top-2 -right-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-rose-500 text-white shadow-xs">
                                                Mới ✨
                                            </span>
                                        )}
                                        <span className="text-2xl sm:text-3xl">{cat.icon}</span>
                                        <div className="font-bold text-center line-clamp-1 w-full">
                                            {cat.label}
                                        </div>
                                        <span className={`text-[10px] ${isGarmentActive ? 'text-white/80' : 'text-[var(--muted)]'}`}>
                                            {cat.count}
                                        </span>
                                        <div className={`mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                                            isGarmentActive
                                                ? 'bg-white/20 text-white'
                                                : isGarment
                                                ? 'bg-indigo-100 text-indigo-700'
                                                : 'bg-[var(--accent)]/10 text-[var(--accent)]'
                                        }`}>
                                            {isGarment ? (showGarmentPicker ? '▲ Đóng bài' : '📖 Chọn bài ▾') : '▶ Chơi ngay'}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Drawer / Lưới 12 Bài Dệt May khi bấm mở */}
                        {showGarmentPicker && (
                            <div className="mb-6 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-indigo-50/90 via-white/95 to-blue-50/90 border-2 border-indigo-200 shadow-lg animate-fade-in text-left">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-indigo-100">
                                    <div>
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-indigo-100 text-indigo-800 tracking-wider">
                                            <span>🧵</span> Chuyên Ngành Dệt May
                                        </div>
                                        <h3 className="text-sm sm:text-base font-extrabold text-[var(--text)] mt-1">
                                            Chọn 1 Trong 12 Bài May Mặc (Chạm vào là chơi ngay 16 từ)
                                        </h3>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            sfx.playTap();
                                            triggerHaptic(15);
                                            startGame('may-mac', 'all');
                                        }}
                                        className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs active:scale-95 transition cursor-pointer touch-manipulation self-start sm:self-auto"
                                    >
                                        🌟 Chơi ngẫu nhiên cả 12 bài
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-2.5">
                                    {GARMENT_LESSONS.map(lesson => (
                                        <button
                                            key={lesson.id}
                                            type="button"
                                            onClick={() => {
                                                sfx.playTap();
                                                triggerHaptic(15);
                                                startGame('may-mac', lesson.id);
                                            }}
                                            className="p-2.5 sm:p-3 rounded-xl bg-white hover:bg-indigo-50/60 border border-indigo-100 hover:border-indigo-400 text-left transition-all shadow-xs hover:shadow-md active:scale-95 cursor-pointer touch-manipulation flex flex-col justify-between"
                                        >
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-base sm:text-lg">{lesson.icon}</span>
                                                <span className="text-[11px] font-black text-indigo-700 uppercase">
                                                    Bài {lesson.number}
                                                </span>
                                            </div>
                                            <div className="text-xs font-bold text-gray-900 mt-1 line-clamp-1">
                                                {lesson.title}
                                            </div>
                                            <div className="flex items-center justify-between text-[10px] text-gray-500 mt-2 pt-1 border-t border-gray-100">
                                                <span>16 câu</span>
                                                <span className="text-indigo-600 font-bold">▶ Vào chơi</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {bestScore > 0 && (
                            <div className="mt-8 pt-6 border-t border-[var(--border)] text-xs text-[var(--muted)] flex items-center justify-center gap-2">
                                <span>🏆 Kỷ lục 16 từ cao nhất của bạn:</span>
                                <strong className="text-base text-[var(--accent)]">{bestScore} điểm</strong>
                            </div>
                        )}
                    </div>
                    </>
                )}

                {/* ==================== MÀN HÌNH ĐANG CHƠI (TẬN DỤNG FULL MÀN HÌNH & BÀN PHÍM) ==================== */}
                {gameState === 'playing' && currentWord && (
                    <div
                        className={`fixed inset-0 z-[100] bg-[var(--bg)] flex flex-col justify-between overflow-y-auto sm:overflow-hidden pt-safe pb-safe transition-all ${
                            isKeyboardOpen ? 'p-1.5 sm:p-3' : 'p-2.5 sm:p-6'
                        }`}
                        style={
                            isKeyboardOpen && viewportHeight > 0
                                ? { height: `${viewportHeight}px`, maxHeight: `${viewportHeight}px` }
                                : undefined
                        }
                    >
                        <div className="max-w-2xl w-full mx-auto flex-1 flex flex-col justify-between min-h-0">
                            {/* Thanh tiến độ 16 từ và đồng hồ 60 giây */}
                            <div className={`card bg-white/60 backdrop-blur-xl border border-white/60 shadow-md transition-all ${
                                isKeyboardOpen ? 'p-2 rounded-xl mb-1 space-y-1' : 'p-3 sm:p-5 rounded-2xl mb-2 sm:mb-4 space-y-2 sm:space-y-3'
                            }`}>
                                <div className="flex items-center justify-between gap-2 sm:gap-4">
                                    {/* Nút thoát & Tiến độ câu */}
                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                triggerHaptic(10);
                                                stopChineseSpeech();
                                                setGameState('idle');
                                            }}
                                            className="px-2 py-1 rounded-lg text-xs font-bold text-[var(--muted)] hover:text-rose-600 bg-black/5 hover:bg-black/10 transition cursor-pointer touch-manipulation"
                                            title="Thoát ván chơi về màn hình chọn"
                                        >
                                            ✕ Thoát
                                        </button>
                                        <span className="text-xs sm:text-sm font-extrabold text-[var(--text)] whitespace-nowrap">
                                            #{currentIndex + 1} / {TOTAL_ROUND_WORDS}
                                        </span>
                                    </div>

                                    {/* Điểm và Combo */}
                                    <div className="text-center flex items-center gap-2">
                                        <span className="text-base sm:text-2xl font-black text-[var(--accent)]">
                                            {score} đ
                                        </span>
                                        {streak >= 2 && (
                                            <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-full animate-pulse whitespace-nowrap">
                                                🔥x{streak >= 5 ? 3 : 2}
                                            </span>
                                        )}
                                    </div>

                                    {/* Đồng hồ đếm ngược & Nút toàn màn hình */}
                                    <div className="flex items-center gap-1.5">
                                        <div className={`px-2.5 py-1 sm:px-3 sm:py-1 rounded-xl border text-xs sm:text-sm font-black flex items-center gap-1 shadow-xs transition-all ${
                                            totalTimeLeft <= 15
                                                ? 'bg-rose-50 text-rose-600 border-rose-300 animate-bounce'
                                                : totalTimeLeft <= 30
                                                ? 'bg-amber-50 text-amber-700 border-amber-300'
                                                : 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                        }`}>
                                            <span>⏱️</span>
                                            <span>{totalTimeLeft}s</span>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={toggleSound}
                                            title={soundOn ? 'Tắt âm thanh hiệu ứng' : 'Bật âm thanh hiệu ứng'}
                                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/70 border border-[var(--border)] flex items-center justify-center text-xs hover:bg-white transition cursor-pointer"
                                        >
                                            {soundOn ? '🔔' : '🔕'}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={toggleFullscreen}
                                            title={isFullscreen ? 'Thu nhỏ cửa sổ' : 'Bật toàn màn hình'}
                                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/70 border border-[var(--border)] flex items-center justify-center text-xs hover:bg-white transition cursor-pointer hidden sm:flex"
                                        >
                                            {isFullscreen ? '⤓' : '⛶'}
                                        </button>
                                    </div>
                                </div>

                                {/* 16 vạch chỉ số cho 16 từ (Ẩn khi bàn phím mở để tiết kiệm tối đa diện tích) */}
                                {!isKeyboardOpen && (
                                    <div className="flex items-center gap-1 pt-0.5">
                                        {roundWords.map((_, idx) => {
                                            const hist = history[idx];
                                            return (
                                                <div
                                                    key={idx}
                                                    className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
                                                        idx === currentIndex
                                                            ? 'bg-[var(--accent)] ring-2 ring-[var(--accent)]/40 scale-y-125'
                                                            : hist?.correct
                                                            ? 'bg-emerald-500'
                                                            : hist && !hist.correct
                                                            ? 'bg-rose-400'
                                                            : 'bg-gray-200'
                                                    }`}
                                                    title={`Câu ${idx + 1}`}
                                                />
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Thẻ hiển thị chữ Hán trung tâm (Co giãn thông minh khi bàn phím mở) */}
                            <div
                                className={`card relative rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center bg-white/55 backdrop-blur-2xl border border-white/60 shadow-xl transition-all duration-300 ${
                                    isKeyboardOpen
                                        ? 'min-h-[85px] sm:min-h-[110px] p-2 my-0.5'
                                        : 'min-h-[180px] sm:min-h-[260px] p-4 sm:p-7 my-2 flex-1'
                                } ${wrongShake ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
                            >
                                {/* Category badge */}
                                {!isKeyboardOpen && (
                                    <div className="absolute top-2.5 left-3 sm:top-4 sm:left-5 flex items-center gap-1.5">
                                        <span className="badge-gradient text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-bold">
                                            {currentWord.categoryLabel}
                                        </span>
                                    </div>
                                )}

                                {/* Hạt nổ tan biến khi đúng */}
                                {particles.map(p => (
                                    <span
                                        key={p.id}
                                        className="absolute rounded-full pointer-events-none transition-all duration-500 ease-out z-20"
                                        style={{
                                            width: `${p.size}px`,
                                            height: `${p.size}px`,
                                            backgroundColor: p.color,
                                            transform: `translate(${p.x}px, ${p.y}px) scale(0)`,
                                            opacity: isDissolving ? 0.9 : 0,
                                            boxShadow: `0 0 10px ${p.color}`,
                                        }}
                                    />
                                ))}

                                {/* Chữ Hán & Pinyin */}
                                <div
                                    className={`transition-all duration-300 select-none text-center ${
                                        isDissolving
                                            ? 'scale-150 blur-lg opacity-0 rotate-6 filter'
                                            : 'scale-100 blur-0 opacity-100'
                                    }`}
                                >
                                    <div className={`font-[family:var(--font-serif)] font-extrabold text-[var(--accent)] tracking-wider drop-shadow-sm transition-all ${
                                        isKeyboardOpen ? 'text-3xl sm:text-5xl leading-tight' : 'text-5xl sm:text-7xl mb-1 sm:mb-2'
                                    }`}>
                                        {currentWord.hanzi}
                                    </div>

                                    {showPinyin && (
                                        <div className={`font-medium text-[var(--muted)] tracking-wide transition-all ${
                                            isKeyboardOpen ? 'text-xs sm:text-base mb-0.5' : 'text-sm sm:text-xl mb-1.5 sm:mb-2.5'
                                        }`}>
                                            [{currentWord.pinyin}]
                                        </div>
                                    )}

                                    {!isKeyboardOpen && (
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                triggerHaptic(10);
                                                speakChinese(currentWord.hanzi);
                                            }}
                                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/80 hover:bg-white text-[11px] font-bold text-[var(--accent)] border border-[var(--border)] shadow-xs hover:scale-105 active:scale-95 transition cursor-pointer touch-manipulation select-none"
                                            title="Nghe phát âm chuẩn tiếng Trung"
                                        >
                                            <span>🔊</span> Nghe phát âm
                                        </button>
                                    )}
                                </div>

                                {isDissolving && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                                        <span className="text-xl sm:text-3xl font-extrabold text-emerald-600 bg-white/95 px-5 py-1.5 rounded-xl shadow-xl animate-bounce">
                                            ✨ CHÍNH XÁC!
                                        </span>
                                    </div>
                                )}

                                {/* Hiển thị kết quả đáp án đúng khi bấm sai */}
                                {isRevealingWrong && revealedAnswer && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-rose-950/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-5 text-white z-30 animate-fade-in text-center select-none shadow-2xl border-2 border-rose-500/50">
                                        <div className="text-2xl sm:text-3xl mb-0.5">
                                            ❌
                                        </div>
                                        <div className="text-sm sm:text-lg font-black text-rose-200 tracking-wide uppercase">
                                            {revealedAnswer.isSkip ? 'ĐÃ BỎ QUA CÂU NÀY' : 'CHƯA CHÍNH XÁC!'}
                                        </div>
                                        <div className="mt-1 py-1 px-3 bg-white/15 rounded-xl border border-white/25">
                                            <div className="text-[10px] uppercase text-amber-300 font-extrabold">
                                                Đáp án đúng là:
                                            </div>
                                            <div className="text-base sm:text-xl font-extrabold text-white">
                                                {revealedAnswer.correctMeaning}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Ô nhập nghĩa tiếng Việt độc lập */}
                            <div className={`card bg-white/50 backdrop-blur-xl border border-white/50 shadow-lg transition-all ${
                                isKeyboardOpen ? 'p-2 my-0.5 rounded-xl' : 'p-3 sm:p-5 my-2 rounded-2xl'
                            } ${wrongShake ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
                                <GameInput
                                    isLocked={isDissolving || isRevealingWrong}
                                    feedbackMessage={feedbackMessage}
                                    currentWordId={currentWord.id}
                                    isCompact={isKeyboardOpen}
                                    onCheckAnswer={checkAnswer}
                                    onClearFeedback={() => setFeedbackMessage(null)}
                                />

                                {/* Cảnh báo kết quả sai hoặc hướng dẫn */}
                                {feedbackMessage && (
                                    <div className="mt-1.5 text-center text-xs font-semibold text-rose-600 bg-rose-50/90 py-1.5 px-3 rounded-lg border border-rose-200 animate-fade-in flex items-center justify-center gap-1">
                                        <span>{feedbackMessage}</span>
                                    </div>
                                )}

                                {/* Khối gợi ý */}
                                {showHint && currentWord && (
                                    <div className="mt-1.5 text-center text-xs font-medium text-amber-900 bg-amber-50/90 py-1.5 px-3 rounded-lg border border-amber-200 animate-fade-in space-y-1">
                                        <div>
                                            💡 <strong>Gợi ý:</strong> Bắt đầu bằng <strong className="text-rose-600 uppercase">&quot;{currentWord.meanings[0].charAt(0)}&quot;</strong> ({currentWord.meanings[0].split(' ').length} từ)
                                        </div>
                                        {currentWord.note && (
                                            <div className="text-[11px] text-amber-800">
                                                <span>📌 <em>{currentWord.note}</em></span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Phím hỗ trợ và bỏ qua */}
                            <div className={`flex justify-between items-center text-[11px] sm:text-xs text-[var(--muted)] px-1 select-none ${
                                isKeyboardOpen ? 'py-0.5' : 'py-1.5'
                            }`}>
                                <div className="flex items-center gap-1.5">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            triggerHaptic();
                                            setShowHint(prev => !prev);
                                        }}
                                        className="px-2 py-1 rounded-lg bg-white/70 hover:bg-white text-[var(--accent)] font-bold inline-flex items-center gap-1 cursor-pointer border border-white/80 active:scale-95 transition touch-manipulation"
                                    >
                                        <span>💡</span> {showHint ? 'Ẩn' : 'Gợi ý'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            triggerHaptic();
                                            setShowPinyin(prev => !prev);
                                        }}
                                        className="px-2 py-1 rounded-lg bg-white/70 hover:bg-white font-semibold text-[var(--text)] cursor-pointer border border-white/80 active:scale-95 transition touch-manipulation"
                                    >
                                        Pinyin: {showPinyin ? 'BẬT' : 'TẮT'}
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    disabled={isDissolving || isRevealingWrong}
                                    onClick={handleSkip}
                                    className="px-2.5 py-1 rounded-lg text-rose-600 hover:text-rose-700 font-semibold cursor-pointer disabled:opacity-40 active:scale-95 transition touch-manipulation"
                                >
                                    Bỏ qua →
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ==================== MÀN HÌNH TỔNG KẾT (16 TỪ XONG HOẶC HẾT 1 PHÚT) ==================== */}
                {gameState === 'gameover' && (
                    <div className="card rounded-[2.5rem] p-8 sm:p-12 bg-white/40 backdrop-blur-xl border border-white/40 shadow-2xl text-center space-y-6">
                        <div className="text-6xl animate-pulse">
                            {endReason === 'completed' ? '🎉' : '⏱️'}
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)]">
                            {endReason === 'completed'
                                ? 'Hoàn Thành 16 Từ Xuất Sắc!'
                                : 'Hết 1 Phút Thử Thách!'}
                        </h2>
                        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
                            {endReason === 'completed'
                                ? `Bạn đã hoàn tất toàn bộ 16 từ trong ${timeSpent} giây!`
                                : `Thời gian 60 giây đã hết. Dưới đây là kết quả của bạn:`}
                        </p>

                        {/* Tóm tắt điểm số */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
                            <div className="p-4 rounded-2xl bg-white/60 border border-[var(--border)]">
                                <div className="text-xs text-[var(--muted)] font-semibold uppercase">Điểm đạt được</div>
                                <div className="text-2xl sm:text-3xl font-extrabold text-[var(--accent)] mt-1">{score}</div>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/60 border border-[var(--border)]">
                                <div className="text-xs text-[var(--muted)] font-semibold uppercase">Số câu đúng</div>
                                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1">
                                    {correctCount}/{TOTAL_ROUND_WORDS}
                                </div>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/60 border border-[var(--border)]">
                                <div className="text-xs text-[var(--muted)] font-semibold uppercase">Thời gian</div>
                                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 mt-1">{timeSpent}s</div>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/60 border border-[var(--border)]">
                                <div className="text-xs text-[var(--muted)] font-semibold uppercase">Kỷ lục cao nhất</div>
                                <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1">{bestScore}</div>
                            </div>
                        </div>

                        {/* Đánh giá tỷ lệ chính xác */}
                        <div className="p-3 bg-white/50 rounded-2xl max-w-md mx-auto border border-white/60 text-xs sm:text-sm text-[var(--muted)]">
                            Tỷ lệ chính xác: <strong className="text-[var(--text)] text-base font-bold">
                                {Math.round((correctCount / TOTAL_ROUND_WORDS) * 100)}%
                            </strong>
                            {' · '}
                            {correctCount >= 14
                                ? '🌟 Trình độ phản xạ siêu đẳng!'
                                : correctCount >= 10
                                ? '👍 Rất tốt, tiếp tục phát huy nhé!'
                                : '💪 Cố gắng thêm ở lượt tiếp theo!'}
                        </div>

                        {/* Bảng ôn tập toàn bộ 16 từ của lượt chơi */}
                        {history.length > 0 && (
                            <div className="text-left mt-6">
                                <h3 className="text-sm font-bold text-[var(--text)] uppercase tracking-wider mb-3 flex items-center justify-between">
                                    <span>Danh sách 16 từ vừa ôn tập:</span>
                                    <span className="text-xs font-normal text-[var(--muted)]">Bấm 🔊 để nghe phát âm</span>
                                </h3>
                                <div className="max-h-64 overflow-y-auto space-y-2 pr-2">
                                    {history.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className={`p-3 rounded-xl border flex flex-col text-xs sm:text-sm gap-1.5 ${
                                                item.correct
                                                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                                                    : 'bg-rose-50/80 border-rose-200 text-rose-900'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2.5">
                                                    <button
                                                        type="button"
                                                        onClick={() => speakChinese(item.hanzi)}
                                                        className="p-1 rounded-lg bg-white/70 hover:bg-white text-sm shadow-xs hover:scale-110 active:scale-95 transition cursor-pointer touch-manipulation"
                                                        title="Bấm để nghe phát âm từ này"
                                                    >
                                                        🔊
                                                    </button>
                                                    <span className="font-bold text-base font-[family:var(--font-serif)]">{item.hanzi}</span>
                                                    <span className="text-xs opacity-75">[{item.pinyin}]</span>
                                                    <span>👉 {item.meaning}</span>
                                                </div>
                                                <span className="font-bold shrink-0">{item.correct ? '✓ Đúng' : '✗ Bỏ qua / Sai'}</span>
                                            </div>
                                            {item.example && (
                                                <div className="pt-1.5 border-t border-black/5 text-[11px] text-[var(--muted)] flex flex-wrap items-center gap-1.5">
                                                    <span className="font-medium text-indigo-800 bg-indigo-50/90 px-2 py-0.5 rounded-md border border-indigo-100">
                                                        Ví dụ: {item.example.hanzi} ({item.example.vietnamese})
                                                    </span>
                                                    {item.example.grammarNote && (
                                                        <span className="text-[10px] text-amber-900 bg-amber-50/90 px-2 py-0.5 rounded-md border border-amber-200">
                                                            💡 {item.example.grammarNote}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Nút hành động */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
                            {selectedCategory === 'buoi-1' ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        triggerHaptic();
                                        startGame();
                                    }}
                                    className="btn btn-primary px-8 py-3.5 font-bold text-base shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer touch-manipulation select-none"
                                >
                                    🔄 Luyện Lại Buổi 1 (16 Từ QC)
                                </button>
                            ) : selectedCategory === 'buoi-1-phong-o' ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        triggerHaptic();
                                        startGame();
                                    }}
                                    className="btn btn-primary px-8 py-3.5 font-bold text-base shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer touch-manipulation select-none"
                                >
                                    🔄 Luyện Lại Buổi 1 (Phòng Ở & Xưởng)
                                </button>
                            ) : selectedCategory === 'buoi-2-ktx' ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        triggerHaptic();
                                        startGame();
                                    }}
                                    className="btn btn-primary px-8 py-3.5 font-bold text-base shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer touch-manipulation select-none"
                                >
                                    🔄 Luyện Lại Buổi 2 (Ký Túc Xá)
                                </button>
                            ) : selectedCategory === 'buoi-3-bep' ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        triggerHaptic();
                                        startGame();
                                    }}
                                    className="btn btn-primary px-8 py-3.5 font-bold text-base shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer touch-manipulation select-none"
                                >
                                    🔄 Luyện Lại Buổi 3 (Bếp Núc & Thời Gian)
                                </button>
                            ) : selectedCategory === 'buoi-4-trang-phuc' ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        triggerHaptic();
                                        startGame();
                                    }}
                                    className="btn btn-primary px-8 py-3.5 font-bold text-base shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer touch-manipulation select-none"
                                >
                                    🔄 Luyện Lại Buổi 4 (Trang Phục & Lịch)
                                </button>
                            ) : selectedCategory === 'may-mac' && selectedLesson !== 'all' ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            triggerHaptic();
                                            startGame('may-mac', selectedLesson);
                                        }}
                                        className="btn btn-primary px-8 py-3.5 font-bold text-base shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer touch-manipulation select-none"
                                    >
                                        🔄 Luyện Lại Bài {selectedLesson.replace('b', '')}
                                    </button>
                                    {parseInt(selectedLesson.replace('b', '')) < 12 && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                triggerHaptic();
                                                startGame('may-mac', `b${parseInt(selectedLesson.replace('b', '')) + 1}`);
                                            }}
                                            className="btn px-8 py-3.5 font-bold text-base bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer touch-manipulation select-none"
                                        >
                                            Học Tiếp Bài {parseInt(selectedLesson.replace('b', '')) + 1} ➡️
                                        </button>
                                    )}
                                </>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => {
                                        triggerHaptic();
                                        startGame();
                                    }}
                                    className="btn btn-primary px-8 py-3.5 font-bold text-base shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer touch-manipulation select-none"
                                >
                                    🔄 Chơi Lại 16 Từ Mới
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => {
                                    triggerHaptic();
                                    setGameState('idle');
                                }}
                                className="btn btn-secondary px-8 py-3.5 font-bold text-base cursor-pointer touch-manipulation select-none"
                            >
                                📋 Chọn Bài / Cấp Độ Khác
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
