
//DOM Manipulation

const formInput = document.getElementById('input');
const invalidInput = document.getElementById('invalid');
const submitButton = document.getElementById('btn');
const linkSpace = document.querySelector('.links');
const linksContainer = document.querySelector('#links-container');
const pasteLink = document.querySelector('.paste-link');
const shortenLink = document.querySelector('.shorten-link');
const copyButton = document.querySelector('#copy');

const linksUrl = 'https://rel.ink/api/links/';



//submit form event listner
submitButton.addEventListener('click', ($event) => {
  $event.preventDefault();

  validateForm();


  const post = {
      "url": formInput.value
  };

  submitFormData(post);
})


//copy button event listner

copyButton.addEventListener('click', ($event) => {

  copyToClipboard();

})



 

//Fetch API

function makeRequest(data) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open('POST', linksUrl);
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          if (request.status === 201) {
            resolve(JSON.parse(request.response));
          } else {
            reject(JSON.parse(request.response));
          }
        }
      };
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify(data));
    });
  }


  //Receive API response

  async function submitFormData(post) {
      try{
        const requestPromise = makeRequest(post);
        const response = await requestPromise;
       // "https://rel.ink/" + `${data.hashid}`;
       shortenLink.textContent = "https://rel.ink/" + response.hashid;
       pasteLink.textContent = formInput.value;
      }

      catch (errorResponse) { 

        alert('Not Copied')
      }
  }



function validateForm(){
  if (!formInput.value) {
    invalidInput.style.visibility = 'visible';
    formInput.style.border = '3px solid red';
  }

  else{
    invalidInput.style.visibility = 'hidden';
    formInput.style.borderColor = '#ffffff'
    linkSpace.style.visibility = 'visible';
  }
/***
  let listItem = document.createElement("div");
  listItem.setAttribute("class", "links");

  listItem.appendChild(pasteLink);
  listItem.appendChild(shortenLink);
  listItem.appendChild(copyButton);

  linksContainer.appendChild(listItem)
  ****/

  /**
  let containerList = document.createElement('div');
  
  containerList.setAttribute("class", "links");

  let containerListOne = document.createElement('div');
  containerListOne.setAttribute("class", "paste-link");

  let containerListTwo = document.createElement('div');
  containerListTwo.setAttribute("class", "shorten-link");

  let containerButton = document.createElement('button');
  containerButton.setAttribute("id", "copy");

  containerList.appendChild(containerListOne);
  containerList.appendChild(containerListTwo);
  containerList.appendChild(containerButton);

  linksContainer.appendChild(containerList);
  */
}


function copyToClipboard(){
  //create textarea for copy element
  const copiedElement = document.createElement('textarea');
    copiedElement.value = shortenLink.innerHTML;
    //for accessiblity
    copiedElement.setAttribute('readonly', '');
    copiedElement.style.position = 'absolute';
    copiedElement.style.left = '-9999px';
    //appending textarea to body
    document.body.appendChild(copiedElement);
    copiedElement.select();

    try {
      document.execCommand('copy');
      copyButton.textContent = 'Copied!';
      copyButton.style.borderColor = 'hsl(256, 10%, 21%)';
      copyButton.style.backgroundColor = 'hsl(256, 10%, 21%)';
         } 
    catch (err) {
           alert('Oops, unable to copy');
        }

        document.body.removeChild(copiedElement);
}