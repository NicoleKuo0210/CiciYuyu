export const categoryList = ['miscellaneous', 'clothing', 'book', 'electronic'] as const;
export type Category = typeof categoryList[number]; 