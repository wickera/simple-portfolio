var formId = 'contact-form';

var data_js = {
  access_token: '0slvfwws8y6e5op1pw7khxj6'
};

function onSuccess() {
  setTimeout(function () {
    sendButton.value = 'Sent!';
    sendButton.disabled = true;
  }, 1);
}

function onError(error) {
  alert(
    'Sending error. Subject and Message must not be empty. Please refresh and try again.'
  );
  setTimeout(function () {
    sendButton.value = 'Error';
    sendButton.disabled = true;
  }, 1);
}

var sendButton = document.getElementById('submit-form');

function submitForm() {
  sendButton.value = 'Sending…';
  sendButton.disabled = true;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      onSuccess();
    } else if (request.readyState == 4) {
      onError(request.response);
    }
  };

  var subject = document.querySelector(
    '#' + formId + " [name='subject']"
  ).value;
  var message = document.querySelector(
    '#' + formId + " [name='message']"
  ).value;
  data_js['subject'] = subject;
  data_js['text'] = message;
  var params = toParams(data_js);

  request.open('POST', 'https://postmail.invotes.com/send', true);
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  request.send(params);

  return false;
}

sendButton.onclick = submitForm;

function toParams(data_js) {
  var form_data = [];
  for (var key in data_js) {
    form_data.push(
      encodeURIComponent(key) + '=' + encodeURIComponent(data_js[key])
    );
  }

  return form_data.join('&');
}

var js_form = document.getElementById(formId);
js_form.addEventListener('submit', function (e) {
  e.preventDefault();
});
