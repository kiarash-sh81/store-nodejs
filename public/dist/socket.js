const socket = io("http://localhost:4000");
let nameSpaceSocket;
function stringToHtml(str){
    const parser = new DOMParser()
    const doc = parser.parseFromString(str , "text/html");
    return doc.body.firstChild;
}

function initNameSpaceConnection(endpoint){
    if(nameSpaceSocket) nameSpaceSocket.close()
    nameSpaceSocket = io(`http://localhost:4000/${endpoint}`);
    nameSpaceSocket.on("connect" , ()=>{
        nameSpaceSocket.on("roomList" , rooms=>{
            getRoomInfo(endpoint , rooms[0]?.name)
            const roomsElement = document.querySelector("#contacts ul");
            roomsElement.innerHTML = "";
            for (const room of rooms) {
                const html =stringToHtml(`
                <li class="contact" roomName="${room.name}">
                <div class= "wrap">
                    <img src="${room.image}" height="40"/>
                    <div class= "meta">
                        <p class="name">${room.name}</p>
                        <p class="preview">${room.description}</p>
                    </div>
                </div>
                </li>
            `)
                roomsElement.appendChild(html);
            }
            const roomNodes = document.querySelectorAll("ul li.contact");
            for (const room of roomNodes) {
                room.addEventListener("click" , function(){
                    const roomName = this.getAttribute("roomName");
                    getRoomInfo(endpoint,roomName);
                })
            }
        })
    });
}

function getRoomInfo( endpoint, room){
    document.querySelector("#roomName h3").setAttribute("roomName" , room);
    document.querySelector("#roomName h3").setAttribute("endpoint" , endpoint);
    nameSpaceSocket.emit("joinRoom" , room);
    nameSpaceSocket.off("roomInfo")
    nameSpaceSocket.on("roomInfo" , roomInfo=>{
        document.querySelector(".messages ul").innerHTML = ""
        document.querySelector("#roomName h3").innerText = roomInfo.description;
        const messages = roomInfo.messages;
        const locations = roomInfo.location;
        const data = [...messages , ...locations].sort((conv1 , conv2)=> conv1.dateTime - conv2.dateTime)
        const userID =document.getElementById("userID").value;
        for (const message of messages) {
            const li = stringToHtml(`<li class="${(userID == message.sender? "sent" : "replies")}"
                                             <img src="https://media-exp1.licdn.com/dms/image/C5603AQE3g9gHNfxGrQ/profile-displayphoto-shrink_200_200/0/1645507738281?e=1659571200&v=beta&t=wtwELdT1gp6ICp3UigC2EgutGAQgDP2sZKUx0mjCTwI"
                                                alt="" />
                                                <p>${message.message}</p>
                                    </li>`)
            document.querySelector(".messages ul").appendChild(li)
        }
    });
    nameSpaceSocket.on("CountOfOnlineUser" , count=>{
        console.log(count);
        document.getElementById("onlineCount").innerText = count;
    })
}
function sendMessage(){
    const roomName =document.querySelector("#roomName h3").getAttribute("roomName");
    const endpoint = document.querySelector("#roomName h3").getAttribute("endpoint");
    let message = document.querySelector(".message-input input#messageInput").value;
    if(message.trim() == ""){
        alert("message input should not be empty");
    }
    const sender = document.getElementById("userID").value;
    nameSpaceSocket.emit("newMessage" , {
        message,
        roomName,
        endpoint,
        sender
    });

    nameSpaceSocket.off("confirmMessage")
    nameSpaceSocket.on("confirmMessage" , data=>{
        const li = stringToHtml(`<li class="${(sender == data.sender? "sent" : "replies")}">
                        <img src="https://media-exp1.licdn.com/dms/image/C5603AQE3g9gHNfxGrQ/profile-displayphoto-shrink_200_200/0/1645507738281?e=1659571200&v=beta&t=wtwELdT1gp6ICp3UigC2EgutGAQgDP2sZKUx0mjCTwI"
                         alt="" />
                        <p>${data.message}</p>
                    </li>`)
        document.querySelector(".messages ul").appendChild(li);
        document.querySelector(".message-input input#messageInput").value = "";
        const messageElement = document.querySelector("div.messages");
        messageElement.scrollTo(0 , messageElement.scrollHeight);
    });
}

socket.on("connect" , ()=>{
    socket.on("nameSpacesList" , nameSpaces =>{
        const nameSpaceElement = document.getElementById("namespaces");
        nameSpaceElement.innerHTML = ""
        initNameSpaceConnection(nameSpaces[0].endpoint);
        for (const namespace of nameSpaces) {
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.setAttribute("class" , "namespaceTitle");
            p.setAttribute("endpoint" , namespace.endpoint)
            p.innerText = namespace.title;
            li.appendChild(p);
            nameSpaceElement.appendChild(li);
        }
        const nameSpacesNodes = document.querySelectorAll("#namespaces li p.namespaceTitle")
        for (const namespace of nameSpacesNodes) {
            namespace.addEventListener("click" ,()=>{
                const endpoint = namespace.getAttribute("endpoint");
                initNameSpaceConnection(endpoint);
            })
        }
    });
    window.addEventListener("keydown" , (e)=>{
        if(e.code === "Enter"){
            sendMessage();
        }
    })
    document.querySelector("button.submit").addEventListener("click" , ()=>{
        sendMessage()
    })
})

