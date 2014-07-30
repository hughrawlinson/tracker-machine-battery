# Battery Reportr
A module to report your Mac's battery data to your instance of [Reportr](http://www.reportr.io/). It may work with Linux, frankly, I have no idea. It will not work with Windows.

## Usage
Assuming you've got a running instance of Reportr,
1. Clone this repo
2. `mv config.example.json config.json`
3. Fill in config.json, it's pretty self-explanatory. Don't put a trailing `/` character on the host!
4. `crontab -e`
  * I find this doesn't work when your editor is not VIM, emacs, or nano. Not sure why, but it doesn't have anything to do with this project. Edit your crontab however you like, I'm not your boss.
5. Enter `* * * * * node /Path/To/Your/Cloned/Directory/tracker.js`

This will report your battery data once every minute, on the minute. You can run the command manually too if you like, but irregular data isn't fun.

## Todo
1. It may be nice to make this a global node executable, but I'm not sure how those work yet. The install script (if there's such a way to hook into that) could put your config file in `~/.config` which seems like as good a place as any.
2. As soon as there's a way to share report configurations for reportr, I will release my report configuration. For now, here's a picture:

![Report View](https://dl.dropboxusercontent.com/u/25291907/Screenshot%202014-07-30%2010.41.13.png)

## Thanks
* [James Davenport](https://github.com/jradavenport), for [this blog post](http://www.ifweassume.com/2013/08/the-de-evolution-of-my-laptop-battery.html), [this script](https://github.com/jradavenport/batlog) (which I used in this project, although extremely modified, i.e. cut down to two lines of code. Nevertheless, I retain his copyright notice which you will find in the license file), and the concept.
* [Samy Pessé](https://github.com/SamyPesse), for Reportr and the Reportr-SDK for NodeJS.
