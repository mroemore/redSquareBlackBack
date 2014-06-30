function main() {

	var VSHADER_SOURCE = 
	'attribute vec4 a_pos; \n' + 
	'void main() { \n' + 
	'	gl_Position = a_pos; \n' + 
	'	gl_PointSize = 10.0; \n' +
	'} \n';

	var FSHADER_SOURCE = 
	'void main() { \n' + 
	'	gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); \n' + 
	'} \n';

	var canvas = document.getElementById('webgl');

	var gl = getWebGLContext(canvas);

	if(!gl){
		console.log("couldn't get the webGL context.");
		return;
	}

	if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)){
		console.log("couldn't init them shaders.");
		return;
	}

	var a_pos = gl.getAttribLocation(gl.program, 'a_pos');
	if(a_pos < 0){
		console.log('failed to get storage location of a_pos'); 
		return;
	}

	gl.clearColor(0.0, 0.0, 0.0, 1.0);

	canvas.onmousedown = function(ev){ click(ev, gl, canvas, a_pos) }

	gl.clear(gl.COLOR_BUFFER_BIT);

	gl.drawArrays(gl.POINTS, 0, 1); 
}

var g_points = [];

function click(ev, gl, canvas, a_pos){
	var x = ev.clientX;
	var y = ev.clientY;
	var rect = ev.target.getBoundingClientRect();

	x = ((x - rect.left) - canvas.height/2)/(canvas.height/2);
	y = (canvas.width/2 - (y - rect.top))/(canvas.width/2);

	g_points.push(x);
	g_points.push(y);

	gl.clear(gl.COLOR_BUFFER_BIT);

	var len = g_points.length;
	for(var i = 0; i < len; i+=2) { 
		gl.vertexAttrib3f(a_pos, g_points[i], g_points[i+1], 0.0);
		gl.drawArrays(gl.POINTS, 0, 1);
	}
}