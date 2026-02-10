// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData } from "./storage.js";

window.onload = function () {
  const users = getUserIds();
  document.querySelector("#userCount").innerText =
    `There are ${users.length} users`;

  const userSelect = document.getElementById("users"); // STEP 1: Get which user was selected

  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Select a user";
  defaultOption.value = "";
  defaultOption.disabled = true;
  defaultOption.selected = true;

  userSelect.appendChild(defaultOption);

  users.forEach((user) => {
    const option = document.createElement("option");
    //  User IDs in Dropdown
    option.textContent = `User ${user}`; // Shows "User 1", "User 2"
    option.value = user; // Value is "1", "2", "3"
    userSelect.appendChild(option);
  });

  userSelect.addEventListener("change", function () {
    const selectedUser = userSelect.value;
    const userData = getData(selectedUser); // STEP 2: Get that user's data from localStorage (storage)

    const bookmarks = userData?.bookmarks || []; // STEP 3: Extract the bookmarks array from userData

    const bookmarkContainer = document.getElementById("bookmarkContainer"); // STEP 4: Get the HTML container where we'll display bookmarks

    bookmarkContainer.innerHTML = ""; // STEP 5: Clear any old bookmarks that were displayed before

    // STEP 6: Check if user has any bookmarks

    if (bookmarks.length > 0) {
      bookmarks.forEach((bookmark) => {
        const bookmarkDiv = document.createElement("div"); // Create a div container for THIS bookmark (holds all its parts together)

        // Create and add the title as a clickable link

        const link = document.createElement("a"); // Create a link element

        link.href = bookmark.url; // Set the link's URL to the bookmark's URL

        link.textContent = bookmark.title; // Set the link's text to the bookmark's title

        bookmarkDiv.appendChild(link); //Add link to the bookmark div

        // Create and add the description

        const description = document.createElement("p");
        description.textContent = bookmark.description;
        bookmarkDiv.appendChild(description);

        // Create and add the timestamp

        const timestamp = document.createElement("p");
        timestamp.textContent = `Created: ${bookmark.createdAt}`;
        bookmarkDiv.appendChild(timestamp);
      

      const copyButton = document.createElement("button");
      copyButton.textContent = "Copy to clipboard";

      // Add click event - when button is clicked
      copyButton.addEventListener("click", function () {
        // Copy the URL to clipboard
        navigator.clipboard.writeText(bookmark.url);
      });
        bookmarkDiv.appendChild(copyButton);
      

      // create and add the like counter display

      const likeCount = document.createElement("p");
      likeCount.textContent = "Like: 0";
      bookmarkDiv.appendChild(likeCount);

      //create and add the like button

      const likeButton = document.createElement("button");
      likeButton.textContent = "Like";
      bookmarkDiv.appendChild(likeButton);

      // Add this complete bookmark div to the main container
      bookmarkContainer.appendChild(bookmarkDiv);
    });
    
    } else {
      // User has NO bookmarks - show a message

      const message = document.createElement("p"); // Create a paragraph for the message

      message.textContent = "No bookmark found for this user"; // Set the message text

      bookmarkContainer.appendChild(message); // Add the message to the container
    }
  });
};
