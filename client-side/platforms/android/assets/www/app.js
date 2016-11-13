var  date = new Date();
var current = new Date();
var current_time = date.getTime();
var viewer = "";
var weekendFlag = true;
var weekDay = 1;
var startX
var startY
var endX
var endY
var swipeTreshold = 50;
var cadeiras = [

	{"mod":
		"Som/áudio  captação, registo e edição","form":"a Graça Freire"
	}, {"mod":
		"Animação multimédia","form":"a Helena Passos"
	}, {"mod":
		"Imagem/vídeo  captação, registo e edição","form":" Luis Ferreira"
	}, {"mod":
		"Modelação 3D","form":" Ricardo Passos"
	}, {"mod":
		"Sistemas de gestão de conteúdos","form":" Paulo Barata"
	}, {"mod":
		"Tecnologias multimédia na internet","form":" Rafael Santos"
	}, {"mod":
		"Composição e efeitos audiovisuais","form":" Ricardo Passos"
	}, {"mod":
		"Iluminação e &#x22;renderização&#x22; 3D","form":" Ricardo Passos"
	}, {"mod":
		"Técnicas avançadas de programação Web","form":" Paulo Barata"
	}, {"mod":
		"Desenho de sítios Web","form":" Rafael Santos"
	}
]

var months = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]


function getModuleName(name){
	for(var module in cadeiras){
		if(cadeiras[module].mod == name){
			return cadeiras[module].form;

		}
	}
}

function weekNames(date){

	switch(date.getDay()){
		case 1: return "Segunda-Feira";breaK;
		case 2: return "Terça-Feira";breaK;
		case 3: return "Quarta-Feira";breaK;
		case 4: return "Quinta-Feira";breaK;
		case 5: return "Sexta-Feira";breaK;
	}
}

function getDate(days){
	if(!days){
	date = new Date(date.getFullYear() + "-" + (date.getMonth() +1)+ "-" +(date.getDate()))
	}else{
	 date = new Date(date.getFullYear() + "-" + (date.getMonth() +1)+ "-" +(date.getDate()))
	}
	if(isWeekend(date)){
		weekendFlag = true;
		if(isNaN(new Date(date.getFullYear() + "-" + (date.getMonth() +1)+ "-" +(date.getDate()+isWeekend(date))))){
			date = new Date(date.getFullYear() + "-" + (date.getMonth()+2))
		}else{
			date = new Date(date.getFullYear() + "-" + (date.getMonth() +1)+ "-" +(date.getDate()+isWeekend(date)))
		}
	}

	return date
}

getDate();

function isWeekend(argument){
	switch(argument.getDay()){
	case 0:
		return 1;
		break;
	case 6:
		return 2;
		break;
	default:return 0;

		}
}

function nextDay(){
	var temp_date = new Date(date.getFullYear() + "-" + (date.getMonth() +1)+ "-" +(date.getDate()+1))
	if(isWeekend(temp_date)){
		temp_date = new Date(date.getFullYear() + "-" + (date.getMonth() +1)+ "-" +(date.getDate()+isWeekend(temp_date)+1))		
	}

	if(isNaN(temp_date)){
		temp_date = new Date(date.getFullYear() + "-" + (date.getMonth() +2))
	}

	return temp_date;
}


function prevDay(){
	var temp_date;
	if(date.getDate()-1 === 0){
		var temp_date = new Date(date.getFullYear() + "-" + (date.getMonth())+ "-" +31)
	}else{
		var temp_date = new Date(date.getFullYear() + "-" + (date.getMonth()+1)+ "-" +(date.getDate()-1))
	}	
	if(isWeekend(temp_date)){
		
		temp_date = new Date(date.getFullYear() + "-" + (date.getMonth()+1)+ "-" +(date.getDate()-(isWeekend(temp_date))-isWeekend(temp_date)-1))		
	}
	return temp_date;
}


//Function to handle swipes
function handleTouch(start,end, cbL, cbR){

	if(endX - startX > swipeTreshold || endX - startX < -swipeTreshold){
	
	
  //calculate the distance on x-axis and o y-axis. Check wheter had the great moving ratio.
   if(endX - startX < 0){
      cbL();
    }else{
      cbR();
    }
    }
}

