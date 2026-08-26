export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: "Tamgaz Mühendislik",
    image: "https://tamgazmuhendislik.com/logo.png",
    "@id": "https://tamgazmuhendislik.com",
    url: "https://tamgazmuhendislik.com",
    telephone: "+905000000000",
    priceRange: "₺₺",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Merkez Mah. Sanayi Cad. No:12",
      addressLocality: "İzmir",
      addressRegion: "İzmir",
      postalCode: "35000",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 36.884804,
      longitude: 30.704044,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:30",
      closes: "18:30",
    },
    sameAs: [
      "https://www.facebook.com/tamgazmuhendislik",
      "https://www.instagram.com/tamgazmuhendislik",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
