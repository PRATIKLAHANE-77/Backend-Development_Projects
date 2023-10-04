// const div = document.getElementById("1");
// div.addEventListener("click", (event) => {
//   event.preventDefault();

//   const newDiv = document.createElement("div");

//   const nameInput = document.createElement("input");
//   nameInput.type = "text";
//   nameInput.id = "nameInput";
//   nameInput.style.width = "90%"; // Set the width of the input field to 100%

//   const nameLabel = document.createElement("label");
//   nameLabel.textContent = "Name";
//   nameLabel.for = "nameInput";

//   const emailInput = document.createElement("input");
//   emailInput.type = "text";
//   emailInput.id = "emailinput";
//   emailInput.style.width = "90%"; // Set the width of the input field to 100%

//   const emailLabel = document.createElement("label");
//   emailLabel.textContent = "Email";
//   emailLabel.for = "emailinput";

//   const button = document.createElement("button");
//   button.textContent = "Book";
//   button.id = "book-btn";

//   newDiv.appendChild(nameLabel);
//   newDiv.appendChild(nameInput);
//   newDiv.appendChild(emailLabel);
//   newDiv.appendChild(emailInput);
//   newDiv.appendChild(button);

//   document.body.appendChild(newDiv);

//   const book = document.getElementById("book-btn");
//   book.addEventListener("click", bookfun);
// });

// function bookfun() {
//   const available = document.getElementById("slotlist1");
//   let val = parseInt(available.textContent);
//   val--;
//   available.textContent = val + " Available";
//   const name = document.getElementById("nameInput").value;
//   const email = document.getElementById("emailinput").value;
//   const time = document.getElementById("timelist1").textContent;

//   const obj = {
//     name: name,
//     email: email,
//     time: time,
//   };
//   postdata(obj);

// }

// function postdata(param) {
//     axios
//       .post("http://localhost:5000/submit", param)
//       .then((response) => {
//         console.log("success");
//         show(param);
//         // console.log(response.data);
//       })
//       .catch((err) => {
//         console.error("Error posting data:", err); // Log any errors that occur during the POST request
//       });

//   }

// function show(param) {
//   axios
//     .get("http://localhost:5000/fetchdata", { params: { name: param.name } })
//     .then((response) => {
//       const newdiv = document.createElement("div");
//       newdiv.id = "divid";
//       const data = response.data;
//       newdiv.innerHTML = `hi ${data[0].name}, please join meeting via this <a href="https://meet.google.com/top-zgwp-dzu?ijlm=1696324630861&adhoc=1&hs=187">Link</a> at ${data[0].time}`;

//       const button = document.createElement("button");
//       button.id = "cancel-btn";
//       button.textContent = "Cancel";
//       newdiv.appendChild(button);
//       document.body.appendChild(newdiv);
//       const remdata = button.parentElement.textContent;
//       button.addEventListener("click", () => remove(param));

//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

// function remove(param) {
//   console.log(param);
//   axios.delete("http://localhost:5000/deldata", { params: { name: param.name } }).then((response) =>{
//     const available = document.getElementById("slotlist1");
//     let val = parseInt(available.textContent);
//     val++;
//     available.textContent = val + " Available";
//     const cancel = document.getElementById("cancel-btn");
//     cancel.parentElement.remove();

//   })

// }

// Get all the divs with the class 'box'
const boxes = document.querySelectorAll(".box");

// Add a click event listener to each div
boxes.forEach((box) => {
  box.addEventListener("click", (event) => {
    event.preventDefault();

    // Get the time and available slots elements within the clicked box
    const timeElement = box.querySelector(".time");
    const slotsElement = box.querySelector(".slots");

    // Extract the time from the time element
    const time = timeElement.textContent;

    // Extract the available slots count and update it
    let slots = parseInt(slotsElement.textContent);
    if (slots >= 1) {
      slots--;
      slotsElement.textContent = slots + " Available";

      // Create and append the booking form
      const newDiv = document.createElement("div");
      newDiv.innerHTML = `
        <label for="nameInput">Name</label>
        <input type="text" id="nameInput" style="width: 90%" />
        <label for="emailInput">Email</label>
        <input type="text" id="emailInput" style="width: 90%" />
        <button id="book-btn">Book</button>
      `;
      document.body.appendChild(newDiv);

      // Add a click event listener to the "Book" button
      const bookButton = newDiv.querySelector("#book-btn");
      bookButton.addEventListener("click", () => {
        const name = document.getElementById("nameInput").value;
        const email = document.getElementById("emailInput").value;

        setTimeout(() => {
          bookButton.parentElement.remove();
        }, 5000);

        const obj = {
          name: name,
          email: email,
          time: time,
        };
        const obj1 = {
          box,
        }

        postdata(obj, obj1);
      });
    }
    else{
      box.remove();
      
    }
  });
});

function postdata(param, obj1) {
  axios
    .post("http://localhost:5000/submit", param)
    .then((response) => {
      console.log("success");
      show(param, obj1);
    })
    .catch((err) => {
      console.error("Error posting data:", err);
    });
}

function show(param, obj1) {
  axios
    .get("http://localhost:5000/fetchdata", { params: { name: param.name } })
    .then((response) => {
      const newdiv = document.createElement("div");
      newdiv.id = "divid";
      const data = response.data;
      newdiv.innerHTML = `hi ${data[0].name}, please join the meeting via this <a href="https://meet.google.com/top-zgwp-dzu?ijlm=1696324630861&adhoc=1&hs=187">Link</a> at ${data[0].time}`;

      const button = document.createElement("button");
      button.id = "cancel-btn";
      button.textContent = "Cancel";
      newdiv.appendChild(button);
      document.body.appendChild(newdiv);
      button.addEventListener("click", () => remove(param, obj1));
    })
    .catch((err) => {
      console.log(err);
    });
}

function remove(param, obj1) {
  const {box} = obj1;
  axios
    .delete("http://localhost:5000/deldata", { params: { name: param.name } })
    .then((response) => {
      // const mainDiv = document.querySelector(".box"); // Assuming the main div is the first div with the class "box"
      const slotsElement = box.querySelector(".slots");
      let val = parseInt(slotsElement.textContent);
      val++;
      slotsElement.textContent = val + " Available";

      // Remove the canceled booking div
      const cancel = document.getElementById("cancel-btn");
      cancel.parentElement.remove();
    });
}
