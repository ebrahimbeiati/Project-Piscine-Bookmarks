import { incrementLikes } from './utils.js';

describe('incrementLikes', () => {
  test('adds 1 to likes if likes exist, defaults to 1 if undefined, and does not mutate original', () => {
    const bookmarkWithLikes = { title: 'HasLikes', likes: 2 };
    const bookmarkWithoutLikes = { title: 'NoLikes' };

    const updatedWithLikes = incrementLikes(bookmarkWithLikes);
    const updatedWithoutLikes = incrementLikes(bookmarkWithoutLikes);

    expect(updatedWithLikes.likes).toBe(3);          // increment works
    expect(updatedWithoutLikes.likes).toBe(1);       // default works
    expect(bookmarkWithLikes.likes).toBe(2);         // original object unchanged
  });
});
