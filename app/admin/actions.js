'use server';

import { revalidatePath } from 'next/cache';

export async function deleteDrug(id) {
    await fetch(`http://localhost:4000/drugs/${id}`, {
        method: 'DELETE',
    });

    //on-demand revalidation
    revalidatePath('/admin');
    revalidatePath('/collection');
    revalidatePath(`/collection/${id}`);
}