'use server';

import { revalidateTag } from 'next/cache';

export async function revalidateFetchData(tagName: string) {
	revalidateTag(tagName);
}
