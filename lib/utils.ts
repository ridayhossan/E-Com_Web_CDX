export function slugify(value: string) { return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''); }
export function money(value?: number) { return `$${Number(value || 0).toFixed(2)}`; }
export function serialize<T>(data: T): T { return JSON.parse(JSON.stringify(data)); }
