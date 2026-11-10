import { getAllProducts } from '@/lib/products';
import { absoluteUrl } from '@/lib/schema';

export const dynamic = 'force-dynamic';
export const revalidate = 86400; // 24 hours

export async function GET() {
    const products = await getAllProducts();

    const itemsXml = products.map((product) => {
        const productUrl = absoluteUrl(`/san-pham/${product.slug}`);
        const imageUrl = absoluteUrl(product.images || '/placeholder-plant.svg');
        const price = `${product.price} VND`;
        // Clean description for XML
        const desc = (product.description || product.name)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
        const title = product.name
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');

        return `
    <item>
      <g:id>${product.slug}</g:id>
      <g:title>${title}</g:title>
      <g:description>${desc}</g:description>
      <g:link>${productUrl}</g:link>
      <g:image_link>${imageUrl}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>in_stock</g:availability>
      <g:identifier_exists>no</g:identifier_exists>
      <g:product_type>${product.category || 'Cây Cảnh'}</g:product_type>
      <g:price>${price}</g:price>
      <g:brand>Cây Cảnh Đà Nẵng</g:brand>
    </item>`;
    }).join('');

    const xml = `<?xml version="1.0"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Cây Cảnh Đà Nẵng</title>
    <link>${absoluteUrl('/')}</link>
    <description>Danh sách sản phẩm từ Cây Cảnh Đà Nẵng</description>
    ${itemsXml}
  </channel>
</rss>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
        },
    });
}
