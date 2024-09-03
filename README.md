# movye: watch out for fun!

## interaction premises

- no overwhelm: one option at a time
- no fear of missing out: show that there is value on options
- no overthinking: not too much information to decide upon
- no spending 1h to decide what to do in 2h: take it or leave it

## user journeys

- I want to watch something at a specific time (time first)
- I want to watch the right movie, no matter when (movie first)

## tech

- mobile
- preserve modularity, should be insertable in other context
- APIs
  - movies
    - https://developer.themoviedb.org/
    - https://www.omdbapi.com/
  - theaters
- backup local data in case api doesnt work (timeout)

## flow

1. welcome
2. get user location
3. populate list of nearby cinemas
4. start with available times OR favourite genre
5. fetch 10 latest movies curated "nearby" (show that there are 10 total options)
6. show one movie at a time
   1. "fake" sessions
   2. more detail button
   3. how many free seats
   4. buy tickets
7. navigate through options

## extra features

- curatorial presentation (AI-based review)
- watch with a friend (link with vote options for movies and times)
- "concierge" button with AI

## benchmarks

- matched: app to create taste profile and match with other person to watch together
