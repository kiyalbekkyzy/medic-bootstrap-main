function sendEmail(event) {
  event.preventDefault();

  const data = {
    fio: document.getElementById("fio").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    date: document.getElementById("date").value,
    analysis: document.getElementById("analysis").value,
    doctor: document.getElementById("doctor").value,
    message: document.getElementById("message").value
  };

 
  fetch("http://localhost:3000/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(result => {
    if (result.success) {
      console.log("Данные сохранены в PostgreSQL! ID:", result.id);
      alert("Ваши данные успешно отправлены!");
    } else {
      console.error("Ошибка сервера:", result.error);
      alert("Ошибка при отправке данных.");
    }
  })
  .catch(err => {
    console.error("Ошибка fetch:", err);
    alert("Не удалось связаться с сервером.");
  });

}
