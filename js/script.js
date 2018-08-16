(function($){
	$.fn.my_puissance = function(options) {
		var defaults = {
			player1: 'red',
			player2: 'blue',
			x: 6,
			y: 6
		};

		var setting = $.extend(defaults, options);
		var tableau = [];

		function myArray(){
			if (setting.player1 == setting.player2) {
				alert("Choisissez deux couleurs differentes!");
			}
			else {

				for (var i = 0 ; i < setting.y; i++) {
					var tab = [];
					for (var z = 0 ; z < setting.x; z++) {
						tab.push(0);
					}
					tableau.push(tab);
				}
			}
		}
		myArray();

		function generateView(){

			$("body").append("<style>body{background-color:#965cf7;}</style>");
			$("body").append("<div class='tourJoueur' style = \"position: absolute; margin-left: 45%; margin-top: 8%;  font-weight:bold;\"><p>Au tout du Joueur 1</p></div>");
			$("body").append("<p class ='replace' style=\"text-align:center;margin-left:2%;\"><img src=\"http://giantpartygames.co.uk/wp-content/uploads/2014/09/Connect-4-Header.png\"/></p>");
			$("body").append("<div class=\"content\" style=\"text-align: center;\"></div>");
			for (var i = 0; i < tableau.length; i++) {
				if(i != 0){
					$(".content").append("</br>");
				}
				for (var z = 0; z < tableau[i].length; z++) {
					$(".content").append('<div class="arrayFront" id="'+ i + '-' + z +'" style="border: solid black 3px; border-radius:50%; width:50px; height:50px; display: inline-block; background-color: #f5f5dc;" data-statut="0"></div>');
				}
			}
		}
		generateView();


		var player = 1;
		$(".arrayFront").click(function(){
			var att = $(this).attr("id");
			var tab = att.split('-');
			for(var p = tableau.length; p != -1; p--) {
				if($("#" + p + "-" + tab[1]).attr('data-statut') == 0) {

					if(player === 1) {
						$(".tourJoueur").replaceWith("<div class='tourJoueur' style = \"position: absolute; margin-left: 45%; margin-top: 8%; font-weight:bold;\"><p>Au tout du Joueur 2</p></div>");
						$("#" + p + '-' + tab[1]).css('background-color', setting.player1);
						$("#" + p + '-' + tab[1]).attr('data-statut',1);
						tableau[p][tab[1]] = 1; 
						document.querySelectorAll("[data-statut='1']");

						if(check_winner(tableau, p, tab[1], player) == 1) {
							alert('player 1 won');
								$("div").animate({
									top: 'Opx',
									opacity: 0.5 
								});
								console.log(setting.x);

								$('body').append("<button class='bout' style = \" margin-left: 49%; border-radius: 30%; color:#965cf7; \">RETRY</button>");
								$(".bout").click(function(){
									for(var t = setting.y; t != -1; t--) { 
									for(var p = setting.x; p != -1; p--) {
										if($("#" + p + "-" + t).attr('data-statut') == 1) {
											$("#" + p + "-" + t).css('background-color','white');
											document.querySelectorAll("[data-statut='0']");
										}
													if($("#" + p + "-" + t).attr('data-statut') == 2) {
											$("#" + p + "-" + t).css('background-color','white');
											document.querySelectorAll("[data-statut='0']");
											$("div").animate({
												top: 'Opx',
												opacity: 1 
											});
										}
									}
								}
							});
						}

						player = 2;
					} 
						else if (player === 2) {
							$(".tourJoueur").replaceWith("<div class='tourJoueur' style = \"position: absolute; margin-left: 45%; margin-top: 8%; font-weight:bold;\"><p>Au tout du Joueur 1</p></div>");
							$("#" + p + '-' + tab[1]).css('background-color', setting.player2);
							$("#" + p + '-' + tab[1]).attr('data-statut',2);
							tableau[p][tab[1]] = 2;
							if(check_winner(tableau, p, tab[1], player) == 1) {
								alert('player 2 won');
								$("div").animate({
									top: 'Opx',
									opacity: 0.5 
								});

								$('body').append("<button class='bout' style = \" margin-left: 49%; border-radius: 30%; color:#965cf7; \">RETRY</button>");
								$(".bout").click(function(){

									for(var t = setting.y; t != -1; t--) { 
									for(var p = setting.x; p != -1; p--) {
										if($("#" + p + "-" + t).attr('data-statut') == 1) {
											$("#" + p + "-" + t).css('background-color','white');
											document.querySelectorAll("[data-statut='0']");
										}
													if($("#" + p + "-" + t).attr('data-statut') == 2) {
											$("#" + p + "-" + t).css('background-color','white');
											document.querySelectorAll("[data-statut='0']");
											$("div").animate({
									top: 'Opx',
									opacity: 1 
								});
										}
									}
								}

								});
							}
							document.querySelectorAll("[data-statut='2']");
							player = 1;
						}
						return;
					}
				}
			});


		function check_winner(tableau, y, x, player) {
			var count = 0;
			while (count < tableau.length) {
				var winCounter = 0;
				var new_count = count;
				while(new_count < tableau.length) {

					if (tableau[new_count][x] == player) {
						winCounter++;
					} else {
						winCounter = 0;
					}

					new_count++;
					if (winCounter == 4) {
						return 1;
					}
				}
				count++;
			}

			count = 0;
			while (count < tableau.length) {
				var winCount = 0;
				var new_counter = count;
				while(new_counter < tableau[y].length) {
					if (tableau[y][new_counter] == player) {
						winCount++;
					} 
					else
						winCount = 0;

					new_counter++;

					if (winCount == 4) {
						return 1;
					}
				}
				count++;
			}
			
			var rightUp = true;
			var winCount = 1;
			for (var count = 1; count <= 4; count++) {
				if (rightUp) {
					var c_x = x + count;
					var c_y = y - count;
					if (c_y < 0)
						c_y = 0;

					if (tableau[c_y][c_x] == player)
						winCount += 1;
					else {
						rightUp = false;
						count = 0;
					}
				} 
				else {
					var c_x = x - count;
					var c_y = y + count;
					if (c_y > tableau.length - 1)
						c_y = tableau.length - 1;
					if (tableau[c_y][c_x] == player)
						winCount += 1;
					else
						break;
				}

				if (winCount >= 4) {
					break;
				}
			}
			if (winCount >= 4) {
				return 1;
			}
			var leftUp = true;
			var winCount = 1;
			for (var count = 1; count <= 4; count++) {
				if (leftUp) {
					var c_x = x - count;
					var c_y = y - count;
					if (c_y < 0)
						c_y = 0;

					if (tableau[c_y][c_x] == player)
						winCount += 1;
					else {
						leftUp = false;
						count = 0;
					}
				} 
				else {
					var c_x = parseInt(x) + count;
					var c_y = y + count;
					if (c_y > tableau.length - 1)
						c_y = tableau.length - 1;
					if (tableau[c_y][c_x] == player)
						winCount += 1;
					else
						break;
				}

				if (winCount >= 4) {
					break;
				}
			}
			if (winCount >= 4) {
				return 1;
			}
			return 0;
		}

	};
})(jQuery);