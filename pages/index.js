import Head from 'next/head';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import styles from './index.module.css';

export default function HomePage({ products, categories, error }) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Discover Our Products',
    description: 'Exclusive collection of products',
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.title,
        image: product.image,
        description: product.description,
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: 'USD',
        },
      },
    })),
  };

  return (
    <>
      <Head>
        <title>METTAMORPHOSE | Discover Products</title>
        <meta name="description" content="Discover our exclusive collection of fashion products. Shop men, women and kids clothing at METTAMORPHOSE." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="METTAMORPHOSE | Discover Products" />
        <meta property="og:description" content="Discover our exclusive collection of fashion products." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mettamorphose.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="METTAMORPHOSE | Discover Products" />
        <meta name="twitter:description" content="Discover our exclusive collection of fashion products." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      <Header />
      <main>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <ol>
            <li><a href="/">HOME</a></li>
            <li aria-hidden="true"> &gt; </li>
            <li><a href="/mens">MENS TOP WEAR</a></li>
            <li aria-hidden="true"> &gt; </li>
            <li aria-current="page">DISCOVER</li>
          </ol>
        </nav>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>DISCOVER OUR PRODUCTS</h1>
          <p className={styles.heroSubtitle}>Explore our wide range of carefully curated products</p>
        </section>
        <div className={styles.contentArea}>
          {error && (
            <p className={styles.errorMsg} role="alert">
              Failed to load products. Please try refreshing the page.
            </p>
          )}
          <ProductGrid products={products} categories={categories} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      fetch('https://fakestoreapi.com/products'),
      fetch('https://fakestoreapi.com/products/categories'),
    ]);
    const products = await productsRes.json();
    const categories = await categoriesRes.json();
    return { props: { products, categories } };
  } catch (error) {
    console.error('Failed to fetch products or categories:', error);
    return { props: { products: [], categories: [], error: true } };
  }
}
