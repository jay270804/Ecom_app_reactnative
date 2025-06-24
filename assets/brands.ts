export type Brand = {
  id: string;
  name: string;
  image: any;
};

export const brands: Brand[] = [
  { id: "samsung", name: "Samsung", image: require("@/assets/images/Samsung_Logo.webp") },
  { id: "casio", name: "Casio", image: require("@/assets/images/Casio_Brand.webp") },
  { id: "apple", name: "Apple INC.", image: require("@/assets/images/Apple_logo.webp") },
  { id: "sony", name: "Sony", image: require("@/assets/images/Sony_Brand.webp") },
  { id: "lg", name: "LG", image: require("@/assets/images/LG_Brand.webp") },
  { id: "mi", name: "Mi", image: require("@/assets/images/MI_Brand.png") },
];