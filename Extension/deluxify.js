// START METADATA
// NAME: deluxify Theme
// AUTHOR: DELUUXE
// DESCRIPTION: the main logic behind the deluxify theme for Spicetify
// END METADATA

/// <reference path="../globals.d.ts" />

(function deluxify() {
    var div = document.createElement('div')
    div.id = "cover-image-placeholder"
    document.body.appendChild(div)

    var div = document.createElement('div')
    div.id = "newHeader"
    document.body.appendChild(div)

    var jqueryImport = document.createElement('script')
    jqueryImport.src = 'https://code.jquery.com/jquery-3.4.1.min.js'
    jqueryImport.setAttribute('crossOrigin', '')
    document.body.appendChild(jqueryImport)

    var tColorLink = document.createElement('script')
    tColorLink.src = 'https://cdnjs.cloudflare.com/ajax/libs/tinycolor/1.4.1/tinycolor.js'
    tColorLink.setAttribute('crossOrigin', '')
    document.body.appendChild(tColorLink)

    var font = (function () {
        var test_string = 'mmmmmmmmmwwwwwww';
        var test_font = '"Comic Sans MS"';
        var notInstalledWidth = 0;
        var testbed = null;
        var guid = 0;

        return {
            // must be called when the dom is ready
            setup: function () {
                if ($('#fontInstalledTest').length) return;

                $('head').append('<' + 'style> #fontInstalledTest, #fontTestBed { position: absolute; left: -9999px; top: 0; visibility: hidden; } #fontInstalledTest { font-size: 50px!important; font-family: ' + test_font + ';}</' + 'style>');


                $('body').append('<div id="fontTestBed"></div>').append('<span id="fontInstalledTest" class="fonttest">' + test_string + '</span>');
                testbed = $('#fontTestBed');
                notInstalledWidth = $('#fontInstalledTest').width();
            },

            isInstalled: function (font) {
                guid++;

                var style = '<' + 'style id="fonttestStyle"> #fonttest' + guid + ' { font-size: 50px!important; font-family: ' + font + ', ' + test_font + '; } <' + '/style>';

                $('head').find('#fonttestStyle').remove().end().append(style);
                testbed.empty().append('<span id="fonttest' + guid + '" class="fonttest">' + test_string + '</span>');

                return (testbed.find('span').width() != notInstalledWidth);
            }
        };
    })();

    window.onload = function () {

        font.setup();
        if (font.isInstalled('SlasherX')) {
            var spotifyPlaceholder = document.createElement('p')
            spotifyPlaceholder.id = "spotifyText"
            spotifyPlaceholder.innerText = "spotify".toUpperCase()
            spotifyPlaceholder.style.color = '#1DB954';
            spotifyPlaceholder.style.opacity = 1;
            document.body.appendChild(spotifyPlaceholder)

            var spotifyText = document.createElement('p')
            spotifyText.id = "spotifyText"
            spotifyText.style.opacity = 1;
            document.body.appendChild(spotifyText)
            setTimeout(() => {
                // let newText = document.getElementById('top-bar-profile-link-text').firstChild.nextElementSibling.innerText.toUpperCase()
                let newText = "SPOTIFY"
                if (newText.length > 1 && (newText != spotifyText.innerText)) {
                    setTimeout(() => {
                        spotifyPlaceholder.style.opacity = 0;
                    }, 2000);
                    setTimeout(() => {
                        setTimeout(() => {
                            if (!document.getElementById('leaderboard-ad-wrapper')) {
                                newText = 'SPOTIFY PREMIUM'
                            }
                            spotifyText.innerText = newText
                            spotifyText.style.opacity = 1;
                        }, 1000);
                    }, 1250);
                }
            }, 2000);
        }

        let previousURI = '';

        setInterval(() => {
            if (!Spicetify.Player.data) { return }
            if (Spicetify.Player.data.track.uri != previousURI) {

                previousURI = Spicetify.Player.data.track.uri

                var CTelem
                if (!document.getElementById("TEMPCoverImage")) {
                    CTelem = document.createElement('img')
                    CTelem.id = "TEMPCoverImage"
                    CTelem.style.position = "fixed"
                    CTelem.style.bottom = "-1000000px"

                    CTelem.onload = function () {
                        console.log("image loaded!")
                        $.getJSON(`https://deluxify-api.24-7music.com/?imageURI=${Spicetify.Player.data.track.metadata.image_url}&&auth=deluxifyapiaccess`, function (data) {

                            let HEX = data.color

                            document.getElementsByClassName('progress-bar')[0].getElementsByClassName('inner')[0].style.background = "#00adff"
                            if (tinycolor(HEX).getBrightness() > 100) {
                                document.documentElement.style.setProperty('--dynamic_color', tinycolor(HEX).saturate().toString());
                            } else {
                                document.documentElement.style.setProperty('--dynamic_color', tinycolor(HEX).lighten(30).saturate().toString())
                            }

                            document.getElementsByClassName('player-bar-wrapper')[0].style.background = HEX + "55"
                            document.getElementsByClassName('progress-bar')[0].style.background = HEX
                        });
                    };
                    CTelem.onerror = function () {
                        console.log("image failed!")
                        document.getElementsByClassName('player-bar-wrapper')[0].style.background = "10101055"
                        document.getElementsByClassName('progress-bar')[0].style.background = "101010"
                    };

                    CTelem.src = Spicetify.Player.data.track.metadata.image_xlarge_url
                    $('#video-player').prepend(CTelem)
                } else {
                    CTelem = document.getElementById("TEMPCoverImage")
                    CTelem.src = Spicetify.Player.data.track.metadata.image_xlarge_url
                }
            }
        }, 50);
    }
})();