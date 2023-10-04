const div = document.getElementById("1");
div.addEventListener("click", (event) => {
  event.preventDefault();

  const newDiv = document.createElement("div");

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.id = "nameInput";
  nameInput.style.width = "90%"; // Set the width of the input field to 100%

  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Name";
  nameLabel.for = "nameInput";

  const emailInput = document.createElement("input");
  emailInput.type = "text";
  emailInput.id = "emailinput";
  emailInput.style.width = "90%"; // Set the width of the input field to 100%

  const emailLabel = document.createElement("label");
  emailLabel.textContent = "Email";
  emailLabel.for = "emailinput";

  const button = document.createElement("button");
  button.textContent = "Book";
  button.id = "book-btn";

  newDiv.appendChild(nameLabel);
  newDiv.appendChild(nameInput);
  newDiv.appendChild(emailLabel);
  newDiv.appendChild(emailInput);
  newDiv.appendChild(button);

  document.body.appendChild(newDiv);

  const book = document.getElementById("book-btn");
  book.addEventListener("click", bookfun);
});

function bookfun() {
  const available = document.getElementById("slotlist1");
  let val = parseInt(available.textContent);
  val--;
  available.textContent = val + " Available";
  const name = document.getElementById("nameInput").value;
  const email = document.getElementById("emailinput").value;
  const time = document.getElementById("timelist1").textContent;
  // console.log(time);

  const obj = {
    name: name,
    email: email,
    time: time,
  };

  postdata(obj);
}

function postdata(param) {
  axios
    .post("http://localhost:5000/submit", param)
    .then((response) => {
      console.log("success");
      show(param);
      // console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function show(param) {
  const newdiv = document.createElement("div");
  newdiv.id = "divid";
  newdiv.innerHTML = `hi ${param.name}, please join meeting via this <a href="https://meet.google.com/top-zgwp-dzu?ijlm=1696324630861&adhoc=1&hs=187">Link</a> at ${param.time}`;

  const button = document.createElement("button");
  button.id = "cancel-btn";
  button.textContent = "Cancel";
  newdiv.appendChild(button);
  document.body.appendChild(newdiv);
  // button.addEventListener("click", remove(param));
  button.addEventListener("click", (event) => {
    event.preventDefault();
    axios
      .delete("http://localhost:5000/delete", { params: { name: param.name } })
      .then((response) => {
        button.parentElement.remove();
        const available = document.getElementById("slotlist1");
        let val = parseInt(available.textContent);
        val++;
        available.textContent = val + " Available";
      });
  });
}



