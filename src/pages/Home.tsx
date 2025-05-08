
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchCategories } from '@/utils/api';
import ProductList from '@/components/ProductList';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const heroImages = [
  {
    id: 1,
    image: 'https://i.ibb.co/cDLBk5h/bg-1.jpg',
    title: 'Summer Collection',
    description: 'Get upto 50% off on summer collection',
    link: '/category/women\'s%20clothing',
  },
  {
    id: 2,
    image: 'https://i.ibb.co/6sMvTC5/bg-2.jpg',
    title: 'New Electronics',
    description: 'Latest gadgets and accessories',
    link: '/category/electronics',
  },
  {
    id: 3,
    image: 'https://i.ibb.co/HdM0KTF/bg-3.jpg',
    title: 'Jewelry Collection',
    description: 'Exclusive designs at amazing prices',
    link: '/category/jewelery',
  }
];

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  
  // Fetch all products
  const { data: products = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });
  
  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  // Set featured products once data is loaded
  useEffect(() => {
    if (products.length > 0) {
      // Get random products for featured section
      const randomProducts = [...products]
        .sort(() => 0.5 - Math.random())
        .slice(0, 8);
      setFeaturedProducts(randomProducts);
    }
  }, [products]);

  // Group products by category
  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category).slice(0, 4);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Hero Carousel */}
      <section className="mb-8">
        <Carousel className="w-full">
          <CarouselContent>
            {heroImages.map((item) => (
              <CarouselItem key={item.id}>
                <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden rounded-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center p-8 text-white">
                    <h2 className="text-2xl md:text-4xl font-bold mb-2">{item.title}</h2>
                    <p className="mb-4">{item.description}</p>
                    <Link to={item.link}>
                      <Button className="bg-ekart-orange hover:bg-orange-600 inline-flex">
                        Shop Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link to="/products" className="text-ekart-purple hover:underline flex items-center">
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <ProductList 
          products={featuredProducts} 
          isLoading={isLoadingProducts} 
        />
      </section>

      {/* Category Sections */}
      {categories.map((category: string) => (
        <section key={category} className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold capitalize">{category}</h2>
            <Link to={`/category/${category}`} className="text-ekart-purple hover:underline flex items-center">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <ProductList 
            products={getProductsByCategory(category)} 
            isLoading={isLoadingProducts} 
          />
        </section>
      ))}
    </div>
  );
};

export default Home;
