/**
 * Created by radmilla on 14.5.2017.
 */
Ps.initialize(document.getElementById('playlist'));
//At the end of video play next video
document.getElementById('myVideo').addEventListener('ended',videoEnded,false);

//Creating object that will be used for adding active class on new created playlist
var indexObject = {};

//Make array of video objects
var videoList = [
    {name: 'Nature makes you happy' , url: 'videos/NatureMakesYouHappy.mp4', author: 'Radmila'},
    {name: 'Amazing nature' , url: 'videos/AmazingNature.mp4', author: 'Samantha'},
    {name: 'The world' , url: 'videos/TheWorld.mp4', author: 'John'},
    {name: 'African wildlife' , url: 'videos/AfricanWildlife.mp4', author: 'Melani'}
];

//Measure length of array
var videoCount = videoList.length;

//Generated Html
var videoPlayListHtml = playlistGenerate(videoList);

//Append to html
document.getElementById('playlist').appendChild(videoPlayListHtml);

/**
 * Function for Show and start playlist
 * @return {void}
 */
function showPlaylist() {
    document.getElementById('playlist-container').style.display = "block";
    //Start first video of playlist
    videoPlay(0);
}

/**
 * Function for adding url to video tag and starting video to play
 * @param videoNum
 * @return {void}
 */
function videoPlay(videoNum) {
    indexObject = videoList[videoNum];
    var video = document.getElementById("myVideo");
    video.setAttribute("src",videoList[videoNum].url);
    video.setAttribute('video-order', videoNum);
    video.load();
    video.play();
    removeAllActiveOnPlayList(videoPlayListHtml);
    addClassActivePlaylist(videoPlayListHtml.children[videoNum])
}

/**
 * Function for catching end of video, moving to next video
 * @return {void}
 */
function videoEnded() {
    var index = this.getAttribute('video-order');
    index++;
    var i = index > (videoCount-1) ? 0 : index;
    videoPlay(i);
}

/**
 * Function for playing video chosen from user
 * @param videoOrder
 * @return {void}
 */
function playChoosenVideo(videoOrder) {
    videoPlay(videoOrder.getAttribute('video-order'));
}

/**
 * Function for generating playlist from array
 * @param array
 * @return {Element}
 */
function playlistGenerate(array) {
    // Create the list element:
    var list = document.createElement('ul');
    for(var i = 0; i < array.length; i++) {
        //Create list element
        var item = document.createElement('li');
        //Create span element for author
        var span = document.createElement('span');
        item.setAttribute('video-order', i);
        item.classList.add('video-list');
        item.onclick = function() { playChoosenVideo(this); };
        item.appendChild(document.createTextNode(array[i].name));
        span.appendChild(document.createTextNode('Author: ' + array[i].author));
        item.appendChild(span);
        list.appendChild(item);
    }

    // Adding active class on playlist when new element is added
    if(Object.keys(indexObject).length) {
        var index = videoList.indexOf(indexObject);
        addClassActivePlaylist(list.children[index])
    }


    // Finally, return the constructed list:
    return list;
}

/**
 * Function for removing active class from all videos in playlist
 * @param videoPlayListHtml: {Element}
 * @return {void}
 */
function removeAllActiveOnPlayList(videoPlayListHtml) {
    var elems = videoPlayListHtml.children;
    [].forEach.call(elems, function(el) {
        el.classList.remove("active");
    });
}

/**
 * Function for adding active class to current video in playlist
 * @param element: {Element}
 * @return {void}
 */
function addClassActivePlaylist(element) {
    element.classList.add('active')
}

/**
 * Function for adding new video to list
 * @param myForm
 * @return {boolean}
 */
function sendForm(myForm) {
    //Create new object from send data
    var newvideo = {
        'author': myForm.elements[0].value,
        'name': myForm.elements[1].value,
        'url': myForm.elements[2].value
    };

    //Empty form fields
    myForm.elements[0].value = '';
    myForm.elements[1].value = '';
    myForm.elements[2].value = '';

    // Push new object in video list array
    videoList.push(newvideo);

    //Generate Html
    videoPlayListHtml = playlistGenerate(videoList);

    var playList =  document.getElementById('playlist');
    // Empty generated html to add new
    playList.innerHTML = '';

    //Append to html
    playList.appendChild(videoPlayListHtml);

    return false;
}