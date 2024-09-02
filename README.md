# movye: watch out for fun!

## interaction premises
	no overwhelm: one option at a time
	no fear of missing out: show that there is value on options
	no overthinking: not too much information to decide upon
	no spending 1h to decide what to do in 2h: take it or leave it

## user journeys
	I want to watch something at a specific time (time first)
	I want to watch the right movie, no matter when (movie first)

## tech
	mobile
	preserve modularity, should be insertable in other context
	live api
		https://developer.themoviedb.org/
		https://www.omdbapi.com/
	backup local data in case api doesnt work (timeout)

## flow
1. welcome
2. get user location
3. start with available times OR favourite genre
4. fetch 10 latest movies curated "nearby" (show that there are 10 total options)
5. show one movie at a time
    1. more detail button
	2. how many free seats
	3. buy tickets
6. navigate through options

## extra features
	curatorial presentation (AI-based review)
	watch with a friend (link with vote options for movies and times) 
	"concierge" button with AI