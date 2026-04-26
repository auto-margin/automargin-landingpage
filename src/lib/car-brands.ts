import carData from "@/../public/car/data.json";

export type CarBrandLogo = {
  name: string;
  slug: string;
  /**
   * Path under /public
   * Example: /car/bmw.png
   */
  logoSrc: string;
};

type CarDataEntry = {
  name: string;
  slug: string;
  image?: {
    localThumb?: string;
    localOptimized?: string;
    localOriginal?: string;
  };
};

/**
 * Brand logos shipped in `public/car/*.png`.
 * We derive the list from `public/car/data.json` (name/slug) and map to local assets.
 */
export const CAR_BRAND_LOGOS: CarBrandLogo[] = (carData as CarDataEntry[])
  .map((b) => ({
    name: b.name,
    slug: b.slug,
    logoSrc: `/car/${b.slug}.png`,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

