import BookDetailPage from "@/components/BookDetailPage";
import Seo from "@/components/Seo";
import { bookPageContent } from "@shared/siteContent";

export default function TheStanding() {
  return <BookDetailPage book={bookPageContent["/the-standing"]} seo={<Seo path="/the-standing" />} />;
}
