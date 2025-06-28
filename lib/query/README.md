# TanStack Query Setup for React Native/Expo (Client App)

This directory contains the complete TanStack Query setup for your e-commerce client app.

## 📁 File Structure

```
lib/
├── api/
│   ├── client.ts          # Axios HTTP client with auth and error handling
│   ├── services.ts        # API service functions (client-only)
│   └── types.ts           # TypeScript interfaces (client-only)
└── query/
    ├── queryClient.ts     # TanStack Query configuration
    ├── provider.tsx       # QueryProvider component
    ├── hooks.ts           # Custom hooks for data fetching (client-only)
    └── example.tsx        # Usage example
```

## 🚀 Installation

First, install the required packages:

```bash
npm install @tanstack/react-query axios
```

For development tools (optional):
```bash
npm install @tanstack/react-query-devtools
```

## ⚙️ Configuration

### 1. API Base URL
Update the base URL in `lib/api/client.ts`:
```typescript
const API_BASE_URL = 'http://your-backend-url:3000';
```

### 2. React Native Specific Settings
The query client is configured with React Native optimizations:
- `refetchOnWindowFocus: false` - Not applicable in React Native
- `refetchOnReconnect: true` - Refetch when network reconnects
- Optimized cache times for mobile usage

### 3. Axios Configuration
- Automatic token injection via interceptors
- Request/response error handling
- Timeout configuration (10 seconds)
- FormData support for file uploads

## 🎯 Usage Examples

### Basic Data Fetching
```typescript
import { useProducts, useBrands } from '@/lib/query/hooks';

function MyComponent() {
  const { data, isLoading, error } = useProducts({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;

  return (
    <View>
      {data?.data?.data?.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </View>
  );
}
```

### Authentication
```typescript
import { useLogin, useGetProfile } from '@/lib/query/hooks';

function LoginScreen() {
  const login = useLogin();
  const { data: profile } = useGetProfile();

  const handleLogin = (credentials) => {
    login.mutate(credentials, {
      onSuccess: (response) => {
        // Store tokens and navigate
        console.log('Logged in:', response.data.user);
      }
    });
  };
}
```

### Filtering Products
```typescript
import { useProductsByCategory, useProductsByBrand } from '@/lib/query/hooks';

function CategoryProducts({ categoryId }) {
  const { data, isLoading } = useProductsByCategory(categoryId, {
    page: 1,
    limit: 20,
    sortBy: 'price',
    sortOrder: 'asc'
  });

  return (
    <View>
      {data?.data?.data?.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </View>
  );
}
```

## 🔧 Available Hooks

### Auth Hooks
- `useLogin()` - User login
- `useRegister()` - User registration
- `useLogout()` - User logout
- `useGetProfile()` - Get user profile
- `useUpdateProfile()` - Update user profile
- `useRefreshToken()` - Refresh access token
- `useRequestPasswordReset()` - Request password reset
- `useResetPassword()` - Reset password

### Product Hooks (Read-only)
- `useProducts(filters?)` - Get all products
- `useProduct(id)` - Get single product
- `useProductsByCategory(categoryId, filters?)` - Get products by category
- `useProductsByBrand(brandId, filters?)` - Get products by brand
- `useProductFilters()` - Get filter metadata

### Category Hooks (Read-only)
- `useCategories(params?)` - Get all categories
- `useCategory(id)` - Get single category

### Brand Hooks (Read-only)
- `useBrands(params?)` - Get all brands
- `useBrand(id)` - Get single brand

## 🎨 Features

### Automatic Caching
- Data is cached automatically
- Configurable stale times for different data types
- Background refetching when data becomes stale

### Error Handling
- Automatic retry with exponential backoff
- No retry on 4xx errors (client errors)
- Global error handling configuration

### Network Status
- Automatic refetch on network reconnection
- Loading states for all operations

## 🔒 Authentication

The API client automatically:
- Includes auth tokens in requests via axios interceptors
- Handles token refresh
- Clears cache on logout

## 📱 React Native Optimizations

- Disabled `refetchOnWindowFocus` (not applicable)
- Optimized cache times for mobile usage
- Network reconnection handling
- Memory-efficient caching

## 🚫 Admin Features Removed

This client app setup excludes all admin functionality:
- ❌ Product creation/update/delete
- ❌ Category management
- ❌ Brand management
- ❌ User management
- ❌ Statistics and analytics

These features are handled by a separate admin panel.

## 🐛 Development

In development mode, React Query DevTools are automatically included for debugging.

## 📝 Next Steps

1. **Update your components** to use the new hooks instead of dummy data
2. **Implement auth store** for token management
3. **Add error boundaries** for better error handling
4. **Create loading skeletons** for better UX
5. **Add offline support** with React Query's offline capabilities