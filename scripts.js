
//DOM Manipulations

const formInput = document.getElementById('input');
const invalidInput = document.getElementById('invalid');
const submitButton = document.getElementById('btn');
const linkSpace = document.querySelector('.links');
const linksContainer = document.getElementById('links-container');
const linksUrl = 'https://rel.ink/api/links';

submitButton.addEventListener('click', ($event) => {
    $event.preventDefault();
    invalidInput.style.visibility = 'visible';
    formInput.style.border = '2px solid red';
    linkSpace.style.visibility = 'visible';

    const post = {
        url: formInput.value
    };

    submitFormData(post);
})


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

  async function submitFormData(post) {
      try{
        const requestPromise = makeRequest(post);
        const response = await requestPromise;
        linkSpace.textContent = response.url;
      }

      catch (errorResponse) { 

        alert('Not Copied')
      }
  }