// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, setData } from "./storage.js";
import { incrementLikes, sortedByNewest } from './utils.js';

// DOM elements
const userSelect = document.getElementById("users");
const bookmarkSection = document.getElementById("bookmarkContainer");
const form = document.getElementById("bookmarkForm");
const urlInput = document.getElementById("url");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const userCount = document.getElementById("userCount");

// KEY FOR STORING CURRENT USER
const CURRENT_USER_KEY = "currentUserId";
let currentUserId = null;
//check URL 
function isValidUrl(string) {
  const pattern = /^(https?:\/\/)([\w-]+\.)+[\w-]+(\/[\w-.~:?#[\]@!$&'()*+,;=%]*)?$/i;
  return pattern.test(string);
}

// Load users into the dropdown menu
function loadUsers() {
  const users = getUserIds();
   userSelect.innerHTML = "";

  // Add default placeholder option first
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select a user";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  userSelect.appendChild(defaultOption);

  // Add user options
  users.forEach((id) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `User ${id}`;
    userSelect.appendChild(option);
  });
  // Reset current user
  currentUserId = null;
  userSelect.value = ""; // ensures placeholder is selected

  // Update user count
  userCount.textContent = `Total users: ${users.length}`;

}
// Display the bookmarks for the current user
function displayBookmarks() {
  bookmarkSection.innerHTML = "";
  const data = getData(currentUserId) || [];
  
  // If there are no bookmarks, display a message
  if (data.length === 0) {
    const message = document.createElement("p");
    message.textContent = `No bookmarks yet for User ${currentUserId}`;
    message.setAttribute("role", "status");
    message.setAttribute("aria-live", "polite");
    bookmarkSection.appendChild(message);
    return;
  }
  
  const sorted = sortedByNewest(data);
  sorted.forEach((bookmark, index) => {
    const article = document.createElement("article");
    article.className = "bookmark";
    
    const title = document.createElement("h3");
    const label = document.createTextNode("Title: ");
    const link = document.createElement("a");
    link.href = bookmark.url;
    link.textContent = bookmark.title;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    title.append(label, link);
    

    const description = document.createElement("p");
    
    description.textContent =  "Description: " + bookmark.description;
    
    const time = document.createElement("time");
    time.dateTime = new Date(bookmark.createdAt).toISOString();
    time.textContent = `Created: ${new Date(bookmark.createdAt).toLocaleString()}`;
    
    // Copy button with accessible label
    const copyBtn = document.createElement("button");
    copyBtn.textContent = "Copy URL";
    copyBtn.type = "button";
    copyBtn.setAttribute("aria-label", `Copy URL for ${bookmark.title}`);
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(bookmark.url);
        copyBtn.textContent = "Copied!";
        setTimeout(() => {
          copyBtn.textContent = "Copy URL";
        }, 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
        copyBtn.textContent = "Copy failed";
      }
    });
    
    // Like button with accessible label
    const likeBtn = document.createElement("button");
    likeBtn.type = "button";
    const likes = bookmark.likes || 0;
    likeBtn.textContent = `❤️ ${likes}`;
    likeBtn.setAttribute("aria-label", `Like this bookmark. Current likes: ${likes}`);
    likeBtn.addEventListener("click", () => {
      const updated = incrementLikes(bookmark);
      data[index] = updated;
      setData(currentUserId, data);
      displayBookmarks();
    });
    
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "bookmark-actions";
    buttonContainer.append(copyBtn, likeBtn);
    
    article.append(title, description, time, buttonContainer);
    bookmarkSection.append(article);
  });
}

// Handle user change event
userSelect.addEventListener("change", (event) => {
  currentUserId = event.target.value;
  displayBookmarks();
});

// Handle form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  if (!currentUserId) {
    alert("Please select a user first");
    return;
  }
  
  const titleTrimmed = titleInput.value.trim();
  const descriptionTrimmed = descriptionInput.value.trim();
  const urlTrimmed = urlInput.value.trim();

  
  if (!isValidUrl(urlTrimmed)) {
    alert("Please enter a valid URL");
    urlInput.focus();
    return;
  }

  // BLOCK if empty after trimming
  if (!titleTrimmed) {
    alert("Title cannot be empty or spaces only");
    titleInput.focus();
    return;
  }

  if (!descriptionTrimmed) {
    alert("Description cannot be empty or spaces only");
    descriptionInput.focus();
    return;
  }
  // submit the form by pressing enter on the last input
form.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const active = document.activeElement;
    if (active.tagName !== "TEXTAREA") {
    e.preventDefault();
    form.requestSubmit(); 
  }
  }
});



  const newBookmark = {
    url: urlInput.value.trim(),
    title: titleInput.value.trim(), 
    description: descriptionInput.value.trim(),
    createdAt: Date.now(),
    likes: 0,
  };
  
  // Get existing bookmarks (or start empty)
  const existing = getData(currentUserId) || [];
  
  // Add the new bookmark and save
  setData(currentUserId, [...existing, newBookmark]);
  
  // Reset the form and update the display
  form.reset();
  displayBookmarks();
  
  // Focus back on first input for keyboard users
  titleInput.focus();
});

// Initialize
loadUsers();
displayBookmarks();