/*
	Code based on javidx9 videos converted to Javascript
	Check out my site! https://smattguy.github.io
	This work © 2024 by Matthew Flammia is licensed under CC BY-SA 4.0. To view a copy of this license, visit https://creativecommons.org/licenses/by-sa/4.0/
*/
//canvas setup
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//audio mode
let audio_type_modifier = 0;
//parameters for the stars
let STARCOUNT  = 1000;
let starPool = [];
//speed at which stars will travel on screen
let TIME = 0.1;
//origin point for stars
let CENTER = {'x':canvas.width/2,'y':canvas.height/2};
// boolean for audio mode and audio data
let AUDIO_MODE = false;
let average_volume = 0;
// clock
let SHOW_CLOCK = false
let current_time = new Date()
//updates the canvas size and origin when resizing screen
window.addEventListener('resize', e => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	CENTER.x = canvas.width/2;
	CENTER.y = canvas.height/2;
});
//star class, holds information about each pixel
class Star{
	constructor(){
		this.angle = 0;
		this.distance = 0;
		this.speed = 0;
		this.color = {'r':255,'g':255,'b':255,'a':1}
		this.fadeIn = 0;
	}
}
//random helper function to generate a uniform number for the simulation
function random(a,b){
	//creates a random number between b and a
	return (b - a) * Math.random() + a;
}
//init function to start star generation
function createStars(){
	for(let i=0;i<STARCOUNT;i++){
		let newStar = new Star();
		newStar.angle = random(0, 2*Math.PI);
		newStar.speed = random(10, 100);
		newStar.distance = random(20, canvas.width/2 + canvas.height/2);
		//for the color to add varienty in the intensity of the color
		let lum  = random(1, 255);
		newStar.fadeIn = random(0.01, 1);
		newStar.color.r = lum;
		newStar.color.g = lum;
		newStar.color.b = lum;
		//pushes star to array
		starPool.push(newStar);
	}
}
//called every frame to update all stars  in the pool
function updateStars(){
	for(let i=0;i<starPool.length;i++){
		//add to distance based on star speed, time constant, and distance from the center
		if(AUDIO_MODE){
			starPool[i].distance += starPool[i].speed * average_volume * TIME * (starPool[i].distance/(canvas.width/2 + canvas.height/2));
		}
		else{
			starPool[i].distance += starPool[i].speed * TIME * (starPool[i].distance/(canvas.width/2 + canvas.height/2));
		}
		starPool[i].fadeIn += 0.01;
		if(starPool[i].fadeIn > 1){
			starPool[i].fadeIn = 1
		}
		if(starPool[i].distance > canvas.width/2 + canvas.height/2){
			//reset star if out of frame
			starPool[i].angle = random(0, 2*Math.PI);
			starPool[i].speed = random(10, 100);
			starPool[i].distance = random(1, canvas.width/2 + canvas.height/2);
			//color like before
			let lum  = random(1, 255);
			starPool[i].fadeIn = 0;
			starPool[i].color.r = lum;
			starPool[i].color.g = lum;
			starPool[i].color.b = lum;
		}
	}
}
function init(){
	//called only once
	createStars();
	frame();
}
function frame(){
	//updates all stars then draws
	updateStars();
	draw();
	window.requestAnimationFrame(frame);
}
function draw(){
	ctx.fillStyle = 'black';
	ctx.fillRect(0,0,canvas.width,canvas.height);
	for(let i=0;i<starPool.length;i++){
		//defines the start position based on the angle of the star from the origin, then multiplies it by the distance it has traveled + the origin
		let starXPos = Math.cos(starPool[i].angle)*starPool[i].distance + CENTER.x;
		let starYPos = Math.sin(starPool[i].angle)*starPool[i].distance + CENTER.y;
		//controls transparency of the star, getting dim as it comes from the center
		let starTrans = starPool[i].color.a * (starPool[i].distance / 100) * starPool[i].fadeIn;
		ctx.fillStyle = `rgba(${starPool[i].color.r},${starPool[i].color.g},${starPool[i].color.b},${starTrans})`;
		ctx.fillRect(starXPos,starYPos,2,2);
	}
	if(SHOW_CLOCK){
		current_time = new Date();
		ctx.fillStyle = 'white';
		ctx.font = "48px Courier New"
		let time_string = current_time.toLocaleTimeString()
		time_width = ctx.measureText(time_string).width;
		ctx.fillText(time_string,CENTER.x-(time_width/2),CENTER.y);
	}
}
window.wallpaperPropertyListener = {
	applyUserProperties: function(properties) {
		if (properties.starspeed) {
			TIME = properties.starspeed.value;
		}
		if(properties.audiomode){
			AUDIO_MODE = properties.audiomode.value;
		}
		if (properties.audiomode1) {
			audio_type_modifier = parseInt(properties.audiomode1.value);
		}
		if (properties.showclock) {
			SHOW_CLOCK = properties.showclock.value;
		}
	},
};
// code for audio visualization mode, this mode changes star speed based on volume
const high_low_mult = [5,10,14,18,22,26,30,33,37,40,44,47,50,53,56,58,61,63,66,68,70,72,74,76,78,80,81,83,84,85,87,88,89,90,91,92,93,94,95,95,96,96,97,97,98,98,99,99,99,99,100,100,100,100,100,100,100,100,100,100,100,100,100,101];

function wallpaperAudioListener(audioArray) {
	if(AUDIO_MODE){
		let volume_sum = 0;
		let half_count = Math.floor(audioArray.length / 2);
		console.log(high_low_mult.length);
		switch(audio_type_modifier){
			// bass
			case 2: 
				//l+r channel
				for(let i=0;i<half_count;i++){
					volume_sum += (audioArray[i]+audioArray[i+half_count]) * high_low_mult[high_low_mult.length-i-1]; // lower freq has more influence
				}
			break;
			// mid
			case 3:
				//l+r channel
				for(let i=0;i<half_count;i++){
					if(i<half_count/2){
						volume_sum += (audioArray[i]+audioArray[i+half_count]) * high_low_mult[i]; // ramp up towards middle
					}
					else{
						volume_sum += (audioArray[i]+audioArray[i+half_count]) * high_low_mult[high_low_mult.length-i]; // ramp down towards end
					}
				}
			break;
			// highs
			case 4:
				//l+r channel
				for(let i=0;i<half_count;i++){
					volume_sum += (audioArray[i]+audioArray[i+half_count]) * high_low_mult[i]; // high freq has more influence
				}
			break;
			default: //off and fallback
				for(let i=0;i<half_count;i++){
					volume_sum += (audioArray[i]+audioArray[i+half_count]) * half_count;
				}
		}
		// Handle audio input here
		average_volume = volume_sum / audioArray.length;
	}
}
window.wallpaperRegisterAudioListener(wallpaperAudioListener);