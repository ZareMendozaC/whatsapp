function Chat()
{
	this.nombre = '';
	this.people = [];
	this.messages = [];
	this.chatAvatar = '';
}

function Person(_name, _avatar)
{
	this.name = _name;
	this.avatar = _avatar;
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
	this.getChatFromId	= function(_chatId){};
	this.drawChatList	= function(_htmlTarget){};
	this.drawMessageList= function(){
		var divChat = document.getElementById('chat');
		divChat.innerHTML = '';

		for (var i in this.selectedChat.messages) {
			if (object.hasOwnProperty(i)) {
				console.log(this.selectedChat.messages[i]);
				this.sendMessage(this.selectedChat.messages[i], false);
			}
		}
	};
	this.getLastMessage = function(){
		return this.selectedChat.messages[this.selectedChat.messages.length-1];
	};
	this.sendMessage	= function(_message, _in){
		var htmlMessageIn = '<div class="w-message w-message-in"><div class="w-message-text"><p>' + _message.message + '</p><div class="time">14:27</div></div></div>';
		var htmlMessageOut = '<div class="w-message w-message-out"><div class="w-message-text"><p>' + _message.message + '</p><div class="time">14:27</div></div></div>';
		var divChat = document.getElementById('chat');

		this.selectedChat.messages.push(_message);

		if(_in)
		{
			divChat.innerHTML += htmlMessageIn;
		}else{
			divChat.innerHTML += htmlMessageOut;
		}

		divChat.scrollTop = divChat.scrollHeight;
	};
}






var wapp = new Whatsapp();

var me = new Person('Gerson');
var zare = new Person('Zare');

var chat = new Chat();

chat.people.push(zare);

wapp.chats.push(chat);
wapp.selectedChat = chat;

wapp.sendMessage(new Message('Hola', zare));
wapp.sendMessage(new Message('Que tal?', me));

console.log(wapp.getLastMessage().sender);








window.onload = init;

var inputMessage;
var divChat;
var chatPanel;

function init()
{
	inputMessage = document.getElementById('mensajes');
	divChat = document.getElementById('chat');
	//chatPanel = document.querySelector('.w-chat-panel');
	inputMessage.addEventListener('keyup', onInputKeyUp);


	var emojis= document.getElementById('emojis');
	emojis.addEventListener('click', insertEmoji);
}
function insertEmoji(){
	var listemojis= '<li><img class="emoji" src="image/beso.png"></li><li><img class="emoji" src="image/beso.png"></li> <li><img class="emoji" src="image/risa.png"></li><li><img class="emoji" src="image/lentes.png"></li';
	var emojis= document.getElementById('listEmojis');
	emojis.innerHTML= listemojis;
}
function onInputKeyUp(evt)
{
	console.log(evt.keyCode);
	if(evt.keyCode == 13)
	{
		wapp.sendMessage(new Message(evt.target.value, me));
		evt.target.value = '';
	}
}

