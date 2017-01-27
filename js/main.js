function Chat()
{
	this.nombre = '';
	this.people = [];
	this.messages = [];
	this.chatAvatar = '';
}
function Person(_name, _avatar,_color)
{
	this.name = _name;
	this.avatar = _avatar;
	this.color=_color;
}
function Message(_message, _sender)
{
	this.message = _message;
	this.sender = _sender;
	this.received = false;
}
function Whatsapp()
{
	this.chats = [];
	this.selectedChat = null;
	this.searchChat		= function(_keyword){};
	this.icono= function(_int){
		var emojis= document.getElementById('emojis');
		emojis.addEventListener('click', insertEmojis);
	};
	function sendEmojis(evt)
	{
	//var htmlMessageIn = '<div class="w-message w-message-in"><div class="w-message-text"><p>'+ evt.target + '</p><div class="time">'+horaActual+'</div></div></div>';
		var divChat = document.getElementById('chat');
		var time= document.getElementById('time');
		//var time= document.createElement('time');
		var fecha= new Date();
		var hora= fecha.getHours();
		var minuto= fecha.getMinutes();
		if(minuto<10){minuto='0'+minuto}
		var horaActual= hora+":"+minuto;
	   	//var htmlMessageIn = '<div class="w-message w-message-in"><div class="w-message-text"><p><img class="emoji" src="image/risa.png"></p><div class="time">'+horaActual+'</div></div></div>';
		var htmlMessageOut = '<div class="w-message w-message-out"><div class="w-message-text"><p><img class="emoji animated flash"src="'+evt.target.src+'"></p><div class="time">'+horaActual+'</div></div></div>';
		divChat.innerHTML += htmlMessageOut;
		divChat.scrollTop = divChat.scrollHeight;	
	};

	function insertEmojis()
	{
		var emojis= document.getElementById('listEmojis');
	if( !createdIcons ) {//
		var listemojis= '<ul id="listaEmojis"><li><img class="emoji" src="image/charlie.png"></li><li><img class="emoji" src="image/enojado.png"></li><li><img class="emoji" src="image/llora.png"></li><li><img class="emoji" src="image/guino.png"></li><li><img class="emoji" src="image/pop.png"></li><li><img class="emoji" src="image/beso.png"></li><li><img class="emoji" src="image/risa.png"></li><li><img class="emoji" src="image/lentes.png"></li></ul>';
		emojis.innerHTML= listemojis;
		createdIcons = true;//
		showingIcons = true;//
	} else {//

		if(showingIcons) {//
			emojis.style.display = 'none';//
			showingIcons = false;//
		} else {//
			emojis.style.display = 'block';//
			showingIcons = true;//
		}//
	}//

	var arrayEmojis=[];
	var flag= document.getElementById('listaEmojis');
	arrayEmojis=flag.childNodes;
	for(var i=0; i<arrayEmojis.length;i++)
	{
		 arrayEmojis[i].addEventListener('click',sendEmojis);
	}
	};
	function searchChatFromId(evt)
	{
		arrayDivs= evt.target.parentNode.parentNode.childNodes;
		avatarDiv= arrayDivs[0];
		timeDiv= arrayDivs[1];

		arrayDivsDatos=avatarDiv.childNodes;
		var avatarImg= arrayDivsDatos[0];
		var h3= arrayDivsDatos[1];
		var p= arrayDivsDatos[2];
		timeDiv= arrayDivs[1];

		var cabeceraChatList = document.getElementById('cabecera');
		//console.log(cabeceraChatList);
		var htmlCabeceraChatList= '<img src="'+avatarImg.src+'" alt="">'+'<h4 class="w-contact-name">'+h3.textContent+'</h4>';
		cabeceraChatList.innerHTML= htmlCabeceraChatList;		
		var chatList = document.getElementById('chat');
		chatList.innerHTML='';
		console.log(p.textContent);
		var divChat = document.getElementById('chat');
		var htmlMessageIn = '<div class="w-message w-message-in"><div class="w-message-text"><h5 style="color:black">'+h3.textContent+'<h5><p>' + p.textContent + '</p><div class="time">'+timeDiv.textContent+'</div></div></div>';
		divChat.innerHTML += htmlMessageIn;
	};
	function changeImage(evt){
		var divForm= document.getElementById('miImage');
		var miUrl= document.getElementById('miUrl').value;
		//console.log(miUrl);
		//console.log(divForm.firstChild.src);
		divForm.firstChild.src=miUrl;
		this.avatar = miUrl;
	};
	function changeImageAvatar(){
		
		var div= document.getElementById('miInputImage');
		if( !createdImage ) {
		var html= '<label>URL&nbsp&nbsp</label><input id="miUrl" type="text" name="" placeholder="ingresa el url de tu image"><button class="btn btn-success btn-xs">cambiar</button>';
		div.innerHTML= html;
		div.lastChild.addEventListener('click',changeImage);
		createdImage = true;
		showingImage = true;
	} else {

		if(showingImage) {
			div.style.display = 'none';
			showingImage = false;
		} else {
			div.style.display = 'block';
			showingImage = true;
		}
	}
	};
	
	this.changeImageEvent =function(_chatId){
		var miImage =document.getElementById('miImage');
		miImage.firstChild.addEventListener('click',changeImageAvatar);
	}
	this.getChatFromId	= function(_chatId){
		var ulChatList = document.getElementById('chat-list');
		var arrayUlChatList= ulChatList.childNodes;
		for(var i=0; i<arrayUlChatList.length;i++)
		{
			arrayUlChatList[i].addEventListener('click',searchChatFromId);
		}
	};
	this.drawChatList	= function(_htmlTarget){
		var ulChatList = document.getElementById('chat-list');
		for (var i in this.chats) {
			//console.log(this.chats[i].messages);
			var htmlChatList = '<li><div class="avatar">' +
					'<img src="'+ this.chats[i].chatAvatar+'" alt="" class="wh-44">'+
					'<h3 class="w-contact-name">'+ this.chats[i].nombre +'</h3>' +
					'<p class="w-last-message">'+ this.chats[i].messages[this.chats[i].messages.length-1].message + '</p>' +
				'</div>' +
				'<div class="time">03/01/2016</div>' +
			'</li>';
			ulChatList.innerHTML += htmlChatList;
		}
	};
	this.drawMessageList= function(){
		var divChat = document.getElementById('chat');
		divChat.innerHTML = '';

		for (var i in this.selectedChat.messages) {
			if (object.hasOwnProperty(i)) {
				//console.log(this.selectedChat.messages[i]);
				this.sendMessage(this.selectedChat.messages[i], false);
			}
		}
	};
	this.getLastMessage = function(){
		return this.selectedChat.messages[this.selectedChat.messages.length-1];
	};
	this.sendMessage	= function(_message, _in){
		
		var divChat = document.getElementById('chat');
		var time= document.getElementById('time');
		//var time= document.createElement('time');
		var fecha= new Date();
		var hora= fecha.getHours();
		var minuto= fecha.getMinutes();
		if(minuto<10){minuto='0'+minuto}
		var horaActual= hora+":"+minuto;
	   	var htmlMessageIn = '<div class="w-message w-message-in"><div class="w-message-text"><h5 style="color:'+_in.color+'">'+_in.name+'<h5><p>' + _message.message + '</p><div class="time">'+horaActual+'</div></div></div>';
		var htmlMessageOut = '<div class="w-message w-message-out"><div class="w-message-text"><p>' + _message.message + '</p><div class="time">'+horaActual+'</div></div></div>';
		this.selectedChat.messages.push(_message);
		//console.log(_in.color);
		//console.log(_message.sender);
		if(_in.name=='Gerson')
		{
			divChat.innerHTML += htmlMessageOut;
		}else{
			divChat.innerHTML += htmlMessageIn;
		}
		divChat.scrollTop = divChat.scrollHeight;
	};
}
var wapp = new Whatsapp();

