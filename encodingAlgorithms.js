// Codificacoes de linha implementadas:
//     Metodos Polares: NRZ-L, NRZ-I;
//     Metodos Bipolares: AMI, Pseudoternário;
//     Bifasico: Manchester, Manchester Diferencial;

$(document).ready(function () {
	function plotaGrafico(eixo_x, eixo_y) {
		var trace1 = {
			x: eixo_x,
			y: eixo_y,
			type: 'scatter',
		};
		var layout = {
			xaxis: {
				autotick: false,
				ticks: 'outside',
				tick0: 0,
				dtick: 1,
				ticklen: 6,
				tickwidth: 4,
				tickcolor: '#000'
			},
			yaxis: {
				autotick: false,
				ticks: 'outside',
				tick0: 0,
				dtick: 1,
				ticklen: 6,
				tickwidth: 4,
				tickcolor: '#000'
			}
		};
		var data = [trace1];
		Plotly.newPlot('myDiv', data, layout, { showSendToCloud: true });
	}

	function manchesterDif_Algorithm(bits) {
		var eixo_x = [];
		var eixo_y = [];
		var cont = 0;
		var pos = false;
		if (bits.length == 1) {
			if (bits[0] == 0) {
				eixo_x.push(cont, cont);
				eixo_y.push(1, -1);
			}
			eixo_x.push(cont, cont += 0.5, cont, cont += 0.5);
			eixo_y.push(-1, -1, 1, 1);
		} else {
			for (var i = 0; i < bits.length - 1; i++) {
				if (i == 0) {
					if (bits[0] == 0) {
						eixo_x.push(cont, cont);
						eixo_y.push(1, -1);
					}
					eixo_x.push(cont, cont += 0.5, cont, cont += 0.5);
					eixo_y.push(-1, -1, 1, 1);
				}
				if (bits[i + 1] == 0) {
					if (eixo_y[eixo_y.length - 1] < 0) {
						eixo_x.push(cont, cont += 0.5, cont, cont += 0.5);
						eixo_y.push(1, 1, -1, -1);
					} else {
						eixo_x.push(cont, cont += 0.5, cont, cont += 0.5);
						eixo_y.push(-1, -1, 1, 1);
					}
				} else if (bits[i + 1] == 1) {
					if (eixo_y[eixo_y.length - 1] > 0) {
						eixo_x.push(cont, cont += 0.5, cont, cont += 0.5);
						eixo_y.push(1, 1, -1, -1);
					} else {
						eixo_x.push(cont, cont += 0.5, cont, cont += 0.5);
						eixo_y.push(-1, -1, 1, 1);
					}
				}
			}
		}
		plotaGrafico(eixo_x, eixo_y);
	}

	function manchester_Algorithm(bits) {
		var eixo_x = [];
		var eixo_y = [];
		var cont = 0;
		for (var i = 0; i < bits.length; i++) {
			if (bits[i] == 0) {
				eixo_x.push(cont, cont += 0.5, cont, cont += 0.5);
				eixo_y.push(1, 1, -1, -1);
			}
			if (bits[i] == 1) {
				eixo_x.push(cont, cont += 0.5, cont, cont += 0.5);
				eixo_y.push(-1, -1, 1, 1);
			}
		}
		plotaGrafico(eixo_x, eixo_y);
	}

	function pseudo_Algorithm(bits) {
		var eixo_x = [];
		var eixo_y = [];
		var cont = 0;
		var up = false;
		for (var i = 0; i < bits.length; i++) {
			if (bits[i] == 1) {
				eixo_x.push(cont, cont += 1);
				eixo_y.push(0, 0);
			}
			if (bits[i] == 0) {
				if (up == false) {
					eixo_x.push(cont, cont += 1);
					eixo_y.push(1, 1);
				} else {
					eixo_x.push(cont, cont += 1);
					eixo_y.push(-1, -1);
				}
				up = !up;
			}
		}
		plotaGrafico(eixo_x, eixo_y);
	}

	function ami_Algorithm(bits) {
		var eixo_x = [];
		var eixo_y = [];
		var cont = 0;
		var up = false;
		for (var i = 0; i < bits.length; i++) {
			if (bits[i] == 0) {
				eixo_x.push(cont, cont += 1);
				eixo_y.push(0, 0);
			}
			if (bits[i] == 1) {
				if (up == false) {
					eixo_x.push(cont, cont += 1);
					eixo_y.push(1, 1);
				} else {
					eixo_x.push(cont, cont += 1);
					eixo_y.push(-1, -1);
				}
				up = !up;
			}
		}
		plotaGrafico(eixo_x, eixo_y);
	}

	function nrzi_Algorithm(bits) {
		var eixo_x = [];
		var eixo_y = [];
		var cont = 0;
		if (bits.length == 1) {
			if (bits[0] == 0) {
				eixo_x.push(cont, cont += 1);
				eixo_y.push(1, 1);
			} else {
				eixo_x.push(cont, cont += 1);
				eixo_y.push(-1, -1);
			}
		} else {
			for (var i = 0; i < bits.length - 1; i++) {
				if (i == 0) {
					if (bits[i] == 0) {
						eixo_x.push(cont, cont += 1);
						eixo_y.push(1, 1);
					} else {
						eixo_x.push(cont, cont += 1);
						eixo_y.push(-1, -1);
					}
				}
				if (bits[i + 1] == 0) {
					get_y = eixo_y[eixo_y.length - 2];
					get_y_ = eixo_y[eixo_y.length - 1];
					eixo_x.push(cont, cont += 1);
					eixo_y.push(get_y, get_y_);
				} else {
					if (eixo_y[eixo_y.length - 1] == 1)
						get_y = -1;
					else
						get_y = 1;
					eixo_x.push(cont, cont += 1);
					eixo_y.push(get_y, get_y);
				}
			}
		}
		plotaGrafico(eixo_x, eixo_y);
	}

	function nrzl_Algorithm(bits) {
		var eixo_x = [];
		var eixo_y = [];
		var cont = 0;
		for (var i = 0; i < bits.length; i++) {
			if (bits[i] == 0) {
				eixo_x.push(cont, cont += 1);
				eixo_y.push(1, 1);
			}
			if (bits[i] == 1) {
				eixo_x.push(cont, cont += 1);
				eixo_y.push(-1, -1);
			}
		}
		plotaGrafico(eixo_x, eixo_y);
	}

	function executa(String, bits) {
		switch (String) {
			case 'nrzl':
				nrzl_Algorithm(bits);
				break;
			case 'nrzi':
				nrzi_Algorithm(bits);
				break;
			case 'ami':
				ami_Algorithm(bits);
				break;
			case 'pseudo':
				pseudo_Algorithm(bits);
				break;
			case 'manchester':
				manchester_Algorithm(bits);
				break;
			case 'manchester_dif':
				manchesterDif_Algorithm(bits);
				break;
		}
	}

	$("#myButtons .btn").click(function () {
		var bits = new String($('#bits').val());
		var valid = false;
		if (bits.length > 0) {
			for (var i = 0; i < bits.length; i++) {
				if ((bits[i] != 0) && (bits[i] != 1)) {
					valid = false;
					break;
				}
				valid = true;
			}
		}
		if (valid == false) {
			window.alert("Sequência de bits inválida, tente novamente!");
		} else {
			executa($(this).attr("id"), bits);
			console.log($(this).attr("id"));
		}
	});
});   