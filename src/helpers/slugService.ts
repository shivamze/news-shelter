import slugify from "slugify";
import News from "@/src/models/newsModel"


export async function generateUniqueNewsSlug(title: string): Promise<string> {

    const baseSlug = slugify(title, {
        lower: true,
        strict: true,
        trim: true,
    })

    let slug = baseSlug;
    let count = 1;

    while (await News.exists({ slug})){
        slug = `${baseSlug}-${count}`;
        count++
    }

    return slug;
}
