# CS 260 Notes
# Joseph Christensen

## Diverdle

1st Column: Weapon Category - Primary, Secondary, Support

2nd Column: Weapon Type - Assault Rifle, Marksman Rifle, Heavy, Explosive, Missiles, Anti-Tank

3rd Column: Damage - Higher or Lower

4th Column: Armor Penetration

5th Column: Traits - None, Explosive, Flammable

## Markdown

I learned a lot from this assignment. I have a greater understanding of GitHub aswell as Markdown. Although I have already used Markdown in R I learned how many different things you can do with font and modification of words.

[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

ssh -i /c/Users/willi/OneDrive/Documents/BYU/2025_Fall/CS260/keys/JosephCKeyDiver.pem ubuntu@34.224.200.232

34.224.200.232
 
If the server isn't working, just reboot.

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

This was easy. I was careful to use the correct structural elements such as header, footer, main, nav, and form. The links between the three views work great using the `a` element.

Experiment until it looks right, this doesn't need to be pretty, just have all the elements.

I finished the simon html assingment, I deployed it and the new deployed files are showing up when I go straight to simon.diverdle.click, but not when I go through the links in the site.

To debug you can use inspect element.

To deploy files:

./deployFiles.sh -k /c/Users/willi/OneDrive/Documents/BYU/2025_Fall/CS260/keys/JosephCKeyDiver.pem -h diverdle.click -s simon or startup

HTML Deliverable:

I just finished the startup HTML assignment and I learned that HTML by itself is very ugly, but the structure is all I need for now. I can also change stuff later if the HTML I have right now won't work out.

## CSS

This took a couple hours to get it how I wanted. It was important to make it responsive and Bootstrap helped with that. It looks great on all kinds of screen sizes.

Bootstrap seems a bit like magic. It styles things nicely, but is very opinionated. You either do, or you do not. There doesn't seem to be much in between.

I did like the navbar it made it super easy to build a responsive header.

```html
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand">
            <img src="logo.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
            Calmer
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" href="play.html">Play</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="index.html">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
```

I also used SVG to make the icon and logo for the app. This turned out to be a piece of cake.

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="#0066aa" rx="10" ry="10" />
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="72" font-family="Arial" fill="white">C</text>
</svg>
```

### Notes

CSS has so many possibilites, don't stress too much about it, think of what you want to do, ask ai how to do it and it will help a bunch.

I have learned that CSS can do a bunch of really cool things, I would say to get a template kind of thing and then adjust stuff from there.

Frameworks like Bootstrap are incredibly useful, but it is hard to find specific things out of them. I had to use ai to find the things I wanted out of the framework I used.

## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

Setting up react was pretty simple, I didn't actually do any functionality changes, but I am just setting up for what is to come.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```

React 2 will be a huge project, I need to get started now. For my website I will copy the login code but adjust to be my own, probably also copy the scores code and the about code. The main part that is concerning is the game part of it.

React 2 was very frusturating, I still have some things to fix but this is ready for the deliverable. There is a lot to be keeping track of, and every time I add new functionality something else breaks.

## Service

This was pretty simple, all it was in the big picture was transitioning my code from using local storage to storage in the application, I can now see scores from everyone that plays. I just added a call to anytime I was doing an endpoint action.

## Database

All I did for this deliverable was transition my backend from storing on the server to storing on a database. This was simple but was also much harder to debug. Overall mongoDB was super simple and easy to use.

## WebSocket

This was a simple idea but very finnicky, this took me a lot longer than I thought but I did it eventually.

## Final Review

1. What is the default port for HTTP/HTTPS/SSH? 

HTTP - 80, HTTPS - 443, SSH - 22

2. What does an HTTP status code in the range of 300/400/500 indicate?

The kind of error. 200 - Good, 500 - Server Error, 400 - Client side error, 300 - Redirects

3. What does the HTTP header content-type allow you to do?

What kind of content we are sending in a body. application/json, HTML. Client to server and server to client. Gives a hint of what type of object should be sent and received.

4. What does a “Secure cookie”/”Http-only cookie”/”Same-site cookie” do? https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies

Different reason for different cookies based on needs:
 - Secure cookie - sent over https, prevents attackers on insecure networks from intercepting data
 - Http-only Cookie - Doesn't let code like jsx modify it
 - Same-site Cookie - Can't be used on another site

5. Assuming the following Express middleware, what would be the console.log output for an HTTP GET request with a URL path of /api/document?
 - Post - creating a resource/send a body
 - Get - accesing resource
 - Delete - deleting a resource
 - Put - updating a resource

6. Given the following Express service code: What does the following front end JavaScript that performs a fetch return?



7. Given the following MongoDB query, select all of the matching documents {name:Mark}



8. How should user passwords be stored?

Hashed

9. Assuming the following node.js websocket code in the back end, and the following front end websocket code, what will the front end log to the console?



10. What is the websocket protocol intended to provide?

Client to client communication

11. What do the following acronyms stand for? JSX, JS, AWS, NPM, NVM



12. Assuming an HTML document with a body element. What text content will the following React component generate?  The react component will use parameters.



13. Given a set of React components that include each other, what will be generated



14. What does a React component with React.useState do?

sets a state condition on which things are called?

15. What are React Hooks used for?



16. What does the State Hook/Context Hook/Ref Hook/Effect Hook/Performance Hook do? https://react.dev/reference/react/hooks



17. Given React Router code, select statements that are true.



18. What does the package.json file do?

Loads dependencies

19. What does the fetch function do?

idk

20. What does node.js do?

Holds loaded packages

21. What does pm2 do?

idk

22. What does Vite do?

Packages HTML, CSS, and JavaScript?

Huge string thing?