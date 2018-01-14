document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	try {
		window.plugins.webviewcolor.change('#09AEE4');
	} catch (e) {}
}

setPrices();
function setPrices() {
	$.ajax({
		type: "GET",
		url: "https://jlemon.org/projects/btc/prices.php",
		success: function (result) {
			$("#coins").html(result);

			$("#title").show();
			$("#coins").show();
			$("#graph").show();
		}
	});
}

var ctx = document.getElementById('graph').getContext('2d');
Chart.defaults.global.defaultFontColor = "#fff";
setGraphData();
function setGraphData() {
	$.ajax({
		type: "GET",
		url: "https://jlemon.org/projects/btc/history.json",
		success: function (result) {
			var data = result;
			var labels = new Array();
			var totals = new Array();
			for (var key in data) {
				var total = data[key];
				totals.push(total);
				labels.push(key);
			}

			var graph = new Chart(ctx, {
					type: 'line',
					data: {
						labels: labels,
						datasets: [{
								label: "Portfolio Total",
								backgroundColor: '#fff',
								borderColor: '#fff',
								data: totals,
								fill: false
							}
						]
					},
					options: {
						animation: false,
						legend: {
							display: false
						},
						scales: {
							xAxes: [{
									display: true,
									gridLines: {
										display: false,
										color: "rgba(255, 255, 255, 0)"
									}
								}
							],
							yAxes: [{
									display: true,
									gridLines: {
										display: true,
										color: "rgba(255, 255, 255, 0.5)"
									}
								}
							]
						}
					}
				});
		}
	});
}
