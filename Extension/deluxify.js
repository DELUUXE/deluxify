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
            spotifyPlaceholder.classList.add('non-premium')
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
                            if (!document.getElementById('video-fullscreen-button')) {
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
                        // console.log("image loaded!")
                        $.getJSON(`https://deluxify-api.24-7music.com/?imageURI=${Spicetify.Player.data.track.metadata.image_url}&&auth=deluxifyapiaccess`, function (data) {

                            let HEX = data.color

                            // document.getElementsByClassName('progress-bar')[0].getElementsByClassName('inner')[0].style.background = "#00adff"
                            const brightness = tinycolor(HEX).getBrightness()
                            // console.log('brightness', brightness)
                            light = tinycolor(HEX).lighten(30).saturate().toRgbString()
                            dark = tinycolor(HEX).darken(10).saturate().toRgbString()
                            normal = tinycolor(HEX).saturate().toRgbString()
                            // const darkenBackground =  brightness * 100 / 300
                            // const normalizeBrightness = (brightness - 0) / (300 - 0)
                            // console.log(normalizeBrightness)
                            // let backgroundColor = tinycolor(HEX).darken(normalizeBrightness > 75 ? normalizeBrightness : normalizeBrightness / (100 - normalizeBrightness)).saturate().toRgbString()
                            // let backgroundColor = tinycolor(HEX).setAlpha((1 - normalizeBrightness)).saturate(50).toRgbString()
                            // let backgroundColor = tinycolor(HEX).setAlpha(0.2).saturate(40).toRgbString()

                            if (brightness < 50) {
                                light = tinycolor(HEX).lighten(60).saturate(40).toRgbString()
                                dark = tinycolor(HEX).lighten(10).saturate(20).toRgbString()
                            }
                            if (brightness < 25) {
                                light = tinycolor(HEX).lighten(70).saturate(50).toRgbString()
                                dark = tinycolor(HEX).lighten(30).saturate(30).toRgbString()
                            }
                            if (brightness < 100) {
                                normal = tinycolor(HEX).lighten(30).saturate().toRgbString()
                            }

                            document.documentElement.style.setProperty('--dynamic_color', normal)
                            document.documentElement.style.setProperty('--modspotify_rgb_main_fg', normal.replace('rgb(', '').replace(')', ''))
                            document.documentElement.style.setProperty('--dynamic_color-light', light)
                            document.documentElement.style.setProperty('--dynamic_color-dark', dark)
                            document.documentElement.style.setProperty('--dynamic_color-dark_RGB', dark.replace('rgb(', '').replace(')', ''))
                            document.documentElement.style.setProperty('--modspotify_main_fg', light)
                            document.documentElement.style.setProperty('--modspotify_pressing_fg', normal)
                            document.documentElement.style.setProperty('--modspotify_indicator_fg_and_button_bg', dark)
                            document.documentElement.style.setProperty('--modspotify_selected_button', normal)
                            document.documentElement.style.setProperty('--modspotify_sidebar_indicator_and_hover_button_bg', light)

                            // calculate tracklist waveform hue rotation
                            const originalHSV = tinycolor('#1DB954').toHsv()
                            const newHSV = tinycolor(light).toHsv()
                            const waveFormHueRotation = newHSV.h - originalHSV.h
                            const waveFormSaturation = newHSV.s - originalHSV.s
                            const waveFormBrightness = newHSV.v - originalHSV.v
                            document.documentElement.style.setProperty('--waveform-hue-rotation', `${Math.round(waveFormHueRotation)}deg`)
                            document.documentElement.style.setProperty('--waveform-saturation', Math.max(0, Math.min(originalHSV.s + waveFormSaturation + 0.1, 1)))
                            document.documentElement.style.setProperty('--waveform-brightness', Math.max(0, Math.min(originalHSV.v + waveFormBrightness + 0.2, 1)))
                            // document.documentElement.style.setProperty('--dynamic_color-background', backgroundColor)

                            document.getElementsByClassName('progress-bar__fg_wrapper')[0].style.background = HEX + "55"
                            document.getElementsByClassName('progress-bar__fg')[0].style.background = normal

                            // document.getElementsByClassName('progress-bar')[0].getElementsByClassName('inner')[0].style.background = tinycolor(HEX).lighten().saturate().toString()
                        });
                    };
                    CTelem.onerror = function () {
                        // console.log("image failed!")
                        document.getElementsByClassName('progress-bar__fg')[0].style.background = "10101055"
                        document.getElementsByClassName('progress-bar__fg_wrapper')[0].style.background = "101010"
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
