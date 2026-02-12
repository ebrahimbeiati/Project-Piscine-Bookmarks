// utils.js
export function incrementLikes(bookmark) {
  return {
    ...bookmark,
    likes: (bookmark.likes || 0) + 1
  };
}

export function sortedByNewest(bookmarks) {
  return [...bookmarks].sort((a, b) => b.createdAt - a.createdAt);
}
