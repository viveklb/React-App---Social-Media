import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route, Routes, useParams } from 'react-router-dom';
import { fetchPosts, store } from './store';
import './styles.css';

function PostImage({ id }) {
  return <img src={`https://picsum.photos/200?random=${id}`} alt={`Photo accompanying post ${id}`} loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none'; }} />;
}

function Loading() {
  return <div aria-busy="true" role="status"><p className="loading-label">Loading your feed…</p><div className="grid">{Array.from({ length: 6 }, (_, i) => <div className="skeleton" key={i}><div /><span /><span /></div>)}</div></div>;
}

function Home() {
  const posts = useSelector((state) => state.posts.items);
  return <><div className="intro"><span className="eyebrow">THE COMMUNITY FEED</span><h1>A little inspiration.<br /><span>A new perspective.</span></h1><p>Discover stories and ideas from the people around you.</p></div><div className="section-heading"><h2>Latest posts</h2><span>{posts.length} stories</span></div><div className="grid">{posts.map((post) => <Link className="card" to={`/item/${post.id}`} key={post.id}><div className="photo"><PostImage id={post.id} /><span className="post-number">{String(post.id).padStart(2, '0')}</span></div><div className="card-content"><span className="author">USER {post.userId}</span><h3>{post.title}</h3><p>{post.body}</p><span className="read-more">Read More… <span aria-hidden="true">↗</span></span></div></Link>)}</div>{!posts.length && <p>No posts yet.</p>}</>;
}

function Detail() {
  const { id } = useParams();
  const post = useSelector((state) => state.posts.items.find((item) => String(item.id) === id));
  if (!post) return <div className="message"><h1>Post not found</h1><p>This story doesn’t exist.</p><Link className="button" to="/">Back to feed</Link></div>;
  return <><Link className="back" to="/">← Back to all posts</Link><article className="detail"><div className="detail-photo"><PostImage id={post.id} /></div><div className="detail-content"><span className="eyebrow">POST {String(post.id).padStart(2, '0')} · USER {post.userId}</span><h1>{post.title}</h1><p>{post.body}</p><div className="byline"><span className="avatar">{post.userId}</span><div><strong>Community member</strong><span>User ID: {post.userId}</span></div></div></div></article></>;
}

function App() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.posts);
  useEffect(() => { dispatch(fetchPosts()); }, [dispatch]);
  return <><header><div className="header-inner"><Link to="/" className="logo"><span className="logo-mark">s.</span>social<span className="logo-dot">.</span></Link><Link to="/" className="nav-link">Home <span>↗</span></Link></div></header><main>{status === 'loading' || status === 'idle' ? <Loading /> : status === 'failed' ? <div className="message" role="alert"><h1>We couldn’t load the feed.</h1><p>{error === 'Failed to fetch' ? 'Check your internet connection and try again.' : error}</p><button onClick={() => dispatch(fetchPosts())}>Try again</button></div> : <Routes><Route path="/" element={<Home />} /><Route path="/item/:id" element={<Detail />} /><Route path="*" element={<div className="message"><h1>Page not found</h1><Link to="/">Back to feed</Link></div>} /></Routes>}</main><footer><span>social.</span><p>A space for stories, ideas, and everyday inspiration.</p></footer></>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider></React.StrictMode>);
