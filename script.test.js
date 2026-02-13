import { incrementLikes, sortedByNewest } from './utils.js';

describe('incrementLikes', () => {
  test('adds 1 to likes if likes exist, defaults to 1 if undefined, and does not mutate original', () => {
    const bookmarkWithLikes = { title: 'HasLikes', likes: 2 };
    const bookmarkWithoutLikes = { title: 'NoLikes' };

    const updatedWithLikes = incrementLikes(bookmarkWithLikes);
    const updatedWithoutLikes = incrementLikes(bookmarkWithoutLikes);

    expect(updatedWithLikes.likes).toBe(3);
    expect(updatedWithoutLikes.likes).toBe(1);
    expect(bookmarkWithLikes.likes).toBe(2);
  });
});
 
describe('sortedByNewest', () => {
  test('sorts bookmarks from newest to oldest', () => {
    const bookmarks = [
      { title: "Old Bookmark", createdAt: new Date("2024-01-01").getTime() },
      { title: "Newest Bookmark", createdAt: new Date("2024-03-15").getTime() },
      { title: "Middle Bookmark", createdAt: new Date("2024-02-10").getTime() }
    ];

    const sorted = sortedByNewest(bookmarks);

    expect(sorted[0].title).toBe("Newest Bookmark");
    expect(sorted[1].title).toBe("Middle Bookmark");
    expect(sorted[2].title).toBe("Old Bookmark");
  });
});
