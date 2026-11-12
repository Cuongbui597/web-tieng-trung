import 'server-only';

export const BASE_URL = 'https://tiengtrunghsk.vn';

export function absoluteUrl(input: unknown): string {
    if (!input) return BASE_URL;
    const value = String(input);
    if (value.startsWith('http://') || value.startsWith('https://')) return value;
    if (value.startsWith('/')) return `${BASE_URL}${value}`;
    return `${BASE_URL}/${value}`;
}

function stripMarkdown(markdown: unknown): string {
    const text = String(markdown ?? '');
    return text
        .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // images
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links -> keep label
        .replace(/^\s{0,3}#+\s+/gm, '') // headings
        .replace(/^\s*[-*+]\s+/gm, '') // unordered list markers
        .replace(/^\s*\d+\.\s+/gm, '') // ordered list markers
        .replace(/`{1,3}[^`]*`{1,3}/g, '') // inline code
        .replace(/\s+/g, ' ')
        .trim();
}

export function parseVndPrice(value: unknown): number | null {
    const str = String(value ?? '');
    const digits = str.replace(/[^0-9]/g, '');
    if (!digits) return null;
    const n = Number.parseInt(digits, 10);
    return Number.isFinite(n) ? n : null;
}

export function getLocalBusinessSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        '@id': `${BASE_URL}/#localbusiness`,
        name: 'Trung Tâm Tiếng Trung HSK Việt',
        image: `${BASE_URL}/og.svg`,
        logo: `${BASE_URL}/logo.png`,
        url: BASE_URL,
        telephone: '+84972910319',
        priceRange: '1200000VND-2500000VND',
        founder: {
            '@type': 'Person',
            name: 'Lê Nguyễn Hồng Yên',
            jobTitle: 'Founder & Giảng Viên Phụ Trách Chuyên Môn',
            telephone: '+84972910319',
            alumniOf: 'Trường Đại học Ngoại ngữ - Đại học Đà Nẵng',
            knowsAbout: ['Tiếng Trung Thực Chiến', 'HSK 6', 'Phiên dịch Giày da Đài Loan', 'Đào tạo tiếng Trung'],
        },
        hasMap: 'https://maps.app.goo.gl/example',
        address: {
            '@type': 'PostalAddress',
            streetAddress: '485 Ngô Quyền',
            addressLocality: 'Đà Nẵng',
            addressRegion: 'Đà Nẵng',
            postalCode: '550000',
            addressCountry: 'VN',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 16.0471,
            longitude: 108.2068,
        },
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                opens: '08:00',
                closes: '20:00',
            },
        ],
        sameAs: [
            'https://facebook.com/tiengtrunghsk',
            'https://youtube.com/@tiengtrunghsk',
        ],
    };
}

interface CollectionPageSchemaProps {
    url: string;
    name: string;
    description: string;
    items: Array<{ url: string; name: string }>;
}

export function getCollectionPageSchema({ url, name, description, items }: CollectionPageSchemaProps) {
    return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${absoluteUrl(url)}#collection`,
        url: absoluteUrl(url),
        name: String(name ?? ''),
        description: String(description ?? ''),
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: items.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: absoluteUrl(item.url),
                name: item.name,
            }))
        }
    };
}

export function getWebSiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: BASE_URL,
        name: 'Trung Tâm Tiếng Trung HSK Việt',
        inLanguage: 'vi-VN',
        publisher: { '@id': `${BASE_URL}/#localbusiness` },
        potentialAction: {
            '@type': 'SearchAction',
            target: `${BASE_URL}/khoa-hoc?search={search_term_string}`,
            'query-input': 'required name=search_term_string',
        },
    };
}

interface BreadcrumbItem {
    name: string;
    url: string;
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: absoluteUrl(item.url),
        })),
    };
}

interface BlogPostingSchemaProps {
    url: string;
    title: string;
    description?: string;
    image?: string;
    author?: string;
    datePublished?: string;
    dateModified?: string;
    keywords?: string[];
}

export function getBlogPostingSchema({
    url,
    title,
    description,
    image,
    author,
    datePublished,
    dateModified,
    keywords,
}: BlogPostingSchemaProps) {
    const pageUrl = absoluteUrl(url);
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${pageUrl}#blogposting`,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': pageUrl,
        },
        headline: String(title ?? ''),
        description: String(description ?? ''),
        image: image ? [absoluteUrl(image)] : undefined,
        author: author
            ? {
                '@type': 'Person',
                name: String(author),
            }
            : undefined,
        publisher: {
            '@type': 'Organization',
            '@id': `${BASE_URL}/#localbusiness`,
            name: 'Trung Tâm Tiếng Trung HSK Việt',
            logo: {
                '@type': 'ImageObject',
                url: `${BASE_URL}/logo.png`
            }
        },
        datePublished: datePublished || undefined,
        dateModified: dateModified || datePublished || undefined,
        keywords: keywords ? keywords.join(', ') : undefined,
        inLanguage: 'vi-VN',
    };
}

interface FAQItem {
    question: string;
    answer: string;
}

export function getFAQSchema(faqs: FAQItem[]) {
    if (!Array.isArray(faqs) || faqs.length === 0) return null;

    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
            }
        }))
    };
}

interface ProductSchemaProps {
    url: string;
    name: string;
    image?: string;
    description?: string;
    category?: string;
    priceVnd?: number;
}

export function getProductSchema({ url, name, image, description, category, priceVnd }: ProductSchemaProps) {
    const pageUrl = absoluteUrl(url);
    const cleanDescription = stripMarkdown(description).slice(0, 500);

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        '@id': `${pageUrl}#product`,
        name: String(name ?? ''),
        url: pageUrl,
        image: image ? [absoluteUrl(image)] : undefined,
        description: cleanDescription || undefined,
        sku: pageUrl.split('/').pop(),
        brand: { '@type': 'Brand', name: 'Trung Tâm Tiếng Trung HSK Việt' },
        category: category ? String(category) : undefined,
        offers:
            typeof priceVnd === 'number'
                ? {
                    '@type': 'Offer',
                    url: pageUrl,
                    priceCurrency: 'VND',
                    price: String(priceVnd),
                    priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
                    availability: 'https://schema.org/InStock',
                    itemCondition: 'https://schema.org/NewCondition',
                    seller: { '@id': `${BASE_URL}/#localbusiness` },
                }
                : undefined,
        // Placeholder for reviews - activate when real data is available
        /*
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '125'
        }
        */
    };

    return schema;
}

interface ServiceSchemaProps {
    url: string;
    name: string;
    image?: string;
    description?: string;
    serviceType?: string;
}

export function getServiceSchema({ url, name, image, description, serviceType }: ServiceSchemaProps) {
    const pageUrl = absoluteUrl(url);
    const cleanDescription = stripMarkdown(description).slice(0, 500);

    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: String(name ?? ''),
        url: pageUrl,
        image: image ? [absoluteUrl(image)] : undefined,
        description: cleanDescription || undefined,
        serviceType: serviceType ? String(serviceType) : undefined,
        provider: { '@id': `${BASE_URL}/#localbusiness` },
        areaServed: { '@type': 'Country', name: 'Vietnam' },
        inLanguage: 'vi-VN',
    };
}

export function toJsonLd(schemaObject: any) {
    return JSON.stringify(schemaObject);
}
