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