//writing the callback fn()
window.onload = function(){

	function right(){  
		if(weekDay >= 2 && weekDay <= 5){
		var end = prevDay();
		document.querySelector(".schedule").innerHTML = "";
		loadSchedule(end, date)	
		date = prevDay();				
		weekDay--
		parseUI()
		arrowsControl()
		document.querySelector(".date").innerHTML=date.getDate() +" de "+ months[date.getMonth()];
		}
	}
	
	function left(){
		if(weekDay >= 1 && weekDay <= 4){
			date = nextDay();
			var end = nextDay();
			document.querySelector(".schedule").innerHTML = "";
			loadSchedule(date, end)
			weekDay++
			parseUI();
			arrowsControl();
			document.querySelector(".date").innerHTML=date.getDate() +" de "+ months[date.getMonth()];
			}
	}

	function arrowsControl(){
		if(weekDay == 5){
				document.querySelector('.js-right').style.display = "none";
			}else if(weekDay == 1){
				document.querySelector('.js-left').style.display = "none";
			}else{
				document.querySelector('.js-left').style.display = "inline-block";
				document.querySelector('.js-right').style.display = "inline-block";
			}
	}

	function parseUI(direction){
		//alert(1)
		switch(date.getDay() - current.getDay()){
			case 0: document.querySelector(".designation").innerHTML = "Hoje";break;
			case 1: document.querySelector(".designation").innerHTML = "Amanhã";break;
			case 2: document.querySelector(".designation").innerHTML = "Depois de Amanhã";break;
			default: document.querySelector(".designation").innerHTML ="Próxima "+weekNames(date)
		}
	}

	window.addEventListener('touchstart', function(event){
   		startX = event.touches[0].clientX;
   		startY = event.touches[0].clientY;
   
 	})

	window.addEventListener('touchend', function(event){
	  endX = event.changedTouches[0].clientX;
	  endY = event.changedTouches[0].clientY;
	  handleTouch(startX, endX, left, right)
	  
	   
	})

	
	arrowsControl()
	if(!localStorage.getItem('token')){
		document.getElementById('presentation').style.display = "block";
	}else{
		parseSecret();
		document.getElementById('app').style.display = "block";
		document.getElementById('presentation').style.display = "none";
		var root = document.getElementById('presentation').parentNode;
		root.removeChild(document.getElementById('presentation'));
		//var start = date;
		var end = nextDay()
		
		loadSchedule(date, end)
		parseUI();
		document.querySelector(".date").innerHTML=date.getDate() +" de "+ months[date.getMonth()];
		
		document.querySelector('.js-right').onclick=function(){
			date = nextDay();
			var end = nextDay();
			document.querySelector(".schedule").innerHTML = "";
			loadSchedule(date, end)
				weekDay++
				parseUI();
				arrowsControl();
			document.querySelector(".date").innerHTML=date.getDate() +" de "+ months[date.getMonth()];
			
		}
		document.querySelector('.js-left').onclick=function(){
			
			var end = prevDay();
			document.querySelector(".schedule").innerHTML = "";	
			loadSchedule(end, date)	
			date = prevDay();					
			weekDay--
			parseUI()
			arrowsControl()
			document.querySelector(".date").innerHTML=date.getDate() +" de "+ months[date.getMonth()];
			
		}

	}	
}


function validateToken(){
	event.preventDefault();
	var request = new XMLHttpRequest();
	var url = 'http://www.oprincipezinho.esy.es/cinel/validate.php?token=' + document.forms['validate']['token'].value ;
	

	request.onreadystatechange = function(){

		if(request.status == 200 && request.readyState == 4){
			if(request.response != "true"){
				localStorage.setItem('token',document.forms['validate']['token'].value)
				document.getElementById('message').innerHTML = "Acesso validado!";
				var root = document.getElementById('validate').parentNode;
				root.removeChild(document.getElementById('validate'));
				setTimeout(function(){location.reload();}, 3000)				
			}else{
				document.getElementById('message').innerHTML = "<h4>Acesso Inválido!</h4>";
			}

		}
	}

	request.open('GET', url);
	request.send();

}

function loadSchedule(start,end){
	document.querySelector(".schedule").innerHTML = ' <div class="bounce-anim"> <ul> <li></li> <li></li> <li></li> </ul> </div>'
	
	var date_s = (start.getTime()).toString();
	date_s = date_s.slice(0,(date_s.length - 3));
	var date_e = end.getTime().toString();
	date_e = date_e.slice(0,(date_e.length - 3));



	var request = new XMLHttpRequest();

	var url = 'http://oprincipezinho.esy.es/cinel/getHorario.php?token='+ localStorage.getItem('token')+'&start='+ date_s +'&end='+ date_e;

	request.onreadystatechange = function(){
		if(request.status == 200 && request.readyState == 4){
			var json = JSON.parse(request.responseText);
				if(json[0].error){
					document.querySelector(".schedule").innerHTML = '<h2 class="result-empty">Esta aplicação está inválida. <br> Desculpa :( </h2>';
					var timeout = setTimeout(function(){localStorage.removeItem('token');window.location.reload()}, 3000)
				}else{
					if(request.responseText === "[]"){
						document.querySelector(".schedule").innerHTML = '<h2 class="result-empty">Desculpa :) <br>Não tenho nada para te mostrar</h2>';
					}else{

					document.querySelector(".schedule").innerHTML = "";
						
						for(var thing in json){
							console.log((json[thing].title).split('\n')[0])
						}

						for(var obj in json){
							var modulo = (json[obj].title).split('\n')[0].trim()
						var html = '<div class="schedule-item">\
							<div class="schedule-time" style="background-color:'+json[obj].color+'">\
								<i class="fa fa-clock-o"></i>\
								<h4>'+(json[obj].start).split("T")[1].split("+")[0].slice(0, 5)+'</h4>\
								<h4>'+(json[obj].end).split("T")[1].split("+")[0].slice(0, 5)+'</h4>\
							</div>\
							<div class="schedule-info">\
							<h3 style="color:'+json[obj].color+'">'+modulo+'</h3>\
							<p class="schedule-room"><i class="fa fa-home"></i>Sala '+(json[obj].classroom).slice(0,4)+'</p>\
							<p><i class="fa fa-user"></i>Formador' + getModuleName(modulo); +'</p>\
							</div>';

							document.querySelector(".schedule").innerHTML += html
							}
						
						}
				}	
		}
	}
	request.open('GET', url);
	request.send();
}

function parseSecret(){
	var token = localStorage.getItem('token');
	var url = 'http://www.oprincipezinho.esy.es/cinel/validate.php?token=' + token;
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function(){
		if(xhr.status == 200 && xhr.readyState == 4){
			if(xhr.responseText == "revoke"){
				localStorage.removeItem('token');
				window.location.reload();
			}
		}
	}

	xhr.open("GET", url);
	xhr.send();

}

