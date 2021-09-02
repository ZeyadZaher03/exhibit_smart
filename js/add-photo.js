const editProfileImageHandler = () => {
  const editProfileImageInput = document.querySelector(
    "#editProfileImageInput"
  );
  const removeImagebutton = document.querySelector("#removeImageEditProfile");

  const addProfileImgContainer = document.querySelector(
    ".edit-profile-pic-empty"
  );
  const addProfileImgbutton = document.querySelector(".edit-profile-pic-icon");
  const editProfileImgbutton = document.querySelector(
    ".edit-profile-pic-image-icon"
  );
  const addProfileImgInput = document.querySelector("#editProfileImageInput");
  const imgContainer = document.querySelector(".edit-profile-pic-image");
  const imgEle = document.querySelector(".edit-profile-pic-image img");

  editProfileImageInput.addEventListener("input", () => {
    const file = editProfileImageInput.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target.result;
      addProfileImgContainer.style.display = "none";
      imgContainer.style.display = "flex";
      imgEle.src = result;
    };
    reader.readAsDataURL(file);
  });

  const addProfileImgHandler = () => {
    addProfileImgbutton.addEventListener("click", () =>
      addProfileImgInput.click()
    );
  };

  const editrofileImgHandler = () => {
    editProfileImgbutton.addEventListener("click", () =>
      addProfileImgInput.click()
    );
  };

  const removeImageHandler= () => {
    removeImagebutton.addEventListener("click", () => {
      addProfileImgContainer.style.display = "flex";
      imgContainer.style.display = "none";
      addProfileImgInput.value = ""
      imgEle.src = "";
    });
  };

  removeImageHandler();
  editrofileImgHandler();
  addProfileImgHandler();
};
editProfileImageHandler();
