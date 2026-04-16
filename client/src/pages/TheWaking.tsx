import BookDetailPage from "@/components/BookDetailPage";
import Seo from "@/components/Seo";
import { bookPageContent } from "@shared/siteContent";

export default function TheWaking() {
  return <BookDetailPage book={bookPageContent["/the-waking"]} seo={<Seo path="/the-waking" />} />;
}