var me = new Person('Gerson');
var zare = new Person('Zare');
var liset = new Person('Liset');
var nataly = new Person('Nataly');

var laboratoria= new Person('Laboratoria');
zare.color='skyblue';
liset.color='orange';
nataly.color='violet';
var chat = new Chat();
chat.nombre = "Chat";
chat.people.push(zare);
chat.chatAvatar = 'https://cdn0.iconfinder.com/data/icons/iconshock_guys/512/andrew.png';
wapp.chats.push(chat);

var chat2 = new Chat();
chat2.nombre = "Liset";
chat2.chatAvatar = 'https://upload.wikimedia.org/wikipedia/en/5/55/Xbox_NXE_avatar.png';
chat2.people.push(liset);

wapp.chats.push(chat2);

var chat3 = new Chat();
chat3.nombre = "Nataly";
chat3.chatAvatar = 'https://upload.wikimedia.org/wikipedia/en/5/55/Xbox_NXE_avatar.png';
chat3.people.push(nataly);

wapp.chats.push(chat3);

wapp.selectedChat = chat;

wapp.sendMessage(new Message('Hola', zare),zare);
wapp.sendMessage(new Message('Que tal?', me),me);
wapp.sendMessage(new Message('Yo muy bien, tu que tal?', zare),zare);


wapp.selectedChat = chat2;

wapp.sendMessage(new Message('Hola', me),me);
wapp.sendMessage(new Message('Tienes un peine?', liset),liset);

wapp.selectedChat = chat3;

wapp.sendMessage(new Message('yo soy zarela', me),me);
wapp.sendMessage(new Message('dime compañerita?', nataly),nataly);

wapp.drawChatList();
wapp.getChatFromId();
wapp.icono();
wapp.changeImageEvent();
//console.log(wapp.getLastMessage().sender);

    var search = document.getElementById("search"),
    food = document.getElementsByTagName("h3"),
    forEach = Array.prototype.forEach;
	search.addEventListener("keyup", function(e){
    var choice = this.value;
    forEach.call(food, function(f){
        if (f.innerHTML.toLowerCase().search(choice.toLowerCase()) == -1)
            f.parentNode.parentNode.style.display = "none";        
        else
            f.parentNode.parentNode.style.display = "block";        
    });
},false);

window.onload = init;

var inputMessage;
var divChat;
var chatPanel;
var createdIcons = false;//
var showingIcons = false;//
var createdImage = false;//
var showingImage = false;//

function init()
{
	inputMessage = document.getElementById('mensajes');
	divChat = document.getElementById('chat');
	//chatPanel = document.querySelector('.w-chat-panel');
	inputMessage.addEventListener('keyup', onInputKeyUp);	
}
function onInputKeyUp(evt)
{
	if(evt.keyCode == 13)
	{
		wapp.sendMessage(new Message(evt.target.value, me),me);
		evt.target.value = '';
	}
}

