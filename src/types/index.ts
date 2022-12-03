export interface Specialist {
  key: number;
  name: string;
  format: number;
  gender: number;
  city: string;
  price: number;
  photo: string;
}

export interface UserConfig {
    gender: number;
    format: number;
    city: string;
    price: number;
}