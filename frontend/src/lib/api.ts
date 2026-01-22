export interface HeroImage {
    id: number;
    image_url: string;
}

export interface BiographyExperience {
    title: string;
}

export interface BiographyData {
    id: number;
    content: string;
    image_url: string;
    experience: BiographyExperience[];
}

export interface MeasurementData {
    id: number;
    images_url: string[];
    height_cm: number | null;
    weight_kg: number | null;
    chest_in: number | null;
    waist_in: number | null;
    hips_in: number | null;
    shoe_size: string | null;
    shoe_region: string | null;
    suit_size: string | null;
    jacket_size: string | null;
    eye_color: string | null;
    hair_color: string | null;
    hair_length: string | null;
    skin_tone: string | null;
    body_type: string | null;
    tattoos: string | null;
    piercings: string | null;
}

export interface GalleryItem {
    id: number;
    gallery_id: number;
    media_type: 'image' | 'video';
    image_path: string | null;
    video_path: string | null;
    is_published: boolean;
    order: number;
    image_url: string | null;
    video_url: string | null;
}

type UnknownRecord = Record<string, unknown>;

export async function getHeroImages(): Promise<HeroImage[]> {
    try {
        const res = await fetch('http://backend.test/api/heroes', { cache: 'no-store' });
        if (!res.ok) return [];
        const data = await res.json();
        return Array.isArray(data) ? data : data.data || [];
    } catch {
        return [];
    }
}

export async function getBiography(): Promise<BiographyData | null> {
    try {
        const res = await fetch('http://backend.test/api/biographies', { cache: 'no-store' });
        if (!res.ok) return null;
        const data = await res.json();
        // API bir dizi döndürüyor, ilk elemanı al
        return Array.isArray(data) && data.length > 0 ? data[0] : null;
    } catch {
        return null;
    }
}

export async function getMeasurements(): Promise<MeasurementData | null> {
    try {
        const res = await fetch('http://backend.test/api/measurements', { cache: 'no-store' });
        if (!res.ok) return null;
        const data = await res.json();
        // API bir dizi döndürüyor, ilk elemanı al
        return Array.isArray(data) && data.length > 0 ? data[0] : null;
    } catch {
        return null;
    }
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
    try {
        const res = await fetch('http://backend.test/api/galleries', { cache: 'no-store' });
        if (!res.ok) return [];
        const data = await res.json();
        const normalized = normalizeGalleryPayload(data);
        return normalized
            .filter((item: GalleryItem) => item.is_published !== false)
            .filter((item: GalleryItem) => Boolean(item.image_url || item.video_url));
    } catch (error) {
        console.error('getGalleryItems failed', error);
        return [];
    }
}

function normalizeGalleryPayload(payload: unknown): GalleryItem[] {
    if (Array.isArray(payload)) {
        return flattenGalleryContainers(payload as UnknownRecord[]);
    }

    if (payload && typeof payload === 'object') {
        const record = payload as UnknownRecord;
        const containerKeys = ['data', 'galleries', 'items'];
        for (const key of containerKeys) {
            const candidate = record[key];
            if (Array.isArray(candidate)) {
                const flattened = flattenGalleryContainers(candidate as UnknownRecord[]);
                if (flattened.length) {
                    return flattened;
                }
            }
        }

        const photos = Array.isArray(record['photos'])
            ? (record['photos'] as UnknownRecord[]).map((item, idx) => coerceGalleryItem(item, 'image', idx))
            : [];

        const videos = Array.isArray(record['videos'])
            ? (record['videos'] as UnknownRecord[]).map((item, idx) => coerceGalleryItem(item, 'video', idx))
            : [];

        if (photos.length || videos.length) {
            return [...photos, ...videos];
        }
    }

    return [];
}

function flattenGalleryContainers(entries: UnknownRecord[]): GalleryItem[] {
    const flattened: GalleryItem[] = [];

    entries.forEach((entry, idx) => {
        const mediaItems = entry['media_items'];
        if (Array.isArray(mediaItems)) {
            const baseIndex = flattened.length;
            (mediaItems as UnknownRecord[]).forEach((media, mediaIdx) => {
                flattened.push(
                    coerceGalleryItem(
                        media,
                        inferFallbackType(media),
                        baseIndex + mediaIdx
                    )
                );
            });
        } else if (hasMediaShape(entry)) {
            flattened.push(coerceGalleryItem(entry, inferFallbackType(entry), idx));
        }
    });

    if (!flattened.length) {
        return entries.map((entry, idx) => coerceGalleryItem(entry, inferFallbackType(entry), idx));
    }

    return flattened;
}

function hasMediaShape(entry: UnknownRecord): boolean {
    return Boolean(
        entry['media_type'] ||
        entry['image_url'] ||
        entry['video_url'] ||
        entry['image_path'] ||
        entry['video_path']
    );
}

function inferFallbackType(item: UnknownRecord): 'image' | 'video' {
    const type = item['media_type'];
    if (type === 'video') return 'video';
    if (type === 'image') return 'image';
    if (typeof item['video_url'] === 'string' || typeof item['video_path'] === 'string') {
        return 'video';
    }
    return 'image';
}

function coerceGalleryItem(item: UnknownRecord, fallbackType: 'image' | 'video', idx: number): GalleryItem {
    const fallbackUrl = typeof item['url'] === 'string' ? (item['url'] as string) : null;
    const imagePath = typeof item['image_path'] === 'string' ? (item['image_path'] as string) : null;
    const videoPath = typeof item['video_path'] === 'string' ? (item['video_path'] as string) : null;
    const imageUrl = typeof item['image_url'] === 'string' ? (item['image_url'] as string) : null;
    const videoUrl = typeof item['video_url'] === 'string' ? (item['video_url'] as string) : null;
    const galleryId = typeof item['gallery_id'] === 'number' ? (item['gallery_id'] as number) : 0;
    const order = typeof item['order'] === 'number' ? (item['order'] as number) : idx;
    const published = typeof item['is_published'] === 'boolean' ? (item['is_published'] as boolean) : true;
    const id = typeof item['id'] === 'number' ? (item['id'] as number) : idx;
    const mediaTypeRaw = item['media_type'];
    const mediaType = mediaTypeRaw === 'video' || mediaTypeRaw === 'image' ? mediaTypeRaw : fallbackType;

    return {
        id,
        gallery_id: galleryId,
        media_type: mediaType,
        image_path: imagePath,
        video_path: videoPath,
        is_published: published,
        order,
        image_url: imageUrl ?? (fallbackType === 'image' ? fallbackUrl : null),
        video_url: videoUrl ?? (fallbackType === 'video' ? fallbackUrl : null),
    };
}
