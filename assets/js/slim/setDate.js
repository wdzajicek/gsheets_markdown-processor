function setDate() {
  const currentDate = document.getElementById('currentDate');
  let today = new Date().toLocaleDateString();
  currentDate.setAttribute('placeholder', today);
  currentDate.value = today;
  currentDate.setAttribute('readonly', '');
}

export default setDate;
