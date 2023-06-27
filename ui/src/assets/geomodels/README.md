Provider and Model Display
==========================

Provider Model Information File
-------------------------------

This file (_ui/src/assets/geomodels/ProviderModelInfo.json_) is used by the website to define providers and models. Models are grouped by provider.

For each provider:

* "name" - label used in website for provider
* "models" - list of models
* "icon" - provider's icon
* "colourClass" - colour class of provider's card in website (colours are defined in AppStore/ui/src/styles/app.scss)
* "infoUrl" - user can click on this to get more information about the provider

For each model:

* "name" - label used on model card for this model
* "icon" - model's icon
* "colourClass" - bootstrap colour class of model's card in website
* "srcUrl"  - This is the model's URL, user clicks on the card to visit the model
* "infoUrl" - Information about the model, displayed as a link on the card
* "infoMessage": Short description of the model, displayed in the card

```
           "provname": {
                "name": "App Provider Name",
                "models": [
                    {
                        "name": "North Beensland App",
                        "icon": "aux-white-icon.png",
                        "colourClass": "primary",
                        "srcUrl" : "https://web.web.nb/geonetwork/srv/eng/catalog.search?node=srv#/metadata/7892-eeeb"
                        "infoUrl": "https://beensland.org",
                        "infoMessage": "Beensland app will calculate where you have been for the last 6 years"
                    },
                    {
                        "name": "Rastermania",
                        "icon": "ras-white-icon.png",
                        "colourClass": "primary",
                        "srcUrl" : "https://web.web.nb/geonetwork/srv/eng/catalog.search?node=srv#/metadata/7892-c08a"
                        "infoUrl": "https://rasterman.ia.org",
                        "infoMessage": "Rasterman IA app will help you locate your missing rasters on a 3d map"
                    }
                ],
                "icon": "gggg-white-icon.png",
                "colourClass": "primary",
                "infoUrl": "http://www.gggg.gg/"
            }
```
