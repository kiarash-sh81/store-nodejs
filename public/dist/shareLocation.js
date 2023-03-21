function getLocation(){
    navigator.geolocation.getCurrentPosition(
    (position)=>{
        const {latitude:lat , longitude:long} = position.coords;
        const latlong = new google.maps.LatLng(lat ,long)
        const li = stringToHtml(`<li class="sent">
                                    <img src="https://media-exp1.licdn.com/dms/image/C5603AQE3g9gHNfxGrQ/profile-displayphoto-shrink_200_200/0/1645507738281?e=1659571200&v=beta&t=wtwELdT1gp6ICp3UigC2EgutGAQgDP2sZKUx0mjCTwI"
                                    alt="" />
                                    
                                </li>`)
        
            const p = stringToHtml(`<p id="location-me" style="width: 200px; height=150px;"></p>`)
            const myOption ={   
                zoom: 14,
                center: latlong,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false,
                NavigationControlOption:{
                  style: google.maps.NavigationControlStyle.SMALL
            }
        }
        const map = new google.maps.Map(p , myOption)
        li.appendChild(p);
        document.querySelector(".messages ul").appendChild(li);
        new google.maps.marker({
            position: latlong,
            map,
            title: "you are hear"
        })
    },

    (error)=>{
        const li = stringToHtml(`<li class="sent">
                                    <img src="https://media-exp1.licdn.com/dms/image/C5603AQE3g9gHNfxGrQ/profile-displayphoto-shrink_200_200/0/1645507738281?e=1659571200&v=beta&t=wtwELdT1gp6ICp3UigC2EgutGAQgDP2sZKUx0mjCTwI"
                                    alt="" />
                                    
                                </li>`)
        const p = stringToHtml(`<p id="location-me" style="width: 200px; height=150px;">${error.message}</p>`)
        li.appendChild(p);
        document.querySelector(".messages ul").appendChild(li)
    })
}

// module.exports ={
//     getLocation
// }