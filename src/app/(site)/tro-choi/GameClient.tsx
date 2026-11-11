"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { GARMENT_VOCAB_DATABASE, GARMENT_LESSONS, GarmentLessonInfo } from './garmentVocab';

interface WordItem {
    id: string;
    hanzi: string;
    pinyin: string;
    meanings: string[]; // Các nghĩa tiếng Việt chấp nhận được
    category: 'hsk-1' | 'hsk-2' | 'hsk-3' | 'cong-xuong' | 'tre-em' | 'may-mac';
    categoryLabel: string;
    lesson?: string;
    lessonLabel?: string;
    lessonTopic?: string;
    isReview?: boolean;
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

    // ==================== TRẺ EM / THIẾU NHI (30 TỪ) ====================
    { id: 'te_1', hanzi: '红色', pinyin: 'hóngsè', meanings: ['màu đỏ', 'đỏ', 'mau do', 'do'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_2', hanzi: '黄色', pinyin: 'huángsè', meanings: ['màu vàng', 'vàng', 'mau vang', 'vang'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_3', hanzi: '蓝色', pinyin: 'lánsè', meanings: ['màu xanh', 'xanh dương', 'màu xanh dương', 'xanh lam', 'xanh da trời'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_4', hanzi: '绿色', pinyin: 'lǜsè', meanings: ['màu xanh lá', 'xanh lục', 'xanh lá cây', 'mau xanh la'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_5', hanzi: '白色', pinyin: 'báisè', meanings: ['màu trắng', 'trắng', 'mau trang', 'trang'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_6', hanzi: '黑色', pinyin: 'hēisè', meanings: ['màu đen', 'đen', 'mau den', 'den'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_7', hanzi: '大熊猫', pinyin: 'dàxióngmāo', meanings: ['gấu trúc', 'gau truc', 'gấu trúc khổng lồ'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_8', hanzi: '兔子', pinyin: 'tùzi', meanings: ['thỏ', 'con thỏ', 'tho', 'con tho'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_9', hanzi: '鸟', pinyin: 'niǎo', meanings: ['chim', 'con chim', 'chim non'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_10', hanzi: '鱼', pinyin: 'yú', meanings: ['cá', 'con cá', 'ca', 'con ca'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_11', hanzi: '太阳', pinyin: 'tàiyáng', meanings: ['mặt trời', 'ông mặt trời', 'mat troi'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_12', hanzi: '月亮', pinyin: 'yuèliang', meanings: ['mặt trăng', 'ông trăng', 'mat trang', 'trăng'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_13', hanzi: '星星', pinyin: 'xīngxing', meanings: ['ngôi sao', 'ông sao', 'sao', 'ngoi sao'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_14', hanzi: '玩具', pinyin: 'wánjù', meanings: ['đồ chơi', 'do choi'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_15', hanzi: '气球', pinyin: 'qìqiú', meanings: ['bóng bay', 'bong bóng', 'bong bay'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_16', hanzi: '画画', pinyin: 'huàhuà', meanings: ['vẽ tranh', 'vẽ', 've tranh', 've'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_17', hanzi: '拍手', pinyin: 'pāishǒu', meanings: ['vỗ tay', 'vo tay'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_18', hanzi: '鼻子', pinyin: 'bízi', meanings: ['mũi', 'cái mũi', 'mui', 'cai mui'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_19', hanzi: '嘴巴', pinyin: 'zuǐba', meanings: ['miệng', 'cái miệng', 'mieng', 'cai mieng'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_20', hanzi: '耳朵', pinyin: 'ěrduo', meanings: ['tai', 'cái tai', 'tai lang'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_21', hanzi: '手', pinyin: 'shǒu', meanings: ['tay', 'bàn tay', 'tay me'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_22', hanzi: '脚', pinyin: 'jiǎo', meanings: ['chân', 'bàn chân', 'chan'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_23', hanzi: '西瓜', pinyin: 'xīguā', meanings: ['dưa hấu', 'quả dưa hấu', 'dua hau'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_24', hanzi: '香蕉', pinyin: 'xiāngjiāo', meanings: ['chuối', 'quả chuối', 'chuoi', 'qua chuoi'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_25', hanzi: '牛奶', pinyin: 'niúnǎi', meanings: ['sữa bò', 'sữa', 'sua bo', 'sua'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_26', hanzi: '糖果', pinyin: 'tángguǒ', meanings: ['kẹo', 'kẹo ngọt', 'keo', 'keo ngot'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_27', hanzi: '冰淇淋', pinyin: 'bīngqílín', meanings: ['kem', 'cây kem', 'kem que'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_28', hanzi: '小船', pinyin: 'xiǎochuán', meanings: ['thuyền nhỏ', 'con thuyền', 'thuyen nho'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_29', hanzi: '花', pinyin: 'huā', meanings: ['hoa', 'bông hoa', 'bong hoa'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_30', hanzi: '树', pinyin: 'shù', meanings: ['cây', 'cái cây', 'cay'], category: 'tre-em', categoryLabel: 'Trẻ em' },
];

const ALL_VOCAB_DATABASE: WordItem[] = [
    ...VOCAB_DATABASE,
    ...(GARMENT_VOCAB_DATABASE as WordItem[]),
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

function speakChinese(text: string) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-CN';
        utterance.rate = 0.82; // Tốc độ chuẩn cho người học nghe rõ thanh điệu
        utterance.pitch = 1.0;

        const voices = window.speechSynthesis.getVoices();
        const zhVoice = voices.find(v => v.lang.startsWith('zh') || v.lang.includes('cmn'));
        if (zhVoice) {
            utterance.voice = zhVoice;
        }

        window.speechSynthesis.speak(utterance);
    } catch {
        // Fallback
    }
}

// Component GameInput: Tách biệt hoàn toàn việc nhập phím với bộ đếm giờ của cha
// Đảm bảo gõ tiếng Việt Telex / VNI / Unikey 100% mượt mà, không giật lag, không nhân đôi chữ
interface GameInputProps {
    disabled: boolean;
    feedbackMessage: string | null;
    currentWordId: string;
    onCheckAnswer: (text: string, isExplicitSubmit: boolean) => void;
    onClearFeedback: () => void;
}

function GameInput({
    disabled,
    feedbackMessage,
    currentWordId,
    onCheckAnswer,
    onClearFeedback,
}: GameInputProps) {
    const [val, setVal] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const isComposingRef = useRef(false);

    // Khi chuyển sang từ mới thì reset input và focus
    useEffect(() => {
        setVal('');
        if (!disabled && inputRef.current) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 60);
            return () => clearTimeout(timer);
        }
    }, [currentWordId, disabled]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setVal(value);
        onClearFeedback();

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
        const finalVal = e.currentTarget.value;
        setVal(finalVal);
        onCheckAnswer(finalVal, false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCheckAnswer(val, true);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)] text-center">
                Gõ nghĩa tiếng Việt vào đây (nhấn Enter hoặc bấm Gửi):
            </label>
            <div className="flex gap-2">
                <input
                    ref={inputRef}
                    type="text"
                    disabled={disabled}
                    value={val}
                    onChange={handleChange}
                    onCompositionStart={handleCompositionStart}
                    onCompositionEnd={handleCompositionEnd}
                    placeholder="Ví dụ: xin chào, cảm ơn, trà..."
                    className={`w-full px-5 py-4 text-center rounded-2xl border-2 bg-white/85 text-lg sm:text-xl font-bold text-[var(--text)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:ring-4 focus:ring-[var(--accent)]/20 transition-all shadow-inner ${
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
                    disabled={disabled}
                    className="btn btn-primary px-6 rounded-2xl font-bold shrink-0 text-base shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                    <span>Gửi</span>
                    <span>→</span>
                </button>
            </div>
        </form>
    );
}

export default function GameClient() {
    const [selectedCategory, setSelectedCategory] = useState<string>('may-mac');
    const [selectedLesson, setSelectedLesson] = useState<string>('b1');
    const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
    const [endReason, setEndReason] = useState<'completed' | 'timeout'>('completed');

    // Bộ 16 từ cho mỗi lượt chơi (Tuần tự theo bài học hoặc ngẫu nhiên)
    const [roundWords, setRoundWords] = useState<WordItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Đồng hồ đếm ngược đúng 1 phút (60 giây) cho cả lượt chơi
    const [totalTimeLeft, setTotalTimeLeft] = useState<number>(ROUND_TIME_LIMIT);

    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [bestScore, setBestScore] = useState(0);
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
    }>>([]);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Từ hiện tại đang hiển thị
    const currentWord = roundWords[currentIndex] || null;

    // Load High score từ localStorage
    useEffect(() => {
        const saved = localStorage.getItem('hsk_game_highscore_16');
        if (saved) setBestScore(parseInt(saved, 10));
    }, []);

    // Lọc danh sách từ theo chủ đề và bài học
    const getFilteredWords = useCallback(() => {
        if (selectedCategory === 'all') return ALL_VOCAB_DATABASE;
        if (selectedCategory === 'may-mac') {
            if (selectedLesson === 'all') {
                return ALL_VOCAB_DATABASE.filter(w => w.category === 'may-mac');
            }
            return ALL_VOCAB_DATABASE.filter(w => w.category === 'may-mac' && w.lesson === selectedLesson);
        }
        return ALL_VOCAB_DATABASE.filter(w => w.category === selectedCategory);
    }, [selectedCategory, selectedLesson]);

    // Bắt đầu lượt chơi mới (16 từ)
    const startGame = (overrideLesson?: string) => {
        sfx.init();
        const activeLesson = overrideLesson !== undefined ? overrideLesson : selectedLesson;
        if (overrideLesson !== undefined) {
            setSelectedLesson(overrideLesson);
        }

        let selected16: WordItem[] = [];

        if (selectedCategory === 'may-mac' && activeLesson !== 'all') {
            // Lấy 16 từ của bài đã chọn THEO ĐÚNG THỨ TỰ TỪ TRÊN XUỐNG DƯỚI (Không xáo trộn)
            const lessonPool = ALL_VOCAB_DATABASE.filter(w => w.category === 'may-mac' && w.lesson === activeLesson);
            selected16 = lessonPool.slice(0, TOTAL_ROUND_WORDS);
        } else {
            const pool = selectedCategory === 'all'
                ? ALL_VOCAB_DATABASE
                : ALL_VOCAB_DATABASE.filter(w => w.category === selectedCategory);
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
            // Khi bấm Gửi hoặc nhấn Enter nhưng đáp án sai:
            // 1. Hiện ra kết quả đáp án đúng ngay lập tức
            // 2. Ghi nhận lỗi đó là SAI vào lịch sử
            // 3. Tự động chuyển sang câu tiếp theo sau 1.6 giây
            sfx.playWrong();
            setWrongShake(true);
            setTimeout(() => setWrongShake(false), 500);
            setStreak(0);

            setIsRevealingWrong(true);
            setRevealedAnswer({
                typed: text.trim(),
                correctMeaning: currentWord.meanings[0],
                isSkip: false,
            });

            // Ghi nhận lỗi SAI ngay lập tức
            setHistory(prev => [
                ...prev,
                {
                    hanzi: currentWord.hanzi,
                    pinyin: currentWord.pinyin,
                    meaning: currentWord.meanings[0],
                    correct: false,
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
            }, 1600);
        }
    };

    // Bỏ qua từ hiện tại -> Hiện đáp án đúng và ghi nhận sai
    const handleSkip = () => {
        if (!currentWord || isDissolving || isRevealingWrong || gameState !== 'playing') return;
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
        <div className="min-h-screen py-12 px-4 relative overflow-hidden">
            {/* Background floating decor */}
            <div className="absolute top-10 left-10 text-9xl font-[family:var(--font-serif)] text-[var(--accent)]/5 select-none pointer-events-none">
                字
            </div>
            <div className="absolute bottom-10 right-10 text-9xl font-[family:var(--font-serif)] text-[var(--accent)]/5 select-none pointer-events-none">
                语
            </div>

            <div className="container-app max-w-3xl mx-auto relative z-10">
                {/* Header title */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 badge-gradient mb-3 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                        <span>🎮</span> Thử Thách 16 Từ Trong 1 Phút
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--text)] tracking-tight mb-2">
                        Từ Vựng <span className="text-gradient-accent">Tan Biến</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-[var(--muted)] max-w-lg mx-auto">
                        Đúng <strong>16 từ vựng không lặp lại</strong> trong vòng <strong>60 giây</strong>. Gõ nhanh tiếng Việt chuẩn để ghi điểm combo tối đa!
                    </p>
                </div>

                {/* ==================== MÀN HÌNH BẮT ĐẦU ==================== */}
                {gameState === 'idle' && (
                    <div className="card rounded-[2.5rem] p-8 sm:p-12 bg-white/40 backdrop-blur-xl border border-white/40 shadow-2xl text-center">
                        <div className="text-6xl mb-4 animate-bounce">
                            🏮
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-3">
                            Chọn Chủ Đề Luyện Tập
                        </h2>
                        <p className="text-sm text-[var(--muted)] mb-8 max-w-md mx-auto">
                            Mỗi lượt chơi gồm <strong>16 câu hỏi chọn lọc</strong> trong <strong>1 phút (60 giây)</strong>:
                        </p>

                        {/* Danh sách chủ đề */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                            {[
                                { id: 'may-mac', label: 'Ngành May Mặc', icon: '🧵', count: '180+ từ (12 Bài)', highlight: true },
                                { id: 'all', label: 'Tất cả chủ đề', icon: '🌟', count: '350+ từ' },
                                { id: 'hsk-1', label: 'HSK 1 (Sơ cấp)', icon: '🎯', count: '35 từ' },
                                { id: 'hsk-2', label: 'HSK 2 (Cơ bản)', icon: '📗', count: '35 từ' },
                                { id: 'hsk-3', label: 'HSK 3 (Trung cấp)', icon: '📘', count: '35 từ' },
                                { id: 'cong-xuong', label: 'Công xưởng', icon: '🏭', count: '35 từ' },
                                { id: 'tre-em', label: 'Trẻ em', icon: '🎨', count: '30 từ' },
                            ].map(cat => (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`p-3.5 sm:p-4 rounded-2xl border text-sm font-semibold transition-all flex flex-col items-center gap-1 cursor-pointer relative ${
                                        selectedCategory === cat.id
                                            ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-md scale-105 ring-2 ring-[var(--accent)]/30'
                                            : 'bg-white/60 text-[var(--text)] border-[var(--border)] hover:bg-white hover:scale-102'
                                    } ${cat.highlight && selectedCategory !== cat.id ? 'border-rose-300 bg-rose-50/50' : ''}`}
                                >
                                    {cat.highlight && selectedCategory !== cat.id && (
                                        <span className="absolute -top-2.5 -right-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-rose-500 text-white shadow-xs">
                                            Mới ✨
                                        </span>
                                    )}
                                    <span className="text-2xl">{cat.icon}</span>
                                    <span className="line-clamp-1">{cat.label}</span>
                                    <span className={`text-[10px] ${selectedCategory === cat.id ? 'text-white/80' : 'text-[var(--muted)]'}`}>
                                        {cat.count}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Bộ chia 12 Bài học Mỗi ngày theo tài liệu dệt may (Khi chọn ngành may mặc) */}
                        {selectedCategory === 'may-mac' && (
                            <div className="mb-8 text-left bg-gradient-to-br from-amber-50/80 via-white/80 to-rose-50/60 p-5 sm:p-6 rounded-3xl border border-amber-200 shadow-sm animate-fade-in">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-amber-200/60">
                                    <div>
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black bg-amber-100 text-amber-900 uppercase tracking-wider mb-1">
                                            <span>📅</span> Lộ trình học 16 từ mỗi ngày (Từ trên xuống dưới)
                                        </div>
                                        <h3 className="text-base sm:text-lg font-extrabold text-[var(--text)]">
                                            Chọn Ngày / Bài Học Ngành May Mặc & Dệt Sợi
                                        </h3>
                                        <p className="text-xs text-[var(--muted)]">
                                            Đã chia sẵn 12 bài theo đúng thứ tự file Word tài liệu. Mỗi ngày học chuẩn 16 từ!
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedLesson('all')}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                                            selectedLesson === 'all'
                                                ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-sm'
                                                : 'bg-white text-[var(--muted)] border-gray-200 hover:text-[var(--text)]'
                                        }`}
                                    >
                                        🎲 Trộn ngẫu nhiên (16 từ)
                                    </button>
                                </div>

                                {/* 12 bài dạng lưới */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                                    {GARMENT_LESSONS.map(lesson => {
                                        const isSelected = selectedLesson === lesson.id;
                                        return (
                                            <button
                                                key={lesson.id}
                                                type="button"
                                                onClick={() => setSelectedLesson(lesson.id)}
                                                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between gap-1 ${
                                                    isSelected
                                                        ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-md scale-102 ring-2 ring-[var(--accent)]/30'
                                                        : 'bg-white/80 hover:bg-white text-[var(--text)] border-amber-100 hover:border-amber-300 shadow-xs'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between gap-1">
                                                    <span className="text-xl">{lesson.icon}</span>
                                                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                                                        isSelected ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-900'
                                                    }`}>
                                                        Ngày {lesson.number}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="text-xs sm:text-sm font-bold line-clamp-1">
                                                        {lesson.title}
                                                    </div>
                                                    <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-white/80' : 'text-[var(--muted)]'}`}>
                                                        {lesson.wordRange}
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Nút bắt đầu */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button
                                type="button"
                                onClick={() => startGame()}
                                className="btn btn-primary px-10 py-4 text-lg font-bold shadow-xl hover:scale-105 active:scale-95 transition-all w-full sm:w-auto cursor-pointer"
                            >
                                {selectedCategory === 'may-mac' && selectedLesson !== 'all' ? (
                                    <span>Bắt Đầu {GARMENT_LESSONS.find(l => l.id === selectedLesson)?.title || 'Bài Học'} (16 Từ) 🔥</span>
                                ) : (
                                    <span>Bắt Đầu 16 Từ (1 Phút) 🔥</span>
                                )}
                            </button>
                        </div>

                        {bestScore > 0 && (
                            <div className="mt-8 pt-6 border-t border-[var(--border)] text-xs text-[var(--muted)] flex items-center justify-center gap-2">
                                <span>🏆 Kỷ lục 16 từ cao nhất của bạn:</span>
                                <strong className="text-base text-[var(--accent)]">{bestScore} điểm</strong>
                            </div>
                        )}
                    </div>
                )}

                {/* ==================== MÀN HÌNH ĐANG CHƠI ==================== */}
                {gameState === 'playing' && currentWord && (
                    <div className="space-y-6">
                        {/* Thanh tiến độ 16 từ và đồng hồ 60 giây */}
                        <div className="card p-4 sm:p-5 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/40 shadow-md space-y-3">
                            <div className="flex items-center justify-between gap-4">
                                {/* Tiến độ từ */}
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse"></span>
                                    <span className="text-sm font-extrabold text-[var(--text)]">
                                        Câu {currentIndex + 1} / {TOTAL_ROUND_WORDS}
                                    </span>
                                </div>

                                {/* Điểm và Combo */}
                                <div className="text-center">
                                    <div className="text-xs uppercase font-semibold text-[var(--muted)]">Điểm số</div>
                                    <div className="text-xl sm:text-2xl font-extrabold text-[var(--accent)]">
                                        {score}
                                    </div>
                                    {streak >= 2 && (
                                        <div className="text-[10px] font-bold text-amber-600 animate-pulse">
                                            🔥 {streak} COMBO ({streak >= 5 ? 'x3' : 'x2'})
                                        </div>
                                    )}
                                </div>

                                {/* Đồng hồ đếm ngược 60s tổng */}
                                <div className={`px-4 py-2 rounded-2xl border text-sm font-black flex items-center gap-1.5 shadow-sm transition-all ${
                                    totalTimeLeft <= 15
                                        ? 'bg-rose-50 text-rose-600 border-rose-300 animate-bounce'
                                        : totalTimeLeft <= 30
                                        ? 'bg-amber-50 text-amber-700 border-amber-300'
                                        : 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                }`}>
                                    <span>⏱️</span>
                                    <span>{totalTimeLeft}s</span>
                                </div>

                                {/* Điều khiển âm thanh */}
                                <div className="flex items-center gap-1.5">
                                    <button
                                        type="button"
                                        onClick={toggleSound}
                                        title={soundOn ? 'Tắt âm thanh hiệu ứng' : 'Bật âm thanh hiệu ứng'}
                                        className="w-9 h-9 rounded-xl bg-white/70 border border-[var(--border)] flex items-center justify-center text-sm hover:bg-white transition cursor-pointer"
                                    >
                                        {soundOn ? '🔔' : '🔕'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setAutoVoice(prev => !prev)}
                                        title="Tự động phát âm tiếng Trung khi xuất hiện từ mới"
                                        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                                            autoVoice
                                                ? 'bg-rose-100 text-rose-800 border-rose-300'
                                                : 'bg-white/70 text-[var(--muted)] border-[var(--border)]'
                                        }`}
                                    >
                                        🗣️ {autoVoice ? 'BẬT' : 'TẮT'}
                                    </button>
                                </div>
                            </div>

                            {/* 16 vạch chỉ số cho 16 từ */}
                            <div className="flex items-center gap-1 sm:gap-1.5 pt-1">
                                {roundWords.map((_, idx) => {
                                    const hist = history[idx];
                                    return (
                                        <div
                                            key={idx}
                                            className={`flex-1 h-2 rounded-full transition-all duration-300 ${
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

                            {/* Thanh thời gian 60 giây tổng */}
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-1000 linear ${
                                        totalTimeLeft > 30
                                            ? 'bg-emerald-500'
                                            : totalTimeLeft > 15
                                            ? 'bg-amber-500'
                                            : 'bg-rose-500'
                                    }`}
                                    style={{ width: `${(totalTimeLeft / ROUND_TIME_LIMIT) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Thẻ hiển thị chữ Hán trung tâm */}
                        <div
                            className={`card relative min-h-[260px] sm:min-h-[290px] rounded-[3rem] p-8 flex flex-col items-center justify-center bg-white/45 backdrop-blur-2xl border border-white/50 shadow-2xl transition-all duration-300 ${
                                wrongShake ? 'animate-[shake_0.5s_ease-in-out]' : ''
                            }`}
                        >
                            {/* Category badge */}
                            <div className="absolute top-5 left-6">
                                <span className="badge-gradient text-xs px-3 py-1 rounded-full font-bold">
                                    {currentWord.categoryLabel} {currentWord.lessonLabel ? `• ${currentWord.lessonLabel}` : ''}
                                </span>
                            </div>

                            {/* Question number badge */}
                            <div className="absolute top-5 right-6 text-xs font-bold text-[var(--muted)] bg-white/80 px-3 py-1 rounded-full border border-white/60">
                                #{currentIndex + 1} / 16
                            </div>

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
                                className={`transition-all duration-500 select-none text-center ${
                                    isDissolving
                                        ? 'scale-150 blur-lg opacity-0 rotate-6 filter'
                                        : 'scale-100 blur-0 opacity-100'
                                }`}
                            >
                                <div className="text-6xl sm:text-8xl font-[family:var(--font-serif)] font-extrabold text-[var(--accent)] tracking-wider drop-shadow-sm mb-2">
                                    {currentWord.hanzi}
                                </div>

                                {showPinyin && (
                                    <div className="text-lg sm:text-2xl font-medium text-[var(--muted)] tracking-wide mb-3">
                                        [{currentWord.pinyin}]
                                    </div>
                                )}

                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        speakChinese(currentWord.hanzi);
                                    }}
                                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/80 hover:bg-white text-xs font-bold text-[var(--accent)] border border-[var(--border)] shadow-sm hover:scale-105 active:scale-95 transition cursor-pointer"
                                    title="Nghe phát âm chuẩn tiếng Trung"
                                >
                                    <span>🔊</span> Nghe phát âm
                                </button>
                            </div>

                            {isDissolving && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                                    <span className="text-2xl sm:text-4xl font-extrabold text-emerald-600 bg-white/90 px-6 py-2 rounded-2xl shadow-xl animate-bounce">
                                        ✨ CHÍNH XÁC!
                                    </span>
                                </div>
                            )}

                            {/* Hiển thị kết quả đáp án đúng khi bấm sai */}
                            {isRevealingWrong && revealedAnswer && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-rose-950/85 backdrop-blur-md rounded-[3rem] p-6 text-white z-30 animate-fade-in text-center select-none shadow-2xl border-2 border-rose-500/50">
                                    <div className="text-4xl mb-1 animate-bounce">
                                        ❌
                                    </div>
                                    <div className="text-xl sm:text-2xl font-black text-rose-200 tracking-wide uppercase">
                                        {revealedAnswer.isSkip ? 'ĐÃ BỎ QUA CÂU NÀY' : 'CHƯA CHÍNH XÁC!'}
                                    </div>
                                    {revealedAnswer.typed && (
                                        <div className="text-xs text-rose-300 mt-1">
                                            Từ bạn vừa gõ: <span className="line-through font-bold text-white px-2 py-0.5 rounded bg-black/30">&quot;{revealedAnswer.typed}&quot;</span>
                                        </div>
                                    )}
                                    <div className="mt-3.5 py-2.5 px-6 bg-white/15 rounded-2xl border border-white/25 shadow-inner">
                                        <div className="text-[11px] uppercase tracking-wider text-amber-300 font-extrabold">
                                            Đáp án đúng là:
                                        </div>
                                        <div className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                                            {revealedAnswer.correctMeaning}
                                        </div>
                                    </div>
                                    <div className="text-[11px] text-white/70 mt-3 animate-pulse">
                                        Đang chuyển sang câu tiếp theo...
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Ô nhập nghĩa tiếng Việt độc lập (Không bị gián đoạn bộ đệm Telex/Unikey) */}
                        <div className={`card p-4 sm:p-6 rounded-[2rem] bg-white/40 backdrop-blur-xl border border-white/40 shadow-xl transition-all ${
                            wrongShake ? 'animate-[shake_0.5s_ease-in-out]' : ''
                        }`}>
                            <GameInput
                                disabled={isDissolving || isRevealingWrong}
                                feedbackMessage={feedbackMessage}
                                currentWordId={currentWord.id}
                                onCheckAnswer={checkAnswer}
                                onClearFeedback={() => setFeedbackMessage(null)}
                            />

                            {/* Cảnh báo kết quả sai hoặc hướng dẫn */}
                            {feedbackMessage && (
                                <div className="mt-3 text-center text-xs sm:text-sm font-semibold text-rose-600 bg-rose-50/90 py-2.5 px-4 rounded-xl border border-rose-200 animate-fade-in flex items-center justify-center gap-1.5">
                                    <span>{feedbackMessage}</span>
                                </div>
                            )}

                            {/* Khối gợi ý */}
                            {showHint && currentWord && (
                                <div className="mt-3 text-center text-xs sm:text-sm font-medium text-amber-900 bg-amber-50/90 py-2.5 px-4 rounded-xl border border-amber-200 animate-fade-in">
                                    💡 <strong>Gợi ý:</strong> Từ này bắt đầu bằng chữ <strong className="text-rose-600 uppercase font-bold">&quot;{currentWord.meanings[0].charAt(0)}&quot;</strong> ({currentWord.meanings[0].split(' ').length} từ: {currentWord.meanings[0].slice(0, 3)}...)
                                </div>
                            )}
                        </div>

                        {/* Phím hỗ trợ và bỏ qua */}
                        <div className="flex flex-wrap justify-between items-center text-xs text-[var(--muted)] px-2 gap-2">
                            <div className="flex items-center gap-3">
                                <span>Gõ có dấu hoặc không dấu đều đúng!</span>
                                <button
                                    type="button"
                                    onClick={() => setShowHint(prev => !prev)}
                                    className="text-[var(--accent)] hover:underline font-bold inline-flex items-center gap-1 cursor-pointer"
                                >
                                    <span>💡</span> {showHint ? 'Ẩn gợi ý' : 'Xem gợi ý'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowPinyin(prev => !prev)}
                                    className="hover:underline font-semibold text-[var(--text)] cursor-pointer"
                                >
                                    Pinyin: {showPinyin ? 'BẬT' : 'TẮT'}
                                </button>
                            </div>
                            <button
                                type="button"
                                disabled={isDissolving || isRevealingWrong}
                                onClick={handleSkip}
                                className="hover:text-[var(--accent)] font-semibold underline cursor-pointer disabled:opacity-40"
                            >
                                Bỏ qua câu này →
                            </button>
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
                                            className={`p-3 rounded-xl border flex items-center justify-between text-xs sm:text-sm ${
                                                item.correct
                                                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                                                    : 'bg-rose-50/80 border-rose-200 text-rose-900'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => speakChinese(item.hanzi)}
                                                    className="p-1 rounded-lg bg-white/70 hover:bg-white text-sm shadow-xs hover:scale-110 active:scale-95 transition cursor-pointer"
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
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Nút hành động */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            {selectedCategory === 'may-mac' && selectedLesson !== 'all' ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => startGame(selectedLesson)}
                                        className="btn btn-primary px-8 py-3.5 font-bold text-base shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                                    >
                                        🔄 Luyện Lại Bài {selectedLesson.replace('b', '')}
                                    </button>
                                    {parseInt(selectedLesson.replace('b', '')) < 12 && (
                                        <button
                                            type="button"
                                            onClick={() => startGame(`b${parseInt(selectedLesson.replace('b', '')) + 1}`)}
                                            className="btn px-8 py-3.5 font-bold text-base bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                                        >
                                            Học Tiếp Bài {parseInt(selectedLesson.replace('b', '')) + 1} ➡️
                                        </button>
                                    )}
                                </>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => startGame()}
                                    className="btn btn-primary px-8 py-3.5 font-bold text-base shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                                >
                                    🔄 Chơi Lại 16 Từ Mới
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => setGameState('idle')}
                                className="btn btn-secondary px-8 py-3.5 font-bold text-base cursor-pointer"
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
