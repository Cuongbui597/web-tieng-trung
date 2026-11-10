import 'server-only';

export function getClientMeta(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : null;
  const userAgent = request.headers.get('user-agent') || null;
  return { ip: ip || null, userAgent };
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email ?? '').trim());
}

export function getContentLength(request) {
  const raw = request.headers.get('content-length');
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

export function isBodyTooLarge(request, maxBytes) {
  const len = getContentLength(request);
  if (len === null) return false;
  return len > maxBytes;
}

function stripNullBytes(value) {
  return String(value ?? '').replace(/\0/g, '');
}

export function sanitizeText(
  value,
  {
    min = 0,
    max = 500,
    allowNewlines = false,
    collapseWhitespace = true,
  } = {},
) {
  let text = stripNullBytes(value).trim();

  if (!allowNewlines) {
    text = text.replace(/[\r\n\t]+/g, ' ');
  }

  if (collapseWhitespace) {
    text = text.replace(/\s+/g, allowNewlines ? ' ' : ' ');
  }

  if (max > 0 && text.length > max) {
    text = text.slice(0, max);
  }

  if (text.length < min) return '';
  return text;
}
