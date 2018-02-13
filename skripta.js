window.addEventListener('load', function() {

	// Stran je naložena ...


	// ##
	// # Dodaj novo barvo
	// ##
	var dodajBarvo = function(event) {
		var input = document.createElement('button');
		var picker = new jscolor(input);
		picker.fromRGB(Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255));
		document.getElementById("barve").appendChild(input);
	};


	// ##
	// # Odstrani barve
	// ##
	var odstraniBarve = function(event) {
		document.getElementById("barve").innerHTML = "";
	};
	document.querySelector("#odstraniBarve").addEventListener('click', odstraniBarve);


	// ##
	// # Zaženi žogice
	// ##
	var zagon = function(event) {
		ustavi = false;
		var barve = document.querySelectorAll("#barve > button");
		if (barve.length == 0) {
			alert("Prosim dodajate barve žogic!");
		} else {
			odstraniBarve();
			hitrost = vrniNakljucnoStevilo(minHitrost, maxHitrost);
			for (var i=0; i < barve.length; i++) {
				Zogica.kreiraj("#" + barve[i].innerHTML).narisi();
			}
			var gumbZagona = document.querySelector("#start");
			gumbZagona.innerHTML = "Ustavi žogice";
			gumbZagona.removeEventListener('click', zagon);
			gumbZagona.addEventListener('click', ustavitev);
		}
	};
	document.querySelector("#start").addEventListener('click', zagon);


	// ##
	// # Ustavi žogice
	// ##
	var ustavitev = function(event) {
		ustavi = true;

		// Odstrani vse žogice iz zaslona
		var zogice = document.querySelectorAll(".zogica");
		for (var i=0; i < zogice.length; i++) {
			zogice[i].remove();
		}
	};


	var minHitrost = 0;
	var maxHitrost = 0;
	var hitrost = 1;
	var ustavi = false;

	var igrisce = document.getElementById('igrisce');

	var Zogica = {
		kreiraj: function (color, dx, dy) {
			var novaZogica = Object.create(this);
			novaZogica.dx = (dx === undefined) ? vrniNakljucnoStevilo(1, 5) : dx;
			novaZogica.dy = (dy === undefined) ? vrniNakljucnoStevilo(1, 5) : dy;
			novaZogica.width = 60;
			novaZogica.height = 60;
			novaZogica.element = document.createElement('div');
			novaZogica.element.style.backgroundColor = color;
			novaZogica.element.style.background = 'radial-gradient(circle at 10px 10px, ' + color + ', #404040)';
			novaZogica.element.style.width = novaZogica.width + 'px';
			novaZogica.element.style.height = novaZogica.height + 'px';
			novaZogica.element.className += ' zogica';
			novaZogica.width = parseInt(novaZogica.element.style.width, 10);
			novaZogica.height = parseInt(novaZogica.element.style.height, 10);
			igrisce.appendChild(novaZogica.element);
			return novaZogica;
		},
		premakniNa: function (x, y) {
			this.element.style.left = x + 'px';
			this.element.style.top = y + 'px';
		},
		poPotrebiSpremeniSmer: function (x, y) {
			if (x < 0 || x > igrisce.offsetWidth - this.width) {
				this.dx = -this.dx;
			}
			if (y < 0 || y > igrisce.offsetHeight - this.height) {
				this.dy = -this.dy;
			}
		},
		narisi: function (x, y) {
			x = (x === undefined) ? vrniNakljucnoStevilo(1, igrisce.offsetWidth/2) : x;
			y = (y === undefined) ? vrniNakljucnoStevilo(1, igrisce.offsetHeight/2) : y;
			this.premakniNa(x, y);
			var zogica = this;
			if (!ustavi) {
				setTimeout(function () {
					zogica.poPotrebiSpremeniSmer(x, y);
					zogica.narisi(x + zogica.dx, y + zogica.dy);
				}, 50 / hitrost);
			}
		}
	};

});


function vrniNakljucnoStevilo(min, max) {
	return Math.floor(Math.random() * (parseInt(max, 10) - parseInt(min, 10) + 1)) + parseInt(min, 10);
}
