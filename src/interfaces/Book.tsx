export interface Book {
    title: string,
    key: string,
    author_name: string[] | undefined,
    subjects: string[] | undefined,
    publish_year: number | undefined,
    cover_edition_key: string | undefined,
    amount: number
}