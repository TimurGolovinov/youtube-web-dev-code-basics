async function getUsers() {
  const fileDestination = "users.json";

  const usersResponse = await fetch(fileDestination);
  const users = await usersResponse.json();

  return users;
}
//get user gallery photos
async function getUserImages() {
  //generate random gallery page number
  const randomGalleryPageNumber = Math.floor(Math.random() * 10);
  const galleryUrl = `https://picsum.photos/v2/list?page=${randomGalleryPageNumber}&limit=100`;
  const imagesResponse = await fetch(galleryUrl);
  const images = await imagesResponse.json();
  return images;
}

//add gallery to html
async function populateImageGalleryToHtml() {
  //get image data
  const imageData = await getUserImages();
  let imageHtml = "";
  console.log(imageData);
  //get corresponding html elements
  const htmlGallery = document.getElementById("image-destination");

  //populate elements with the data
  for (i = 0; i < imageData.length; i++) {
    imageHtml += `<img class="image" src="${imageData[i].download_url}" />`;
  }
  htmlGallery.innerHTML = imageHtml;
}

//add user name, avatar, and other data into the user card
async function populateUserDataIntoUserCard() {
  //get users data
  const userData = await getUsers(); //undefined
  console.log(userData);
  //get corresponding html elements
  const htmlUserName = document.getElementById("user-name");
  const htmlUserDescription = document.getElementById("user-description");
  const htmlUserAvatar = document.getElementById("user-avatar");

  //generate random user number
  const randomUserNumber = Math.floor(Math.random() * userData.length);

  //populate elements with the data
  htmlUserName.innerHTML = userData[randomUserNumber].name;
  htmlUserDescription.innerHTML = userData[randomUserNumber].description;
  htmlUserAvatar.src = userData[randomUserNumber].avatar;
}

function populateFollowerNumber() {
  const htmlFollowers = document.getElementById("follower-number");
  const randomUserFollowerNumber = Math.floor(Math.random() * 1000000);
  htmlFollowers.innerHTML = randomUserFollowerNumber;
}

function addFollowButtonEventListener() {
  const btnFollow = document.getElementById("button-follow");

  btnFollow.addEventListener("click", function () {
    const btnState = btnFollow.innerHTML;
    const followersCount = document.getElementById("follower-number");
    const followersCountNumber = parseInt(followersCount.innerHTML);
    console.log(followersCount);
    //if follow, make following and vice-versa
    if (btnState === "Follow") {
      btnFollow.innerHTML = "Following";
      btnFollow.style.opacity = 0.5;
      followersCount.innerHTML = followersCountNumber + 1;
    } else {
      btnFollow.innerHTML = "Follow";
      btnFollow.style.opacity = 1;
      followersCount.innerHTML = followersCountNumber - 1;
    }
  });
}

populateFollowerNumber();

populateUserDataIntoUserCard();

populateImageGalleryToHtml();

addFollowButtonEventListener();
