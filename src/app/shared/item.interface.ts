/**
 * Title: item.interface.ts
 * Author: Professor Krasso
 * modified by: Hannah Del Real
 * Date: 01/24/24
 */

export interface Category {
  categoryTitle: string;
  categoryColor: string;
}
export interface Item {
  _id?: string;
  text: string;
  category: Category

}