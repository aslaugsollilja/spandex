# spandex

A text expander extension for Chromium, a  school project.

## Extension overview

### Configurable expansions
<div style="text-align:center"><img src="http://i.imgur.com/jyLEJil.png" alt="configurable expansions" /></div>

### In action
<div style="text-align:center"><img src="http://i.imgur.com/D5qYsRA.gif" alt="configurable expansions" /></div>

### Get the extension
You can get the extension <a href="https://raw.github.com/aslaugsollilja/spandex/master/spandex.crx">here</a>.

## Objective
People write text all day, everyday. Some long sentences they type in over and over again, sentences like "laughing out loud", and that's what we want to fix for the user. Our extension, _spandex_, can expand little keywords (like "lol") into full sentences (like "laughing out loud"). The user types in a keyword, and then triggers a keyboard shortcut (Ctrl+Enter by default), and then spandex will expand that keyword into its full sentence equivalent. These keywords can be configured by the user.

Let's take an example. Jonathan Van Wunderbar is an avid Facebook user. Let's assume that he writes the sentence "laughing out loud" three-hundred times a day. That is a total of 5100 characters Jonathan has to type, for that sentence alone, each day! Using spandex, he can configure the keyword "lol" to be expanded to "laughing out loud". Then he'll type the keyword "lol" three-hundred times a day, which is a total of 900 keys typed. That is only 18% of what Jonathon would otherwise have to type!

As you can see, this extension is a total lifesaver.

## Design
The main functionality of our extension will be in a single content script, where we listen to keypress events on all input fields on the current page. Then we are able to listen for the keyboard shortcut to be triggered, at which point we can expand the keyword that the user had just written into its full sentence equivalent.

Some knowledge about HTML DOM events is needed to develop the extension. We recommend reading the following three articles about events in the DOM: [Introduction to events](https://developer.mozilla.org/en-US/docs/Web/API/Event), [Event order](http://www.quirksmode.org/js/events_order.html) and [Advanced event registration models](http://www.quirksmode.org/js/events_advanced.html).

There are some things we've had to consider while designing the extension. The first thing is that the user might be editing text in the middle of an input box. Therefore, we need to take care to expand the keyword ending at the caret position, but not necessarily at the end of the input box. Another obstacle is that one keyword might be a suffix of another keyword. Take for example the keywords "trolol" and "lol". If a user types "trolol", should the extension expand the "trolol" keyword or the "lol" keyword? One way to fix this is to display a popup box when there is any ambiguity, and make the user choose. This requires some effort, and therefore we went the easier way out, and decided to pick the shortest of the possible keywords (which in this case would be "lol"). One final consideration is regarding speed. We think that the typical user will have a moderate amount of keywords, and will not be writing any large essays while using the extension, so we think this will not be a problem.

## Risks
Our users might become too addicted to our extension. This can cause a lot of pain if they one day decide to switch browsers, since the extension won't be available there. But we think that if the user switches to some browser other than Chrome, then he deserves the pain as Chrome is the most awesomest browser out there, and the user shouldn't have left in the first place.

## Team and Scope
Since this is a rather small project, we decided not to complicate things by assigning specific tasks to group members. Everyone does what they want, and everyone will be happy. In larger projects with larger teams, this would, of course, be stupid, but like I said, this is a small project. Our team (Team Panda), will, however, be working closely throughout the implementation process.

Our main goal is to implement the basic expansion mechanism. That is, we want the user to be able to expand some predefined keywords. A stretch goal will be to add a settings page where users can define their own keywords.

## About Us
We love to expand text, and often like to refer to ourselves as text expanders, or just "expandas". We are also ex-pandas (see included pictures).

<img src="http://i.imgur.com/d9a3UmD.jpg" alt="aslaugPanda" />
<img src="http://i.imgur.com/XRYTDVr.png" alt="Bjarkipanda" />
