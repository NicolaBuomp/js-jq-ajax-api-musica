// Attraverso una chiamata ajax all’Api di boolean avremo a disposizione una decina di dischi musicali. 
// Servendoci di handlebars stampiamo tutto a schermo.
// In questo momento non è importante la parte grafica.
// Bonus:Creare una select con i seguenti generi: pop, rock, metal e jazz. 
// In base a cosa scegliamo nella select vedremo i corrispondenti cd.


$(document).ready(function () {
	var containerCD = $('.cds-container');
	var musicApi = 'https://flynn.boolean.careers/exercises/api/array/music';

	var source = $("#music-template").html();
	var template = Handlebars.compile(source);

	$.ajax({
		url: musicApi,
		method: "GET",
		success: function (data) {

			var song = data.response;

			for (i = 0; i < song.length; i++) {

				var content = {
					posterImg: song[i].poster,
					textTile: song[i].title,
					textName: song[i].author,
					textDate: song[i].year,
					classGenre: song[i].genre.toLowerCase(),
				};

				var set = template(content);

				containerCD.append(set);
			};

			var select = $('#genere');

			select.change(function () {

				var genre = $(this).val();

				if (genre === 'all') {
					$('.cd').show();

				} else {
					$('.cd').hide();
					$('.cd.' + genre).show();
				}

			});

		},
		error: function () {
			console.log("Errore nel caricamento dell'API");

		}
	});

});