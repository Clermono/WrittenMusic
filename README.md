# WrittenMusic

## How to install
1. Within the GitHub repository, click the green "**<> Code**" button and select "**Download ZIP**".
![This is an alt text.](/README_images/second.png)
2. In your browser, go to `your_browser_name ://extensions/` and turn on "**Developer Mode**".
![This is an alt text.](/README_images/third.png)
3. Click "**Load Unpacked**" and select the folder containing the project's code.
![This is an alt text.](/README_images/fourth.png)
4. You should now see WrittenMusic in your Extensions bar. Import your JSON and get started.

## How to use


Builders planning use of this program in their Worlds should provide players with a premade music dictionary of JSON format. You can find resources to JSON syntax and guidelines at https://www.w3schools.com/js/js_json.asp

To update the music dictionary, open the extension and paste your new JSON into the textbox. Then, press the "**Submit**" button.

![This is an alt text.](/README_images/first.png)

You should see a green confirmation if the save succeeds, elsewise, validate your JSON with  tools as https://www.objgen.com/json/local/design

## JSON Formatting for WrittenMusic

WrittenMusic accepts JSON entries as an object of objects, each defined with their `url` and `type` attributes.

`url` must point to **direct .mp3 file URLS**. Users can host their music through different sites:
* **GitHub (recommended)**

> - Create your GitHub repository.
> - Upload your .mp3 files there.
> - Use the **raw file link** from GitHub (ex. `https://raw.githubusercontent.com/Your_User/Your_Repo/main/Name_Of_Track.mp3`).

* **File hosts or CDNs**

> - Upload your .mp3 to a hosting service (Dropbox, Google Drive with direct link, your own server, or a CDN).
> - Ex. `https://cdn.example.com/music/GorathenTheme.mp3`

`type` identifies tracks as either `boss`, `background` or `silence`. 

> - `boss` tracks are played exclusive to their assigned room, stopping upon leave and restarting the beforementioned `background` track, if possible.
> - `background` tracks are looped continously until another track is loaded.
> - `silence` tracks mark their assigned room as silent, stopping the current `background` track.

##  Example JSON

```
{
    "A Misty Pool": {
        "url": "https://raw.githubusercontent.com/Clermono/WrittenMusic-tracks/main/Void.mp3",
        "type": "boss"
    },
    
    "Path to a Manor": {
        "url": "https://raw.githubusercontent.com/Clermono/WrittenMusic-tracks/main/Gorathen%27s%20Theme.mp3",
        "type": "boss"
    },

    "Northwest Corner of Alendel Square": {
        "url": "",
        "type": "silence"
    }
}
```

## Behavior Notes
- Room re-entry does not restart `background` tracks.
- Entering a `boss` room will override `background` music, and replaying it on leave. Fleeing is accounted as a leave.
- Entering a `silence` room will stop any current `background` music **until a new track is loaded**. Leaving the `silence` room **does not** resume the `background` music.
- Rooms with missing URL entries will not silence tracks if the `type: silence` attribute is unpresent.
- Lag related to WrittenRealms may affect extension behaviour if room changes are >750 miliseconds long.
- Your music dictionary is saved locally and will persist upon reloads and browser restarts.
- This project is licensed under the **Unlicense**. It is public domain software. You are free to modify it, redistribute it, and/or sell it.