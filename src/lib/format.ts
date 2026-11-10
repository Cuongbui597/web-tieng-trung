export function formatCurrency(amount: number | string | undefined | null): string {
    if (!amount) return 'Liên hệ';
    const num = Number(amount);
    if (isNaN(num)) return String(amount);
    // Format with dot separator and currency symbol
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num).replace(/\./g, ',');
}

export function formatPrice(amount: number | string | undefined | null): string {
    if (!amount) return 'Liên hệ';

    // Strip everything except digits
    const str = String(amount).replace(/\D/g, '');
    const num = Number(str);

    if (str === '' || isNaN(num)) return 'Liên hệ';

    // Format: 100000 -> 100.000đ
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + 'đ';
}
