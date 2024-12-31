import { getAuthors } from "@/app/services/Services";
import { AuthorGrid } from "@/components/author/AuthorList";

export default async function AuthorsPage() {
  const authors = await getAuthors();

  return (
    <div className="mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-8">Tác giả</h1>
      <AuthorGrid authors={authors} />
    </div>
  );
}
