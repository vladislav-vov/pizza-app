import {
	Cart,
	CartItem,
	Ingredient,
	Product,
	ProductItem,
} from '@prisma/client';

export type CartItemDTO = CartItem & {
	productItem: ProductItem & { product: Product; ingredients: Ingredient[] };
	ingredients: Ingredient[];
};

export type CartDTO = Cart & {
	items: CartItemDTO[];
};

export interface CreatedCartItem {
	productItemId: number;
	ingredientIds: number[];
}
