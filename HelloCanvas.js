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

	 gl.vertexAttrib3f(a_pos, 0.0, 0.0, 0.0);

	gl.clearColor(0.0, 0.0, 0.0, 1.0);

	gl.clear(gl.COLOR_BUFFER_BIT);

	gl.drawArrays(gl.POINTS, 0, 1); 
}