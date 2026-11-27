export interface GarmentWordItem {
    id: string;
    index?: number;
    hanzi: string;
    pinyin: string;
    meanings: string[];
    category: 'may-mac';
    categoryLabel: string;
    lesson: string;
    lessonLabel: string;
    lessonTopic?: string;
    isReview?: boolean;
}

export interface GarmentLessonInfo {
    id: string;
    number: number;
    title: string;
    description: string;
    icon: string;
    wordRange: string;
}

export const GARMENT_LESSONS: GarmentLessonInfo[] = [
    { id: 'b1', number: 1, title: 'Mẫu Vải & Dạ Nỉ', description: 'Bản mẫu, bông thô, bông tơ, thẻ mẫu vải, các loại vải dạ...', icon: '🧵', wordRange: 'Từ 1 - 16' },
    { id: 'b2', number: 2, title: 'Hàng Dệt & Lông Len', description: 'Hàng dệt kim, dệt len, dệt tơ lụa, dệt hoa, lông thú...', icon: '🧶', wordRange: 'Từ 17 - 32' },
    { id: 'b3', number: 3, title: 'Lụa Tơ Tằm & Nhung', description: 'Lụa kếp, nhiễu, nhung kẻ, nhung mịn, nhuộm sợi...', icon: '🧣', wordRange: 'Từ 33 - 48' },
    { id: 'b4', number: 4, title: 'Tơ Sợi & Vải Bạt', description: 'Ni lông, satin, sợi tổng hợp, tơ nhân tạo, vải bạt...', icon: '🪡', wordRange: 'Từ 49 - 64' },
    { id: 'b5', number: 5, title: 'Cashmere & Denim', description: 'Vải cashmere, vải chéo, vải denim jean, vải kaki...', icon: '👖', wordRange: 'Từ 65 - 80' },
    { id: 'b6', number: 6, title: 'Vải Lanh, Ren & Muxơlin', description: 'Vải lanh, vải ren, vóc satanh, vải sọc, vải nhung...', icon: '👗', wordRange: 'Từ 81 - 96' },
    { id: 'b7', number: 7, title: 'Vải Thun & Giao Hàng', description: 'Vải thun, voan the, điều khoản và phương thức giao nhận...', icon: '📦', wordRange: 'Từ 97 - 112' },
    { id: 'b8', number: 8, title: 'Thiết Bị & Máy May', description: 'Máy may, máy thùa khuy, đính cúc, máy vắt sổ...', icon: '⚙️', wordRange: 'Từ 113 - 128' },
    { id: 'b9', number: 9, title: 'Máy May Chuyên Dụng', description: 'Máy trần đè, vắt gấu, căn sai, kiểm vải, linh kiện...', icon: '🏭', wordRange: 'Từ 129 - 144' },
    { id: 'b10', number: 10, title: 'Linh Kiện Máy May', description: 'Máy điện tử, chân vịt, cùi chỏ, poly, kẹp chỉ, giá chỉ...', icon: '🔧', wordRange: 'Từ 145 - 160' },
    { id: 'b11', number: 11, title: 'Phụ Liệu & Cắt May', description: 'Suốt, thuyền, ổ chao, áo da, đường may, viền...', icon: '✂️', wordRange: 'Từ 161 - 176' },
    { id: 'b12', number: 12, title: 'Chi Tiết Áo Quần & Ôn Tập', description: 'Túi áo, túi ngực, đệm vai, ống tay & ôn tập các từ then chốt...', icon: '🏆', wordRange: 'Từ 177 - 183 + Ôn tập' },
];

