"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "solene_admin_token";

/**
 * Validates admin credentials and sets a secure HttpOnly cookie on success
 */
export async function loginAdmin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Retrieve admin credentials from environment variables (fallback to defaults if unset)
  const expectedEmail = process.env.ADMIN_EMAIL || "admin@solenecandle.com";
  const expectedPassword = process.env.ADMIN_PASSWORD || "solene-admin-2026";

  if (email === expectedEmail && password === expectedPassword) {
    const cookieStore = cookies();
    cookieStore.set({
      name: COOKIE_NAME,
      value: "authenticated",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
    return { success: true };
  }

  return { success: false, error: "Invalid email or password" };
}

/**
 * Deletes the admin session cookie
 */
export async function logoutAdmin() {
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_NAME);
  return { success: true };
}

/**
 * Verifies if the admin session cookie is valid
 */
export async function checkAdminAuth() {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME);
  return token?.value === "authenticated";
}

/**
 * Product Server Actions
 */
export async function createProduct(data: {
  name: string;
  description: string;
  price: number;
  comparePrice?: number | null;
  scent: string;
  images: string[];
  size: string[];
  burnTime: string;
  ingredients: string;
  howToUse: string;
  stock: number;
  featured: boolean;
  bestseller: boolean;
  isNew: boolean;
  collectionId?: string | null;
}) {
  const isAuth = await checkAdminAuth();
  if (!isAuth) throw new Error("Unauthorized");

  // Create a clean URL slug from the product name
  const slug = data.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  const newProduct = await prisma.product.create({
    data: {
      name: data.name,
      slug,
      description: data.description,
      price: Number(data.price),
      comparePrice: data.comparePrice ? Number(data.comparePrice) : null,
      scent: data.scent,
      images: data.images,
      size: data.size,
      burnTime: data.burnTime,
      ingredients: data.ingredients,
      howToUse: data.howToUse,
      stock: Number(data.stock),
      featured: Boolean(data.featured),
      bestseller: Boolean(data.bestseller),
      isNew: Boolean(data.isNew),
      collectionId: data.collectionId || null,
    },
  });

  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath(`/shop/${slug}`);
  revalidatePath("/collections");
  if (data.collectionId) {
    const col = await prisma.collection.findUnique({ where: { id: data.collectionId } });
    if (col) revalidatePath(`/collections/${col.slug}`);
  }

  return { success: true, product: newProduct };
}

export async function updateProduct(
  id: string,
  data: {
    name: string;
    description: string;
    price: number;
    comparePrice?: number | null;
    scent: string;
    images: string[];
    size: string[];
    burnTime: string;
    ingredients: string;
    howToUse: string;
    stock: number;
    featured: boolean;
    bestseller: boolean;
    isNew: boolean;
    collectionId?: string | null;
  }
) {
  const isAuth = await checkAdminAuth();
  if (!isAuth) throw new Error("Unauthorized");

  const slug = data.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  const updatedProduct = await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      slug,
      description: data.description,
      price: Number(data.price),
      comparePrice: data.comparePrice ? Number(data.comparePrice) : null,
      scent: data.scent,
      images: data.images,
      size: data.size,
      burnTime: data.burnTime,
      ingredients: data.ingredients,
      howToUse: data.howToUse,
      stock: Number(data.stock),
      featured: Boolean(data.featured),
      bestseller: Boolean(data.bestseller),
      isNew: Boolean(data.isNew),
      collectionId: data.collectionId || null,
    },
  });

  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath(`/shop/${slug}`);
  revalidatePath("/collections");
  
  return { success: true, product: updatedProduct };
}

export async function deleteProduct(id: string) {
  const isAuth = await checkAdminAuth();
  if (!isAuth) throw new Error("Unauthorized");

  const deletedProduct = await prisma.product.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/collections");

  return { success: true, product: deletedProduct };
}

/**
 * Collection Server Actions
 */
export async function createCollection(data: {
  name: string;
  description: string;
  image: string;
}) {
  const isAuth = await checkAdminAuth();
  if (!isAuth) throw new Error("Unauthorized");

  const slug = data.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  const newCollection = await prisma.collection.create({
    data: {
      name: data.name,
      slug,
      description: data.description,
      image: data.image,
    },
  });

  revalidatePath("/collections");
  revalidatePath(`/collections/${slug}`);

  return { success: true, collection: newCollection };
}

/**
 * Order Server Actions
 */
export async function updateOrderStatus(id: string, status: string) {
  const isAuth = await checkAdminAuth();
  if (!isAuth) throw new Error("Unauthorized");

  const updatedOrder = await prisma.order.update({
    where: { id },
    data: {
      status: status,
    },
  });

  revalidatePath("/admin/orders");
  return { success: true, order: updatedOrder };
}

/**
 * Order Creation (Stores orders made by clients on Checkout)
 */
export async function createOrder(data: {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
  phone: string;
  total: number;
  items: {
    productId: string;
    productName: string;
    size: string;
    price: number;
    quantity: number;
  }[];
}) {
  const newOrder = await prisma.order.create({
    data: {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      city: data.city,
      postcode: data.postcode,
      country: data.country,
      phone: data.phone,
      total: Number(data.total),
      items: {
        create: data.items.map((item) => ({
          productId: item.productId,
          size: item.size,
          price: Number(item.price),
          quantity: Number(item.quantity),
        })),
      },
    },
  });

  revalidatePath("/admin/orders");
  return { success: true, order: newOrder };
}
