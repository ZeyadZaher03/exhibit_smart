function closest(e, t) {
  return !e ? false : e === t ? true : closest(e.parentNode, t);
}

// document.body.addEventListener("click", function (e) {
//   if (!closest(e.target, container)) {
//     container.style.display = "none";
//     open.disabled = false;
//   }
// });

const createServiceUI = () => {
  const openCreateService = () => {
    const createServiceContainer = document.querySelector(
      ".create-service-container"
    );
    createServiceContainer.style.display = "block";
    anime({
      targets: createServiceContainer,
      translateY: [50, 0],
      opacity: [0, 1],
      easing: "easeInOutQuad",
      duration: 400,
    });
  };

  const closeCreateService = () => {
    const createServiceContainer = document.querySelector(
      ".create-service-container"
    );
    anime({
      targets: createServiceContainer,
      translateY: [0, 50],
      opacity: [1, 0],
      easing: "easeInOutQuad",
      duration: 400,
      complete: () => {
        createServiceContainer.style.display = "none";
      },
    });
  };

  const toggleContainer = () => {
    let isOpen = false;
    const button = document.querySelector("#createServiceViewButton");
    button.addEventListener("click", () => {
      if (isOpen) {
        closeCreateService();
        button.innerHTML = "open Service Conainer";
        isOpen = false;
      } else {
        openCreateService();
        button.innerHTML = "close Service Conainer";
        isOpen = true;
      }
    });
  };

  const stockHandler = () => {
    const stockInput = document.querySelector("#service_stock");
    const plusButton = document.querySelector("#plusButtonStock");
    const minusButton = document.querySelector("#minusButtonStock");
    let stockValue = stockInput.value;

    plusButton.addEventListener("click", (e) => {
      e.preventDefault();
      stockValue++;
      stockInput.value = stockValue;
    });

    minusButton.addEventListener("click", (e) => {
      e.preventDefault();
      if (stockValue <= 0) return;
      stockValue--;
      stockInput.value = stockValue;
    });
  };

  const checkArabic = (string) => {
    const arabic = /[\u0600-\u06FF]/;
    const inputedString = string;
    const allowedKeys = [
      "Backspace",
      "Enter",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];
    return arabic.test(inputedString) || allowedKeys.includes(string);
  };

  const arabicInputsValidation = () => {
    const serviceNameAr = document.querySelector("#service_serviceNameAR");
    const serviceDescriptionAr = document.querySelector(
      "#service_serviceDescriptionAR"
    );

    serviceNameAr.addEventListener("keydown", (e) => {
      if (!checkArabic(e.key)) e.preventDefault();
    });
    serviceDescriptionAr.addEventListener("keydown", (e) => {
      if (!checkArabic(e.key)) e.preventDefault();
    });
  };

  const addImageHandler = () => {
    const imageDropContainer = document.querySelector(
      ".service-add-image-drop-container"
    );
    const imageEle = document.querySelector(".service-image-container img");

    const imageInput = document.querySelector("#serviceImage");

    const removeImageHandler = () => {
      const removeImageButton = document.querySelector(
        ".service-image-close-contaienr"
      );
      removeImageButton.addEventListener("click", () => {
        imageDropContainer.style.display = "flex";
        imageEle.parentElement.style.display = "none";
      });
    };

    const addImage = () => {
      const file = imageInput.files[0];
      const fileNameFull = file.name;
      const fileName = fileNameFull.slice(0, fileNameFull.indexOf("."));
      const fileSize = Math.round(file.size / 1024);
      const fileType = [
        file.type.slice(0, file.type.indexOf("/")),
        file.type.slice(file.type.indexOf("/") + 1),
      ];

      const fileData = {
        fileNameFull,
        fileName,
        fileSize,
        fileType,
      };
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target.result;
        imageDropContainer.style.display = "none";
        imageEle.parentElement.style.display = "block";
        imageEle.src = result;
      };
      reader.readAsDataURL(file);
    };

    const browseFiles = () => {
      const browseFilesButton = document.querySelector("#browes_files_button");
      browseFilesButton.addEventListener("click", (e) => {
        e.preventDefault();
        imageInput.click();
      });
    };

    imageInput.addEventListener("input", (e) => {
      e.preventDefault();
      addImage();
    });

    imageDropContainer.addEventListener("dragover", (e) => {
      e.preventDefault();
      imageDropContainer.classList.add(
        "service-add-image-drop-container--active"
      );
    });

    imageDropContainer.addEventListener("dragleave", (e) => {
      e.preventDefault();
      imageDropContainer.classList.remove(
        "service-add-image-drop-container--active"
      );
    });

    imageDropContainer.addEventListener("drop", (e) => {
      e.preventDefault();
      imageInput.files = e.dataTransfer.files;
      addImage();
    });
    removeImageHandler();
    browseFiles();
  };

  const submit = () => {
    const submitButton = document.querySelector(".service-submit-button");

    const categoryValue = document.querySelector("#service_category").value;
    const subCategoryValue = document.querySelector(
      "#service_subCategory"
    ).value;
    const supplierIdValue = document.querySelector("#service_supplierId").value;
    const creationDateValue = document.querySelector(
      "#service_creationDate"
    ).value;
    const coveredCityValue = document.querySelector(
      "#service_coveredCity"
    ).value;
    const serviceNameENValue = document.querySelector(
      "#service_serviceNameEN"
    ).value;
    const serviceNameARValue = document.querySelector(
      "#service_serviceNameAR"
    ).value;
    const colorValue = document.querySelector("#service_color").value;
    const sizeValue = document.querySelector("#service_size").value;
    const spaceValue = document.querySelector("#service_space").value;
    const imgValue = document.querySelector("#serviceImage").files[0];
    const descriptionENValue = document.querySelector(
      "#service_serviceDescriptionEN"
    ).value;
    const descriptionARValue = document.querySelector(
      "#service_serviceDescriptionAR"
    ).value;
    submitButton.addEventListener("click", (e) => {
      e.preventDefault();
      const serviceData = {
        category: categoryValue,
        subCategory: subCategoryValue,
        supplierId: supplierIdValue,
        creationDate: creationDateValue,
        coveredCity: coveredCityValue,
        serviceNameEN: serviceNameENValue,
        serviceNameAR: serviceNameARValue,
        color: colorValue,
        size: sizeValue,
        space: spaceValue,
        img: imgValue,
        descriptionEN: descriptionENValue,
        descriptionAR: descriptionARValue,
      };
      console.log(serviceData);
    });
  };
  arabicInputsValidation();
  stockHandler();
  addImageHandler();
  toggleContainer();
  submit();
};

