const insertBtn = document.querySelector('#insert-ajax-btn'),
  tableBody = document.querySelector('.discription .table .body');

function read() {
  fetch('/read')
    .then((res) => res.json())
    .then((json) => {
      const lists = JSON.parse(json).list;
      let trs = '';
      for (let i = 0; i < lists.length; i++) {
        trs += `
          <tr class="${lists[i].complet === true ? 'end' : ''}">
            <td>${i + 1}</td>
            <td>${lists[i].title}</td>
            <td><button class="btn ${lists[i].complet === true ? 'end' : ''}">완료</button></td>
            <td><button class="btn">삭제</button></td>
          </tr>
        `;
      };
      tableBody.innerHTML = trs;
    })
    .catch((err) => console.log(err));
}

function create() {
  let data = document.querySelector('.text');
  dataObj = { title: data.value };
  fetch('/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataObj)
  })
    .then(res => res.json())
    .then(json => {
      if (json === true) read();
    })
    .catch((err) => console.log(err));

  data.value = '';
}

function updateAndDelete(event) {
  const target = event.target,
    index = target.parentNode.parentNode.rowIndex - 1;
  if (target.innerText === "완료") {
    fetch('/complet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'index': index })
    })
      .then(res => res.json())
      .then(json => {
        if (json === true) read();
      });
  } else if (target.innerText === "삭제") {
    fetch('/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'index': index })
    })
      .then(res => res.json())
      .then(json => {
        if (json === true) read();
      })
      .catch((err) => console.log(err));
  }
}

function main() {
  read();
  insertBtn.addEventListener('click', create);
  tableBody.addEventListener('click', updateAndDelete);
}

main();