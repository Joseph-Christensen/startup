# Diverdle

[My Notes](notes.md)

Diverdle is a daily guessing game where you try to identify the day's featured weapon from Arrowhead's hit title, Helldivers II. 
Released in February 2024, Helldivers II has quickly become a fan favorite among gamers worldwide.
Now it's your turn to put your knowledge of its vast arsenal to the test with Diverdle!

## 🚀 Specification Deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Daily games have become a staple of millions of people's daily routine for years now, whether it is Wordle, the NYT mini crossword, or Connections, I would bet that you have played one of them before. Well now it's time to add another game to your daily routine, Diverdle! This is a daily game based off of the recent smash hit videogame Helldivers II. Players will try to guess what the weapon of the day is, while each guess reveals attributes that are shared between the weapon of the day and the current guessed weapon. Although it will be challenging, it will be a great addition to your daily routine!

### Design

![Design image](images/Login.jpg)![Design image](images/Game.jpg)![Design image](images/HelpPage.jpg)

### Key features

- Capability to create an account and login
- Ability to randomly select the weapon of the day out of a pool
- Text Entry with an auto complete
- Display of common features between the weapon of the day and the guess
- Help tab to explain the rules of the game and how to play
- Ability to store historical scores
- Ability to compare with other user's score on that day

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Correct HTML structure. Three HTML Pages. One for login, one for the help page, and the last for the game and display of scores.
- **CSS** - Stylying to make the site look more like the Helldivers II menu, Animation of the boxes after the guess.
- **React** - Functionality for entering guesses as well as the logic for the guesses.
- **Service** - Storing scores, Login, Logout, Registering, getting inspirational quotes from https://forismatic.com/en/api/ 
- **DB/Login** - Stores information about accounts and their historical scores
- **WebSocket** - Displaying scoring data about other users.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://diverdle.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - 4 HTML pages for the login, game, storing scores, and about page.
- [x] **Proper HTML element usage** - I properly used HTML tags including BODY, NAV, MAIN, HEADER, FOOTER, DIV
- [x] **Links** - The login page automatically links to the game page. All of the links in the header work.
- [x] **Text** - Each of the weapon properties are well explained. I had both an about and how to play section.
- [x] **3rd party API placeholder** - I had a placeholder for the inspirational quotes
- [x] **Images** - I had multiple images on my website
- [x] **Login placeholder** - I had a login placeholder
- [x] **DB data placeholder** - I had a display of top scores of the day, I had a comparison against past scores from past plays
- [x] **WebSocket placeholder** - I did a placeholder for a comparison against other players that day.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Header, footer, and main content body** - I properly styled header, footer, and main content body and made my website look a lot cleaner.
- [x] **Navigation elements** - I properly style CSS navigation elements, changing their color and giving them different properties when hovered.
- [x] **Responsive to window resizing** - My application is responsive to window resizing.
- [x] **Application elements** - I properly styled application elements and they look much cleaner now.
- [x] **Application text content** - I properly styled and formatted text content.
- [x] **Application images** - I properly styled CSS application images.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Bundled using Vite** - I bundled using vite.
- [x] **Components** - I have multiple react components representing previous HTML and CSS.
- [x] **Router** - I implemented a react router.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.


## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
