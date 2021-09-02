function closest(e, t) {
  return !e ? false : e === t ? true : closest(e.parentNode, t);
}

// document.body.addEventListener("click", function (e) {
//   if (!closest(e.target, container)) {
//     container.style.display = "none";
//     open.disabled = false;
//   }
// });

const allowedKeys = [
  "Backspace",
  "Enter",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Tab",
];
const allowedNumber = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const showInputError = (container, message) => {
  const inputContainer = container.parentNode;
  const errorEle = inputContainer.querySelector(".input-error");
  errorEle.innerHTML = message;
};

const removeInputError = (container) => {
  const inputContainer = container.parentNode;
  const errorEle = inputContainer.querySelector(".input-error");
  errorEle.innerHTML = "";
};

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
    const submitButton = document.querySelector("#createServiceSubmitButton");

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

const addedToWishlistMessege = (time) => {
  const wishlistModal = document.querySelector(".wishlist-modal");
  const wishlistModalClose = document.querySelector(".wishlist-modal-close");
  const wishlistModalOk = document.querySelector(".wishlist-modal-ok");
  let isOpened = false;

  const closeModalWhenClickFar = (e) => {
    if (!closest(e.target, wishlistModal)) {
      // closeAnimation();
    }
  };

  const openAnimation = () => {
    wishlistModal.style.display = "flex";
    anime({
      targets: wishlistModal,
      translateY: [50, 0],
      opacity: [0, 1],
      easing: "easeInOutQuad",
      duration: 400,
      complete: () => {
        // document.body.addEventListener("click", closeModalWhenClickFar);
      },
    });
    isOpened = true;
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
        isOpened = false;
      },
    });
    // document.body.removeEventListener("click",closeModalWhenClickFar);
  };

  const toggleContainer = () => {
    const button = document.querySelector("#addToWishlistButton");
    button.addEventListener("click", () => {
      if (!isOpened) {
        openAnimation();
        // setTimeout(() => {
        //   closeAnimation();
        // }, time);
      }
    });
  };

  wishlistModalClose.addEventListener("click", (e) => {
    e.preventDefault();
    closeAnimation();
  });

  wishlistModalOk.addEventListener("click", (e) => {
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

const createSupplier = () => {
  const createSupplierContainer = document.querySelector(".create-supplier");
  const firstNameInput = document.querySelector("#supplier_firstName");
  const lastNameInput = document.querySelector("#supplier_lastName");
  const emailInput = document.querySelector("#supplier_email");
  const phoneNumberInput = document.querySelector("#supplier_phoneNumber");
  const supplierPassword = document.querySelector("#supplier_password");
  const supplierCompanyAdress = document.querySelector(
    "#supplier_companyAdress"
  );
  const supplierCompanyPhoneNumber = document.querySelector(
    "#supplier_companyPhoneNumber"
  );
  const supplierFiles = document.querySelector("#supplierFiles");

  const openAnimation = (conatainer) => {
    conatainer.style.display = "block";
    anime({
      targets: conatainer,
      translateY: [50, 0],
      opacity: [0, 1],
      easing: "easeInOutQuad",
      duration: 400,
    });
  };

  const closeAnimation = (container) => {
    anime({
      targets: container,
      translateY: [0, 50],
      opacity: [1, 0],
      easing: "easeInOutQuad",
      duration: 400,
      complete: () => {
        container.style.display = "none";
      },
    });
  };

  const toggleContainer = () => {
    let isOpen = false;
    const button = document.querySelector("#createSupplierViewButton");
    const supplierInnerCloseButton = document.querySelector(
      ".supplier-close-contaienr"
    );
    button.addEventListener("click", () => {
      if (isOpen) {
        closeAnimation(createSupplierContainer);
        button.innerHTML = "open Service Conainer";
        isOpen = false;
      } else {
        openAnimation(createSupplierContainer);
        button.innerHTML = "close Service Conainer";
        isOpen = true;
      }
    });
    
    supplierInnerCloseButton.addEventListener("click", () => {
      closeAnimation(createSupplierContainer);
      button.innerHTML = "open Service Conainer";
      isOpen = false;
    });
  };

  const emailHandler = () => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    emailInput.addEventListener("blur", () => {
      if (!emailInput.value) return;
      if (!emailRegex.test(emailInput.value)) {
        showInputError(emailInput, "invalid email");
      }
    });
  };

  const phonenumberHandler = () => {
    phoneNumberInput.addEventListener("keydown", (e) => {
      if (!allowedNumber.includes(e.key) && !allowedKeys.includes(e.key)) {
        e.preventDefault();
      }
    });
  };

  const browseFilesButton = () => {
    const browesFilesButton = document.querySelector(
      "#supplierBrowesFilesButton"
    );
    browesFilesButton.addEventListener("click", (e) => {
      console.log(browesFilesButton);
      e.preventDefault();
      supplierFiles.click();
    });
  };

  const onTypingValidation = () => {
    const textInputs = [
      firstNameInput,
      lastNameInput,
      emailInput,
      phoneNumberInput,
      supplierCompanyAdress,
      supplierPassword,
      supplierCompanyPhoneNumber,
    ];

    const checkTextInputsHandler = (input) => {
      input.addEventListener("blur", () => {
        const isinputEmpty = !input.value.trim();
        if (isinputEmpty) {
          showInputError(input, "This input cant be left empty");
        } else {
          removeInputError(input);
        }
      });

      input.addEventListener("input", () => {
        const isinputEmpty = !input.value.trim();
        if (!isinputEmpty) {
          removeInputError(input);
        }
      });
    };

    textInputs.forEach((input) => checkTextInputsHandler(input));

    // supplierFiles.addEventListener("blur", () => {
    //   const isinputEmpty = !supplierFiles.value.trim();
    //   if (isinputEmpty) {
    //     showInputError(supplierFiles, "This input cant be left empty");
    //   } else {
    //     removeInputError(supplierFiles);
    //   }
    // });

    // supplierFiles.addEventListener("input", () => {
    //   const isinputEmpty = !supplierFiles.value.trim();
    //   if (!isinputEmpty) {
    //     removeInputError(supplierFiles);
    //   }
    // });
  };

  const checkValidity = () => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let countEmptyInputs = 0;
    let isValidEmail = false;
    // let isValidPhoneNumber = false;

    const textInputs = [
      firstNameInput,
      lastNameInput,
      emailInput,
      phoneNumberInput,
      supplierCompanyAdress,
      supplierPassword,
      supplierCompanyPhoneNumber,
    ];

    const checkTextInputsHandler = (input) => {
      const isinputEmpty = !input.value.trim();
      if (isinputEmpty) {
        showInputError(input, "This input cant be left empty");
      } else {
        removeInputError(input);
      }
    };

    if (supplierFiles.files.length == 0) {
      const isinputEmpty = !supplierFiles.files[0];
      if (isinputEmpty) {
        showInputError(supplierFiles, "This input cant be left empty");
      } else {
        removeInputError(supplierFiles);
      }
      countEmptyInputs++;
    }
    if (emailRegex.test(emailInput.value)) isValidEmail = true;

    textInputs.forEach((input) => {
      checkTextInputsHandler(input);
      if (!input.value) countEmptyInputs++;
    });
    if (isValidEmail && countEmptyInputs === 0) {
      return true;
    } else {
      return false;
    }
  };

  const submitHandler = () => {
    const submitButton = document.querySelector("#createSupplierSubmitButton");
    submitButton.addEventListener("click", (e) => {
      e.preventDefault();
      const supplierData = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        phoneNumber: phoneNumberInput.value,
        companyAdress: supplierCompanyAdress.value,
        companyPhoneNumber: supplierCompanyPhoneNumber.value,
        password: supplierPassword.value,
        files: supplierFiles.files[0],
      };
      if (checkValidity()) {
        console.log(supplierData);
      }
    });
  };

  submitHandler();
  browseFilesButton();
  onTypingValidation();
  emailHandler();
  phonenumberHandler();
  toggleContainer();
};

createSupplier();
overFlowMessage("Payment successfully made.");
createServiceUI();
addedToWishlistMessege(2000);