export const GARMENT_VOCAB_DATABASE: GarmentWordItem[] = [
    {
        "id": "mm_1",
        "index": 1,
        "hanzi": "织物样本",
        "pinyin": "zhīwù yàngběn",
        "meanings": [
            "Bản mẫu hàng dệt"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b1",
        "lessonLabel": "Bài 1",
        "lessonTopic": "Mẫu Vải & Dạ Nỉ"
    },
    {
        "id": "mm_2",
        "index": 2,
        "hanzi": "原棉",
        "pinyin": "yuánmián",
        "meanings": [
            "Bông thô"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b1",
        "lessonLabel": "Bài 1",
        "lessonTopic": "Mẫu Vải & Dạ Nỉ"
    },
    {
        "id": "mm_3",
        "index": 3,
        "hanzi": "丝绵",
        "pinyin": "sīmián",
        "meanings": [
            "Bông tơ"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b1",
        "lessonLabel": "Bài 1",
        "lessonTopic": "Mẫu Vải & Dạ Nỉ"
    },
    {
        "id": "mm_4",
        "index": 4,
        "hanzi": "衣料样品卡",
        "pinyin": "yīliào yàngpǐn kǎ",
        "meanings": [
            "Card găm mẫu vải, thẻ hàng mẫu",
            "card găm mẫu vải",
            "thẻ hàng mẫu"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b1",
        "lessonLabel": "Bài 1",
        "lessonTopic": "Mẫu Vải & Dạ Nỉ"
    },
    {
        "id": "mm_5",
        "index": 5,
        "hanzi": "薄呢",
        "pinyin": "bó ní",
        "meanings": [
            "Dạ (nỉ) mỏng",
            "dạ mỏng",
            "nỉ",
            "dạ nỉ mỏng"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b1",
        "lessonLabel": "Bài 1",
        "lessonTopic": "Mẫu Vải & Dạ Nỉ"
    },
    {
        "id": "mm_6",
        "index": 6,
        "hanzi": "花岗纹呢",
        "pinyin": "huā gāng wén ní",
        "meanings": [
            "Dạ có vân hoa cương"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b1",
        "lessonLabel": "Bài 1",
        "lessonTopic": "Mẫu Vải & Dạ Nỉ"
    },
    {
        "id": "mm_7",
        "index": 7,
        "hanzi": "人字呢",
        "pinyin": "rén zì ní",
        "meanings": [
            "Dạ hoa văn dích dắc (vân chéo gãy)",
            "dạ hoa văn dích dắc",
            "vân chéo gãy",
            "dạ hoa văn dích dắc vân chéo gãy"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b1",
        "lessonLabel": "Bài 1",
        "lessonTopic": "Mẫu Vải & Dạ Nỉ"
    },
    {
        "id": "mm_8",
        "index": 8,
        "hanzi": "麦尔登呢",
        "pinyin": "mài ěr dēng ní",
        "meanings": [
            "Dạ melton, nỉ áo khoác",
            "dạ melton",
            "nỉ áo khoác"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b1",
        "lessonLabel": "Bài 1",
        "lessonTopic": "Mẫu Vải & Dạ Nỉ"
    },
    {
        "id": "mm_9",
        "index": 9,
        "hanzi": "亚麻织品零售店",
        "pinyin": "yàmá zhīpǐn língshòu diàn",
        "meanings": [
            "Doanh nghiệp bán lẻ hàng dệt may"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b1",
        "lessonLabel": "Bài 1",
        "lessonTopic": "Mẫu Vải & Dạ Nỉ"
    },
    {
        "id": "mm_10",
        "index": 10,
        "hanzi": "呢绒商",
        "pinyin": "níróng shāng",
        "meanings": [
            "Doanh nghiệp kinh doanh nhung dạ"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b1",
        "lessonLabel": "Bài 1",
        "lessonTopic": "Mẫu Vải & Dạ Nỉ"
    },
    {
        "id": "mm_11",
        "index": 11,
        "hanzi": "珠罗纱花边",
        "pinyin": "zhū luō shā huābiān",
        "meanings": [
            "Đăng ten lưới"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b1",
        "lessonLabel": "Bài 1",
        "lessonTopic": "Mẫu Vải & Dạ Nỉ"
    },
    {
        "id": "mm_12",
        "index": 12,
        "hanzi": "花形点子",
        "pinyin": "huāxíng diǎnzi",
        "meanings": [
            "Đốm hoa"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b1",
        "lessonLabel": "Bài 1",
        "lessonTopic": "Mẫu Vải & Dạ Nỉ"
    },
    {
        "id": "mm_13",
        "index": 13,
        "hanzi": "衣物使用须知标签",
        "pinyin": "yīwù shǐyòng xūzhī biāoqiān",
        "meanings": [
            "Eetiket, nhãn (phiếu ghi chú)",
            "eetiket",
            "nhãn (phiếu ghi chú)",
            "eetiket, nhãn",
            "phiếu ghi chú",
            "eetiket, nhãn phiếu ghi chú"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b1",
        "lessonLabel": "Bài 1",
        "lessonTopic": "Mẫu Vải & Dạ Nỉ"
    },
    {
        "id": "mm_14",
        "index": 14,
        "hanzi": "织锦",
        "pinyin": "zhījǐn",
        "meanings": [
            "Gấm"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b1",
        "lessonLabel": "Bài 1",
        "lessonTopic": "Mẫu Vải & Dạ Nỉ"
    },
    {
        "id": "mm_15",
        "index": 15,
        "hanzi": "棉织物",
        "pinyin": "mián zhīwù",
        "meanings": [
            "Hàng dệt bông",
            "bông"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b1",
        "lessonLabel": "Bài 1",
        "lessonTopic": "Mẫu Vải & Dạ Nỉ"
    },
    {
        "id": "mm_16",
        "index": 16,
        "hanzi": "棉织品",
        "pinyin": "miánzhīpǐn",
        "meanings": [
            "Hàng dệt cô-tông",
            "cô-tông",
            "hàng dệt cô tông",
            "hàng dệt côtông"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b1",
        "lessonLabel": "Bài 1",
        "lessonTopic": "Mẫu Vải & Dạ Nỉ"
    },
    {
        "id": "mm_17",
        "index": 17,
        "hanzi": "花式织物",
        "pinyin": "huā shì zhīwù",
        "meanings": [
            "Hàng dệt hoa",
            "hoa"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b2",
        "lessonLabel": "Bài 2",
        "lessonTopic": "Hàng Dệt & Lông Len"
    },
    {
        "id": "mm_18",
        "index": 18,
        "hanzi": "宽幅织物",
        "pinyin": "kuān fú zhīwù",
        "meanings": [
            "Hàng dệt khổ rộng",
            "khổ rộng"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b2",
        "lessonLabel": "Bài 2",
        "lessonTopic": "Hàng Dệt & Lông Len"
    },
    {
        "id": "mm_19",
        "index": 19,
        "hanzi": "针织品",
        "pinyin": "zhēnzhīpǐn",
        "meanings": [
            "Hàng dệt kim",
            "kim"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b2",
        "lessonLabel": "Bài 2",
        "lessonTopic": "Hàng Dệt & Lông Len"
    },
    {
        "id": "mm_20",
        "index": 20,
        "hanzi": "网眼针织物",
        "pinyin": "wǎngyǎn zhēnzhīwù",
        "meanings": [
            "Hàng dệt kim mắt lưới",
            "kim mắt lưới"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b2",
        "lessonLabel": "Bài 2",
        "lessonTopic": "Hàng Dệt & Lông Len"
    },
    {
        "id": "mm_21",
        "index": 21,
        "hanzi": "钩针织品",
        "pinyin": "gōuzhēn zhīpǐn",
        "meanings": [
            "Hàng dệt kim móc",
            "kim móc"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b2",
        "lessonLabel": "Bài 2",
        "lessonTopic": "Hàng Dệt & Lông Len"
    },
    {
        "id": "mm_22",
        "index": 22,
        "hanzi": "毛织物",
        "pinyin": "máo zhīwù",
        "meanings": [
            "Hàng dệt len",
            "len"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b2",
        "lessonLabel": "Bài 2",
        "lessonTopic": "Hàng Dệt & Lông Len"
    },
    {
        "id": "mm_23",
        "index": 23,
        "hanzi": "丝织物",
        "pinyin": "sī zhīwù",
        "meanings": [
            "Hàng dệt tơ",
            "tơ"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b2",
        "lessonLabel": "Bài 2",
        "lessonTopic": "Hàng Dệt & Lông Len"
    },
    {
        "id": "mm_24",
        "index": 24,
        "hanzi": "亚麻织品",
        "pinyin": "yàmá zhī pǐn",
        "meanings": [
            "Hàng dệt vải lanh, sợi đay",
            "hàng dệt vải lanh",
            "sợi đay",
            "vải lanh"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b2",
        "lessonLabel": "Bài 2",
        "lessonTopic": "Hàng Dệt & Lông Len"
    },
    {
        "id": "mm_25",
        "index": 25,
        "hanzi": "毛料, 呢子",
        "pinyin": "máoliào, ní zi",
        "meanings": [
            "Hàng len dạ"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b2",
        "lessonLabel": "Bài 2",
        "lessonTopic": "Hàng Dệt & Lông Len"
    },
    {
        "id": "mm_26",
        "index": 26,
        "hanzi": "花缎刺绣",
        "pinyin": "huā duàn cìxiù",
        "meanings": [
            "Hàng thêu kim tuyến"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b2",
        "lessonLabel": "Bài 2",
        "lessonTopic": "Hàng Dệt & Lông Len"
    },
    {
        "id": "mm_27",
        "index": 27,
        "hanzi": "绢丝织物",
        "pinyin": "juàn sī zhīwù",
        "meanings": [
            "Hàng tơ lụa"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b2",
        "lessonLabel": "Bài 2",
        "lessonTopic": "Hàng Dệt & Lông Len"
    },
    {
        "id": "mm_28",
        "index": 28,
        "hanzi": "单幅",
        "pinyin": "dān fú",
        "meanings": [
            "Khổ (vải) đơn",
            "khổ đơn",
            "vải",
            "khổ vải đơn"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b2",
        "lessonLabel": "Bài 2",
        "lessonTopic": "Hàng Dệt & Lông Len"
    },
    {
        "id": "mm_29",
        "index": 29,
        "hanzi": "彩格呢",
        "pinyin": "cǎi gé ní",
        "meanings": [
            "Len kẻ ô, len sọc vuông",
            "len kẻ ô",
            "len sọc vuông"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b2",
        "lessonLabel": "Bài 2",
        "lessonTopic": "Hàng Dệt & Lông Len"
    },
    {
        "id": "mm_30",
        "index": 30,
        "hanzi": "英国优质呢绒",
        "pinyin": "yīngguó yōuzhì níróng",
        "meanings": [
            "Len nhung Anh cao cấp"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b2",
        "lessonLabel": "Bài 2",
        "lessonTopic": "Hàng Dệt & Lông Len"
    },
    {
        "id": "mm_31",
        "index": 31,
        "hanzi": "羽纱",
        "pinyin": "yǔshā",
        "meanings": [
            "Len pha cotton vải lạc đà"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b2",
        "lessonLabel": "Bài 2",
        "lessonTopic": "Hàng Dệt & Lông Len"
    },
    {
        "id": "mm_32",
        "index": 32,
        "hanzi": "劣等羊毛",
        "pinyin": "lièděng yángmáo",
        "meanings": [
            "Lông cừu loại xấu"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b2",
        "lessonLabel": "Bài 2",
        "lessonTopic": "Hàng Dệt & Lông Len"
    },
    {
        "id": "mm_33",
        "index": 33,
        "hanzi": "原毛",
        "pinyin": "yuánmáo",
        "meanings": [
            "Lông thú chưa gia công, len sống",
            "lông thú chưa gia công",
            "len sống"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b3",
        "lessonLabel": "Bài 3",
        "lessonTopic": "Lụa Tơ Tằm & Nhung"
    },
    {
        "id": "mm_34",
        "index": 34,
        "hanzi": "花格绸",
        "pinyin": "huā gé chóu",
        "meanings": [
            "Lụa hoa kẻ, lụa thêm kim tuyến",
            "lụa hoa kẻ",
            "lụa thêm kim tuyến"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b3",
        "lessonLabel": "Bài 3",
        "lessonTopic": "Lụa Tơ Tằm & Nhung"
    },
    {
        "id": "mm_35",
        "index": 35,
        "hanzi": "双绉",
        "pinyin": "shuāng zhòu",
        "meanings": [
            "Lụa kếp Trung Quốc (crepe de China)",
            "lụa kếp trung quốc",
            "crepe de china",
            "lụa kếp trung quốc crepe de china"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b3",
        "lessonLabel": "Bài 3",
        "lessonTopic": "Lụa Tơ Tằm & Nhung"
    },
    {
        "id": "mm_36",
        "index": 36,
        "hanzi": "绉纱, 绉丝",
        "pinyin": "zhòushā, zhòu sī",
        "meanings": [
            "Lụa kếp, nhiễu",
            "lụa kếp",
            "nhiễu"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b3",
        "lessonLabel": "Bài 3",
        "lessonTopic": "Lụa Tơ Tằm & Nhung"
    },
    {
        "id": "mm_37",
        "index": 37,
        "hanzi": "斜纹绸",
        "pinyin": "xiéwén chóu",
        "meanings": [
            "Lụa sợ chéo"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b3",
        "lessonLabel": "Bài 3",
        "lessonTopic": "Lụa Tơ Tằm & Nhung"
    },
    {
        "id": "mm_38",
        "index": 38,
        "hanzi": "茧绸",
        "pinyin": "jiǎn chóu",
        "meanings": [
            "Lụa tơ tằm, lụa mộc",
            "lụa tơ tằm",
            "lụa mộc"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b3",
        "lessonLabel": "Bài 3",
        "lessonTopic": "Lụa Tơ Tằm & Nhung"
    },
    {
        "id": "mm_39",
        "index": 39,
        "hanzi": "蚕丝细薄绸",
        "pinyin": "cánsī xì bó chóu",
        "meanings": [
            "Lụa tơ tằm mỏng"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b3",
        "lessonLabel": "Bài 3",
        "lessonTopic": "Lụa Tơ Tằm & Nhung"
    },
    {
        "id": "mm_40",
        "index": 40,
        "hanzi": "金丝透明绸",
        "pinyin": "jīn sī tòumíng chóu",
        "meanings": [
            "Lụa tơ vàng mỏng"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b3",
        "lessonLabel": "Bài 3",
        "lessonTopic": "Lụa Tơ Tằm & Nhung"
    },
    {
        "id": "mm_41",
        "index": 41,
        "hanzi": "布商",
        "pinyin": "bù shāng",
        "meanings": [
            "Người buôn vải"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b3",
        "lessonLabel": "Bài 3",
        "lessonTopic": "Lụa Tơ Tằm & Nhung"
    },
    {
        "id": "mm_42",
        "index": 42,
        "hanzi": "丝织品经销人",
        "pinyin": "sīzhīpǐn jīngxiāo rén",
        "meanings": [
            "Người kinh doanh hàng tơ lụa"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b3",
        "lessonLabel": "Bài 3",
        "lessonTopic": "Lụa Tơ Tằm & Nhung"
    },
    {
        "id": "mm_43",
        "index": 43,
        "hanzi": "派力斯绉",
        "pinyin": "pài lì sī zhòu",
        "meanings": [
            "Nhiễu palétxơ"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b3",
        "lessonLabel": "Bài 3",
        "lessonTopic": "Lụa Tơ Tằm & Nhung"
    },
    {
        "id": "mm_44",
        "index": 44,
        "hanzi": "灯心绒",
        "pinyin": "dēngxīnróng",
        "meanings": [
            "Nhung kẻ"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b3",
        "lessonLabel": "Bài 3",
        "lessonTopic": "Lụa Tơ Tằm & Nhung"
    },
    {
        "id": "mm_45",
        "index": 45,
        "hanzi": "鸭绒",
        "pinyin": "yāróng",
        "meanings": [
            "Nhung lông vịt"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b3",
        "lessonLabel": "Bài 3",
        "lessonTopic": "Lụa Tơ Tằm & Nhung"
    },
    {
        "id": "mm_46",
        "index": 46,
        "hanzi": "平绒",
        "pinyin": "píngróng",
        "meanings": [
            "Nhung mịn (vải bông mặt chần nhung)",
            "nhung mịn",
            "vải bông mặt chần nhung",
            "nhung mịn vải bông mặt chần nhung"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b3",
        "lessonLabel": "Bài 3",
        "lessonTopic": "Lụa Tơ Tằm & Nhung"
    },
    {
        "id": "mm_47",
        "index": 47,
        "hanzi": "丝绒",
        "pinyin": "sīróng",
        "meanings": [
            "Nhung tơ"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b3",
        "lessonLabel": "Bài 3",
        "lessonTopic": "Lụa Tơ Tằm & Nhung"
    },
    {
        "id": "mm_48",
        "index": 48,
        "hanzi": "原纤染色",
        "pinyin": "yuán xiān rǎnsè",
        "meanings": [
            "Nhuộm ngay từ sợi"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b3",
        "lessonLabel": "Bài 3",
        "lessonTopic": "Lụa Tơ Tằm & Nhung"
    },
    {
        "id": "mm_49",
        "index": 49,
        "hanzi": "尼龙",
        "pinyin": "nílóng",
        "meanings": [
            "Ni lông"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b4",
        "lessonLabel": "Bài 4",
        "lessonTopic": "Tơ Sợi & Vải Bạt"
    },
    {
        "id": "mm_50",
        "index": 50,
        "hanzi": "安哥拉呢",
        "pinyin": "āngēlā ní",
        "meanings": [
            "Nỉ Ăng-gô-la",
            "nỉ ăng gô la",
            "nỉ ănggôla"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b4",
        "lessonLabel": "Bài 4",
        "lessonTopic": "Tơ Sợi & Vải Bạt"
    },
    {
        "id": "mm_51",
        "index": 51,
        "hanzi": "薄缎",
        "pinyin": "bó duàn",
        "meanings": [
            "Satanh mỏng, vải satinet",
            "satanh mỏng",
            "vải satinet",
            "satinet"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b4",
        "lessonLabel": "Bài 4",
        "lessonTopic": "Tơ Sợi & Vải Bạt"
    },
    {
        "id": "mm_52",
        "index": 52,
        "hanzi": "织锦缎",
        "pinyin": "zhī jǐnduàn",
        "meanings": [
            "Satin gấm"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b4",
        "lessonLabel": "Bài 4",
        "lessonTopic": "Tơ Sợi & Vải Bạt"
    },
    {
        "id": "mm_53",
        "index": 53,
        "hanzi": "的确良",
        "pinyin": "díquèliáng",
        "meanings": [
            "Sợi dacron (sợi tổng hợp)",
            "sợi dacron",
            "sợi tổng hợp",
            "sợi dacron sợi tổng hợp"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b4",
        "lessonLabel": "Bài 4",
        "lessonTopic": "Tơ Sợi & Vải Bạt"
    },
    {
        "id": "mm_54",
        "index": 54,
        "hanzi": "毛的确良",
        "pinyin": "máo díquèliáng",
        "meanings": [
            "Sợi len tổng hợp"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b4",
        "lessonLabel": "Bài 4",
        "lessonTopic": "Tơ Sợi & Vải Bạt"
    },
    {
        "id": "mm_55",
        "index": 55,
        "hanzi": "人造纤维",
        "pinyin": "rénzào xiānwéi",
        "meanings": [
            "Sợi nhân tạo"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b4",
        "lessonLabel": "Bài 4",
        "lessonTopic": "Tơ Sợi & Vải Bạt"
    },
    {
        "id": "mm_56",
        "index": 56,
        "hanzi": "涤纶",
        "pinyin": "dílún",
        "meanings": [
            "Terylen (sợi tổng hợp)",
            "terylen",
            "sợi tổng hợp",
            "terylen sợi tổng hợp"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b4",
        "lessonLabel": "Bài 4",
        "lessonTopic": "Tơ Sợi & Vải Bạt"
    },
    {
        "id": "mm_57",
        "index": 57,
        "hanzi": "醋酯人造丝",
        "pinyin": "cù zhǐ rénzào sī",
        "meanings": [
            "Tơ axetat"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b4",
        "lessonLabel": "Bài 4",
        "lessonTopic": "Tơ Sợi & Vải Bạt"
    },
    {
        "id": "mm_58",
        "index": 58,
        "hanzi": "丝绸",
        "pinyin": "sīchóu",
        "meanings": [
            "Tơ lụa"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b4",
        "lessonLabel": "Bài 4",
        "lessonTopic": "Tơ Sợi & Vải Bạt"
    },
    {
        "id": "mm_59",
        "index": 59,
        "hanzi": "人造丝",
        "pinyin": "rénzào sī",
        "meanings": [
            "Tơ nhân tạo"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b4",
        "lessonLabel": "Bài 4",
        "lessonTopic": "Tơ Sợi & Vải Bạt"
    },
    {
        "id": "mm_60",
        "index": 60,
        "hanzi": "三层织物",
        "pinyin": "sān céng zhīwù",
        "meanings": [
            "Vải ba lớp sợi",
            "ba lớp sợi"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b4",
        "lessonLabel": "Bài 4",
        "lessonTopic": "Tơ Sợi & Vải Bạt"
    },
    {
        "id": "mm_61",
        "index": 61,
        "hanzi": "帆布",
        "pinyin": "fānbù",
        "meanings": [
            "Vải bạt, vải bố",
            "vải bạt",
            "vải bố",
            "bạt",
            "bố"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b4",
        "lessonLabel": "Bài 4",
        "lessonTopic": "Tơ Sợi & Vải Bạt"
    },
    {
        "id": "mm_62",
        "index": 62,
        "hanzi": "棉布",
        "pinyin": "miánbù",
        "meanings": [
            "Vải bông, vải cotton",
            "vải bông",
            "vải cotton",
            "bông",
            "cotton"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b4",
        "lessonLabel": "Bài 4",
        "lessonTopic": "Tơ Sợi & Vải Bạt"
    },
    {
        "id": "mm_63",
        "index": 63,
        "hanzi": "仿丝薄棉布",
        "pinyin": "fǎng sī bó miánbù",
        "meanings": [
            "Vải bông ánh lụa",
            "bông ánh lụa"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b4",
        "lessonLabel": "Bài 4",
        "lessonTopic": "Tơ Sợi & Vải Bạt"
    },
    {
        "id": "mm_64",
        "index": 64,
        "hanzi": "硬挺织物",
        "pinyin": "yìngtǐng zhīwù",
        "meanings": [
            "Vải bông cứng",
            "bông cứng"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b4",
        "lessonLabel": "Bài 4",
        "lessonTopic": "Tơ Sợi & Vải Bạt"
    },
    {
        "id": "mm_65",
        "index": 65,
        "hanzi": "厚棉麻平纹布",
        "pinyin": "hòu mián má píngwén bù",
        "meanings": [
            "Vải dày",
            "dày"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b5",
        "lessonLabel": "Bài 5",
        "lessonTopic": "Vải Cashmere & Denim"
    },
    {
        "id": "mm_66",
        "index": 66,
        "hanzi": "印花棉布",
        "pinyin": "yìnhuā miánbù",
        "meanings": [
            "Vải bông in hoa",
            "bông in hoa"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b5",
        "lessonLabel": "Bài 5",
        "lessonTopic": "Vải Cashmere & Denim"
    },
    {
        "id": "mm_67",
        "index": 67,
        "hanzi": "格子布",
        "pinyin": "gé zǐ bù",
        "meanings": [
            "Vải carô",
            "carô"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b5",
        "lessonLabel": "Bài 5",
        "lessonTopic": "Vải Cashmere & Denim"
    },
    {
        "id": "mm_68",
        "index": 68,
        "hanzi": "开士米",
        "pinyin": "kāi shì mǐ",
        "meanings": [
            "Vải cashmere",
            "cashmere"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b5",
        "lessonLabel": "Bài 5",
        "lessonTopic": "Vải Cashmere & Denim"
    },
    {
        "id": "mm_69",
        "index": 69,
        "hanzi": "羊绒",
        "pinyin": "yángróng",
        "meanings": [
            "Vải cashmere, len casơmia",
            "vải cashmere",
            "len casơmia",
            "cashmere"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b5",
        "lessonLabel": "Bài 5",
        "lessonTopic": "Vải Cashmere & Denim"
    },
    {
        "id": "mm_70",
        "index": 70,
        "hanzi": "斜纹布",
        "pinyin": "xiéwénbù",
        "meanings": [
            "Vải chéo, vải vân chéo",
            "vải chéo",
            "vải vân chéo",
            "chéo",
            "vân chéo"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b5",
        "lessonLabel": "Bài 5",
        "lessonTopic": "Vải Cashmere & Denim"
    },
    {
        "id": "mm_71",
        "index": 71,
        "hanzi": "马裤呢",
        "pinyin": "mǎkù ní",
        "meanings": [
            "Vải chéo go dày (của Anh)",
            "vải chéo go dày",
            "của anh",
            "vải chéo go dày của anh",
            "chéo go dày (của anh)"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b5",
        "lessonLabel": "Bài 5",
        "lessonTopic": "Vải Cashmere & Denim"
    },
    {
        "id": "mm_72",
        "index": 72,
        "hanzi": "网眼文织物",
        "pinyin": "wǎngyǎn wén zhīwù",
        "meanings": [
            "Vải có vân mắt lưới",
            "có vân mắt lưới"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b5",
        "lessonLabel": "Bài 5",
        "lessonTopic": "Vải Cashmere & Denim"
    },
    {
        "id": "mm_73",
        "index": 73,
        "hanzi": "厚重织物",
        "pinyin": "hòuzhòng zhīwù",
        "meanings": [
            "Vải dày",
            "dày"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b5",
        "lessonLabel": "Bài 5",
        "lessonTopic": "Vải Cashmere & Denim"
    },
    {
        "id": "mm_74",
        "index": 74,
        "hanzi": "粗斜纹棉布",
        "pinyin": "cū xiéwén miánbù",
        "meanings": [
            "Vải denim, jean denim",
            "vải denim",
            "jean denim",
            "denim"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b5",
        "lessonLabel": "Bài 5",
        "lessonTopic": "Vải Cashmere & Denim"
    },
    {
        "id": "mm_75",
        "index": 75,
        "hanzi": "花边织物",
        "pinyin": "huābiān zhīwù",
        "meanings": [
            "Vải đăng ten",
            "đăng ten"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b5",
        "lessonLabel": "Bài 5",
        "lessonTopic": "Vải Cashmere & Denim"
    },
    {
        "id": "mm_76",
        "index": 76,
        "hanzi": "法兰绒",
        "pinyin": "fǎ lán róng",
        "meanings": [
            "Vải flanen",
            "flanen"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b5",
        "lessonLabel": "Bài 5",
        "lessonTopic": "Vải Cashmere & Denim"
    },
    {
        "id": "mm_77",
        "index": 77,
        "hanzi": "华达呢",
        "pinyin": "huádání",
        "meanings": [
            "Vải gabardine",
            "gabardine"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b5",
        "lessonLabel": "Bài 5",
        "lessonTopic": "Vải Cashmere & Denim"
    },
    {
        "id": "mm_78",
        "index": 78,
        "hanzi": "卡其布",
        "pinyin": "kǎqí bù",
        "meanings": [
            "Vải kaki",
            "kaki"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b5",
        "lessonLabel": "Bài 5",
        "lessonTopic": "Vải Cashmere & Denim"
    },
    {
        "id": "mm_79",
        "index": 79,
        "hanzi": "双幅布",
        "pinyin": "shuāngfú bù",
        "meanings": [
            "Vải khổ đúp",
            "khổ đúp"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b5",
        "lessonLabel": "Bài 5",
        "lessonTopic": "Vải Cashmere & Denim"
    },
    {
        "id": "mm_80",
        "index": 80,
        "hanzi": "狭幅布",
        "pinyin": "xiá fú bù",
        "meanings": [
            "Vải khổ hẹp",
            "khổ hẹp"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b5",
        "lessonLabel": "Bài 5",
        "lessonTopic": "Vải Cashmere & Denim"
    },
    {
        "id": "mm_81",
        "index": 81,
        "hanzi": "宽幅布",
        "pinyin": "kuān fú bù",
        "meanings": [
            "Vải khổ rộng",
            "khổ rộng"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b6",
        "lessonLabel": "Bài 6",
        "lessonTopic": "Vải Lanh, Ren & Muxơlin"
    },
    {
        "id": "mm_82",
        "index": 82,
        "hanzi": "亚麻织物",
        "pinyin": "yàmá zhīwù",
        "meanings": [
            "Vải lanh",
            "lanh"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b6",
        "lessonLabel": "Bài 6",
        "lessonTopic": "Vải Lanh, Ren & Muxơlin"
    },
    {
        "id": "mm_83",
        "index": 83,
        "hanzi": "原色哔叽",
        "pinyin": "yuánsè bìjī",
        "meanings": [
            "Vải len mộc",
            "len mộc"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b6",
        "lessonLabel": "Bài 6",
        "lessonTopic": "Vải Lanh, Ren & Muxơlin"
    },
    {
        "id": "mm_84",
        "index": 84,
        "hanzi": "疵布",
        "pinyin": "cī bù",
        "meanings": [
            "Vải lỗi",
            "lỗi"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b6",
        "lessonLabel": "Bài 6",
        "lessonTopic": "Vải Lanh, Ren & Muxơlin"
    },
    {
        "id": "mm_85",
        "index": 85,
        "hanzi": "网眼织物",
        "pinyin": "wǎngyǎn zhīwù",
        "meanings": [
            "Vải mắt lưới",
            "mắt lưới"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b6",
        "lessonLabel": "Bài 6",
        "lessonTopic": "Vải Lanh, Ren & Muxơlin"
    },
    {
        "id": "mm_86",
        "index": 86,
        "hanzi": "质地细的织物",
        "pinyin": "zhídì xì de zhīwù",
        "meanings": [
            "Vải mịn",
            "mịn"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b6",
        "lessonLabel": "Bài 6",
        "lessonTopic": "Vải Lanh, Ren & Muxơlin"
    },
    {
        "id": "mm_87",
        "index": 87,
        "hanzi": "平纹细布",
        "pinyin": "píngwén xìbù",
        "meanings": [
            "Vải muxơlin",
            "muxơlin"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b6",
        "lessonLabel": "Bài 6",
        "lessonTopic": "Vải Lanh, Ren & Muxơlin"
    },
    {
        "id": "mm_88",
        "index": 88,
        "hanzi": "绉面织物, 皱纹织物",
        "pinyin": "zhòu miàn zhīwù, zhòuwén zhīwù",
        "meanings": [
            "Vải nhăn",
            "nhăn"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b6",
        "lessonLabel": "Bài 6",
        "lessonTopic": "Vải Lanh, Ren & Muxơlin"
    },
    {
        "id": "mm_89",
        "index": 89,
        "hanzi": "绒布",
        "pinyin": "róngbù",
        "meanings": [
            "Vải nhung",
            "nhung"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b6",
        "lessonLabel": "Bài 6",
        "lessonTopic": "Vải Lanh, Ren & Muxơlin"
    },
    {
        "id": "mm_90",
        "index": 90,
        "hanzi": "厚双面绒布",
        "pinyin": "hòu shuāng miàn róngbù",
        "meanings": [
            "Vải nhung dày 2 mặt (như nhau)",
            "vải nhung dày 2 mặt",
            "như nhau",
            "vải nhung dày 2 mặt như nhau",
            "nhung dày 2 mặt (như nhau)"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b6",
        "lessonLabel": "Bài 6",
        "lessonTopic": "Vải Lanh, Ren & Muxơlin"
    },
    {
        "id": "mm_91",
        "index": 91,
        "hanzi": "府绸, 毛葛",
        "pinyin": "fǔchóu, máo gé",
        "meanings": [
            "Vải pôpơlin",
            "pôpơlin"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b6",
        "lessonLabel": "Bài 6",
        "lessonTopic": "Vải Lanh, Ren & Muxơlin"
    },
    {
        "id": "mm_92",
        "index": 92,
        "hanzi": "花府绸",
        "pinyin": "huā fǔchóu",
        "meanings": [
            "Vải pôpơlin hoa",
            "pôpơlin hoa"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b6",
        "lessonLabel": "Bài 6",
        "lessonTopic": "Vải Lanh, Ren & Muxơlin"
    },
    {
        "id": "mm_93",
        "index": 93,
        "hanzi": "网眼窗帘布",
        "pinyin": "wǎngyǎn chuānglián bù",
        "meanings": [
            "Vải rèm cửa sổ mắt lưới",
            "rèm cửa sổ mắt lưới"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b6",
        "lessonLabel": "Bài 6",
        "lessonTopic": "Vải Lanh, Ren & Muxơlin"
    },
    {
        "id": "mm_94",
        "index": 94,
        "hanzi": "花边纱",
        "pinyin": "huābiān shā",
        "meanings": [
            "Vải ren",
            "ren"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b6",
        "lessonLabel": "Bài 6",
        "lessonTopic": "Vải Lanh, Ren & Muxơlin"
    },
    {
        "id": "mm_95",
        "index": 95,
        "hanzi": "缎子",
        "pinyin": "duànzi",
        "meanings": [
            "Vải satanh, vóc",
            "vải satanh",
            "vóc",
            "satanh"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b6",
        "lessonLabel": "Bài 6",
        "lessonTopic": "Vải Lanh, Ren & Muxơlin"
    },
    {
        "id": "mm_96",
        "index": 96,
        "hanzi": "条子布",
        "pinyin": "tiáo zǐ bù",
        "meanings": [
            "Vải sọc, vải kẻ sọc",
            "vải sọc",
            "vải kẻ sọc",
            "sọc",
            "kẻ sọc"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b6",
        "lessonLabel": "Bài 6",
        "lessonTopic": "Vải Lanh, Ren & Muxơlin"
    },
    {
        "id": "mm_97",
        "index": 97,
        "hanzi": "鸳鸯条子织物",
        "pinyin": "yuānyāng tiáozi zhīwù",
        "meanings": [
            "Vải sọc bóng",
            "sọc bóng"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b7",
        "lessonLabel": "Bài 7",
        "lessonTopic": "Vải Thun & Giao Hàng"
    },
    {
        "id": "mm_98",
        "index": 98,
        "hanzi": "泡泡纱",
        "pinyin": "pàopaoshā",
        "meanings": [
            "Vải sọc nhăn",
            "sọc nhăn"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b7",
        "lessonLabel": "Bài 7",
        "lessonTopic": "Vải Thun & Giao Hàng"
    },
    {
        "id": "mm_99",
        "index": 99,
        "hanzi": "塔夫绸",
        "pinyin": "tǎ fū chóu",
        "meanings": [
            "Vải taffeta (vải bông giả tơ tằm)",
            "vải taffeta",
            "vải bông giả tơ tằm",
            "vải taffeta vải bông giả tơ tằm",
            "taffeta (vải bông giả tơ tằm)"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b7",
        "lessonLabel": "Bài 7",
        "lessonTopic": "Vải Thun & Giao Hàng"
    },
    {
        "id": "mm_100",
        "index": 100,
        "hanzi": "硬挺塔夫绸",
        "pinyin": "yìngtǐng tǎ fū chóu",
        "meanings": [
            "Vải taffeta cứng",
            "taffeta cứng"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b7",
        "lessonLabel": "Bài 7",
        "lessonTopic": "Vải Thun & Giao Hàng"
    },
    {
        "id": "mm_101",
        "index": 101,
        "hanzi": "雪纺绸",
        "pinyin": "xuě fǎng chóu",
        "meanings": [
            "Vải the, vải sa",
            "vải the",
            "vải sa",
            "the",
            "sa"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b7",
        "lessonLabel": "Bài 7",
        "lessonTopic": "Vải Thun & Giao Hàng"
    },
    {
        "id": "mm_102",
        "index": 102,
        "hanzi": "质地粗的织物",
        "pinyin": "zhídì cū de zhīwù",
        "meanings": [
            "Vải thô",
            "thô"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b7",
        "lessonLabel": "Bài 7",
        "lessonTopic": "Vải Thun & Giao Hàng"
    },
    {
        "id": "mm_103",
        "index": 103,
        "hanzi": "汗布",
        "pinyin": "hàn bù",
        "meanings": [
            "Vải thun",
            "thun"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b7",
        "lessonLabel": "Bài 7",
        "lessonTopic": "Vải Thun & Giao Hàng"
    },
    {
        "id": "mm_104",
        "index": 104,
        "hanzi": "纯棉汗布",
        "pinyin": "chún mián hàn bù",
        "meanings": [
            "Vải thun cotton 100%",
            "thun cotton 100%"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b7",
        "lessonLabel": "Bài 7",
        "lessonTopic": "Vải Thun & Giao Hàng"
    },
    {
        "id": "mm_105",
        "index": 105,
        "hanzi": "薄纱",
        "pinyin": "bó shā",
        "meanings": [
            "Vải tuyn",
            "tuyn"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b7",
        "lessonLabel": "Bài 7",
        "lessonTopic": "Vải Thun & Giao Hàng"
    },
    {
        "id": "mm_106",
        "index": 106,
        "hanzi": "花呢",
        "pinyin": "huāní",
        "meanings": [
            "Vải tuýt (vải len có bề mặt sần sùi)",
            "vải tuýt",
            "vải len có bề mặt sần sùi",
            "vải tuýt vải len có bề mặt sần sùi",
            "tuýt (vải len có bề mặt sần sùi)"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b7",
        "lessonLabel": "Bài 7",
        "lessonTopic": "Vải Thun & Giao Hàng"
    },
    {
        "id": "mm_107",
        "index": 107,
        "hanzi": "云斑织物",
        "pinyin": "yún bān zhī wù",
        "meanings": [
            "Vải vân mây",
            "vân mây"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b7",
        "lessonLabel": "Bài 7",
        "lessonTopic": "Vải Thun & Giao Hàng"
    },
    {
        "id": "mm_108",
        "index": 108,
        "hanzi": "哔叽, 哔叽呢",
        "pinyin": "bìjī, bìjī ní",
        "meanings": [
            "Vải xéc",
            "xéc"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b7",
        "lessonLabel": "Bài 7",
        "lessonTopic": "Vải Thun & Giao Hàng"
    },
    {
        "id": "mm_109",
        "index": 109,
        "hanzi": "绉缎",
        "pinyin": "zhòu duàn",
        "meanings": [
            "Vóc nhiễu, satin lụa",
            "vóc nhiễu",
            "satin lụa"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b7",
        "lessonLabel": "Bài 7",
        "lessonTopic": "Vải Thun & Giao Hàng"
    },
    {
        "id": "mm_110",
        "index": 110,
        "hanzi": "仓库交货",
        "pinyin": "Cāngkù jiāo huò",
        "meanings": [
            "Giao hàng tại kho"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b7",
        "lessonLabel": "Bài 7",
        "lessonTopic": "Vải Thun & Giao Hàng"
    },
    {
        "id": "mm_111",
        "index": 111,
        "hanzi": "边境交货",
        "pinyin": "Biānjìng jiāo huò",
        "meanings": [
            "Giao tại biên giới"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b7",
        "lessonLabel": "Bài 7",
        "lessonTopic": "Vải Thun & Giao Hàng"
    },
    {
        "id": "mm_112",
        "index": 112,
        "hanzi": "近期交货",
        "pinyin": "Jìnqí jiāo huò",
        "meanings": [
            "Giao hàng vào thời gian gần"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b7",
        "lessonLabel": "Bài 7",
        "lessonTopic": "Vải Thun & Giao Hàng"
    },
    {
        "id": "mm_113",
        "index": 113,
        "hanzi": "远期交货",
        "pinyin": "Yuǎn qī jiāo huò",
        "meanings": [
            "Giao hàng về sau, giao sau",
            "giao hàng về sau",
            "giao sau"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b8",
        "lessonLabel": "Bài 8",
        "lessonTopic": "Thiết Bị & Máy May"
    },
    {
        "id": "mm_114",
        "index": 114,
        "hanzi": "定期交货",
        "pinyin": "Dìngqí jiāo huò",
        "meanings": [
            "Giao hàng định kỳ"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b8",
        "lessonLabel": "Bài 8",
        "lessonTopic": "Thiết Bị & Máy May"
    },
    {
        "id": "mm_115",
        "index": 115,
        "hanzi": "交货时间",
        "pinyin": "Jiāo huò shíjiān",
        "meanings": [
            "Thời gian giao hàng"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b8",
        "lessonLabel": "Bài 8",
        "lessonTopic": "Thiết Bị & Máy May"
    },
    {
        "id": "mm_116",
        "index": 116,
        "hanzi": "交货地点",
        "pinyin": "Jiāo huò dìdiǎn",
        "meanings": [
            "Địa điểm giao hàng"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b8",
        "lessonLabel": "Bài 8",
        "lessonTopic": "Thiết Bị & Máy May"
    },
    {
        "id": "mm_117",
        "index": 117,
        "hanzi": "交货方式",
        "pinyin": "Jiāo huò fāngshì",
        "meanings": [
            "Phương thức giao hàng"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b8",
        "lessonLabel": "Bài 8",
        "lessonTopic": "Thiết Bị & Máy May"
    },
    {
        "id": "mm_118",
        "index": 118,
        "hanzi": "货物运费",
        "pinyin": "Huòwù yùnfèi",
        "meanings": [
            "Phí vận chuyển hàng hóa"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b8",
        "lessonLabel": "Bài 8",
        "lessonTopic": "Thiết Bị & Máy May"
    },
    {
        "id": "mm_119",
        "index": 119,
        "hanzi": "缝纫机",
        "pinyin": "Féng rèn jī",
        "meanings": [
            "Máy may",
            "may"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b8",
        "lessonLabel": "Bài 8",
        "lessonTopic": "Thiết Bị & Máy May"
    },
    {
        "id": "mm_120",
        "index": 120,
        "hanzi": "锁眼机",
        "pinyin": "Suǒ yǎn jī",
        "meanings": [
            "Máy thùa khuy",
            "thùa khuy"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b8",
        "lessonLabel": "Bài 8",
        "lessonTopic": "Thiết Bị & Máy May"
    },
    {
        "id": "mm_121",
        "index": 121,
        "hanzi": "圆头锁眼机",
        "pinyin": "Yuán tóu suǒ yǎn jī",
        "meanings": [
            "Máy thùa khuy đầu tròn",
            "thùa khuy đầu tròn"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b8",
        "lessonLabel": "Bài 8",
        "lessonTopic": "Thiết Bị & Máy May"
    },
    {
        "id": "mm_122",
        "index": 122,
        "hanzi": "平头锁眼机",
        "pinyin": "Píng tóu suǒ yǎn jī",
        "meanings": [
            "Máy thùa khuy đầu bằng",
            "thùa khuy đầu bằng"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b8",
        "lessonLabel": "Bài 8",
        "lessonTopic": "Thiết Bị & Máy May"
    },
    {
        "id": "mm_123",
        "index": 123,
        "hanzi": "电子花样机",
        "pinyin": "Diànzǐ huā yàng jī",
        "meanings": [
            "Máy chương trình",
            "chương trình"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b8",
        "lessonLabel": "Bài 8",
        "lessonTopic": "Thiết Bị & Máy May"
    },
    {
        "id": "mm_124",
        "index": 124,
        "hanzi": "套结机",
        "pinyin": "Tào jié jī",
        "meanings": [
            "Máy đính bọ",
            "đính bọ"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b8",
        "lessonLabel": "Bài 8",
        "lessonTopic": "Thiết Bị & Máy May"
    },
    {
        "id": "mm_125",
        "index": 125,
        "hanzi": "钉扣机",
        "pinyin": "Dīng kòu jī",
        "meanings": [
            "Máy đính cúc",
            "đính cúc"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b8",
        "lessonLabel": "Bài 8",
        "lessonTopic": "Thiết Bị & Máy May"
    },
    {
        "id": "mm_126",
        "index": 126,
        "hanzi": "麦夹机",
        "pinyin": "Mài jiā jī",
        "meanings": [
            "Máy cuốn ống",
            "cuốn ống"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b8",
        "lessonLabel": "Bài 8",
        "lessonTopic": "Thiết Bị & Máy May"
    },
    {
        "id": "mm_127",
        "index": 127,
        "hanzi": "包缝机",
        "pinyin": "Bāo fèng jī",
        "meanings": [
            "Máy vắt sổ",
            "vắt sổ"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b8",
        "lessonLabel": "Bài 8",
        "lessonTopic": "Thiết Bị & Máy May"
    },
    {
        "id": "mm_128",
        "index": 128,
        "hanzi": "绷缝机",
        "pinyin": "Běng fèng jī",
        "meanings": [
            "Máy trần đè",
            "trần đè"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b8",
        "lessonLabel": "Bài 8",
        "lessonTopic": "Thiết Bị & Máy May"
    },
    {
        "id": "mm_129",
        "index": 129,
        "hanzi": "断带机",
        "pinyin": "Duàn dài jī",
        "meanings": [
            "Máy cắt nhám (cắt dây đai)",
            "máy cắt nhám",
            "cắt dây đai",
            "máy cắt nhám cắt dây đai",
            "cắt nhám (cắt dây đai)"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b9",
        "lessonLabel": "Bài 9",
        "lessonTopic": "Máy May Chuyên Dụng"
    },
    {
        "id": "mm_130",
        "index": 130,
        "hanzi": "曲折缝系列",
        "pinyin": "Qū zhé fèng xìliè",
        "meanings": [
            "Máy zigzag",
            "zigzag"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b9",
        "lessonLabel": "Bài 9",
        "lessonTopic": "Máy May Chuyên Dụng"
    },
    {
        "id": "mm_131",
        "index": 131,
        "hanzi": "带刀平缝机",
        "pinyin": "Dài dāo píng fèng jī",
        "meanings": [
            "Máy 1 kim xén",
            "1 kim xén"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b9",
        "lessonLabel": "Bài 9",
        "lessonTopic": "Máy May Chuyên Dụng"
    },
    {
        "id": "mm_132",
        "index": 132,
        "hanzi": "盲缝机",
        "pinyin": "Máng fèng jī",
        "meanings": [
            "Máy vắt gấu",
            "vắt gấu"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b9",
        "lessonLabel": "Bài 9",
        "lessonTopic": "Máy May Chuyên Dụng"
    },
    {
        "id": "mm_133",
        "index": 133,
        "hanzi": "双针机",
        "pinyin": "Shuāng zhēn jī",
        "meanings": [
            "Máy 2 kim",
            "2 kim"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b9",
        "lessonLabel": "Bài 9",
        "lessonTopic": "Máy May Chuyên Dụng"
    },
    {
        "id": "mm_134",
        "index": 134,
        "hanzi": "上袖机",
        "pinyin": "Shàng xiù jī",
        "meanings": [
            "Máy tra tay",
            "tra tay"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b9",
        "lessonLabel": "Bài 9",
        "lessonTopic": "Máy May Chuyên Dụng"
    },
    {
        "id": "mm_135",
        "index": 135,
        "hanzi": "开袋机",
        "pinyin": "Kāi dài jī",
        "meanings": [
            "Máy bổ túi",
            "bổ túi"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b9",
        "lessonLabel": "Bài 9",
        "lessonTopic": "Máy May Chuyên Dụng"
    },
    {
        "id": "mm_136",
        "index": 136,
        "hanzi": "橡筋机",
        "pinyin": "Xiàng jīn jī",
        "meanings": [
            "Máy căn sai",
            "căn sai"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b9",
        "lessonLabel": "Bài 9",
        "lessonTopic": "Máy May Chuyên Dụng"
    },
    {
        "id": "mm_137",
        "index": 137,
        "hanzi": "压衬机",
        "pinyin": "Yā chèn jī",
        "meanings": [
            "Máy ép mếch",
            "ép mếch"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b9",
        "lessonLabel": "Bài 9",
        "lessonTopic": "Máy May Chuyên Dụng"
    },
    {
        "id": "mm_138",
        "index": 138,
        "hanzi": "验布机",
        "pinyin": "Yàn bù jī",
        "meanings": [
            "Máy kiểm vải",
            "kiểm vải"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b9",
        "lessonLabel": "Bài 9",
        "lessonTopic": "Máy May Chuyên Dụng"
    },
    {
        "id": "mm_139",
        "index": 139,
        "hanzi": "分线机",
        "pinyin": "Fēn xiàn jī",
        "meanings": [
            "Máy phân chỉ",
            "phân chỉ"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b9",
        "lessonLabel": "Bài 9",
        "lessonTopic": "Máy May Chuyên Dụng"
    },
    {
        "id": "mm_140",
        "index": 140,
        "hanzi": "洞洞机",
        "pinyin": "Dòng dòng jī",
        "meanings": [
            "Máy trần viền",
            "trần viền"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b9",
        "lessonLabel": "Bài 9",
        "lessonTopic": "Máy May Chuyên Dụng"
    },
    {
        "id": "mm_141",
        "index": 141,
        "hanzi": "缝纫机零件",
        "pinyin": "Féng rèn jī língjiàn",
        "meanings": [
            "Linh kiện máy may"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b9",
        "lessonLabel": "Bài 9",
        "lessonTopic": "Máy May Chuyên Dụng"
    },
    {
        "id": "mm_142",
        "index": 142,
        "hanzi": "针板",
        "pinyin": "Zhēn bǎn",
        "meanings": [
            "mặt nguyệt"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b9",
        "lessonLabel": "Bài 9",
        "lessonTopic": "Máy May Chuyên Dụng"
    },
    {
        "id": "mm_143",
        "index": 143,
        "hanzi": "押脚",
        "pinyin": "Yā jiǎo",
        "meanings": [
            "chân vịt"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b9",
        "lessonLabel": "Bài 9",
        "lessonTopic": "Máy May Chuyên Dụng"
    },
    {
        "id": "mm_144",
        "index": 144,
        "hanzi": "单针(电脑)平机",
        "pinyin": "Dān zhēn (diànnǎo) píng jī",
        "meanings": [
            "máy 1 kim (điện tử)",
            "máy 1 kim",
            "điện tử",
            "máy 1 kim điện tử",
            "1 kim (điện tử)"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b9",
        "lessonLabel": "Bài 9",
        "lessonTopic": "Máy May Chuyên Dụng"
    },
    {
        "id": "mm_145",
        "index": 145,
        "hanzi": "双针(电脑)机",
        "pinyin": "Shuāng zhēn (diànnǎo) jī",
        "meanings": [
            "máy 2 kim (điện tử)",
            "máy 2 kim",
            "điện tử",
            "máy 2 kim điện tử",
            "2 kim (điện tử)"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b10",
        "lessonLabel": "Bài 10",
        "lessonTopic": "Linh Kiện Máy May"
    },
    {
        "id": "mm_146",
        "index": 146,
        "hanzi": "打结机",
        "pinyin": "Dǎ jié jī",
        "meanings": [
            "máy đánh bọ",
            "đánh bọ"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b10",
        "lessonLabel": "Bài 10",
        "lessonTopic": "Linh Kiện Máy May"
    },
    {
        "id": "mm_147",
        "index": 147,
        "hanzi": "曲手机",
        "pinyin": "Qū shǒujī",
        "meanings": [
            "máy cùi chỏ",
            "cùi chỏ"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b10",
        "lessonLabel": "Bài 10",
        "lessonTopic": "Linh Kiện Máy May"
    },
    {
        "id": "mm_148",
        "index": 148,
        "hanzi": "钉扣机",
        "pinyin": "Dīng kòu jī",
        "meanings": [
            "máy đính nút",
            "đính nút"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b10",
        "lessonLabel": "Bài 10",
        "lessonTopic": "Linh Kiện Máy May"
    },
    {
        "id": "mm_149",
        "index": 149,
        "hanzi": "凤眼机",
        "pinyin": "Fèng yǎn jī",
        "meanings": [
            "thùa khuy mắt phụng"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b10",
        "lessonLabel": "Bài 10",
        "lessonTopic": "Linh Kiện Máy May"
    },
    {
        "id": "mm_150",
        "index": 150,
        "hanzi": "滚边机",
        "pinyin": "Gǔn biān jī",
        "meanings": [
            "máy cuốn sườn",
            "cuốn sườn"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b10",
        "lessonLabel": "Bài 10",
        "lessonTopic": "Linh Kiện Máy May"
    },
    {
        "id": "mm_151",
        "index": 151,
        "hanzi": "台板",
        "pinyin": "Tái bǎn",
        "meanings": [
            "bàn"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b10",
        "lessonLabel": "Bài 10",
        "lessonTopic": "Linh Kiện Máy May"
    },
    {
        "id": "mm_152",
        "index": 152,
        "hanzi": "脚架",
        "pinyin": "Jiǎo jià",
        "meanings": [
            "chân bàn"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b10",
        "lessonLabel": "Bài 10",
        "lessonTopic": "Linh Kiện Máy May"
    },
    {
        "id": "mm_153",
        "index": 153,
        "hanzi": "压脚踏板",
        "pinyin": "Yājiǎo tàbǎn",
        "meanings": [
            "Bàn đạp (nâng chân vịt)",
            "bàn đạp",
            "nâng chân vịt",
            "bàn đạp nâng chân vịt"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b10",
        "lessonLabel": "Bài 10",
        "lessonTopic": "Linh Kiện Máy May"
    },
    {
        "id": "mm_154",
        "index": 154,
        "hanzi": "夹线器",
        "pinyin": "Jiā xiàn qì",
        "meanings": [
            "Kẹp chỉ"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b10",
        "lessonLabel": "Bài 10",
        "lessonTopic": "Linh Kiện Máy May"
    },
    {
        "id": "mm_155",
        "index": 155,
        "hanzi": "针位组",
        "pinyin": "Zhēn wèi zǔ",
        "meanings": [
            "Bộ cự li"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b10",
        "lessonLabel": "Bài 10",
        "lessonTopic": "Linh Kiện Máy May"
    },
    {
        "id": "mm_156",
        "index": 156,
        "hanzi": "皮带",
        "pinyin": "Pídài",
        "meanings": [
            "Dây cu-roa",
            "dây cu roa",
            "dây curoa"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b10",
        "lessonLabel": "Bài 10",
        "lessonTopic": "Linh Kiện Máy May"
    },
    {
        "id": "mm_157",
        "index": 157,
        "hanzi": "皮带轮",
        "pinyin": "Pídài lún",
        "meanings": [
            "Poly (puly)",
            "poly",
            "puly",
            "poly puly"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b10",
        "lessonLabel": "Bài 10",
        "lessonTopic": "Linh Kiện Máy May"
    },
    {
        "id": "mm_158",
        "index": 158,
        "hanzi": "弯针",
        "pinyin": "Wān zhēn",
        "meanings": [
            "Móc (chỉ, kim)",
            "móc (chỉ",
            "kim)",
            "móc",
            "chỉ, kim",
            "móc chỉ, kim"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b10",
        "lessonLabel": "Bài 10",
        "lessonTopic": "Linh Kiện Máy May"
    },
    {
        "id": "mm_159",
        "index": 159,
        "hanzi": "线架",
        "pinyin": "Xiàn jià",
        "meanings": [
            "Giá chỉ"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b10",
        "lessonLabel": "Bài 10",
        "lessonTopic": "Linh Kiện Máy May"
    },
    {
        "id": "mm_160",
        "index": 160,
        "hanzi": "线油",
        "pinyin": "Xiàn yóu",
        "meanings": [
            "Dầu chỉ"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b10",
        "lessonLabel": "Bài 10",
        "lessonTopic": "Linh Kiện Máy May"
    },
    {
        "id": "mm_161",
        "index": 161,
        "hanzi": "梭芯",
        "pinyin": "Suō xīn",
        "meanings": [
            "Suốt (vỏ khóa)",
            "suốt",
            "vỏ khóa",
            "suốt vỏ khóa"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b11",
        "lessonLabel": "Bài 11",
        "lessonTopic": "Phụ Liệu & Cắt May"
    },
    {
        "id": "mm_162",
        "index": 162,
        "hanzi": "梭壳",
        "pinyin": "Suō ké",
        "meanings": [
            "Thuyền (lõi khóa)",
            "thuyền",
            "lõi khóa",
            "thuyền lõi khóa"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b11",
        "lessonLabel": "Bài 11",
        "lessonTopic": "Phụ Liệu & Cắt May"
    },
    {
        "id": "mm_163",
        "index": 163,
        "hanzi": "喇叭",
        "pinyin": "Lǎbā",
        "meanings": [
            "Cử (cái loa)",
            "cử",
            "cái loa",
            "cử cái loa"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b11",
        "lessonLabel": "Bài 11",
        "lessonTopic": "Phụ Liệu & Cắt May"
    },
    {
        "id": "mm_164",
        "index": 164,
        "hanzi": "裁剪",
        "pinyin": "Cáijiǎn",
        "meanings": [
            "Cắt vải"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b11",
        "lessonLabel": "Bài 11",
        "lessonTopic": "Phụ Liệu & Cắt May"
    },
    {
        "id": "mm_165",
        "index": 165,
        "hanzi": "自动剪线机",
        "pinyin": "Zìdòng jiǎn xiàn jī",
        "meanings": [
            "Máy tự động cắt chỉ",
            "tự động cắt chỉ"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b11",
        "lessonLabel": "Bài 11",
        "lessonTopic": "Phụ Liệu & Cắt May"
    },
    {
        "id": "mm_166",
        "index": 166,
        "hanzi": "旋梭",
        "pinyin": "Xuán suō",
        "meanings": [
            "Ổ chao"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b11",
        "lessonLabel": "Bài 11",
        "lessonTopic": "Phụ Liệu & Cắt May"
    },
    {
        "id": "mm_167",
        "index": 167,
        "hanzi": "皮衣",
        "pinyin": "Píyī",
        "meanings": [
            "Quần áo da"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b11",
        "lessonLabel": "Bài 11",
        "lessonTopic": "Phụ Liệu & Cắt May"
    },
    {
        "id": "mm_168",
        "index": 168,
        "hanzi": "有袖上衣",
        "pinyin": "Yǒu xiù shàngyī",
        "meanings": [
            "Áo có tay"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b11",
        "lessonLabel": "Bài 11",
        "lessonTopic": "Phụ Liệu & Cắt May"
    },
    {
        "id": "mm_169",
        "index": 169,
        "hanzi": "皮大衣",
        "pinyin": "Pí dàyī",
        "meanings": [
            "Áo khoác da lông"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b11",
        "lessonLabel": "Bài 11",
        "lessonTopic": "Phụ Liệu & Cắt May"
    },
    {
        "id": "mm_170",
        "index": 170,
        "hanzi": "面布",
        "pinyin": "Miàn bù",
        "meanings": [
            "Vải bông",
            "bông"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b11",
        "lessonLabel": "Bài 11",
        "lessonTopic": "Phụ Liệu & Cắt May"
    },
    {
        "id": "mm_171",
        "index": 171,
        "hanzi": "咔叽布",
        "pinyin": "Kā jī bù",
        "meanings": [
            "Vải kaki",
            "kaki"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b11",
        "lessonLabel": "Bài 11",
        "lessonTopic": "Phụ Liệu & Cắt May"
    },
    {
        "id": "mm_172",
        "index": 172,
        "hanzi": "丝绸",
        "pinyin": "Sī chóu",
        "meanings": [
            "Tơ lụa"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b11",
        "lessonLabel": "Bài 11",
        "lessonTopic": "Phụ Liệu & Cắt May"
    },
    {
        "id": "mm_173",
        "index": 173,
        "hanzi": "缣绸",
        "pinyin": "Jiān chóu",
        "meanings": [
            "Tơ tằm"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b11",
        "lessonLabel": "Bài 11",
        "lessonTopic": "Phụ Liệu & Cắt May"
    },
    {
        "id": "mm_174",
        "index": 174,
        "hanzi": "平绒",
        "pinyin": "Píng róng",
        "meanings": [
            "Nhung mịn"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b11",
        "lessonLabel": "Bài 11",
        "lessonTopic": "Phụ Liệu & Cắt May"
    },
    {
        "id": "mm_175",
        "index": 175,
        "hanzi": "线缝",
        "pinyin": "xiàn fèng",
        "meanings": [
            "Đường may"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b11",
        "lessonLabel": "Bài 11",
        "lessonTopic": "Phụ Liệu & Cắt May"
    },
    {
        "id": "mm_176",
        "index": 176,
        "hanzi": "折边",
        "pinyin": "Zhé biān",
        "meanings": [
            "Viền"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b11",
        "lessonLabel": "Bài 11",
        "lessonTopic": "Phụ Liệu & Cắt May"
    },
    {
        "id": "mm_177",
        "index": 177,
        "hanzi": "口袋",
        "pinyin": "Kǒu dài",
        "meanings": [
            "Túi áo, quần",
            "túi áo",
            "quần"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b12",
        "lessonLabel": "Bài 12",
        "lessonTopic": "Chi Tiết Trang Phục & Ôn Tập"
    },
    {
        "id": "mm_178",
        "index": 178,
        "hanzi": "插袋",
        "pinyin": "Chā dài",
        "meanings": [
            "Túi phụ"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b12",
        "lessonLabel": "Bài 12",
        "lessonTopic": "Chi Tiết Trang Phục & Ôn Tập"
    },
    {
        "id": "mm_179",
        "index": 179,
        "hanzi": "胸袋",
        "pinyin": "Xiōng dài",
        "meanings": [
            "Túi ngực"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b12",
        "lessonLabel": "Bài 12",
        "lessonTopic": "Chi Tiết Trang Phục & Ôn Tập"
    },
    {
        "id": "mm_180",
        "index": 180,
        "hanzi": "暗袋",
        "pinyin": "Àn dài",
        "meanings": [
            "Túi chìm"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b12",
        "lessonLabel": "Bài 12",
        "lessonTopic": "Chi Tiết Trang Phục & Ôn Tập"
    },
    {
        "id": "mm_181",
        "index": 181,
        "hanzi": "有盖口袋",
        "pinyin": "Yǒu gài kǒudài",
        "meanings": [
            "Túi có nắp"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b12",
        "lessonLabel": "Bài 12",
        "lessonTopic": "Chi Tiết Trang Phục & Ôn Tập"
    },
    {
        "id": "mm_182",
        "index": 182,
        "hanzi": "垫肩",
        "pinyin": "Diàn jiān",
        "meanings": [
            "Lót vai (đệm vai)",
            "lót vai",
            "đệm vai",
            "lót vai đệm vai"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b12",
        "lessonLabel": "Bài 12",
        "lessonTopic": "Chi Tiết Trang Phục & Ôn Tập"
    },
    {
        "id": "mm_183",
        "index": 183,
        "hanzi": "袖子",
        "pinyin": "Xiùzi",
        "meanings": [
            "Ống tay áo"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b12",
        "lessonLabel": "Bài 12",
        "lessonTopic": "Chi Tiết Trang Phục & Ôn Tập"
    },
    {
        "id": "mm_184",
        "index": 184,
        "hanzi": "织物样本",
        "pinyin": "zhīwù yàngběn",
        "meanings": [
            "Bản mẫu hàng dệt (Ôn tập)",
            "Bản mẫu hàng dệt"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b12",
        "lessonLabel": "Bài 12",
        "lessonTopic": "Chi Tiết Trang Phục & Ôn Tập",
        "isReview": true
    },
    {
        "id": "mm_185",
        "index": 185,
        "hanzi": "原棉",
        "pinyin": "yuánmián",
        "meanings": [
            "Bông thô (Ôn tập)",
            "Bông thô"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b12",
        "lessonLabel": "Bài 12",
        "lessonTopic": "Chi Tiết Trang Phục & Ôn Tập",
        "isReview": true
    },
    {
        "id": "mm_186",
        "index": 186,
        "hanzi": "帆布",
        "pinyin": "fānbù",
        "meanings": [
            "Vải bạt, vải bố (Ôn tập)",
            "Vải bạt, vải bố",
            "vải bạt",
            "vải bố",
            "bạt",
            "bố"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b12",
        "lessonLabel": "Bài 12",
        "lessonTopic": "Chi Tiết Trang Phục & Ôn Tập",
        "isReview": true
    },
    {
        "id": "mm_187",
        "index": 187,
        "hanzi": "牛仔布",
        "pinyin": "niúzǎibù",
        "meanings": [
            "Vải denim, jean (Ôn tập)",
            "Vải denim, jean",
            "vải denim",
            "jean",
            "denim"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b12",
        "lessonLabel": "Bài 12",
        "lessonTopic": "Chi Tiết Trang Phục & Ôn Tập",
        "isReview": true
    },
    {
        "id": "mm_188",
        "index": 188,
        "hanzi": "汗布",
        "pinyin": "hàn bù",
        "meanings": [
            "Vải thun (Ôn tập)",
            "Vải thun",
            "thun"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b12",
        "lessonLabel": "Bài 12",
        "lessonTopic": "Chi Tiết Trang Phục & Ôn Tập",
        "isReview": true
    },
    {
        "id": "mm_189",
        "index": 189,
        "hanzi": "缝纫机",
        "pinyin": "Féng rèn jī",
        "meanings": [
            "Máy may (Ôn tập)",
            "Máy may",
            "may"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b12",
        "lessonLabel": "Bài 12",
        "lessonTopic": "Chi Tiết Trang Phục & Ôn Tập",
        "isReview": true
    },
    {
        "id": "mm_190",
        "index": 190,
        "hanzi": "包缝机",
        "pinyin": "Bāo fèng jī",
        "meanings": [
            "Máy vắt sổ (Ôn tập)",
            "Máy vắt sổ",
            "vắt sổ"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b12",
        "lessonLabel": "Bài 12",
        "lessonTopic": "Chi Tiết Trang Phục & Ôn Tập",
        "isReview": true
    },
    {
        "id": "mm_191",
        "index": 191,
        "hanzi": "压脚",
        "pinyin": "Yā jiǎo",
        "meanings": [
            "Chân vịt (Ôn tập)",
            "Chân vịt"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b12",
        "lessonLabel": "Bài 12",
        "lessonTopic": "Chi Tiết Trang Phục & Ôn Tập",
        "isReview": true
    },
    {
        "id": "mm_192",
        "index": 192,
        "hanzi": "线缝",
        "pinyin": "xiàn fèng",
        "meanings": [
            "Đường may (Ôn tập)",
            "Đường may"
        ],
        "category": "may-mac",
        "categoryLabel": "May Mặc",
        "lesson": "b12",
        "lessonLabel": "Bài 12",
        "lessonTopic": "Chi Tiết Trang Phục & Ôn Tập",
        "isReview": true
    }
];
