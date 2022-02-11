//fetch api from https://www.fallmerayer.it/wp-json/wp/v2/posts

fetch("https://www.fallmerayer.it/wp-json/wp/v2/posts")
  .then((response) => response.json())
  .then((data) => {
    //get the description of each post
    let posts = data;
    for (let i = 0; i < posts.length; i++) {
      let post = document.createElement("div");
      post.setAttribute("class", "post");
      post.setAttribute("id", `post${i}`);
      document.getElementById("news").appendChild(post);
      post.innerHTML = posts[i].title.rendered;

      //get the id of each post
      let id = posts[i].id;

      let img_url =
        "https://www.fallmerayer.it/wp-json/wp/v2/media?parent=" + id;

      //take the img_url and post the image to the page
      fetch(img_url)
        .then((response) => response.json())
        .then((data) => {
          if (data[0].guid.rendered != undefined) {
            let img = data[0].guid.rendered;
            let img_tag = document.createElement("img");
            img_tag.setAttribute("src", img);
            img_tag.setAttribute("class", "post_image");
            document.getElementById(`post${i}`).appendChild(img_tag);
          }
        });

      //https://www.fallmerayer.it/wp-json/wp/v2/media?parent=7548
    }
  });
