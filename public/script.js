const socket = io.connect();
$(document).ready(function() {
  $("#newPost").click(function() {
    $(".createPost").removeClass("hidden");
    setTimeout(function() {
      $(".createPost").removeClass("scale");
    }, 200);
  });
  $("#submit").click(function() {
    if (!document.getElementById("username").value || !document.getElementById("username").value || !document.getElementById('content').value) {
      alert("Fill in all the fields");
      return;
    }
    socket.emit("posts", {
      username: $("#username").val(),
      title: $("#title").val(),
      context: $("#content").val()
    });
    $(".createPost").addClass("scale");

    $("#username").val('')
    $("#title").val('')
    $("#content").val('')
    setTimeout(function() {
      $(".createPost").addClass("hidden");
    }, 200);
  });
});

let tags = {
  '&': '&amp',
  '<': '&lt',
  '>': '&gt'
};

function replaceTag(tag) {
  return tags[tag] || tag;
}

function escapeTags(str, tag) {
  return str.replace(/[&<>]/g, replaceTag);
}


socket.on("posts", (data) => {
  document.getElementById("list").innerHTML +=
    `<div class="post">
		<h2 class="post-title">${escapeTags(data.title)}</h2>
		<p class="post-user">Written By ${escapeTags(data.username)}</p><hr/>
		<p class="post-content">${escapeTags(data.context)}</p>
	</div>`;
});

socket.on('db', data => {

  if (!data) return;

  data = data[data.length - 1]

  document.getElementById("post-title").innerText = `${data.title}`;
  document.getElementById("post-user").innerText = `Written By: ${data.username}`;
  document.getElementById("post-content").innerText = data.context;
})