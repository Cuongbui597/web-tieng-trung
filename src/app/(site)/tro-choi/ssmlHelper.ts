/**
 * ssmlHelper.ts - Trình xử lý định dạng SSML (Speech Synthesis Markup Language)
 * và tối ưu hóa âm điệu, ngắt nhịp cho trò chơi Bậc Thầy Ghép Câu.
 */

export interface SSMLOptions {
    rate?: number;         // Tốc độ (0.65 - 1.0)
    pitch?: string;        // Cao độ (ví dụ: '+0Hz', 'medium')
    breakTimeMs?: number;  // Thời gian ngắt nghỉ giữa các cụm từ (mặc định 220ms)
    voiceName?: string;    // Tên giọng đọc ưu tiên
}

/**
 * Tạo chuỗi SSML XML chuẩn W3C từ các khối từ (chunks) của câu
 */
export function buildSentenceSSML(
    chunks: string[],
    options: SSMLOptions = {}
): string {
    const { rate = 0.72, breakTimeMs = 220, pitch = '+0Hz', voiceName = 'zh-CN-XiaoxiaoNeural' } = options;
    const ratePercent = Math.round((rate - 1.0) * 100);
    const rateStr = ratePercent >= 0 ? `+${ratePercent}%` : `${ratePercent}%`;

    const body = chunks
        .map((chunk, idx) => {
            const isLast = idx === chunks.length - 1;
            const breakTag = isLast ? '' : `<break time="${breakTimeMs}ms"/>`;
            return `${chunk.trim()} ${breakTag}`.trim();
        })
        .join(' ');

    return `<?xml version="1.0" encoding="UTF-8"?>
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="zh-CN">
  <voice name="${voiceName}">
    <prosody rate="${rateStr}" pitch="${pitch}">
      <s>${body}</s>
    </prosody>
  </voice>
</speak>`;
}

/**
 * Thuật toán chọn giọng đọc tiếng Trung chất lượng cao nhất hiện có trên thiết bị:
 * 1. Giọng Neural / Online tự nhiên (Edge / Chrome: Xiaoxiao, Yunxi, Yunjian)
 * 2. Giọng chuẩn Apple iOS / macOS (Ting-Ting, Sin-ji)
 * 3. Giọng Google TTS trên Android (Google 普通话)
 * 4. Giọng zh-CN chuẩn hệ thống
 */
export function selectBestChineseVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
    if (!voices || voices.length === 0) return null;

    // 1. Ưu tiên cao nhất: Giọng Microsoft Online Neural siêu tự nhiên trên Edge/Windows
    const neuralOnline = voices.find(v => 
        (v.lang === 'zh-CN' || v.lang === 'zh_CN' || v.lang === 'cmn-Hans-CN') &&
        (v.name.includes('Online') || v.name.includes('Natural') || v.name.includes('Xiaoxiao') || v.name.includes('Yunxi') || v.name.includes('Yunjian'))
    );
    if (neuralOnline) return neuralOnline;

    // 2. Giọng Apple iOS Safari / macOS chất lượng cao (Ting-Ting, Sin-ji)
    const appleVoice = voices.find(v => 
        (v.lang === 'zh-CN' || v.lang === 'zh_CN') &&
        (v.name.includes('Ting-Ting') || v.name.includes('Sin-ji') || v.name.includes('Yu-shu'))
    );
    if (appleVoice) return appleVoice;

    // 3. Giọng Google Chrome / Android
    const googleVoice = voices.find(v => 
        (v.lang === 'zh-CN' || v.lang === 'cmn-Hans-CN') &&
        (v.name.includes('Google') || v.name.includes('普通话'))
    );
    if (googleVoice) return googleVoice;

    // 4. Bất kỳ giọng nào có lang là zh-CN chuẩn
    const standardZhCN = voices.find(v => v.lang === 'zh-CN' || v.lang === 'zh_CN' || v.lang === 'cmn-Hans-CN');
    if (standardZhCN) return standardZhCN;

    // 5. Fallback cuối cùng: Bất kỳ giọng tiếng Trung nào
    return voices.find(v => v.lang.startsWith('zh') || v.lang.includes('cmn')) || null;
}

/**
 * Chuẩn hóa chuỗi phát âm cho chế độ đọc toàn câu (Flow mode):
 * Giữ nguyên các dấu ngắt câu tự nhiên (，。！？) để TTS tự động điều tiết hơi thở và hạ giọng cuối câu.
 */
export function formatChineseSentenceForSpeech(text: string): string {
    // Chỉ loại bỏ ký tự rác hoặc dấu ngoặc lạ, giữ lại dấu câu chuẩn tiếng Trung
    return text
        .replace(/["'“”‘’]/g, '')
        .replace(/\s+/g, '')
        .trim();
}
