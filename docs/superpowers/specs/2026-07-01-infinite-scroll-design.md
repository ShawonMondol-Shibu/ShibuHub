# Infinite Scroll for Products Page

## Overview

Replace pagination with infinite scroll on the products page to provide a smoother browsing experience. Users will automatically load more products as they scroll down, with skeleton loading indicators and error retry functionality.

## User Requirements

1. **Automatic loading**: Load more products automatically when user scrolls near the bottom
2. **Batch size**: Load 8 products per batch (same as current page size)
3. **Loading indicator**: Show skeleton cards while loading more products
4. **Scroll threshold**: Trigger loading when user is 200px from the bottom
5. **End of list**: Show nothing when all products are loaded
6. **Search behavior**: Reset scroll to top when search is performed
7. **Error handling**: Show retry button when loading fails

## Architecture

### Data Flow

1. **Initial Load**: `useInfiniteQuery` fetches all products from API, displays first page (8 products)
2. **Scrolling**: Intersection Observer detects when user is 200px from bottom, triggers `fetchNextPage()`
3. **Loading**: Skeleton cards appear at bottom while next batch loads
4. **Search**: User searches → full dataset is filtered → infinite scroll resets to page 1 → scroll position resets to top
5. **Error**: If load fails → error retry button appears → user clicks retry → `fetchNextPage()` called again

### Components

#### Modified: Products Page (`app/(website)/products/page.tsx`)

**Current State:**
- Uses `useState` for pagination (`Pages` state)
- Fetches all products at once
- Client-side pagination with 8 items per page
- Pagination UI at bottom

**New State:**
- Uses `useInfiniteQuery` for infinite scroll
- Fetches all products at once (same API)
- Client-side pagination via `useInfiniteQuery` pages
- Intersection Observer for scroll detection
- Loading skeletons at bottom during fetch
- Error retry button when load fails

**Key Changes:**
1. Replace `useState(1)` for `Pages` with `useInfiniteQuery`
2. Replace `paginatedData` with `data.pages.flat()`
3. Add Intersection Observer ref at bottom of grid
4. Add loading skeletons when `isFetchingNextPage` is true
5. Add error retry button when `isError` and `hasNextPage`
6. Remove pagination UI component
7. Reset infinite query when search changes

#### New: Loading Skeleton Component

- Reuse existing `LoadingGrid` component
- Show 4 skeleton cards (half batch) at bottom during loading
- Only visible when `isFetchingNextPage` is true

#### New: Error Retry Component

- Simple component with retry button
- Calls `fetchNextPage()` on click
- Only visible when `isError` and `hasNextPage`

#### Unchanged: Product Component

- No changes needed to `Product` card component

## Implementation Details

### useInfiniteQuery Setup

```typescript
const {
  data,
  isLoading,
  isError,
  error,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useInfiniteQuery({
  queryKey: ["products", search],
  queryFn: ({ pageParam = 0 }) => getData(pageParam, search),
  getNextPageParam: (lastPage, allPages) => {
    const nextPage = allPages.length;
    return nextPage < Math.ceil(filteredData.length / 8) ? nextPage : undefined;
  },
  initialPageParam: 0,
});
```

**Note:** Since the API returns all products at once, we'll implement a custom pagination function that slices the data client-side. The `queryFn` will receive a `pageParam` that represents which page to return.

### Intersection Observer

```typescript
const observer = useRef<IntersectionObserver>();
const lastProductRef = useCallback(
  (node: HTMLDivElement) => {
    if (isFetchingNextPage) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    }, { rootMargin: "200px" });
    
    if (node) observer.current.observe(node);
  },
  [isFetchingNextPage, hasNextPage, fetchNextPage]
);
```

### Search Integration

```typescript
useEffect(() => {
  // Reset infinite query when search changes
  reset();
}, [search]);
```

### Loading State

```typescript
{isFetchingNextPage && (
  <div className="col-span-full">
    <LoadingGrid items={4} />
  </div>
)}
```

### Error State

```typescript
{isError && hasNextPage && (
  <div className="col-span-full text-center py-4">
    <Button onClick={() => fetchNextPage()} variant="outline">
      Retry Loading
    </Button>
  </div>
)}
```

## Error Handling

1. **Initial Load Errors**: Show existing `ErrorPage` component with retry button
2. **Load More Errors**: Show retry button at bottom of grid
3. **Network Issues**: React Query handles internal retries, user sees loading skeletons

## Testing

### Manual Testing
- [ ] Scroll to bottom loads more products
- [ ] Loading skeletons appear during load
- [ ] Error retry button works correctly
- [ ] Search resets scroll position
- [ ] All products eventually load
- [ ] Smooth scrolling without jank

### Edge Cases
- [ ] Fast scrolling doesn't cause duplicate loads
- [ ] Search during loading handles correctly
- [ ] Window resize doesn't break intersection observer
- [ ] No products found after search shows empty state

### Performance
- [ ] No memory leaks from intersection observer
- [ ] Efficient re-renders when loading more
- [ ] Smooth 60fps scrolling

## Dependencies

- React Query (`@tanstack/react-query`) - Already installed
- Intersection Observer API - Native browser API
- Existing `LoadingGrid` component - Already exists

## Success Criteria

1. Users can scroll through all products without clicking pagination
2. Loading indicators provide clear feedback
3. Error states are handled gracefully with retry option
4. Search functionality works seamlessly with infinite scroll
5. Performance is smooth with no jank or memory leaks
6. All existing functionality preserved (search, categories, product cards)