import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk('posts/fetch', async (_, { signal }) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', { signal });
  if (!response.ok) throw new Error('Could not load posts. Please try again.');
  const posts = await response.json();
  if (!Array.isArray(posts)) throw new Error('The server returned an unexpected response.');
  return posts;
}, {
  condition: (_, { getState }) => !['loading', 'succeeded'].includes(getState().posts.status),
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(fetchPosts.pending, (state) => { state.status = 'loading'; state.error = null; })
    .addCase(fetchPosts.fulfilled, (state, action) => { state.status = 'succeeded'; state.items = action.payload; })
    .addCase(fetchPosts.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message; }),
});

export const store = configureStore({ reducer: { posts: postsSlice.reducer } });
