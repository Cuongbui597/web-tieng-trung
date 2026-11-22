export interface SentenceItem {
    id: string;
    lesson: 'buoi-1' | 'buoi-2';
    lessonLabel: string;
    targetWord: string;
    vietnamese: string;
    fullHanzi: string;
    fullPinyin: string;
    chunks: string[];
    grammarTag: 'cau-chu-ba' | 'luong-tu' | 'vi-tri' | 'bo-ngu' | 'giao-tiep';
    grammarNote: string;
}

export const SENTENCE_DATABASE: SentenceItem[] = [
    {
        "id": "s_b1_1",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "桌子",
        "vietnamese": "Trong ký túc xá mới mua một cái bàn.",
        "fullHanzi": "宿舍里新买了一张桌子。",
        "fullPinyin": "Sùshè lǐ xīn mǎi le yì zhāng zhuōzi.",
        "chunks": [
            "宿舍里",
            "新买了",
            "一张",
            "桌子。"
        ],
        "grammarTag": "luong-tu",
        "grammarNote": "Lượng từ 张 dùng cho đồ vật có mặt phẳng rộng (一张桌子); 宿舍里 là kết cấu phương vị từ."
    },
    {
        "id": "s_b1_2",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "桌子",
        "vietnamese": "Ăn cơm xong xin hãy lau sạch bàn.",
        "fullHanzi": "吃完饭请把桌子擦干净。",
        "fullPinyin": "Chī wán fàn qǐng bǎ zhuōzi cā gānjìng.",
        "chunks": [
            "吃完饭",
            "请把",
            "桌子",
            "擦干净。"
        ],
        "grammarTag": "cau-chu-ba",
        "grammarNote": "Cấu trúc câu chữ 把: 把 + Tân ngữ + Động từ + Bổ ngữ kết quả (把桌子擦干净 - lau sạch bàn)."
    },
    {
        "id": "s_b1_3",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "桌子",
        "vietnamese": "Điện thoại và bình nước của tôi ở trên bàn.",
        "fullHanzi": "我的手机和水杯在桌子上。",
        "fullPinyin": "Wǒ de shǒujī hé shuǐbēi zài zhuōzi shang.",
        "chunks": [
            "我的手机",
            "和水杯",
            "在桌子上。"
        ],
        "grammarTag": "vi-tri",
        "grammarNote": "Cấu trúc vị trí: 在 + Danh từ + 上 (在桌子上 - ở trên bàn)."
    },
    {
        "id": "s_b1_4",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "椅子",
        "vietnamese": "Mọi người kéo cái ghế lại đây ngồi đi.",
        "fullHanzi": "大家拉把椅子过来坐吧。",
        "fullPinyin": "Dàjiā lā bǎ yǐzi guòlái zuò ba.",
        "chunks": [
            "大家",
            "拉把椅子",
            "过来",
            "坐吧。"
        ],
        "grammarTag": "luong-tu",
        "grammarNote": "Lượng từ 把 dùng cho đồ có tay cầm, chỗ tựa (一把椅子). 拉把椅子 = 拉一把椅子."
    },
    {
        "id": "s_b1_5",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "椅子",
        "vietnamese": "Chiếc ghế cũ này hỏng rồi không ngồi được.",
        "fullHanzi": "这把旧椅子坏了不能坐。",
        "fullPinyin": "Zhè bǎ jiù yǐzi huài le bù néng zuò.",
        "chunks": [
            "这把",
            "旧椅子",
            "坏了",
            "不能坐。"
        ],
        "grammarTag": "luong-tu",
        "grammarNote": "这把旧椅子: lượng từ 把; 不能坐: không thể ngồi được."
    },
    {
        "id": "s_b1_6",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "椅子",
        "vietnamese": "Cửa ra vào đang đặt hai chiếc ghế đen.",
        "fullHanzi": "门口放着两把黑色椅子。",
        "fullPinyin": "Ménkǒu fàngzhe liǎng bǎ hēisè yǐzi.",
        "chunks": [
            "门口",
            "放着",
            "两把",
            "黑色椅子。"
        ],
        "grammarTag": "vi-tri",
        "grammarNote": "Trợ từ động thái 着: Động từ + 着 biểu thị trạng thái tồn tại tĩnh (门口放着...)."
    },
    {
        "id": "s_b1_7",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "杯子",
        "vietnamese": "Cái cốc trắng kia trên bàn là của tôi.",
        "fullHanzi": "桌上那个白色杯子是我的。",
        "fullPinyin": "Zhuō shang nà gè báisè bēizi shì wǒ de.",
        "chunks": [
            "桌上",
            "那个",
            "白色杯子",
            "是我的。"
        ],
        "grammarTag": "vi-tri",
        "grammarNote": "Lượng từ 个 (一个杯子); Đại từ + 的 biểu thị sự sở hữu (是我的)."
    },
    {
        "id": "s_b1_8",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "杯子",
        "vietnamese": "Chị gái tặng tôi một chiếc bình giữ nhiệt.",
        "fullHanzi": "姐姐送我一个保温杯子。",
        "fullPinyin": "Jiějie sòng wǒ yí gè bǎowēn bēizi.",
        "chunks": [
            "姐姐",
            "送我",
            "一个",
            "保温杯子。"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "Động từ 送 (sòng - tặng); 保温杯 (bình giữ nhiệt)."
    },
    {
        "id": "s_b1_9",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "杯子",
        "vietnamese": "Cầm cốc thủy tinh cẩn thận đừng làm vỡ!",
        "fullHanzi": "拿玻璃杯子小心别打碎了！",
        "fullPinyin": "Ná bōli bēizi xiǎoxīn bié dǎsuì le!",
        "chunks": [
            "拿",
            "玻璃杯子",
            "小心",
            "别打碎了！"
        ],
        "grammarTag": "bo-ngu",
        "grammarNote": "Câu ngăn cấm: 小心别 + Động từ + Bổ ngữ kết quả (小心别打碎了 - cẩn thận đừng làm vỡ)."
    },
    {
        "id": "s_b1_10",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "钥匙",
        "vietnamese": "Ra cửa đừng quên mang chìa khóa phòng.",
        "fullHanzi": "出门别忘了带房间钥匙。",
        "fullPinyin": "Chūmén bié wàng le dài fángjiān yàoshi.",
        "chunks": [
            "出门",
            "别忘了",
            "带",
            "房间钥匙。"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "别忘了 + Động từ (đừng quên làm gì); 房间钥匙 (chìa khóa phòng)."
    },
    {
        "id": "s_b1_11",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "钥匙",
        "vietnamese": "Chìa khóa của tôi hình như rơi ở xưởng rồi.",
        "fullHanzi": "我的钥匙好像丢在车间了。",
        "fullPinyin": "Wǒ de yàoshi hǎoxiàng diū zài chējiān le.",
        "chunks": [
            "我的钥匙",
            "好像",
            "丢在",
            "车间了。"
        ],
        "grammarTag": "bo-ngu",
        "grammarNote": "Bổ ngữ kết quả 在: Động từ + 在 + Nơi chốn (丢在车间 - rơi mất ở xưởng)."
    },
    {
        "id": "s_b1_12",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "钥匙",
        "vietnamese": "Chìa khóa tủ để trong túi của tôi.",
        "fullHanzi": "柜子钥匙放在我的包里。",
        "fullPinyin": "Guìzi yàoshi fàng zài wǒ de bāo lǐ.",
        "chunks": [
            "柜子钥匙",
            "放在",
            "我的",
            "包里。"
        ],
        "grammarTag": "vi-tri",
        "grammarNote": "放在 + Nơi chốn + 里 (để ở trong túi của tôi)."
    },
    {
        "id": "s_b1_13",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "门",
        "vietnamese": "Ra vào phòng điều hòa xin tiện tay đóng cửa.",
        "fullHanzi": "进出空调房请随手关门。",
        "fullPinyin": "Jìnchū kōngtiáofáng qǐng suíshǒu guān mén.",
        "chunks": [
            "进出",
            "空调房",
            "请随手",
            "关门。"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "随手 (tiện tay); 关门 (đóng cửa), 开门 (mở cửa)."
    },
    {
        "id": "s_b1_14",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "门",
        "vietnamese": "Bên ngoài có người đang gõ cửa ký túc xá.",
        "fullHanzi": "外面有人在敲宿舍的门。",
        "fullPinyin": "Wàimian yǒu rén zài qiāo sùshè de mén.",
        "chunks": [
            "外面",
            "有人",
            "在敲",
            "宿舍的门。"
        ],
        "grammarTag": "vi-tri",
        "grammarNote": "Phó từ 在 chỉ hành động đang diễn ra: 在 + Động từ (在敲门 - đang gõ cửa)."
    },
    {
        "id": "s_b1_15",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "门",
        "vietnamese": "Tối trước khi ngủ nhất định phải khóa chặt cửa.",
        "fullHanzi": "晚上睡觉前一定要锁好门。",
        "fullPinyin": "Wǎnshang shuìjiào qián yídìng yào suǒ hǎo mén.",
        "chunks": [
            "晚上",
            "睡觉前",
            "一定要",
            "锁好门。"
        ],
        "grammarTag": "bo-ngu",
        "grammarNote": "Mốc thời gian ...前 (trước khi...); Bổ ngữ kết quả 好: 锁好门 (khóa chặt cửa)."
    },
    {
        "id": "s_b1_16",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "窗户",
        "vietnamese": "Sáng thức dậy mở cửa sổ cho thoáng khí.",
        "fullHanzi": "早上起床打开窗户透透气。",
        "fullPinyin": "Zǎoshang qǐchuáng dǎkāi chuānghu tòutòuqì.",
        "chunks": [
            "早上起床",
            "打开窗户",
            "透透气。"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "打开 (mở ra); 透透气 (cho thoáng khí - lặp lại động từ)."
    },
    {
        "id": "s_b1_17",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "窗户",
        "vietnamese": "Bên ngoài gió mưa rồi, mau đóng cửa sổ!",
        "fullHanzi": "外面刮风下雨了，快关窗户！",
        "fullPinyin": "Wàimian guāfēng xiàyǔ le, kuài guān chuānghu!",
        "chunks": [
            "外面",
            "刮风下雨了，",
            "快关",
            "窗户！"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "刮风下雨 (mưa to gió lớn); 快 + Động từ (mau làm gì)."
    },
    {
        "id": "s_b1_18",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "窗户",
        "vietnamese": "Bàn của tôi ở ngay bên cạnh cửa sổ.",
        "fullHanzi": "我的桌子就在窗户旁边。",
        "fullPinyin": "Wǒ de zhuōzi jiù zài chuānghu pángbiān.",
        "chunks": [
            "我的桌子",
            "就在",
            "窗户旁边。"
        ],
        "grammarTag": "vi-tri",
        "grammarNote": "Phó từ nhấn mạnh 就 + 在 + Phương vị từ (就在...旁边 - ở ngay bên cạnh...)."
    },
    {
        "id": "s_b1_19",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "灯",
        "vietnamese": "Trời tối rồi, bật đèn phòng khách lên.",
        "fullHanzi": "天黑了，把客厅的灯打开。",
        "fullPinyin": "Tiān hēi le, bǎ kètīng de dēng dǎkāi.",
        "chunks": [
            "天黑了，",
            "把客厅的灯",
            "打开。"
        ],
        "grammarTag": "cau-chu-ba",
        "grammarNote": "Câu chữ 把: 把 + Tân ngữ + 打开 (bật lên)."
    },
    {
        "id": "s_b1_20",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "灯",
        "vietnamese": "Tan ca rời khỏi xưởng nhớ tắt đèn.",
        "fullHanzi": "下班离开车间记得关灯。",
        "fullPinyin": "Xiàbān líkāi chējiān jìde guān dēng.",
        "chunks": [
            "下班",
            "离开车间",
            "记得",
            "关灯。"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "记得 + Động từ (nhớ làm gì); 关灯 (tắt đèn)."
    },
    {
        "id": "s_b1_21",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "灯",
        "vietnamese": "Chiếc đèn bàn mới thay này rất sáng.",
        "fullHanzi": "这盏新换的台灯非常亮。",
        "fullPinyin": "Zhè zhǎn xīn huàn de táidēng fēicháng liàng.",
        "chunks": [
            "这盏",
            "新换的台灯",
            "非常亮。"
        ],
        "grammarTag": "luong-tu",
        "grammarNote": "Lượng từ 盏 (zhǎn) chuẩn cho ngọn đèn; 台灯 (đèn bàn)."
    },
    {
        "id": "s_b1_22",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "空调",
        "vietnamese": "Mùa hè xưởng nóng quá, mau bật điều hòa!",
        "fullHanzi": "夏天车间太热，快开空调！",
        "fullPinyin": "Xiàtiān chējiān tài rè, kuài kāi kōngtiáo!",
        "chunks": [
            "夏天车间",
            "太热，",
            "快开",
            "空调！"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "太...了 (quá); 开空调 (bật điều hòa)."
    },
    {
        "id": "s_b1_23",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "空调",
        "vietnamese": "Đi ngủ bật điều hòa 26 độ là tốt nhất.",
        "fullHanzi": "睡觉空调开二十六度最好。",
        "fullPinyin": "Shuìjiào kōngtiáo kāi èrshíliù dù zuì hǎo.",
        "chunks": [
            "睡觉",
            "空调开",
            "二十六度",
            "最好。"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "Cách nói nhiệt độ: Số + 度 (二十六度 - 26 độ); 最好 (tốt nhất)."
    },
    {
        "id": "s_b1_24",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "空调",
        "vietnamese": "Điều hòa ký túc hỏng rồi, mai gọi thợ sửa.",
        "fullHanzi": "宿舍空调坏了，明天找人修。",
        "fullPinyin": "Sùshè kōngtiáo huài le, míngtiān zhǎo rén xiū.",
        "chunks": [
            "宿舍空调",
            "坏了，",
            "明天",
            "找人修。"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "坏了 (hỏng rồi); 找人 + Động từ (tìm người/gọi thợ làm gì)."
    },
    {
        "id": "s_b1_25",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "风扇",
        "vietnamese": "Tôi không thích điều hòa, thích quạt điện.",
        "fullHanzi": "我不喜欢空调，喜欢吹风扇。",
        "fullPinyin": "Wǒ bù xǐhuan kōngtiáo, xǐhuan chuī fēngshàn.",
        "chunks": [
            "我不喜欢",
            "空调，",
            "喜欢",
            "吹风扇。"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "Động từ 吹 (thổi/hóng gió): 吹风扇 (quạt mát), 吹空调 (ngồi điều hòa)."
    },
    {
        "id": "s_b1_26",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "风扇",
        "vietnamese": "Trời hơi nóng, bật quạt điện lên đi.",
        "fullHanzi": "天气有点热，把风扇打开吧。",
        "fullPinyin": "Tiānqì yǒudiǎn rè, bǎ fēngshàn dǎkāi ba.",
        "chunks": [
            "天气",
            "有点热，",
            "把风扇",
            "打开吧。"
        ],
        "grammarTag": "cau-chu-ba",
        "grammarNote": "有点 + Tính từ (hơi...); Câu chữ 把: 把风扇打开."
    },
    {
        "id": "s_b1_27",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "风扇",
        "vietnamese": "Quạt điện bẩn quá rồi, cuối tuần phải lau rửa.",
        "fullHanzi": "风扇太脏了，周末要擦洗。",
        "fullPinyin": "Fēngshàn tài zāng le, zhōumò yào cāxǐ.",
        "chunks": [
            "风扇",
            "太脏了，",
            "周末",
            "要擦洗。"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "擦洗 (lau rửa); 周末 (cuối tuần)."
    },
    {
        "id": "s_b1_28",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "镜子",
        "vietnamese": "Sáng trước khi ra cửa đều phải soi gương chút.",
        "fullHanzi": "早上出门前都要照一下镜子。",
        "fullPinyin": "Zǎoshang chūmén qián dōu yào zhào yíxià jìngzi.",
        "chunks": [
            "早上出门前",
            "都要",
            "照一下",
            "镜子。"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "Động từ 照镜子 (soi gương); Động từ + 一下 (làm một chút)."
    },
    {
        "id": "s_b1_29",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "镜子",
        "vietnamese": "Trên tường nhà vệ sinh treo một tấm gương.",
        "fullHanzi": "洗手间墙上挂着一面镜子。",
        "fullPinyin": "Xǐshǒujiān qiáng shang guàzhe yí miàn jìngzi.",
        "chunks": [
            "洗手间",
            "墙上",
            "挂着",
            "一面镜子。"
        ],
        "grammarTag": "vi-tri",
        "grammarNote": "Lượng từ 面 (miàn) cho gương; 挂着 (đang treo - tồn tại tĩnh)."
    },
    {
        "id": "s_b1_30",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "镜子",
        "vietnamese": "Cầm chắc gương nhé, đừng làm rơi vỡ.",
        "fullHanzi": "小心拿好镜子，别摔碎了。",
        "fullPinyin": "Xiǎoxīn ná hǎo jìngzi, bié shuāisuì le.",
        "chunks": [
            "小心",
            "拿好镜子，",
            "别",
            "摔碎了。"
        ],
        "grammarTag": "bo-ngu",
        "grammarNote": "Bổ ngữ kết quả 好 (拿好); 摔碎 (rơi vỡ tan tành)."
    },
    {
        "id": "s_b1_31",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "梳子",
        "vietnamese": "Gội đầu xong dùng lược chải cho tóc suôn.",
        "fullHanzi": "洗完头用梳子把头发梳顺。",
        "fullPinyin": "Xǐ wán tóu yòng shūzi bǎ tóufa shūshùn.",
        "chunks": [
            "洗完头",
            "用梳子",
            "把头发",
            "梳顺。"
        ],
        "grammarTag": "cau-chu-ba",
        "grammarNote": "Cấu trúc công cụ: 用 + Công cụ + 把 + Tân ngữ + Động từ + Kết quả (梳顺 - chải suôn mượt)."
    },
    {
        "id": "s_b1_32",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "梳子",
        "vietnamese": "Cho mượn chiếc lược gỗ nhỏ của bạn chút nhé.",
        "fullHanzi": "借用一下你的小木梳子。",
        "fullPinyin": "Jièyòng yíxià nǐ de xiǎo mù shūzi.",
        "chunks": [
            "借用一下",
            "你的",
            "小木梳子。"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "借用一下 (cho mượn dùng một chút); 木梳子 (lược gỗ)."
    },
    {
        "id": "s_b1_33",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "梳子",
        "vietnamese": "Chiếc lược này để trong túi xách rất tiện.",
        "fullHanzi": "这把梳子放在包里很方便。",
        "fullPinyin": "Zhè bǎ shūzi fàng zài bāo lǐ hěn fāngbiàn.",
        "chunks": [
            "这把梳子",
            "放在",
            "包里",
            "很方便。"
        ],
        "grammarTag": "luong-tu",
        "grammarNote": "Lượng từ 把 (一把梳子); 放在...里 (đặt ở trong...)."
    },
    {
        "id": "s_b1_34",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "纸巾",
        "vietnamese": "Ăn cơm xong xin đưa cho tôi hai tờ khăn giấy.",
        "fullHanzi": "吃完饭请递给我两张纸巾。",
        "fullPinyin": "Chī wán fàn qǐng dì gěi wǒ liǎng zhāng zhǐjīn.",
        "chunks": [
            "吃完饭",
            "请递给我",
            "两张",
            "纸巾。"
        ],
        "grammarTag": "luong-tu",
        "grammarNote": "Động từ 递给 (đưa tận tay cho ai); Lượng từ 张 cho tờ khăn giấy lẻ."
    },
    {
        "id": "s_b1_35",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "纸巾",
        "vietnamese": "Khăn giấy trên bàn đã dùng hết rồi.",
        "fullHanzi": "桌上的纸巾已经用完了。",
        "fullPinyin": "Zhuō shang de zhǐjīn yǐjīng yòng wán le.",
        "chunks": [
            "桌上的纸巾",
            "已经",
            "用完了。"
        ],
        "grammarTag": "bo-ngu",
        "grammarNote": "Bổ ngữ kết quả 完 (用完 - dùng hết); 已经...了 (đã... rồi)."
    },
    {
        "id": "s_b1_36",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "纸巾",
        "vietnamese": "Trong túi tôi luôn để một gói khăn giấy nhỏ.",
        "fullHanzi": "我包里总放一包小纸巾。",
        "fullPinyin": "Wǒ bāo lǐ zǒng fàng yì bāo xiǎo zhǐjīn.",
        "chunks": [
            "我包里",
            "总放",
            "一包",
            "小纸巾。"
        ],
        "grammarTag": "luong-tu",
        "grammarNote": "Lượng từ 包 (yì bāo zhǐjīn - một gói khăn giấy); 总 (luôn luôn)."
    },
    {
        "id": "s_b1_37",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "垃圾桶",
        "vietnamese": "Chỉ vụn đều phải vứt vào trong thùng rác.",
        "fullHanzi": "碎线头都要扔进垃圾桶里。",
        "fullPinyin": "Suì xiàntóu dōu yào rēng jìn lājītǒng lǐ.",
        "chunks": [
            "碎线头",
            "都要",
            "扔进",
            "垃圾桶里。"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "碎线头 (chỉ vụn); 扔进...里 (ném/vứt vào trong...)."
    },
    {
        "id": "s_b1_38",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "垃圾桶",
        "vietnamese": "Thùng rác đầy rồi, mau mang ra ngoài đổ đi.",
        "fullHanzi": "垃圾桶满了，快拿出去倒掉。",
        "fullPinyin": "Lājītǒng mǎn le, kuài ná chūqù dàodiào.",
        "chunks": [
            "垃圾桶满了，",
            "快拿出去",
            "倒掉。"
        ],
        "grammarTag": "bo-ngu",
        "grammarNote": "Bổ ngữ xu hướng kép 拿出去 (mang ra ngoài); 倒掉 (đổ bỏ đi - bổ ngữ 掉)."
    },
    {
        "id": "s_b1_39",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "垃圾桶",
        "vietnamese": "Cạnh mỗi chỗ làm việc đều có thùng rác nhỏ.",
        "fullHanzi": "每个工位旁都有小垃圾桶。",
        "fullPinyin": "Měi gè gōngwèi páng dōu yǒu xiǎo lājītǒng.",
        "chunks": [
            "每个工位旁",
            "都有",
            "小垃圾桶。"
        ],
        "grammarTag": "vi-tri",
        "grammarNote": "每个... (mỗi...); ...旁 (bên cạnh...)."
    },
    {
        "id": "s_b1_40",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "雨伞",
        "vietnamese": "Chiều trời sẽ mưa, nhớ mang theo ô nhé!",
        "fullHanzi": "下午要下雨，记得带雨伞！",
        "fullPinyin": "Xiàwǔ yào xiàyǔ, jìde dài yǔsǎn!",
        "chunks": [
            "下午要下雨，",
            "记得",
            "带雨伞！"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "记得 + Động từ (nhớ mang theo); 带雨伞 (mang theo ô)."
    },
    {
        "id": "s_b1_41",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "雨伞",
        "vietnamese": "Sáng nay tôi ra cửa quên mang ô rồi.",
        "fullHanzi": "我今天早上出门忘带雨伞了。",
        "fullPinyin": "Wǒ jīntiān zǎoshang chūmén wàng dài yǔsǎn le.",
        "chunks": [
            "我今天早上",
            "出门",
            "忘带",
            "雨伞了。"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "忘带 (quên mang theo)."
    },
    {
        "id": "s_b1_42",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "雨伞",
        "vietnamese": "Chiếc ô gấp này vừa nhẹ vừa chắc chắn.",
        "fullHanzi": "这把折叠雨伞又轻又结实。",
        "fullPinyin": "Zhè bǎ zhédié yǔsǎn yòu qīng yòu jiēshi.",
        "chunks": [
            "这把",
            "折叠雨伞",
            "又轻",
            "又结实。"
        ],
        "grammarTag": "luong-tu",
        "grammarNote": "Lượng từ 把 (一把雨伞); Cấu trúc 又...又... (vừa... vừa...)."
    },
    {
        "id": "s_b1_43",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "包",
        "vietnamese": "Điện thoại và chìa khóa đều để trong túi.",
        "fullHanzi": "手机和钥匙都放在包里。",
        "fullPinyin": "Shǒujī hé yàoshi dōu fàng zài bāo lǐ.",
        "chunks": [
            "手机和钥匙",
            "都放在",
            "包里。"
        ],
        "grammarTag": "vi-tri",
        "grammarNote": "Phó từ 都 (đều); 放在包里 (để trong túi)."
    },
    {
        "id": "s_b1_44",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "包",
        "vietnamese": "Chiếc túi mới bạn đeo thật là đẹp!",
        "fullHanzi": "你背的这个新包真漂亮！",
        "fullPinyin": "Nǐ bēi de zhè gè xīn bāo zhēn piàoliang!",
        "chunks": [
            "你背的",
            "这个新包",
            "真漂亮！"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "Động từ 背 (bēi - đeo/khoác trên vai); 真 + Tính từ (thật là...)."
    },
    {
        "id": "s_b1_45",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "包",
        "vietnamese": "Trước tan ca 5 phút mọi người thu dọn túi xách.",
        "fullHanzi": "下班前五分钟大家收拾包。",
        "fullPinyin": "Xiàbān qián wǔ fēnzhōng dàjiā shōushi bāo.",
        "chunks": [
            "下班前五分钟",
            "大家",
            "收拾包。"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "收拾包 (thu dọn túi xách); ...前五分钟 (trước 5 phút)."
    },
    {
        "id": "s_b1_46",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "工位",
        "vietnamese": "Chiếc máy sát cửa sổ kia là chỗ làm của tôi.",
        "fullHanzi": "靠窗户那台机器是我的工位。",
        "fullPinyin": "Kào chuānghu nà tái jīqì shì wǒ de gōngwèi.",
        "chunks": [
            "靠窗户",
            "那台机器",
            "是我的",
            "工位。"
        ],
        "grammarTag": "vi-tri",
        "grammarNote": "靠 (sát/tựa vào); 那台机器 (chiếc máy kia)."
    },
    {
        "id": "s_b1_47",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "工位",
        "vietnamese": "Trước khi tan ca phải quét dọn sạch chỗ làm.",
        "fullHanzi": "下班前要把工位打扫干净。",
        "fullPinyin": "Xiàbān qián yào bǎ gōngwèi dǎsǎo gānjìng.",
        "chunks": [
            "下班前",
            "要把工位",
            "打扫",
            "干净。"
        ],
        "grammarTag": "cau-chu-ba",
        "grammarNote": "Câu chữ 把: 把工位打扫干净."
    },
    {
        "id": "s_b1_48",
        "lesson": "buoi-1",
        "lessonLabel": "Buổi 1: Phòng ở & Bàn làm việc",
        "targetWord": "工位",
        "vietnamese": "Rời khỏi chỗ làm phải báo với tổ trưởng một tiếng.",
        "fullHanzi": "离开工位要去跟组长说一声。",
        "fullPinyin": "Líkāi gōngwèi yào qù gēn zǔzhǎng shuō yì shēng.",
        "chunks": [
            "离开工位",
            "要去跟组长",
            "说一声。"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "跟 + Người + 说一声 (nói với ai một tiếng để báo cáo)."
    },
    {
        "id": "s_b2_1",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "床",
        "vietnamese": "Ký túc xá chúng tôi có 4 chiếc giường tầng.",
        "fullHanzi": "我们宿舍有四张高低床。",
        "fullPinyin": "Wǒmen sùshè yǒu sì zhāng gāodīchuáng.",
        "chunks": [
            "我们宿舍",
            "有四张",
            "高低床。"
        ],
        "grammarTag": "luong-tu",
        "grammarNote": "Lượng từ 张 dùng cho giường (四张床); 高低床 là giường tầng."
    },
    {
        "id": "s_b2_2",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "床",
        "vietnamese": "Chiếc giường này vừa to vừa êm rất thoải mái.",
        "fullHanzi": "这张床又大又软很舒服。",
        "fullPinyin": "Zhè zhāng chuáng yòu dà yòu ruǎn hěn shūfu.",
        "chunks": [
            "这张床",
            "又大又软",
            "很舒服。"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "Cấu trúc 又...又...: 又大又软 (vừa to vừa êm mềm)."
    },
    {
        "id": "s_b2_3",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "床",
        "vietnamese": "Sáng thức dậy phải dọn dẹp gọn gàng giường chiếu.",
        "fullHanzi": "早上起床要整理好床铺。",
        "fullPinyin": "Zǎoshang qǐchuáng yào zhěnglǐ hǎo chuángpù.",
        "chunks": [
            "早上起床",
            "要整理好",
            "床铺。"
        ],
        "grammarTag": "bo-ngu",
        "grammarNote": "Bổ ngữ kết quả 好: 整理好 (dọn dẹp ngăn nắp, hoàn thành chỉn chu)."
    },
    {
        "id": "s_b2_4",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "枕头",
        "vietnamese": "Chiếc gối mới này cao quá nằm đau cổ.",
        "fullHanzi": "这个新枕头太高脖子疼。",
        "fullPinyin": "Zhè gè xīn zhěntou tài gāo bózi téng.",
        "chunks": [
            "这个新枕头",
            "太高",
            "脖子疼。"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "脖子 (cổ); 疼 (đau); 太... (quá...)."
    },
    {
        "id": "s_b2_5",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "枕头",
        "vietnamese": "Tôi thích gối loại mềm một chút.",
        "fullHanzi": "我喜欢睡软一点的枕头。",
        "fullPinyin": "Wǒ xǐhuan shuì ruǎn yìdiǎn de zhěntou.",
        "chunks": [
            "我喜欢",
            "睡软一点的",
            "枕头。"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "Tính từ + 一点: 软一点 (mềm hơn một chút)."
    },
    {
        "id": "s_b2_6",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "枕头",
        "vietnamese": "Cuối tuần mang gối ra ngoài phơi nắng chút.",
        "fullHanzi": "周末把枕头拿出去晒晒。",
        "fullPinyin": "Zhōumò bǎ zhěntou ná chūqù shàishai.",
        "chunks": [
            "周末",
            "把枕头",
            "拿出去",
            "晒晒。"
        ],
        "grammarTag": "cau-chu-ba",
        "grammarNote": "Câu chữ 把: 把枕头拿出去; Động từ lặp lại 晒晒 (phơi chút nắng)."
    },
    {
        "id": "s_b2_7",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "被子",
        "vietnamese": "Buổi tối hơi lạnh, đi ngủ đắp chăn kỹ nhé.",
        "fullHanzi": "晚上有点冷，睡觉盖好被子。",
        "fullPinyin": "Wǎnshang yǒudiǎn lěng, shuìjiào gài hǎo bèizi.",
        "chunks": [
            "晚上有点冷，",
            "睡觉",
            "盖好被子。"
        ],
        "grammarTag": "bo-ngu",
        "grammarNote": "Bổ ngữ kết quả 好: 盖好被子 (đắp chăn cẩn thận, kỹ càng)."
    },
    {
        "id": "s_b2_8",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "被子",
        "vietnamese": "Chiếc chăn lông vũ này vừa nhẹ vừa ấm áp.",
        "fullHanzi": "这床羽绒被子又轻又暖和。",
        "fullPinyin": "Zhè chuáng yǔróng bèizi yòu qīng yòu nuǎnhuo.",
        "chunks": [
            "这床",
            "羽绒被子",
            "又轻",
            "又暖和。"
        ],
        "grammarTag": "luong-tu",
        "grammarNote": "Lượng từ chuẩn của chăn là 床 (一床被子); 又轻又暖和 (vừa nhẹ vừa ấm)."
    },
    {
        "id": "s_b2_9",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "被子",
        "vietnamese": "Thức dậy xong bắt buộc phải gấp gọn chăn của mình.",
        "fullHanzi": "起床后必须叠好自己的被子。",
        "fullPinyin": "Qǐchuáng hòu bìxū dié hǎo zìjǐ de bèizi.",
        "chunks": [
            "起床后",
            "必须叠好",
            "自己的",
            "被子。"
        ],
        "grammarTag": "bo-ngu",
        "grammarNote": "叠好被子 (gấp gọn gàng chăn); 必须 (bắt buộc)."
    },
    {
        "id": "s_b2_10",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "床单",
        "vietnamese": "Chủ nhật tôi sẽ giặt sạch ga trải giường bẩn.",
        "fullHanzi": "星期天我要把脏床单洗干净。",
        "fullPinyin": "Xīngqītiān wǒ yào bǎ zāng chuángdān xǐ gānjìng.",
        "chunks": [
            "星期天",
            "我要把",
            "脏床单",
            "洗干净。"
        ],
        "grammarTag": "cau-chu-ba",
        "grammarNote": "Câu chữ 把: 把脏床单洗干净 (giặt sạch ga trải giường bẩn)."
    },
    {
        "id": "s_b2_11",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "床单",
        "vietnamese": "Phơi khô rồi trải ga giường lên giường.",
        "fullHanzi": "晾干后把床单铺在床上。",
        "fullPinyin": "Liànggān hòu bǎ chuángdān pū zài chuáng shang.",
        "chunks": [
            "晾干后",
            "把床单",
            "铺在",
            "床上。"
        ],
        "grammarTag": "cau-chu-ba",
        "grammarNote": "铺在...上 (trải ở trên...); 晾干后 (sau khi phơi khô)."
    },
    {
        "id": "s_b2_12",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "床单",
        "vietnamese": "Chiếc ga giường cotton này sờ vào rất mềm mại.",
        "fullHanzi": "这条纯棉床单摸着很柔软。",
        "fullPinyin": "Zhè tiáo chúnmián chuángdān mōzhe hěn róuruǎn.",
        "chunks": [
            "这条",
            "纯棉床单",
            "摸着",
            "很柔软。"
        ],
        "grammarTag": "luong-tu",
        "grammarNote": "Lượng từ 条 (一条床单); 摸着 (sờ vào thấy)."
    },
    {
        "id": "s_b2_13",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "衣柜",
        "vietnamese": "Quần áo sạch đều phải treo vào trong tủ áo.",
        "fullHanzi": "干净衣服都要挂进衣柜里。",
        "fullPinyin": "Gānjìng yīfu dōu yào guà jìn yīguì lǐ.",
        "chunks": [
            "干净衣服",
            "都要挂进",
            "衣柜里。"
        ],
        "grammarTag": "vi-tri",
        "grammarNote": "挂进...里 (treo vào bên trong...)."
    },
    {
        "id": "s_b2_14",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "衣柜",
        "vietnamese": "Quần áo nhiều quá, tủ áo nhỏ không để hết được.",
        "fullHanzi": "衣服太多，小衣柜放不下。",
        "fullPinyin": "Yīfu tài duō, xiǎo yīguì fàng bú xià.",
        "chunks": [
            "衣服太多，",
            "小衣柜",
            "放不下。"
        ],
        "grammarTag": "bo-ngu",
        "grammarNote": "Bổ ngữ khả năng phủ định 不下: 放不下 (không để hết được vì quá chật)."
    },
    {
        "id": "s_b2_15",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "衣柜",
        "vietnamese": "Lấy quần áo xong nhớ đóng cửa tủ áo lại.",
        "fullHanzi": "拿完衣服记得关好衣柜门。",
        "fullPinyin": "Ná wán yīfu jìde guān hǎo yīguì mén.",
        "chunks": [
            "拿完衣服",
            "记得关好",
            "衣柜门。"
        ],
        "grammarTag": "bo-ngu",
        "grammarNote": "Bổ ngữ kết quả: 拿完 (lấy xong); 关好 (đóng chặt lại)."
    },
    {
        "id": "s_b2_16",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "衣架",
        "vietnamese": "Móc treo không đủ dùng, đi mua thêm 10 cái nữa.",
        "fullHanzi": "衣架不够用，再去买十个。",
        "fullPinyin": "Yījià bú gòu yòng, zài qù mǎi shí gè.",
        "chunks": [
            "衣架不够用，",
            "再去买",
            "十个。"
        ],
        "grammarTag": "luong-tu",
        "grammarNote": "Lượng từ 个 (十个衣架); 不够用 (không đủ dùng)."
    },
    {
        "id": "s_b2_17",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "衣架",
        "vietnamese": "Quần áo ướt dùng móc treo lên phơi.",
        "fullHanzi": "湿衣服用衣架挂起来晾晒。",
        "fullPinyin": "Shī yīfu yòng yījià guà qǐlái liàngshài.",
        "chunks": [
            "湿衣服",
            "用衣架",
            "挂起来",
            "晾晒。"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "用衣架 (dùng móc áo); 挂起来 (treo lên - bổ ngữ xu hướng 起来)."
    },
    {
        "id": "s_b2_18",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "衣架",
        "vietnamese": "Xin lấy giúp tôi hai cái móc từ ban công.",
        "fullHanzi": "请帮我从阳台拿两个衣架。",
        "fullPinyin": "Qǐng bāng wǒ cóng yángtái ná liǎng gè yījià.",
        "chunks": [
            "请帮我",
            "从阳台",
            "拿两个",
            "衣架。"
        ],
        "grammarTag": "vi-tri",
        "grammarNote": "从 + Địa điểm + Động từ (从阳台拿... - lấy từ ban công)."
    },
    {
        "id": "s_b2_19",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "毛巾",
        "vietnamese": "Rửa mặt phải dùng khăn mặt dùng riêng của mình.",
        "fullHanzi": "洗脸要用自己专用的毛巾。",
        "fullPinyin": "Xǐliǎn yào yòng zìjǐ zhuānyòng de máojīn.",
        "chunks": [
            "洗脸要用",
            "自己专用的",
            "毛巾。"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "专用 (chuyên dùng, dùng riêng); 洗脸 (rửa mặt)."
    },
    {
        "id": "s_b2_20",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "毛巾",
        "vietnamese": "Mùa hè dễ đổ mồ hôi, mang chiếc khăn mặt lau mồ hôi.",
        "fullHanzi": "夏天容易出汗，带条毛巾擦汗。",
        "fullPinyin": "Xiàtiān róngyì chūhàn, dài tiáo máojīn cāhàn.",
        "chunks": [
            "夏天容易出汗，",
            "带条毛巾",
            "擦汗。"
        ],
        "grammarTag": "luong-tu",
        "grammarNote": "Lượng từ 条 (一条毛巾); 擦汗 (lau mồ hôi)."
    },
    {
        "id": "s_b2_21",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "毛巾",
        "vietnamese": "Chiếc khăn mặt này khô cứng rồi, đến lúc thay mới.",
        "fullHanzi": "这条毛巾变硬了，该换新的。",
        "fullPinyin": "Zhè tiáo máojīn biàn yìng le, gāi huàn xīn de.",
        "chunks": [
            "这条毛巾",
            "变硬了，",
            "该换",
            "新的。"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "变硬了 (trở nên khô cứng); 该...了 (đến lúc phải...)."
    },
    {
        "id": "s_b2_22",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "牙刷",
        "vietnamese": "Sáng tối đều phải dùng bàn chải đánh răng kỹ càng.",
        "fullHanzi": "早晚都要用牙刷认真刷牙。",
        "fullPinyin": "Zǎowǎn dōu yào yòng yáshuā rènzhēn shuāyá.",
        "chunks": [
            "早晚都要",
            "用牙刷",
            "认真刷牙。"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "用牙刷 (dùng bàn chải); 认真刷牙 (chăm chỉ/kỹ càng đánh răng)."
    },
    {
        "id": "s_b2_23",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "牙刷",
        "vietnamese": "Cứ mỗi 3 tháng phải thay một bàn chải đánh răng mới.",
        "fullHanzi": "每三个月要换一把新牙刷。",
        "fullPinyin": "Měi sān gè yuè yào huàn yì bǎ xīn yáshuā.",
        "chunks": [
            "每三个月",
            "要换一把",
            "新牙刷。"
        ],
        "grammarTag": "luong-tu",
        "grammarNote": "Lượng từ 把 (一把牙刷); 每三个月 (cứ mỗi 3 tháng)."
    },
    {
        "id": "s_b2_24",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "牙刷",
        "vietnamese": "Bàn chải màu xanh của tôi để trong cốc.",
        "fullHanzi": "我的蓝色牙刷放在杯子里。",
        "fullPinyin": "Wǒ de lánsè yáshuā fàng zài bēizi lǐ.",
        "chunks": [
            "我的",
            "蓝色牙刷",
            "放在",
            "杯子里。"
        ],
        "grammarTag": "vi-tri",
        "grammarNote": "放在...里 (đặt ở trong cốc)."
    },
    {
        "id": "s_b2_25",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "牙膏",
        "vietnamese": "Kem đánh răng sắp hết rồi, tan ca đi mua một tuýp.",
        "fullHanzi": "牙膏快用完了，下班去买一支。",
        "fullPinyin": "Yágāo kuài yòng wán le, xiàbān qù mǎi yì zhī.",
        "chunks": [
            "牙膏",
            "快用完了，",
            "下班",
            "去买一支。"
        ],
        "grammarTag": "luong-tu",
        "grammarNote": "Lượng từ 支 (yì zhī yágāo - một tuýp kem đánh răng); 快...了 (sắp... rồi)."
    },
    {
        "id": "s_b2_26",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "牙膏",
        "vietnamese": "Bóp kem đánh răng xong nhớ vặn chặt nắp lại.",
        "fullHanzi": "挤完牙膏记得把盖子拧紧。",
        "fullPinyin": "Jǐ wán yágāo jìde bǎ gàizi nǐngjǐn.",
        "chunks": [
            "挤完牙膏",
            "记得把盖子",
            "拧紧。"
        ],
        "grammarTag": "cau-chu-ba",
        "grammarNote": "Câu chữ 把: 把盖子拧紧 (vặn chặt nắp lại)."
    },
    {
        "id": "s_b2_27",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "牙膏",
        "vietnamese": "Tôi thích dùng kem đánh răng vị bạc hà.",
        "fullHanzi": "我喜欢用薄荷味道的牙膏。",
        "fullPinyin": "Wǒ xǐhuan yòng bòhe wèidao de yágāo.",
        "chunks": [
            "我喜欢用",
            "薄荷味道的",
            "牙膏。"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "薄荷味道 (vị bạc hà)."
    },
    {
        "id": "s_b2_28",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "肥皂",
        "vietnamese": "Trước khi ăn cơm phải dùng xà phòng rửa sạch tay.",
        "fullHanzi": "吃饭前要用肥皂把手洗干净。",
        "fullPinyin": "Chīfàn qián yào yòng féizào bǎ shǒu xǐ gānjìng.",
        "chunks": [
            "吃饭前",
            "要用肥皂",
            "把手",
            "洗干净。"
        ],
        "grammarTag": "cau-chu-ba",
        "grammarNote": "Câu chữ 把: 把手洗干净 (rửa tay sạch sẽ)."
    },
    {
        "id": "s_b2_29",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "肥皂",
        "vietnamese": "Cổ áo bẩn quá dùng bánh xà phòng vò qua trước.",
        "fullHanzi": "领口太脏先用肥皂搓一搓。",
        "fullPinyin": "Lǐngkǒu tài zāng xiān yòng féizào cuō yi cuō.",
        "chunks": [
            "领口太脏",
            "先用肥皂",
            "搓一搓。"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "领口 (cổ áo); 搓一搓 (vò qua một chút)."
    },
    {
        "id": "s_b2_30",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "肥皂",
        "vietnamese": "Bánh xà phòng thơm này ngửi thấy rất thơm mát.",
        "fullHanzi": "这块香肥皂闻起来很清香。",
        "fullPinyin": "Zhè kuài xiāng féizào wén qǐlái hěn qīngxiāng.",
        "chunks": [
            "这块",
            "香肥皂",
            "闻起来",
            "很清香。"
        ],
        "grammarTag": "luong-tu",
        "grammarNote": "Lượng từ 块 (yí kuài féizào); 闻起来 (ngửi thấy)."
    },
    {
        "id": "s_b2_31",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "洗衣液",
        "vietnamese": "Khi giặt quần áo đổ chút nước giặt vào trong.",
        "fullHanzi": "洗衣服时往里面倒点洗衣液。",
        "fullPinyin": "Xǐ yīfu shí wǎng lǐmian dào diǎn xǐyīyè.",
        "chunks": [
            "洗衣服时",
            "往里面",
            "倒点",
            "洗衣液。"
        ],
        "grammarTag": "vi-tri",
        "grammarNote": "往里面倒 (đổ vào bên trong - giới từ chỉ phương hướng 往)."
    },
    {
        "id": "s_b2_32",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "洗衣液",
        "vietnamese": "Chai nước giặt này giảm giá mua rất hời.",
        "fullHanzi": "这瓶洗衣液打折买很划算。",
        "fullPinyin": "Zhè píng xǐyīyè dǎzhé mǎi hěn huásuàn.",
        "chunks": [
            "这瓶洗衣液",
            "打折买",
            "很划算。"
        ],
        "grammarTag": "luong-tu",
        "grammarNote": "Lượng từ 瓶 (yì píng xǐyīyè); 划算 (hời, có lợi)."
    },
    {
        "id": "s_b2_33",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "洗衣液",
        "vietnamese": "Quần áo tối màu tách riêng cho nước giặt vào giặt.",
        "fullHanzi": "深色衣服分开加洗衣液洗。",
        "fullPinyin": "Shēnsè yīfu fēnkāi jiā xǐyīyè xǐ.",
        "chunks": [
            "深色衣服",
            "分开加",
            "洗衣液洗。"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "深色衣服 (quần áo sẫm màu); 分开 (tách riêng)."
    },
    {
        "id": "s_b2_34",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "洗衣机",
        "vietnamese": "Quần áo bẩn bỏ máy giặt giặt rất đỡ tốn sức.",
        "fullHanzi": "脏衣服放洗衣机洗很省力。",
        "fullPinyin": "Zāng yīfu fàng xǐyījī xǐ hěn shěnglì.",
        "chunks": [
            "脏衣服",
            "放洗衣机洗",
            "很省力。"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "省力 (đỡ tốn sức, tiết kiệm sức lực)."
    },
    {
        "id": "s_b2_35",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "洗衣机",
        "vietnamese": "Trước khi bỏ máy giặt phải móc sạch khăn giấy túi áo!",
        "fullHanzi": "放洗衣机前先掏空口袋纸巾！",
        "fullPinyin": "Fàng xǐyījī qián xiān tāokōng kǒudài zhǐjīn!",
        "chunks": [
            "放洗衣机前",
            "先掏空",
            "口袋纸巾！"
        ],
        "grammarTag": "bo-ngu",
        "grammarNote": "掏空 (móc rỗng, lôi sạch ra hết); ...前 (trước khi...)."
    },
    {
        "id": "s_b2_36",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "洗衣机",
        "vietnamese": "Máy giặt giặt xong rồi, mau lấy ra phơi.",
        "fullHanzi": "洗衣机洗完了，快拿出来晾。",
        "fullPinyin": "Xǐyījī xǐ wán le, kuài ná chūlái liàng.",
        "chunks": [
            "洗衣机",
            "洗完了，",
            "快拿出来",
            "晾。"
        ],
        "grammarTag": "bo-ngu",
        "grammarNote": "Bổ ngữ xu hướng kép: 拿出来 (lấy ra ngoài); 晾 (phơi khô)."
    },
    {
        "id": "s_b2_37",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "吹风机",
        "vietnamese": "Gội đầu xong phải dùng máy sấy tóc sấy khô rồi ngủ.",
        "fullHanzi": "洗完头要用吹风机吹干再睡。",
        "fullPinyin": "Xǐ wán tóu yào yòng chuīfēngjī chuīgān zài shuì.",
        "chunks": [
            "洗完头",
            "要用吹风机",
            "吹干",
            "再睡。"
        ],
        "grammarTag": "bo-ngu",
        "grammarNote": "Bổ ngữ kết quả: 吹干 (sấy cho khô)."
    },
    {
        "id": "s_b2_38",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "吹风机",
        "vietnamese": "Cho mượn máy sấy tóc nhỏ của bạn chút nhé.",
        "fullHanzi": "借用一下你的小吹风机。",
        "fullPinyin": "Jièyòng yíxià nǐ de xiǎo chuīfēngjī.",
        "chunks": [
            "借用一下",
            "你的",
            "小吹风机。"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "借用一下 (cho mượn dùng nhờ một chút)."
    },
    {
        "id": "s_b2_39",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "吹风机",
        "vietnamese": "Dùng xong máy sấy tóc nhớ rút phích cắm điện.",
        "fullHanzi": "用完吹风机记得拔掉插头。",
        "fullPinyin": "Yòng wán chuīfēngjī jìde bádiào chātóu.",
        "chunks": [
            "用完吹风机",
            "记得",
            "拔掉插头。"
        ],
        "grammarTag": "bo-ngu",
        "grammarNote": "Bổ ngữ kết quả 掉 (bádiào - rút rời ra hoàn toàn); 插头 (phích cắm)."
    },
    {
        "id": "s_b2_40",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "充电器",
        "vietnamese": "Điện thoại hết pin rồi, mau tìm cục sạc!",
        "fullHanzi": "手机没电了，快找充电器！",
        "fullPinyin": "Shǒujī méi diàn le, kuài zhǎo chōngdiànqì!",
        "chunks": [
            "手机没电了，",
            "快找",
            "充电器！"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "没电了 (hết pin rồi); 充电器 (cục sạc)."
    },
    {
        "id": "s_b2_41",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "充电器",
        "vietnamese": "Cục sạc nhanh này sạc pin cực kỳ nhanh.",
        "fullHanzi": "这个快充充电器充电非常快。",
        "fullPinyin": "Zhè gè kuàichōng chōngdiànqì chōngdiàn fēicháng kuài.",
        "chunks": [
            "这个",
            "快充充电器",
            "充电",
            "非常快。"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "快充 (sạc nhanh); 充电 (sạc pin); 非常快 (rất nhanh)."
    },
    {
        "id": "s_b2_42",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "充电器",
        "vietnamese": "Rời khỏi ký túc xá bắt buộc phải rút cục sạc ra.",
        "fullHanzi": "离开宿舍必须拔掉充电器。",
        "fullPinyin": "Líkāi sùshè bìxū bádiào chōngdiànqì.",
        "chunks": [
            "离开宿舍",
            "必须拔掉",
            "充电器。"
        ],
        "grammarTag": "bo-ngu",
        "grammarNote": "拔掉 (bádiào - rút ra bỏ đi)."
    },
    {
        "id": "s_b2_43",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "拖鞋",
        "vietnamese": "Về tới ký túc xá thay dép lê vào thật thoải mái.",
        "fullHanzi": "回到宿舍换上拖鞋真舒服。",
        "fullPinyin": "Huídào sùshè huàn shàng tuōxié zhēn shūfu.",
        "chunks": [
            "回到宿舍",
            "换上拖鞋",
            "真舒服。"
        ],
        "grammarTag": "bo-ngu",
        "grammarNote": "Bổ ngữ kết quả 上: 换上 (thay vào); 拖鞋 (dép lê)."
    },
    {
        "id": "s_b2_44",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "拖鞋",
        "vietnamese": "Lúc tắm phải đi dép lê nhựa chống trượt.",
        "fullHanzi": "洗澡时要穿防滑塑料拖鞋。",
        "fullPinyin": "Xǐzǎo shí yào chuān fánghuá sùliào tuōxié.",
        "chunks": [
            "洗澡时",
            "要穿",
            "防滑塑料拖鞋。"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "防滑 (chống trơn trượt); 塑料拖鞋 (dép lê nhựa)."
    },
    {
        "id": "s_b2_45",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "拖鞋",
        "vietnamese": "Trước khi vào phòng cởi giày thay dép lê trong nhà.",
        "fullHanzi": "进房间前脱鞋换室内拖鞋。",
        "fullPinyin": "Jìn fángjiān qián tuōxié huàn shìnèi tuōxié.",
        "chunks": [
            "进房间前",
            "脱鞋换",
            "室内拖鞋。"
        ],
        "grammarTag": "giao-tiep",
        "grammarNote": "脱鞋 (cởi giày); 室内拖鞋 (dép lê đi trong nhà)."
    },
    {
        "id": "s_b2_46",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "剪刀",
        "vietnamese": "Xin đưa cho tôi một chiếc kéo bấm chỉ nhỏ.",
        "fullHanzi": "请递给我一把小纱剪刀。",
        "fullPinyin": "Qǐng dì gěi wǒ yì bǎ xiǎo shājiǎndāo.",
        "chunks": [
            "请递给我",
            "一把",
            "小纱剪刀。"
        ],
        "grammarTag": "luong-tu",
        "grammarNote": "Lượng từ 把 (一把剪刀); 纱剪 (kéo bấm chỉ thừa)."
    },
    {
        "id": "s_b2_47",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "剪刀",
        "vietnamese": "Kéo bấm nhỏ phải dùng dây buộc bên cạnh máy.",
        "fullHanzi": "小剪刀要用绳子拴在机器旁。",
        "fullPinyin": "Xiǎo jiǎndāo yào yòng shéngzi shuān zài jīqì páng.",
        "chunks": [
            "小剪刀",
            "要用绳子",
            "拴在",
            "机器旁。"
        ],
        "grammarTag": "vi-tri",
        "grammarNote": "拴在...旁 (buộc/găm ở bên cạnh...)."
    },
    {
        "id": "s_b2_48",
        "lesson": "buoi-2",
        "lessonLabel": "Buổi 2: Ký túc xá & Vệ sinh cá nhân",
        "targetWord": "剪刀",
        "vietnamese": "Cầm kéo cắt chỉ thừa cẩn thận đừng cắt thủng vải!",
        "fullHanzi": "拿剪刀剪线头小心别剪破布！",
        "fullPinyin": "Ná jiǎndāo jiǎn xiàntóu xiǎoxīn bié jiǎnpò bù!",
        "chunks": [
            "拿剪刀",
            "剪线头",
            "小心",
            "别剪破布！"
        ],
        "grammarTag": "bo-ngu",
        "grammarNote": "Bổ ngữ kết quả 破: 剪破 (cắt rách, cắt thủng)."
    }
];
