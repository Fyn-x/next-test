import Swal from "sweetalert2";

const swal = (type, title, text, btnText = "Okay") => {
  Swal.fire({
    title: title,
    text: text,
    icon: type,
    confirmButtonText: btnText,
  });
};

export default swal;
