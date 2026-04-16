import BookDetailPage from "@/components/BookDetailPage";
import Seo from "@/components/Seo";
import { bookPageContent } from "@shared/siteContent";

export default function TheCompanion() {
  return <BookDetailPage book={bookPageContent["/the-companion"]} seo={<Seo path="/the-companion" />} />;
}
