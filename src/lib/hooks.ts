import { useState, useCallback } from "react";

export interface CartItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface WishlistItem {
  productId: number;
}

/**
 * Hook for managing shopping cart functionality
 */
export const useCart = () => {
  // Initialize cart items from localStorage using state initializer function
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error);
        return [];
      }
    }
    return [];
  });

  // Initialize cart count from cart items
  const [cartCount, setCartCount] = useState(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  });

  const updateCartCount = (items: CartItem[]) => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  };

  const addToCart = useCallback((productId: number, quantity: number = 1, price: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.productId === productId);
      let newItems: CartItem[];

      if (existingItem) {
        newItems = prevItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...prevItems, { productId, quantity, price }];
      }

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(newItems));
      updateCartCount(newItems);
      console.log(`Added ${quantity} item(s) to cart. Product ID: ${productId}`);
      return newItems;
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.productId !== productId);
      localStorage.setItem("cart", JSON.stringify(newItems));
      updateCartCount(newItems);
      console.log(`Removed product ${productId} from cart`);
      return newItems;
    });
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter((item) => item.productId !== productId);
      }

      const newItems = prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );

      localStorage.setItem("cart", JSON.stringify(newItems));
      updateCartCount(newItems);
      return newItems;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setCartCount(0);
    localStorage.removeItem("cart");
    console.log("Cart cleared");
  }, []);

  return {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
};

/**
 * Hook for managing wishlist functionality
 */
export const useWishlist = () => {
  // Initialize wishlist items from localStorage using state initializer function
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        return JSON.parse(savedWishlist);
      } catch (error) {
        console.error("Failed to load wishlist from localStorage:", error);
        return [];
      }
    }
    return [];
  });

  // Initialize wishlist count from wishlist items
  const [wishlistCount, setWishlistCount] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        const items = JSON.parse(savedWishlist);
        return items.length;
      } catch (error) {
        console.error("Failed to load wishlist from localStorage:", error);
        return 0;
      }
    }
    return 0;
  });

  const addToWishlist = useCallback((productId: number) => {
    setWishlistItems((prevItems) => {
      // Check if already in wishlist
      if (prevItems.some((item) => item.productId === productId)) {
        console.log(`Product ${productId} is already in wishlist`);
        return prevItems;
      }

      const newItems = [...prevItems, { productId }];
      localStorage.setItem("wishlist", JSON.stringify(newItems));
      setWishlistCount(newItems.length);
      console.log(`Added product ${productId} to wishlist`);
      return newItems;
    });
  }, []);

  const removeFromWishlist = useCallback((productId: number) => {
    setWishlistItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.productId !== productId);
      localStorage.setItem("wishlist", JSON.stringify(newItems));
      setWishlistCount(newItems.length);
      console.log(`Removed product ${productId} from wishlist`);
      return newItems;
    });
  }, []);

  const toggleWishlist = useCallback((productId: number) => {
    setWishlistItems((prevItems) => {
      const isInWishlist = prevItems.some((item) => item.productId === productId);

      let newItems: WishlistItem[];
      if (isInWishlist) {
        newItems = prevItems.filter((item) => item.productId !== productId);
        console.log(`Removed product ${productId} from wishlist`);
      } else {
        newItems = [...prevItems, { productId }];
        console.log(`Added product ${productId} to wishlist`);
      }

      localStorage.setItem("wishlist", JSON.stringify(newItems));
      setWishlistCount(newItems.length);
      return newItems;
    });
  }, []);

  const isInWishlist = useCallback((productId: number) => {
    return wishlistItems.some((item) => item.productId === productId);
  }, [wishlistItems]);

  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
    setWishlistCount(0);
    localStorage.removeItem("wishlist");
    console.log("Wishlist cleared");
  }, []);

  return {
    wishlistItems,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
  };
};

/**
 * Hook for managing product filters
 */
export interface FilterState {
  category: string;
  priceRange: { min: number; max: number };
  ratings: number[];
  searchQuery: string;
}

export const useProductFilters = () => {
  const [filters, setFilters] = useState<FilterState>({
    category: "",
    priceRange: { min: 0, max: 1000 },
    ratings: [],
    searchQuery: "",
  });

  const updateCategory = useCallback((category: string) => {
    setFilters((prev) => ({ ...prev, category }));
    console.log(`Filter by category: ${category || "All"}`);
  }, []);

  const updatePriceRange = useCallback((min: number, max: number) => {
    setFilters((prev) => ({ ...prev, priceRange: { min, max } }));
    console.log(`Filter by price: $${min} - $${max}`);
  }, []);

  const updateRatings = useCallback((ratings: number[]) => {
    setFilters((prev) => ({ ...prev, ratings }));
    console.log(`Filter by ratings: ${ratings.join(", ")}★`);
  }, []);

  const updateSearchQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
    console.log(`Search query: ${query}`);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      category: "",
      priceRange: { min: 0, max: 1000 },
      ratings: [],
      searchQuery: "",
    });
    console.log("Filters cleared");
  }, []);

  return {
    filters,
    updateCategory,
    updatePriceRange,
    updateRatings,
    updateSearchQuery,
    clearFilters,
  };
};

/**
 * Hook for managing notification/toast messages
 */
export interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  duration?: number;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, type: "success" | "error" | "info" | "warning" = "info", duration = 3000) => {
      const id = Math.random().toString(36).substr(2, 9);
      const toast = { id, message, type, duration };

      setToasts((prev) => [...prev, toast]);

      if (duration > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
      }

      return id;
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return {
    toasts,
    showToast,
    removeToast,
  };
};
