# deluxify
a spicetify-cli theme: https://github.com/khanhas/spicetify-cli

## features

- dynamic colors depending on cover art (sends json request with every song change)
- spotify title at the top that also changes color dynamicly
- fullscreen view has background of blurred cover art
- dark theme
- changeable background (does require a little bit of css knowledge)

## origin

Theme is an edited version of the original spicetify theme with an added extension to add multiple layers of effects etc.

## important spotify settings (before installing)

- current song image must be docked in the bottom bar
- turn off friends activity in spotify settings

## instalation

1. download or clone this repo to a convenient place
2. install the font from the Font folder
3. copy the deluxify folder in Theme to the Themes folder from spicetify-cli
4. copy the extension from its folder to the Extensions folder from spicetify-cli

## change background image

edit [line 922](https://github.com/DELUUXE/deluxify/blob/master/Theme/deluxify/user.css#L922) through [line 932](https://github.com/DELUUXE/deluxify/blob/master/Theme/deluxify/user.css#L932) in your local copy

## screenshots

### playlist view

![playlist view](/screenshots/deluxify-screenshot-playlist.png?raw=true)

### playlist view (dynamic color example)

![playlist view dynamic color](/screenshots/deluxify-screenshot-playlist-dyncolor.gif?raw=true)

### artist view

![artist view](/screenshots/deluxify-screenshot-artist.png?raw=true)

### fullscreen view

![fullscreen view](/screenshots/deluxify-screenshot-fullscreen.gif?raw=true)

### fullscreen view (when hovering with mouse)

![fullscreen-hover view](/screenshots/deluxify-screenshot-fullscreen-hover.png?raw=true)