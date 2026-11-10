import { getAllProducts, getAllArticles, getAllServices } from '@/lib/server';
import { slugify, STORE_CATEGORIES } from '@/lib/client';

export const revalidate = 86400;

export default async function sitemap() {
  const baseUrl = 'https://chamsoccanhquan.com';
  const now = new Date();

  const allProducts = await getAllProducts();
  const products = allProducts.map((product) => ({
    url: `${baseUrl}/cua-hang/${slugify(product.category || 'Khác')}/${product.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const categories = STORE_CATEGORIES.map((cat) => ({
    url: `${baseUrl}/cua-hang/${cat}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const articles = (await getAllArticles()).map((article) => {
    let date = new Date(article.date);
    if (isNaN(date.getTime())) {
      date = now;
    }
    return {
      url: `${baseUrl}/bai-viet/${article.slug}`,
      lastModified: date,
      changeFrequency: 'monthly',
      priority: 0.7,
    };
  });

  const services = (await getAllServices()).map((service) => ({
    url: `${baseUrl}/dich-vu/${service.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const staticPages = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/cua-hang`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dich-vu`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/su-menh`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/chinh-sach`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/chinh-sach/huong-dan-thanh-toan`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/chinh-sach/chinh-sach-van-chuyen`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/chinh-sach/chinh-sach-doi-tra-hang`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/chinh-sach/chinh-sach-bao-mat`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/san-pham`, // Keep for history/redirect
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/bai-viet`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gioi-thieu`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/lien-he`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  return [...staticPages, ...categories, ...products, ...articles, ...services];
}