const addedToWishlistMessege = () => {
  const wishlistModal = document.querySelector(".wishlist-modal");
  const wishlistModalClose = document.querySelector(".wishlist-modal-close");

  const openAnimation = () => {
    wishlistModal.style.display = "flex";
    anime({
      targets: wishlistModal,
      translateY: [50, 0],
      opacity: [0, 1],
      easing: "easeInOutQuad",
      duration: 400,
    });
  };
  const closeAnimation = () => {
    anime({
      targets: wishlistModal,
      translateY: [0, 50],
      opacity: [1, 0],
      easing: "easeInOutQuad",
      duration: 400,
      complete: () => {
        wishlistModal.style.display = "none";
      },
    });
  };

  //   document.body.addEventListener("click", function (e) {
  //     if (!closest(e.target, wishlistModal) && ) {
  //       closeAnimation();
  //     }
  //   });

  const toggleContainer = () => {
    let isOpen = false;
    const button = document.querySelector("#addToWishlistButton");
    button.addEventListener("click", () => {
      if (isOpen) {
        closeAnimation();
        button.innerHTML = "open add to wish list";
        isOpen = false;
      } else {
        openAnimation();
        button.innerHTML = "close add to wish list";
        isOpen = true;
      }
    });
  };

  wishlistModalClose.addEventListener("click", (e) => {
    e.preventDefault();
    closeAnimation();
  });
  toggleContainer();
};

const overFlowMessage = (message) => {
  const overflowMessageContainer = document.querySelector(".overflow-message");
  const overflowMessage = document.querySelector(".overflow-message p");
  const overflowCloseButton = document.querySelector(".overflow-modal-close");

  overflowMessage.innerHTML = message;

  const openAnimation = () => {
    overflowMessageContainer.style.display = "flex";
    anime({
      targets: overflowMessageContainer,
      translateY: [50, 0],
      opacity: [0, 1],
      easing: "easeInOutQuad",
      duration: 400,
    });
  };

  const closeAnimation = () => {
    anime({
      targets: overflowMessageContainer,
      translateY: [0, 50],
      opacity: [1, 0],
      easing: "easeInOutQuad",
      duration: 400,
      complete: () => {
        overflowMessageContainer.style.display = "none";
      },
    });
  };

  const toggleContainer = () => {
    let isOpen = false;
    const button = document.querySelector("#overFlowMessageButton");
    button.addEventListener("click", () => {
      if (isOpen) {
        closeAnimation();
        button.innerHTML = "open overflow message";
        isOpen = false;
      } else {
        openAnimation();
        button.innerHTML = "close overflow message";
        isOpen = true;
      }
    });
  };

  overflowCloseButton.addEventListener("click", (e) => {
    e.preventDefault();
    closeAnimation();
  });

  toggleContainer();
};
overFlowMessage("Payment successfully made.");
createServiceUI();
addedToWishlistMessege();
