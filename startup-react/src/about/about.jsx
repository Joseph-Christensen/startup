import React from 'react';
import "./about.css";

export function About(props) {
  const [quote, setQuote] = React.useState('Loading...');
  const [quoteAuthor, setQuoteAuthor] = React.useState('unknown');

  React.useEffect(() => {
    setQuote('We are what we think. All that we are arises with our thoughts. With our thoughts, we make the world.');
    setQuoteAuthor('Buddha');
  }, []);

  return (
    <main>
      <section className="text-center mb-5">
        <img id="salute" src="/helldiversSalute.png" alt="Helldivers Saluting" className="img-fluid mb-3" style={{ maxWidth: "400px" }}/>
        <h2 className="text-warning">About Diverdle</h2>
        <p className="lead">
          Diverdle is a daily guessing game where you identify the day's featured weapon from Helldivers II.
          Released in February 2024, Helldivers II quickly became a fan favorite. Now it's your turn to put
          your arsenal knowledge to the test!
        </p>
      </section>
      <section className="mb-5">
        <h2 className="text-warning">How To Play</h2>
        <ul className="list-group list-group-flush bg-transparent">
          <li className="list-group-item bg-transparent text-light">
            To play Diverdle, simply type in the name of a weapon and it's properties will be revealed. The color of the tiles will show how close your guessed weapon was to the weapon of the day.
          </li>
          <li className="list-group-item bg-transparent text-success">
            <strong>Green:</strong> Correct property match.
          </li>
          <li className="list-group-item bg-transparent text-warning">
            <strong>Yellow:</strong> Partial property match.
          </li>
          <li className="list-group-item bg-transparent text-danger">
            <strong>Red:</strong> No match. For numerical properties, arrows indicate higher/lower.
          </li>
          <br/>
        </ul>
      </section>
      <section id="properties" className="mb-5">
        <h2 className="text-warning">Types of Properties</h2>
        <div className="row row-cols-1 row-cols-md-2 g-4 mt-3">
          <div className="col">
            <div className="card bg-dark border-warning h-100">
              <div className="card-body">
                <h5 className="card-title text-warning">Weapon Category</h5>
                <p className="card-text text-light">The in-game category the weapon falls under<br/><em>e.g. Primary, Secondary, Support</em></p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card bg-dark border-warning h-100">
              <div className="card-body">
                <h5 className="card-title text-warning">Weapon Type</h5>
                <p className="card-text text-light">The class that the weapon falls under<br/><em>e.g. Assualt Rifle, Shotgun, Energy-Based, Anti-Tank</em></p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card bg-dark border-warning h-100">
              <div className="card-body">
                <h5 className="card-title text-warning">Damage</h5>
                <p className="card-text text-light">The amount of damage that the weapon does per shot<br/><em>This value will range anywhere from ~50 - upwards of 2500</em></p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card bg-dark border-warning h-100">
              <div className="card-body">
                <h5 className="card-title text-warning">Armor Penetration</h5>
                <p className="card-text text-light">The level of Armor Penetration that the weapon has<br/><em>This value will be between 2 - 7 (Light - Anti-Tank III)</em></p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card bg-dark border-warning h-100">
              <div className="card-body">
                <h5 className="card-title text-warning">Traits</h5>
                <p className="card-text text-light">The traits that define the weapon<br/><em>e.g. Explosive, One Handed, Incendiary, Stationary Reload, None</em></p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-0">
        <h2 className="text-warning">Inspirational Quote of the Day</h2>
        <blockquote className="inspo-quote">
          {quote}
          <br/>
          <span className="author">— {quoteAuthor}</span>
        </blockquote>
      </section>
    </main>
  );
}