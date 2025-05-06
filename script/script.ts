import { db } from "../src/app/db"; // or use relative path if alias isn't configured
import { productsTable } from "../src/app/db/schema";

async function createProducts() {
  const newProducts = [
    {
      name: "EEzshoes",
      description: "EExpensEEve",
      price: 9999,
      quantity: 190,
      image: "https://sectionstore.cz/cdn/shop/files/adidasYeezyFoamRNNRStoneSalt.jpg",
    },
    {
      name: "gEExiEExEEfu",
      description: "*shed tears*",
      price: 200,
      quantity: 50,
      image: "https://imgcdn.cna.com.tw/www/WebPhotos/1024/20211109/1640x1640_171043386552.jpg",
    },
  ];

  try {
    const result = await db.insert(productsTable).values(newProducts).returning();
    console.log("Products inserted:", result);
  } catch (err) {
    console.error("Insert failed:", err);
  }
}

createProducts();
